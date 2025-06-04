import React from "react";
import Image from "next/image";

const CreativeBanner = () => {
  return (
    <>
      {/* Desktop / Tablet View */}
      <section className="bodyMargin bg-primary h-fit mt-20 mb-5 max-md:hidden">
        <div className="bodyMargin flex gap-5">
          <div className="flex-3/5 w-full flex flex-col justify-center items-start gap-5 py-5 px-10 font-raleway">
            <h2 className="text-xl lg:text-3xl font-extrabold text-white">
              Take the Next Step – Find Opportunities, Build Your Network, Get Hired!
            </h2>
            <p className="text-sm font-bold text-white">
              Explore top jobs, showcase your portfolio, and connect with different people in your field.
            </p>
          </div>
          <div className="flex-2/5 w-full flex items-center justify-center relative">
            <Image
              src="/assets/bell.png"
              alt="creativehero"
              width={300}
              height={200}
            />
          </div>
        </div>
      </section>

      {/* Mobile View */}
      <section className="bg-primary py-6 px-4 md:hidden">
        <div className="flex flex-col items-center text-center gap-4 font-raleway">
          <h2 className="text-lg font-extrabold text-white">
            Take the Next Step – Find Opportunities, Build Your Network, Get Hired!
          </h2>
          <p className="text-sm font-bold text-white">
            Explore top jobs, showcase your portfolio, and connect with different people in your field.
          </p>
          <div className="w-40 h-32 relative">
            <Image
              src="/assets/bell.png"
              alt="creativehero"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default CreativeBanner;
