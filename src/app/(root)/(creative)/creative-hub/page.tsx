"use client";
import React from "react";
import {
  SearchSection,
  CreativeHero,
  Community,
  Creatives,
  CreativeFilter,
} from "@/src/components/export_components";

const CreativeHub = () => {
  return (
    <main className="font-raleway">
      <CreativeHero />
      <SearchSection />
      <div className="flex gap-5 bodyMargin ">
        <div className="flex-2/7 max-md:hidden">
          <CreativeFilter />
        </div>
        <div className="flex-5/7 ">
          <Creatives />
        </div>
      </div>
      <Community />
    </main>
  );
};

export default CreativeHub;
