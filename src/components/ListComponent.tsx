import { ReactNode } from "react";

export const ListComponent: React.FC<{
  index: number;
  children: ReactNode;
}> = ({ index, children }) => {
  return (
    <li key={index} className={`odd:bg-slate-200 p-3`}>
      {children}
    </li>
  );
};
