const BASE = "/poses"; // Set this to the base path without the hash

self.addEventListener("fetch", (event) => {
  // Check for the path without the hash
  if (
    event.request.method === "POST" &&
    new URL(event.request.url).pathname === `${BASE}/share`
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

        return Response.redirect(`${BASE}/share`, 303);
      })()
    );
  }
});
