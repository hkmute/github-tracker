import octokit from "@/lib/octokit";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { MDXRemote } from "next-mdx-remote/rsc";
import { visit } from "unist-util-visit";
import H1 from "./typography/H1";
import H2 from "./typography/H2";
import H3 from "./typography/H3";
import H4 from "./typography/H4";
import P from "./typography/P";
import Blockquote from "./typography/Blockquote";
import List from "./typography/List";
import { Button } from "./ui/button";
import { differenceInWeeks, format, formatDistanceToNow } from "date-fns";
import { Badge } from "./ui/badge";

type Props = {
  release: {
    repo: {
      owner: string;
      repo: string;
    };
  } & (
    | {
        data: Awaited<
          ReturnType<typeof octokit.rest.repos.getLatestRelease>
        >["data"];
      }
    | {
        error: {
          message: string;
        };
      }
  );
};

const customDirective = () => {
  return (tree: any) => {
    visit(tree, "paragraph", (node) => {
      const { children } = node;
      if (children && children[0] && children[0].type === "text") {
        const text = children[0].value;
        const match = text.match(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/);
        if (match) {
          node.children = node.children.slice(2);
        }
      }
    });
  };
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
    differenceInWeeks(release.data.published_at, Date.now()) > 1;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {isRecent && <Badge variant="destructive">New</Badge>}
          {release.data.name || release.data.tag_name} -{" "}
          <a
            href={`https://github.com/${release.repo.owner}/${release.repo.repo}`}
          >{`${release.repo.owner}/${release.repo.repo}`}</a>
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
      <CardContent>
        <MDXRemote
          source={release.data.body || ""}
          options={{
            mdxOptions: {
              remarkPlugins: [customDirective],
            },
          }}
          components={{
            h1: H1,
            h2: H2,
            h3: H3,
            h4: H4,
            p: P,
            blockquote: Blockquote,
            ul: List,
          }}
        />
        {/* <p className="whitespace-pre">
            {JSON.stringify(release.data, null, 2)}
          </p> */}
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
