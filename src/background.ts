console.log("Hi from background.ts");
chrome.scripting
  .registerContentScripts([
    {
      id: "session-script",
      js: ["src/content.ts", "src/background.ts", "src/transaction.ts"],
      persistAcrossSessions: false,
      matches: ["https://x.com/*", "https://www.youtube.com/*"],
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
      func: (link) => {
        // Define the function directly in the injected code
        async function handleWalletCommunication(link: string) {
          chrome.runtime.sendMessage({
            type: "transaction",
            message: link,
          });
          console.log(link);
        }

        // Call the function within the injected script
        handleWalletCommunication(link);
      },
      args: [message.message],
    });
  }
});
