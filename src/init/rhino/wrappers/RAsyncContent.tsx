import React, { PropsWithChildren } from "react";

interface Props extends PropsWithChildren<{}> {
  isLoading: boolean;
  errorMesssage?: string;
}

export const RAsyncContent: React.FC<Props> = ({
  isLoading,
  errorMesssage,
  children,
}) => {
  if (isLoading) {
    return <Loading />;
  }
  if (errorMesssage) {
    return <Error>{errorMesssage}</Error>;
  }
  return <>{children}</>;
};

const Loading = () => {
  return <div>Loading...</div>;
};

const Error = ({ children }: PropsWithChildren<{}>) => {
  return <div>Error: {children}</div>;
};
