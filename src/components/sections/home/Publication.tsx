import Reveal from "@/components/motion/Reveal";
import { getPublications } from "@/lib/content";

import PublicationCard from "../PublicationCard";
import SectionHeading from "../SectionHeading";

export default function Publication() {
  const [publication] = getPublications();
  if (!publication) return null;

  return (
    <section aria-labelledby="publication-heading" id="publication">
      <SectionHeading
        id="publication-heading"
        eyebrow="05 · Research"
        title="Publication"
      />
      <Reveal>
        <PublicationCard publication={publication} />
      </Reveal>
    </section>
  );
}
