import type { Profile } from "@/types/content";

export const profile: Profile = {
  name: "Alex Chen",
  tagline:
    "Software engineer building systems that scale, from distributed graph mining to features used by millions.",
  location: "Atlanta, GA",
  email: "achen1452@gmail.com",
  status: "Open to Summer 2027 internships",
  currently: [
    "Studying CS at Georgia Tech",
    "Software Engineer at HyTech Racing",
  ],
  // TODO(Alex): replace with personal About copy and interests.
  bio: [
    "I'm a computer science student at Georgia Tech who likes working where systems meet data: distributed graph mining, backend infrastructure, and the product surfaces built on top of them.",
    "Recently I shipped iOS features to millions of viewers at Twitch and co-authored a SIGMOD 2026 paper on distributed graph mining from my time at TikTok. Outside of class I build internal engineering tools for HyTech Racing.",
  ],
  socials: [
    {
      kind: "github",
      label: "GitHub",
      href: "https://github.com/xelanehc",
      handle: "xelanehc",
    },
    {
      kind: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/alexchen694",
      handle: "alexchen694",
    },
    {
      kind: "email",
      label: "Email",
      href: "mailto:achen1452@gmail.com",
      handle: "achen1452@gmail.com",
    },
  ],
};
