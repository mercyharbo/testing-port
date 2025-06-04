import React from "react";

const TemplateThreePortfolio = () => {
  return (
    <section className="py-20 space-y-5">
      {" "}
      <div className=" px-5 lg:px-10 flex flex-col gap-5">
        <h2 className="text-lg font-bold text-white">
          My <span className="text-yellow">Portfolio</span>
        </h2>
      </div>
      <div className="w-full h-5 bg-yellow"></div>
      <div className=" px-5 lg:px-10 flex flex-col gap-5 text-lalezar">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="border-b border-gray100 px-5 lg:px-10 py-2 flex items-center gap-5 lg:gap-10 text-white">
            <div className="flex-1/3 bg-gray100 h-30 max-w-60"></div>
            <div className="flex-2/3 flex flex-col justify-center">
              <h2 className="font-bold lg:text-2xl">Web App</h2>
              <p className="font-bold cursor-pointer text-xs">Click Here</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TemplateThreePortfolio;
