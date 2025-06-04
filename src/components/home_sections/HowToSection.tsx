"use client";
import { creativeProcess, recruiterProcess } from "@/src/constants";
import React from "react";

import { FaRegSquareCheck } from "react-icons/fa6";

const HowToSection = () => {
  return (
    <section className="bodyMargin my-5 flex flex-col gap-3">
      <div className="h-15 bg-linear-gradient w-full flex justify-center items-center font-raleway">
        <h2 className="subHeading"> How it works?</h2>
      </div>
      <div className="flex flex-col lg:flex-row gap-5 justify-evenly font-raleway">
        <div className="flex flex-col">
          <h2 className="text-textColor text-xl lg:text-3xl font-black mt-5 text-center">
            For Creatives
          </h2>
          <div className="bg-primary py-10 px-5 rounded-lg h-fit">
            <ul>
              {creativeProcess.map((item, index) => (
                <li key={index} className="flex  items-baseline gap-2 mb-2 ">
                  <FaRegSquareCheck />
                  <p className="text-lg font-bold leading-10 text-white">{item}</p>{" "}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col">
          <h2 className="text-textColor text-xl lg:text-3xl font-black mt-5 text-center">
            For Recruiters
          </h2>
          <div className="bg-primary py-10 px-5 rounded-lg h-full ">
            <ul>
              {recruiterProcess.map((item, index) => (
                <li key={index} className="flex items-baseline gap-2  mb-2">
                  <FaRegSquareCheck />
                  <p className="text-lg font-bold leading-10 text-white">{item}</p>{" "}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* Banner */}
      {/* <div className="md:hidden flex justify-around gap-5 mt-5">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <h2 className="text-xl sm:text-2xl font-black text-textColor font-raleway">
              Create your portfolio
            </h2>
            <Buttons
              label="Get started"
              className=" !bg-primary text-white font-medium text-sm !py-5  w-fit flex justify-center items-centercursor-pointer"
              onClick={() => {
                navigate.push("/sign-up");
              }}
            />
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="text-xl sm:text-2xl font-black text-textColor font-raleway">
              Hire creatives
            </h2>
            <Buttons
              label="Get started"
              className=" !bg-primary text-white font-medium text-sm !py-5  w-fit flex justify-center items-centercursor-pointer"
              onClick={() => {
                navigate.push("/sign-up");
              }}
            />
          </div>
        </div>
        <div className="flex justify-center items-center  ">
          <Image
            src="/assets/ellipse-woman.png"
            alt="Ellipse-woman.png"
            width={307}
            height={330}
            className=" object-filll"
          />
        </div>
      </div> */}
    </section>
  );
};

export default HowToSection;
