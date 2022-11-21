import React from "react";
import { TagRoutes } from "../../features/tag/routes/TagRoutes";

interface Props {
  label: string;
  onClick: () => void;
}

export const TableButtonWithDetailsIcon: React.FC<Props> = ({
  label,
  onClick,
}) => {
  return <button onClick={onClick}>{label}</button>;
};
