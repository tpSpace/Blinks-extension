import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  PublicKeyInitData,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";

chrome.scripting
  .registerContentScripts([
    {
      id: "session-script",
      js: ["src/content.ts", "src/mainWorld.ts", "src/background.ts"],
      persistAcrossSessions: false,
      matches: ["https://x.com/*"],
      runAt: "document_idle",
      world: "MAIN",
    },
  ])
  .then(() => console.log("registration complete"))
  .catch((err) => console.warn("unexpected error", err));

// chromelisten a button with an id of donateButton

// Listener for messages from content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("on message", message, sender, sendResponse);

  if (!sender.tab || !sender.tab.id) {
    return null;
  }

  if (message.type === "donateButtonClicked") {
    console.log("Donate button was clicked!");
    chrome.scripting.executeScript({
      world: "MAIN",
      target: { tabId: sender.tab.id },
      func: (amount, recipient) => {
        // Define the function directly in the injected code
        async function handleWalletCommunication(
          amount1: number,
          recipient1Address: PublicKeyInitData
        ) {
          const provider = await phantomProvider();
          console.log(provider);
          if (provider) {
            try {
              const resp = await provider.connect();
              console.log(resp.publicKey.toString());
              console.log(resp.publicKey);

              const network = "testnet";
              const connection = new Connection(
                `https://api.${network}.solana.com`,
                "confirmed"
              );

              const senderPublicKey = provider.publicKey;
              if (!senderPublicKey) {
                throw new Error("Wallet not connected!");
              }
              const recipient1PublicKey = new PublicKey(recipient1Address);

              const transferInstruction1 = SystemProgram.transfer({
                fromPubkey: new PublicKey(senderPublicKey),
                toPubkey: recipient1PublicKey,
                lamports: amount1 * LAMPORTS_PER_SOL,
              });

              const transaction = new Transaction().add(transferInstruction1);
              transaction.feePayer = new PublicKey(recipient1Address);

              const { signature } = await provider.signAndSendTransaction(
                transaction
              );
              await connection.getSignatureStatus(signature);
            } catch (err) {
              console.log(err);
            }
          }
        }

        async function phantomProvider() {
          const getProvider = async () => {
            if ("phantom" in window) {
              const provider = window.phantom?.solana;

              if (provider?.isPhantom) {
                return provider;
              }
            }
            window.open("https://phantom.app/", "_blank");
          };

          return getProvider();
        }

        // Call the function within the injected script
        handleWalletCommunication(Number(amount), recipient);
      },
      args: [0.5, "8szuR5N9F2BRAcFGEUrd64G6AoPB5fUwMdDsE4cD2k2Y"],
    });
  }
});
