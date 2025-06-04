import React from "react";

const TemplateTwoEvent = () => {
  return (
    <section className="bg-brownLight py-10 px-10 center">
      <div className="flex flex-col place-items-center md:grid md:grid-cols-2 gap-x-10 gap-5 justify-between w-10/12">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="flex flex-col gap-2 text-white">
            <h2 className="pl-5 font-bold lg:text-2xl text-white">Event Videography</h2>
            <hr className=" w-62 h-0.5" />
            <h2 className="pl-5 font-bold text-yellowGold text-xs lg:text-sm">
              {" "}
              Weddings, Corporate, Concerts
            </h2>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TemplateTwoEvent;

// Event Videography
// Weddings, Corporate, Concerts
