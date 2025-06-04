import React from "react";
import { jobs } from "@/src/constants";
import Image from "next/image";
const OtherJobs = () => {
  return (
    <section className="bodyMargin p-5 flex flex-col gap-5">
      <h2 className="text-textColor text-lg font-bold">View other jobs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {jobs.slice(0, 6).map((job) => (
          <div
            key={job.id}
            className="flex flex-col justify-between gap-5 h-full px-5 py-3 rounded-lg border-2 border-secondary text-secondary">
            <div className="flex items-center gap-4">
              <Image
                src={job.comapnyImage}
                alt={job.companyName}
                width={60}
                height={60}
                className="object-contain w-[60px] h-[60px]"
              />
              <div className="flex flex-col flex-1">
                <h2 className="font-bold text-xl line-clamp-1">
                  {job.jobTitle}
                </h2>
                <p className="text-sm">by {job.companyName}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-auto">
              <div className="flex justify-between text-sm font-bold">
                <h2>{job.location}</h2>
                <h2>{job.commision}</h2>
              </div>
              <div className="flex justify-between text-white text-[10px] font-bold">
                <div className="bg-secondary rounded-lg py-2 px-3">
                  {job.type}
                </div>
                <div className="bg-secondary rounded-lg py-2 px-3">
                  {job.level}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OtherJobs;
