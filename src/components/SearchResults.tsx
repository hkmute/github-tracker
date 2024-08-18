import octokit from "@/lib/octokit";
import SearchResultButton from "./SearchResultButton";

type Props = {
  search: string;
};

const SearchResults = async ({ search }: Props) => {
  if (!search) {
    return null;
  }

  try {
    const result = await octokit.rest.search.repos({
      q: search,
      sort: "stars",
      order: "desc",
      per_page: 10,
    });

    if (!result.data.items.length) {
      return <div className="w-full">No results found</div>;
    }

    return (
      <div>
        {result.data.items.map((item) => (
          <SearchResultButton key={item.id} repo={item.full_name} />
        ))}
      </div>
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unexpected error";
    console.error("Error fetching search results:", errorMessage);
    return (
      <div className="w-full">
        Error fetching search results.
        {errorMessage.includes("API rate limit exceeded") && " (Rate limited)"}
      </div>
    );
  }
};

export default SearchResults;
