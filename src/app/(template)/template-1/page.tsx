import {
  TemplateOneHero,
  TemplateOneAboutme,
  TemplateOnePortfolio,
  MadeByportgig,
} from "@/src/components/export_components";
import React from "react";

const page = () => {
  return (
    <main className="font-montserrat bodyMargin bg-purpleBg">
      <TemplateOneHero />
      <TemplateOneAboutme />
      <div className="bg-white h-15"></div>
      <TemplateOnePortfolio />
      <MadeByportgig className="bg-purpleBg" />
    </main>
  );
};

export default page;
