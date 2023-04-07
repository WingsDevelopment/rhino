import { rsc } from "../../rhinoStringConfig";

export interface TLink {
  name: string;
  href?: string;
  icon?: any;
}

//prettier-ignore
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
      ? `${rsc.breadcrumbsLinks}` + "={[" +
        links.map((link) => {
          return `
        {
            name:"${link.name}",
            href: ${link.href},
        },`;
        }) +
        "]}"
      : "";

  return `
    <${rsc.RPage}
        ${rsc.title}="${rsc.title}"
        ${linksStr}
        ${bcaStr}  
    >
        ${bodyComponent}
    </${rsc.RPage}>`;
};
