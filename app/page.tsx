import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { ModelBand } from "@/components/site/model-band";
import { FeaturedPathways } from "@/components/site/featured-pathways";
import { ExplorePreview } from "@/components/site/explore-preview";
import { MethodSection } from "@/components/site/method-section";
import { Footer } from "@/components/site/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ModelBand />
        <FeaturedPathways />
        <ExplorePreview />
        <MethodSection />
      </main>
      <Footer />
    </>
  );
}
