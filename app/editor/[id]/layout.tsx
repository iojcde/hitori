import { ReactNode } from "react";
import { MobileNav } from "./mobile-nav";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col sm:flex-row h-full">
      <MobileNav />
      {children}
    </div>
  );
};

export default Layout;
export const revalidate = 0;
export const dynamic = "force-dynamic";
