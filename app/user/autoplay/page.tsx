"use client";

import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { axiosAuth } from "@/app/lib/axios";
import { errorHandler } from "@/hooks/useTableHook";
import PaginationClient from "@/components/Pagination";
import HlsPlayer from "@/components/hslplayer";
import type { camera, usersData } from "@/typescript.definations";

// -------------------------------
// 🔹 Types
// -------------------------------
interface PaginationClientProps {
  hasNext: boolean;
  hasPrevious: boolean;
  data: {
    message: camera[];
    totalCount: number;
    countPerPage: number;
  };
  onNext?: () => void; // ✅ new optional prop
  onPrevious?: () => void; // ✅ new optional prop
}
interface DataDetail {
  message: camera[];
  success: boolean;
  totalCount: number;
  countPerPage: number;
}
export default function Autoplay() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? 6);

  // Pagination range
  const start = (currentPage - 1) * limit;
  const end = start + limit;

  const [data, setData] = useState<DataDetail>({
    success: false,
    message: [],
    totalCount: 0,
    countPerPage: 0,
  });

  // 🔸 Autoplay control flags
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(true);
  const pauseTimer = useRef<NodeJS.Timeout | null>(null);

  // -------------------------------
  // 🔹 Fetch data
  // -------------------------------
  const getFilteredData = useCallback(async () => {
    try {
      const response = await axiosAuth.get(`/camera/filtered`, {
        params: { page: currentPage, limit },
      });
      if (response.data) setData(response.data);
    } catch (error) {
      errorHandler(error);
    }
  }, [currentPage, limit]);

  useEffect(() => {
    getFilteredData();
  }, [getFilteredData]);

  // -------------------------------
  // 🔹 Handle Auto Pagination
  // -------------------------------
  useEffect(() => {
    if (!data.totalCount || !autoPlayEnabled) return;

    const totalPages = Math.ceil(data.totalCount / limit);
    const interval = setInterval(() => {
      let nextPage = currentPage + 1;
      if (nextPage > totalPages) nextPage = 1; // loop to start
      router.push(`?page=${nextPage}&limit=${limit}`);
    }, 10000); // switch page every 10 sec

    return () => clearInterval(interval);
  }, [currentPage, data.totalCount, limit, autoPlayEnabled, router]);

  // -------------------------------
  // 🔹 Handle Manual Pagination (pause autoplay for 30s)
  // -------------------------------
  const handleManualNavigation = useCallback(
    (newPage: number) => {
      setAutoPlayEnabled(false);
      if (pauseTimer.current) clearTimeout(pauseTimer.current);
      pauseTimer.current = setTimeout(() => setAutoPlayEnabled(true), 30000); // resume after 30s
      router.push(`?page=${newPage}&limit=${limit}`);
    },
    [limit, router]
  );

  // -------------------------------
  // 🔹 Pagination info
  // -------------------------------
  const { hasNext, hasPrevious, gridCols } = useMemo(() => {
    return {
      hasNext: end < data.totalCount,
      hasPrevious: start > 0,
      gridCols: limit / 2 === 3 ? "grid-cols-3" : "lg:grid-cols-4",
    };
  }, [end, start, limit, data.totalCount]);

  // -------------------------------
  // 🔹 Render
  // -------------------------------
  return (
    <main className="min-h-screen bg-loginImage">
      {/* Pagination Header */}
      <section className="pt-3 pb-5">
        <PaginationClient
          data={data}
          hasNext={hasNext}
          hasPrevious={hasPrevious}
          // @ts-ignore
          onNext={() => handleManualNavigation(currentPage + 1)}
          onPrevious={() => handleManualNavigation(currentPage - 1)}
        />
      </section>

      {/* Video Grid */}
      <section
        className={`grid ${gridCols} gap-x-2 gap-y-3 mx-2 transition-all duration-150`}
      >
        {data?.message.map((item) => (
          <div
            key={item._id}
            id={item._id}
            className="rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition"
          >
            <HlsPlayer item={item} />
          </div>
        ))}
      </section>
    </main>
  );
}
