"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Pencil, X, Copy, Check } from "lucide-react";

export function EditMode() {
  const [active, setActive] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const originalMap = useRef<Map<HTMLElement, string>>(new Map());
  const styleEl = useRef<HTMLStyleElement | null>(null);

  const activate = useCallback(() => {
    const targets = document.querySelectorAll<HTMLElement>(
      "main h1, main h2, main h3, main p"
    );
    targets.forEach((el) => {
      if (!originalMap.current.has(el)) {
        originalMap.current.set(el, el.innerHTML);
      }
      el.contentEditable = "true";
      el.spellcheck = false;
    });

    if (!styleEl.current) {
      const s = document.createElement("style");
      s.textContent = `
        [contenteditable="true"] {
          outline: 2px dashed rgba(59,130,246,0.5) !important;
          outline-offset: 4px !important;
          border-radius: 4px !important;
          cursor: text !important;
          transition: outline-color 0.15s;
        }
        [contenteditable="true"]:focus {
          outline-color: rgba(59,130,246,1) !important;
          background: rgba(59,130,246,0.04) !important;
        }
        [contenteditable="true"]:hover {
          outline-color: rgba(59,130,246,0.8) !important;
        }
      `;
      document.head.appendChild(s);
      styleEl.current = s;
    }
    setActive(true);
  }, []);

  const deactivate = useCallback(() => {
    const targets = document.querySelectorAll<HTMLElement>(
      '[contenteditable="true"]'
    );
    targets.forEach((el) => {
      el.contentEditable = "false";
    });
    if (styleEl.current) {
      styleEl.current.remove();
      styleEl.current = null;
    }
    originalMap.current.clear();
    setActive(false);
  }, []);

  const handleCopyText = useCallback((el: HTMLElement) => {
    const text = el.innerText;
    navigator.clipboard.writeText(text).then(() => {
      const id = Math.random().toString();
      setCopied(id);
      setTimeout(() => setCopied((c) => (c === id ? null : c)), 1500);
    });
  }, []);

  useEffect(() => {
    if (!active) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const editable = target.closest('[contenteditable="true"]') as HTMLElement | null;
      if (!editable) return;
      if ((e.metaKey || e.ctrlKey) && e.shiftKey) {
        e.preventDefault();
        handleCopyText(editable);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [active, handleCopyText]);

  return (
    <>
      <button
        onClick={active ? deactivate : activate}
        className={
          "fixed bottom-6 right-6 z-[9999] flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold shadow-lg transition-all " +
          (active
            ? "bg-red-500 text-white hover:bg-red-600"
            : "bg-brand text-white hover:bg-brand-hi")
        }
      >
        {active ? (
          <>
            <X className="h-4 w-4" />
            편집 종료
          </>
        ) : (
          <>
            <Pencil className="h-4 w-4" />
            Edit Mode
          </>
        )}
      </button>

      {active && (
        <div className="fixed bottom-6 left-6 z-[9999] max-w-xs rounded-xl border border-border bg-white/95 p-4 text-xs leading-relaxed text-secondary shadow-lg backdrop-blur">
          <div className="mb-1.5 font-semibold text-navy">편집 모드 ON</div>
          <ul className="space-y-1 text-[11px]">
            <li>• 파란 점선 영역을 클릭하면 직접 수정</li>
            <li>• <kbd className="rounded border border-border bg-tint px-1 font-mono">Enter</kbd> = 줄바꿈</li>
            <li>• <kbd className="rounded border border-border bg-tint px-1 font-mono">⌘⇧+클릭</kbd> = 텍스트 복사</li>
          </ul>
          {copied && (
            <div className="mt-2 flex items-center gap-1 text-green-600">
              <Check className="h-3 w-3" /> 복사됨
            </div>
          )}
        </div>
      )}
    </>
  );
}
