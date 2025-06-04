"use client";
import React, { useState } from "react";
import { Buttons } from "../export_components";
import { useRouter } from "next/navigation";
import Spinner from "@/src/components/Spinner"; // adjust the path as needed

interface BannerPropType {
  label: string;
}

const Banner = ({ label }: BannerPropType) => {
  const navigate = useRouter();
  const [loadingTarget, setLoadingTarget] = useState<
    "portfolio" | "recruiter" | null
  >(null);

  const handleRedirect = (path: string, type: "portfolio" | "recruiter") => {
    setLoadingTarget(type);
    setTimeout(() => {
      navigate.push(path);
    }, 1000);
  };

  return (
    <section className="bodyMargin my-8 px-5 max-md:hidden">
      <div className="px-8 py-4 bg-primary rounded-full md:rounded-4xl flex items-center justify-between shadow">
        {/* Create portfolio */}
        <div className="flex items-center justify-center gap-5">
          <h2 className="font-black text-xl font-raleway text-white">
            Create your portfolio
          </h2>
          <Buttons
            className="text-black font-semibold text-sm py-4 px-8 cursor-pointer flex items-center gap-2"
            onClick={() => handleRedirect("/sign-up", "portfolio")}
            label={
              loadingTarget === "portfolio" ? (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                  <Spinner>Redirecting...</Spinner>
                </div>
              ) : (
                label
              )
            }
          />
        </div>

        {/* Hire creative */}
        <div className="flex items-center justify-center gap-5">
          <h2 className="font-black text-xl font-raleway text-white">
            Hiring creative
          </h2>
          <Buttons
            className="text-black font-semibold text-sm py-4 px-8 cursor-pointer flex items-center gap-2"
            onClick={() => handleRedirect("/recruiter-sign-up", "recruiter")}
            label={
              loadingTarget === "recruiter" ? (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                  <Spinner>Redirecting...</Spinner>
                </div>
              ) : (
                label
              )
            }
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
