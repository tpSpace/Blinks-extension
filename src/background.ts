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
    handleWalletCommunication();
  }
});

async function handleWalletCommunication() {}
