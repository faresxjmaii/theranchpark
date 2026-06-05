import { Star } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { contact, reviews } from "../data/siteContent";
import SectionTitle from "./ui/SectionTitle";

function GoogleMark() {
  return (
    <span
      aria-hidden="true"
      className="inline-grid h-8 w-8 flex-none place-items-center rounded-full border border-slate-200/80 bg-white shadow-sm"
    >
      <svg className="h-4 w-4" viewBox="0 0 24 24">
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          fill="#4285F4"
        />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="#34A853"
        />
        <path
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
          fill="#FBBC05"
        />
        <path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          fill="#EA4335"
        />
      </svg>
    </span>
  );
}

function FacebookMark() {
  return (
    <span
      aria-hidden="true"
      className="inline-grid h-8 w-8 flex-none place-items-center rounded-full border border-slate-200/80 bg-white shadow-sm"
    >
      <svg className="h-4 w-4 fill-[#1877F2]" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    </span>
  );
}

const avatarColors = [
  "bg-gradient-to-br from-blue-700 to-blue-900",
  "bg-gradient-to-br from-indigo-600 to-purple-700",
  "bg-gradient-to-br from-teal-500 to-emerald-700",
  "bg-gradient-to-br from-blue-500 to-cyan-600",
  "bg-gradient-to-br from-violet-500 to-fuchsia-600",
  "bg-gradient-to-br from-sky-600 to-blue-800",
];

const revealEase = [0.215, 0.61, 0.355, 1] as const;
const revealViewport = { once: true, amount: 0.2 };

export default function Reviews() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    loop: true,
    skipSnaps: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const toggleExpand = (index: number) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const renderText = (text: string, index: number, isArabic?: boolean) => {
    const isLong = text.length > 180;
    const isExpanded = expanded[index];
    const displayText = isLong && !isExpanded ? text.slice(0, 175) + "..." : text;

    return (
      <div
        className={`mt-4 text-[14.5px] leading-relaxed text-slate-600 ${
          isArabic ? "text-right font-sans font-semibold text-lg" : "font-medium"
        }`}
        dir={isArabic ? "rtl" : "ltr"}
      >
        <p className="whitespace-pre-line">“{displayText}”</p>
        {isLong && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleExpand(index);
            }}
            className="mt-2 text-xs font-bold text-ranch-blue hover:text-ranch-navy transition-colors focus:outline-none"
          >
            {isExpanded ? "Voir moins" : "Voir plus"}
          </button>
        )}
      </div>
    );
  };

  return (
    <section className="section-pad relative scroll-mt-28 bg-[#F6FAFF] sm:scroll-mt-32" id="avis">
      <div className="mx-auto w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={revealViewport}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <SectionTitle
            title="Ce que nos visiteurs disent"
            subtitle="Avis réels partagés par nos familles sur Google et Facebook"
          />
        </motion.div>

        {/* Carousel Area (shown on mobile & tablet) */}
        <div className="relative mt-8 sm:mt-12 lg:hidden -mx-4 sm:-mx-6">
          {/* Viewport */}
          <div className="overflow-hidden py-4 px-1" ref={emblaRef}>
            <div className="flex items-stretch touch-pan-y">
              {reviews.map((review, index) => {
                const isActive = index === selectedIndex;
                const avatarBg = avatarColors[index % avatarColors.length];

                return (
                  <div
                    className="min-w-0 flex-[0_0_82%] px-2.5 sm:flex-[0_0_55%] sm:px-4 md:flex-[0_0_45%]"
                    key={index}
                  >
                    <article
                      className={`relative overflow-hidden rounded-[24px] border border-slate-200/60 bg-white p-5 sm:p-7 transition-all duration-500 ease-out will-change-transform h-full flex flex-col justify-between ${
                        isActive
                          ? "scale-100 opacity-100 blur-none z-10 shadow-[0_20px_60px_rgba(7,27,77,0.08)]"
                          : "scale-[0.93] opacity-60 blur-[1px] z-0 shadow-sm"
                      }`}
                    >
                      <div>
                        {/* Card Header */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex min-w-0 items-center gap-3">
                            <div
                              className={`grid h-11 w-11 flex-none place-items-center rounded-full text-sm font-black tracking-wide text-white shadow-sm ${avatarBg}`}
                            >
                              {review.initials}
                            </div>
                            <div className="min-w-0">
                              <h3 className="truncate text-[15px] font-bold leading-tight text-ranch-navy">
                                {review.name}
                              </h3>
                              {review.meta && (
                                <p className="mt-0.5 text-[11px] font-semibold text-slate-400 truncate">
                                  {review.meta}
                                </p>
                              )}
                            </div>
                          </div>
                          {review.source === "facebook" ? <FacebookMark /> : <GoogleMark />}
                        </div>

                        {/* Stars & Date */}
                        <div className="mt-5 flex items-center justify-between">
                          <div
                            aria-label={`${review.rating} étoiles`}
                            className="flex gap-0.5"
                          >
                            {review.rating && Array.from({ length: review.rating }).map((_, starIndex) => (
                              <Star
                                aria-hidden="true"
                                className="h-[15px] w-[15px]"
                                color="#FBBC05"
                                fill="#FBBC05"
                                key={starIndex}
                                strokeWidth={2.4}
                              />
                            ))}
                          </div>
                          {review.date && (
                            <span className="text-[12px] font-semibold text-slate-400">
                              {review.date}
                            </span>
                          )}
                        </div>

                        {/* Text */}
                        {renderText(review.text, index, review.isArabic)}
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Carousel Indicators (Dots) */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                aria-label={`Aller à l'avis ${index + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === selectedIndex
                    ? "w-6 bg-ranch-blue"
                    : "w-1.5 bg-slate-300"
                }`}
                onClick={() => emblaApi?.scrollTo(index)}
              />
            ))}
          </div>
        </div>

        {/* Grid Area (shown on desktop only) */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8 mt-12">
          {reviews.map((review, index) => {
            const avatarBg = avatarColors[index % avatarColors.length];

            return (
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={revealViewport}
                transition={{ duration: 0.62, ease: revealEase, delay: index * 0.05 }}
                className="relative overflow-hidden rounded-[28px] border border-slate-200/50 bg-white p-7 shadow-[0_12px_40px_rgba(7,27,77,0.03)] hover:shadow-[0_20px_50px_rgba(7,27,77,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full"
                key={index}
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div
                        className={`grid h-11 w-11 flex-none place-items-center rounded-full text-sm font-black tracking-wide text-white shadow-sm ${avatarBg}`}
                      >
                        {review.initials}
                      </div>
                      <div className="min-w-0">
                        <h3 className="truncate text-[15.5px] font-bold leading-tight text-ranch-navy">
                          {review.name}
                        </h3>
                        {review.meta && (
                          <p className="mt-0.5 text-[11px] font-semibold text-slate-400 truncate">
                            {review.meta}
                          </p>
                        )}
                      </div>
                    </div>
                    {review.source === "facebook" ? <FacebookMark /> : <GoogleMark />}
                  </div>

                  {/* Stars & Date */}
                  <div className="mt-5 flex items-center justify-between">
                    <div
                      aria-label={`${review.rating} étoiles`}
                      className="flex gap-0.5"
                    >
                      {review.rating && Array.from({ length: review.rating }).map((_, starIndex) => (
                        <Star
                          aria-hidden="true"
                          className="h-[15px] w-[15px]"
                          color="#FBBC05"
                          fill="#FBBC05"
                          key={starIndex}
                          strokeWidth={2.4}
                        />
                      ))}
                    </div>
                    {review.date && (
                      <span className="text-[12px] font-semibold text-slate-400">
                        {review.date}
                      </span>
                    )}
                  </div>

                  {/* Text */}
                  {renderText(review.text, index, review.isArabic)}
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-10 flex justify-center sm:mt-12">
          <a
            className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-slate-200/80 bg-white px-6 py-3.5 text-[14.5px] font-bold text-ranch-navy shadow-sm outline-none transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md focus:ring-2 focus:ring-ranch-blue focus:ring-offset-2"
            href={contact.googleReviewsUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            <GoogleMark />
            <span>Voir tous les avis sur Google</span>
            <span
              aria-hidden="true"
              className="text-ranch-blue transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
