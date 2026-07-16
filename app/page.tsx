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
        {/* identity — the world asks questions about Korea; we read them */}
        <Hero />
        {/* orientation — everything this site contains, at a glance */}
        <SiteMap />
        {/* entry — start with a topic */}
        <TopicsHome />
        {/* INTERPRETATION FIRST — representative questions, each ending in an insight */}
        <FeaturedPathways />
        <ResearchTeaser />
        {/* STRUCTURE SECOND — the question map + how a question becomes a perception */}
        <ExplorePreview />
        <ModelBand />
        {/* METHODOLOGY & DATA LAST */}
        <MethodSection />
      </main>
      <Footer />
    </>
  );
}
