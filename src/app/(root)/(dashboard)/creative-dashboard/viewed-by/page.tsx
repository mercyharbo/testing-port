"use client";
import React from "react";
import Image from "next/image";
import { Buttons } from "@/src/components/export_components";
const page = () => {
  return (
    <main className="bodyMargin text-primary my-20 flex flex-col gap-5">
      <div className="font-bold lg:text-lg  bg-primary text-white rounded-sm flex justify-around py-5">
        <h2>List of people who viewed your profile</h2>
        <h2>50</h2>
      </div>

      <div className="flex flex-col gap-5">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="bg-gray200 rounded-sm px-2 md:px-10 lg:px-20">
            <div className="flex justify-between items-center flex-wrap w-full ">
              <div className="flex gap-5 items-center bg-red-400 w-96 px-2">
                <Image
                  src={"/assets/creativeImage.svg"}
                  alt="recruiter profile"
                  width={150}
                  height={150}
                />
                <div className="flex flex-col">
                  <h2 className="font-bold text-xs sm:text-sm md:text-lg line-clamp-1">
                    Adeola Giwa
                  </h2>
                  <p className=" text-xs sm:text-sm line-clamp-1">
                    UI/UX Designer/Lagos State
                  </p>
                </div>
              </div>
              <h2 className=" text-xs sm:text-sm md:text-lg text-center">
                2 hours ago
              </h2>
              <Buttons
                label="View Profile"
                className="!bg-primary text-white px-5 !rounded-sm text-xs sm:text-sm md:text-lg cursor-pointer"
              />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default page;
