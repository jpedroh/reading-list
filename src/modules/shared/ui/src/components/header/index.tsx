import { ReactNode } from "react";

export function Header({ children }: { children: ReactNode }) {
  return (
    <header className={`flex items-center justify-between gap-4`}>
      {children}
    </header>
  );
}

Header.Title = function HeaderTitle({ children }: { children: ReactNode }) {
  return <h1 className={`text-2xl md:text-4xl font-bold`}>{children}</h1>;
};
