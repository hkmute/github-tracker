import octokit from "@/lib/octokit";
import ReleaseCard from "./ReleaseCard";
import { Fragment } from "react";
import { compareDesc } from "date-fns";

const ReleaseCardList = async ({
  repos,
}: {
  repos: {
    owner: string;
    repo: string;
  }[];
}) => {
  const releases = await Promise.all(
    repos.map(async ({ owner, repo }) => {
      try {
        const result = await octokit.rest.repos.getLatestRelease({
          owner,
          repo,
        });
        return {
          repo: {
            owner,
            repo,
          },
          data: result.data,
        };
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unexpected error";
        console.error(
          `Error fetching release for ${owner}/${repo}:`,
          errorMessage,
        );
        return null;
      }
    }),
  );

  const sortedReleases = releases.sort((a, b) => {
    return compareDesc(
      new Date(a?.data.published_at ?? 0),
      new Date(b?.data.published_at ?? 0),
    );
  });

  return (
    <div className="flex flex-col gap-4">
      {sortedReleases.map((release, index) => (
        <Fragment
          key={release ? `${release.repo.owner}/${release.repo.repo}` : index}
        >
          {release && <ReleaseCard release={release} />}
        </Fragment>
      ))}
    </div>
  );
};

export default ReleaseCardList;
