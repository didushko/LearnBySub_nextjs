import { Suspense } from "react";
import Card from "./Card";
import styled from "./Card.module.css";
import tmdbService from "@/services/tmdb-service";
import GridCardLoader from "./Loaders/GridCardLodader";

interface ICardGrid {
  type: "movie" | "tv";
  discover: "top_rated" | "trend_day" | "trend_week" | "popular";
  locale: string;
}

const CardsGrid = async ({ type, discover, locale }: ICardGrid) => {
  try {
    const data = (await tmdbService.discoverRequest(type, discover, locale))
      .results;
    return (
      <div className={styled.cardGrid}>
        {data.map((el, i) => (
          <Card key={el.id} media={el} type={type} index={i} />
        ))}
      </div>
    );
  } catch (e) {
    ///TODO normal error
    return (
      <div className={styled.cardGrid}>
        <div>Error with TMDB login</div>;
      </div>
    );
  }
};

const CardGridWithSuspense = async (args: ICardGrid) =>
  <Suspense
    key={args.type + args.discover + args.locale}
    fallback={<GridCardLoader />}
  >
    <CardsGrid {...args} />
  </Suspense>

export default CardGridWithSuspense