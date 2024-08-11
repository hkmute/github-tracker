import ReleaseCardList from "@/components/ReleaseCardList";
import SearchInput from "@/components/SearchInput";
import { Suspense } from "react";

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const q = searchParams.q
    ? Array.isArray(searchParams.q)
      ? searchParams.q
      : [searchParams.q]
    : [];

  const repos = q.map((item) => {
    const [owner, repo] = item.split("/");
    return { owner, repo };
  });

  return (
    <div className="flex flex-col gap-4 p-4">
      <SearchInput />
      <Suspense fallback={<div>Loading...</div>}>
        <ReleaseCardList repos={repos} />
      </Suspense>
    </div>
  );
}
