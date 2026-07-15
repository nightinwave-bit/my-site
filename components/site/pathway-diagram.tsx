"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/lib/i18n";
import type { Pathway, OntologyNode } from "@/lib/ontology";
import { getNode } from "@/lib/ontology";
import { NodeChip } from "./node-chip";

const EASE = [0.22, 1, 0.36, 1] as const;
const STEP = 0.5; // seconds between successive node reveals

function Connector({
  verb,
  delay,
  animate,
}: {
  verb?: string;
  delay: number;
  animate: boolean;
}) {
  return (
    <div className="relative flex items-stretch pl-5 sm:pl-6" aria-hidden>
      {/* vertical line */}
      <div className="relative flex w-6 justify-center">
        <motion.span
          className="w-px bg-border-strong"
          style={{ transformOrigin: "top" }}
          initial={animate ? { scaleY: 0 } : false}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.4, ease: EASE, delay }}
        />
      </div>
      {/* verb label */}
      {verb && (
        <motion.div
          className="flex items-center py-2"
          initial={animate ? { opacity: 0, x: -4 } : false}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: EASE, delay: delay + 0.2 }}
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            {verb}
          </span>
        </motion.div>
      )}
    </div>
  );
}

export function PathwayDiagram({
  pathway,
  animate = true,
  onNodeClick,
  activeNodeId,
  className,
}: {
  pathway: Pathway;
  animate?: boolean;
  onNodeClick?: (node: OntologyNode) => void;
  activeNodeId?: string;
  className?: string;
}) {
  const { locale } = useLanguage();
  const reduce = useReducedMotion();
  const doAnimate = animate && !reduce;

  return (
    <div className={className}>
      <ol className="list-none" aria-label="question pathway">
        {pathway.steps.map((step, i) => {
          const node = getNode(step.nodeId);
          const delay = i * STEP;
          return (
            <li key={`${pathway.id}-${step.nodeId}-${i}`}>
              {i > 0 && (
                <Connector
                  verb={step.verb?.[locale]}
                  delay={delay - STEP + 0.25}
                  animate={doAnimate}
                />
              )}
              <motion.div
                initial={doAnimate ? { opacity: 0, y: 8 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay }}
              >
                <NodeChip
                  node={node}
                  onClick={onNodeClick}
                  active={activeNodeId === node.id}
                  interactive={!!onNodeClick}
                />
              </motion.div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
