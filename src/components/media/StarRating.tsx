import React from "react";
import styles from "./Card.module.css";

const StarRatingSolo = ({
  rate,
  size = 40,
  position,
}: {
  rate: number;
  size?: number;
  position?: number;
}) => {
  const strokeColor = "#d3aa15";
  const fillColor = "rgba(199, 190, 67, 0.9)";
  const backgroundColor = "#517ce8";
  const percentage = rate * 10;
  const value = position || Math.floor(percentage) / 10;
  const clipPathId = `star-clip-${Math.random()}`;
  const path =
    "M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id={clipPathId}>
          <path d={path} />
        </clipPath>
      </defs>
      <path d={path} fill={backgroundColor} />
      <mask id={`mask-${clipPathId}`}>
        <rect x="0" y="0" width="24" height="24" />
        <path d={path} fill="black" />
        {position ? (
          <rect
            y="0"
            x="0"
            height="24"
            width={(24 * percentage) / 100}
            fill="white"
          />
        ) : (
          <rect
            x="0"
            y={24 - (21 * percentage) / 100}
            width="24"
            height={(24 * percentage) / 100}
            fill="white"
          />
        )}
      </mask>
      <path d={path} fill={fillColor} mask={`url(#mask-${clipPathId})`} />
      <path d={path} stroke={strokeColor} strokeWidth="1" fill="none" />
      <text
        x="12"
        y="14"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="6"
        fontWeight="bold"
        fill="black"
      >
        {value}
      </text>
    </svg>
  );
};

const StarRating = ({ rate = 5.1, multi = false }) => {
  if (multi) {
    let rateResize = rate / 2;
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (rateResize - 1 > 0) {
        stars.push(
          <StarRatingSolo key={"star=" + i} rate={10} position={i + 1} />
        );
      } else {
        stars.push(
          <StarRatingSolo
            key={"star=" + i}
            rate={rateResize > 0 ? rateResize * 10 : 0}
            position={i + 1}
          />
        );
      }
      rateResize -= 1;
    }
    return <div className={styles["star-container"]}>{stars}</div>;
  }
  return <StarRatingSolo rate={rate} />;
};

export default StarRating;
