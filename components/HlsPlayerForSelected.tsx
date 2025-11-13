"use client";

import React, { useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { camera } from "@/typescript.definations";

interface HlsPlayerProps {
  item: camera;
}

export default function HlsPlayerForSelected({ item }: HlsPlayerProps) {
  const playerRef = useRef<ReactPlayer | null>(null);

  useEffect(() => {
    if (!item?.url) console.warn("Missing camera URL:", item);
  }, [item]);

  if (!item?.url) {
    return (
      <div className="flex items-center justify-center bg-zinc-700 h-48 text-zinc-300">
        No video URL
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
      <ReactPlayer
        ref={playerRef}
        url={item.url}
        playing
        muted={true}
        controls
        width="100%"
        height="100%"
        playsinline
        config={{
          file: {
            attributes: {
              crossOrigin: "anonymous", // allows frame extraction
            },
          },
        }}
        onError={(err) => {
          console.error("HLS Player Error:", err);
        }}
      />
    </div>
  );
}
