"use client";

import { Player } from "@lottiefiles/react-lottie-player";

export default function LottieLoading() {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
      <Player
        autoplay
        loop
        src="/lottie/loading.json"
        style={{ height: "100px", width: "100px" }}
      />
    </div>
  );
}
