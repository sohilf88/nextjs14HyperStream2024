"use client";
import ReactPlayer from "react-player";
import { useEffect, useRef, useState } from "react";
import { camera } from "@/typescript.definations";
import {IconButton, Slider } from "@mui/material";
import PlayArrowTwoToneIcon from '@mui/icons-material/PlayArrowTwoTone';
import StopTwoToneIcon from '@mui/icons-material/StopTwoTone';
import PauseCircleFilledTwoToneIcon from '@mui/icons-material/PauseCircleFilledTwoTone';

import FullscreenTwoToneIcon from '@mui/icons-material/FullscreenTwoTone';
import FullscreenExitTwoToneIcon from '@mui/icons-material/FullscreenExitTwoTone';
import { document } from "postcss";
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
          <div className="text-white absolute top-1 left-1 z-50 flex justify-start gap-5 italic uppercase font-extralight text-xs font-mono tracking-wider">
            <span>{item?.name}</span>
            <span>{item?.city}</span>
            <span>{item?.taluka}</span>
            <span>{item?.area}</span>
          </div>
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