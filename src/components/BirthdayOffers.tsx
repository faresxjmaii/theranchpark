import { Check, ChevronDown, PartyPopper, Sparkles, UtensilsCrossed } from "lucide-react";
import { createRef, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  birthdayNote,
  birthdayOffers,
  birthdayWhatsAppUrl,
} from "../data/siteContent";
import Button from "./ui/Button";
import SectionTitle from "./ui/SectionTitle";
import { useMediaQuery } from "../hooks/useMediaQuery";

type BirthdayOffer = (typeof birthdayOffers)[number];

type OfferCardProps = {
  offer: BirthdayOffer;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  isDesktop: boolean;
};

const getPackageStyle = (title: string) => {
  if (title.toLowerCase().includes("grande")) {
    return {
      icon: PartyPopper,
      accent: "#6C3BFF", // Violet
      bg: "bg-[#6C3BFF]/10",
      text: "text-[#6C3BFF]",
    };
  }
  if (title.toLowerCase().includes("terrasse")) {
    return {
      icon: UtensilsCrossed,
      accent: "#31C96B", // Green
      bg: "bg-[#31C96B]/15",
      text: "text-[#1DAA53]", // Darker green for text readability
    };
  }
  return {
    icon: Sparkles,
    accent: "#FFD22E", // Ranch Yellow (premium golden feel)
    bg: "bg-[#FFD22E]/20",
    text: "text-[#E6B300]", // Darker golden yellow
  };
};

const withoutBirthdayPrices = (text: string) =>
  text
    .replace(/Elle comprend\s+\d+\s*DT de consommation/g, "Elle comprend une consommation")
    .replace(/\d+\s*DT de consommation en boissons inclus/g, "Consommation en boissons incluse")
    .replace(/Droit d[’']anniversaire\s*:\s*\d+\s*DT/g, "Droit d’anniversaire")
    .replace(/Minimum consommation\s*:\s*\d+\s*DT par adulte/g, "Minimum consommation par adulte")
    .replace(/\d+\s*DT/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();

const revealViewport = { once: true, amount: 0.2 };

function OfferCard({ offer, index, isExpanded, onToggle, isDesktop }: OfferCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const style = getPackageStyle(offer.title);
  const Icon = style.icon;

  const contentId = `birthday-offer-${index}`;
  const forceExpanded = isExpanded || isDesktop;

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={revealViewport}
      transition={{ duration: 0.6, ease: "easeOut", delay: shouldReduceMotion ? 0 : index * 0.06 }}
      className="relative overflow-hidden rounded-[1.5rem] lg:rounded-[2rem] border border-[rgba(7,27,77,0.06)] bg-white shadow-[0_18px_45px_rgba(7,27,77,0.08)] transition-all duration-300 hover:shadow-[0_24px_70px_rgba(7,27,77,0.12)] group flex flex-col h-full"
    >
      {/* Accent Strip */}
      <div 
        className="absolute left-0 top-0 w-1.5 h-full transition-all duration-300 group-hover:w-2.5"
        style={{ backgroundColor: style.accent }}
      />
      
      {/* Header (always visible and keyboard accessible) */}
      <button
        aria-controls={contentId}
        aria-expanded={forceExpanded}
        className={`flex flex-col p-5 sm:p-7 pl-6 sm:pl-8 lg:p-5 lg:pl-6 text-left transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ranch-blue/50 ${isDesktop ? 'cursor-default' : 'cursor-pointer active:bg-slate-50/50'}`}
        onClick={isDesktop ? undefined : onToggle}
        type="button"
        tabIndex={isDesktop ? -1 : 0}
      >
        <div className="flex items-start justify-between gap-3 w-full">
          <div className="flex flex-col">
            <span className={`w-fit rounded-full px-2.5 py-1 text-[10px] sm:text-xs font-black uppercase tracking-wider ${style.bg} ${style.text}`}>
              {offer.typeLabel}
            </span>
            <h3 className="mt-2.5 sm:mt-3 lg:mt-2 text-xl sm:text-2xl lg:text-xl font-black leading-tight text-ranch-navy pr-4">
              {offer.title}
            </h3>
          </div>
          <div className="flex flex-col items-end gap-3 shrink-0">
            <span 
              className="grid h-12 w-12 sm:h-14 sm:w-14 lg:h-12 lg:w-12 place-items-center rounded-[14px] sm:rounded-2xl lg:rounded-[14px] text-white shrink-0 transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3"
              style={{ background: style.accent, boxShadow: `0 10px 25px ${style.accent}40` }}
            >
              <Icon size={24} className="lg:w-5 lg:h-5" strokeWidth={2.5} />
            </span>
            {/* Mobile Expand Chevron */}
            <motion.div
              animate={{ rotate: forceExpanded ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="mt-1 grid h-8 w-8 lg:h-7 lg:w-7 place-items-center rounded-full bg-slate-50 text-slate-400 group-hover:text-ranch-navy group-hover:bg-slate-100 transition-colors lg:hidden"
            >
              <ChevronDown size={18} className="lg:w-4 lg:h-4" strokeWidth={3} />
            </motion.div>
          </div>
        </div>

        <div className="mt-4 sm:mt-5 lg:mt-4 flex items-center">
          <span
            className="inline-flex min-h-11 items-center rounded-full px-4 text-sm font-black text-ranch-navy shadow-sm lg:min-h-10 lg:px-3.5 lg:text-xs"
            style={{
              backgroundColor: `${style.accent}18`,
              border: `1px solid ${style.accent}35`,
              color: style.accent,
            }}
          >
            Voir les détails
          </span>
        </div>
      </button>

      {/* Expandable Content Area */}
      <AnimatePresence initial={false}>
        {forceExpanded && (
          <motion.div
            id={contentId}
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.4, ease: [0.215, 0.61, 0.355, 1] }}
            className="flex-1 flex flex-col overflow-hidden"
          >
            <div className="px-5 sm:px-7 pl-6 sm:pl-8 lg:px-5 lg:pl-6 pb-5 sm:pb-7 lg:pb-5 flex-1 flex flex-col">
              <div className="h-px w-full bg-slate-100 mb-5 lg:mb-4" />
              
              <p className="rounded-2xl bg-[#F6FAFF] p-4 lg:p-3.5 text-[13px] sm:text-sm lg:text-[13px] font-bold leading-relaxed text-[#071B4D]/70 border border-[#071B4D]/[0.03]">
                {withoutBirthdayPrices(offer.description)}
              </p>

              <ul className="mt-5 mb-7 lg:mt-4 lg:mb-5 flex-1 space-y-3 lg:space-y-2.5">
                {offer.features.map((feature: string) => (
                  <li className="flex items-start gap-3 lg:gap-2.5" key={feature}>
                    <span 
                      className="mt-[3px] lg:mt-1 grid h-5 w-5 lg:h-4 lg:w-4 flex-none place-items-center rounded-full text-white"
                      style={{ backgroundColor: style.accent }}
                    >
                      <Check size={12} className="lg:w-2.5 lg:h-2.5" strokeWidth={4} />
                    </span>
                    <span className="text-[13px] sm:text-sm lg:text-[13px] font-semibold leading-relaxed text-slate-600">
                      {withoutBirthdayPrices(feature)}
                    </span>
                  </li>
                ))}
              </ul>

              <Button href={birthdayWhatsAppUrl} className="w-full mt-auto text-sm sm:text-base lg:text-sm lg:min-h-11">
                {offer.cta}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function BirthdayOffers() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const shouldScrollToOpenedCard = useRef(false);
  const cardRefs = useMemo(
    () => birthdayOffers.map(() => createRef<HTMLDivElement>()),
    [],
  );

  const handleToggle = (index: number) => {
    if (isDesktop) return; // Ignore toggles on desktop
    shouldScrollToOpenedCard.current = true;
    setExpandedIndex((prev) => {
      return prev === index ? null : index;
    });
  };

  useEffect(() => {
    if (isDesktop || !shouldScrollToOpenedCard.current || expandedIndex === null) {
      return;
    }

    shouldScrollToOpenedCard.current = false;
    const timeoutId = window.setTimeout(() => {
      window.requestAnimationFrame(() => {
        cardRefs[expandedIndex]?.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    }, 460);

    return () => window.clearTimeout(timeoutId);
  }, [cardRefs, expandedIndex, isDesktop]);

  return (
    <section
      className="px-5 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-12 relative overflow-hidden scroll-mt-28 sm:scroll-mt-32"
      id="anniversaires"
      style={{
        background: "linear-gradient(180deg, #FFFFFF 0%, #F6FAFF 100%)"
      }}
    >
      <div className="container-ranch relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={revealViewport}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <SectionTitle
            title="Anniversaires au Ranch"
            subtitle="Offrez à votre enfant une fête chaleureuse, organisée et pleine de bons souvenirs."
          />
        </motion.div>
        
        <div className="mt-8 sm:mt-12 lg:mt-8 grid gap-4 sm:gap-6 lg:gap-4 lg:grid-cols-3">
          {birthdayOffers.map((offer, index) => (
            <div className="scroll-mt-28 sm:scroll-mt-32 h-full" key={offer.title} ref={cardRefs[index]}>
              <OfferCard
                offer={offer}
                index={index}
                isExpanded={expandedIndex === index}
                onToggle={() => handleToggle(index)}
                isDesktop={isDesktop}
              />
            </div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={revealViewport}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="mx-auto mt-6 sm:mt-10 lg:mt-6 max-w-4xl rounded-2xl border border-ranch-yellow/30 bg-ranch-yellow/10 px-5 py-3.5 sm:py-4 lg:py-2.5 text-center text-[13px] sm:text-sm font-black leading-relaxed text-ranch-navy"
        >
          {birthdayNote}
        </motion.p>
      </div>
    </section>
  );
}
