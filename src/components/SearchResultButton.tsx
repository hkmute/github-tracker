"use client";

import { encodeRepo } from "@/lib/utils";
import { Button } from "./ui/button";
import { useParams, useRouter } from "next/navigation";

type Props = {
  repo: string;
};

const SearchResultButton = ({ repo }: Props) => {
  const params = useParams<{ compare?: string }>();
  const router = useRouter();

  const handleClick = () => {
    const newEncodedRepo = encodeRepo(repo);
    if (!params.compare?.includes(newEncodedRepo)) {
      const newPath = params.compare
        ? params.compare + "--" + newEncodedRepo
        : newEncodedRepo;
      localStorage.setItem("repos", newPath);
      router.push(newPath);
    }
  };

  return (
    <Button className="w-full" variant="ghost" onClick={handleClick}>
      {repo}
    </Button>
  );
};

export default SearchResultButton;
