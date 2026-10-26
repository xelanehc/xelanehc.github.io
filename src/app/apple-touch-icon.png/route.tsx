import { ImageResponse } from "next/og";

// Served as /apple-touch-icon.png (a real .png; see src/app/og/[image]/route.tsx).
export const dynamic = "force-static";

/** Same mark as icon.svg, on a full-bleed square (iOS rounds the corners). */
export function GET() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#090c11",
      }}
    >
      <svg width="132" height="132" viewBox="0 0 32 32">
        <path
          d="M8.5 22.5 16 9l7.5 13.5Z"
          fill="none"
          stroke="#ebeff2"
          strokeOpacity={0.35}
          strokeWidth={1.75}
          strokeLinejoin="round"
        />
        <circle cx="16" cy="9" r="4" fill="#46d6d1" />
        <circle cx="8.5" cy="22.5" r="3.25" fill="#ebeff2" />
        <circle cx="23.5" cy="22.5" r="3.25" fill="#f7ac4d" />
      </svg>
    </div>,
    { width: 180, height: 180 },
  );
}
