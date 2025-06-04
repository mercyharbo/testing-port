import Image from "next/image";
import React from "react";

const TemplateOneHero = () => {
  return (
    <>
      {" "}
      <section className="lg:hidden bg-purpleLight flex  gap-2 py-5 ">
        <div className=" flex flex-col gap-2 justify-center px-5 w-full">
          <h2 className="text-gold  font-bold">
            I’ am a <br />{" "}
            <span className="text-white font-bold ">
              Graphics/
              <br />
              UI UX <br />
              Designer
            </span>
          </h2>
          <p className="text-white font-bold ">
            Creative Graphic & UI/UX Designer Crafting Engaging Digital
            Experiences
          </p>
        </div>
        <div className=" w-full flex items-end px-5">
          <div className="h-45 bg-white w-52"></div>
        </div>
      </section>{" "}
      <section className="max-lg:hidden lg:h-120 bg-purpleLight flex  gap-2 ">
        <div className=" flex flex-col gap-2 justify-center px-10 w-full">
          <h2 className="text-gold text-2xl font-bold">
            I’ am a <br />{" "}
            <span className="text-white font-bold text-6xl 0">
              Graphics/
              <br />
              UI UX <br />
              Designer
            </span>
          </h2>
        </div>
        <div className=" w-full flex items-end">
          <div className="h-96 bg-white w-full flex items-center justify-center">
            <Image
              src="/assets/template1.png"
              alt="Designer"
              className="h-full object-cover"
              width={500}
              height={500}
            />
          </div>
        </div>
        <div className=" w-full flex items-end">
          <p className="text-white p-10 font-bold text-xl">
            Creative Graphic & UI/UX Designer Crafting Engaging Digital
            Experiences
          </p>
        </div>
      </section>
    </>
  );
};

export default TemplateOneHero;
