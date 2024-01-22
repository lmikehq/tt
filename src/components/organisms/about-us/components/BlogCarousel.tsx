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
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";


const CarouselWrapper = styled.div<{ isMobile: boolean }>`
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
    & .slick-arrow.slick-prev {
        background-color: #7BBBD6;
        padding: 1.5rem 2rem 1.5rem 1rem;
        border-radius: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2;
        position: absolute;
        top: ${({ isMobile }) => isMobile ? '-7rem' : '-3rem' };
        left: ${({ isMobile }) => isMobile ? "72%" : "90%" };
        &::before {
            display: none;
        };
    }
    & .slick-arrow.slick-next {
        background-color: #7BBBD6;
        padding: 1.5rem 1.9rem 1.5rem 1.1rem;
        border-radius: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2;
        position: absolute;
        top: ${({ isMobile }) => isMobile ? '-7rem' : '-3rem' };
        right: 0%;
        &::before {
            display: none;
        };
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
        infinite: true,
        speed: 500,
        slidesToShow: isMobile ? 1 : 3,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 2000,
        centerMode: true,
        prevArrow: (
            <Flex
                width='max-content'
                padding={isMobile ? '1.5rem 0.9rem' : '1.5rem 0.9rem'}
                borderRadius="100%"
                background="#7BBBD6"
            >
                <RxCaretLeft color='white' size={25} />
            </Flex>
        ),
        nextArrow: (
            <Flex
                width='max-content'
                padding={isMobile ? '1.5rem 0.9rem' : '1.5rem 0.9rem'}
                borderRadius="100%"
                background="#7BBBD6"
            >
                <RxCaretRight color='white' size={25} />
            </Flex>
        ),
    };

    return (
        <CarouselWrapper isMobile={isMobile}>
            <StyledSlider
                {...settings}
                
            >
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
