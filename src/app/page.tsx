"use client";

import SearchInput from "@/components/SearchInput";
import { getSavedReposPath } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const savedReposPath = getSavedReposPath();
    if (savedReposPath !== "/") {
      router.push(savedReposPath);
    }
  }, [router]);

  return (
    <div className="flex flex-col gap-4 p-4">
      <SearchInput />
    </div>
  );
}
