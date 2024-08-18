import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const decodeRepoPath = (path: string) => {
  if (!path) {
    return [];
  }
  return path.split("--").map((item) => {
    const [name, owner] = decodeURIComponent(item).split("@");
    return `${owner}/${name}`;
  });
};

export const encodeRepo = (repo: string) => {
  const [owner, name] = repo.split("/");
  return encodeURIComponent(name + "@" + owner);
};

const DEFAULT_REPOS = [
  "vercel/next.js",
  "remix-run/remix",
  "nestjs/nest",
  "facebook/react",
  "tailwindlabs/tailwindcss",
  "prisma/prisma",
  "microsoft/TypeScript",
  "mui/material-ui",
  "nextui-org/nextui",
];

const DEFAULT_REPOS_URL_PATH = DEFAULT_REPOS.reduce((acc, repo) => {
  const encodedRepo = encodeRepo(repo);
  if (!acc) {
    return encodedRepo;
  }

  return acc + "--" + encodedRepo;
}, "");

export const getSavedReposPath = () => {
  try {
    const savedRepos = localStorage.getItem("repos");
    if (!savedRepos) {
      return DEFAULT_REPOS_URL_PATH;
    }
    if (savedRepos.length > 0) {
      // validate?
      return savedRepos;
    } else {
      return DEFAULT_REPOS_URL_PATH;
    }
  } catch (error) {
    console.error("Error getting repos from localStorage:", error);
    return DEFAULT_REPOS_URL_PATH;
  }
};
