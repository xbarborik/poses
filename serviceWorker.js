self.addEventListener("fetch", (event) => {
  console.log("Fetch event:", event);

  const requestPath = new URL(event.request.url).pathname;
  console.log("Request path:", requestPath);
  console.log("Request method:", event.request.method);

  if (event.request.method === "POST" && requestPath === "/poses/share") {
    event.respondWith(
      (async () => {
        try {
          const formData = await event.request.formData();
          console.log("Form data:", [...formData.entries()]); // Log all form data entries

          const imageFile = formData.get("images");
          console.log("Image file:", imageFile); // Log the image file

          console.log("before if"); // Log the client
          if (imageFile) {
            const arrayBuffer = await imageFile.arrayBuffer();
            console.log("Array buffer:", arrayBuffer); // Log the array buffer size

            const blob = new Blob([arrayBuffer], { type: imageFile.type });
            console.log("Blob:", blob); // Log the blob size and type

            const client = await self.clients.get(
              event.resultingClientId || event.clientId
            );
            console.log("Client:", client); // Log the client

            if (client) {
              client.postMessage({ blob });
              console.log("Posted message to client with blob");
            }
          } else {
            console.warn("No image file found in form data");
          }

          console.log("Redirecting to", "/poses/#/share");
          return Response.redirect("/poses/#/share", 303);
        } catch (error) {
          console.error("Error in fetch handler:", error);
          return Response.redirect("/poses/#/", 500);
        }
      })()
    );
  }
});
