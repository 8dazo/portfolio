"use client";

import { useState } from "react";
import { notFoundSvg } from "./notfound-svg";

export default function NotFoundScene() {
  const [met, setMet] = useState(false);

  return (
    <div className={`sv-404 mx-auto w-full max-w-3xl ${met ? "is-met" : ""}`}>
      <div
        className="sv-404-view cursor-pointer"
        data-cursor={met ? "walk on" : "say hi"}
        onClick={() => setMet((m) => !m)}
        dangerouslySetInnerHTML={{ __html: notFoundSvg }}
      />
    </div>
  );
}
