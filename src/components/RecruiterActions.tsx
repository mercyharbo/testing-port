
"use client";
import React from "react";
import { Buttons } from "./export_components";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";

const RecruiterActions = () => {
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    { label: "Profile & account", path: "/recruiter-dashboard/recruiter-edit-profile" },
  
    { label: "Change Password", path: "/recruiter-dashboard/recruiter-change-password" },
  ];

  const buttonStyles =
    "border border-black max-md:px-2 rounded-lg max-md:w-fit md:w-full max-md:text-[10px] sm:text-sm md:text-lg cursor-pointer";

  return (
    <aside className="flex max-md:justify-between max-md:items-center max-md:gap-5   md:flex-col gap-5 text-primary">
      {links.map((link) => (
        <Buttons
          key={link.path}
          label={link.label}
          onClick={() => router.push(link.path)}
          className={clsx(
            buttonStyles,
            pathname === link.path && "!bg-primary text-white"
          )}
        />
      ))}
    </aside>
  );
};

export default RecruiterActions;

