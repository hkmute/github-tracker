"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { CircleX } from "lucide-react";
import { decodeRepoPath, encodeRepo } from "@/lib/utils";

type Props = {
  searchResults: ReactNode;
};

const SearchInput = ({ searchResults }: Props) => {
  const ref = useRef<HTMLInputElement>(null);
  const searchResultRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const params = useParams<{ compare?: string }>();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const repos = decodeRepoPath(params.compare ?? "");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchResultRef.current &&
        !searchResultRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (timer) {
      clearTimeout(timer);
    }
    const newTimer = setTimeout(() => {
      router.push("?q=" + encodeURIComponent(event.target.value));
      setOpen(true);
    }, 500);
    setTimer(newTimer);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (repo: string) => () => {
    const encodedRepo = encodeRepo(repo);
    const newPath =
      ("--" + params.compare + "--")
        .replace("--" + encodedRepo, "")
        .replace(/--$/, "")
        .replace(/^--/, "") || "/";
    localStorage.setItem("repos", newPath);
    router.push(newPath);
  };

  const handleClearAll = () => {
    localStorage.setItem("repos", "/");
    router.push("/");
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="relative flex gap-2">
        <Input
          ref={ref}
          placeholder="Search for a repository"
          defaultValue={searchParams.get("q") ?? ""}
          onChange={handleChange}
        />
        {open && (
          <div
            ref={searchResultRef}
            className="absolute top-full mt-1 w-full rounded bg-background/75 py-2 backdrop-blur-sm"
            onClick={handleClose}
          >
            {searchResults}
          </div>
        )}
      </div>

      {!!repos.length && (
        <div className="flex flex-wrap items-center gap-2">
          {repos.map((repo, index) => (
            <Badge key={index} className="flex items-center gap-0.5">
              {repo}
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5 hover:bg-transparent"
                onClick={handleDelete(repo)}
              >
                <CircleX className="h-4 w-4" />
              </Button>
            </Badge>
          ))}
          <Button size="sm" variant="ghost" onClick={handleClearAll}>
            Clear All
          </Button>
        </div>
      )}
    </div>
  );
};

export default SearchInput;
