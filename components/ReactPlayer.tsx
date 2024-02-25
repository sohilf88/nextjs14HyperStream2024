"use client";
import ReactPlayer from "react-player";
import { useEffect, useState } from "react";
import {  createCamera } from "@/typescript.definations";

function Videoplayer({camera}:createCamera) {
  const status = ReactPlayer.canPlay(
    "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6e.m3u8"
  );

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (mounted)
    return (
      <section className="">
        <div className=" player-wrapper shadow-2xl hover:scale-[1.01] rounded-sm transition duration-100  ">
          <div className="absolute place-items-center top-0 left-1 grid sm:grid-cols-4 grid-cols-3 w-full">
            <div>{camera.name}</div>
            <div className="sm:col-start-3">{camera.location}</div>
            <div className="sm:col-start-4 self-center">more</div>
          </div>
          <ReactPlayer
            className="react-player"
            playing
            muted
            
            url="https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8"
            width="100%"
            height="100%"
            controls={true}
          />
        </div>
      </section>
    );
}

export default Videoplayer;