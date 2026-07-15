import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { ModelBand } from "@/components/site/model-band";
import { FeaturedPathways } from "@/components/site/featured-pathways";
import { ExplorePreview } from "@/components/site/explore-preview";
import { MethodSection } from "@/components/site/method-section";
import { ProvenanceStrip } from "@/components/site/provenance-strip";
import { Footer } from "@/components/site/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <section className="border-b border-border">
          <div className="container py-10 sm:py-12">
            <ProvenanceStrip />
          </div>
        </section>
        <ModelBand />
        <FeaturedPathways />
        <ExplorePreview />
        <MethodSection />
      </main>
      <Footer />
    </>
  );
}
