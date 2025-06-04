"use client";
import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

import { Buttons } from "./export_components";
const SearchSection = () => {
  return (
    <section className="bodyMargin  border border-gray100 flex max-lg:hidden bg-white font-raleway">
      <div className="flex gap-5 pl-5 text-textColor items-center w-full border border-gray100 font-raleway ">
        <AiOutlineSearch className="h-5 w-5" />
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Searc creative by role"
          className=" w-full h-full border-none outline-none focus:outline-none focus:border-none focus:ring-0"
        />
      </div>
      <div className="flex gap-5 pl-5 text-textColor items-center w-full border border-gray100">
        <AiOutlineSearch className="h-5 w-5" />
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Searc creative by industry"
          className=" w-full h-full border-none outline-none focus:outline-none focus:border-none focus:ring-0"
        />
      </div>
      <div className="flex gap-5 pl-5 text-textColor items-center w-full border border-gray100">
        <AiOutlineSearch className="h-5 w-5" />
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Searc creative by industry"
          className=" w-full h-full border-none outline-none focus:outline-none focus:border-none focus:ring-0"
        />
      </div>

      <div className="w-full flex justify-center">
        <Buttons
          label="Search"
          className="!bg-primary lg:text-xl lg:font-bold px-8 w-fit text-white rounded-xl"
          onClick={() => {}}
        />
      </div>
    </section>
  );
};

export default SearchSection;
