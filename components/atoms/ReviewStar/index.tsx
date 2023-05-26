"use client";

import React from "react";
import { FaRegStar } from "react-icons/fa";
import { BsStarFill, BsStarHalf } from "react-icons/bs";

const RatingComponent: React.FC<{ rating: number }> = ({ rating }) => {
  const getRatingIcons = (): React.ReactNode => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    const ratingIcons = [];
    for (let i = 0; i < fullStars; i++) {
      ratingIcons.push(
        <BsStarFill
          key={`full-star-${i}`}
          style={{ color: "#FFC107", marginBottom: "1rem",marginLeft: ".7rem", marginRight: "1rem" }}
        />
      );
    }
    if (hasHalfStar) {
      ratingIcons.push(
        <BsStarHalf
          key="half-star"
          style={{ color: "#FFC107", marginBottom: "1rem",marginLeft: ".7rem", marginRight: "1rem" }}
        />
      );
    }
    const remainingStars = 5 - ratingIcons.length;
    for (let i = 0; i < remainingStars; i++) {
      ratingIcons.push(
        <FaRegStar
          key={`empty-star-${i}`}
          style={{ color: "#FFC107", marginBottom: "1rem",marginLeft: ".7rem", marginRight: "1rem" }}
        />
      );
    }

    return ratingIcons;
  };

  return <div>{getRatingIcons()}</div>;
};

export default RatingComponent;
