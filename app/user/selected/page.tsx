// "use client"

// import PaginationControls from "@/components/PaginationControls"
// import HlsPlayer from "@/components/hslplayer"
// import { useAppSelector } from "@/reduxtoolkit/store/Hooks"
// import { camera } from "@/typescript.definations"
// import { useSearchParams } from "next/navigation"
// import html2canvas from 'html2canvas';
// import { toast } from 'sonner';
// import { Button } from "@mui/material"

// function page() {

//   // able to capture html element only, unable to capture video in  below code, need improvement

//   function takeSnapshot(){
//     const screenshot=document.getElementById("capture-selected")
//   if(screenshot){
//     html2canvas(screenshot).then((canvas)=>{
//       let image=canvas.toDataURL("image/jpg")
//       const capturedImage=document.createElement("a")
//       capturedImage.href=image
//       capturedImage.download=`snapshot-${Date.now()}`
//       capturedImage.click()
//     }).catch((error)=>toast.error(error))
//   }

//   }

//   const searchParams=useSearchParams()
//   const page=searchParams.get("page") ?? '1'
//   const per_page=searchParams.get("per_page") ?? '6'

//    const start = (Number(page) - 1) * Number(per_page) // 0, 5, 10 ...
//    const end = start + Number(per_page) // 5, 10, 15 ...

//     const {selectedCamera}=useAppSelector((store)=>store.root.cameras)
//     const entries = selectedCamera.slice(start, end)

//     const hasNext=(end < selectedCamera.length)
//     const hasPrevious=(start>0)
//   return (
//     <main id="capture-selected">
//        <div className='h-16 flex items-center justify-center font-semibold text-white/60 text-xl tracking-wider px-2 shadow-xl'>
//           <PaginationControls
//            hasNextPage={hasNext}
//            hasPrevPage={hasPrevious}
//            totalCount={selectedCamera.length}
//           />
//           {/* need to develope more, unable to capture running video in snapshot. */}
//           {/* <Button onClick={takeSnapshot}>snapshot</Button> */}
//         </div>
//         <div className="py-1 3xl:py-6"></div>
//       <div className=" mx-1 grid grid-cols-3 gap-x-1 gap-y-1 3xl:gap-y-3 3xl:gap-x-3">

//    {
//     entries.map((item:camera)=>(
//       <div className="shadow-xl" key={item._id} id={item._id}>
//          <HlsPlayer item={item}/>

//       </div>
//     ))
//    }
//    </div>
//    </main>
//   )
// }

// export default page

// improved code

"use client";

import PaginationControls from "@/components/PaginationControls";

import { useAppSelector } from "@/reduxtoolkit/store/Hooks";
import { camera } from "@/typescript.definations";
import { useSearchParams } from "next/navigation";
import html2canvas from "html2canvas";
import { toast } from "sonner";
import { Button } from "@mui/material";
import HlsPlayerForSelected from "@/components/HlsPlayerForSelected";
import HlsPlayer from "@/components/hslplayer";

export default function Page() {
  // 🔹 Capture snapshot including video frames
  async function takeSnapshot() {
    try {
      const container = document.getElementById("capture-selected");
      if (!container) return toast.error("No content to capture!");

      // Capture all video elements and draw them to canvas
      const videos = container.querySelectorAll("video");
      videos.forEach((video) => {
        try {
          const canvas = document.createElement("canvas");
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const ctx = canvas.getContext("2d");
          if (ctx) ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

          // Replace video element temporarily with the captured frame
          const img = document.createElement("img");
          img.src = canvas.toDataURL("image/jpeg");
          img.style.width = `${video.clientWidth}px`;
          img.style.height = `${video.clientHeight}px`;
          video.parentNode?.insertBefore(img, video);
          video.style.display = "none";
        } catch (err) {
          console.warn("Video frame skipped (CORS issue):", err);
        }
      });

      // Capture full screen
      const canvas = await html2canvas(container, {
        useCORS: true,
        logging: false,
        scale: 2,
      });

      const image = canvas.toDataURL("image/jpeg");
      const link = document.createElement("a");
      link.href = image;
      link.download = `snapshot-${Date.now()}.jpg`;
      link.click();
      toast.success("Snapshot saved!");

      // Restore videos
      videos.forEach((video) => {
        const nextSibling = video.previousSibling as HTMLImageElement;
        if (nextSibling?.tagName === "IMG") nextSibling.remove();
        video.style.display = "block";
      });
    } catch (error) {
      console.error("Snapshot failed:", error);
      toast.error("Failed to capture snapshot");
    }
  }

  // 🔹 Pagination setup
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "1";
  const per_page = searchParams.get("per_page") ?? "6";
  const start = (Number(page) - 1) * Number(per_page);
  const end = start + Number(per_page);

  // 🔹 Selected cameras from Redux
  const { selectedCamera } = useAppSelector((store) => store.root.cameras);
  const entries = selectedCamera.slice(start, end);
  const hasNext = end < selectedCamera.length;
  const hasPrevious = start > 0;

  return (
    <main
      id="capture-selected"
      className="min-h-screen bg-zinc-900 text-white p-2 md:p-4"
    >
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 bg-zinc-800/80 backdrop-blur-md shadow-md rounded-lg mb-4">
        <PaginationControls
          hasNextPage={hasNext}
          hasPrevPage={hasPrevious}
          totalCount={selectedCamera.length}
        />
        <Button
          onClick={takeSnapshot}
          variant="outlined"
          size="small"
          sx={{
            borderColor: "#aaa",
            color: "#fff",
            textTransform: "none",
            "&:hover": { borderColor: "#fff", backgroundColor: "#333" },
          }}
        >
          Snapshot
        </Button>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
        {entries.length === 0 ? (
          <div className="col-span-full text-center py-10 text-zinc-400">
            No cameras selected.
          </div>
        ) : (
          entries.map((item: camera) => (
            <div
              key={item._id}
              id={item._id}
              className="relative bg-black rounded-lg overflow-hidden shadow-lg"
            >
              <HlsPlayer item={item} />
              <div className="absolute top-0 right-3 bg-black/40 px-2 py-1 text-sm text-white flex flex-wrap gap-x-4 justify-end text-right w-full">
  <span>{item.name ?? "Unnamed"}</span>
  <span>{item.district ?? ""}</span>
  <span>{item.city ?? ""}</span>
  <span>{item.area ?? ""}</span>
</div>


              
              {/* <div className="absolute top-0 left-0 w-full bg-black/60 px-2 py-1 text-sm truncate ">
                {item.name ?? "Unnamed Camera"}
                {item.district ?? "Unnamed Camera"}
                {item.city ?? "Unnamed Camera"}
                {item.area ?? "Unnamed Camera"}
              </div> */}
            </div>
          ))
        )}
      </div>
    </main>
  );
}
