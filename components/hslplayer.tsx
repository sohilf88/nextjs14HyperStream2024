"use client";
import ReactPlayer from "react-player";
import { useEffect, useState } from "react";
import { camera } from "@/typescript.definations";


function HlsPlayer({item}:{
  item:camera
}) {
 

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (mounted)
    return (
     
        <div className="player-wrapper relative ">
          <div className="text-white absolute text-opacity-80 top-1 left-1 z-50 flex justify-start gap-5 italic uppercase font-extralight text-xs font-mono">
            <span>{item?.name}</span>
            <span>{item?.city}</span>
            <span>{item?.taluka}</span>
            <span>{item?.area}</span>
          </div>
         <ReactPlayer
            className="react-player"
            playing
            muted
            url={item.url}
            // url="https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8"
            width="100%"
            height="100%"
            controls={true}
            onError={(error)=>console.log(error)}
            onProgress={(error)=>console.log(error)}
           
          />
        </div>
      
    );
}

export default HlsPlayer;