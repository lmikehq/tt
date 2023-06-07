import React from "react";

function Center({
  children,
  width,
  height,
  margin,
}: {
  children: React.ReactNode;
  width?: string;
  height?: string;
  margin?: string;
}) {
  return (
    <section
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: width || "100%",
        height: height || "100%",
        margin: margin || "0 auto",
      }}
    >
      {children}
    </section>
  );
}

export default Center;
