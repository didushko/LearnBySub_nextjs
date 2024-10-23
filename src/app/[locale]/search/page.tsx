import SearchResult from "@/components/search/SearchResult";

export default function Search({
  params,
  searchParams,
}: {
  params: { search: string; locale: string };
  searchParams: { [key: string]: string | undefined };
}) {
  return (
    <>
      <div>Тут будуть якісь фільри</div>
      <SearchResult
        query={searchParams.query || ""}
        searchParams={searchParams}
        locale={params.locale}
      />
    </>
  );
}
