import React, { Children, type ReactNode } from "react";
import Header from "./Header";
type LayoutProps = {
  children: ReactNode;
  title: string;
  isHome: boolean;
};
const Layout = ({ title, isHome, children }: LayoutProps) => {
  return (
    <div>
      <Header title={title} isHome={isHome} />
      {children}
    </div>
  );
};

export default Layout;
