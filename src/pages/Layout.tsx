import React from "react";
import { Outlet, Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout: React.FC = () => {
  return (
    <div>
      <Header />

      <main className="p-4">
        <Outlet />{" "}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
