import { createFileRoute } from "@tanstack/react-router";
import { ReservationsPage } from "@/features/redfern/views/ReservationsPage";
export const Route = createFileRoute("/reservations")({
 head: () => ({ meta: [
  { title: "Table Reservations — Redfern Table & Grill" },
  { name: "description", content: "Plan a visit to Redfern Table & Grill with the table reservation request page." },
  { property: "og:title", content: "Table Reservations — Redfern Table & Grill" },
  { property: "og:description", content: "Plan a visit to Redfern Table & Grill with the table reservation request page." },
  { property: "og:type", content: "website" },
  { name: "twitter:card", content: "summary_large_image" },
 ] }),
 component: ReservationsPage,
});
