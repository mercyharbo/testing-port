"use client";
import React from "react";
import Image from "next/image";
import { Buttons } from "../export_components";

const AboutSection = () => {
  return (
    <section className="bodyMargin my-5 text-textColor">
      {/* Top Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-0 mt-3 lg:mt-15">
        <div className="flex flex-col">
          <h1 className="text-textColor text-2xl md:text-3xl lg:text-5xl font-bold font-urbanist">What is this all about?</h1>
          <hr className="border-6 border-primary w-45 mt-5 lg:mt-15" />
          <h2 className="lg:w-120 text-xl lg:text-2xl 2xl:text-3xl font-black mt-5 text-primary font-raleway">
            Redefining How Creatives Present Themselves
          </h2>
          <p className="text-sm md:text-lg leading-6 my-2 text-primary font-semibold font-raleway">
            We understand the struggles creatives face in presenting their
            skills. Generic CVs don’t cut it anymore. That’s why we’re here to
            help you create a professional portfolio tailored to your craft.
            Whether you’re a designer, writer, developer, or artist.
          </p>
        </div>

        {/* Image + Mobile Text */}
        <div className="flex items-start justify-center flex-col sm:flex-row gap-3">
          {/* <p className="sm:hidden text-sm font-bold">
            Get a stunning portfolio that speaks for you. Showcase your skills,
            impress recruiters, and land your next big opportunity.
          </p> */}
          <Image
            src="/assets/groupImage.png"
            alt="Creative presentation"
            width={300}
            height={400}
            className="w-96 h-80 sm:w-60 sm:h-72 lg:h-96 lg:w-80 object-cover"
          />
        </div>
      </div>

      {/* Share Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-10 mt-10">
        <div className="flex flex-col">
          <h2 className="text-lg md:text-xl lg:text-4xl font-black text-primary">
            All your works in one place, easy to share. easy to impress.
          </h2>
          <hr className="border-5 border-primary w-45 my-3" />
          <Image
            src="/assets/about-man.png"
            alt="About man"
            width={659}
            height={300}
            className="w-full h-auto"
          />
        </div>

        {/* Job + Shop Info */}
        <div className="flex flex-col items-start sm:justify-center gap-5 font-raleway">
          <div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black mt-2 text-primary">
              Find Jobs That Fit You
            </h2>
            <p className="text-sm md:text-lg leading-6 my-2 font-bold text-primary">
              Discover gigs and job postings that match your expertise. <br />
              With just one click, apply using your comprehensive portfolio,{" "}
              <br />
              no CVs required.
            </p>
          </div>

          {/* Shop Box */}
          <div className="bg-primary w-fit lg:w-115 rounded-2xl flex flex-col gap-5 text-white p-10">
            <h2 className="font-black text-xl lg:text-3xl">
              Sell on Portgig Shop
            </h2>
            <p className="font-bold">
              As a creative, do you have any digital product you would like to
              sell or would you like to shop for items?
            </p>
            <Buttons
              label="Visit Shop"
              className="w-fit text-black font-urbanist self-end font-bold !px-10"
              onClick={() => {
                window.open("https://shop.portgig.com.ng/", "_blank");
              }}
            />
          </div>
        </div>
      </div>

      {/* Recruiter Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-10 mt-10">
        <div className="flex flex-col">
          <div className="lg:w-120 bg-secondary flex justify-start items-center mt-5 px-4 py-4">
            <p className="text-white font-extrabold text-2xl lg:text-3xl">
              Seamless Hiring for Recruiters
            </p>
          </div>
          <div className="flex flex-col ml-5">
            <h2 className="text-primary text-2xl lg:text-3xl font-black mt-5 font-raleway">
              Hire the Right Talent, Fast
            </h2>
            <p className="text-primary text-lg my-2 font-raleway font-bold w-fit lg:w-96">
              Access profiles with detailed portfolios and work histories. Post
              jobs, track applications, and connect with professionals in a few
              clicks.
            </p>
          </div>
        </div>

        <div className="flex items-center">
          <Image
            src="/assets/Ellipse-woman.png"
            alt="ellipse woman"
            width={550}
            height={500}
            className="object-fill"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
