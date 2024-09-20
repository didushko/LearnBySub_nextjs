import Header from "@/components/header/Header";
import ShowOnAuthPagesWrapper from "../ShowOnAuthPagesWrapper";

export default function HeaderSlot({
  searchParams,
}: {
  searchParams: {
    search?: string;
  };
}) {
  return (
    <ShowOnAuthPagesWrapper>
      <Header query={searchParams.search || ""} />
    </ShowOnAuthPagesWrapper>
  );
}
