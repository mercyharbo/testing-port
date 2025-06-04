"use client";

import { Buttons } from "@/src/components/export_components";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  return (
    <div className="flex h-[100dvh]">
      <div
        className="flex-2/3 bg-no-repeat bg-cover max-sm:hidden p-5"
        style={{ backgroundImage: `url('/assets/onboarding.png')` }}
      >
        <Link href="/">
          <Image
            src="/assets/portgig-2.svg"
            alt="Portgig Logo"
            width={150}
            height={150}
          />
        </Link>
      </div>

      {/* Right side */}
      <div className="flex-3/3 bg-primary flex flex-col items-center justify-center gap-10 sm:gap-20 text-white max-lg:bg-[url('/assets/onboarding.svg')] bg-cover bg-no-repeat">
        <h2 className="text-4xl font-bold max-lg:hidden font-vesper">
          Welcome
        </h2>

        {/* Creative section */}
        <div className="flex flex-col items-center gap-5 sm:gap-10">
          <h1 className="max-sm:!text-3xl lg:text-8xl font-ramaraja">
            Creative
          </h1>
          <Link href="sign-up">
            <Buttons
              label="Get Started"
              className="font-raleway transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg text-black text-xl sm:text-3xl lg:text-2xl !rounded-2xl font-semibold w-96 sm:w-[500px] h-16 sm:h-20 cursor-pointer hover:bg-black hover:text-white"
            />
          </Link>
        </div>

        {/* Recruiter section */}
        <div className="flex flex-col items-center gap-5 sm:gap-10">
          <h1 className="max-sm:!text-3xl lg:text-8xl font-ramaraja">
            Recruiter
          </h1>
          <Link href="/recruiter-sign-up">
            <Buttons
              label="Get Started"
              className="font-raleway transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg text-black text-xl sm:text-3xl lg:text-2xl font-semibold !rounded-2xl w-96 sm:w-[500px] h-16 sm:h-20 cursor-pointer hover:bg-black hover:text-white"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
