"use client";
import ReactPlayer from "react-player";
import { useEffect, useState } from "react";


function HlsPlayer({url}:{
  url:string
}) {
 

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (mounted)
    return (
     
        <div className="player-wrapper">
         <ReactPlayer
            className="react-player"
            playing
            muted
            url={url}
            // url="https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8"
            width="100%"
            height="100%"
            // controls={true}
          />
        </div>
      
    );
}

export default HlsPlayer;