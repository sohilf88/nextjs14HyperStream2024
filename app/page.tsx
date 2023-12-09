"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/reduxtoolkit/store/Hooks";
import { getCameras } from "../reduxtoolkit/features/cameraSlice";

export default function Home() {
  const dispatch = useAppDispatch();
  const ref = useRef(false); //it is used to avoid useEffect running two times hence used

  useEffect(() => {
    if (ref.current === false) {
      dispatch(getCameras());
    }
    return () => {
      ref.current = true;
    };
  }, []);

  return (
    <main>
      <Link href="/user">user</Link>
    </main>
  );
}
