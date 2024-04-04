import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function Share() {
  // const [searchParams] = useSearchParams();
  // const [url, setUrl] = useState("");

  // useEffect(() => {
  //   const text = searchParams.get("text");
  //   if (text) {
  //     const urlPortion = text.match(/https.+/);
  //     if (urlPortion.length > 0) {
  //       setUrl(urlPortion[0]);
  //     }
  //   }
  // }, [searchParams]);

  // return <>{url}</>;
  const [sharedImage, setSharedImage] = useState(null);

  useEffect(() => {
    async function fetchSharedImage() {
      const formData = await navigator.clipboard.read();
      const file = formData.files[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setSharedImage(imageUrl);
      }
    }

    fetchSharedImage();
  }, []);

  if (!sharedImage) {
    return <div>No image shared</div>;
  }

  return (
    <div>
      <h1>Shared Image</h1>
      <img src={sharedImage} alt="Shared" />
    </div>
  );
}

export default Share;
