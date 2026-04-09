import { notFound } from "next/navigation";
import { AmnesyaEventShowcase } from "@/components/booking/amnesya-event-showcase";
import { AMNESYA_EVENT } from "@/lib/venues/amnesya-data";

type EventPageProps = {
  params: Promise<{ eventSlug: string }>;
};

export default async function EventPage({ params }: EventPageProps) {
  const { eventSlug } = await params;

  if (eventSlug !== AMNESYA_EVENT.slug) {
    notFound();
  }

  return <AmnesyaEventShowcase />;
}
