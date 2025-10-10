"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import {
  Pen,
  PaintBucket,
  Home,
  Ruler,
  PenTool,
  Building2,
  Award,
  Users,
  Calendar,
  CheckCircle,
  Sparkles,
  Star,
  ArrowRight,
  Zap,
  TrendingUp,
} from "lucide-react";
import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion";

export default function AboutUsSection({
  imageSrc,
  ctaBgColor = "#202e44",
  ctaButtonColor = "#88734C",
  ctaTextColor = "#FFFFFF",
}: {
  imageSrc?: string;
  ctaBgColor?: string;
  ctaButtonColor?: string;
  ctaTextColor?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  const isStatsInView = useInView(statsRef, { once: false, amount: 0.3 });

  // Parallax effect for decorative elements
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -20]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  } as const;

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
  } as const;

  // Reframed as six focus areas summarising the mission
  const services = [
    {
      icon: <CheckCircle className="w-6 h-6" />,
      secondaryIcon: <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-[#A9BBC8]" />,
      title: "Special Needs Care",
      description:
        "Serve children with developmental delays; extend compassion and assistance to differently‑abled devotees.",
      position: "left",
    },
    {
      icon: <Users className="w-6 h-6" />,
      secondaryIcon: <CheckCircle className="w-4 h-4 absolute -top-1 -right-1 text-[#A9BBC8]" />,
      title: "Elderly & Handicapped",
      description: "Support for the elderly and handicapped through food, clothing and care initiatives.",
      position: "left",
    },
    {
      icon: <PenTool className="w-6 h-6" />,
      secondaryIcon: <Star className="w-4 h-4 absolute -top-1 -right-1 text-[#A9BBC8]" />,
      title: "Education Support",
      description: "Books, fees and guidance for poor and orphaned students to continue their education.",
      position: "left",
    },
    {
      icon: <PaintBucket className="w-6 h-6" />,
      secondaryIcon: <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-[#A9BBC8]" />,
      title: "Health & Relief",
      description:
        "Free health check‑ups, blood donation camps, summer water points (Chalivendram) and emergency aid.",
      position: "right",
    },
    {
      icon: <Ruler className="w-6 h-6" />,
      secondaryIcon: <CheckCircle className="w-4 h-4 absolute -top-1 -right-1 text-[#A9BBC8]" />,
      title: "Annadanam & Seva",
      description:
        "Annadanam and devotional programmes in Hyderabad, Pampa and Sabarimala during the pilgrim season.",
      position: "right",
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      secondaryIcon: <Star className="w-4 h-4 absolute -top-1 -right-1 text-[#A9BBC8]" />,
      title: "Shelter Initiatives",
      description:
        "Vision to set up Old Age & Orphanage Homes; dormitory halls for devotees during season.",
      position: "right",
    },
  ] as const;

  const stats = [
    { icon: <Award />, value: 150, label: "Service Drives", suffix: "+" },
    { icon: <Users />, value: 1200, label: "Beneficiaries", suffix: "+" },
    { icon: <Calendar />, value: 12, label: "Years of Seva", suffix: "" },
    { icon: <TrendingUp />, value: 98, label: "Satisfaction", suffix: "%" },
  ] as const;

  const heroImage = imageSrc || "/front.jpeg";

  return (
    <section
      id="about-section"
      ref={sectionRef}
      className="w-full py-24 px-4 bg-black text-white overflow-hidden relative"
    >
      {/* Decorative background elements */}
      <motion.div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#88734C]/5 blur-3xl" style={{ y: y1, rotate: rotate1 }} />
      <motion.div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-[#A9BBC8]/5 blur-3xl" style={{ y: y2, rotate: rotate2 }} />
      <motion.div
        className="absolute top-1/2 left-1/4 w-4 h-4 rounded-full bg-[#88734C]/30"
        animate={{ y: [0, -15, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-6 h-6 rounded-full bg-[#A9BBC8]/30"
        animate={{ y: [0, 20, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
      />

      <motion.div className="container mx-auto max-w-6xl relative z-10" initial="hidden" animate={isInView ? "visible" : "hidden"} variants={containerVariants}>
        <motion.div className="flex flex-col items-center mb-6" variants={itemVariants}>
          <motion.span className="text-[#88734C] font-medium mb-2 flex items-center gap-2" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <Zap className="w-4 h-4" />
            DISCOVER OUR STORY
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-light mb-4 text-center">About Us</h2>
          <motion.div className="w-24 h-1 bg-[#88734C]" initial={{ width: 0 }} animate={{ width: 96 }} transition={{ duration: 1, delay: 0.5 }} />
        </motion.div>

        <motion.p className="text-center max-w-2xl mx-auto mb-16 text-white/80" variants={itemVariants}>
          Sree Sabari Sastha Seva Samithi (SSSSS) is a devotional service organisation dedicated to Ayyappa Dharma —
          serving devotees and society through annadanam, healthcare, education support and seasonal seva at
          Hyderabad, Pampa and Sabarimala.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Left Column */}
          <div className="space-y-16">
            {services
              .filter((service) => service.position === "left")
              .map((service, index) => (
                <ServiceItem
                  key={`left-${index}`}
                  icon={service.icon}
                  secondaryIcon={service.secondaryIcon}
                  title={service.title}
                  description={service.description}
                  variants={itemVariants as any}
                  delay={index * 0.2}
                  direction="left"
                />
              ))}
          </div>

          {/* Center Image */}
          <div className="flex justify-center items-center order-first md:order-none mb-8 md:mb-0">
            <motion.div className="relative w-full max-w-xs" variants={itemVariants as any}>
              <motion.div className="rounded-md overflow-hidden shadow-xl" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }} whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}>
                <img src={heroImage} alt="Samithi" className="w-full h-full object-cover" />
                <motion.div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.9 }}>
                  <motion.a href="/gallery/images" className="bg-white text-[#202e44] px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    View Gallery <ArrowRight className="w-4 h-4" />
                  </motion.a>
                </motion.div>
              </motion.div>
              <motion.div className="absolute inset-0 border-4 border-[#A9BBC8] rounded-md -m-3 z-[-1]" initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.6 }} />
              <motion.div className="absolute -top-4 -right-8 w-16 h-16 rounded-full bg-[#88734C]/10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.9 }} style={{ y: y1 }} />
              <motion.div className="absolute -bottom-6 -left-10 w-20 h-20 rounded-full bg-[#A9BBC8]/15" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.1 }} style={{ y: y2 }} />
              <motion.div className="absolute -top-10 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#88734C]" animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }} />
              <motion.div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#A9BBC8]" animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }} />
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-16">
            {services
              .filter((service) => service.position === "right")
              .map((service, index) => (
                <ServiceItem
                  key={`right-${index}`}
                  icon={service.icon}
                  secondaryIcon={service.secondaryIcon}
                  title={service.title}
                  description={service.description}
                  variants={itemVariants as any}
                  delay={index * 0.2}
                  direction="right"
                />
              ))}
          </div>
        </div>

        {/* Mission, Pilgrim Season, Membership */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <InfoList title="Mission" items={[
            "Help and serve children with developmental delays",
            "Support handicapped and elderly people",
            "Aid poor people and students with fees and books",
            "Support orphanages and students",
            "Free health check‑ups and blood donation camps",
            "Summer drinking water ‘Chalivendram’ centres",
            "Food and clothes to poor, elderly, handicapped",
            "Set up Old Age & Orphanage Home",
          ]} />
          <InfoList title="Pilgrim Season" items={[
            "Provide drinking water and food at Hyderabad, Pampa and Sabarimala",
            "Annadanam in Hyderabad and Sabarimala",
            "Pooja, Bhajana, Annadanam and poor feeding",
            "Serve Ayyappa devotees; help regroup lost pilgrims",
            "Volunteers assist sick/disabled to hospitals or home",
            "Construct pandals/dormitories/rooms for stay at Sabarimala",
          ]} />
          <InfoList title="Membership" items={[
            "Open to 18+ believers in Ayyappa Dharma",
            "Abide by Samithi rules; approved by Executive Committee",
            "Apply to the General Secretary with ID proofs and photos",
            "Current life membership fee: Rs 3050 (DD payable to SSSSS)",
          ]} />
        </div>

        {/* Stats Section */}
        <motion.div ref={statsRef} className="mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" initial="hidden" animate={isStatsInView ? "visible" : "hidden"} variants={containerVariants}>
          {stats.map((stat, index) => (
            <StatCounter key={index} icon={stat.icon} value={stat.value} label={stat.label} suffix={stat.suffix} delay={index * 0.1} />
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="mt-20 p-8 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6"
          style={{ backgroundColor: ctaBgColor, color: ctaTextColor }}
          initial={{ opacity: 0, y: 30 }}
          animate={isStatsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="flex-1">
            <h3 className="text-2xl font-medium mb-2">Join the Seva</h3>
            <p className="text-white/80">Be a part of our annadanam and service initiatives.</p>
          </div>
          <motion.a
            href="/contact"
            className="hover:brightness-110 text-black px-6 py-3 rounded-lg flex items-center gap-2 font-medium transition-all"
            style={{ backgroundColor: ctaButtonColor }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Us <ArrowRight className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}

interface ServiceItemProps {
  icon: React.ReactNode;
  secondaryIcon?: React.ReactNode;
  title: string;
  description: string;
  variants: any;
  delay: number;
  direction: "left" | "right";
}

function ServiceItem({ icon, secondaryIcon, title, description, variants, delay, direction }: ServiceItemProps) {
  return (
    <motion.div className="flex flex-col group" variants={variants} transition={{ delay }} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
      <motion.div className="flex items-center gap-3 mb-3" initial={{ x: direction === "left" ? -20 : 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6, delay: delay + 0.2 }}>
        <motion.div className="text-[#88734C] bg-[#88734C]/10 p-3 rounded-lg transition-colors duration-300 group-hover:bg-[#88734C]/20 relative" whileHover={{ rotate: [0, -10, 10, -5, 0], transition: { duration: 0.5 } }}>
          {icon}
          {secondaryIcon}
        </motion.div>
        <h3 className="text-xl font-medium text-white group-hover:text-[#88734C] transition-colors duration-300">{title}</h3>
      </motion.div>
      <motion.p className="text-sm text-white/80 leading-relaxed pl-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: delay + 0.4 }}>
        {description}
      </motion.p>
      <motion.div className="mt-3 pl-12 flex items-center text-[#88734C] text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300" initial={{ opacity: 0 }} animate={{ opacity: 0 }}>
        <span className="flex items-center gap-1">
          Learn more <ArrowRight className="w-3 h-3" />
        </span>
      </motion.div>
    </motion.div>
  );
}

function InfoList({ title, items }: { title: string; items: string[] }) {
  return (
    <motion.div
      className="rounded-xl border border-white/10 bg-white/5 p-6 shadow-sm hover:shadow-md transition-shadow"
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -4 }}
    >
      <h3 className="text-lg font-semibold mb-3 text-white">{title}</h3>
      <ul className="list-disc pl-5 text-sm text-white/80 space-y-1.5">
        {items.map((t, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.6 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            {t}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

interface StatCounterProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  suffix: string;
  delay: number;
}

function StatCounter({ icon, value, label, suffix, delay }: StatCounterProps) {
  const countRef = useRef(null);
  const isInView = useInView(countRef, { once: false });
  const [hasAnimated, setHasAnimated] = useState(false);

  const springValue = useSpring(0, { stiffness: 50, damping: 10 });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      springValue.set(value);
      setHasAnimated(true);
    } else if (!isInView && hasAnimated) {
      springValue.set(0);
      setHasAnimated(false);
    }
  }, [isInView, value, springValue, hasAnimated]);

  const displayValue = useTransform(springValue, (latest) => Math.floor(latest));

  return (
    <motion.div
      className="bg-white/5 backdrop-blur-sm p-6 rounded-xl flex flex-col items-center text-center group hover:bg-white/10 transition-colors duration-300"
      variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } } }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <motion.div className="w-14 h-14 rounded-full bg-[#202e44]/5 flex items-center justify-center mb-4 text-[#88734C] group-hover:bg-[#88734C]/10 transition-colors duration-300" whileHover={{ rotate: 360, transition: { duration: 0.8 } }}>
        {icon}
      </motion.div>
      <motion.div ref={countRef} className="text-3xl font-bold text-white flex items-center">
        <motion.span>{displayValue}</motion.span>
        <span>{suffix}</span>
      </motion.div>
      <p className="text-white/70 text-sm mt-1">{label}</p>
      <motion.div className="w-10 h-0.5 bg-[#88734C] mt-3 group-hover:w-16 transition-all duration-300" />
    </motion.div>
  );
}
