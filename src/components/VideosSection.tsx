import { useEffect, useRef, useState } from "react";
import { Play, Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { videos } from "../data/siteContent";
import SectionTitle from "./ui/SectionTitle";

const revealViewport = { once: true, amount: 0.2 };

export default function VideosSection() {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsSectionVisible(entry.isIntersecting),
      { rootMargin: "180px 0px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === activeIndex && isSectionVisible) {
        video.muted = !soundEnabled;
        video.volume = soundEnabled ? 1 : 0;
        video.play().catch(() => undefined);
      } else {
        video.pause();
        video.muted = true;
        video.volume = 0;
      }
    });
  }, [activeIndex, isSectionVisible, soundEnabled]);

  return (
    <section ref={sectionRef} className="section-pad relative overflow-hidden bg-[#F6FAFF] pt-12 pb-20 sm:pt-20 sm:pb-32 lg:pt-24">
      {/* Background decoration */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[800px] aspect-square rounded-full bg-[radial-gradient(circle,rgba(22,142,247,0.12)_0%,transparent_45%)] blur-2xl" />
      <div className="pointer-events-none absolute inset-0 pattern-dots opacity-5" />

      <div className="container-ranch relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={revealViewport}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <SectionTitle
            title="Vivez l’ambiance du Ranch en vidéo"
            subtitle="Découvrez l’énergie, les jeux et les moments forts du Ranch en vidéo."
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={revealViewport}
          transition={{ duration: 0.65, ease: "easeOut", delay: 0.08 }}
          className="relative mx-auto mt-12 h-[550px] w-full max-w-[100vw] sm:mt-16 sm:h-[650px] flex items-center justify-center"
        >
          <AnimatePresence initial={false}>
            {videos.map((video, index) => {
              // Map exactly 3 videos to positions: center (0), left (-1), right (1)
              let relativeIndex = index - activeIndex;
              if (relativeIndex > 1) relativeIndex -= 3;
              if (relativeIndex < -1) relativeIndex += 3;

              const isActive = relativeIndex === 0;
              const isLeft = relativeIndex === -1;
              const isRight = relativeIndex === 1;

              let animateState: "active" | "left" | "right" = "active";
              if (isLeft) animateState = "left";
              if (isRight) animateState = "right";

              const variants = {
                active: { x: "0%", scale: 1, rotate: 0, zIndex: 30, opacity: 1 },
                left: { x: "-65%", scale: 0.86, rotate: -6, zIndex: 10, opacity: 0.65 },
                right: { x: "65%", scale: 0.86, rotate: 6, zIndex: 10, opacity: 0.65 },
              };

              return (
                <motion.div
                  key={video.title}
                  className={`absolute w-[280px] sm:w-[360px] aspect-[9/16] rounded-[2rem] overflow-hidden bg-ranch-navy ${!isActive ? 'cursor-pointer hover:opacity-100 hover:scale-90 transition-opacity duration-300' : ''}`}
                  style={{
                    boxShadow: "0 24px 70px rgba(7, 27, 77, 0.16)",
                    border: "1px solid rgba(7, 27, 77, 0.08)"
                  }}
                  initial={false}
                  animate={variants[animateState]}
                  transition={{ type: "spring", stiffness: 220, damping: 25 }}
                  onClick={() => !isActive && setActiveIndex(index)}
                >
                  {/* Video or Placeholder */}
                  {video.src ? (
                    <video
                      ref={(el) => {
                        videoRefs.current[index] = el;
                      }}
                      src={video.src}
                      className="w-full h-full object-cover"
                      autoPlay={isActive && isSectionVisible}
                      muted={isActive ? !soundEnabled : true}
                      loop
                      playsInline
                      preload={isActive ? "metadata" : "none"}
                    />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${video.gradient} flex flex-col items-center justify-center p-6 text-center`}>
                       <span className="grid h-16 w-16 place-items-center rounded-full bg-white/20 text-white backdrop-blur shadow-sm">
                         <Play size={28} fill="currentColor" className="ml-1" />
                       </span>
                       <p className="mt-4 text-white font-bold opacity-90 drop-shadow-sm">Vidéo à venir</p>
                    </div>
                  )}

                  {/* Overlays */}
                  {!isActive && (
                     <div className="absolute inset-0 bg-[#061332]/40 flex items-center justify-center transition-colors hover:bg-transparent">
                        <div className="bg-white/15 border border-white/20 backdrop-blur-md rounded-full px-5 py-2.5 text-white text-sm font-bold flex items-center gap-2 shadow-sm">
                           <Play size={16} fill="currentColor" />
                           Cliquer pour voir
                        </div>
                     </div>
                  )}

                  {isActive && video.src && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSoundEnabled(!soundEnabled);
                      }}
                      className="absolute top-4 right-4 z-40 pointer-events-auto flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-xs font-bold text-white shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] backdrop-blur-md hover:bg-white/20 hover:scale-105 active:scale-95 transition-all duration-300"
                      aria-label={soundEnabled ? "Couper le son" : "Activer le son"}
                    >
                      {soundEnabled ? (
                        <>
                          <Volume2 size={14} className="animate-pulse" />
                          <span className="hidden sm:inline">Son activé</span>
                        </>
                      ) : (
                        <>
                          <VolumeX size={14} />
                          <span className="hidden sm:inline">Activer le son</span>
                        </>
                      )}
                    </button>
                  )}

                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-t from-[#061332]/95 via-[#061332]/40 to-transparent flex flex-col justify-end p-6 sm:p-8 pointer-events-none transition-opacity duration-500">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md shadow-sm">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ranch-coral opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-ranch-coral"></span>
                          </span>
                          En lecture
                        </span>
                      </div>
                      <h3 className="text-2xl sm:text-[1.75rem] font-heading font-extrabold text-white leading-[1.1] drop-shadow-md">
                        {video.title}
                      </h3>
                      {video.description && (
                        <p className="mt-2.5 text-sm sm:text-base text-white/85 font-medium leading-tight max-w-sm drop-shadow">
                          {video.description}
                        </p>
                      )}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-3 mt-10 relative z-20">
          {videos.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 shadow-sm ${
                activeIndex === idx ? "w-8 bg-ranch-blue" : "w-2.5 bg-ranch-navy/20 hover:bg-ranch-navy/40"
              }`}
              aria-label={`Aller à la vidéo ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
