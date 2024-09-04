// listen for messages from the content script
console.log("mainWorld script loaded");
console.log(window.phantom);
// check if phantom wallet is installed
// get the button element
window.addEventListener("message", (event) => {
  if (event.source === window && event.data.type === "donateButtonClicked") {
    // Handle message from content script
    console.log("Donate button was --clicked!---");
    handlePhantomWallet();
  }
});

function handlePhantomWallet() {
  try {
    const isPhantomInstalled = window.phantom?.solana?.isPhantom;
    // check if the phantom wallet is installed
    if (isPhantomInstalled) {
      console.log("Phantom wallet is installed");

      const getProvider = async () => {
        if ("phantom" in window) {
          const provider = window.phantom?.solana;

          if (provider?.isPhantom) {
            return provider;
          }
        }

        window.open("https://phantom.app/", "_blank");
      };

      (async () => {
        const provider = await getProvider();
        try {
          const resp = await provider!.connect();
          console.log(resp.publicKey.toString());
        } catch (err) {
          console.error("Error connecting to Phantom wallet", err);
        }
      })();
    } else {
      console.log("Phantom wallet is not installed");
    }
  } catch (error) {
    console.error("Error checking for Phantom wallet", error);
  }
}
