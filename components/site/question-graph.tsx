"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { useLanguage } from "@/lib/i18n";

type NodeSeed = {
  ko: string;
  en: string;
  hue: number;
  hub?: boolean;
};

// Short, punchy questions curated for the hero visualization.
const SEEDS: NodeSeed[] = [
  { ko: "한국", en: "Korea", hue: 14, hub: true },
  { ko: "김치는 왜 발효시키죠?", en: "Why ferment kimchi?", hue: 14 },
  { ko: "한글은 배우기 쉬운가요?", en: "Is Hangul easy?", hue: 210 },
  { ko: "K-팝 데뷔 과정은?", en: "How do idols debut?", hue: 280 },
  { ko: "한국은 안전한가요?", en: "Is Korea safe?", hue: 160 },
  { ko: "언제 방문하기 좋죠?", en: "Best time to visit?", hue: 190 },
  { ko: "인터넷이 왜 빠르죠?", en: "Why so fast online?", hue: 250 },
  { ko: "남북은 왜 분단됐나요?", en: "Why is Korea divided?", hue: 32 },
  { ko: "재벌이 뭐예요?", en: "What is a chaebol?", hue: 45 },
  { ko: "수능은 얼마나 중요?", en: "How big is Suneung?", hue: 120 },
  { ko: "한국식 치킨의 비결?", en: "Why K-chicken crisp?", hue: 14 },
  { ko: "존댓말은 어떻게?", en: "How do honorifics work?", hue: 210 },
  { ko: "한복은 언제 입죠?", en: "When to wear hanbok?", hue: 280 },
  { ko: "배달은 왜 이렇게 빨라요?", en: "Why is delivery instant?", hue: 160 },
  { ko: "서울 필수 코스는?", en: "Must-sees in Seoul?", hue: 190 },
  { ko: "소프트파워란?", en: "What is soft power?", hue: 340 },
];

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hue: number;
  hub: boolean;
  phase: number;
  seed: NodeSeed;
};

export function QuestionGraph() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const { locale } = useLanguage();

  const localeRef = React.useRef(locale);
  const darkRef = React.useRef(true);
  localeRef.current = locale;
  darkRef.current = resolvedTheme !== "light";

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let nodes: Node[] = [];
    const edges: Array<[number, number]> = [];

    function layout() {
      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(width, height) * 0.36;
      nodes = SEEDS.map((seed, i) => {
        if (seed.hub) {
          return {
            x: cx,
            y: cy,
            vx: 0,
            vy: 0,
            r: 0,
            hue: seed.hue,
            hub: true,
            phase: 0,
            seed,
          };
        }
        const count = SEEDS.length - 1;
        const angle = ((i - 1) / count) * Math.PI * 2 - Math.PI / 2;
        const jitter = 0.72 + ((i * 37) % 100) / 300;
        return {
          x: cx + Math.cos(angle) * radius * jitter,
          y: cy + Math.sin(angle) * radius * jitter,
          vx: 0,
          vy: 0,
          r: 3.5 + ((i * 13) % 5) * 0.7,
          hue: seed.hue,
          hub: false,
          phase: i * 1.7,
          seed,
        };
      });

      edges.length = 0;
      // Star: every question connects to the Korea hub.
      for (let i = 1; i < nodes.length; i++) edges.push([0, i]);
      // A few chords between neighbours for a networked, alive feel.
      for (let i = 1; i < nodes.length; i++) {
        const j = ((i + 2) % (nodes.length - 1)) + 1;
        if (i !== j) edges.push([i, j]);
      }
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (nodes.length === 0) layout();
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    // Pointer interaction
    const pointer = { x: -9999, y: -9999, active: false };
    let dragging: Node | null = null;
    let hovered: Node | null = null;

    function toLocal(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }
    function nearest(x: number, y: number, max: number) {
      let best: Node | null = null;
      let bestD = max * max;
      for (const n of nodes) {
        const d = (n.x - x) ** 2 + (n.y - y) ** 2;
        if (d < bestD) {
          bestD = d;
          best = n;
        }
      }
      return best;
    }
    const onMove = (e: PointerEvent) => {
      const p = toLocal(e);
      pointer.x = p.x;
      pointer.y = p.y;
      if (dragging) {
        dragging.x = p.x;
        dragging.y = p.y;
        dragging.vx = 0;
        dragging.vy = 0;
      } else {
        hovered = nearest(p.x, p.y, 46);
        canvas!.style.cursor = hovered ? "grab" : "default";
      }
    };
    const onDown = (e: PointerEvent) => {
      const p = toLocal(e);
      dragging = nearest(p.x, p.y, 46);
      if (dragging) {
        canvas!.style.cursor = "grabbing";
        canvas!.setPointerCapture(e.pointerId);
      }
    };
    const onUp = () => {
      dragging = null;
      canvas!.style.cursor = hovered ? "grab" : "default";
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
      hovered = null;
    };
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointerleave", onLeave);

    let raf = 0;
    let t = 0;

    function step() {
      t += 1;
      const cx = width / 2;
      const cy = height / 2;
      const dark = darkRef.current;

      // Physics
      if (!reduceMotion) {
        for (let i = 0; i < nodes.length; i++) {
          const a = nodes[i];
          if (a.hub) continue;
          // Repulsion
          for (let j = 0; j < nodes.length; j++) {
            if (i === j) continue;
            const b = nodes[j];
            let dx = a.x - b.x;
            let dy = a.y - b.y;
            let d2 = dx * dx + dy * dy;
            if (d2 < 1) d2 = 1;
            const force = (b.hub ? 1400 : 900) / d2;
            const d = Math.sqrt(d2);
            a.vx += (dx / d) * force * 0.016;
            a.vy += (dy / d) * force * 0.016;
          }
          // Gentle orbital drift
          a.vx += Math.cos(t * 0.006 + a.phase) * 0.02;
          a.vy += Math.sin(t * 0.006 + a.phase) * 0.02;
          // Centering
          a.vx += (cx - a.x) * 0.0016;
          a.vy += (cy - a.y) * 0.0016;
          // Pointer repulsion for playful interactivity
          const pdx = a.x - pointer.x;
          const pdy = a.y - pointer.y;
          const pd2 = pdx * pdx + pdy * pdy;
          if (pd2 < 120 * 120 && a !== dragging) {
            const pd = Math.sqrt(pd2) || 1;
            const f = (1 - pd / 120) * 1.6;
            a.vx += (pdx / pd) * f;
            a.vy += (pdy / pd) * f;
          }
        }
        // Spring along edges
        for (const [i, j] of edges) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const d = Math.sqrt(dx * dx + dy * dy) || 1;
          const rest = a.hub || b.hub ? Math.min(width, height) * 0.34 : 130;
          const k = (d - rest) * 0.0009;
          if (!a.hub) {
            a.vx += (dx / d) * k * (b.hub ? 1 : 0.5);
            a.vy += (dy / d) * k * (b.hub ? 1 : 0.5);
          }
          if (!b.hub) {
            b.vx -= (dx / d) * k * (a.hub ? 1 : 0.5);
            b.vy -= (dy / d) * k * (a.hub ? 1 : 0.5);
          }
        }
        // Integrate
        for (const n of nodes) {
          if (n.hub || n === dragging) continue;
          n.vx *= 0.9;
          n.vy *= 0.9;
          const max = 2.2;
          n.vx = Math.max(-max, Math.min(max, n.vx));
          n.vy = Math.max(-max, Math.min(max, n.vy));
          n.x += n.vx;
          n.y += n.vy;
          const m = 28;
          n.x = Math.max(m, Math.min(width - m, n.x));
          n.y = Math.max(m, Math.min(height - m, n.y));
        }
      }

      draw(dark);
      raf = requestAnimationFrame(step);
    }

    function draw(dark: boolean) {
      ctx!.clearRect(0, 0, width, height);
      const lang = localeRef.current;
      const hub = nodes[0];

      // Edges
      for (const [i, j] of edges) {
        const a = nodes[i];
        const b = nodes[j];
        const isHubEdge = a.hub || b.hub;
        const active =
          hovered && (a === hovered || b === hovered || hovered.hub);
        const grad = ctx!.createLinearGradient(a.x, a.y, b.x, b.y);
        const alpha = active ? 0.5 : isHubEdge ? 0.16 : 0.1;
        grad.addColorStop(0, `hsla(${a.hue}, 70%, ${dark ? 65 : 45}%, ${alpha})`);
        grad.addColorStop(1, `hsla(${b.hue}, 70%, ${dark ? 65 : 45}%, ${alpha})`);
        ctx!.strokeStyle = grad;
        ctx!.lineWidth = active ? 1.4 : 0.8;
        ctx!.beginPath();
        ctx!.moveTo(a.x, a.y);
        ctx!.lineTo(b.x, b.y);
        ctx!.stroke();
      }

      // Question nodes
      ctx!.textAlign = "center";
      ctx!.textBaseline = "middle";
      for (let i = 1; i < nodes.length; i++) {
        const n = nodes[i];
        const active = hovered === n;
        const light = dark ? 68 : 48;

        // glow
        const glow = ctx!.createRadialGradient(n.x, n.y, 0, n.x, n.y, 22);
        glow.addColorStop(0, `hsla(${n.hue}, 80%, ${light}%, ${active ? 0.5 : 0.28})`);
        glow.addColorStop(1, `hsla(${n.hue}, 80%, ${light}%, 0)`);
        ctx!.fillStyle = glow;
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, 22, 0, Math.PI * 2);
        ctx!.fill();

        // dot
        ctx!.fillStyle = `hsl(${n.hue}, 78%, ${light}%)`;
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, active ? n.r + 1.5 : n.r, 0, Math.PI * 2);
        ctx!.fill();

        // label
        const label = lang === "ko" ? n.seed.ko : n.seed.en;
        ctx!.font = `${active ? 600 : 500} ${
          active ? 13 : 12
        }px Inter, "Pretendard Variable", system-ui, sans-serif`;
        const textAlpha = active ? 1 : 0.62;
        ctx!.fillStyle = dark
          ? `hsla(40, 20%, 94%, ${textAlpha})`
          : `hsla(24, 12%, 14%, ${textAlpha})`;
        ctx!.fillText(label, n.x, n.y - (n.r + 12));
      }

      // Hub node — "Korea?"
      if (hub) {
        const light = dark ? 62 : 50;
        const pulse = 1 + Math.sin(t * 0.03) * 0.06;
        const glow = ctx!.createRadialGradient(
          hub.x,
          hub.y,
          0,
          hub.x,
          hub.y,
          70 * pulse
        );
        glow.addColorStop(0, `hsla(14, 82%, ${light}%, 0.35)`);
        glow.addColorStop(1, "hsla(14, 82%, 60%, 0)");
        ctx!.fillStyle = glow;
        ctx!.beginPath();
        ctx!.arc(hub.x, hub.y, 70 * pulse, 0, Math.PI * 2);
        ctx!.fill();

        ctx!.fillStyle = `hsl(14, 82%, ${light}%)`;
        ctx!.beginPath();
        ctx!.arc(hub.x, hub.y, 8, 0, Math.PI * 2);
        ctx!.fill();

        const label = lang === "ko" ? "한국?" : "Korea?";
        ctx!.font = `700 24px "Pretendard Variable", Inter, system-ui, sans-serif`;
        ctx!.fillStyle = dark ? "hsl(40, 24%, 96%)" : "hsl(24, 12%, 10%)";
        ctx!.fillText(label, hub.x, hub.y - 26);
      }
    }

    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full touch-none select-none"
      aria-hidden
    />
  );
}
