import base58 from "bs58";

console.log("Hi from background.ts");
chrome.scripting
  .registerContentScripts([
    {
      id: "session-script",
      js: ["src/background.ts", "src/transaction.ts"],
      persistAcrossSessions: false,
      matches: ["https://x.com/*", "https://www.youtube.com/*"],
      runAt: "document_idle",
      world: "MAIN",
    },
  ])
  .then(() => console.log("registration complete"))
  .catch((err) => console.warn("unexpected error", err));

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  console.log("on message", msg, sender);
  if (!sender.tab || !sender.tab.id) {
    return null;
  }
  if (msg.type === "getSelectedWallet") {
    chrome.storage.local.get(["selectedWallet"], (storage) => {
      sendResponse(storage.selectedWallet);
    });
    return true;
  }

  if (!msg.wallet) return false;
  handleWalletCommunication(sender.tab.id, msg.type, msg.wallet, msg.payload)
    .then((res) => {
      sendResponse(res);
    })
    .catch((err) => {
      console.error("error handling message", err);
    });

  return true;
});

async function handleWalletCommunication(
  tabId: number,
  type: string,
  wallet: string,
  payload: object
) {
  if (type === "connect") {
    console.log("connecting wallet", wallet);
    const res = await chrome.scripting.executeScript({
      world: "MAIN",
      target: { tabId: tabId },
      func:
        wallet === "solflare"
          ? async () => {
              // @ts-expect-error solflare is not defined
              const provider = window.solflare;
              await provider.connect();
              return provider.publicKey.toString();
            }
          : async () => {
              // @ts-expect-error solana is not defined
              const provider = window.solana;
              const res = await provider.connect();
              return res.publicKey.toString();
            },
    });
    return res[0].result;
  } else if (type === "sign_message") {
    // @ts-expect-error solflare is not defined
    console.log("signing message", payload.message);
    const res = await chrome.scripting.executeScript({
      world: "MAIN",
      target: { tabId: tabId },
      func: async (message: string) => {
        const provider =
          // @ts-expect-error solflare is not defined
          wallet === "solflare" ? window.solflare : window.solana;
        const textToSign = new TextEncoder().encode(message);
        const res = await provider.signMessage(textToSign);
        return res;
      },
      // @ts-expect-error solflare is not defined
      args: [payload.message, wallet],
    });
    return res[0].result;
  } else if (type === "sign_transaction") {
    // @ts-expect-error solflare is not defined
    console.log("signing transaction", wallet, payload.txData);
    const res = await chrome.scripting.executeScript({
      world: "MAIN",
      target: { tabId: tabId },
      func: async (transaction: string, wallet) => {
        try {
          // @ts-expect-error solana is not defined
          const provider = window.solana;
          await provider.connect();
          const res =
            wallet === "solflare"
              ? // @ts-expect-error solflare is not defined
                await window.solflare.request({
                  method: "signAndSendTransaction",
                  params: {
                    transaction,
                  },
                })
              : // @ts-expect-error solflare is not defined
                await window.solana.request({
                  method: "signAndSendTransaction",
                  params: {
                    message: transaction,
                  },
                });
          console.log("result", res);
          return res;
        } catch (e: unknown) {
          console.log("error", e);
          return { error: e ?? "Unknown error---?" };
        }
      },
      // @ts-expect-error solflare is not defined
      args: [base58.encode(Buffer.from(payload.txData, "base64")), wallet],
    });
    return res[0].result;
  }
}
