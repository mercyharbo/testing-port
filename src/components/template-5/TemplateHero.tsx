import Image from "next/image";

export default function TemplateHero() {
  return (
    <div className="bg-[#A1242C] flex flex-col-reverse lg:flex-row items-center justify-center gap-8 px-6 py-10">
      <div className="text-center lg:text-left">
        <h1 className="text-white text-3xl md:text-4xl font-bold">
          Sophia Turner
        </h1>
        <p className="text-white mt-2 text-base md:text-lg font-bold">
          Strategic Social Media Manager | Driving Engagement & Growth
        </p>
        <p className="text-white text-sm mt-1 font-bold">Adamawa</p>
      </div>

      <div className="relative w-[320px] h-[340px] md:w-[400px] md:h-[430px] lg:w-[513px] lg:h-[518px] rounded-md overflow-hidden">
        <Image
          src="/assets/girl.png"
          alt="Sophia Turner"
          fill
          className="object-cover rounded-md"
        />
      </div>
    </div>
  );
}
