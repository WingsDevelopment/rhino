import React from "react";
import { useNavigate } from "react-router-dom";

export interface ILink {
  name: string;
  href: string;
}

interface Props {
  heading?: string;
  links?: ILink[];
  breadcrumbAction?: React.ReactNode;
}

export const RBreadcrumbs: React.FC<Props> = ({
  heading,
  links,
  breadcrumbAction,
}) => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        alignContent: "space-between",
      }}
    >
      <div>
        {heading && (
          <h1
            style={{
              fontSize: "1.5rem",
              lineHeight: "2rem",
              fontWeight: 700,
            }}
          >
            {heading}
          </h1>
        )}
        {links && (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            {links.map((link, index) => {
              return (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <span
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => navigate(link.href)}
                  >
                    {link.name}
                  </span>
                  {index < links.length - 1 && (
                    <span
                      style={{
                        marginLeft: "0.5rem",
                        marginRight: "0.5rem",
                      }}
                    >
                      /
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
      {breadcrumbAction && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          {breadcrumbAction}
        </div>
      )}
      {!breadcrumbAction && <div></div>}
    </div>
  );
};
