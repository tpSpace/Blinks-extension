// listen for messages from the content script
console.log("mainWorld script loaded");
console.log(window.phantom);
// check if phantom wallet is installed
// get the button element
window.addEventListener("message", (event) => {
  if (event.source === window && event.data.type === "donateButtonClicked") {
    // Handle message from content script
    console.log("Donate button was --clicked!---");
  }
});
