import Header from "@/components/header/Header";
import ShowOnAuthPagesWrapper from "@/components/common/ShowOnAuthPagesWrapper";

export default function HeaderSlot({
  searchParams,
  params,
}: {
  searchParams: {
    search?: string;
  };
  params: {
    locale: string;
  };
}) {
  return (
    <ShowOnAuthPagesWrapper>
      <Header query={searchParams.search || ""} locale={params.locale} />
    </ShowOnAuthPagesWrapper>
  );
}
