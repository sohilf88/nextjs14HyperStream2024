 "use client"
 import { useAppSelector } from '@/reduxtoolkit/store/Hooks';

function user() {
  const data=useAppSelector((store)=>store.root.cameras.selectedCamera)
  console.log(data);
 
return (
  <>
  {
    data.map((id)=>{
      return <h1 key={id._id}>{id.name}</h1>
    })
  }
  </>
)
}

export default user;
