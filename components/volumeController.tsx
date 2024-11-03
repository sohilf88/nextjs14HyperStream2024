


import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUp from '@mui/icons-material/VolumeUp';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeDownTwoToneIcon from '@mui/icons-material/VolumeDownTwoTone';
import VolumeOffTwoToneIcon from '@mui/icons-material/VolumeOffTwoTone';
import {IconButton, Slider} from "@mui/material";
export default function ContinuousSlider(props:any) {
const {volume,mute,setVolume,setMute}=props

  const handleChange = (event: Event, newValue: number | number[]) => {
    setVolume(newValue as number);
    
    if(volume===0){
        setMute(true)
    }else{
       setMute(false);
    }
    
  };
   
  function muteOnClick(){
    setMute(true)
    setVolume(0)
  }

  function unMuteOnClick(){
    setMute(false)
    setVolume(0.5)
  }
  return (
    <div className="relative" >
      <div className="flex gap-2 w-[110px] items-center transition-all duration-200">
        {volume===0?(<IconButton onClick={unMuteOnClick}><VolumeOffTwoToneIcon color='primary' /></IconButton>  ):<IconButton onClick={muteOnClick}>{volume>=0.8?<VolumeUpIcon color='primary' />:<VolumeDownTwoToneIcon color='primary'/>}</IconButton>}
        <Slider size="small" marks aria-label="Volume" value={volume} onChange={handleChange} min={0} max={1.0} step={0.2} />
        {/* {props.volume!==0 && <VolumeUp color='primary' />} */}
      </div>
      
    </div>
  );
}
