import { footerInfo, socialMedia, footerSupport } from "@/src/constants";
import React from "react";
import { FaFacebook, FaLinkedin, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import NavLink from "./NavLink";
import { Buttons } from "@/src/components/export_components";
const Footer = () => {
  return (
    <div className="bg-primary center-flexCol text-white">
      <div className="bodyMargin my-10 py-5 flex flex-col gap-10">
        <div className="flex flex-col lg:flex-row">
          <div className="flex flex-col gap-5  w-full">
            <div className="grid grid-cols-3 w-full py-5 text-sm max-lg:justify-items-center ">
              {/* 1 */}
              <div className="flex flex-col gap-3 font_inter ">
                <p className="font-bold">Information</p>
                {footerInfo.map((info) => (
                  <NavLink key={info.label} href={info.link}>
                    <p> {info.label}</p>
                  </NavLink>
                ))}
              </div>
              {/* 2 */}
              <div className="flex flex-col gap-3 font-inter">
                <p className="font-bold">Social media</p>
                {socialMedia.map((media) => (
                  <NavLink key={media.label} href={media.link}>
                    <p> {media.label}</p>
                  </NavLink>
                ))}
              </div>
              {/* 3 */}
              <div className="flex flex-col gap-3 font-inter">
                <p className="font-bold">Supprt</p>
                {footerSupport.map((support) => (
                  <NavLink key={support.label} href={support.link}>
                    <p> {support.label}</p>
                  </NavLink>
                ))}
              </div>
            </div>
          </div>

          <div className="gap-5  flex flex-col  items-center w-full text-sm">
            <h2 className="text-2xl font-black">Sign up for our newsletter</h2>
            <div className="w-68 h-12 bg-white flex gap-1 px-2 py-1">
              <input
                type="text"
                className="w-full outline-none bg-transparent text-secondary"
              />
              <Buttons
                label="Subcribe"
                className="!bg-secondary !rounded-lg !py-1 !px-6 text-sm font-inter"
              />
            </div>
            <h2 className="text-sm  w-sm font-inter">
              Subscribe to our newsletter for the latest blog insights, creative
              tips, industry news, and exclusive updates delivered straight to
              your inbox.
            </h2>
          </div>
        </div>

        <div className="inter flex justify-center gap-20 items-center w-full font_inter">
          <div className="flex gap-2 text-white">
            <a
              href="https://www.linkedin.com/company/portgig-solutions/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="cursor-pointer" />
            </a>
            <a
              href="https://x.com/Portgigcom?t=i9UL1FzMm58TQwaWq2_MnQ&s=09"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="cursor-pointer" />
            </a>
            <a
              href="https://www.instagram.com/portgig?utm_source=qr&igsh=MThtaG9iNXp6cTZ3Yg=="
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="cursor-pointer" />
            </a>
            <a
              href="https://web.facebook.com/profile.php?id=61574997526395"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="cursor-pointer" />
            </a>
            <a
              href="https://www.youtube.com/@portgig"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube className="cursor-pointer" />
            </a>
          </div>
          <p className="text-xs">© 2025 Portgig. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
