import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { KeyFindings } from "@/components/site/home/key-findings";
import { QuestionToPerception } from "@/components/site/home/question-to-perception";
import { WorldCuriosity } from "@/components/site/home/world-curiosity";
import { ExplorePreview } from "@/components/site/explore-preview";
import { DatasetSection } from "@/components/site/home/dataset-section";
import { ResearchProcess } from "@/components/site/home/research-process";
import { Footer } from "@/components/site/footer";
import { EditMode } from "@/components/site/edit-mode";

// Home IA — a research platform, not an introduction:
// 01 Hero → 02 Key findings → 03 How a question becomes a perception →
// 04 What the world is curious about → 05 The question map →
// 06 The dataset → 07 Research → 08 Footer
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <KeyFindings />
        <QuestionToPerception />
        <WorldCuriosity />
        <ExplorePreview />
        <DatasetSection />
        <ResearchProcess />
      </main>
      <Footer />
      <EditMode />
    </>
  );
}
