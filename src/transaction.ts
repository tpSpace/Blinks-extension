window.addEventListener("message", async (event) => {
  if (event.data.type === "transaction") {
    console.log("Transaction data received:", event.data);
    try {
      const provider = getProvider();
      if (!provider) {
        console.log("Provider not found");
        return;
      }
      console.log(window.phantom.solana);
    } catch (err) {
      console.error("Error:", err);
    }
  }
});

const getProvider = () => {
  if ("phantom" in window) {
    const provider = window.phantom?.solana;
    console.log("Provider found:", provider);
    if (provider?.isPhantom) {
      return provider;
    }
  }

  window.open("https://phantom.app/", "_blank");
};
