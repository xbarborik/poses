// https://cgarethc.medium.com/adding-support-so-other-mobile-apps-can-share-to-my-react-pwa-57f4960cb997

export const manifestForPlugIn = {
  registerType: "prompt",
  includeAssests: ["favicon.ico", "apple-touc-icon.png", "masked-icon.svg"],
  manifest: {
    name: "Asana",
    short_name: "Asana",
    description: "Asana PWA",
    icons: [
      {
        src: "./favicon/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "favicon",
      },
      {
        src: "./favicon/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "favicon",
      },
      {
        src: "./favicon/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "apple touch icon",
      },
      {
        src: "./favicon/maskable_icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
    theme_color: "#171717",
    background_color: "#f0e7db",
    display: "standalone",
    scope: "/poses/",
    start_url: "/poses/",
    orientation: "portrait",
    share_target: {
      action: "/share",
      method: "POST",
      enctype: "multipart/form-data",
      params: {
        files: [
          {
            name: "image",
            accept: ["image/*"],
          },
        ],
      },
    },
  },
};
