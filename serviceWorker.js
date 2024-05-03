self.addEventListener("fetch", (event) => {
  const requestPath = new URL(event.request.url).pathname;

  if (event.request.method === "POST" && requestPath === "/poses/share") {
    event.respondWith(
      (async () => {
        try {
          const formData = await event.request.formData();
          const imageFile = formData.get("images"); // Use the correct key name

          if (imageFile) {
            const reader = new FileReader();

            // Read the blob as an ArrayBuffer
            const arrayBuffer = await imageFile.arrayBuffer();

            // Convert ArrayBuffer to Blob
            const blob = new Blob([arrayBuffer], { type: imageFile.type });

            const client = await self.clients.get(
              event.resultingClientId || event.clientId
            );

            if (client) {
              client.postMessage({ blob });
            }
          }

          return Response.redirect("/poses/#/share", 303);
        } catch (error) {
          console.error("Error in fetch handler:", error);
          return new Response("Error processing request", { status: 500 });
        }
      })()
    );
  }
});
