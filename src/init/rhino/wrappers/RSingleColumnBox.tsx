import React, { PropsWithChildren } from "react";

export const RSingleColumnBox: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
        gap: "1rem",
      }}
    >
      {children}
    </div>
  );
};
