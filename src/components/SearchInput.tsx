"use client";

import { useEffect, useRef } from "react";
import { Input } from "./ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { CircleX } from "lucide-react";
import { getSavedRepos } from "@/lib/utils";

const SearchInput = () => {
  const ref = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const q = searchParams.getAll("q");

  useEffect(() => {
    if (q.length > 0) {
      return;
    }
    const savedRepos = getSavedRepos();
    if (savedRepos.length) {
      const params = new URLSearchParams();
      savedRepos.forEach((repo) => {
        params.append("q", repo);
      });
      const result = params.toString();
      router.push(`?${result}`);
    }
  }, [q.length, router]);

  const repos = q;

  const handleClick = () => {
    if (ref.current && ref.current.value) {
      const params = new URLSearchParams(searchParams.toString());
      if (!params.has("q", ref.current.value)) {
        params.append("q", ref.current.value);
      }
      const result = params.toString();
      localStorage.setItem("repos", result);
      router.push(`?${result}`);
      ref.current.value = "";
    }
  };

  const handleDelete = (repo: string) => () => {
    const params = new URLSearchParams(searchParams.toString());
    if (params.has("q")) {
      params.delete("q", repo);
    } else {
      repos.forEach((currentRepo) => {
        if (currentRepo !== repo) {
          params.append("q", currentRepo);
        }
      });
    }
    const result = params.toString();
    localStorage.setItem("repos", result);
    router.push(`?${result}`);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Input ref={ref} />
        <Button onClick={handleClick}>Add</Button>
      </div>
      <div className="flex gap-2">
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
      </div>
    </div>
  );
};

export default SearchInput;
