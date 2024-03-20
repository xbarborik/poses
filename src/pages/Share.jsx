import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function Share() {
  const [searchParams] = useSearchParams();
  const [url, setUrl] = useState("");

  useEffect(() => {
    const text = searchParams.get("text");
    if (text) {
      const urlPortion = text.match(/https.+/);
      if (urlPortion.length > 0) {
        setUrl(urlPortion[0]);
      }
    }
  }, [searchParams]);

  return <>{url}</>;
}
