console.log("Hello from content.ts");

// Function to determine the social media platform based on origin
function getPlatformByOrigin(): string | null {
  const origin = window.location.origin;
  console.log(origin);
  if (origin.includes("x.com")) {
    return "twitter";
  } else if (origin.includes("facebook.com")) {
    return "facebook";
  } else if (origin.includes("linkedin.com")) {
    return "linkedin";
  } else if (origin.includes("reddit.com")) {
    return "reddit";
  } else if (origin.includes("instagram.com")) {
    return "instagram";
  } else if (origin.includes("tiktok.com")) {
    return "tiktok";
  }
  return null; // Return null if not a recognized platform
}

// Function to handle Twitter
function handleTwitter(targetDiv: HTMLElement) {
  console.log(targetDiv);
  // 1. Identify the element to replace
  // 2. Create the button with custom styling for Twitter
  // 3. Add event listeners
  // 4. Replace the identified element with the new button
  const spanElement = targetDiv.querySelector(
    "span.css-1jxf684.r-bcqeeo.r-1ttztb7.r-qvutc0.r-poiln3"
  ) as HTMLSpanElement;

  if (spanElement) {
    localStorage.setItem("blink", spanElement.innerText);

    const buttonElement = document.createElement("button");
    buttonElement.id = "donateButton";
    buttonElement.textContent = "Donate me";

    buttonElement.style.padding = "5px 10px";
    buttonElement.style.backgroundColor = "#1da1f2"; // Twitter blue
    buttonElement.style.color = "#fff";
    buttonElement.style.border = "none";
    buttonElement.style.borderRadius = "5px";
    buttonElement.style.cursor = "pointer";

    // Thinner gradient border with Twitter color scheme
    buttonElement.style.border = "1px solid transparent";
    buttonElement.style.backgroundImage =
      "linear-gradient(#1da1f2, #1da1f2), linear-gradient(45deg, #1da1f2, #ffffff)";
    buttonElement.style.backgroundOrigin = "border-box";
    buttonElement.style.backgroundClip = "padding-box, border-box";

    // Glowing effect with a subtle Twitter blue shadow
    buttonElement.style.boxShadow =
      "0 0 10px rgba(29, 161, 242, 0.6), 0 0 20px rgba(29, 161, 242, 0.6)";

    // Add animation for smooth transitions
    buttonElement.style.transition =
      "box-shadow 0.4s ease, background-image 0.8s ease";

    // Glow and gradient border change on hover
    buttonElement.addEventListener("mouseenter", () => {
      buttonElement.style.boxShadow =
        "0 0 15px rgba(29, 161, 242, 0.8), 0 0 25px rgba(255, 255, 255, 0.8)";
      // buttonElement.style.backgroundImage =
      //   "linear-gradient(#1da1f2, #1da1f2), linear-gradient(45deg, #ffffff, #1da1f2)";
    });

    buttonElement.addEventListener("mouseleave", () => {
      buttonElement.style.boxShadow =
        "0 0 10px rgba(29, 161, 242, 0.6), 0 0 20px rgba(29, 161, 242, 0.6)";
      // buttonElement.style.backgroundImage =
      //   "linear-gradient(#1da1f2, #1da1f2), linear-gradient(45deg, #1da1f2, #ffffff)";
    });

    buttonElement.addEventListener("click", () => {
      chrome.runtime.sendMessage({ type: "donateButtonClicked" });
      window.postMessage({ type: "donateButtonClicked", data: "Hello" }, "*");
    });

    targetDiv.replaceChild(buttonElement, spanElement);
  } else {
    console.error("Span element not found");
  }
}

// Pseudo code for handling Facebook
function handleFacebook(targetDiv: HTMLElement) {
  console.log(targetDiv);
  // 1. Identify the element to replace
  // 2. Create the button with custom styling for Facebook
  // 3. Add event listeners
  // 4. Replace the identified element with the new button
}

// Pseudo code for handling LinkedIn
function handleLinkedIn(targetDiv: HTMLElement) {
  console.log(targetDiv);
  // 1. Identify the element to replace
  // 2. Create the button with custom styling for LinkedIn
  // 3. Add event listeners
  // 4. Replace the identified element with the new button
}

// Pseudo code for handling Reddit
function handleReddit(targetDiv: HTMLElement) {
  console.log(targetDiv);
  // 1. Identify the element to replace
  // 2. Create the button with custom styling for Reddit
  // 3. Add event listeners
  // 4. Replace the identified element with the new button
}

// Pseudo code for handling Instagram
function handleInstagram(targetDiv: HTMLElement) {
  console.log(targetDiv);
  // 1. Identify the element to replace
  // 2. Create the button with custom styling for Instagram
  // 3. Add event listeners
  // 4. Replace the identified element with the new button
}

// Pseudo code for handling TikTok
function handleTikTok(targetDiv: HTMLElement) {
  console.log(targetDiv);
  // 1. Identify the element to replace
  // 2. Create the button with custom styling for TikTok
  // 3. Add event listeners
  // 4. Replace the identified element with the new button
}

// Main logic
const platform = getPlatformByOrigin();
console.log(platform);
if (platform) {
  const targetSelector =
    platform === "twitter"
      ? 'div[style="text-overflow: unset; color: rgb(231, 233, 234);"].css-146c3p1.r-bcqeeo.r-1ttztb7.r-qvutc0.r-37j5jr.r-a023e6.r-rjixqe.r-16dba41[data-testid="UserDescription"]'
      : platform === "facebook"
      ? "/* Facebook-specific target selector */"
      : platform === "linkedin"
      ? "/* LinkedIn-specific target selector */"
      : platform === "reddit"
      ? "/* Reddit-specific target selector */"
      : platform === "instagram"
      ? "/* Instagram-specific target selector */"
      : platform === "tiktok"
      ? "/* TikTok-specific target selector */"
      : null;

  if (targetSelector) {
    const observer = new MutationObserver((mutationsList, observer) => {
      for (const mutation of mutationsList) {
        if (mutation.type === "childList") {
          const targetDiv = document.querySelector(targetSelector);
          if (targetDiv && targetDiv instanceof HTMLElement) {
            switch (platform) {
              case "twitter":
                handleTwitter(targetDiv);
                break;
              case "facebook":
                handleFacebook(targetDiv);
                break;
              case "linkedin":
                handleLinkedIn(targetDiv);
                break;
              case "reddit":
                handleReddit(targetDiv);
                break;
              case "instagram":
                handleInstagram(targetDiv);
                break;
              case "tiktok":
                handleTikTok(targetDiv);
                break;
            }
            observer.disconnect();
            break;
          }
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    const targetDiv = document.querySelector(targetSelector);
    if (targetDiv && targetDiv instanceof HTMLElement) {
      switch (platform) {
        case "twitter":
          handleTwitter(targetDiv);
          break;
        case "facebook":
          handleFacebook(targetDiv);
          break;
        case "linkedin":
          handleLinkedIn(targetDiv);
          break;
        case "reddit":
          handleReddit(targetDiv);
          break;
        case "instagram":
          handleInstagram(targetDiv);
          break;
        case "tiktok":
          handleTikTok(targetDiv);
          break;
      }
      observer.disconnect();
    }
  } else {
    console.error("Target selector not found for the platform");
  }
} else {
  console.error("Platform not recognized");
}
