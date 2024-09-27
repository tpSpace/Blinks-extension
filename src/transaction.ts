console.log("Hi from transaction.ts");

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  console.log(message, sender, sendResponse);
  // if (!sender.tab || !sender.tab.id) {
  //   return null;
  // }
  if (message.type === "transaction") {
    console.log(message.message);
    chrome.windows.getAll({ populate: true }, (windows) => {
      console.log(windows[0].tabs);
    });
    const provider = await phantomProvider();
    if (!provider) {
      return;
    }
    // make a trnasaction 8szuR5N9F2BRAcFGEUrd64G6AoPB5fUwMdDsE4cD2k2Y

    try {
      const resp = await provider!.connect();
      console.log(resp.publicKey.toString());
    } catch (error) {
      console.error(error);
    }
  }
});

async function phantomProvider() {
  const getProvider = async () => {
    const isPhantomInstalled = window.phantom;
    console.log(isPhantomInstalled);
    if (window.phantom && window.phantom.solana) {
      const provider = window.phantom?.solana;
      console.log(provider);
      if (provider?.isPhantom) {
        console.log("Phantom provider is available");
        return provider;
      }
    }
    console.log("Phantom provider is not available");
    // window.open("https://phantom.app/", "_blank");
  };

  return getProvider();
}
