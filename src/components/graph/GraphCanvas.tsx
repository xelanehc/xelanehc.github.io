"use client";

import {
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  forceX,
  forceY,
  type ForceLink,
  type SimulationLinkDatum,
  type SimulationNodeDatum,
} from "d3-force";
import { useReducedMotion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

import type { GraphData, GraphNode, GraphNodeKind } from "./types";

type SimNode = GraphNode & SimulationNodeDatum & { r: number; phase: number };
type SimLink = SimulationLinkDatum<SimNode>;

const RADIUS: Record<GraphNodeKind, number> = {
  center: 9,
  area: 6,
  experience: 4.5,
  project: 4,
  publication: 4.5,
};

/** Below this container width, only center, areas, and essential nodes render. */
const SMALL_WIDTH = 480;
/** Extra hit area around a node for hover/tap. */
const HIT_SLOP = 8;

type Palette = {
  foreground: string;
  muted: string;
  background: string;
  node: string;
  active: string;
  edge: string;
  font: string;
};

function readPalette(el: Element): Palette {
  const style = getComputedStyle(el);
  const get = (name: string) => style.getPropertyValue(name).trim();
  return {
    foreground: get("--foreground"),
    muted: get("--muted-foreground"),
    background: get("--popover"),
    node: get("--graph-node"),
    active: get("--graph-node-active"),
    edge: get("--graph-edge"),
    font: get("--font-geist-mono") || "ui-monospace, monospace",
  };
}

export default function GraphCanvas({
  data,
  className,
}: {
  data: GraphData;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();
  const router = useRouter();
  const routerRef = useRef(router);

  useEffect(() => {
    routerRef.current = router;
  }, [router]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!container || !canvas || !ctx) return;

    const reduced = Boolean(reducedMotion);
    let width = container.clientWidth;
    let height = container.clientHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let scale = Math.min(width, height) / 400;
    let palette = readPalette(canvas);
    let time = 0;

    // --- Graph ---------------------------------------------------------
    const small = width < SMALL_WIDTH;
    const kept = data.nodes.filter(
      (n) => !small || n.kind === "center" || n.kind === "area" || n.essential,
    );
    const ids = new Set(kept.map((n) => n.id));
    const nodes: SimNode[] = kept.map((n, i) => ({
      ...n,
      r: RADIUS[n.kind],
      phase: i * 1.7,
      // Start clustered at the center so the graph "blooms" outward.
      x: (Math.random() - 0.5) * 20,
      y: (Math.random() - 0.5) * 20,
    }));
    const links: SimLink[] = data.edges
      .filter((e) => ids.has(e.source) && ids.has(e.target))
      .map((e) => ({ ...e }));

    const neighbors = new Map<string, Set<string>>();
    for (const { source, target } of data.edges) {
      if (!ids.has(source) || !ids.has(target)) continue;
      if (!neighbors.has(source)) neighbors.set(source, new Set());
      if (!neighbors.has(target)) neighbors.set(target, new Set());
      neighbors.get(source)!.add(target);
      neighbors.get(target)!.add(source);
    }

    const center = nodes.find((n) => n.kind === "center");
    if (center) {
      center.fx = 0;
      center.fy = 0;
    }

    // --- Interaction state --------------------------------------------
    const pointer = { x: 0, y: 0, active: false };
    let hovered: SimNode | null = null;
    let dragged: SimNode | null = null;
    let dragMoved = false;
    let touchArmed: SimNode | null = null;

    // --- Forces ----------------------------------------------------------
    const linkDistance = (link: SimLink) => {
      const s = link.source as SimNode;
      const t = link.target as SimNode;
      if (s.kind === "center" || t.kind === "center") return 115 * scale;
      if (s.kind === "publication" || t.kind === "publication")
        return 38 * scale;
      return 68 * scale;
    };

    /** Bounded, periodic wobble so the graph feels alive without wandering. */
    const drift = () => {
      if (reduced) return;
      for (const n of nodes) {
        if (n.fx != null) continue;
        n.vx! += Math.cos(time * 0.0007 + n.phase) * 0.018;
        n.vy! += Math.sin(time * 0.0009 + n.phase * 1.3) * 0.018;
      }
    };

    /** Nodes near the cursor ease away, except the one under it. */
    const repel = () => {
      if (!pointer.active || reduced) return;
      const radius = 90 * scale;
      for (const n of nodes) {
        if (n.fx != null) continue;
        const dx = n.x! - pointer.x;
        const dy = n.y! - pointer.y;
        const dist = Math.hypot(dx, dy);
        if (dist < n.r + HIT_SLOP + 6 || dist > radius) continue;
        const force = (1 - dist / radius) * 0.15;
        n.vx! += (dx / dist) * force;
        n.vy! += (dy / dist) * force;
      }
    };

    /** Keep nodes (and area labels) inside the canvas. */
    const bounds = () => {
      const padX = 48;
      const padY = 20;
      for (const n of nodes) {
        const maxX = width / 2 - padX;
        const maxY = height / 2 - padY - (n.kind === "area" ? 14 : 0);
        n.x = Math.max(-maxX, Math.min(maxX, n.x!));
        n.y = Math.max(-height / 2 + padY, Math.min(maxY, n.y!));
      }
    };

    const simulation = forceSimulation<SimNode>(nodes)
      .force(
        "link",
        forceLink<SimNode, SimLink>(links)
          .id((d) => d.id)
          .distance(linkDistance)
          .strength(0.55),
      )
      .force(
        "charge",
        forceManyBody<SimNode>().strength((d) =>
          d.kind === "area" ? -320 * scale : -140 * scale,
        ),
      )
      .force(
        "collide",
        // Areas carry a text label underneath, so they need more room.
        forceCollide<SimNode>((d) => d.r + (d.kind === "area" ? 40 : 10)),
      )
      .force("x", forceX(0).strength(0.02))
      .force("y", forceY(0).strength(0.045))
      .force("drift", drift)
      .force("repel", repel)
      .force("bounds", bounds)
      .alphaDecay(0.03)
      .alphaTarget(reduced ? 0 : 0.008)
      .stop();

    // --- Rendering ------------------------------------------------------
    const resize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      scale = Math.min(width, height) / 400;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      simulation
        .force<ForceLink<SimNode, SimLink>>("link")
        ?.distance(linkDistance);
    };

    const drawLabel = (n: SimNode) => {
      const title = n.label;
      const hint = n.hint && n.hint !== n.label ? n.hint : undefined;
      ctx.font = `500 12px ${palette.font}`;
      const titleWidth = ctx.measureText(title).width;
      ctx.font = `400 11px ${palette.font}`;
      const hintWidth = hint ? ctx.measureText(hint).width : 0;
      const boxW = Math.max(titleWidth, hintWidth) + 20;
      const boxH = hint ? 40 : 26;
      let bx = n.x! - boxW / 2;
      let by = n.y! - n.r - 10 - boxH;
      if (by < -height / 2 + 4) by = n.y! + n.r + 10; // flip below near the top
      bx = Math.max(-width / 2 + 4, Math.min(width / 2 - boxW - 4, bx));

      ctx.globalAlpha = 1;
      ctx.fillStyle = palette.background;
      ctx.strokeStyle = palette.edge;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(bx, by, boxW, boxH, 8);
      ctx.fill();
      ctx.stroke();

      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillStyle = palette.foreground;
      ctx.font = `500 12px ${palette.font}`;
      ctx.fillText(title, bx + 10, by + 7);
      if (hint) {
        ctx.fillStyle = palette.muted;
        ctx.font = `400 11px ${palette.font}`;
        ctx.fillText(hint, bx + 10, by + 23);
      }
    };

    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      ctx.translate(width / 2, height / 2);

      const focus = hovered;
      const near = focus ? neighbors.get(focus.id) : undefined;
      const isLit = (n: SimNode) => n === focus || Boolean(near?.has(n.id));

      // Edges
      for (const link of links) {
        const s = link.source as SimNode;
        const t = link.target as SimNode;
        const lit = focus != null && (s === focus || t === focus);
        ctx.globalAlpha = focus && !lit ? 0.45 : 1;
        ctx.strokeStyle = lit ? palette.active : palette.edge;
        ctx.lineWidth = lit ? 1.5 : 1;
        ctx.beginPath();
        ctx.moveTo(s.x!, s.y!);
        ctx.lineTo(t.x!, t.y!);
        ctx.stroke();
      }

      // Nodes
      for (const n of nodes) {
        const dim = focus != null && !isLit(n);
        ctx.globalAlpha = dim ? 0.3 : 1;

        if (n.kind === "center") {
          const pulse = reduced ? 0 : Math.sin(time * 0.002) * 1.5;
          ctx.strokeStyle = palette.node;
          ctx.globalAlpha = dim ? 0.15 : 0.35;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(n.x!, n.y!, n.r + 6 + pulse, 0, Math.PI * 2);
          ctx.stroke();
          ctx.globalAlpha = dim ? 0.3 : 1;
        }

        ctx.fillStyle =
          n === focus || (focus && isLit(n) && n.kind !== "area")
            ? palette.active
            : n.kind === "center"
              ? palette.foreground
              : n.kind === "area"
                ? palette.node
                : palette.muted;
        ctx.beginPath();
        ctx.arc(n.x!, n.y!, n === focus ? n.r + 1.5 : n.r, 0, Math.PI * 2);
        ctx.fill();

        // Area names are always visible; everything else labels on hover.
        if (n.kind === "area" && n !== focus) {
          ctx.font = `400 11px ${palette.font}`;
          ctx.textAlign = "center";
          ctx.textBaseline = "top";
          ctx.fillStyle = palette.muted;
          ctx.fillText(n.label, n.x!, n.y! + n.r + 6);
        }
      }

      if (focus) drawLabel(focus);
      ctx.globalAlpha = 1;
    };

    // --- Loop -----------------------------------------------------------
    let frame = 0;
    let running = false;
    let inView = true;

    const loop = (now: number) => {
      time = now;
      simulation.tick();
      draw();
      frame = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduced || !inView || document.hidden) return;
      running = true;
      frame = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };
    /** In reduced-motion mode nothing animates; redraw on demand instead. */
    const redraw = () => {
      if (!running) draw();
    };

    // --- Pointer --------------------------------------------------------
    const toLocal = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: event.clientX - rect.left - width / 2,
        y: event.clientY - rect.top - height / 2,
      };
    };

    const hitTest = (x: number, y: number) => {
      let best: SimNode | null = null;
      let bestDist = Infinity;
      for (const n of nodes) {
        const dist = Math.hypot(n.x! - x, n.y! - y);
        if (dist < n.r + HIT_SLOP && dist < bestDist) {
          best = n;
          bestDist = dist;
        }
      }
      return best;
    };

    const setHovered = (node: SimNode | null) => {
      if (node === hovered) return;
      // Release the previous node unless it's the pinned center or being dragged.
      if (hovered && hovered !== center && hovered !== dragged) {
        hovered.fx = null;
        hovered.fy = null;
      }
      hovered = node;
      // Freeze the hovered node so it doesn't drift out from under the cursor.
      if (node && node !== center) {
        node.fx = node.x;
        node.fy = node.y;
      }
      canvas.style.cursor = node?.href ? "pointer" : node ? "grab" : "default";
      redraw();
    };

    const onPointerMove = (event: PointerEvent) => {
      const { x, y } = toLocal(event);
      pointer.x = x;
      pointer.y = y;
      pointer.active = event.pointerType === "mouse";
      if (dragged) {
        dragged.fx = x;
        dragged.fy = y;
        dragMoved = true;
        simulation.alpha(Math.max(simulation.alpha(), 0.15));
        return;
      }
      if (event.pointerType === "mouse") setHovered(hitTest(x, y));
    };

    const onPointerLeave = () => {
      pointer.active = false;
      if (!dragged) setHovered(null);
    };

    const onPointerDown = (event: PointerEvent) => {
      const { x, y } = toLocal(event);
      const node = hitTest(x, y);
      if (event.pointerType !== "mouse") {
        // Touch: first tap shows the label, second tap on the same node opens it.
        if (node && node === touchArmed && node.href) {
          routerRef.current.push(node.href);
        }
        touchArmed = node;
        setHovered(node);
        return;
      }
      if (node && !reduced && node !== center) {
        dragged = node;
        dragMoved = false;
        canvas.setPointerCapture(event.pointerId);
        canvas.style.cursor = "grabbing";
      } else if (node?.href) {
        routerRef.current.push(node.href);
      }
    };

    const onPointerUp = (event: PointerEvent) => {
      if (!dragged) return;
      const node = dragged;
      dragged = null;
      if (canvas.hasPointerCapture(event.pointerId)) {
        canvas.releasePointerCapture(event.pointerId);
      }
      if (!dragMoved && node.href) {
        routerRef.current.push(node.href);
        return;
      }
      // Dropped: stays pinned while hovered, released on hover-out.
      const { x, y } = toLocal(event);
      const over = hitTest(x, y);
      if (over !== node) {
        node.fx = null;
        node.fy = null;
        hovered = null;
      }
      setHovered(over);
    };

    // --- Observers ------------------------------------------------------
    const resizeObserver = new ResizeObserver(() => {
      resize();
      simulation.alpha(Math.max(simulation.alpha(), 0.3));
      if (reduced) {
        simulation.tick(120);
        draw();
      }
    });
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) start();
      else stop();
    });
    const themeObserver = new MutationObserver(() => {
      palette = readPalette(canvas);
      redraw();
    });
    const onVisibility = () => (document.hidden ? stop() : start());

    resize();
    if (reduced) {
      // Settle the layout up front and render a single static frame.
      simulation.tick(300);
      draw();
    }
    void document.fonts?.ready.then(redraw);

    resizeObserver.observe(container);
    intersectionObserver.observe(container);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    document.addEventListener("visibilitychange", onVisibility);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.dataset.ready = "true";
    start();

    return () => {
      stop();
      simulation.stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      themeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointerup", onPointerUp);
    };
  }, [data, reducedMotion]);

  const name = data.nodes.find((n) => n.kind === "center")?.label ?? "Me";
  const areas = data.nodes.filter((n) => n.kind === "area").map((n) => n.label);
  const description = `Interactive graph connecting ${name}'s experience and projects to focus areas: ${areas.join(", ")}.`;

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={description}
        className="absolute inset-0 size-full touch-pan-y opacity-0 transition-opacity duration-700 data-[ready=true]:opacity-100"
      />
    </div>
  );
}
