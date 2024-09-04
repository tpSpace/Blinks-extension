chrome.scripting
  .registerContentScripts([
    {
      id: "session-script",
      js: ["src/content.ts", "src/mainWorld.ts", "src/background.ts"],
      persistAcrossSessions: false,
      matches: ["https://x.com/*"],
      runAt: "document_start",
      world: "MAIN",
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
  }
});

console.log("background script loaded");
