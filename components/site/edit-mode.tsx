"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Pencil, X, Move, Type, Download, RotateCcw } from "lucide-react";

type Tool = "select" | "text";

interface ElementEdit {
  selector: string;
  originalText?: string;
  newText?: string;
  tx: number;
  ty: number;
  w: number | null;
}

const STORAGE_KEY = "ask-korea-edit-mode";

function getSelector(el: HTMLElement): string {
  const tag = el.tagName.toLowerCase();
  const parent = el.parentElement;
  if (!parent) return tag;
  const siblings = Array.from(parent.children).filter(
    (c) => c.tagName === el.tagName
  );
  if (siblings.length === 1) {
    const parentSel = parent.id
      ? `#${parent.id}`
      : parent.getAttribute("data-section") || getSelector(parent);
    return `${parentSel} > ${tag}`;
  }
  const idx = siblings.indexOf(el);
  const parentSel = parent.id
    ? `#${parent.id}`
    : parent.getAttribute("data-section") || getSelector(parent);
  return `${parentSel} > ${tag}:nth-of-type(${idx + 1})`;
}

function textFingerprint(el: HTMLElement): string {
  return (el.textContent || "").trim().slice(0, 60);
}

export function EditMode() {
  const [active, setActive] = useState(false);
  const [tool, setTool] = useState<Tool>("select");
  const [selected, setSelected] = useState<HTMLElement | null>(null);
  const [changeCount, setChangeCount] = useState(0);
  const styleEl = useRef<HTMLStyleElement | null>(null);
  const edits = useRef<Map<HTMLElement, ElementEdit>>(new Map());
  const badgeEl = useRef<HTMLDivElement | null>(null);
  const dragState = useRef<{
    type: "move" | "resize-e" | "resize-w" | "resize-se";
    el: HTMLElement;
    startX: number;
    startY: number;
    startTx: number;
    startTy: number;
    startW: number;
  } | null>(null);

  const getEdit = (el: HTMLElement): ElementEdit => {
    if (!edits.current.has(el)) {
      edits.current.set(el, {
        selector: getSelector(el),
        originalText: el.innerHTML,
        tx: 0,
        ty: 0,
        w: null,
      });
    }
    return edits.current.get(el)!;
  };

  const applyTransform = (el: HTMLElement, e: ElementEdit) => {
    el.style.transform =
      e.tx || e.ty ? `translate(${e.tx}px, ${e.ty}px)` : "";
    if (e.w !== null) {
      el.style.width = `${e.w}px`;
      el.style.maxWidth = "none";
    }
  };

  const saveToStorage = useCallback(() => {
    const data: { fingerprint: string; edit: ElementEdit }[] = [];
    edits.current.forEach((edit, el) => {
      const hasTextChange = edit.newText && edit.newText !== edit.originalText;
      const hasTransform = edit.tx !== 0 || edit.ty !== 0 || edit.w !== null;
      if (hasTextChange || hasTransform) {
        data.push({
          fingerprint: textFingerprint(el),
          edit: { ...edit, newText: el.innerHTML },
        });
      }
    });
    if (data.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
    setChangeCount(data.length);
  }, []);

  const loadFromStorage = useCallback(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const data: { fingerprint: string; edit: ElementEdit }[] =
        JSON.parse(raw);
      const targets = document.querySelectorAll<HTMLElement>(
        "main h1, main h2, main h3, main p, main figure, main .container > div"
      );
      let applied = 0;
      const arr = Array.from(targets);
      data.forEach(({ fingerprint, edit }) => {
        const match = arr.find(
          (el) =>
            textFingerprint(el) === fingerprint ||
            getSelector(el) === edit.selector
        );
        if (!match) return;
        if (edit.newText && edit.newText !== edit.originalText) {
          match.innerHTML = edit.newText;
        }
        if (edit.tx || edit.ty || edit.w !== null) {
          applyTransform(match, edit);
        }
        const e = getEdit(match);
        e.tx = edit.tx;
        e.ty = edit.ty;
        e.w = edit.w;
        e.newText = edit.newText;
        applied++;
      });
      setChangeCount(applied);
    } catch {
      /* ignore corrupt data */
    }
  }, []);

  const updateBadge = useCallback((el: HTMLElement | null) => {
    if (!badgeEl.current) return;
    if (!el) {
      badgeEl.current.style.display = "none";
      return;
    }
    const e = getEdit(el);
    const rect = el.getBoundingClientRect();
    const w = Math.round(rect.width);
    const h = Math.round(rect.height);
    const info = [`${w}×${h}`];
    if (e.tx !== 0 || e.ty !== 0)
      info.push(
        `↕${e.ty > 0 ? "+" : ""}${Math.round(e.ty)} ↔${e.tx > 0 ? "+" : ""}${Math.round(e.tx)}`
      );
    badgeEl.current.textContent = info.join("  ");
    badgeEl.current.style.display = "block";
    badgeEl.current.style.left = `${rect.left + window.scrollX}px`;
    badgeEl.current.style.top = `${rect.top + window.scrollY - 24}px`;
  }, []);

  const createHandles = useCallback((el: HTMLElement) => {
    document.querySelectorAll("[data-edit-handle]").forEach((h) => h.remove());
    document.querySelectorAll("[data-edit-outline]").forEach((h) => h.remove());

    const rect = el.getBoundingClientRect();
    const sx = window.scrollX;
    const sy = window.scrollY;

    const outline = document.createElement("div");
    outline.setAttribute("data-edit-outline", "");
    Object.assign(outline.style, {
      position: "absolute",
      left: `${rect.left + sx - 2}px`,
      top: `${rect.top + sy - 2}px`,
      width: `${rect.width + 4}px`,
      height: `${rect.height + 4}px`,
      border: "2px solid rgba(59,130,246,0.8)",
      borderRadius: "4px",
      pointerEvents: "none",
      zIndex: "9990",
    });
    document.body.appendChild(outline);

    const handles: {
      cursor: string;
      type: string;
      x: number;
      y: number;
    }[] = [
      {
        cursor: "ew-resize",
        type: "resize-e",
        x: rect.right + sx,
        y: rect.top + sy + rect.height / 2,
      },
      {
        cursor: "ew-resize",
        type: "resize-w",
        x: rect.left + sx,
        y: rect.top + sy + rect.height / 2,
      },
      {
        cursor: "nwse-resize",
        type: "resize-se",
        x: rect.right + sx,
        y: rect.bottom + sy,
      },
      {
        cursor: "move",
        type: "move",
        x: rect.left + sx + rect.width / 2,
        y: rect.top + sy,
      },
    ];
    handles.forEach(({ cursor, type, x, y }) => {
      const h = document.createElement("div");
      h.setAttribute("data-edit-handle", type);
      const isMoveHandle = type === "move";
      Object.assign(h.style, {
        position: "absolute",
        left: `${x - (isMoveHandle ? 12 : 5)}px`,
        top: `${y - (isMoveHandle ? 12 : 5)}px`,
        width: isMoveHandle ? "24px" : "10px",
        height: isMoveHandle ? "24px" : "10px",
        background: isMoveHandle ? "rgba(59,130,246,0.9)" : "white",
        border: isMoveHandle ? "none" : "2px solid rgba(59,130,246,0.9)",
        borderRadius: isMoveHandle ? "12px" : "2px",
        cursor,
        zIndex: "9991",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      });
      if (isMoveHandle) {
        h.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 9l-3 3 3 3"/><path d="M9 5l3-3 3 3"/><path d="M15 19l-3 3-3-3"/><path d="M19 9l3 3-3 3"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="12" y1="2" x2="12" y2="22"/></svg>`;
      }
      h.addEventListener("mousedown", (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        const e = getEdit(el);
        dragState.current = {
          type: type as "move" | "resize-e" | "resize-w" | "resize-se",
          el,
          startX: ev.clientX,
          startY: ev.clientY,
          startTx: e.tx,
          startTy: e.ty,
          startW: el.getBoundingClientRect().width,
        };
      });
      document.body.appendChild(h);
    });
  }, []);

  const clearHandles = useCallback(() => {
    document.querySelectorAll("[data-edit-handle]").forEach((h) => h.remove());
    document
      .querySelectorAll("[data-edit-outline]")
      .forEach((h) => h.remove());
  }, []);

  const activate = useCallback(() => {
    const s = document.createElement("style");
    s.textContent = `
      [data-editable] { cursor: pointer !important; transition: outline-color 0.15s; }
      [data-editable]:hover {
        outline: 2px dashed rgba(59,130,246,0.4) !important;
        outline-offset: 4px !important; border-radius: 4px !important;
      }
      [data-editable][contenteditable="true"] {
        cursor: text !important;
        outline: 2px solid rgba(59,130,246,1) !important;
        outline-offset: 4px !important;
        background: rgba(59,130,246,0.04) !important;
      }
    `;
    document.head.appendChild(s);
    styleEl.current = s;

    const badge = document.createElement("div");
    Object.assign(badge.style, {
      position: "absolute",
      background: "rgba(59,130,246,0.9)",
      color: "white",
      fontSize: "11px",
      fontFamily: "monospace",
      padding: "2px 6px",
      borderRadius: "3px",
      zIndex: "9992",
      pointerEvents: "none",
      display: "none",
      whiteSpace: "nowrap",
    });
    document.body.appendChild(badge);
    badgeEl.current = badge;

    document
      .querySelectorAll<HTMLElement>(
        "main h1, main h2, main h3, main p, main figure, main .container > div"
      )
      .forEach((el) => el.setAttribute("data-editable", ""));

    setActive(true);
    setTool("select");
  }, []);

  const deactivate = useCallback(() => {
    saveToStorage();
    document.querySelectorAll<HTMLElement>("[data-editable]").forEach((el) => {
      el.removeAttribute("data-editable");
      el.contentEditable = "false";
    });
    clearHandles();
    if (styleEl.current) {
      styleEl.current.remove();
      styleEl.current = null;
    }
    if (badgeEl.current) {
      badgeEl.current.remove();
      badgeEl.current = null;
    }
    setSelected(null);
    setActive(false);
  }, [clearHandles, saveToStorage]);

  const exportChanges = useCallback(() => {
    const changes: string[] = [];
    edits.current.forEach((edit, el) => {
      const hasTextChange = el.innerHTML !== edit.originalText;
      const hasTransform = edit.tx !== 0 || edit.ty !== 0 || edit.w !== null;
      if (!hasTextChange && !hasTransform) return;

      const tag = el.tagName.toLowerCase();
      const preview = (el.textContent || "").trim().slice(0, 50);
      const parts: string[] = [`[${tag}] "${preview}..."`];

      if (hasTextChange) {
        const cleanText = el.innerText.replace(/\n/g, "\\n");
        parts.push(`  텍스트: "${cleanText}"`);
      }
      if (edit.tx !== 0 || edit.ty !== 0)
        parts.push(`  이동: x=${Math.round(edit.tx)}px, y=${Math.round(edit.ty)}px`);
      if (edit.w !== null) parts.push(`  너비: ${Math.round(edit.w)}px`);

      changes.push(parts.join("\n"));
    });

    if (changes.length === 0) {
      alert("변경사항이 없습니다.");
      return;
    }
    const text = "=== Edit Mode 변경사항 ===\n\n" + changes.join("\n\n");
    navigator.clipboard.writeText(text).then(() =>
      alert(`${changes.length}개 변경사항이 클립보드에 복사되었습니다.`)
    );
  }, []);

  const resetAll = useCallback(() => {
    edits.current.forEach((edit, el) => {
      if (edit.originalText) el.innerHTML = edit.originalText;
      el.style.transform = "";
      el.style.width = "";
      el.style.maxWidth = "";
    });
    edits.current.clear();
    localStorage.removeItem(STORAGE_KEY);
    clearHandles();
    updateBadge(null);
    setSelected(null);
    setChangeCount(0);
  }, [clearHandles, updateBadge]);

  // Apply saved edits on mount
  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  useEffect(() => {
    if (!active) return;
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-edit-handle]")) return;
      if (target.closest(".edit-mode-ui")) return;

      const editable = target.closest(
        "[data-editable]"
      ) as HTMLElement | null;

      if (!editable) {
        if (selected) {
          selected.contentEditable = "false";
          clearHandles();
          updateBadge(null);
          setSelected(null);
          saveToStorage();
        }
        return;
      }

      if (tool === "text") {
        editable.contentEditable = "true";
        editable.spellcheck = false;
        editable.focus();
        clearHandles();
        setSelected(editable);
        updateBadge(editable);
        return;
      }

      if (selected && selected !== editable) {
        selected.contentEditable = "false";
        saveToStorage();
      }
      setSelected(editable);
      createHandles(editable);
      updateBadge(editable);
    };

    const onDblClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const editable = target.closest(
        "[data-editable]"
      ) as HTMLElement | null;
      if (!editable) return;
      editable.contentEditable = "true";
      editable.spellcheck = false;
      editable.focus();
      clearHandles();
      setSelected(editable);
      updateBadge(editable);
      getEdit(editable);
    };

    const onMouseMove = (e: MouseEvent) => {
      const ds = dragState.current;
      if (!ds) return;
      e.preventDefault();
      const dx = e.clientX - ds.startX;
      const dy = e.clientY - ds.startY;
      const edit = getEdit(ds.el);

      if (ds.type === "move") {
        edit.tx = ds.startTx + dx;
        edit.ty = ds.startTy + dy;
      } else if (ds.type === "resize-e") {
        edit.w = Math.max(100, ds.startW + dx);
      } else if (ds.type === "resize-w") {
        edit.w = Math.max(100, ds.startW - dx);
        edit.tx = ds.startTx + dx;
      } else if (ds.type === "resize-se") {
        edit.w = Math.max(100, ds.startW + dx);
      }

      applyTransform(ds.el, edit);
      clearHandles();
      createHandles(ds.el);
      updateBadge(ds.el);
    };

    const onMouseUp = () => {
      if (dragState.current) {
        saveToStorage();
      }
      dragState.current = null;
    };

    const onScroll = () => {
      if (selected && !dragState.current) {
        clearHandles();
        createHandles(selected);
        updateBadge(selected);
      }
    };

    const onInput = () => {
      saveToStorage();
    };

    document.addEventListener("click", onClick);
    document.addEventListener("dblclick", onDblClick);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("input", onInput);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("dblclick", onDblClick);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("input", onInput);
      window.removeEventListener("scroll", onScroll);
    };
  }, [
    active,
    tool,
    selected,
    clearHandles,
    createHandles,
    updateBadge,
    saveToStorage,
  ]);

  return (
    <>
      {/* toggle + action buttons */}
      <div className="edit-mode-ui fixed bottom-6 right-6 z-[9999] flex items-center gap-2">
        {active && (
          <>
            <button
              onClick={exportChanges}
              className="flex items-center gap-1.5 rounded-full bg-white px-3 py-2.5 text-xs font-semibold text-navy shadow-lg ring-1 ring-border transition-colors hover:ring-brand"
              title="변경사항 클립보드 복사"
            >
              <Download className="h-3.5 w-3.5" />
              변경사항 복사
              {changeCount > 0 && (
                <span className="ml-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1.5 text-[10px] font-bold text-white">
                  {changeCount}
                </span>
              )}
            </button>
            <button
              onClick={resetAll}
              className="flex items-center gap-1.5 rounded-full bg-white px-3 py-2.5 text-xs font-semibold text-red-600 shadow-lg ring-1 ring-border transition-colors hover:ring-red-400"
              title="모든 변경사항 초기화"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              초기화
            </button>
          </>
        )}
        <button
          onClick={active ? deactivate : activate}
          className={
            "flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold shadow-lg transition-all " +
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
      </div>

      {/* toolbar + guide */}
      {active && (
        <div className="edit-mode-ui fixed bottom-6 left-6 z-[9999] flex flex-col gap-3">
          <div className="flex gap-1 rounded-xl border border-border bg-white/95 p-1.5 shadow-lg backdrop-blur">
            <button
              onClick={() => {
                setTool("select");
                if (selected) selected.contentEditable = "false";
              }}
              className={
                "flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-colors " +
                (tool === "select"
                  ? "bg-brand text-white"
                  : "text-secondary hover:bg-tint")
              }
            >
              <Move className="h-3.5 w-3.5" />
              선택/이동
            </button>
            <button
              onClick={() => setTool("text")}
              className={
                "flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-colors " +
                (tool === "text"
                  ? "bg-brand text-white"
                  : "text-secondary hover:bg-tint")
              }
            >
              <Type className="h-3.5 w-3.5" />
              텍스트
            </button>
          </div>

          <div className="rounded-xl border border-border bg-white/95 p-3.5 text-[11px] leading-relaxed text-secondary shadow-lg backdrop-blur">
            <div className="mb-1.5 text-xs font-semibold text-navy">
              {tool === "select" ? "선택/이동 모드" : "텍스트 모드"}
            </div>
            {tool === "select" ? (
              <ul className="space-y-1">
                <li>• 클릭 = 선택 (핸들 표시)</li>
                <li>
                  •{" "}
                  <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 align-middle">
                    <Move className="h-2.5 w-2.5 text-white" />
                  </span>{" "}
                  드래그 = 이동
                </li>
                <li>
                  •{" "}
                  <span className="inline-block h-2.5 w-2.5 border-2 border-blue-500 bg-white align-middle" />{" "}
                  드래그 = 크기 조절
                </li>
                <li>• 더블클릭 = 텍스트 수정</li>
              </ul>
            ) : (
              <ul className="space-y-1">
                <li>• 클릭 = 바로 텍스트 수정</li>
                <li>
                  •{" "}
                  <kbd className="rounded border border-border bg-tint px-1 font-mono">
                    Enter
                  </kbd>{" "}
                  = 줄바꿈
                </li>
              </ul>
            )}
            <div className="mt-2 border-t border-border pt-2 text-[10px] text-muted-foreground">
              수정사항은 자동 저장됩니다 (F5 유지)
            </div>
          </div>
        </div>
      )}
    </>
  );
}
