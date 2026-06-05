import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./ui/Button";
import { contact, navLinks, whatsAppUrl } from "../data/siteContent";
import { icons } from "./iconMap";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { Menu, X } = icons;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1], delay: 0.05 }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4 transition duration-300 sm:px-6 lg:px-8"
    >
      <nav
        className={`mobile-nav-enter container-ranch flex h-[64px] items-center justify-between rounded-full border px-4 transition-all duration-500 sm:px-5 lg:h-[72px] lg:px-6 ${
          scrolled
            ? "border-[rgba(7,27,77,0.08)] bg-[rgba(255,255,255,0.88)] shadow-[0_18px_55px_rgba(7,27,77,0.12)] backdrop-blur-[18px]"
            : "border-[rgba(255,255,255,0.18)] bg-[rgba(7,27,77,0.38)] shadow-[0_18px_55px_rgba(0,0,0,0.22)] backdrop-blur-[18px]"
        }`}
        aria-label="Navigation principale"
      >
        <a href="#accueil" className="flex items-center">
          <img
            alt={contact.logoAlt}
            className="h-[35px] w-auto object-contain drop-shadow-md sm:h-[42px] lg:h-[50px]"
            src={contact.logoSrc}
          />
          <span className="sr-only">{contact.name}</span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <a
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                scrolled
                  ? "text-ranch-navy hover:bg-ranch-sky hover:text-ranch-blue"
                  : "text-white drop-shadow hover:bg-white/18"
              }`}
              href={link.href}
              key={link.href}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:block">
          <Button href={whatsAppUrl} size="sm">
            Réserver
          </Button>
        </div>

        <button
          aria-expanded={isOpen}
          aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          className={`grid h-11 w-11 place-items-center rounded-full shadow-sm lg:hidden transition-colors ${
            scrolled ? "bg-ranch-sky text-ranch-navy hover:bg-ranch-blue hover:text-white" : "bg-white/20 text-white hover:bg-white/30"
          }`}
          onClick={() => setIsOpen((value) => !value)}
          type="button"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -12 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
            className="mx-auto mt-3 max-w-7xl rounded-3xl border border-white/70 bg-white/94 px-5 py-5 shadow-soft backdrop-blur-xl lg:hidden overflow-hidden"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  className="rounded-2xl px-4 py-3 text-base font-semibold text-ranch-navy transition hover:bg-ranch-sky"
                  href={link.href}
                  key={link.href}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Button href={whatsAppUrl} className="mt-2 w-full">
                Réserver
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
