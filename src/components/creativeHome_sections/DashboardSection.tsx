"use client";
import { Buttons } from "@/src/components/export_components";
import { creatives } from "@/src/constants";
import Image from "next/image";
import Link from "next/link";

const DashboardSection = () => {
  const creative = creatives[0];

  return (
    <section className="flex flex-col gap-5 my-10 bodyMargin">
      {/* Header */}
      <div className="w-full bg-secondary px-4 md:px-5 flex items-center">
        <h2 className="text-lg md:text-3xl font-bold text-white py-5">
          Your Portfolio, Your Stage – Take Control Now!
        </h2>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6 md:gap-10">
        {/* Left Side Text */}
        <div className="w-full lg:w-2/3 bg-primary rounded-lg py-6 px-4 flex items-center justify-center text-center">
          <p className="text-sm md:text-base lg:text-2xl font-bold font-ralway text-white max-w-md">
            Access your dashboard to showcase your work, track job applications,
            and connect with top recruiters. Your creative journey starts here!
          </p>
        </div>

        {/* Right Side Profile Card */}
        <div className="w-full lg:w-1/3 mx-2">
          <div className="flex flex-col gap-3 pb-5 px-4 rounded-lg shadow-lg text-secondary font-raleway bg-white">
            <div className="flex justify-between items-center">
              <Image
                src={creative.creativeImage}
                alt={creative.name}
                width={100}
                height={100}
              />
              <div className="bg-secondary/80 text-white py-1 px-4 text-sm font-ramaraja">
                {creative.level}
              </div>
            </div>
            <h2 className="text-primary font-bold text-base md:text-lg">
              {creative.name} ({creative.username})
            </h2>
            <h2 className="text-primary font-extralight text-sm line-clamp-1">
              {creative.field} / {creative.location}
            </h2>
            <div className="bg-gray100 h-20 p-2 border border-gray100 text-xs line-clamp-3">
              {creative.introduction}
            </div>
            <div className="flex flex-col sm:flex-row justify-between gap-3 px-2 text-white">
              <Link href="#profile">
                <Buttons
                  label="View profile"
                  className="!bg-primary w-full sm:w-fit rounded-lg text-sm font-medium"
                />
              </Link>
              <Link href="#contact">
                <Buttons
                  label="Contact Me"
                  className="!bg-primary w-full sm:w-fit rounded-lg text-sm font-medium"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Go to Dashboard Button */}
      <div className="flex justify-center lg:justify-end mt-6 px-4">
        <Link href="/creative-dashboard">
          <Buttons
            label="Go to Dashboard"
            className="!bg-primary w-fit rounded-lg font-bold text-lg md:text-xl text-white"
          />
        </Link>
      </div>
    </section>
  );
};

export default DashboardSection;
