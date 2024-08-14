"use client";

import { useRef } from "react";
import { Input } from "./ui/input";
import { useParams, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { CircleX } from "lucide-react";
import { decodeRepoPath, encodeRepo } from "@/lib/utils";

const SearchInput = () => {
  const ref = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const params = useParams<{ compare?: string }>();

  const repos = decodeRepoPath(params.compare ?? "");

  const handleClick = () => {
    if (ref.current && ref.current.value) {
      const newEncodedRepo = encodeRepo(ref.current.value);

      if (!params.compare?.includes(newEncodedRepo)) {
        const newPath = params.compare
          ? params.compare + "--" + newEncodedRepo
          : newEncodedRepo;
        localStorage.setItem("repos", newPath);
        router.push(newPath);
      }
      ref.current.value = "";
    }
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
      <div className="flex gap-2">
        <Input ref={ref} />
        <Button onClick={handleClick}>Add</Button>
      </div>
      {!!repos.length && (
        <div className="flex items-center gap-2">
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
