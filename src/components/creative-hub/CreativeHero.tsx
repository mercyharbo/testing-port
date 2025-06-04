import React from "react";
import Image from "next/image";
const CreativeHero = () => {
  return (
    <section className="bodyMargin  h-fit bg-primary my-5  rounded-2xl gap-5">
      <div className=" h-full flex ">
        <div className=" flex flex-col justify-center w-full  p-15 ">
          <h2 className="text-xl text-white font-urbanist">Discover Creatives </h2>
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-white">
            Connect. Collaborate.
          </h2>
          <p className="text-xl text-white font-urbanist">
            Find talent across industries and grow your network
          </p>
        </div>
        <div className=" w-full flex justify-end items-end max-md:hidden ">
          <Image
            src="/assets/creative-man.svg"
            alt="creativehero"
            width={400}
            height={400}
            className="object-contain rounded-br-2xl  h-full"
          />
        </div>
      </div>
    </section>
  );
};

export default CreativeHero;
