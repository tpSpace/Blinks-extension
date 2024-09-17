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

  if (message.type === "messageFromMainWorld") {
    // make a post request to the api with the public key
    postDonate(message.publicKey);
    console.log("message from main world", message);
    // send a message to main
  }
});

async function postDonate(publicKey: string) {
  const response = await fetch("http://localhost:3000/api/donate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ publicKey }),
  });
  return response;
}

console.log("background script loaded");
