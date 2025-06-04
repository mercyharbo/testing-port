import React from "react";
import Buttons from "../Buttons";
import { services } from "@/src/constants";

export default function TemplateOnePortfolio() {
  return (
    <>
      <section className="bodyMargin bg-purpleBg flex flex-col gap-10 p-5 lg:p-15">
        {" "}
        <h2 className="font-bold text-2xl lg:text-3xl text-white">
          My
          <span className="text-gold"> Portfolio</span>
        </h2>
        <div className="  flex flex-col md:grid md:grid-cols-2 gap-10 md:gap-40">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="bg-white  flex flex-col gap-5 h-120"
            ></div>
          ))}
        </div>
        <h2 className="font-bold text-xl lg:text-3xl text-white">
          More on
          <span className="text-gold"> Behance/ </span>
          Pintrest
        </h2>
        <Buttons
          label="Click here"
          className="text-primary lg:text-2xl w-fit rounded-xl font-bold px-20"
        />
      </section>
      <section className=" p-10 bg-white text-center">
        <div className="flex flex-row justify-between gap-5">
          <h2 className="font-bold text-xl lg:text-3xl text-start text-purpleBg">
            Other
            <span className="text-gold"> Services/ </span>
            Skills
          </h2>
          <div className="flex flex-col">
            {services.map((service, index) => (
              <h2
                key={index}
                className="font-bold text-sm lg:text-2xl text-purpleBg"
              >
                {service}
              </h2>
            ))}
          </div>
        </div>
      </section>
      {/* work with me */}
      <div className="h-20  flex items-center p-10">
        <h2 className="font-bold text-xl lg:text-3xl text-white">
          What you get working
          <span className="text-gold"> with me </span>
        </h2>
      </div>
      <div className=" bg-white flex items-center px-20 py-10 text-center">
        <h2 className="font-bold text-primary text-xl lg:text-2xl ">
          Available for all kind of gigs, projects, jobs, collaboration, kindly
          reach out to me. Looking forward to working with you.
        </h2>
      </div>
    </>
  );
}
