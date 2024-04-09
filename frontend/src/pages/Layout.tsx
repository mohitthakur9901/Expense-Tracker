import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  const stateUser = useSelector((state: RootState) => state.user);
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const links = [
    { title: "Dashboard", path: "/dashboard" },
    { title: "Expenses", path: "/expenses" },
    { title: "Income", path: "/income" },
    { title: "Transactions", path: "/transactions" },

  ]

  return (
    <div className={`grid grid-cols-1 md:grid-cols-9 ${className}`}>
      <div className="md:col-span-1">
        <Sidebar
          links={links}
          user={stateUser}
          isOpen={isOpen}
          toggleSidebar={toggleSidebar}
        />
      </div>
      <div className="md:col-span-8 border border-b-4 items-center">
        <div className="ml-10 sm:ml-48  py-8">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
