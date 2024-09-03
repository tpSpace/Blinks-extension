chrome.scripting
  .registerContentScripts([
    {
      id: "session-script",
      js: ["src/content.ts"],
      persistAcrossSessions: false,
      matches: ["https://x.com/*"],
      runAt: "document_start",
    },
  ])
  .then(() => console.log("registration complete"))
  .catch((err) => console.warn("unexpected error", err));

// chromelisten a button with an id of donateButton

// Listener for messages from content scripts
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "donateButtonClicked") {
    // Perform the desired action when the button is clicked
    console.log("Donate button was clicked!");
    try {
      console.log(window.solana!.isPhantom);
      if (window.solana!.isPhantom) {
        console.log("Phantom wallet installed");
        // Connect to the Phantom wallet
      } else {
        console.error("Phantom wallet not installed");
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  // Respond if necessary
  // sendResponse({ status: "received" });
});

console.log("background script loaded");
