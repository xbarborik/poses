import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// added setting to vite to turn it into a PWA
// https://medium.com/@rakeshdhariwal61/converting-your-react-vite-app-into-pwa-d7211e9cd0c5
export default defineConfig({
  base: `/poses/`,
  plugins: [
    react(),
    VitePWA({
      includeAssets: [
        "favicon.ico",
        "apple-touc-icon.png",
        "masked-icon.svg",
        "**/*",
      ],
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
        theme_color: "#fff",
        background_color: "#fff",
        display: "standalone",
        scope: `/poses/`,
        start_url: `/poses/`,
        orientation: "portrait",
      },
    }),
  ],
});
