import ReleaseCardList from "@/components/ReleaseCardList";

const repos = [
  {
    owner: "vercel",
    repo: "next.js",
  },
  {
    owner: "remix-run",
    repo: "remix",
  },
  {
    owner: "nestjs",
    repo: "nest",
  },
  {
    owner: "facebook",
    repo: "react",
  },
];

export default function Home() {
  return (
    <div className="p-4">
      <ReleaseCardList repos={repos} />
    </div>
  );
}
