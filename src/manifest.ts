import { defineManifest } from "@crxjs/vite-plugin";
import packageData from "../package.json";

const isDev = process.env.NODE_ENV == "development";

export default defineManifest({
  name: `${packageData.displayName || packageData.name}${
    isDev ? ` ➡️ Dev` : ""
  }`,
  description: packageData.description,
  version: packageData.version,
  manifest_version: 3,
  action: {
    default_popup: "index.html",
  },
  host_permissions: [
    "https://twitter.com/*",
    "https://x.com/*",
    "https://www.facebook.com/*",
    "https://www.twitch.tv/*",
    "https://www.reddit.com/*",
    "https://www.youtube.com/*",
    "https://github.com/*",
    "https://www.google.com/",
  ],
  background: {
    service_worker: "src/background.ts",
    type: "module",
  },
  permissions: ["scripting", "activeTab", "tabs", "storage"],
  content_scripts: [
    {
      matches: [
        "https://x.com/*",
        "https://www.youtube.com/*",
        "https://www.reddit.com/*",
        "https://www.twitch.tv/*",
      ],
      js: ["src/content.ts"],
    },
  ],
  web_accessible_resources: [
    {
      resources: ["src/content.ts", "src/background.ts"],
      matches: [
        "https://x.com/*",
        "https://www.youtube.com/*",
        "https://www.reddit.com/*",
        "https://www.twitch.tv/*",
      ],
    },
  ],
  externally_connectable: {
    matches: [
      "https://x.com/*",
      "https://www.youtube.com/*",
      "https://www.reddit.com/*",
      "https://www.twitch.tv/*",
    ],
  },
});
