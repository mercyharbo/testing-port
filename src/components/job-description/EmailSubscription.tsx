import React from "react";

import { Buttons } from "../export_components";
const EmailSubscription = () => {
  return (
    <section className="bodyMargin p-5 flex flex-col gap-3 ">
      <h2 className="self-center font-black text-primary text-sm md:text-lg lg:text-3xl">
        Want to get notified on you Jobs, Gigs, Offers?
      </h2>
      <h2 className="self-center font-extralight text-primary text-sm md:text-lg font-inter">
        Get them straight in your mail
      </h2>
      {/* input */}
      <div className=" flex flex-col md:flex-row  gap-2 font-inter ">
        <div className=" text-textColor  w-full border border-primary rounded-sm">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter name"
            className=" w-full  border-none outline-none focus:outline-none focus:border-none focus:ring-0 text-sm px-5 py-2"
          />
        </div>
        <div className="text-textColor  w-full border border-primary rounded-sm">
          <input
            type="text"
            name="industry"
            id="industry"
            placeholder="Enter industry"
            className=" w-full  border-none outline-none focus:outline-none focus:border-none focus:ring-0 text-sm px-5 py-2"
          />
        </div>
        <div className=" text-textColor w-full border border-primary rounded-sm">
          <input
            type="emqil"
            name="email"
            id="email"
            placeholder="Emter email"
            className=" w-full  border-none outline-none focus:outline-none focus:border-none focus:ring-0 text-sm px-5 py-2"
          />
        </div>

        <div className="w-full flex justify-center">
          <Buttons
            label="Search"
            className="!bg-primary lg:text-xl lg:font-bold w-fit text-white rounded-sm"
            onClick={() => {}}
          />
        </div>
      </div>
    </section>
  );
};

export default EmailSubscription;
