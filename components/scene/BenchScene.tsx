"use client";

import { benchSvg } from "./bench-svg";

export default function BenchScene() {
  return (
    <div className="sv-cn-bench mx-auto w-full max-w-xl">
      <div dangerouslySetInnerHTML={{ __html: benchSvg }} />
    </div>
  );
}
