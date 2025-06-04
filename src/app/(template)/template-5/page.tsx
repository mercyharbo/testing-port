import {
  TemplateFiveHero,
  TemplateFiveAboutMe,
  TemplateFiveStrategyContent,
  TemplateFiveSkills,
  TemplateFiveServices,
  TemplateFiveHealthcareCaseStudy,
  TemplateFiveFoodBrand,
  TemplateFiveFashionBrand,
  TemplateFivePortfolio,
  TemplateFiveGraphicsDesign,
  TemplateFiveVideoEditing,
  TemplateFiveTools,
} from "@/src/components/export_components";
import Image from "next/image";

export default function Template() {
  return (
    <div className="font-sans bg-black">
      <TemplateFiveHero />
      <TemplateFiveAboutMe />
      <TemplateFiveStrategyContent />
      <TemplateFiveSkills />
      <TemplateFiveServices />
      <TemplateFiveHealthcareCaseStudy />
      <TemplateFiveFashionBrand />
      <TemplateFiveFoodBrand />
      <TemplateFivePortfolio />
      <TemplateFiveGraphicsDesign />
      <TemplateFiveVideoEditing />
      <TemplateFiveTools />
      <footer className={`center px-10 py-20 bg-black`}>
        <Image
          src={"/assets/footer.svg"}
          height={200}
          width={1000}
          alt="made by portgig"
        />
      </footer>
    </div>
  );
}
