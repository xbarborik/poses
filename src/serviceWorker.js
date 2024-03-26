// https://developer.chrome.com/docs/capabilities/web-apis/web-share-target
// https://dev.to/wtho/custom-service-worker-logic-in-typescript-on-vite-4f27

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  if (event.request.method === "POST" && url.pathname === "/shared") {
    event.respondWith(
      (async () => {
        const formData = await event.request.formData();
        const sharedData = {
          title: formData.get("title") || "",
          text: formData.get("text") || "",
          url: formData.get("url") || "",
          image: formData.get("image"),
        };

        return Response.redirect("/", 303);
      })()
    );
  }
});
