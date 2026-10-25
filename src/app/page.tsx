import About from "@/components/sections/home/About";
import ContactCta from "@/components/sections/home/ContactCta";
import FeaturedProjects from "@/components/sections/home/FeaturedProjects";
import Hero from "@/components/sections/home/Hero";
import Highlights from "@/components/sections/home/Highlights";
import Publication from "@/components/sections/home/Publication";
import RecentExperience from "@/components/sections/home/RecentExperience";

export default function Home() {
  return (
    <div className="space-y-24 sm:space-y-32">
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
