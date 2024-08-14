import ReleaseCardList from "@/components/ReleaseCardList";
import SearchInput from "@/components/SearchInput";
import { decodeRepoPath } from "@/lib/utils";
import { Suspense } from "react";

const ComparePage = ({
  params: { compare },
}: {
  params: { compare: string };
}) => {
  const repos = decodeRepoPath(compare).map((item) => {
    const [repo, owner] = item.split("/");
    return {
      repo,
      owner,
    };
  });

  return (
    <div className="flex flex-col gap-4 p-4">
      <SearchInput />
      <Suspense fallback={<div>Loading...</div>}>
        <ReleaseCardList repos={repos} />
      </Suspense>
    </div>
  );
};

export default ComparePage;
