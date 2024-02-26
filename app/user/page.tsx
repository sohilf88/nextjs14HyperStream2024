 "use client"
import axios from 'axios';
import SliderCompoment from '@/components/SliderCompoment';
import { useAppSelector } from '@/reduxtoolkit/store/Hooks';
import { useEffect,useState } from 'react';


function user() {
  
  const {isPlayAll}=useAppSelector((store)=>store.root.modal)
  const {selectedCamera} =useAppSelector((store)=>store.root.cameras)
  const [filteredData,setFilteredData]=useState()
  async function getFilteredCameras(){
    const response=await axios.get("http://127.0.0.1:5000/api/v1/camera/filtered")
    setFilteredData(response.data.result)
   
  }
 useEffect(()=>{
  getFilteredCameras()
 },[])

return (
  <>
  
  <div className='md:mt-44 lg:mt-16 2xl:mt-20'></div>
  {
    
    // isPlayAll ?<PlayAllCamerasByRandom/>:<PlaySelectedCameras />
    isPlayAll?<SliderCompoment selectedCamera={filteredData}/>:<SliderCompoment selectedCamera={selectedCamera}/>
  }
 
  </>
)
}

export default user;
