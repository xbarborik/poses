// serviceWorker.js
self.addEventListener("fetch", (event) => {
  if (
    event.request.method === "POST" &&
    new URL(event.request.url).pathname === "/share"
  ) {
    event.respondWith(
      (async () => {
        const formData = await event.request.formData();
        const imageFile = formData.get("images");
        const imageUrl = imageFile ? URL.createObjectURL(imageFile) : null;
        const client = await self.clients.get(
          event.resultingClientId || event.clientId
        );

        if (client && imageUrl) {
          client.postMessage({ imageUrl });
        }

        return Response.redirect("/share", 303);
      })()
    );
  }
});
