import {
  CreativeHeroSection,
  CreativeBanner,
  ExploreJob,
  DiscoverMore,
  ExploreCreative,
  DashboardSection,
  Community,
} from "@/src/components/export_components";
import React from "react";

const CreativeHomePage = () => {
  return (
    <main>
      <CreativeHeroSection />
      <CreativeBanner />
      <ExploreJob />
      <DiscoverMore />
      <ExploreCreative />
      <DashboardSection />
      <Community />
    </main>
  );
};

export default CreativeHomePage;
