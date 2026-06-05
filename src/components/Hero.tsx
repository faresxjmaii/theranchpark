import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Clock, Phone, Sparkles } from "lucide-react";
import { contact, hero, openingHours } from "../data/siteContent";

const NAVY = "#071B4D";

function useIsMobileHero() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window === "undefined"
      ? false
      : window.matchMedia("(max-width: 768px)").matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const updateIsMobile = () => setIsMobile(mediaQuery.matches);
    updateIsMobile();
    mediaQuery.addEventListener("change", updateIsMobile);
    return () => mediaQuery.removeEventListener("change", updateIsMobile);
  }, []);

  return isMobile;
}

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const isMobileHero = useIsMobileHero();

  const animDuration = 0.85;
  const animEase = [0.215, 0.61, 0.355, 1] as const;
  const initialY = shouldReduceMotion ? 0 : 18;

  return (
    <>
      <section
        id="accueil"
        className="relative min-h-[100svh] min-h-screen px-5 sm:px-6 lg:px-8 flex flex-col pt-24 pb-6 sm:pt-28 sm:pb-8"
        style={{ backgroundColor: NAVY, overflow: "hidden" }}
      >
        {/* Background Image with Ken Burns on mobile */}
      <img
        alt={hero.imageAlt}
        className="absolute inset-0 h-full w-full object-cover mobile-ken-burns"
        src={hero.imageSrc}
      />

      {/* Base dark overlay — very subtle tint so image stays vivid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(7,27,77,0.05),rgba(7,27,77,0.25))]" />

      {/* ─── PRIMARY BOTTOM FADE ───────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1]"
        style={{
          height: isMobileHero ? "60%" : "45%",
          background: `linear-gradient(to top, ${NAVY} 0%, rgba(7, 27, 77, 0.9) 15%, rgba(7, 27, 77, 0.5) 45%, rgba(7, 27, 77, 0) 100%)`,
        }}
      />

      {/* Main Container */}
      <div className="container-ranch relative z-[2] flex-1 flex flex-col">

        {/* Text Block */}
        <div className="flex-1 flex flex-col items-center justify-center text-center pb-6 sm:pb-0 mt-8 sm:mt-0">
          <div className="relative mx-auto w-full max-w-5xl">

            {/* Invisible radial backdrop for contrast */}
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 rounded-[100%]"
              style={{
                width: "min(140vw, 68rem)",
                height: "32rem",
                background: "radial-gradient(circle at center, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 45%, transparent 75%)",
                filter: "blur(32px)",
              }}
            />

            {/* ── TITLE ── */}
            <motion.div
              className="relative z-10 inline-block"
              initial={{ opacity: 0, y: initialY }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: animEase, delay: 0.15 }}
            >
              <h1
                className="hero-title mx-auto max-w-5xl font-heading font-extrabold text-white text-[2.75rem] sm:text-[4rem] lg:text-[5rem] tracking-[0.3px] sm:tracking-normal leading-[0.95] sm:leading-[1.03]"
                style={{
                  textShadow: "0px 2px 4px rgba(0,0,0,0.6), 0px 8px 16px rgba(0,0,0,0.4), 0px 16px 32px rgba(0,0,0,0.3), 0px 0px 20px rgba(0,0,0,0.2)",
                }}
              >
                {hero.title}
              </h1>

              {/* Sparkles */}
              {isMobileHero && !shouldReduceMotion && (
                <>
                  <motion.div
                    className="pointer-events-none absolute -left-4 -top-3 text-ranch-yellow/60"
                    animate={{ opacity: [0.3, 0.7, 0.3], y: [0, -4, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Sparkles className="h-4 w-4 fill-ranch-yellow/40" />
                  </motion.div>
                  <motion.div
                    className="pointer-events-none absolute -right-3 -bottom-4 text-white/50"
                    animate={{ opacity: [0.2, 0.5, 0.2], y: [0, 4, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  >
                    <Sparkles className="h-3 w-3 fill-white/20" />
                  </motion.div>
                </>
              )}
            </motion.div>

            {/* ── SUBTITLE ── */}
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: animEase, delay: 0.38 }}
              className="relative z-10 mx-auto mt-[10px] sm:mt-5"
            >
              <p
                className="mx-auto font-sans font-semibold text-[16px] sm:text-xl leading-[1.3] sm:leading-8 text-white whitespace-nowrap overflow-hidden text-ellipsis max-w-[92vw] sm:whitespace-normal sm:max-w-2xl"
                style={{ 
                  textShadow: "0px 2px 6px rgba(0,0,0,0.6), 0px 4px 12px rgba(0,0,0,0.4)" 
                }}
              >
                {hero.subtitle}
              </p>
            </motion.div>

          </div>
        </div>

        {/* Opening Hours Card */}
        <motion.div
          className="relative z-10 w-full"
          initial={{ opacity: 0, y: initialY }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: animDuration, ease: animEase, delay: 0.6 }}
        >
          <div
            className="mx-auto flex w-full max-w-[94%] sm:max-w-2xl flex-col gap-4 rounded-[20px] sm:rounded-3xl p-4 sm:p-5 text-white sm:flex-row sm:items-center sm:justify-between"
            style={{
              background: "rgba(7, 27, 77, 0.35)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.2)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
            }}
          >
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 flex-none place-items-center rounded-2xl bg-white/5 text-ranch-yellow border border-white/5 drop-shadow-sm">
                <Clock size={22} />
              </span>
              <div>
                <p className="text-[13px] sm:text-sm font-black text-ranch-green tracking-wide uppercase">
                  {hero.status}
                </p>
                {openingHours.map((row) => (
                  <p
                    className="mt-0.5 text-sm font-bold text-white/95 tracking-wide"
                    key={row.day}
                  >
                    {row.day}: {row.time}
                  </p>
                ))}
              </div>
            </div>

            <a
              className="group inline-flex h-[52px] sm:h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-[15px] sm:text-[14px] font-black text-ranch-navy shadow-sm transition-all duration-200 hover:scale-[0.98] active:scale-[0.98] hover:shadow-[0_4px_14px_rgba(255,255,255,0.25)]"
              href={`tel:${contact.phoneCall}`}
            >
              <Phone size={18} className="transition-transform group-hover:-rotate-3 group-hover:scale-105" />
              Appeler maintenant
            </a>
          </div>
        </motion.div>

      </div>
    </section>
    
    </>
  );
}
