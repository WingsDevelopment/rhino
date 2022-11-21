import React, { PropsWithChildren } from "react";
import { RContent } from "../wrappers/RContent";

export const RPageContent: React.FC<PropsWithChildren> = ({ children }) => {
  // const { isStrached } = useThemeContext(); todo: add your theme context here
  const isStrached = false;

  return <RContent isStrached={isStrached}>{children}</RContent>;
};
