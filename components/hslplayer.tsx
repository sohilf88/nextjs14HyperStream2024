"use client";
import ReactPlayer from "react-player";
import { useEffect, useRef, useState } from "react";
import { camera } from "@/typescript.definations";
import {IconButton, Slider } from "@mui/material";
import PlayArrowTwoToneIcon from '@mui/icons-material/PlayArrowTwoTone';
import StopTwoToneIcon from '@mui/icons-material/StopTwoTone';
import PauseCircleFilledTwoToneIcon from '@mui/icons-material/PauseCircleFilledTwoTone';

import FullscreenTwoToneIcon from '@mui/icons-material/FullscreenTwoTone';

import ContinuousSlider from "./volumeController";


function HlsPlayer({item}:{
  item:camera
}) {
 
console.log(item)
  const [mounted, setMounted] = useState(false);
  const [playing, setPlaying] = useState(true);
 const [volume, setVolume] = useState(0)
  const [mute, setMute] = useState(true);
  const [url,setUrl]=useState(item.url)
 

  function onClickFullScreen(){
 
  //  let player=window.document.getElementById("videoplayer")
   let player=window.document.getElementById(item._id as string)
  //  console.log(player)
   const isFullScreenWindow=window.document.fullscreenElement
   
    if(!isFullScreenWindow){
      
      player?.requestFullscreen()
      
    }else{
      
      window.document.exitFullscreen()
      
    }
  }
 
  useEffect(() => {
    setMounted(true);
  }, []);

  if (mounted)
    return (
     
        <div className="player-wrapper relative " >
          {/* <div className="text-white font-caveat absolute top-1.5 right-2 z-50  flex justify-end gap-5 italic uppercase font-extralight text-xs  tracking-wide">
            <span>{item?.name}</span>
            <span>{item?.city}</span>
            <span>{item?.taluka}</span>
            <span>{item?.area}</span>
          </div> */}
          <div className="absolute group -bottom-1 transition-all duration-150 z-50 w-full flex  gap-2 justify-between items-center ">
            <div className="flex items-center gap-5">
              <div>
            
            {/* play pause */}
            {
              playing?( <IconButton color="success" onClick={()=>{setPlaying(!playing)
                setUrl(item.url)
              }}>
            <PauseCircleFilledTwoToneIcon/>
           </IconButton>):(<IconButton className="" color="info" onClick={()=>{setPlaying(!playing)
                setUrl(item.url)
              }}>
            <PlayArrowTwoToneIcon/>
           </IconButton>)
            }
           
           
           {/* stop button red color */}
           <IconButton color="error" onClick={()=>{
            setUrl("")
            setPlaying(false)}}>
            <StopTwoToneIcon/>
           </IconButton>
          </div>
          {/* mute or unmute */}
          <div>
           
            <ContinuousSlider volume={volume} setVolume={setVolume} mute={mute} setMute={setMute}/>
         
          </div>
          
           </div>
           

            {/* fullscreen and exit */}
            <div>
           <IconButton onClick={onClickFullScreen} id="button-full"  color="warning">
            <FullscreenTwoToneIcon/>
           </IconButton>
            
            
             </div>
           
            
            
            
           
          </div>
         <ReactPlayer
           
            className="react-player " 
            playing={playing}
            muted={mute}
            url={url}
            width="100%"
            height="100%"
            volume={volume}
            
            
           
           
          />
         
        </div>
      
    );
}

export default HlsPlayer;

// improved code as below

// "use client";
// import React, { useEffect, useState } from "react";
// import ReactPlayer from "react-player";
// import { camera } from "@/typescript.definations";
// import { IconButton } from "@mui/material";
// import PlayArrowTwoToneIcon from "@mui/icons-material/PlayArrowTwoTone";
// import StopTwoToneIcon from "@mui/icons-material/StopTwoTone";
// import PauseCircleFilledTwoToneIcon from "@mui/icons-material/PauseCircleFilledTwoTone";
// import FullscreenTwoToneIcon from "@mui/icons-material/FullscreenTwoTone";
// import ContinuousSlider from "./volumeController";

// function HlsPlayer({ item }: { item: camera }) {
//   const [mounted, setMounted] = useState(false);
//   const [playing, setPlaying] = useState(true);
//   const [volume, setVolume] = useState(0.5);
//   const [mute, setMute] = useState(true);
//   const [url, setUrl] = useState(item.url);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   const handleFullScreen = () => {
//     const playerElement = document.getElementById(item._id as string);
//     const isFullScreen = document.fullscreenElement;

//     if (!isFullScreen) playerElement?.requestFullscreen();
//     else document.exitFullscreen();
//   };

//   if (!mounted) return null;

//   return (
//     <div
//       id={item._id}
//       className="relative player-wrapper bg-black overflow-hidden group"
//     >
//       {/* Overlay - Camera info */}
//       <div className="absolute top-0 right-0 bg-black/60 px-2 py-1 text-xs text-white flex flex-wrap gap-x-4 justify-end text-right w-full z-20">
//         <span>{item?.name ?? "Unnamed"}</span>
//         <span>{item?.district ?? ""}</span>
//         <span>{item?.city ?? ""}</span>
//         <span>{item?.area ?? ""}</span>
//       </div>

//       {/* Controls */}
//       <div className="absolute bottom-0 w-full px-2 py-1 flex justify-between items-center bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30">
//         {/* Left Controls */}
//         <div className="flex items-center gap-3">
//           {playing ? (
//             <IconButton
//               size="small"
//               color="success"
//               onClick={() => setPlaying(false)}
//             >
//               <PauseCircleFilledTwoToneIcon fontSize="medium" />
//             </IconButton>
//           ) : (
//             <IconButton
//               size="small"
//               color="info"
//               onClick={() => {
//                 setUrl(item.url);
//                 setPlaying(true);
//               }}
//             >
//               <PlayArrowTwoToneIcon fontSize="medium" />
//             </IconButton>
//           )}

//           {/* Stop Button */}
//           <IconButton
//             size="small"
//             color="error"
//             onClick={() => {
//               setUrl("");
//               setPlaying(false);
//             }}
//           >
//             <StopTwoToneIcon fontSize="medium" />
//           </IconButton>

//           {/* Volume Slider */}
//           <ContinuousSlider
//             volume={volume}
//             setVolume={setVolume}
//             mute={mute}
//             setMute={setMute}
//           />
//         </div>

//         {/* Fullscreen */}
//         <IconButton
//           size="small"
//           color="warning"
//           onClick={handleFullScreen}
//           title="Fullscreen"
//         >
//           <FullscreenTwoToneIcon fontSize="medium" />
//         </IconButton>
//       </div>

//       {/* Video Player */}
//       <ReactPlayer
//         className="react-player"
//         playing={playing}
//         muted={mute}
//         url={url}
//         width="100%"
//         height="100%"
//         volume={volume}
//         playsinline
//         config={{
//           file: {
//             attributes: {
//               crossOrigin: "anonymous",
//             },
//           },
//         }}
//       />
//     </div>
//   );
// }

// export default HlsPlayer;
