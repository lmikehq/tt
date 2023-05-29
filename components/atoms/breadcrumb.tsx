import React from "react";
import styled from "styled-components";
import Link from "@atom/link";
import BreadcrumbLayout from "@layout/sectionLayout";

const BreadcrumbContainer = styled.div`
  font-size: 14px;
  margin-bottom: 3rem;
`;

const BreadcrumbItem = styled.span`
  display: inline-block;
  color: #6c757d;
  font-size: 14px;
`;

const Separator = styled.span`
  margin: 0 0.5rem;
  color: #999;
`;



interface BreadcrumbProps {
  items: { id: number; label: string; url?: string }[];
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <BreadcrumbContainer>
    <BreadcrumbLayout> 
      {items.map((item, index) => (
        <React.Fragment key={item.id}>
          <BreadcrumbItem>
            {index !== 0 && <Separator>/</Separator>}
            {item.url ? (
              <Link
                href={item.url}
                color="#212529"
                textDecoration="underline !important"
              >
                {item.label}
              </Link>
            ) : (
              item.label
            )}
          </BreadcrumbItem>
        </React.Fragment>
      ))}
      </BreadcrumbLayout>
    </BreadcrumbContainer>
  );
};

export default Breadcrumb;
