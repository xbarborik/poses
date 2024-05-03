const BASE = "/poses";

//https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/How_to/Share_data_between_apps
self.addEventListener("fetch", (event) => {
  const requestPath = new URL(event.request.url).pathname;

  if (event.request.method === "POST" && requestPath === `${BASE}/share`) {
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

        return Response.redirect(`${BASE}/#/share`, 303);
      })()
    );
  }
});
