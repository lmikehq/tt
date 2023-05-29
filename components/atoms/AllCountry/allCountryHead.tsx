import Image from "next/image";
import styled from "styled-components";
import Text from "@atom/text";
import allCountryHeadImg from "@image/allCountryHeaderImg.png";

import Breadcrumb from "@atom/breadcrumb";

interface BreadcrumbItem {
  id: number;
  label: string;
  url?: string;
}

const items: BreadcrumbItem[] = [
  { id: 1, label: "Home", url: "/" },
  { id: 2, label: "Visa", url: "/" },
  { id: 3, label: "All countries" },
];

const AllCountryHeader = styled.div`
  position: relative;
  width: 100%;
  height: 332px;

  & img {
    width: 100%;
    object-fit: cover;
    height: 300px;
  }

  & h1 {
    position: absolute;
    top: 38%;
    text-transform: uppercase;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    font-size: 24px;
    text-align: center;

    font-style: normal;
    font-weight: 700;
    font-size: 64px;
    line-height: 96px;

    text-shadow: 0px 4px 79px rgba(0, 0, 0, 0.25);
  }
`;


const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 300px;
  background: #06062a94;
`;



const AllCountryHead = () => {
  return (
    <>
      <AllCountryHeader>
        <Image src={allCountryHeadImg} alt="" />
        <Overlay />
        <Text text="All Countries" type="h1" />
      </AllCountryHeader>
      <Breadcrumb items={items} />
    </>
  );
};

export default AllCountryHead;
