import ReleaseCardList from "@/components/ReleaseCardList";
import SearchInput from "@/components/SearchInput";
import SearchResults from "@/components/SearchResults";
import { decodeRepoPath } from "@/lib/utils";
import { Suspense } from "react";

const ComparePage = ({
  params: { compare },
  searchParams,
}: {
  params: { compare: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const repos = decodeRepoPath(compare).map((item) => {
    const [owner, repo] = item.split("/");
    return {
      repo,
      owner,
    };
  });

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
      <Suspense fallback={<div>Loading...</div>}>
        <ReleaseCardList repos={repos} />
      </Suspense>
    </div>
  );
};

export default ComparePage;
