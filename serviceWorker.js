async function storeBlob(blob) {
  const dbRequest = indexedDB.open("sharedBlobsDB", 1);

  dbRequest.onupgradeneeded = (event) => {
    const db = event.target.result;
    if (!db.objectStoreNames.contains("blobs")) {
      db.createObjectStore("blobs", { keyPath: "id", autoIncrement: true });
    }
  };

  dbRequest.onsuccess = (event) => {
    const db = event.target.result;
    const transaction = db.transaction("blobs", "readwrite");
    const store = transaction.objectStore("blobs");
    store.add({ blob, timestamp: Date.now() });
    console.log("Blob stored successfully");
  };

  dbRequest.onerror = (event) => {
    console.error("IndexedDB error:", event.target.errorCode);
  };
}

self.addEventListener("fetch", (event) => {
  if (
    event.request.method === "POST" &&
    new URL(event.request.url).pathname === "/poses/share"
  ) {
    event.respondWith(
      (async () => {
        try {
          const formData = await event.request.formData();
          const imageFile = formData.get("images");
          if (imageFile) {
            const arrayBuffer = await imageFile.arrayBuffer();
            const blob = new Blob([arrayBuffer], { type: imageFile.type });
            await storeBlob(blob);
            console.log("Redirecting to", "/poses/#/share");
            return Response.redirect("/poses/#/share", 303);
          } else {
            console.warn("No image file found in form data");
            return Response.redirect("/poses/#/", 500);
          }
        } catch (error) {
          console.error("Error in fetch handler:", error);
          return Response.redirect("/poses/#/", 500);
        }
      })()
    );
  }
});
