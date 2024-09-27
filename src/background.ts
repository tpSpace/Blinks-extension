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

// chromelisten a button with an id of donateButton
// Listener for messages from content scripts
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  console.log("on message", message, sender, sendResponse);
  if (!sender.tab || !sender.tab.id) {
    return null;
  }
  if (message.type === "donateButtonClicked") {
    console.log("Donate button was clicked!");

    // fetch api from message.message
    await fetch(message.message)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json(); // or response.text() if you expect plain text
      })
      .then((data) => {
        console.log("Data received:", data);
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (tabs[0].id) {
            chrome.tabs.sendMessage(tabs[0].id, {
              type: "transaction",
              message: data,
            });
          }
        });
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }
});
