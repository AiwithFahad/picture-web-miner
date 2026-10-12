import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "@/features/redfern/views/AboutPage";
export const Route = createFileRoute("/about")({
 head: () => ({ meta: [
  { title: "Our Story — Redfern Table & Grill" },
  { name: "description", content: "Discover the American grill traditions and welcoming hospitality behind Redfern Table & Grill." },
  { property: "og:title", content: "Our Story — Redfern Table & Grill" },
  { property: "og:description", content: "Discover the American grill traditions and welcoming hospitality behind Redfern Table & Grill." },
  { property: "og:type", content: "website" },
  { name: "twitter:card", content: "summary_large_image" },
 ] }),
 component: AboutPage,
});
