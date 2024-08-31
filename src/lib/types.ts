import octokit from "./octokit";

export type Release = {
  repo: {
    owner: string;
    repo: string;
  };
} & (
  | {
      data: ReleaseData;
    }
  | {
      error: {
        message: string;
      };
    }
);

export type ReleaseData = Awaited<
  ReturnType<typeof octokit.rest.repos.getLatestRelease>
>["data"];
