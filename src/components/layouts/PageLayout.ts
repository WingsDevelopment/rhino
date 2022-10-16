import { DefaultPageWithBreadcrumbsTsx } from "../pages";

export interface TLink {
  name: string;
  href?: string;
  icon?: any;
}

export const PageLayout = (
  bodyComponent: string,
  title: string,
  links: TLink[],
  breadcrumbsAction?: any
) => {
  const bcaStr = breadcrumbsAction ? breadcrumbsAction : "";
  //todo: nullale icon
  const linksStr =
    links?.length > 0
      ? "links={[" +
        links.map((link) => {
          return `
        {
            name:"${link.name}",
            href:"${link.href}",
        },`;
        }) +
        "]}"
      : "";

  return `
      <${DefaultPageWithBreadcrumbsTsx}
          title="${title}"
          ${linksStr}
          ${bcaStr}  
      >
          ${bodyComponent}
      </${DefaultPageWithBreadcrumbsTsx}>`;
};
