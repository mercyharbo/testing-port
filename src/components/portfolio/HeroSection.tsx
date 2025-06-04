import Image from "next/image";
import React from "react";

const HeroSection = () => {
  return (
    <div className="bg-[#F2F2F2] text-[#0F172A] font-urbanist">
      {/* Header Section */}
      <section className="bg-[#0A1F63] text-white px-4 sm:px-6 md:px-12 py-10 md:py-12 flex flex-col md:flex-row justify-evenly items-center gap-8 md:gap-10 relative shadow-2xl">
        {/* Text Content */}
        <div className="max-w-xl text-center md:text-left">
          <p className="text-sm md:text-base mb-2">
            Your Work Deserves the Right Canvas
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2 leading-snug">
            Portfolio Template Market
          </h1>
          <p className="text-sm sm:text-base md:text-lg">
            Pick a portfolio template tailored to your creative niche. Swap
            anytime, zero stress
          </p>
        </div>

        {/* Image */}
        <div className="w-full max-w-[220px] md:max-w-[250px]">
          <Image
            src="/assets/template.png"
            alt="profile"
            width={250}
            height={250}
            className="object-contain w-full h-auto"
          />
        </div>
      </section>

      {/* Highlight Banner */}
      <div className="max-w-5xl mx-auto bg-[#0A1F63] text-white text-base rounded-2xl px-5 py-4 sm:p-6 my-10 shadow-xl text-center font-raleway">
        We currently have 6 unique portfolio templates tailored for different
        creative industries — from graphic designers to editors and more. This
        is just the beginning.
      </div>

      {/* Info Text */}
      <div className="max-w-4xl mx-auto px-4 md:px-0 text-base md:text-lg text-[#0A1754] space-y-5 font-raleway">
        <p>
          As we grow, we’ll keep expanding this library with fresh, inspiring
          layouts made by top-notch UI/UX designers — and you’ll get to pick the
          one that fits you best.
        </p>
        <p>
          Whether you’re showing off your logos, reels, edits, or product shots
          — preview, edit, and launch your work the way you want it seen.
        </p>
        <p>
          This space will soon feature community-made templates too. We’ll open
          submissions so that designers can drop their best — and you get even
          more ways to stand out.
        </p>
      </div>

      {/* Bottom Buttons */}
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row flex-wrap justify-center md:justify-between items-center mt-10 bg-[#0A1F63] rounded-2xl p-4 sm:p-6 text-white font-semibold text-base font-raleway gap-4 shadow-2xl text-center">
        <button className="font-black">Select the template for your niche</button>
        <button className="font-black">Preview it</button>
        <button className="font-black">Edit it</button>
        <button className="font-black">Save</button>
      </div>
    </div>
  );
};

export default HeroSection;
