import { Octokit } from "octokit";

const octokit = new Octokit({
  request: {
    fetch: (url: string | URL | globalThis.Request, options: RequestInit) =>
      fetch(url, {
        ...options,
        ...{
          next: {
            revalidate: 3600,
          },
        },
      }),
  },
});

export default octokit;
