"use client";
import React, { useEffect, useState } from "react";
import { creatives } from "@/src/constants";
import Image from "next/image";
import { IoIosArrowForward } from "react-icons/io";
import { LooadingSpinner } from "@/src/utils/util_component";
import { useRouter } from "next/navigation";
const Creatives = () => {
  const navigate = useRouter();
  const creativesPerPage = 12;
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(creatives.length / creativesPerPage);

  const startIndex = currentPage * creativesPerPage;
  const endIndex = startIndex + creativesPerPage;
  const currentCreatives = creatives.slice(startIndex, endIndex);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="center h-full my-5">
        <LooadingSpinner className="border-primary w-16 h-16" />
      </div>
    );
  }
  return (
    <section className="p-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {currentCreatives.map((creative, index) => (
          <div
            onClick={() => navigate.push("/profile-card")}
            key={creative.id}
            className={`flex flex-col gap-2 pb-5 px-5 rounded-lg shadow-lg  cursor-pointer ${
              index % 3 === 1
                ? "bg-primary text-white"
                : "bg-white text-primary"
            }`}>
            <div className="flex justify-between items-center">
              <div className="h-[100px] w-[100px] overflow-hidden">
                <Image
                  src={creative.creativeImage}
                  alt={creative.name}
                  width={100}
                  height={100}
                  className="object-cover h-full w-full"
                />
              </div>
              <div className="bg-secondary/80 text-white py-1 px-5 font-ramaraja">
                {creative.level}
              </div>
            </div>
            <h2 className=" font-bold text-sm px-5 line-clamp-1">
              {creative.name} ({creative.username})
            </h2>
            <h2 className="text-primary font-extralight  text-sm px-5 line-clamp-1">
              {creative.field} / {creative.location}
            </h2>
            <div
              className={`   h-14  p-1 border    text-xs line-clamp-3 ${
                index % 3 === 1
                  ? "bg-primary text-white"
                  : "bg-gray50 text-primary border-gray100"
              }`}>
              {creative.introduction}
            </div>
            <div className="flex justify-between px-2 mt-5 ">
              <button
                className={`py-2 px-3 w-fit self-end rounded-lg text-sm font-medium cursor-pointer ${
                  index % 3 === 1
                    ? "bg-white text-primary"
                    : "bg-primary text-white"
                }`}>
                View Profile
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className={`py-2 px-3 w-fit self-end rounded-lg text-sm font-medium cursor-pointer ${
                  index % 3 === 1
                    ? "bg-white text-primary"
                    : "bg-primary text-white"
                }`}>
                Contact Me
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-4 mt-4">
        {/* Generate buttons dynamically based on total pages */}
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index)}
            className={`h-10 w-10 flex items-center justify-center rounded-full font-semibold font-inter ${
              currentPage === index
                ? "bg-primary text-white cursor-not-allowed"
                : "text-secondary hover:bg-accents"
            }`}>
            {index + 1}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
          }
          className={`h-10 w-10 flex items-center justify-center rounded-full font-semibold border border-accents ${
            currentPage >= totalPages - 1
              ? "bg-accents cursor-not-allowed"
              : "text-secondary hover:bg-accents"
          }`}
          disabled={currentPage >= totalPages - 1}>
          <IoIosArrowForward />
        </button>
      </div>
    </section>
  );
};

export default Creatives;
