import React from "react";

export default function Jobs() {
  return (
    <div className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-4">
          <h2 className="text-2xl lg:text-3xl font-extrabold mb-2">Jobs</h2>
          <h3 className="text-2xl lg:text-4xl font-bold text-[#FFBA00] mb-12">
            OPEN TO ALL KINDS OF GIGS
          </h3>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <h4 className="text-xl lg:text-3xl font-bold mb-3">Projects</h4>
          </div>

          <div className="mb-6">
            <h4 className="text-xl lg:text-3xl font-bold mb-3">One off Gigs</h4>
          </div>

          <div className="mb-6">
            <h4 className="text-xl lg:text-3xl font-bold mb-3">Freelancing</h4>
          </div>

          <div className="mb-12">
            <h4 className="text-xl lg:text-3xl font-bold mb-3">
              Collaborations
            </h4>
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-lg sm:text-xl md:text-4xl mb-4 mt-16 font-bold text-[#FFBA00]">
            WHY YOU SHOULD WORK WITH ME
          </h3>

          {/* Why Work With Me */}
          <div className="bg-[#2B2B2B] px-10 py-10 rounded-lg text-center max-w-5xl mx-auto">
            <p className="text-white text-sm lg:text-xl font-normal leading-relaxed">
              As a passionate and detail-oriented photographer, I bring
              creativity, precision, and storytelling into every shot. Whether
              it’s capturing the essence of a brand, the emotions of an event,
              or the artistry of a product, I ensure every image tells a
              compelling story. With expertise in high-quality editing,
              lighting, and composition, I deliver visuals that stand out. My
              commitment to professionalism, quick turnaround, and client
              satisfaction makes me the ideal choice for your photography needs.
              Let’s create something amazing together!
            </p>
          </div>
            <p className="text-xl lg:text-3xl font-bold font-lateef pt-4">
              Looking forward to working with you
            </p>
        </div>
      </div>
    </div>
  );
}
