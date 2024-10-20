import SearchResult from "@/components/header/search/SearchResult";

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
        query={searchParams["search"] || ""}
        locale={params.locale}
      />
    </>
  );
}
