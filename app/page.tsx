import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { ExplorePreview } from "@/components/site/explore-preview";
import { ModelBand } from "@/components/site/model-band";
import { FeaturedPathways } from "@/components/site/featured-pathways";
import { ResearchTeaser } from "@/components/site/research-teaser";
import { MethodSection } from "@/components/site/method-section";
import { Footer } from "@/components/site/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* Act I — thesis: we structure questions into an ontology */}
        <Hero />
        {/* Act II — the ontology as a network (primary visual identity) */}
        <ExplorePreview />
        {/* supporting: the five layers, traced through one question */}
        <ModelBand />
        <FeaturedPathways />
        {/* Act III — research, built on top of the ontology */}
        <ResearchTeaser />
        <MethodSection />
      </main>
      <Footer />
    </>
  );
}
