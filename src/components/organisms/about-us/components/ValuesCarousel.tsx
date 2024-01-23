'use client'

import React, { ReactNode, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import {ttColors} from "@lib/theme/colors";
import {useScreenResolution} from "@lib/extensions/hook/useScreenResolution";
import ValueCard from "./ValueCard";
import Flex from "@/components/templates/flex";


const CarouselWrapper = styled.div<{ isMobile: boolean }>`
    .slick-slide div {
        outline: none;
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
        top: -3rem;
        left: ${({ isMobile }) => (isMobile ? "78%" : "88%")};
        display: none !important;
        &::before {
            line-height: 0;
            content: '<'
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
        top: -3rem;
        right: 0%;
        display: none !important;
        &::before {
            line-height: 0;
            content: '>'
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

interface ValuesCarouselProps {
    items : {
        heading: string;
        text: string
    }[];
}
function ValuesCarousel({ items } : ValuesCarouselProps) {
    const { isMobile } = useScreenResolution();
    const [active, setActive] = useState(0)

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: isMobile ? 1 : 4,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000,
        focusOnSelect: true,
        pauseOnFocus: true,
        beforeChange: (oldIndex: number, newIndex: number) => {
            setActive(newIndex)
        }
    };

    return (
        <CarouselWrapper isMobile={isMobile}>
            <StyledSlider {...settings}>
                {items.map((item, index) =>
                    <Flex key={`caro-${index}`} height={isMobile ? '14rem' : '14rem'}>
                        <ValueCard
                            index={index}
                            active={isMobile ? active === index : false}
                            {...item}
                        />
                    </Flex>
                )}
            </StyledSlider>
        </CarouselWrapper>
    );
};

export default ValuesCarousel;
