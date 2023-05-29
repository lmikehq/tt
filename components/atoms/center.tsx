import React from "react";

function Center({
  children,
  width,
  height,
}: {
  children: React.ReactNode;
  width?: string;
  height?: string;
}) {
  return (
    <section
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: width || "100%",
        height: height || "100%",
      }}
    >
      {children}
    </section>
  );
}

export default Center;
