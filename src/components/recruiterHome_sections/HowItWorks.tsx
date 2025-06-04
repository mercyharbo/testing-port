"use client";

import Image from "next/image";
import Link from "next/link";
import Buttons from "../Buttons";

const HowItWorks = () => {
  return (
    <section className="flex flex-col gap-5 my-5">
      {/* how it works */}
      <div className="bodyMargin h-15">
        <h2 className="heading text-white w-md bg-[#00489A] px-4 py-2 rounded">
          {" "}
          How it works?
        </h2>
      </div>
      <div className="bodyMargin flex">
        <div className="text-primary text-center lg:text-xl  font-black flex flex-col items-center justify-center gap-5 font-raleway lg:pl-10">
          <h2>Step 1: Post a Job – Create job listings in minutes.</h2>
          <h2>
            Step 2: Explore Talent – Browse creative profiles and portfolios.
          </h2>
          <h2>
            Step 3: Connect & Hire –Check out Cv/ Portfolio and hire top talent.
          </h2>
          <h2>
            Step 4: Manage & Track – Keep your hiring organized in one place.
          </h2>
        </div>
        <div className=" w-full flex justify-center items-center max-md:hidden ">
          <Image
            src="/assets/questionmark.svg"
            alt="creativehero"
            width={400}
            height={400}
            className="object-contain rounded-br-2xl  "
          />
        </div>
      </div>
      {/* streamline hiring */}
      <div className="bodyMargin flex bg-primary lg:pl-10">
        <div className="text-white text-lg lg:text-4xl font-black flex flex-col items-center justify-center gap-5 p-5 font-raleway">
          <h4>Streamline Your Hiring – All in One Place</h4>
          <p className="text-white text-lg lg:text-2xl font-bold flex flex-col items-center justify-center gap-5 p-5 font-raleway">
            Manage job listings, track applications, and communicate with
            candidates effortlessly.
          </p>
        </div>
        <div className=" w-full flex justify-center items-center max-md:hidden ">
          <Image
            src="/assets/newjob.svg"
            alt="creativehero"
            width={400}
            height={400}
            className="object-contain rounded-br-2xl  "
          />
        </div>
      </div>
      <div className="bodyMargin flex justify-end mt-3">
        {/* dashboard bvutton */}
        <Link href="/recruiter-dashboard">
          <Buttons
            label="Go to dashbaord"
            className="!bg-primary lg:text-xl lg:font-bold w-fit text-white rounded-lg py-3"
          />
        </Link>
      </div>
      {/* find the right talent */}
      <div className="mx-3">
        <div className="bodyMargin">
          <p className="subHeading text-white w-2xl bg-[#00489A] px-4 py-2 rounded">
            Need Help Finding the right Talent?
          </p>
        </div>
      </div>

      <div className=" md:flex gap-10 bodyMargin  bg-primary my-5 p-8 rounded-2xl text-white font-raleway">
        <div className=" flex flex-col gap-15  ">
          <p className="font-bold py-4 font-raleway text-xl">
            Finding the perfect creative professional can be overwhelming, but
            we make it simple. Whether you need a graphic designer, writer,
            video editor, or marketing expert, we’ll help you connect with the
            right talent for your project.
          </p>
          <div className="flex flex-col gap-5">
            <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-5xl font-black">
              How We Can Help?
            </h2>
            <div className="flex flex-col gap-3">
              <p className=" font-bold">
                ✅ Personalized Talent Matching – Get recommendations based on
                your needs.
              </p>
              <p className=" font-bold">
                ✅ Verified Professionals – Work with pre-screened creatives you
                can trust.
              </p>
              <p className=" font-bold">
                ✅ Effortless Hiring Process – Post jobs, review portfolios, and
                hire seamlessly.
              </p>
              <p className=" font-bold">
                ✅ Dedicated Support – Our team is here to guide you every step
                of the way.
              </p>
            </div>
          </div>
        </div>

        <div className=" max-md:hidden h-96 w-full ">
          <Image
            src="/assets/two-women.png"
            alt="Discover more creatives"
            width={500}
            height={450}
          />
        </div>
      </div>

      {/* contact */}
      <div className="h-10 bg-whitew-full flex justify-center items-center">
        <h2 className="text-sm sm:text-xl  font-black text-center text-primary">
          {" "}
          Contact us at hiretalents@portgig.com to get started!
        </h2>
      </div>
    </section>
  );
};

export default HowItWorks;
