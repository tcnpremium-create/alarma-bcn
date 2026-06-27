import { useEffect, useRef } from "react";

export default function AdSenseInArticle() {
  const adRef = useRef(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (adRef.current && !pushed.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        pushed.current = true;
      } catch (e) {
        // AdSense not loaded yet
      }
    }
  }, []);

  return (
    <div className="w-full my-8">
      <ins
        className="adsbygoogle"
        ref={adRef}
        style={{ display: "block", textAlign: "center" }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-9051549124466549"
        data-ad-slot="6781267748"
      />
    </div>
  );
}