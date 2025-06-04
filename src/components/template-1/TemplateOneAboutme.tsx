import { skills } from "@/src/constants";
import React from "react";

function TemplateOneAboutme() {
  return (
    <section className="h-fit">
      <div className=" px-10 pt-15 pb-5 flex flex-col gap-10">
        <h2 className="font-bold text-xl lg:text-3xl text-white">
          About <span className="text-gold">Me</span>
        </h2>
        <div className="w-full bg-white p-10 text-primary">
          <p className="text-xs lg:text-lg font-bold">
            I am a creative Graphic Designer & UI/UX Designer with a passion for
            crafting visually stunning and user-friendly designs. With a deep
            understanding of brand identity, digital design, and user
            experience, I help businesses stand out with compelling visuals and
            intuitive interfaces. From logo design and branding to web and
            mobile app design, my goal is to create designs that not only look
            great but also enhance user engagement and conversion.{" "}
          </p>
        </div>
        <h2 className="font-bold text-xl lg:text-3xl text-white">
          <span className="text-gold">Mission and</span> Design Philosophy
        </h2>
        <div className="w-full bg-white p-10 text-primary">
          <p className="text-xs lg:text-lg font-bold">
            I am a creative Graphic Designer & UI/UX Designer with a passion for
            crafting visually stunning and user-friendly designs. With a deep
            understanding of brand identity, digital design, and user
            experience, I help businesses stand out with compelling visuals and
            intuitive interfaces. From logo design and branding to web and
            mobile app design, my goal is to create designs that not only look
            great but also enhance user engagement and conversion.{" "}
          </p>
        </div>
        <h2 className="text-gold font-bold text-xl lg:text-3xl">Skills</h2>
      </div>
      <div className="bg-white py-10 px-5 lg:px-15 flex flex-col md:grid md:grid-cols-2 gap-5 md:gap-x-50 md:gap-y-10 place-items-center ">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="bg-purpleBg rounded-2xl flex flex-col gap-5 p-5 pb-30 w-full">
            <div className="bg-white h-52 md:h-72 rounded-xl"></div>
            <h2 className="text-center font-bold text-2xl text-white">{skill}</h2>
          </div>
        ))}
      </div>
      <div className="bg-purpleBg p-10 lg:p-20 flex flex-col gap-5">
        <h2 className="font-bold text-2xl lg:text-3xl text-white">
          <span className="text-gold">Tool/</span> Software
        </h2>
        <p className="font-bold text-xl lg:text-2xl text-white">
          Adobe Creative Suite (Photoshop, Illustrator, InDesign, After Effects)
          Figma, Adobe XD, Sketch Canva (for quick design work)
        </p>
        <p className="font-bold text-xl lg:text-2xl text-white">
          Sketch Canva (for quick design work)
        </p>
      </div>
    </section>
  );
}

export default TemplateOneAboutme;
