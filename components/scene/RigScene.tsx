"use client";

import { rigSvg } from "./rig-svg";

export default function RigScene() {
  return (
    <div className="sv-rig mx-auto w-full max-w-4xl">
      <div dangerouslySetInnerHTML={{ __html: rigSvg }} />
    </div>
  );
}
