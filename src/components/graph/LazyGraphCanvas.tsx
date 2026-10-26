"use client";

import dynamic from "next/dynamic";

import { cn } from "@/lib/utils";

import type { GraphData } from "./types";

// The canvas is purely client-side, so d3-force and the render loop load
// after first paint instead of on the critical path. The wrapper reserves
// the space so nothing shifts when it arrives.
const GraphCanvas = dynamic(() => import("./GraphCanvas"), { ssr: false });

export default function LazyGraphCanvas({
  data,
  className,
}: {
  data: GraphData;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <GraphCanvas data={data} className="absolute inset-0" />
    </div>
  );
}
