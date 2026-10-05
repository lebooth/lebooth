import type { Metadata } from "next";
import QuoteLayout from "@/components/QuoteLayout";
import QuoteSent from "@/components/QuoteSent";
import { baseOpenGraph } from "@/lib/site";

// Confirmation page after a successful quote request. Its own URL so Google Ads can tell
// a submitted lead (/quote/thanks) from someone just browsing the form (/quote).
export const metadata: Metadata = {
  title: { absolute: "Thanks | Le Booth" },
  robots: { index: false, follow: false },
  openGraph: { ...baseOpenGraph, title: "Get a Quote | Le Booth", url: "/quote" },
};

export default function QuoteThanksPage() {
  return (
    <QuoteLayout>
      <QuoteSent />
    </QuoteLayout>
  );
}
