import React from "react";
import { Buttons } from "../export_components";

const TemplateTwoPortfolio = () => {
  return (
    <>
      {" "}
      <section className="flex flex-col gap-10 py-20 px-10 lg:px-30 ">
        <h2 className="font-bold text-2xl lg:text-3xl text-center text-white">
          My
          <span className="text-gold"> Portfolio</span>
        </h2>
        <div className="  flex flex-col md:grid md:grid-cols-2 gap-10 md:gap-40">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="flex flex-col gap-5">
              {" "}
              <div className="bg-gray100  flex flex-col gap-5 h-96 center">
                <p className="text-black uppercase font-black text-lg text-center px-10">
                  Paste youtube/Instagram link
                </p>
              </div>
              <div className="bg-yellowGold center py-2 font-bold uppercase text-black">
                Product shoot
              </div>
            </div>
          ))}
        </div>
        <Buttons
          label="View more"
          className="rounded-none text-black font-bold w-fit px-20 mt-20 "
        />
        <div className="flex flex-col mt-20">
          <h2 className="font-bold text-2xl text-center text-white">Jobs</h2>
          <h2 className="text-gold font-bold text-2xl  text-center uppercase">
            Open to all kinds of gigs
          </h2>
        </div>
        <ul className="space-y-5 text-xl font-bold text-white">
          <li>Projects</li>
          <li>One off Gigs</li>
          <li>Freelancing</li>
          <li>Collaborations</li>
        </ul>
        <h2 className="text-gold font-bold text-2xl uppercase mt-20">
          Why you should work with me
        </h2>
      </section>
      <section className="bg-brownLight center">
        <p className="text-center text-sm py-10 px-10 lg:px-30 text-white">
          As a passionate and detail-oriented photographer, I bring creativity,
          precision, and storytelling into every shot. Whether it’s capturing
          the essence of a brand, the emotions of an event, or the artistry of a
          product, I ensure every image tells a compelling story. With expertise
          in high-quality editing, lighting, and composition, I deliver visuals
          that stand out. My commitment to professionalism, quick turnaround,
          and client satisfaction makes me the ideal choice for your photography
          needs. Let’s create something amazing together!
        </p>
      </section>
      <section className=" center">
        <p className="text-center font-bold text-sm lg:text-xl py-10 px-10 lg:px-30 text-white">
          Looking forward to working with you
        </p>
      </section>
    </>
  );
};

export default TemplateTwoPortfolio;
