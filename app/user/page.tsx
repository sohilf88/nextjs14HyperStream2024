 "use client"
 import { useAppSelector } from '@/reduxtoolkit/store/Hooks';

function user() {
  const data=useAppSelector((store)=>store.cameras.data)
  console.log(data);
 
return <div>User dashboard</div>;
}

export default user;
