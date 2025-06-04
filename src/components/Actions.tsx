"use client";
import React from "react";
import { Buttons } from "./export_components";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";

const Actions = () => {
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    { label: "Edit Profile", path: "/creative-dashboard/edit-profile" },
    { label: "Edit CV/Resume", path: "/creative-dashboard/edit-cv" },
    { label: "Edit portfolio", path: "/creative-dashboard/edit-portfolio" },
    { label: "Change Password", path: "/creative-dashboard/change-password" },
  ];

  const buttonStyles = `
    border border-black 
    max-md:px-2 
    rounded-lg 
    max-md:w-fit 
    md:w-full 
    max-md:text-[10px] 
    sm:text-sm 
    md:text-lg 
    cursor-pointer 
    transition-all duration-300 
    hover:bg-primary hover:text-white 
    hover:scale-105
  `;

  return (
    <aside className="flex max-md:justify-between max-md:items-center max-md:gap-5 md:flex-col gap-5 text-primary font-raleway">
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

export default Actions;
