import styled from "styled-components";
import PrivacyPolicy from "./privacyPolicy";
import { ttColors } from "theme/colors";

const Wrapper = styled.div`
  width: 100%;
  //   padding-right: 5rem;

  & .prose {
    max-width: unset;
  }

  & .prose p.lead {
    color: #475569;
    font-size: 1.2222222rem;
    line-height: 1.4545455;
    margin-bottom: 1.0909091rem;
    font-weight: 500;

    @media screen and (max-width: 900px) {
      font-size: 0.9rem;
    }
  }

  & .prose p {
    margin: 0.1rem 0 1rem !important;
    line-height: 1.8rem;
  }

  & .prose ul {
    margin-left: 1rem !important;
    list-style-type: disclosure-closed;
  }

  & .prose ul li::marker {
    color: ${ttColors.primary} !important;
  }

  & .prose h2 {
    font-size: 24px !important;
    line-height: 36px;
    color: #06062a important;

    @media screen and (max-width: 900px) {
      font-size: 17px !important;
      font-weight: 600;
    }
  }

  & .prose p,
  .prose li,
  .prose h1,
  .prose h2,
  .prose h3,
  .prose h4,
  .prose h5,
  .prose h6,
  .prose blockquote,
  .prose pre,
  .prose table,
  .prose dl,
  .prose ol,
  .prose ul,
  .prose figure,
  .prose hr {
    font-size: 1rem;
    color: ${ttColors.dark};
    line-height: 24px;
    margin: 0.6rem 0;
    font-weight: 300;

    @media screen and (max-width: 900px) {
      font-size: 0.8rem;
    }
  }
  max-width: 100%;

  ::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
  }
`;

function PrivacyPolicyDetails({ details }: { details: string }) {
  return (
    <Wrapper>
      <PrivacyPolicy article={{ body: details }} />
    </Wrapper>
  );
}

export default PrivacyPolicyDetails;
