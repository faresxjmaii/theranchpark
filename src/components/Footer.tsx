import { Facebook, Instagram, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { contact, navLinks, socialLinks } from "../data/siteContent";

function TikTokIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
    >
      <path
        d="M15.2 4.4c.5 2.8 2.1 4.5 4.4 4.8v3.4a8.2 8.2 0 0 1-4.3-1.4v5.1c0 3.4-2.2 5.7-5.6 5.7-3.1 0-5.3-2-5.3-4.9 0-3.2 2.6-5.3 6.1-4.8v3.5c-1.3-.4-2.5.2-2.5 1.4 0 1 .8 1.7 1.9 1.7 1.2 0 2-.8 2-2.4V4.4h3.3Z"
        fill="currentColor"
      />
    </svg>
  );
}

const socialIcons = {
  Facebook,
  Instagram,
  TikTok: TikTokIcon,
};

export default function Footer() {
  return (
    <footer className="bg-ranch-navy px-5 py-6 lg:py-10 text-white sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="container-ranch"
      >
        <div className="grid gap-6 sm:gap-8 lg:gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">

          <div className="flex flex-col">
            <div className="flex items-center justify-between lg:block">
              <a href="#accueil" className="inline-flex items-center">
                <img
                  alt={contact.logoAlt}
                  className="w-[85px] sm:w-[95px] lg:w-[140px] h-auto object-contain drop-shadow-md"
                  src={contact.logoSrc}
                />
                <span className="sr-only">{contact.name}</span>
              </a>

              {/* Mobile Social Icons */}
              <div className="flex gap-2 lg:hidden">
                {socialLinks.map((link) => {
                  const Icon = socialIcons[link.icon as keyof typeof socialIcons];
                  return (
                    <a
                      aria-label={link.label}
                      className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white transition-all duration-300 hover:scale-110 hover:bg-white hover:text-ranch-navy hover:shadow-[0_4px_14px_rgba(255,255,255,0.3)] active:scale-95"
                      href={link.href}
                      key={link.label}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            </div>

            <p className="mt-4 lg:mt-5 max-w-sm text-[13px] sm:text-sm lg:text-base leading-[1.6] lg:leading-8 text-white/70">
              Un espace familial chaleureux pour jouer, célébrer et partager de
              beaux moments à Route Radès - Ezzahra.
            </p>
          </div>

          <div>
            <h3 className="font-black text-[15px] lg:text-base">Navigation</h3>
            <div className="mt-3 lg:mt-4 grid grid-cols-2 lg:grid-cols-1 gap-2 lg:gap-3">
              {navLinks.map((link) => (
                <a
                  className="text-[13px] lg:text-sm font-bold text-white/68 transition hover:text-white"
                  href={link.href}
                  key={link.href}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-black text-[15px] lg:text-base">Contact</h3>
            <div className="mt-3 lg:mt-4 space-y-2 lg:space-y-3 text-[13px] lg:text-sm font-bold text-white/70">
              <a
                className="flex items-center gap-2 transition hover:text-white"
                href={`tel:${contact.phoneCall}`}
              >
                <Phone size={16} className="lg:w-[17px] lg:h-[17px]" />
                {contact.phoneDisplay}
              </a>
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 flex-none lg:w-[17px] lg:h-[17px]" />
                {contact.address}
              </p>
            </div>
          </div>

          <div className="hidden lg:block">
            <h3 className="font-black text-base">Social</h3>
            <div className="mt-4 flex gap-3">
              {socialLinks.map((link) => {
                const Icon = socialIcons[link.icon as keyof typeof socialIcons];
                return (
                  <a
                    aria-label={link.label}
                    className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition-all duration-300 hover:scale-110 hover:bg-white hover:text-ranch-navy hover:shadow-[0_4px_14px_rgba(255,255,255,0.3)] active:scale-95"
                    href={link.href}
                    key={link.label}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-6 lg:mt-8 border-t border-white/10 pt-4 lg:pt-6 text-[12px] lg:text-sm font-semibold text-white/55">
          © {new Date().getFullYear()} The Ranch Park. Tous droits réservés.
        </div>
      </motion.div>
    </footer>
  );
}
