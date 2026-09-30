export type FaqItem = { q: string; a: string };

const book: FaqItem = {
  q: "How far ahead should I book?",
  a: "Dates go first come, first served, and weekends in peak season go fastest. Your date is held once the agreement is signed and the retainer is paid. If your date is soon, ask anyway.",
};
const venue: FaqItem = {
  q: "What do you need from the venue?",
  a: "A level spot that doesn’t block exits or walkways, and a standard outlet nearby.",
};
const prints: FaqItem = {
  q: "Can the prints match our colors or our brand?",
  a: "Yes. Custom print artwork is included, designed around your names, colors, monogram, or logo, with up to two rounds of revisions.",
};
const travel: FaqItem = {
  q: "Do you travel outside San Diego?",
  a: "San Diego and Los Angeles are standard, and we travel beyond both for a fee. Custom builds ship nationwide crated.",
};

export const homeFaqs: FaqItem[] = [
  book,
  venue,
  prints,
  {
    q: "Why isn’t there pricing on the site?",
    a: "Because a 200-guest reception, a product launch, and a permanent bar install are three different jobs. Fill out the form and we’ll send a real quote for yours, plus a link to book it.",
  },
  {
    q: "What does a custom build include?",
    a: "Design and fabrication of the shell, camera, lighting, printer, touchscreen, our booth software, and a training walkthrough, plus support after delivery.",
  },
  {
    q: "How does the venue profit share work?",
    a: "We install and service the booth at our cost, guests pay per session, and you take a percentage of everything it earns. We put the specific split in writing after walking your space.",
  },
  travel,
];

export const quoteFaqs: FaqItem[] = [
  book,
  venue,
  {
    q: "Why isn’t there pricing on the site?",
    a: "Because a 200-guest reception, a product launch, and a permanent bar install are three different jobs. Send your details and we’ll quote yours specifically, with a link to book.",
  },
  prints,
  travel,
  {
    q: "Which booth will I get?",
    a: "We’ll match the booth to your room once we know the space and the guest count. That conversation happens after you reach out, not from a menu.",
  },
];

export const faqJsonLd = (items: FaqItem[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});
