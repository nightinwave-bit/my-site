import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { About } from "@/components/site/about";
import { DataSources } from "@/components/site/data-sources";
import { QuestionMap } from "@/components/site/question-map";
import { CategoryCards } from "@/components/site/category-cards";
import { DataFlow } from "@/components/site/data-flow";
import { Footer } from "@/components/site/footer";
import { SampleNotice } from "@/components/site/sample-notice";
import { SectionDivider } from "@/components/site/section-divider";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative">
        <Hero />
        <div className="relative">
          {/* subtle divider between hero and content */}
          <SectionDivider />
          <About />
          <DataSources />
          <QuestionMap />
          <CategoryCards />
          <DataFlow />
          <section className="pb-24 sm:pb-32">
            <div className="container max-w-3xl">
              <SampleNotice />
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
