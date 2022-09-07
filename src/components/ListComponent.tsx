import { ReactNode } from "react";

export const ListComponent: React.FC<{
  key: number;
  children: ReactNode;
}> = ({ key, children }) => {
  return (
    <li key={key} className={`odd:bg-slate-200 p-3`}>
      {children}
    </li>
  );
};
