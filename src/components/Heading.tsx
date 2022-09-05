import React, { Children, ReactNode } from "react";

export const MainHeading: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return <h1 className="text-xl font-bold text-gray-500">{children}</h1>;
};

export const SubHeading: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <h2 className="text-lg font-semibold pb-1">{children}</h2>;
};
