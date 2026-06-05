import { motion } from "framer-motion";
import { Clock, Info, CalendarDays } from "lucide-react";
import { openingHours, openingStatusBadge } from "../data/siteContent";

const revealViewport = { once: true, amount: 0.2 };

export default function OpeningHours() {
  return (
    <section
      className="relative overflow-hidden scroll-mt-28 sm:scroll-mt-32"
      id="horaires"
    >
      {/* 1. Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/ranch-entrance.png')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          filter: "contrast(1.05) saturate(1.05)",
        }}
      />

      {/* 2. Premium Overlay (Lighter for more visibility) */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(180deg, rgba(16, 43, 96, 0.3) 0%, rgba(16, 43, 96, 0.2) 45%, rgba(16, 43, 96, 0.3) 100%)"
        }}
      />

      {/* 3. Soft White Fade Transitions */}
      {/* Top fade */}
      <div
        className="absolute top-0 left-0 right-0 h-32 sm:h-44 z-0 pointer-events-none"
        style={{
          background: `linear-gradient(
            180deg,
            rgba(255,255,255,1) 0%,
            rgba(255,255,255,0.7) 35%,
            rgba(255,255,255,0.0) 100%
          )`
        }}
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 sm:h-44 z-0 pointer-events-none"
        style={{
          background: `linear-gradient(
            0deg,
            rgba(255,255,255,1) 0%,
            rgba(255,255,255,0.7) 35%,
            rgba(255,255,255,0.0) 100%
          )`
        }}
      />

      {/* Main Content Area */}
      <div className="container-ranch relative z-10 px-5 pt-16 pb-20 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-28">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">

          {/* Left Side: Title & Emotion */}
          <motion.div
             initial={{ opacity: 0, y: 22 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={revealViewport}
             transition={{ duration: 0.65, ease: "easeOut" }}
             className="relative flex flex-col items-center lg:items-start lg:-translate-y-[28px]"
          >
             {/* Subtle glow for text readability */}
             <div className="absolute -inset-10 -z-10 rounded-full bg-[#071B4D]/20 blur-[80px] pointer-events-none" />

             {/* Premium Badge */}
             <div className="mb-6 flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-4 py-2 text-sm font-bold text-white shadow-sm backdrop-blur-lg mx-auto lg:mx-0">
               <CalendarDays size={16} />
               <span>Planning de visite</span>
             </div>

             <h2
               className="font-heading text-4xl font-bold tracking-normal sm:text-5xl lg:text-6xl text-center lg:text-left w-full"
               style={{
                 color: "rgba(255,255,255,0.98)",
                 textShadow: "0 2px 10px rgba(0,0,0,0.18)"
               }}
             >
               Nos horaires
             </h2>

             <p
               className="mt-5 text-lg leading-relaxed sm:text-xl text-center lg:text-left w-full"
               style={{
                 color: "rgba(255,255,255,0.88)",
                 maxWidth: "480px",
                 textShadow: "0 2px 10px rgba(0,0,0,0.18)"
               }}
             >
               Préparez votre visite au Ranch Park. Nous vous accueillons dans un cadre familial, verdoyant et chaleureux.
             </p>
          </motion.div>

          {/* Right Side: Premium Glass Planning Card */}
          <motion.div
             initial={{ opacity: 0, y: 22 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={revealViewport}
             transition={{ duration: 0.65, delay: 0.08, ease: "easeOut" }}
          >
             <div
                className="overflow-hidden rounded-3xl p-4 sm:p-6 transition-all duration-500 hover:-translate-y-1"
                style={{
                  background: "rgba(255, 255, 255, 0.24)",
                  backdropFilter: "blur(5px) saturate(1.15)",
                  WebkitBackdropFilter: "blur(5px) saturate(1.15)",
                  border: "1px solid rgba(255, 255, 255, 0.25)",
                  boxShadow: "0 20px 40px rgba(7, 27, 77, 0.08)"
                }}
             >
                {/* Card Header */}
                <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#071B4D]/10 pb-5">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 sm:h-12 sm:w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#168EF7] to-[#071B4D] text-white shadow-md">
                      <Clock size={20} className="sm:w-6 sm:h-6" strokeWidth={2.5} />
                    </span>
                    <div>
                      <h3 className="text-lg sm:text-xl font-black text-[#071B4D] leading-tight">Horaires du Ranch</h3>
                      <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-0.5">Ouverture régulière</p>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <span className="w-fit rounded-full bg-[#31C96B]/10 border border-[#31C96B]/25 px-3.5 py-1.5 text-xs sm:text-sm font-black text-[#28A758] shadow-sm flex items-center gap-1.5">
                     <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#31C96B] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#31C96B]"></span>
                     </span>
                    {openingStatusBadge}
                  </span>
                </div>

                {/* Timetable Rows */}
                <div className="flex flex-col gap-2.5">
                  {openingHours.map((row) => (
                    <div
                      className="group flex flex-col gap-1 p-3.5 sm:flex-row sm:items-center sm:justify-between transition-all duration-300 hover:bg-white"
                      style={{
                        background: "rgba(255, 255, 255, 0.90)",
                        border: "1px solid rgba(255, 255, 255, 0.95)",
                        boxShadow: "0 2px 8px rgba(7, 27, 77, 0.04)",
                        borderRadius: "16px"
                      }}
                      key={row.day}
                    >
                      <span className="text-sm sm:text-base font-black text-[#071B4D]">{row.day}</span>
                      <span className="text-lg sm:text-xl font-extrabold text-[#168EF7] transition-transform group-hover:scale-[1.01]">{row.time}</span>
                    </div>
                  ))}
                </div>

                {/* Info Note */}
                <div
                  className="mt-5 flex items-start gap-3 rounded-2xl p-3.5"
                  style={{
                    background: "rgba(235, 245, 255, 0.85)",
                    border: "1px solid rgba(16, 142, 247, 0.15)"
                  }}
                >
                  <Info className="mt-0.5 shrink-0 text-[#168EF7]" size={18} strokeWidth={2.5} />
                  <p className="text-xs sm:text-sm font-semibold leading-relaxed text-[#071B4D]">
                    Pour les jours de fêtes et les événements spéciaux, veuillez consulter
                    notre page Facebook ou nous contacter.
                  </p>
                </div>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
