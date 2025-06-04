import {
  TemplateFourHero,
  TemplateFourAboutMe,
  TemplateFourPortfolio,
} from "@/src/components/export_components";
import React from "react";
import Image from "next/image";
const page = () => {
  return (
    <main className="bodyMargin font-montserrat">
      <TemplateFourHero />
      <TemplateFourAboutMe />
      <TemplateFourPortfolio />
      <footer className={`center px-10 py-20 bg-white`}>
        <Image
          src={"/assets/madeByPortgig2.svg"}
          height={200}
          width={1000}
          alt="made by portgig" 
        />
      </footer>
    </main>
  );
};

export default page;
