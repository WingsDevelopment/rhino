import React, { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  align?: "left" | "center" | "right" | "justify" | "char";
}

export const TableCell: React.FC<Props> = ({ children, align }) => {
  return <td>{children}</td>;
};
