import styled from "styled-components";
import PropTypes from "prop-types";
import { useScreenResolution } from "hook/useScreenResolution";
import Link from "@atom/link";
import Button from "./button";

interface SideBtnProps {
  title: string;
  linkUrl: string;
  linkText: string;
}

const SideBtn: React.FC<SideBtnProps> = ({ title, linkUrl, linkText }) => {
  const { isMobile } = useScreenResolution();

  return (
    <Link href={linkUrl}>
      <Button
        styles={{
          background: "#e7e7e7",
          height: "max-content",
          width: "max-content",
          borderRadius: "60px",
          border: "1px solid #f6f6f6",
          padding: "16px 20px",
          display: isMobile ? "none" : "block",
        }}
      >
        <p
          style={{
            textAlign: "center",
            fontSize: "16px",
            color: "#06062a",
            fontWeight: 500,
          }}
        >
          {`${title} `}
          <span style={{ color: "#a0001d" }}>{linkText}</span>
        </p>
      </Button>
    </Link>
  );
};

SideBtn.propTypes = {
  title: PropTypes.string.isRequired,
  linkUrl: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
};

export default SideBtn;
