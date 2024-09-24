// import { sendSolTransaction } from "./sendTransaction";
import {} from "@solana/web3.js";
// listen for messages from the content script
console.log("mainWorld script loaded");
console.log(window.phantom);
// check if phantom wallet is installed
// get the button element
window.addEventListener("message", async (event) => {
  if (event.source === window && event.data.type === "donateButtonClicked") {
    // Handle message from content script
    console.log("Donate button was --clicked!---");
    const provider = await phantomProvider();
    console.log(provider);
    if (provider) {
      try {
        const resp = await provider.connect();
        console.log(resp.publicKey.toString());
        // send the public key to api
        // send message to background script

        window.postMessage(
          { type: "messageFromMainWorld", data: resp.publicKey.toString() },
          "*"
        );
        // ========================

        //=====================
        // Wait for the response from the background script
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("Phantom provider not found");
    }
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
