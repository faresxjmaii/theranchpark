import { motion, useReducedMotion, useMotionValue, useTransform } from "framer-motion";
import { Sailboat, Sparkles, Ticket, Waves } from "lucide-react";
import React, { useRef } from "react";
import { prices } from "../data/siteContent";

const iconMap: Record<string, React.ElementType> = {
  "Aire de jeux": Sparkles,
  "Waterball": Waves,
  "Pédalo": Sailboat,
};

const revealEase = [0.215, 0.61, 0.355, 1] as const;

function TicketCard({ price, index }: { price: any; index: number }) {
  const shouldReduceMotion = useReducedMotion();
  const Icon = iconMap[price.title] || Ticket;
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useTransform(y, [0, 1], [4, -4]);
  const rotateY = useTransform(x, [0, 1], [-4, 4]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.65,
        delay: shouldReduceMotion ? 0 : index * 0.13,
        ease: revealEase,
      }}
      style={{
        rotateX: shouldReduceMotion ? 0 : rotateX,
        rotateY: shouldReduceMotion ? 0 : rotateY,
        transformStyle: "preserve-3d",
      }}
      className="w-[94%] mx-auto sm:w-full group"
    >
      <div
        className="relative flex w-full h-full flex-col overflow-hidden rounded-[24px] sm:rounded-[2rem] bg-[rgba(255,255,255,0.92)] p-[14px] sm:p-8 shadow-[0_18px_45px_rgba(7,27,77,0.14)] sm:shadow-[0_22px_60px_rgba(7,27,77,0.12)] border border-[rgba(7,27,77,0.08)] backdrop-blur-md transition-all duration-300 [transform:perspective(900px)_rotateX(1.5deg)] active:[transform:perspective(900px)_rotateX(0deg)_translateY(-3px)] sm:!transform-none hover:-translate-y-1.5 hover:shadow-[0_30px_80px_rgba(7,27,77,0.18)] min-h-[128px] sm:min-h-0"
        style={{
          WebkitMaskImage:
            "radial-gradient(circle at 0 50%, transparent 16px, black 16.5px), radial-gradient(circle at 100% 50%, transparent 16px, black 16.5px)",
          WebkitMaskSize: "51% 100%",
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskPosition: "0 0, 100% 0",
          maskImage:
            "radial-gradient(circle at 0 50%, transparent 16px, black 16.5px), radial-gradient(circle at 100% 50%, transparent 16px, black 16.5px)",
          maskSize: "51% 100%",
          maskRepeat: "no-repeat",
          maskPosition: "0 0, 100% 0",
        }}
      >
        {/* Accent Color Strip */}
        <div
          className="absolute left-0 top-0 h-full w-1.5 transition-all duration-300 group-hover:w-2.5 group-hover:brightness-110"
          style={{ backgroundColor: price.accent }}
        />

        <div className="relative z-10 flex h-full flex-col pl-2">
          {/* Header */}
          <div className="mb-2.5 sm:mb-8 flex items-center justify-between">
            <span className="rounded-full bg-[#071B4D]/5 px-2.5 py-1 sm:px-3 sm:py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#071B4D]/70">
              Pass d'accès
            </span>
            <div
              className="flex h-9 w-9 sm:h-12 sm:w-12 items-center justify-center rounded-[10px] sm:rounded-2xl transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110 shadow-sm"
              style={{ backgroundColor: `${price.accent}1A`, color: price.accent }}
            >
              <Icon className="w-[18px] h-[18px] sm:w-[22px] sm:h-[22px]" strokeWidth={2.5} />
            </div>
          </div>

          {/* Activity Name */}
          <h3 className="mb-0.5 sm:mb-2 text-[19px] sm:text-2xl font-black text-[#071B4D]">{price.title}</h3>

          {/* Price */}
          <div className="mb-1.5 sm:mb-4 flex items-baseline gap-1.5">
            <span className="text-[38px] sm:text-[3.25rem] font-black leading-none tracking-tight text-[#071B4D]">
              {price.price}
            </span>
            <span className="text-[11px] sm:text-sm font-extrabold uppercase tracking-wide text-[#071B4D]/50">
              {price.unit}
            </span>
          </div>

          {/* Description */}
          <p className="mt-auto text-[11px] sm:text-sm font-bold leading-relaxed text-[#071B4D]/60 pr-2 sm:pr-8">
            {price.description}
          </p>

          {/* Decorative Grid / QR style */}
          <div className="absolute bottom-1 right-2 opacity-15 transition-opacity duration-300 group-hover:opacity-30 scale-[0.65] sm:scale-100 origin-bottom-right">
            <svg width="44" height="44" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0" y="0" width="10" height="10" rx="2" fill={price.accent} />
              <rect x="14" y="0" width="10" height="10" rx="2" fill={price.accent} />
              <rect x="28" y="0" width="12" height="10" rx="2" fill={price.accent} />
              <rect x="0" y="14" width="10" height="10" rx="2" fill={price.accent} />
              <rect x="14" y="14" width="26" height="10" rx="2" fill={price.accent} />
              <rect x="0" y="28" width="24" height="10" rx="2" fill={price.accent} />
              <rect x="28" y="28" width="12" height="10" rx="2" fill={price.accent} />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Pricing() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className="pt-[48px] pb-[52px] sm:pt-24 sm:pb-24 lg:pt-32 lg:pb-32 relative overflow-hidden scroll-mt-28 sm:scroll-mt-32"
      id="tarifs"
      style={{
        background: "linear-gradient(180deg, #F6FAFF 0%, #EEF6FF 50%, #FFFFFF 100%)",
      }}
    >
      {/* Subtle Background Glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(22,142,247,0.06)_0%,transparent_60%)]" />
        <div className="absolute right-0 top-1/3 h-[500px] w-[500px] translate-x-1/3 rounded-full bg-[radial-gradient(circle,rgba(108,59,255,0.04)_0%,transparent_60%)]" />

        {/* Floating decorative dots */}
        <motion.div
          animate={shouldReduceMotion ? {} : { y: [0, -15, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[10%] top-[20%] h-3 w-3 rounded-full bg-ranch-yellow opacity-40 blur-[1px]"
        />
        <motion.div
          animate={shouldReduceMotion ? {} : { y: [0, 20, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute right-[15%] top-[15%] h-4 w-4 rounded-full bg-ranch-blue opacity-30 blur-[1px]"
        />
        <motion.div
          animate={shouldReduceMotion ? {} : { y: [0, -10, 0], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute left-[20%] bottom-[20%] h-2.5 w-2.5 rounded-full bg-ranch-green opacity-30 blur-[1px]"
        />
      </div>

      <div className="container-ranch relative z-10 px-5 sm:px-6 lg:px-8">

        {/* Title block — separate staggered animations */}
        <div className="mx-auto max-w-3xl text-center" style={{ overflow: "hidden" }}>
          {/* Title: simple premium fade and slide-up */}
          <motion.h2
            className="section-title font-heading text-[2.2rem] font-extrabold tracking-tight text-ranch-navy sm:text-5xl lg:text-6xl"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: revealEase }}
          >
            Nos tarifs
          </motion.h2>

        </div>

        {/* Pricing Cards Grid */}
        <div
          className="mt-8 sm:mt-14 grid grid-cols-1 gap-[12px] sm:gap-6 sm:max-w-xl sm:mx-auto md:max-w-none md:grid-cols-2 lg:grid-cols-3"
          style={{ perspective: 1200 }}
        >
          {prices.map((price, index) => (
            <TicketCard key={price.title} price={price} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}
