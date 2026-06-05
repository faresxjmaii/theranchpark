import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  title: string;
}

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default function GalleryModal({ isOpen, onClose, images, title }: GalleryModalProps) {
  const [[page, direction], setPage] = useState([0, 0]);

  // Wrap index to avoid out of bounds
  const imageIndex = images.length > 0 ? Math.abs(page % images.length) : 0;

  const paginate = useCallback((newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  }, [page]);

  // Reset page when modal is closed
  useEffect(() => {
    if (!isOpen) {
      setPage([0, 0]);
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "ArrowRight") {
        paginate(1);
      } else if (e.key === "ArrowLeft") {
        paginate(-1);
      } else if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, paginate, onClose]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-[#071B4D]/90 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Container */}
          <div 
            className="relative z-10 flex h-full w-full flex-col items-center justify-center p-4 sm:p-8"
            onClick={onClose}
          >
            {/* Header */}
            <div className="absolute top-0 left-0 w-full flex items-center justify-between p-4 sm:p-6 text-white z-20">
              <div 
                className="flex flex-col cursor-default"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-lg sm:text-2xl font-black">{title}</h3>
                <span className="text-sm font-semibold opacity-70">
                  {imageIndex + 1} / {images.length}
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="grid h-10 w-10 sm:h-12 sm:w-12 place-items-center rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label="Fermer la galerie"
              >
                <X size={24} strokeWidth={2.5} />
              </button>
            </div>

            {/* Image Area */}
            <div className="relative flex h-full w-full max-w-6xl items-center justify-center">
              <AnimatePresence initial={false} custom={direction}>
                <motion.img
                  key={page}
                  src={images[imageIndex]}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);

                    if (swipe < -swipeConfidenceThreshold) {
                      paginate(1);
                    } else if (swipe > swipeConfidenceThreshold) {
                      paginate(-1);
                    }
                  }}
                  onClick={(e) => e.stopPropagation()}
                  className="absolute max-h-[80vh] max-w-full rounded-2xl sm:rounded-[2rem] object-contain shadow-2xl cursor-default"
                  alt={`${title} - Photo ${imageIndex + 1}`}
                  draggable={false}
                />
              </AnimatePresence>

              {/* Navigation Arrows */}
              <button
                className="absolute left-2 sm:left-4 grid h-12 w-12 sm:h-16 sm:w-16 place-items-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/50"
                onClick={(e) => {
                  e.stopPropagation();
                  paginate(-1);
                }}
                aria-label="Photo précédente"
              >
                <ChevronLeft size={32} strokeWidth={2.5} className="mr-1 sm:mr-2" />
              </button>
              <button
                className="absolute right-2 sm:right-4 grid h-12 w-12 sm:h-16 sm:w-16 place-items-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/50"
                onClick={(e) => {
                  e.stopPropagation();
                  paginate(1);
                }}
                aria-label="Photo suivante"
              >
                <ChevronRight size={32} strokeWidth={2.5} className="ml-1 sm:ml-2" />
              </button>
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
