"use client";

import SectionTitle from "@atom/sectionTitle";

const SectionTitle = () => {
  return (
    <div>
      <SectionTitle
        title="Welcome to the Section"
        description="This is a description of the section."
        buttonText="Click Me"
        onButtonClick={() => {
          console.log("Button clicked");
        }}
      />
    </div>
  );
};

export default SectionTitle;
