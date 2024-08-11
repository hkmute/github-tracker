import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const DEFAULT_REPOS = [
  "vercel/next.js",
  "remix-run/remix",
  "nestjs/nest",
  "facebook/react",
];

export const getSavedRepos = () => {
  try {
    const savedRepos = localStorage.getItem("repos");
    if (!savedRepos) {
      return DEFAULT_REPOS;
    }
    const repos = new URLSearchParams(savedRepos).getAll("q");
    if (repos.length > 0) {
      return repos as string[];
    } else {
      return DEFAULT_REPOS;
    }
  } catch (error) {
    console.error("Error getting repos from localStorage:", error);
    return DEFAULT_REPOS;
  }
};
