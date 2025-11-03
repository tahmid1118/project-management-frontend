"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard on load
    router.push("/dashboard");
  }, [router]);

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-[#432c52] via-[#2a3b36] to-[#432c52]">
      <div className="text-white text-lg">Loading ProjectFlow...</div>
    </div>
  );
}
