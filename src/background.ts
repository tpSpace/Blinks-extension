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
    fetch("http://localhost:3000/api/actions/donateMe", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        // Handle the response from the API if needed
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  // Respond if necessary
  // sendResponse({ status: "received" });
});

console.log("background script loaded");
