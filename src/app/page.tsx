import About from "@/components/sections/home/About";
import ContactCta from "@/components/sections/home/ContactCta";
import FeaturedProjects from "@/components/sections/home/FeaturedProjects";
import Hero from "@/components/sections/home/Hero";
import PersonJsonLd from "@/components/sections/home/PersonJsonLd";
import Highlights from "@/components/sections/home/Highlights";
import Publication from "@/components/sections/home/Publication";
import RecentExperience from "@/components/sections/home/RecentExperience";

export const metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <div className="space-y-24 sm:space-y-32">
      <PersonJsonLd />
      <Hero />
      <About />
      <Highlights />
      <FeaturedProjects />
      <RecentExperience />
      <Publication />
      <ContactCta />
    </div>
  );
}
