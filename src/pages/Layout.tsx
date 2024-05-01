import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout: React.FC = () => {
  return (
    <div className="overflow-visible">
      <Header />

      <main className="p-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
