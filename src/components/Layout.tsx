import { ReactNode } from 'react';
import Navbar from './Navbar.tsx';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col w-full overflow-auto">
      <div className="w-full">
        <Navbar />
      </div>
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

export default Layout;
