import Card from "./Card";
import styled from "./Card.module.css";
import tmdbService from "@/services/tmdb-service";

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

export default CardsGrid;
