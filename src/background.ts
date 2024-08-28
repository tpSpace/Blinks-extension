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

console.log("background script loaded");
