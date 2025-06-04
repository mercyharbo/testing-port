import {
  TemplateThreeHero,
  TemplateThreeAboutMe,
  TemplateThreePortfolio,
  MadeByportgig,
  TemplateThreeAvailabilty,
} from "@/src/components/export_components";
import React from "react";

const page = () => {
  return (
    <main className="bg-semiBlack font-montserrat bodyMargin">
      <TemplateThreeHero />
      <TemplateThreeAboutMe />
      <TemplateThreePortfolio />
      <TemplateThreeAvailabilty />
      <MadeByportgig className="bg-semiBlack" />
    </main>
  );
};

export default page;
