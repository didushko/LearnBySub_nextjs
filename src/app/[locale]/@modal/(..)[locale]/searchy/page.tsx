import SearchResult from "@/components/search/SearchResult";
import SearchModal from "./searchModal";

export default function Search({
  searchParams,
  params,
}: {
  searchParams: {
    query?: string;
  };
  params: {
    locale: string;
  };
}) {
  return (
    <SearchModal>
      <SearchResult query={searchParams.query || ""} locale={params.locale} />
    </SearchModal>
  );
}
