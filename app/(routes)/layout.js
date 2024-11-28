import Footer from "@/components/Share/Footer";
import Navbar from "@/components/Share/Navbar";
import React from "react";

const MainLayout = ({ children }) => {
  return (
    <div>
      <div className="sticky top-0  z-50 ">
        <Navbar />
      </div>
      {children}
      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
};

export default MainLayout;
