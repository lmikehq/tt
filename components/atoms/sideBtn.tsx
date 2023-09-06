'use client'

import styled from "styled-components";
import Link from "@atom/link";
import PropTypes from "prop-types";

const LoginBtn = styled.div`
  background: #e7e7e7;
  height: max-content;
  width: max-content;
  border-radius: 60px;
  border: 1px solid #f6f6f6;
  padding: 16px 20px;

  p {
    font-size: 14px;
    color: #06062a;
    font-weight: 500;
    text-align: center;
  }

  @media screen and (max-width: 900px) {
    display: none;
  }
`;

interface SideBtnProps {
  title: string;
  // buttonText: string;
  linkUrl: string;
  linkText: string;
}

const SideBtn: React.FC<SideBtnProps> = ({
  title,
  // buttonText,
  linkUrl,
  linkText,
}) => {
  return (
    <LoginBtn>
      <p
        style={{
          textAlign: "center",
          fontSize: "16px",
        }}
      >
        {`${title} `}
        <Link href={linkUrl} text={linkText} color="#a0001d" />
      </p>
    </LoginBtn>
  );
};

SideBtn.propTypes = {
  title: PropTypes.string.isRequired,
  // buttonText: PropTypes.string.isRequired,
  linkUrl: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
};

export default SideBtn;