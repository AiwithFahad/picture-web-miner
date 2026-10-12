import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "@/features/redfern/views/ContactPage";
export const Route = createFileRoute("/contact")({
 head: () => ({ meta: [
  { title: "Contact & Location — Redfern Table & Grill" },
  { name: "description", content: "Find Redfern contact details, sample operating hours, and answers to common dining questions." },
  { property: "og:title", content: "Contact & Location — Redfern Table & Grill" },
  { property: "og:description", content: "Find Redfern contact details, sample operating hours, and answers to common dining questions." },
  { property: "og:type", content: "website" },
  { name: "twitter:card", content: "summary_large_image" },
 ] }),
 component: ContactPage,
});
