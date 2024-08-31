import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { differenceInWeeks, format, formatDistanceToNow } from "date-fns";
import { Badge } from "./ui/badge";
import { Release } from "@/lib/types";
import MDX from "./MDX";

type Props = {
  release: Release;
};

const ReleaseCard = async ({ release }: Props) => {
  if ("error" in release) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            N/A -{" "}
            <a
              href={`https://github.com/${release.repo.owner}/${release.repo.repo}`}
            >{`${release.repo.owner}/${release.repo.repo}`}</a>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>{release.error.message}</p>
        </CardContent>
      </Card>
    );
  }

  const isRecent =
    !!release.data.published_at &&
    differenceInWeeks(Date.now(), release.data.published_at) < 1;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="sm:item-center flex flex-col items-start gap-2 sm:flex-row">
          {isRecent && <Badge variant="destructive">New</Badge>}
          <span className="overflow-hidden break-words">
            {release.data.name || release.data.tag_name} -{" "}
            <a
              href={`https://github.com/${release.repo.owner}/${release.repo.repo}`}
            >{`${release.repo.owner}/${release.repo.repo}`}</a>
          </span>
        </CardTitle>
        {release.data.published_at && (
          <CardDescription>
            {isRecent
              ? formatDistanceToNow(release.data.published_at, {
                  addSuffix: true,
                })
              : format(release.data.published_at, "do MMMM yyyy")}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="break-words">
        <MDX source={release.data.body} />
      </CardContent>
      <CardFooter>
        <Button variant="secondary" asChild>
          <a
            href={release.data.html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            View in GitHub
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ReleaseCard;
