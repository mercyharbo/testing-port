"use client";

import React from "react";
import Image from "next/image";
import { Buttons } from "./export_components";

const Community = () => {
  return (
    <section className="my-10 flex flex-col gap-5 bodyMargin">
      <div className="h-auto bg-secondary flex items-center mt-5 px-4 py-6 rounded-md sm:p-8">
        <p className="text-white font-bold text-lg sm:text-xl subHeading">
          Feeling overwhelmed?
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 bg-primary my-5 p-4 sm:p-8 rounded-2xl text-white font-raleway">
        <div className="flex flex-col gap-10 w-full">
          <p className="font-semibold text-base sm:text-lg lg:text-xl">
            Get inspired by like-minded individuals, exchange ideas, and build
            meaningful connections that propel your career forward.
          </p>

          <div className="flex flex-col gap-3 sm:gap-5">
            <h2 className="text-lg sm:text-xl md:text-3xl font-black">
              What’s inside?
            </h2>
            <p className="font-semibold text-base sm:text-lg lg:text-xl">
              Private forums tailored to your creative field. Networking
              opportunities with top professionals. Access to exclusive events,
              workshops, and job postings.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:gap-5">
            <h2 className="text-lg sm:text-xl md:text-3xl font-bold">
              Join the Community
            </h2>
            <Buttons
              label="Click here"
              className="rounded-none px-6 sm:px-10 py-2 text-[#0A1754] text-sm sm:text-base lg:text-xl w-fit font-bold font-urbanist"
              onClick={() => {
                window.open("https://discord.gg/wCs38uXS", "_blank");
              }}
            />
          </div>
        </div>

        <div className=" max-md:hidden h-96 w-full ">
          <Image
            src="/assets/two-women.png"
            alt="Discover more creatives"
            width={400}
            height={400}
          />
        </div>
      </div>
    </section>
  );
};

export default Community;
