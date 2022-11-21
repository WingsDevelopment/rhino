import { forwardRef } from "react";
import { Icon } from "@iconify/react";
import { IconifyIcon } from "@iconify/react";

export type IconifyProps = IconifyIcon | string;

interface Props {
  icon: IconifyProps;
  width?: number;
  height?: number;
}

const RIconify: React.FC<Props> = ({ icon, width = 20, height = 20 }) => {
  return <Icon icon={icon} width={width} height={height} />;
};

export default RIconify;
