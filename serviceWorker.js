//https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB
async function storeSharedImageBlob(blob) {
  const dbRequest = indexedDB.open("sharedImagesDB", 1);

  dbRequest.onupgradeneeded = (event) => {
    const db = event.target.result;
    if (!db.objectStoreNames.contains("sharedImages")) {
      db.createObjectStore("sharedImages", {
        keyPath: "id",
      });
    }
  };

  dbRequest.onsuccess = (event) => {
    const db = event.target.result;
    const store = db
      .transaction("sharedImages", "readwrite")
      .objectStore("sharedImages");

    const sharedImage = { id: "sharedImage", blob };
    store.put(sharedImage);
  };

  dbRequest.onerror = (event) => {
    console.error("IndexedDB error:", event.target.errorCode);
  };
}

// handling fetch for shared images to app by extending vitePWAplugin sw.js
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
            const blob = new Blob([imageFile], { type: imageFile.type });

            await storeSharedImageBlob(blob);
            return Response.redirect("/poses/#/share", 303);
          } else {
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
