"use client";
import ReactPlayer from "react-player";
import { useEffect, useRef, useState } from "react";
import { camera } from "@/typescript.definations";
import {IconButton } from "@mui/material";
import PlayArrowTwoToneIcon from '@mui/icons-material/PlayArrowTwoTone';
import StopTwoToneIcon from '@mui/icons-material/StopTwoTone';
import PauseCircleFilledTwoToneIcon from '@mui/icons-material/PauseCircleFilledTwoTone';
import VolumeDownTwoToneIcon from '@mui/icons-material/VolumeDownTwoTone';
import VolumeOffTwoToneIcon from '@mui/icons-material/VolumeOffTwoTone';
import FullscreenTwoToneIcon from '@mui/icons-material/FullscreenTwoTone';
import FullscreenExitTwoToneIcon from '@mui/icons-material/FullscreenExitTwoTone';


function HlsPlayer({item}:{
  item:camera
}) {
 

  const [mounted, setMounted] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [mute, setMute] = useState(true);
  const [url,setUrl]=useState(item.url)
  const [isFullScreen,setIsFulScreen]=useState(false)

 



  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (mounted)
    return (
     
        <div className="player-wrapper relative ">
          <div className="text-white absolute top-1 left-1 z-50 flex justify-start gap-5 italic uppercase font-extralight text-xs font-mono tracking-wider">
            <span>{item?.name}</span>
            <span>{item?.city}</span>
            <span>{item?.taluka}</span>
            <span>{item?.area}</span>
          </div>
          <div className="absolute group -bottom-1 transition-all duration-150 z-50 w-full flex  gap-2 justify-between items-center ">
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
          
          {/* mute or unmute */}
          {
            mute?(<IconButton color="warning"
            onClick={()=>setMute(!mute)}>
            <VolumeOffTwoToneIcon/>
           </IconButton>):(<IconButton color="warning" onClick={()=>setMute(!mute)}>
            <VolumeDownTwoToneIcon/>
           </IconButton>)

          }
           </div>
           

            {/* fullscreen and exit */}
            <div>
            {
              isFullScreen?(<IconButton color="error" >
            <FullscreenExitTwoToneIcon/>
           </IconButton>):(<IconButton  color="primary" >
            <FullscreenTwoToneIcon/>
           </IconButton>)
            }
             </div>
           
            
            
            
           
          </div>
         <ReactPlayer
            className="react-player"
            playing={playing}
            muted={mute}
            url={url}
            
            width="100%"
            height="100%"
            volume={0.5}
            
            
           
           
          />
        </div>
      
    );
}

export default HlsPlayer;