import { Sidebar } from "./sidebar";
const Layout = ({ children, params: { id } }) => {
  return (
    <div className="flex">
      <Sidebar id={id} />
      {children}
    </div>
  );
};

export default Layout;
export const revalidate = 0;
export const dynamic = "force-dynamic";
