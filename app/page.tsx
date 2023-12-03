"use client";
import Link from "next/link";
import { useEffect } from "react";
import { useAppDispatch,useAppSelector } from "@/reduxtoolkit/store/Hooks";
import {getCameras} from "../reduxtoolkit/features/cameraSlice"

export default function Home() {
  const dispatch = useAppDispatch()
  
  useEffect(() => {
    dispatch(getCameras())

  }, []);
  

  return <main>
    <Link href="/user">user</Link>
  </main>;
}
