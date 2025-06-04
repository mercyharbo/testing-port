import {
  TemplatesixAboutMe,
  TemplatesixHeroSection,
  TemplatesixSkills,
  TemplatesixWeddingShoots,
  TemplatesixLatestWork,
  TemplatesixMoreWork,
  TemplatesixJobs,
  MadeByportgig,
} from "@/src/components/export_components";
import React from "react";

const page = () => {
  return (
    <div className="bg-black">
      <TemplatesixHeroSection />
      <TemplatesixAboutMe />
      <TemplatesixSkills />
      <TemplatesixWeddingShoots />
      <TemplatesixLatestWork />
      <TemplatesixMoreWork />
      <TemplatesixJobs />
      <MadeByportgig className="bg-semiBlack " />
    </div>
  );
};

export default page;
