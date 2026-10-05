import type { Metadata } from "next";
import QuoteForm from "@/components/QuoteForm";
import QuoteLayout from "@/components/QuoteLayout";
import { baseOpenGraph } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Get a Quote | Le Booth Photo Booths, San Diego & Los Angeles" },
  description:
    "Tell us about your wedding, event, or venue and we’ll send a personalized photo booth quote with a booking link, usually within one business day.",
  alternates: { canonical: "/quote" },
  openGraph: {
    ...baseOpenGraph,
    title: "Get a Quote | Le Booth",
    description: "Personalized photo booth quotes for San Diego and Los Angeles weddings, events, and venues.",
    url: "/quote",
  },
};

export default function QuotePage() {
  return (
    <QuoteLayout>
      <QuoteForm />
    </QuoteLayout>
  );
}
