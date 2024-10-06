import {
  clusterApiUrl,
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";

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
  } else if (origin.includes("youtube.com")) {
    return "youtube";
  }
  return null; // Return null if not a recognized platform
}

// extract blinks
function extractLinkAfterMultiBlanks(content: string): string | null {
  // Regular expression to find "multi-blinks" followed by a URL, including both http and https
  const regex = /multi-blinks:\s*(https?:\/\/localhost:\d+\/[^\s]*)/i;

  // Execute the regex on the HTML content
  const match = regex.exec(content);

  // If a match is found, return the URL; otherwise, return null
  return match ? match[1] : null;
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
    const link = extractLinkAfterMultiBlanks(spanElement.innerText);
    if (!link) {
      return;
    }
    localStorage.setItem("blink", link);

    const buttonElement = document.createElement("button");
    buttonElement.id = "donateButton";
    buttonElement.textContent = "Donate";

    buttonElement.style.padding = "5px 10px";
    buttonElement.style.backgroundColor = "#1da1f2"; // Twitter blue
    buttonElement.style.color = "#fff";
    buttonElement.style.border = "none";
    buttonElement.style.borderRadius = "20px";
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
    });

    buttonElement.addEventListener("mouseleave", () => {
      buttonElement.style.boxShadow =
        "0 0 10px rgba(29, 161, 242, 0.6), 0 0 20px rgba(29, 161, 242, 0.6)";
    });

    buttonElement.addEventListener("click", () => {
      chrome.runtime.sendMessage({
        type: "donateButtonClicked",
        message: link,
      });
      handleDonateButtonClick(link);
      // window.postMessage({ type: "donateButtonClicked", data: link }, "*");
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
  console.log("Reddit");
  // 1. Identify the element to replace
  // 2. Create the button with custom styling for Reddit
  // 3. Add event listeners
  // 4. Replace the identified element with the new button
  const parentElement = targetDiv;
  // get link from post content
  const data = document.querySelector<HTMLElement>(
    // paragraph with data-testid="profile-description"
    "#right-sidebar-container > aside > div.p-md > p"
  );
  if (!data) {
    console.log("Data not found");
    return;
  }
  console.log(data.innerText);
  const link = extractLinkAfterMultiBlanks(data.innerText);
  if (!link) {
    return;
  }
  localStorage.setItem("blink", link);

  if (parentElement) {
    // Create the donate button with rounded Material UI style
    const buttonElement = document.createElement("button");
    buttonElement.id = "donateButton";
    buttonElement.textContent = "Donate";

    // General styles for round button
    buttonElement.style.padding = "10px";
    // Reddit red color
    buttonElement.style.backgroundColor = "#ff4500";
    buttonElement.style.color = "#fff";
    // buttonElement.style.border = "none";
    buttonElement.style.borderRadius = "20px"; // Make it round
    buttonElement.style.cursor = "pointer";
    buttonElement.style.width = "100px"; // Width for round shape
    buttonElement.style.height = "39px"; // Height for round shape
    buttonElement.style.marginLeft = "15px";
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
    });

    buttonElement.addEventListener("mouseleave", () => {
      buttonElement.style.boxShadow =
        "0 0 10px rgba(29, 161, 242, 0.6), 0 0 20px rgba(29, 161, 242, 0.6)";
    });

    // Handle button click
    buttonElement.addEventListener("click", () => {
      chrome.runtime.sendMessage({
        type: "donateButtonClicked",
        message: link,
      });
      handleDonateButtonClick(link);
    });

    // Replace the share button with the donate button
    parentElement.appendChild(buttonElement);
  } else {
    console.log("Parent element not found");
  }
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

// Pseudo code for handling YouTube
function handleYouTube(targetDiv: HTMLElement) {
  const parentElement = targetDiv;
  // get link from description
  const data = document.querySelector<HTMLElement>(
    "#description-inline-expander yt-attributed-string span.yt-core-attributed-string--link-inherit-color"
  );
  if (!data) {
    return;
  }
  const link = extractLinkAfterMultiBlanks(data.innerText);
  if (!link) {
    return;
  }
  localStorage.setItem("blink", link);

  if (parentElement) {
    // Create the donate button with rounded Material UI style
    const buttonElement = document.createElement("button");
    buttonElement.id = "donateButton";
    buttonElement.textContent = "Donate";

    // General styles for round button
    buttonElement.style.padding = "10px";
    buttonElement.style.backgroundColor = "#1da1f2"; // Twitter blue
    buttonElement.style.color = "#fff";
    // buttonElement.style.border = "none";
    buttonElement.style.borderRadius = "20px"; // Make it round
    buttonElement.style.cursor = "pointer";
    buttonElement.style.width = "100px"; // Width for round shape
    buttonElement.style.height = "39px"; // Height for round shape
    buttonElement.style.marginLeft = "15px";
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
    });

    buttonElement.addEventListener("mouseleave", () => {
      buttonElement.style.boxShadow =
        "0 0 10px rgba(29, 161, 242, 0.6), 0 0 20px rgba(29, 161, 242, 0.6)";
    });

    // Handle button click
    buttonElement.addEventListener("click", () => {
      chrome.runtime.sendMessage({
        type: "donateButtonClicked",
        message: link,
      });
      handleDonateButtonClick(link);
    });

    // Add the button to the parent element
    parentElement.appendChild(buttonElement);
  } else {
    console.log("Parent element not found");
  }
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
      ? "#right-sidebar-container > aside > div.p-md > div.mt-sm > div"
      : platform === "instagram"
      ? "/* Instagram-specific target selector */"
      : platform === "tiktok"
      ? "/* TikTok-specific target selector */"
      : platform === "youtube"
      ? "#top-row > #owner"
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
              case "youtube":
                handleYouTube(targetDiv);
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
        case "youtube":
          handleYouTube(targetDiv);
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

chrome.runtime.onMessage.addListener((message) => {
  console.log("Sending message to transaction");

  if (message.type === "transaction") {
    window.postMessage({ type: "transaction", message: message.message }, "*");
  }
});

// Initialize a connection to the Solana cluster
const connection = new Connection(clusterApiUrl("testnet"), "confirmed");

// Function to handle the donate button click
function handleDonateButtonClick(link: string) {
  console.log("Donate button clicked with link:", link);
  // First, connect to the wallet
  chrome.runtime.sendMessage(
    {
      type: "connect",
      wallet: "phantom", // Specify the wallet you're using ('phantom' or 'solflare')
    },
    (response) => {
      if (chrome.runtime.lastError) {
        console.error(
          "Error connecting to wallet:",
          chrome.runtime.lastError.message
        );
        return;
      }
      if (response && response.error) {
        console.error("Error connecting to wallet:", response.error);
      } else if (response) {
        const publicKey = new PublicKey(response);
        console.log("Connected with public key:", publicKey.toString());

        // Now, create the transaction instruction
        createAndSendTransaction(publicKey);
      } else {
        console.error("No response from connect");
      }
    }
  );
}

async function createAndSendTransaction(publicKey: PublicKey) {
  try {
    // Define the recipient's public key (replace with actual recipient)
    const recipientPublicKey = new PublicKey(
      "8szuR5N9F2BRAcFGEUrd64G6AoPB5fUwMdDsE4cD2k2Y"
    );

    // Define the amount to send in lamports (e.g., 0.001 SOL = 1,000,000 lamports)
    const lamports = 10 ** 9;

    // Create a transfer instruction
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: recipientPublicKey,
        lamports,
      })
    );

    // Get a recent blockhash and set the fee payer
    const { blockhash } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = publicKey;

    // Serialize the transaction without signing
    const serializedTransaction = transaction.serialize({
      requireAllSignatures: false,
      verifySignatures: false,
    });

    // Use the helper function to encode the transaction data in base64
    const txDataBase64 = serializedTransaction.toString("base64");

    // Send message to background script to sign the transaction
    chrome.runtime.sendMessage(
      {
        type: "sign_transaction",
        wallet: "phantom", // Ensure this matches the wallet you're using
        payload: {
          txData: txDataBase64,
        },
      },
      (signResponse) => {
        if (chrome.runtime.lastError) {
          console.error(
            "Error signing transaction:",
            chrome.runtime.lastError.message
          );
          return;
        }
        if (signResponse && signResponse.error) {
          console.error("Error signing transaction:", signResponse.error);
        } else if (signResponse) {
          console.log(
            "Transaction signed and sent, signature:",
            signResponse.signature
          );
        } else {
          console.error("No response from sign_transaction");
        }
      }
    );
  } catch (error) {
    console.error("Error creating or sending transaction:", error);
  }
}
