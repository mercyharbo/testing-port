import React from "react";
import { services1 } from "../../constants/index";

const TemplateTwoService = () => {
  return (
    <section>
      <div className="h-20  flex items-center pl-10">
        {" "}
        <h2 className="font-bold text-xl lg:text-3xl text-white">
          MY
          <span className="text-yellowGold"> SERVICES</span>
        </h2>
      </div>
      <div className="bg-yellowGold pl-5 py-10 md:pl-10 flex flex-col gap-5 text-white">
        <h2 className="font-bold text-2xl">Videography Skills:</h2>
        <ol className="space-y-5 list-disc list-inside">
          {services1.map((service, index) => (
            <li key={index} className="font-bold lg:text-xl uppercase">
              {service}
            </li>
          ))}
        </ol>
      </div>
      <div className="bg-brownLight pl-5 py-10 md:pl-10 flex flex-col gap-5 text-white">
        <h2 className="font-bold text-2xl">Videography Skills:</h2>
        <ol className="space-y-5 list-disc list-inside">
          {services1.map((service, index) => (
            <li key={index} className="font-bold lg:text-xl uppercase text-white">
              {service}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default TemplateTwoService;
