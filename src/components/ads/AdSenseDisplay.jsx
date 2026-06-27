import { useEffect, useRef } from "react";

export default function AdSenseDisplay() {
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
    <div className="w-full my-6 min-h-0 empty:hidden overflow-hidden">
      <ins
        className="adsbygoogle"
        ref={adRef}
        style={{ display: "block", minHeight: 0 }}
        data-ad-client="ca-pub-9051549124466549"
        data-ad-slot="7243274504"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}