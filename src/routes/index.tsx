import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/features/redfern/views/HomePage";
export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Redfern Table & Grill — American Grill & Comfort Food" },
    { name: "description", content: "Discover Redfern Table & Grill: handcrafted burgers, flame-grilled steaks, slow-smoked barbecue, and good company." },
    { property: "og:title", content: "Redfern Table & Grill — American Grill & Comfort Food" },
    { property: "og:description", content: "Handcrafted burgers, grilled steaks, and slow-smoked barbecue at Redfern Table & Grill." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: HomePage,
});
