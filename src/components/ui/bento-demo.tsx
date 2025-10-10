import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { Calendar, HandCoins, BookOpenText, MapPin, Images as ImagesIcon } from "lucide-react";
import Image from "next/image";

const features = [
  {
    Icon: Calendar,
    name: "Samithi Calendar",
    description:
      "Clear schedule of poojas, opening/closing days, and festivals. Core reason devotees visit the site.",
    href: "/calendar",
    cta: "View Calendar",
    background: (
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/b2.jpeg"
          alt="Samithi calendar background"
          fill
          sizes="(max-width: 1024px) 100vw, 600px"
          className="object-cover object-center opacity-60"
          priority={false}
        />
      </div>
    ),
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: HandCoins,
    name: "Donation Page",
    description:
      "Secure UPI + card options. Transparent fund usage (annadanam, nitya pooja, renovation).",
    href: "/donate",
    cta: "Donate Now",
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: BookOpenText,
    name: "Devotional Content Hub",
    description:
      "Harivarasanam lyrics (EN/TA/TE), 108 Sarana Gosham, Slokas & Mantras. Central spiritual resource for devotees.",
    href: "/#resources",
    cta: "Explore",
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: MapPin,
    name: "How to Reach & Accommodation",
    description:
      "Directions to Sabarimala, location address, nearby lodges. Saves pilgrims from confusion during travel.",
    href: "/sabarimala/how-to-reach",
    cta: "Get Directions",
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: ImagesIcon,
    name: "Photo & Video Gallery",
    description:
      "Samithi photos, pooja snapshots, yatra albums. Builds emotional connection and online presence.",
    href: "/gallery",
    cta: "View Gallery",
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
  },
];

export function BentoDemo() {
  return (
    <BentoGrid className="lg:grid-rows-3">
      {features.map((feature) => (
        <BentoCard key={feature.name} {...feature} />
      ))}
    </BentoGrid>
  );
}
