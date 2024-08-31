import { MDXRemote } from "next-mdx-remote/rsc";
import { visit } from "unist-util-visit";
import H1 from "./typography/H1";
import H2 from "./typography/H2";
import H3 from "./typography/H3";
import H4 from "./typography/H4";
import P from "./typography/P";
import Blockquote from "./typography/Blockquote";
import List from "./typography/List";
import Pre from "./typography/Pre";
import { ReleaseData } from "@/lib/types";
import Link from "./typography/Link";

type Props = {
  source: ReleaseData["body"];
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

const MDX = async ({ source }: Props) => {
  try {
    return await MDXRemote({
      source: source || "",
      options: {
        mdxOptions: {
          remarkPlugins: [customDirective],
        },
      },
      components: {
        h1: H1,
        h2: H2,
        h3: H3,
        h4: H4,
        p: P,
        blockquote: Blockquote,
        ul: List,
        pre: Pre,
        a: Link,
      },
    });
  } catch (error) {
    return (
      <>
        {error instanceof Error && (
          <p className="text-red-600">{error.message}</p>
        )}
        <p className="whitespace-pre-wrap">{source}</p>
      </>
    );
  }
};

export default MDX;
