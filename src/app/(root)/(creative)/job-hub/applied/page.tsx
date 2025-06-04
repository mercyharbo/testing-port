"use client";
import { Buttons } from "@/src/components/export_components";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import React from "react";

import { IoCheckmarkDone } from "react-icons/io5";
const Applied = () => {
  const navigate = useRouter();

  const links = [
    { label: "Go back to Job Portal", path: "/job-hub" },
    { label: "Go to Dashboard", path: "/creative-dashboard" },
    { label: "Go to Hompage", path: "/creative-homepage" },
  ];

  const buttonStyles =
    "!bg-primary  rounded-lg w-42 md:w-62 py-3 text-sm md:text-lg cursor-pointer";
  return (
    <main className="bodyMargin shadow my-10 py-5 text-primary flex flex-col gap-2 font-raleway">
      {" "}
      <h2 className="px-5 subHeading">Graphics Designer</h2>
      <h2 className="px-5 text-xs lg:text-lg">by Uxper Group of Companies</h2>
      <div className="bg-primary px-5 py-5 text-white text-2xl font-inter">
        Application sent
      </div>
      <div className="bodyMargin flex flex-col items-center justify-center my-20 gap-5 text-white">
        <div className="bg-primary rounded-full w-44 h-44 lg:w-60 lg:h-60 flex justify-center items-center">
          <IoCheckmarkDone className="font-black  text-5xl lg:text-7xl" />
        </div>

        {links.map((link) => (
          <Buttons
            key={link.path}
            label={link.label}
            onClick={() => navigate.push(link.path)}
            className={clsx(buttonStyles)}
          />
        ))}
      </div>
    </main>
  );
};

export default Applied;
