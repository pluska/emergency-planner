import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex justify-center items-center flex-col w-full overflow-hidden">
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default Layout;
