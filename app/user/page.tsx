 "use client"
import PlayAllCamerasByRandom from '@/components/PlayAllCamerasByRandom';
import PlaySelectedCameras from '@/components/PlaySelectedCameras';
 import { useAppSelector } from '@/reduxtoolkit/store/Hooks';

function user() {
  
  const {isPlayAll}=useAppSelector((store)=>store.root.modal)
  
 
return (
  <>
  {
    isPlayAll ?<PlayAllCamerasByRandom/>:<PlaySelectedCameras/>
  }
 
  </>
)
}

export default user;
