import React, { PropsWithChildren } from "react";
import { ILink, RBreadcrumbs } from "../wrappers/RBreadcrumbs";
import { RPageContent } from "./RPageContent";

interface Props extends PropsWithChildren<{}> {
  title: string;
  breadcrumbsLinks?: ILink[];
  breadcrumbAction?: React.ReactNode;
}

export const RPage: React.FC<Props> = ({
  title,
  breadcrumbsLinks,
  breadcrumbAction,
  children,
}) => {
  return (
    <RPageContent>
      <RBreadcrumbs
        heading={title}
        links={breadcrumbsLinks}
        breadcrumbAction={breadcrumbAction}
      />
      {children}
    </RPageContent>
  );
};
