import Card from "./Card";
import { IMovie, ITv } from "@/interfaces/media";
import styled from "./Card.module.css";
import tmdbService from "@/services/tmdb-service";
import GridCardLoader from "../loaders/GridCardLodader";
import { Suspense } from "react";

interface ICardGrid {
  type: "movie" | "tv";
  discover: "popular" | "top_rated" | "trend_day" | "trend_week";
}

const CardsGrid = async ({ type, discover }: ICardGrid) => {
  try {
    const data = (await tmdbService.discoverRequest(type, discover, "en"))
      .results;

    // return <GridCardLoader />;
    return (
      <Suspense
        key={"GridCard" + type + discover}
        fallback={<GridCardLoader />}
      >
        <div className={styled.cardGrid}>
          {data.map((el) => (
            <Card key={el.id} media={el} type={type} />
          ))}
        </div>
      </Suspense>
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

export default CardsGrid;
