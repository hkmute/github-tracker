"use client";

import SearchInput from "@/components/SearchInput";
import SearchResults from "@/components/SearchResults";
import { getSavedReposPath } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const router = useRouter();

  useEffect(() => {
    const savedReposPath = getSavedReposPath();
    if (savedReposPath !== "/") {
      router.push(savedReposPath);
    }
  }, [router]);

  const search = searchParams.q as string;

  return (
    <div className="flex flex-col gap-4 p-4">
      <SearchInput
        searchResults={
          <Suspense fallback={<div>Loading...</div>}>
            <SearchResults search={search} />
          </Suspense>
        }
      />
    </div>
  );
}
