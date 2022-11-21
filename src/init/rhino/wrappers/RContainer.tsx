import React, { PropsWithChildren } from "react";

export const RContainer: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      {children}
    </div>
  );
};
