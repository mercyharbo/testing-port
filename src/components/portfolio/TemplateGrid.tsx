import Image from "next/image";
import Link from "next/link";
import React from "react";

const templates = [
  {
    title: "Writers Portfolio",
    image: "/assets/templates/template4.png",
    previewLink: "/template-4",
  },
  {
    title: "Videographer/ Content Creator Portfolio",
    image: "/assets/templates/template2.png",
    previewLink: "/template-2",
  },
  {
    title: "Developers/ Techies",
    image: "/assets/templates/template3.png",
    previewLink: "/template-3",
  },
  {
    title: "Photography/ Cinematographer",
    image: "/assets/templates/template6.png",
    previewLink: "/template-6",
  },
  {
    title: "Social Media Manager/ Virtual Assistant Template",
    image: "/assets/templates/template5.png",
    previewLink: "/template-5",
  },
  {
    title: "Designer Template",
    image: "/assets/templates/template1.png",
    previewLink: "/template-1",
  },
];

const TemplatesGrid = () => {
  return (
    <div className="bg-[#F2F2F2] py-10 px-4 sm:px-6 lg:px-12 font-urbanist">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-x-10 gap-y-8 max-w-6xl mx-auto justify-center">
        {templates.map((template, index) => (
          <div key={index} className="flex flex-col gap-2 w-full lg:max-w-[519px]">
            {/* Card */}
            <div className="bg-[#0A1F63] rounded shadow-lg overflow-hidden relative transition transform hover:scale-105 hover:shadow-xl">
              {/* Image with Overlay */}
              <div className="relative w-full h-56 sm:h-64 md:h-72">
                <Image
                  src={template.image}
                  alt={template.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[#0A175494]" />
              </div>

              {/* Buttons */}
              <div className="absolute inset-0 flex items-center justify-center gap-4 z-10">
                <Link href={template.previewLink}>
                  <button className="cursor-pointer bg-white text-black rounded px-6 py-2 text-sm font-semibold shadow-md hover:bg-gray-100 transition">
                    Preview
                  </button>
                </Link>
                <Link href="/edit-template">
                  <button className="cursor-pointer bg-white text-black rounded px-6 py-2 text-sm font-semibold shadow-md hover:bg-gray-100 transition">
                    Edit
                  </button>
                </Link>
              </div>
            </div>

            {/* Title Outside Card */}
            <h2 className="text-[#0A1F63] font-semibold text-sm sm:text-base px-1">
              {template.title}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplatesGrid;
