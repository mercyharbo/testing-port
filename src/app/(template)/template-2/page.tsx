import {
  TemplateTwoHero,
  TemplateTwoAboutMe,
  TemplateTwoEvent,
  TemplateTwoService,
  TemplateTwoPortfolio,
  MadeByportgig,
} from "@/src/components/export_components";
import React from "react";

export default function page() {
  return (
    <main className="bg-semiBlack bodyMargin font-montserrat">
      <TemplateTwoHero />
      <TemplateTwoAboutMe />
      <TemplateTwoEvent />
      <TemplateTwoService />
      <TemplateTwoPortfolio />
      <MadeByportgig className="bg-semiBlack " />
    </main>
  );
}
