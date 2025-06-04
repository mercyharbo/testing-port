import React from "react";
import Image from "next/image";
const TemplateTwoHero = () => {
  return (
    <section className="bg-lightBrown flex gap-5  pt-15 md:pt-40 ">
      <div className="w-full pl-5 md:pl-10  flex flex-col font-bold pb-10">
        <h2 className=" text-yellowGold  text-lg md:text-3xl lg:text-4xl">
          Hi, I’m{" "}
        </h2>
        <h2 className="text-2xl md:text-5xl lg:text-7xl font-black text-white">
          DENNIS AKPA
        </h2>
        <h2 className="md:text-2xl text-white">Videographer/Editor</h2>
        <p className="text-xs text-white">Lagos State</p>
        <div className="bg-white h-16 mt-5"></div>
      </div>
      <div className="relative w-full pt-15 md:pt-40 ">
        <Image
          src={"/assets/Ellipse1.svg"}
          alt="Ellipse"
          width={100}
          height={100}
          className="absolute bottom-0 right-0 z-10 md:h-52 md:w-52 lg:h-64 lg:w-64"
        />

        <Image
          src={"/assets/circletemplate.png"}
          alt="circle"
          width={600}
          height={600}
          className="absolute bottom-0 right-3 z-20 md:h-[22rem] md:w-[22rem] lg:h-[28rem] lg:w-[28rem]"
        />

        <Image
          src={"/assets/template2.png"}
          alt="Videographer"
          width={170}
          height={170}
          className="absolute bottom-0 right-7 z-30 md:h-72 md:w-72 lg:h-96 lg:w-96"
        />
      </div>
    </section>
  );
};

export default TemplateTwoHero;
