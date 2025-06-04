"use client";
import React from "react";
import Image from "next/image";
import Buttons from "@/src/components/Buttons";
const ProfileCard = () => {
  return (
    <main className="my-30 bodyMargin text-primary font-raleway">
      <div className="relative w-full flex flex-col gap-30 h-fit shadow rounded-sm p-10 lg:px-20">
        <div className="absolute -top-5 right-2 bg-secondary/70 center text-white px-10 py-2 text-sm lg:text-2xl font-ramaraja">
          Expert
        </div>
        {/* name */}
        <div className="flex flex-col md:flex-row gap-20">
          {" "}
          <div className="flex flex-col gap-5">
            <div className="h-20 w-20 rounded-full">
              <Image
                src="/assets/creativeImage.svg"
                alt="profile image"
                width={100}
                height={100}
                className=" h-36 w-36 object-cover"
              />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="text-xl md:text-3xl lg:text-5xl font-bold">
              Adeoluwa (Adegraphx)
            </h2>
            <div className="text-sm">
              {" "}
              <h2 className="lg:text-2xl">UI/UX Designer/Lagos State</h2>
              <h2 className="lg:text-2xl">@adeoluwa@gmail.com</h2>
            </div>
            <div className="h-fit">
              <p className="text-[12px] lg:text-xl ">
                Hi, I&apos;m Ade <br />
                Nice to meet you! I&apos;m a Graphic Designer with a passion for
                visual storytelling. I specialize in branding, logo design, and
                digital illustrations, and I’m excited to connect and
                collaborate on new opportunities!
              </p>
            </div>
          </div>
        </div>
        {/* buttons */}
        <div className="flex justify-between text-white md:text-xl lg:text-3xl">
          <Buttons
            label="Let Chat"
            className="!bg-primary  rounded-none !px-10 !py-3"
            onClick={() => {}}
          />
          <Buttons
            label="Let Chat"
            className="!bg-primary  rounded-none !px-10 !py-3"
            onClick={() => {}}
          />
        </div>
      </div>
    </main>
  );
};

export default ProfileCard;
