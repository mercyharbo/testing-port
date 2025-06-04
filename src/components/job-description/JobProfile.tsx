"use client";
import { Buttons } from "@/src/components/export_components";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const JobProfile = () => {
	  const navigate = useRouter();
  return (
    <section className="h-fit pt-20 bodyMargin my-10 flex flex-col  gap-5 shadow p-5 md:p-10 lg:items-center">
      <div className="flex items-center gap-5">
        <div className="flex w-fit justify-center border border-primary rounded-full">
          <Image
            src={"/assets/companyImage.svg"}
            alt={"company image"}
            width={100}
            height={100}
            className="object-contain w-[100px] h-[100px]"
          />
        </div>
        <div>
          <h2 className="text-xl font-bold">Graphics Designer</h2>
          <p className="text-sm">by Uxper Group of Companies</p>
        </div>
      </div>
      <div className="flex flex-col gap-5 items-start lg:items-center">
        <div className="lg:w-6/12 border border-primary px-5 py-2 rounded-lg">
          <p className="text-[10px] md:text-sm">
            At PortGig, we believe that every creative deserves a platform to
            showcase their talent and connect with the right opportunities. Our
            mission is to bridge the gap between skilled professionals and
            businesses looking for top-tier creative expertise. Whether
            you&apos;re a designer, writer, marketer, or any other creative,
            PortGig provides the tools to build a comprehensive portfolio, gain
            visibility, and land high-quality gigs. Join a thriving community of
            creatives and recruiters, where collaboration meets opportunity.
          </p>
        </div>
        <Buttons
          label="Apply Now"
          className="!bg-primary text-white rounded-sm cursor-pointer"
          onClick={() => {
            navigate.push("/job-hub/apply");
          }}
        />
      </div>
    </section>
  );
};

export default JobProfile;
