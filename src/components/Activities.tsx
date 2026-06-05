import {
  Cake,
  Gamepad2,
  PartyPopper,
  Sailboat,
  UsersRound,
  Waves,
  Camera,
} from "lucide-react";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { activities } from "../data/siteContent";
import SectionTitle from "./ui/SectionTitle";
import GalleryModal from "./ui/GalleryModal";

const cardEase = [0.215, 0.61, 0.355, 1] as const;

const activityIcons = {
  Cake,
  Gamepad2,
  PartyPopper,
  Sailboat,
  UsersRound,
  Waves,
};

export default function Activities() {
  const [activeGallery, setActiveGallery] = useState<{ images: string[], title: string } | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.62,
        delay: shouldReduceMotion ? 0 : index * 0.06,
        ease: cardEase,
      },
    }),
  };

  return (
    <section
      className="relative scroll-mt-28 bg-ranch-navy activities-section sm:scroll-mt-32"
      id="activites"
    >

      <div className="container-ranch relative z-10">
        {/* Section Header */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <SectionTitle
            title="Nos activités"
            subtitle="Des moments de jeu, de détente et de partage pour toute la famille."
            inverse={true}
          />
        </motion.div>

        {/* Cards grid */}
        <div className="activities-grid mt-10 sm:mt-14 grid grid-cols-2 gap-3 sm:gap-6 xl:grid-cols-3">
          {activities.map((activity, index) => {
            const Icon =
              activityIcons[activity.icon as keyof typeof activityIcons] ??
              Waves;

            return (
              <motion.article
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.18 }}
                variants={cardVariants}
                className="activities-card group overflow-hidden rounded-3xl border border-white/10 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-premium relative"
                key={activity.title}
                style={{
                  boxShadow: "0 18px 45px rgba(0,0,0,0.18)",
                }}
              >
                {/* Image area */}
                <div
                  className="visual-card relative overflow-hidden h-[120px] sm:h-[240px]"
                >
                  <img
                    alt={activity.imageAlt}
                    className="activity-photo h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                    loading="lazy"
                    src={activity.imageSrc}
                    style={{ objectPosition: activity.imagePosition }}
                  />

                  {/* Subtle gradient overlay — let photos breathe */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to bottom, rgba(7,27,77,0.04) 0%, rgba(7,27,77,0.22) 100%)",
                    }}
                  />

                  {/* Subtle inner ring */}
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-t-3xl" />

                  {/* Icon badge — bottom left */}
                  <div
                    className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 grid h-8 w-8 sm:h-12 sm:w-12 place-items-center rounded-xl sm:rounded-2xl text-ranch-navy shadow-soft"
                    style={{
                      background: "rgba(255,255,255,0.92)",
                      backdropFilter: "blur(10px)",
                      WebkitBackdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.4)",
                    }}
                  >
                    <Icon className="w-4 h-4 sm:w-[22px] sm:h-[22px]" strokeWidth={2.5} />
                  </div>

                  {/* Price / meta badge — top right */}
                  <span
                    className="absolute right-2 top-2 sm:right-4 sm:top-4 rounded-full px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-black text-ranch-navy"
                    style={{
                      background: "rgba(255,255,255,0.88)",
                      backdropFilter: "blur(10px)",
                      WebkitBackdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.35)",
                      boxShadow: "0 2px 10px rgba(7,27,77,0.10)",
                      color: "#071B4D",
                    }}
                  >
                    {activity.meta}
                  </span>
                </div>

                {/* Card body */}
                <div className="p-3.5 sm:p-6 relative">
                  {/* Camera / Gallery Button — floating on border line */}
                  {activity.galleryImages && activity.galleryImages.length > 0 && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setActiveGallery({ images: activity.galleryImages, title: activity.title });
                      }}
                      className="absolute -translate-y-1/2 right-3 sm:right-6 top-0 grid h-9 w-9 sm:h-12 sm:w-12 place-items-center rounded-full bg-white text-ranch-navy shadow-[0_4px_14px_rgba(7,27,77,0.15)] hover:shadow-[0_6px_20px_rgba(7,27,77,0.25)] hover:scale-105 active:scale-95 transition-all z-20 focus:outline-none focus:ring-2 focus:ring-ranch-navy/30 border border-slate-100"
                      aria-label={`Voir la galerie de photos pour ${activity.title}`}
                    >
                      <Camera className="w-[18px] h-[18px] sm:w-6 sm:h-6 text-ranch-navy" strokeWidth={2.2} />
                    </button>
                  )}

                  <h3 className="text-[15px] sm:text-xl font-black text-ranch-navy leading-tight">
                    {activity.title}
                  </h3>
                  <p className="mt-1.5 sm:mt-3 text-xs sm:text-sm leading-relaxed sm:leading-7 text-slate-500">
                    {activity.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Smooth transition to light section */}
      <div 
        className="pointer-events-none absolute bottom-0 left-0 w-full h-[80px] sm:h-[120px] lg:h-[180px] z-0 hidden md:block" 
        style={{
          background: "linear-gradient(to bottom, rgba(7,27,77,0) 0%, #0B2A6F 25%, #DCEEFF 70%, #F6FAFF 100%)"
        }}
      />

      <GalleryModal
        isOpen={activeGallery !== null}
        onClose={() => setActiveGallery(null)}
        images={activeGallery?.images || []}
        title={activeGallery?.title || ""}
      />
    </section>
  );
}
