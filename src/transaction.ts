import { Connection } from "@solana/web3.js";

console.log("Hi from transaction.ts");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message, sender, sendResponse);
  if (!sender.tab || !sender.tab.id) {
    return null;
  }
  if (message.type === "transaction") {
    const network = "testnet";
    const connection = new Connection(
      `https://api.${network}.solana.com`,
      "confirmed"
    );
    console.log(connection);
    console.log("Lmao");
  }
});

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
