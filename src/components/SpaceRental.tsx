import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { rentalUses, whatsAppUrl } from "../data/siteContent";
import Button from "./ui/Button";
import SectionTitle from "./ui/SectionTitle";
import { motion, useReducedMotion } from "framer-motion";

const rentalImages = [
  "/ph/ph1.jpg",
  "/ph/ph2.jpg",
  "/ph/ph3.jpg",
  "/ph/ph4.jpg",
  "/ph/ph5.jpg",
  "/ph/ph6.jpg",
  "/ph/ph7.jpg",
  "/ph/ph8.jpg",
];

const revealViewport = { once: true, amount: 0.2 };

export default function SpaceRental() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi || !isPlaying || shouldReduceMotion) return;

    const autoplay = setInterval(() => {
      emblaApi.scrollNext();
    }, 4500);

    return () => clearInterval(autoplay);
  }, [emblaApi, isPlaying, shouldReduceMotion]);

  return (
    <section className="section-pad relative bg-[#FAFCFF]">
      <div className="container-ranch grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-center">

        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={revealViewport}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="order-2 lg:order-1"
        >
          <SectionTitle
            align="mobile-center"
            title="Notre espace est aussi disponible à la location"
            subtitle="Un cadre spacieux et agréable pour vos anniversaires, sorties scolaires, réunions familiales et événements privés."
          />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {rentalUses.map((use) => (
              <li
                className="flex items-center gap-3 rounded-[1rem] border border-slate-100 bg-white p-3.5 text-[14.5px] font-bold text-ranch-navy shadow-[0_4px_12px_rgba(7,27,77,0.03)] transition-transform hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(7,27,77,0.06)]"
                key={use}
              >
                <span className="grid h-6 w-6 flex-none place-items-center rounded-full bg-[#E8F3FF] text-ranch-blue">
                  <Check size={14} strokeWidth={3} />
                </span>
                {use}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex justify-center lg:justify-start">
            <Button href={whatsAppUrl} size="md" className="w-full sm:w-auto shadow-[0_8px_20px_rgba(139,92,246,0.2)] hover:shadow-[0_12px_24px_rgba(139,92,246,0.3)]">
              Demander les détails
            </Button>
          </div>
        </motion.div>

        {/* Carousel Section */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={revealViewport}
          transition={{ duration: 0.65, ease: "easeOut", delay: 0.08 }}
          className="order-1 lg:order-2"
        >
          {/* Premium Outer Card with inner padding */}
          <div
            className="relative rounded-[32px] bg-white p-3 sm:p-4 shadow-[0_20px_40px_rgba(7,27,77,0.06)] ring-1 ring-slate-100"
            onMouseEnter={() => setIsPlaying(false)}
            onMouseLeave={() => setIsPlaying(true)}
            onTouchStart={() => setIsPlaying(false)}
            onTouchEnd={() => setIsPlaying(true)}
          >
            {/* Inner Frame with restricted aspect ratio */}
            <div className="relative w-full aspect-video rounded-[20px] overflow-hidden bg-slate-50">
              <div className="overflow-hidden h-full w-full" ref={emblaRef}>
                <div className="flex h-full w-full touch-pan-y">
                  {rentalImages.map((src, index) => (
                    <div className="relative h-full w-full flex-[0_0_100%] min-w-0" key={index}>
                      <img
                        src={src}
                        alt={`Espace disponible à la location au Ranch Park ${index + 1}`}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={scrollPrev}
                className="absolute left-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ranch-navy shadow-[0_4px_12px_rgba(0,0,0,0.1)] backdrop-blur-md transition-all hover:scale-105 hover:bg-white active:scale-95"
                aria-label="Image précédente"
              >
                <ChevronLeft size={20} className="mr-0.5" />
              </button>
              <button
                onClick={scrollNext}
                className="absolute right-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ranch-navy shadow-[0_4px_12px_rgba(0,0,0,0.1)] backdrop-blur-md transition-all hover:scale-105 hover:bg-white active:scale-95"
                aria-label="Image suivante"
              >
                <ChevronRight size={20} className="ml-0.5" />
              </button>

              {/* Pagination Dots */}
              <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-20">
                {rentalImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => emblaApi?.scrollTo(index)}
                    aria-label={`Aller à l'image ${index + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === selectedIndex
                        ? "w-5 bg-white shadow-sm"
                        : "w-1.5 bg-white/50 hover:bg-white/80"
                    }`}
                  />
                ))}
              </div>

              {/* Subtle Gradient Overlay at bottom for dots contrast */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
