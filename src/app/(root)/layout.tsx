import { NavigationBar, Footer } from "@/src/components/export_components";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="text-white">
      <NavigationBar />
      {children}
      <Footer />
    </div>
  );
};

export default layout;
