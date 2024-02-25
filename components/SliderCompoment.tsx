"use client"
import { Swiper, SwiperSlide } from "swiper/react"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/grid';
import "swiper/css/mousewheel"
import "swiper/css/keyboard"
import { Navigation, Pagination, Scrollbar, A11y, Grid,Mousewheel,Keyboard } from 'swiper/modules';
import Videoplayer from "./ReactPlayer";
import { useAppSelector } from "@/reduxtoolkit/store/Hooks";
import { camera } from "@/typescript.definations";

type selectedCamera={
  selectedCamera:camera[]
}
function SliderCompoment({selectedCamera}:selectedCamera){
  const {isPlayAll}=useAppSelector((store)=>store.root.modal)
  
let slidePerPage;
 isPlayAll?slidePerPage=4:slidePerPage=3
   return (
   
     <section className="px-1 md:px-2 xl:px-3">
    <Swiper 
       className=""
       modules={[Mousewheel,Keyboard,Navigation, Pagination, Scrollbar, A11y,Grid]}
      spaceBetween={10}
      slidesPerView={slidePerPage}
      mousewheel
      keyboard
      
      // autoplay
      grid={{
        fill:"row",
        rows:2
      }}
      
      pagination={true}
      scrollbar={{ draggable: true }}
      // onSwiper={(swiper) => console.log(swiper)}
      // onSlideChange={() => console.log('slide change')}
      onSlideResetTransitionEnd={(props)=>console.log(props)}
      navigation={true}
      
    >
        {
          selectedCamera?.map((cameraDetail:camera)=>(
              <SwiperSlide key={cameraDetail._id}  >
            <Videoplayer camera={cameraDetail}/>
            
          </SwiperSlide>
          ))
        }
       
    </Swiper>
    </section>




    
   
  )
}

export default SliderCompoment