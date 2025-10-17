import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

interface Footer7Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  sections?: Array<{
    title: string;
    links: Array<{ name: string; href: string }>;
  }>;
  description?: string;
  socialLinks?: Array<{
    icon: React.ReactElement;
    href: string;
    label: string;
  }>;
  copyright?: string;
  legalLinks?: Array<{
    name: string;
    href: string;
  }>;
}

const defaultSections = [
  {
    title: "Samithi",
    links: [
      { name: "Home", href: "/" },
      { name: "Calendar", href: "/calendar" },
      { name: "Samithi Calendar", href: "/calendar/temple" },
      { name: "Annadanam Calendar", href: "/calendar/annadanam" },
    ],
  },
  {
    title: "Devotional",
    links: [
      { name: "Devotional Book (Flipbook)", href: "/devotional" },
      { name: "Official Website", href: "https://ayyappatemple.in" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Donate", href: "/donate" },
      { name: "Volunteer", href: "/volunteer" },
      { name: "Contact", href: "/contact" },
      { name: "Terms & Conditions", href: "/terms" },
    ],
  },
];

const defaultSocialLinks = [
  { icon: <FaInstagram className="size-5" />, href: "#", label: "Instagram" },
  { icon: <FaFacebook className="size-5" />, href: "#", label: "Facebook" },
  { icon: <FaTwitter className="size-5" />, href: "#", label: "Twitter" },
  { icon: <FaLinkedin className="size-5" />, href: "#", label: "LinkedIn" },
];

const defaultLegalLinks = [
  { name: "Terms and Conditions", href: "/terms" },
  { name: "Privacy Policy", href: "#" },
];

export const Footer7 = ({
  logo = {
    url: "/",
    src: "/front.jpeg",
    alt: "Sree Sabari Sastha Seva Samithi (SSSSS)",
    title: "Sree Sabari Sastha Seva Samithi (SSSSS)",
  },
  sections = defaultSections,
  description = "Sree Sabari Sastha Seva Samithi (SSSSS) — Devotional resources, events, and community support.",
  socialLinks = defaultSocialLinks,
  copyright = "© 2025 Sree Sabari Sastha Seva Samithi (SSSSS). All rights reserved.",
  legalLinks = defaultLegalLinks,
}: Footer7Props) => {
  return (
    <section className="py-20">
      <div className="container mx-auto">
        <div className="flex w-full flex-col justify-between gap-10 lg:flex-row lg:items-start lg:text-left">
          <div className="flex w-full flex-col justify-between gap-6 lg:items-start">
            {/* Logo */}
            <div className="flex items-center gap-2 lg:justify-start">
              <a href={logo.url} className="inline-flex items-center gap-2">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  title={logo.title}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <h2 className="text-xl font-semibold">{logo.title}</h2>
              </a>
            </div>
            <p className="max-w-[70%] text-sm text-muted-foreground">
              {description}
            </p>
            <ul className="flex items-center space-x-6 text-muted-foreground">
              {socialLinks.map((social, idx) => (
                <li key={idx} className="font-medium hover:text-primary">
                  <a href={social.href} aria-label={social.label}>
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid w-full gap-6 md:grid-cols-3 lg:gap-20">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="font-medium hover:text-primary"
                    >
                      <a href={link.href}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 flex flex-col justify-between gap-4 border-t py-8 text-xs font-medium text-muted-foreground md:flex-row md:items-center md:text-left">
          <p className="order-3 md:order-1">{copyright}</p>
          <ul className="order-2 flex flex-col gap-2 md:flex-row">
            {legalLinks.map((link, idx) => (
              <li key={idx} className="hover:text-primary">
                <a href={link.href}> {link.name}</a>
              </li>
            ))}
          </ul>
          <div className="order-1 md:order-3" />
        </div>
      </div>
    </section>
  );
};
