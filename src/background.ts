import {
  Cluster,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
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
      runAt: "document_end",
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
    // Perform the desired action when the button is clicked
    console.log("Donate button was clicked!");
    chrome.scripting.executeScript({
      world: "MAIN",
      target: { tabId: sender.tab.id },
      func: () =>
        handleWalletCommunication(
          0.5,
          "8szuR5N9F2BRAcFGEUrd64G6AoPB5fUwMdDsE4cD2k2Y"
        ),
    });
  }
});
// "8szuR5N9F2BRAcFGEUrd64G6AoPB5fUwMdDsE4cD2k2Y";
async function handleWalletCommunication(
  amount1: number,
  recipient1Address: string
  // amount2: number,
  // recipient2Address: string
) {
  // check if there is phantom wallet
  const provider = await phantomProvider();
  console.log(provider);
  if (provider) {
    try {
      const resp = await provider.connect();
      console.log(resp.publicKey.toString());
      console.log(resp.publicKey);
      console.log("HHHHHHHHHHHHHHHHHHHHHHHHH");

      // let's make a trnsaction invoke the Phantom wallet for signing
      const network: Cluster = "testnet";
      const connection = new Connection(
        `https://api.${network}.solana.com`,
        "confirmed"
      );

      const senderPublicKey = provider.publicKey;
      if (!senderPublicKey) {
        throw new Error("Wallet not connected!");
      }
      const recipient1PublicKey = new PublicKey(recipient1Address);
      // const recipient2PublicKey = new PublicKey(recipient2Address);
      const feePayerPublicKey = new PublicKey(recipient1Address);

      // Create instruction to transfer SOL to first recipient
      const transferInstruction1 = SystemProgram.transfer({
        fromPubkey: new PublicKey(senderPublicKey),
        toPubkey: recipient1PublicKey,
        lamports: amount1 * LAMPORTS_PER_SOL,
      });

      // Create instruction to transfer SOL to second recipient
      // const transferInstruction2 = SystemProgram.transfer({
      //   fromPubkey: new PublicKey(senderPublicKey),
      //   toPubkey: recipient2PublicKey,
      //   lamports: amount2 * amount1 * LAMPORTS_PER_SOL,
      // });

      // Create a new transaction and add both transfer instructions
      const transaction = new Transaction().add(
        transferInstruction1
        // transferInstruction2
      );

      // Set the fee payer
      transaction.feePayer = feePayerPublicKey;

      const { signature } = await provider.signAndSendTransaction(transaction);
      await connection.getSignatureStatus(signature);
      //=====================
      // Wait for the response from the background script
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
