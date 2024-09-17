// Define the target class and style to watch for
const targetSelector =
  'div[style="text-overflow: unset; color: rgb(231, 233, 234);"].css-146c3p1.r-bcqeeo.r-1ttztb7.r-qvutc0.r-37j5jr.r-a023e6.r-rjixqe.r-16dba41[data-testid="UserDescription"]';

function replaceSpanWithButton(targetDiv: HTMLElement) {
  // Select the span inside the target div
  const spanElement = targetDiv.querySelector(
    "span.css-1jxf684.r-bcqeeo.r-1ttztb7.r-qvutc0.r-poiln3"
  ) as HTMLSpanElement;

  if (spanElement) {
    // Save the innerText of the span to localStorage with the key 'blink'
    localStorage.setItem("blink", spanElement.innerText);

    // Create a new button element
    const buttonElement = document.createElement("button");
    buttonElement.id = "donateButton";
    buttonElement.textContent = "Donate me"; // Set the button's content
    buttonElement.id = "donateButton"; // Set the button's id

    // Optionally, add some styling to the button
    buttonElement.style.padding = "5px 10px";
    buttonElement.style.backgroundColor = "#1da1f2"; // Twitter blue
    buttonElement.style.color = "#fff";
    buttonElement.style.border = "none";
    buttonElement.style.borderRadius = "5px";
    buttonElement.style.cursor = "pointer";

    // Add event listener to the button for click events
    buttonElement.addEventListener("click", () => {
      // Send a message to the background script when the button is clicked
      chrome.runtime.sendMessage({ type: "donateButtonClicked" });
      window.postMessage({ type: "donateButtonClicked", data: "Hello" }, "*");
    });
    console.log(window);
    // Replace the span with the new button
    targetDiv.replaceChild(buttonElement, spanElement);
  } else {
    console.error("Span element not found");
  }
}

// Create a MutationObserver to watch for changes in the DOM
const observer = new MutationObserver((mutationsList, observer) => {
  for (const mutation of mutationsList) {
    if (mutation.type === "childList") {
      // Check if the target div has appeared
      const targetDiv = document.querySelector(targetSelector);

      if (targetDiv && targetDiv instanceof HTMLElement) {
        // Target div found, replace the span with the button
        replaceSpanWithButton(targetDiv);

        // Disconnect the observer since we found the element
        observer.disconnect();
        break;
      }
    }
  }
});

// Start observing the body for added nodes
observer.observe(document.body, { childList: true, subtree: true });

// Also, run the check immediately in case the element is already present
const targetDiv = document.querySelector(targetSelector);
if (targetDiv && targetDiv instanceof HTMLElement) {
  replaceSpanWithButton(targetDiv);
  observer.disconnect();
}
