const BASE = "/poses";

// https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/How_to/Share_data_between_apps
self.addEventListener("fetch", (event) => {
  console.log("Fetch event:", event);
  const requestPath = new URL(event.request.url).pathname;
  console.log("Request path:", requestPath);
  console.log("Request method:", event.request.method);

  if (event.request.method === "POST" && requestPath === `${BASE}/share`) {
    event.respondWith(
      (async () => {
        try {
          const formData = await event.request.formData();
          console.log("Form data:", formData);
          const imageFile = formData.get("images");
          const imageUrl = imageFile ? URL.createObjectURL(imageFile) : null;
          console.log("Image URL:", imageUrl);

          const client = await self.clients.get(
            event.resultingClientId || event.clientId
          );
          console.log("Client:", client);

          if (client && imageUrl) {
            client.postMessage({ imageUrl });
            console.log("Posted message to client with imageUrl");
          }

          console.log("Redirecting to", `${BASE}/#/share`);
          return Response.redirect(`${BASE}/#/share`, 303);
        } catch (error) {
          console.error("Error in fetch handler:", error);
          return new Response("Error processing request", { status: 500 });
        }
      })()
    );
  }
});
