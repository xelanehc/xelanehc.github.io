import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

/** Open Graph images are 1200×630; rendered at build time (static export). */
export const ogSize = { width: 1200, height: 630 };

// Hex equivalents of the dark-theme tokens in globals.css (Satori has no oklch).
const colors = {
  background: "#090c11",
  foreground: "#ebeff2",
  muted: "#9ba2ab",
  border: "#23272d",
  brand: "#46d6d1",
  warm: "#f7ac4d",
};

const fontDir = join(process.cwd(), "node_modules/geist/dist/fonts");

async function loadFonts() {
  const [sans, sansSemibold, mono] = await Promise.all([
    readFile(join(fontDir, "geist-sans/Geist-Regular.ttf")),
    readFile(join(fontDir, "geist-sans/Geist-SemiBold.ttf")),
    readFile(join(fontDir, "geist-mono/GeistMono-Regular.ttf")),
  ]);
  return [
    {
      name: "Geist",
      data: sans,
      weight: 400 as const,
      style: "normal" as const,
    },
    {
      name: "Geist",
      data: sansSemibold,
      weight: 600 as const,
      style: "normal" as const,
    },
    {
      name: "Geist Mono",
      data: mono,
      weight: 400 as const,
      style: "normal" as const,
    },
  ];
}

// A fixed, hand-placed version of the hero graph.
const nodes = [
  { x: 210, y: 210, r: 16, color: colors.foreground },
  { x: 90, y: 110, r: 10, color: colors.brand },
  { x: 330, y: 90, r: 10, color: colors.brand },
  { x: 370, y: 270, r: 10, color: colors.brand },
  { x: 220, y: 370, r: 10, color: colors.brand },
  { x: 60, y: 290, r: 10, color: colors.brand },
  { x: 160, y: 40, r: 7, color: colors.muted },
  { x: 420, y: 150, r: 7, color: colors.warm },
  { x: 410, y: 380, r: 7, color: colors.muted },
  { x: 100, y: 400, r: 7, color: colors.muted },
  { x: 20, y: 190, r: 7, color: colors.muted },
];
const edges = [
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
  [0, 5],
  [1, 6],
  [2, 6],
  [2, 7],
  [3, 7],
  [3, 8],
  [4, 8],
  [4, 9],
  [5, 9],
  [5, 10],
  [1, 10],
];

function GraphMotif() {
  return (
    <svg width="440" height="420" viewBox="0 0 440 420">
      {edges.map(([a, b]) => (
        <line
          key={`${a}-${b}`}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke={b === 7 || a === 7 ? colors.warm : colors.border}
          strokeWidth={b === 7 || a === 7 ? 3 : 2}
        />
      ))}
      <circle
        cx={nodes[0].x}
        cy={nodes[0].y}
        r={28}
        fill="none"
        stroke={colors.brand}
        strokeOpacity={0.4}
        strokeWidth={2}
      />
      {nodes.map((n) => (
        <circle
          key={`${n.x}-${n.y}`}
          cx={n.x}
          cy={n.y}
          r={n.r}
          fill={n.color}
        />
      ))}
    </svg>
  );
}

export async function renderOgImage({
  eyebrow,
  title,
  subtitle,
  footer,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  footer?: string;
}) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "64px 72px",
        backgroundColor: colors.background,
        backgroundImage: `radial-gradient(${colors.border} 1.5px, transparent 1.5px)`,
        backgroundSize: "32px 32px",
        fontFamily: "Geist",
        color: colors.foreground,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          maxWidth: 640,
        }}
      >
        <div
          style={{
            fontFamily: "Geist Mono",
            fontSize: 26,
            color: colors.brand,
          }}
        >
          {eyebrow}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: title.length > 18 ? 68 : 84,
              fontWeight: 600,
              letterSpacing: -2,
              lineHeight: 1.05,
            }}
          >
            {title}
          </div>
          <div style={{ fontSize: 32, color: colors.muted, lineHeight: 1.35 }}>
            {subtitle}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 24,
            color: colors.muted,
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              backgroundColor: colors.brand,
            }}
          />
          {footer ?? "xelanehc.github.io"}
        </div>
      </div>
      <GraphMotif />
    </div>,
    { ...ogSize, fonts: await loadFonts() },
  );
}
