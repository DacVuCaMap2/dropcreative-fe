"use client"

import { useSearchParams } from "next/navigation";

export default function TargetComponent() {

  const searchParams = useSearchParams();

  const message = searchParams.get("mess");
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">404 - Không tìm thấy trang</h2>
      {message && (
        <p className="text-red-500">{message}</p>
      )}
    </div>
  );
}