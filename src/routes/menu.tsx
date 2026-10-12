import { createFileRoute } from "@tanstack/react-router";
import { MenuPage } from "@/features/redfern/views/MenuPage";
export const Route = createFileRoute("/menu")({
 head: () => ({ meta: [
  { title: "Menu — Redfern Table & Grill" },
  { name: "description", content: "Browse the complete Redfern menu of burgers, steaks, appetizers, salads, and desserts." },
  { property: "og:title", content: "Menu — Redfern Table & Grill" },
  { property: "og:description", content: "Browse the complete Redfern menu of burgers, steaks, appetizers, salads, and desserts." },
  { property: "og:type", content: "website" },
  { name: "twitter:card", content: "summary_large_image" },
 ] }),
 component: MenuPage,
});
