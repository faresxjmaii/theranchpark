import { MapPin, Phone, Facebook, Instagram, Map } from "lucide-react";
import { motion } from "framer-motion";
import { contact } from "../data/siteContent";
import Button from "./ui/Button";
import Card from "./ui/Card";
import SectionTitle from "./ui/SectionTitle";

const TikTokIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
  </svg>
);

const revealViewport = { once: true, amount: 0.2 };

export default function LocationMap() {
  return (
    <section className="section-pad scroll-mt-28 bg-ranch-navy text-white sm:scroll-mt-32" id="contact">
      <div className="container-ranch">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={revealViewport}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <SectionTitle title="Comment venir au Ranch" inverse />
        </motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={revealViewport}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="relative min-h-[320px] lg:min-h-[420px] overflow-hidden rounded-3xl border border-white/10 shadow-premium"
          >
            <iframe
              src={contact.mapIframeSrc}
              className="absolute inset-0 h-full w-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps The Ranch Park"
            />
            <a
              className="absolute bottom-4 left-4 z-10 inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/95 px-4 py-2 text-sm font-black text-ranch-navy shadow-soft backdrop-blur transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-ranch-yellow"
              href={contact.mapsUrl}
              rel="noreferrer"
              target="_blank"
            >
              <Map className="h-4 w-4" strokeWidth={2.5} />
              Voir sur Google Maps
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={revealViewport}
            transition={{ duration: 0.65, ease: "easeOut", delay: 0.08 }}
            className="h-full"
          >
            <Card className="p-7 text-ranch-navy sm:p-8 h-full flex flex-col justify-between">
            <h3 className="text-3xl font-black text-center lg:text-left">{contact.name}</h3>
            <div className="mt-6 space-y-5">
              <p className="flex gap-3 font-bold leading-7 text-slate-600">
                <MapPin className="mt-1 h-5 w-5 flex-none text-ranch-blue" />
                <span>
                  {contact.address}
                  <br />
                  {contact.addressDetails}
                </span>
              </p>
              <p className="flex gap-3 font-bold text-slate-600">
                <Phone className="h-5 w-5 flex-none text-ranch-green" />
                Téléphone: {contact.phoneDisplay}
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <Button href={contact.mapsUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2">
                <Map className="w-[18px] h-[18px] stroke-[2.5px]" />
                <span>Ouvrir sur Google Maps</span>
              </Button>
              <Button href={`tel:${contact.phoneCall}`} variant="secondary" className="flex items-center justify-center gap-2">
                <span>Appeler maintenant</span>
              </Button>
            </div>

            {/* Social Media Links */}
            <div className="mt-5 pt-5 border-t border-slate-100/80 flex items-center justify-center gap-4">
              <a
                href={contact.facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="group flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 text-[#071B4D] shadow-[0_4px_12px_rgba(7,27,77,0.06)] transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-[#1877F2] hover:text-white hover:shadow-[0_8px_20px_rgba(24,119,242,0.3)]"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5 transition-transform duration-300" strokeWidth={2.5} />
              </a>
              <a
                href={contact.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="group flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 text-[#071B4D] shadow-[0_4px_12px_rgba(7,27,77,0.06)] transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-gradient-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF] hover:text-white hover:shadow-[0_8px_20px_rgba(221,42,123,0.3)]"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5 transition-transform duration-300" strokeWidth={2.5} />
              </a>
              <a
                href={contact.tiktokUrl}
                target="_blank"
                rel="noreferrer"
                className="group flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 text-[#071B4D] shadow-[0_4px_12px_rgba(7,27,77,0.06)] transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-black hover:text-white hover:shadow-[0_8px_20px_rgba(0,0,0,0.3)]"
                aria-label="TikTok"
              >
                <TikTokIcon className="h-[18px] w-[18px] transition-transform duration-300" />
              </a>
            </div>
          </Card>
        </motion.div>
        </div>
      </div>
    </section>
  );
}
