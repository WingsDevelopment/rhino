import React, { PropsWithChildren } from "react";

export const TableRow: React.FC<PropsWithChildren> = ({ children }) => {
  return <tr>{children}</tr>;
};
