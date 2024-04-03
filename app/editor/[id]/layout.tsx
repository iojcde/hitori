import { MobileNav } from "./mobile-nav";

const Layout = ({ children, params: { id } }) => {
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
