import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { TopicsHome } from "@/components/site/topics-home";
import { ExplorePreview } from "@/components/site/explore-preview";
import { ModelBand } from "@/components/site/model-band";
import { FeaturedPathways } from "@/components/site/featured-pathways";
import { ResearchTeaser } from "@/components/site/research-teaser";
import { SiteMap } from "@/components/site/site-map";
import { MethodSection } from "@/components/site/method-section";
import { Footer } from "@/components/site/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* Act I — the question: how does the world understand Korea? */}
        <Hero />
        {/* primary entry — start with a topic */}
        <TopicsHome />
        {/* the ontology as a network (core differentiator) */}
        <ExplorePreview />
        {/* supporting: how one question becomes a perception */}
        <ModelBand />
        <FeaturedPathways />
        {/* Act III — research, built on top of the ontology */}
        <ResearchTeaser />
        {/* what you can do here — a visible exploration structure */}
        <SiteMap />
        <MethodSection />
      </main>
      <Footer />
    </>
  );
}
