"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n";
import { DocSection, Kicker, H2, Lead, type L } from "./parts";

const D = (ko: string, en: string): L => ({ ko, en });

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 max-w-2xl space-y-4 text-[15px] leading-[1.85] text-secondary sm:text-[16px]" style={{ wordBreak: "keep-all" } as React.CSSProperties}>
      {children}
    </div>
  );
}

export function UnderstandingModel() {
  const { locale } = useLanguage();

  return (
    <>
      {/* ── 정부 ── */}
      <DocSection>
        <Kicker>
          {locale === "ko" ? "정부" : "Government"}
        </Kicker>
        <H2>
          {locale === "ko"
            ? "질문 데이터를 국가 인프라로 구축"
            : "Build question data into national infrastructure"}
        </H2>
        <Prose>
          {locale === "ko" ? (
            <>
              <p>현재 한국 관련 정책과 공공외교 사업은 기관별로 분절되어 운영된다.</p>
              <p>관광은 관광기관이 담당하고, 문화는 문화기관이 담당하고, 교육은 교육기관이 담당한다.</p>
              <p>하지만 세계가 실제로 어떤 질문을 하고 있는지, 어떤 국가가 무엇을 궁금해하는지, 그 질문에 어떤 설명이 필요한지는 통합적으로 관리되지 않는다.</p>
              <p>1,540개의 질문은 국가별 질문 패턴이 다르다는 사실을 보여준다. 그렇다면 정부가 가장 먼저 해야 할 일은 콘텐츠 제작이 아니라 질문 인프라 구축이다.</p>
              <p>우선 국가별 질문 데이터를 지속적으로 수집·관리하는 체계를 구축해야 한다. 어떤 국가에서 어떤 질문이 증가하고 있는지, 어떤 주제가 새롭게 등장하고 있는지, 어떤 설명 수요가 형성되고 있는지를 정기적으로 분석한다.</p>
              <p>그 위에 국가별 맞춤형 FAQ 데이터베이스를 구축해야 한다.</p>
              <p>또한 국가별 한국 설명 자료를 개별 기관이 반복 생산하는 방식에서 벗어나 공공 자산으로 축적해야 한다. 해당 자료는 정부기관, 시민사회, 언론이 모두 활용할 수 있도록 배포해야 한다.</p>
              <p>마지막으로 질문 데이터를 AI 환경과 연결해야 한다. 국가별 질문 데이터, 검증된 답변, 다국어 설명 자료를 축적하여 AI가 한국에 대해 더 정확하게 설명할 수 있는 기반을 구축해야 한다.</p>
              <p>국가브랜드 전략은 더 많은 콘텐츠를 생산하는 일이 아니다. 세계가 실제로 던지는 질문을 중심으로 국가 차원의 설명 인프라를 구축하는 일이다.</p>
            </>
          ) : (
            <>
              <p>Korea&apos;s public diplomacy currently operates in silos &mdash; tourism under one agency, culture under another, education under a third.</p>
              <p>But no one manages the questions themselves: which countries are asking what, which topics are emerging, which explanations are needed.</p>
              <p>1,540 questions show that question patterns differ by country. The government&apos;s first task is not producing more content &mdash; it is building question infrastructure.</p>
              <p>First, establish a system for continuously collecting and managing country-level question data. Regularly analyze which questions are growing, which topics are emerging, and which explanation demands are forming.</p>
              <p>On top of that, build a country-specific FAQ database.</p>
              <p>Move away from individual agencies repeatedly producing Korea-explanation materials. Accumulate them as a public asset, distributed for use by government, civil society, and media alike.</p>
              <p>Finally, connect question data to the AI environment. Build a foundation of country-level question datasets, verified answers, and multilingual explanation materials so AI can explain Korea more accurately.</p>
              <p>National brand strategy is not about producing more content. It is about building a national explanation infrastructure centered on the questions the world actually asks.</p>
            </>
          )}
        </Prose>
      </DocSection>

      {/* ── 시민사회 ── */}
      <DocSection tint>
        <Kicker>
          {locale === "ko" ? "시민사회" : "Civil Society"}
        </Kicker>
        <H2>
          {locale === "ko"
            ? "질문을 참여와 프로젝트로 전환"
            : "Turn questions into participation and projects"}
        </H2>
        <Prose>
          {locale === "ko" ? (
            <>
              <p>질문은 데이터만으로 해결되지 않는다. 질문과 답변 사이에는 여전히 사람과 경험이 필요하다.</p>
              <p>시민사회의 역할은 질문을 실제 참여와 프로젝트로 연결하는 것이다.</p>
              <p>독일에서 한국어 질문이 많다면 언어교류 프로그램을 만들 수 있다. 브라질에서 분단 질문이 많다면 한국전쟁과 현대 한국을 설명하는 시민 프로젝트를 운영할 수 있다. 인도네시아에서 한국 입문 질문이 많다면 현지 청년과 함께 한국 소개 콘텐츠를 공동 제작할 수 있다.</p>
              <p>중요한 것은 콘텐츠를 많이 만드는 것이 아니다. 질문이 반복되는 지점을 발견하고, 그 질문을 해결하는 새로운 활동과 참여 모델을 만드는 것이다.</p>
              <p>질문 기반 스터디, 질문 기반 국제교류, 질문 기반 공동 콘텐츠 제작, 질문 기반 시민참여 프로젝트는 모두 이런 역할의 연장선에 있다.</p>
              <p>시민사회는 질문을 소비하지 않는다. 질문을 새로운 관계와 참여의 기회로 전환한다.</p>
            </>
          ) : (
            <>
              <p>Questions are not solved by data alone. Between a question and its answer, people and experience are still needed.</p>
              <p>Civil society&apos;s role is to connect questions to real participation and projects.</p>
              <p>If Germany has many Korean-language questions, create language exchange programs. If Brazil has many division questions, run civic projects explaining the Korean War and modern Korea. If Indonesia has many introductory questions, co-create Korea-introduction content with local youth.</p>
              <p>The point is not producing more content. It is finding where questions recur and building new activities and participation models that address them.</p>
              <p>Question-based study groups, question-based international exchanges, question-based co-created content, question-based civic participation projects &mdash; all are extensions of this role.</p>
              <p>Civil society does not consume questions. It converts them into opportunities for new relationships and participation.</p>
            </>
          )}
        </Prose>
      </DocSection>

      {/* ── 재외동포 ── */}
      <DocSection>
        <Kicker>
          {locale === "ko" ? "재외동포" : "Diaspora"}
        </Kicker>
        <H2>
          {locale === "ko"
            ? "시민사회 내부의 핵심 실행 주체"
            : "Core agents within civil society"}
        </H2>
        <Prose>
          {locale === "ko" ? (
            <>
              <p>질문은 국가별로 다르게 나타난다. 하지만 그 질문이 왜 반복되는지, 어떤 맥락에서 등장하는지는 데이터만으로는 알 수 없다.</p>
              <p>재외동포는 현지 사회를 가장 가까이에서 경험하는 사람들이다. 따라서 재외동포는 시민사회 활동의 단순 참여자가 아니라 핵심 실행 주체가 될 수 있다.</p>
              <p>일본에서 반복되는 사회 질문을 수업과 콘텐츠로 연결하고, 독일에서 반복되는 한국어 질문을 교육 활동으로 연결하고, 브라질에서 반복되는 분단 질문을 지역사회 프로젝트로 연결할 수 있다.</p>
              <p>재외동포의 강점은 한국을 아는 것만이 아니다. 현지 사회도 함께 이해하고 있다는 점이다.</p>
              <p>질문이 발견되는 현장과, 그 질문에 답할 수 있는 한국을 연결하는 역할은 재외동포가 가장 잘 수행할 수 있다.</p>
            </>
          ) : (
            <>
              <p>Questions appear differently by country. But why they recur, and in what context they emerge, cannot be known from data alone.</p>
              <p>The diaspora are the people who experience local society most closely. They can be not just participants in civil society activity, but its core agents.</p>
              <p>Connect recurring society questions in Japan to classes and content. Connect recurring Korean-language questions in Germany to educational activities. Connect recurring division questions in Brazil to community projects.</p>
              <p>The diaspora&apos;s strength is not just knowing Korea. It is understanding the local society as well.</p>
              <p>The role of connecting the site where questions are discovered to the Korea that can answer them &mdash; the diaspora can perform this best.</p>
            </>
          )}
        </Prose>
      </DocSection>

      {/* ── AI ── */}
      <DocSection tint>
        <Kicker>AI</Kicker>
        <H2>
          {locale === "ko"
            ? "질문 데이터를 정보 환경으로 확산"
            : "Extend question data into the information environment"}
        </H2>
        <Prose>
          {locale === "ko" ? (
            <>
              <p>많은 사람들은 한국을 직접 만나기 전에 먼저 검색한다. 그리고 점점 더 많은 사람들은 검색 결과보다 AI의 답변을 먼저 읽는다.</p>
              <p>그렇다면 국가 이미지는 콘텐츠만으로 형성되지 않는다. 검색 데이터, FAQ, 웹 문서, AI가 학습하는 정보 환경 속에서도 형성된다.</p>
              <p>독일에서 반복되는 한국어 질문, 브라질에서 반복되는 분단 질문, 일본에서 반복되는 사회 질문은 단순한 검색어가 아니라 AI 시대의 정보 수요다.</p>
              <p>따라서 질문 데이터는 분석으로 끝나는 것이 아니라, 국가별 질문 데이터셋, 검증된 답변, AI 친화형 정보 자산으로 이어져야 한다.</p>
              <p>AI는 새로운 홍보 채널이 아니다. 한국에 대한 이해가 형성되는 새로운 정보 환경이다.</p>
            </>
          ) : (
            <>
              <p>Many people search before they encounter Korea directly. And increasingly, people read AI answers before search results.</p>
              <p>National image is not formed by content alone. It forms within the information environment &mdash; search data, FAQs, web documents, the materials AI learns from.</p>
              <p>Recurring Korean-language questions in Germany, recurring division questions in Brazil, recurring society questions in Japan &mdash; these are not mere search terms but information demands of the AI era.</p>
              <p>Question data must not end at analysis. It must extend into country-level question datasets, verified answers, and AI-friendly information assets.</p>
              <p>AI is not a new promotional channel. It is the new information environment where understanding of Korea is formed.</p>
            </>
          )}
        </Prose>
      </DocSection>
    </>
  );
}
