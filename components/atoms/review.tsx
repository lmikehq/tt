"use client";

import styled from "styled-components";
import { Grid } from "@atom/grid";
import ReviewLayout from "@layout/sectionLayout";
import SectionTitle from "./sectionTitle";
import RatingComponent from "./reviewStar";

const ReviewWrapper = styled.div`
  margin: 9rem 0 0 0;
`;
const Card = styled.div`
  display: block;
  align-items: center;
  padding: 0.7rem;
  width: 100%;
  height: 310px;
  margin-bottom: 2rem;

  /* Neutrals */

  background: var(--default-color);
  box-shadow: 2px 4px 16px rgba(17, 34, 17, 0.1);
  border-radius: 20px;
`;
const CardHeader = styled.div`
  font-style: normal;
  font-weight: 700;
  width: 22.8125rem;
  height: 3.5rem;
  font-size: 1.1rem;
  padding: 1rem;
  line-height: 30px;
  color: var(--secondary-color);
  margin-bottom: 2.5rem;
`;
const CardDescription = styled.div`
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 15.3px;
  padding: 0 0.7rem;
  line-height: 20px;
  color: var(--secondary-color);
  margin-bottom: 1rem;

  opacity: 0.5;
`;
const CardFooter = styled.div`
  display: block;
  padding: 0 0.7rem;

  & h5 {
    font-weight: 700;
    font-size: 14px;
    line-height: 21px;
    color: var(--text-color);
  }

  & p {
    font-weight: 500;
    margin-top: 0.5rem;
    font-size: 12px;
    line-height: 15px;
    opacity: 0.5;
    color: var(--text-color);
  }
`;

const Review = () => {
  const reviewCard = [
    {
      id: 1,
      title: "“A real sense of community, nurtured”",
      description:
        "Really appreciate the help and support from the staff during these tough times. Shoutout to Katie for helping me always, even when I was out of the country. And always available when needed.",
      rating: 4.5,
      name: "John Doe",
      designation: "Employment visa - Canada",
    },

    {
      id: 2,
      title: "“A real sense of community, nurtured”",
      description:
        "Really appreciate the help and support from the staff during these tough times. Shoutout to Katie for helping me always, even when I was out of the country. And always available when needed.",
      rating: 4.5,
      name: "John Doe",
      designation: "Employment visa - Canada",
    },

    {
      id: 3,
      title: "“A real sense of community, nurtured”",
      description:
        "Really appreciate the help and support from the staff during these tough times. Shoutout to Katie for helping me always, even when I was out of the country. And always available when needed.",
      rating: 4.5,
      name: "John Doe",
      designation: "Employment visa - Canada",
    },

    {
      id: 4,
      title: "“A real sense of community, nurtured”",
      description:
        "Really appreciate the help and support from the staff during these tough times. Shoutout to Katie for helping me always, even when I was out of the country. And always available when needed.",
      rating: 4.5,
      name: "John Doe",
      designation: "Employment visa - Canada",
    },

    {
      id: 5,
      title: "“A real sense of community, nurtured”",
      description:
        "Really appreciate the help and support from the staff during these tough times. Shoutout to Katie for helping me always, even when I was out of the country. And always available when needed.",
      rating: 5,
      name: "John Doe",
      designation: "Employment visa - Canada",
    },

    {
      id: 6,
      title: "“A real sense of community, nurtured”",
      description:
        "Really appreciate the help and support from the staff during these tough times. Shoutout to Katie for helping me always, even when I was out of the country. And always available when needed.",
      rating: 4.5,
      name: "John Doe",
      designation: "Employment visa - Canada",
    },
  ];
  return (
    <ReviewWrapper>
      <ReviewLayout>
        <SectionTitle
          title="Reviews"
          description="What people says about Golobe facilities."
          buttonText="See All"
        />
        <Grid columns="repeat(3, 1fr)" gap="2rem">
          {reviewCard.map((review) => (
            <Card key={review.id}>
              <CardHeader>
                <h3>{review.title}</h3>
              </CardHeader>
              <CardDescription>
                <p>{review.description}</p>
              </CardDescription>
              <RatingComponent rating={review.rating} />
              <CardFooter>
                <p>{review.name}</p>
                <p>{review.designation}</p>
              </CardFooter>
            </Card>
          ))}
        </Grid>
      </ReviewLayout>
    </ReviewWrapper>
  );
};

export default Review;
