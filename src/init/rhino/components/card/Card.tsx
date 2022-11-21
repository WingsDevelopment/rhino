import React, { PropsWithChildren } from "react";

interface Props extends PropsWithChildren<{}> {
  additionalStyle?: string;
}

export const Card: React.FC<Props> = ({ additionalStyle, children }) => {
  return (
    <div
      style={{
        boxShadow:
          "0 0 0 1px rgba(0, 0, 0, 0.05), 0 2px 4px 0 rgba(0, 0, 0, 0.1)",
        borderRadius: "0.75rem",
        padding: "1.25rem",
        backgroundColor: "var(--card-bg-color)",
      }}
    >
      {children}
    </div>
  );
};
