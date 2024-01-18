'use client'

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { ttColors } from "@lib/theme/colors";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";
import Flex from "@/components/templates/flex";
import BlogCard, { BlogCardItem } from "./BlogCard";


const CarouselWrapper = styled.div`
    .slick-slide div {
        outline: none;
    }
    & .slick-dots {
        transform: translateY(6rem);
    }
    & .slick-dots li {
        background-color: #E7E7E7;
        & button::before {
            content: none;
        }
    }
    & .slick-dots li.slick-active {
        background-color: #06062A;
        & button::before {
            content: none;
        }
    }
    & h1 {
        margin-bottom: 1rem;
        font-weight: 600;
        color: ${ttColors.primary};
    }
`;

const StyledSlider = styled(Slider)`
  .slick-slide > div {
    margin: 0 10px; // Adjust this value to control the gap between slides
  }
`;

interface BlogCarouselProps {
    items: BlogCardItem[];
}
function BlogCarousel({ items } : BlogCarouselProps) {
    const { isMobile } = useScreenResolution();

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: isMobile ? 1 : 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000
    };

    return (
        <CarouselWrapper>
            <StyledSlider {...settings}>
                {items.map((item, index) =>
                    <Flex key={`caro-${index}`}>
                        <BlogCard
                            {...item}
                        />
                    </Flex>
                )}
            </StyledSlider>
        </CarouselWrapper>
    );
};

export default BlogCarousel;
