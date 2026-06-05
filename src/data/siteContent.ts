import activityBirthday from "../assets/images/activities/anniversaires.jpg";
import activityPlayground from "../assets/images/activities/aire-de-jeux.jpg";
import activityAnimations from "../assets/images/activities/animations-evenements.jpg";
import activityFamily from "../assets/images/activities/espace-familial.jpg";
import activityPedalo from "../assets/images/activities/pedalo.jpg";
import activityWaterball from "../assets/images/activities/waterball.jpg";

export const contact = {
  name: "The Ranch Park",
  logoSrc: "/the-ranch-park-logo-small.png",
  logoAlt: "Logo The Ranch Park",
  phoneDisplay: "+216 24 040 399",
  phoneCall: "+21624040399",
  whatsapp: "21624040399",
  whatsappMessage:
    "Bonjour The Ranch Park, je souhaite avoir plus d’informations.",
  birthdayWhatsappMessage:
    "Bonjour The Ranch Park, je souhaite réserver pour un anniversaire.",
  address: "Route Radès - Ezzahra",
  addressDetails: "Sur la gauche en direction d’Ezzahra",
  mapDescription: "Route Radès-Ezzahra, sur la gauche direction Ezzahra.",
  mapsUrl: "https://maps.app.goo.gl/d671FehHCTSScrWW8",
  googleReviewsUrl:
    "https://www.google.com/maps/place/The+Ranch+Park/@36.7509288,10.2802146,17z/data=!4m8!3m7!1s0x12fd49a971f53bcd:0x5997505741a07b0c!8m2!3d36.7509289!4d10.2850855!9m1!1b1!16s%2Fg%2F11hy_29sm8?entry=ttu&g_ep=EgoyMDI2MDUyNy4wIKXMDSoASAFQAw%3D%3D",
  mapIframeSrc:
    "https://maps.google.com/maps?q=36.7509289,10.2850855&z=16&output=embed",
  facebookUrl: "https://www.facebook.com/TheRanchPark",
  instagramUrl: "https://www.instagram.com/theranchpark/",
  tiktokUrl: "https://www.tiktok.com/@the_ranch_park",
};

export const socialLinks = [
  { label: "Facebook", href: contact.facebookUrl, icon: "Facebook" },
  { label: "Instagram", href: contact.instagramUrl, icon: "Instagram" },
  { label: "TikTok", href: contact.tiktokUrl, icon: "TikTok" },
];

export const navLinks = [
  { label: "Accueil", href: "#accueil" },
  { label: "Activités", href: "#activites" },
  { label: "Tarifs", href: "#tarifs" },
  { label: "Anniversaires", href: "#anniversaires" },
  { label: "Horaires", href: "#horaires" },
  { label: "Contact", href: "#contact" },
];

export const hero = {
  title: "The Ranch Park",
  imageSrc: "/ranch-hero-banner.png",
  imageAlt: "Aire de jeux colorée The Ranch Park au coucher du soleil",
  subtitle:
    "Le plaisir des enfants, le confort des parents",
  status: "Ouvert vendredi, samedi et dimanche",
  hours: "16:00 - 23:00",
};

export const activities = [
  {
    title: "Aire de jeux",
    description: "Un espace sécurisé et amusant pour les enfants.",
    meta: "15 DT / enfant",
    imageSrc: activityPlayground,
    imageAlt: "Enfants dans l'aire de jeux colorée The Ranch Park",
    imagePosition: "center center",
    icon: "Gamepad2",
    gradient: "from-sky-400 via-blue-500 to-violet-500",
    galleryImages: ["/ph/ph1.jpg", "/ph/ph2.jpg", "/ph/ph3.jpg", "/ph/ph4.jpg", "/ph/ph5.jpg", "/ph/ph6.jpg"],
  },
  {
    title: "Waterball",
    description:
      "Une activité fun et rafraîchissante pour les petits aventuriers.",
    meta: "5 DT / accès",
    imageSrc: activityWaterball,
    imageAlt: "Enfant dans une waterball au Ranch Park",
    imagePosition: "center center",
    icon: "Waves",
    gradient: "from-cyan-400 via-blue-500 to-sky-600",
    galleryImages: ["/ph/ph1.jpg", "/ph/ph2.jpg", "/ph/ph3.jpg", "/ph/ph4.jpg", "/ph/ph5.jpg", "/ph/ph6.jpg"],
  },
  {
    title: "Pédalo",
    description: "Un moment agréable sur l’eau en famille.",
    meta: "5 DT / accès",
    imageSrc: activityPedalo,
    imageAlt: "Enfant en pédalo dans le bassin The Ranch Park",
    imagePosition: "center center",
    icon: "Sailboat",
    gradient: "from-emerald-400 via-teal-500 to-blue-500",
    galleryImages: ["/ph/ph1.jpg", "/ph/ph2.jpg", "/ph/ph3.jpg", "/ph/ph4.jpg", "/ph/ph5.jpg", "/ph/ph6.jpg"],
  },
  {
    title: "Anniversaires",
    description:
      "Des formules adaptées pour célébrer des moments inoubliables.",
    meta: "Formules disponibles",
    imageSrc: activityBirthday,
    imageAlt: "Décoration d'anniversaire au Ranch Park",
    imagePosition: "center center",
    icon: "Cake",
    gradient: "from-pink-400 via-coral-500 to-yellow-400",
    galleryImages: ["/ph/ph1.jpg", "/ph/ph2.jpg", "/ph/ph3.jpg", "/ph/ph4.jpg", "/ph/ph5.jpg", "/ph/ph6.jpg"],
  },
  {
    title: "Espace familial",
    description: "Un cadre agréable pour les parents et les enfants.",
    meta: "Toute la famille",
    imageSrc: activityFamily,
    imageAlt: "Familles installées en soirée dans l'espace familial",
    imagePosition: "center center",
    icon: "UsersRound",
    gradient: "from-yellow-300 via-lime-400 to-green-500",
    galleryImages: ["/ph/ph1.jpg", "/ph/ph2.jpg", "/ph/ph3.jpg", "/ph/ph4.jpg", "/ph/ph5.jpg", "/ph/ph6.jpg"],
  },
  {
    title: "Animations & événements",
    description:
      "Des journées spéciales, fêtes, saisons et animations.",
    meta: "Selon programme",
    imageSrc: activityAnimations,
    imageAlt: "Animation enfants avec personnages et familles au Ranch Park",
    imagePosition: "center center",
    icon: "PartyPopper",
    gradient: "from-violet-500 via-purple-500 to-blue-500",
    galleryImages: ["/ph/ph1.jpg", "/ph/ph2.jpg", "/ph/ph3.jpg", "/ph/ph4.jpg", "/ph/ph5.jpg", "/ph/ph6.jpg"],
  },
];

export const prices = [
  {
    title: "Aire de jeux",
    price: "15 DT",
    unit: "/ enfant",
    description: "Accès illimité",
    accent: "#FFD22E",
  },
  {
    title: "Waterball",
    price: "5 DT",
    unit: "/ accès",
    description: "Activité aquatique",
    accent: "#168EF7",
  },
  {
    title: "Pédalo",
    price: "5 DT",
    unit: "/ accès",
    description: "Activité aquatique",
    accent: "#31C96B",
  },
];

export const openingHours = [
  { day: "Vendredi, Samedi, Dimanche", time: "16:00 - 23:00" },
];

export const openingStatusBadge = "Ouvert le week-end";

export const birthdayOffers = [
  {
    title: "Paillote standard",
    typeLabel: "Paillote réservée",
    price: "350 DT",
    description:
      "Elle comprend 200 DT de consommation en boissons et peut accueillir jusqu’à 20 personnes.",
    features: [
      "Espace réservé",
      "Idéal pour les petites fêtes familiales",
      "200 DT de consommation en boissons inclus",
      "Jusqu’à 20 personnes",
      "Décoration à thème à votre charge",
    ],
    cta: "Réserver cette formule",
  },
  {
    title: "Grande paillote",
    typeLabel: "Paillote réservée",
    price: "450 DT",
    description:
      "Elle comprend 250 DT de consommation en boissons et peut accueillir environ 30 à 35 personnes.",
    features: [
      "Espace plus grand et confortable",
      "Idéal pour les anniversaires avec plus d’invités",
      "250 DT de consommation en boissons inclus",
      "Environ 30 à 35 personnes",
      "Décoration à thème à votre charge",
    ],
    cta: "Réserver cette formule",
  },
  {
    title: "Réservation table en terrasse",
    typeLabel: "Table en terrasse",
    price: "50 DT",
    priceLabel: "Droit d’anniversaire",
    description:
      "Une solution simple pour fêter un anniversaire en terrasse avec une consommation minimum par adulte.",
    features: [
      "Réservation table en terrasse",
      "Droit d’anniversaire : 50 DT",
      "Minimum consommation : 10 DT par adulte",
      "Idéal pour les petites réservations simples",
      "Décoration à thème à votre charge",
    ],
    cta: "Réserver une table",
  },
];

export const birthdayNote =
  "À noter : la décoration à thème est à votre charge.";


export const videos = [
  { 
    title: "Ambiance générale", 
    description: "Découvrez l’ambiance familiale du Ranch.",
    src: "/videos/ranch-park.mp4",
    gradient: "from-ranch-blue to-ranch-violet" 
  },
  { 
    title: "Activités enfants", 
    description: "Des moments de jeu et de joie pour les enfants.",
    src: "/videos/top.mp4",
    gradient: "from-ranch-green to-ranch-blue" 
  },
  {
    title: "Anniversaires & événements",
    description: "Des souvenirs à partager en famille.",
    src: "/videos/top2.mp4",
    gradient: "from-ranch-coral to-ranch-yellow",
  },
];

export const rentalUses = [
  "Anniversaires",
  "Sorties scolaires",
  "Réunions familiales",
  "Petits événements privés",
  "Moments entre familles",
];

export const reviews = [
  {
    name: "Salah Chatti",
    initials: "SC",
    meta: "3 avis",
    date: "il y a 9 mois",
    rating: 5,
    source: "google",
    text: "Endroit propre et agréable, le park est très bien entretenu.\nIl y a beaucoup d’animateurs qui surveillent et assistent les enfants dans l’aire de jeu.\nIl n’y a qu’un seul accès à l’aire de jeu, c’est rassurant côté sécurité.\nOn y est très bien servis et on y mange bien.\nLes week-ends et les heures de pointe peuvent être chargées; il faut être patient avec les serveurs (saisonniers pour la plupart) et on peut passer un très bon moment.",
  },
  {
    name: "Marwa Omrane",
    initials: "MO",
    meta: "Local Guide · 29 avis · 82 photos",
    date: "il y a 9 mois",
    rating: 5,
    source: "google",
    text: "Services\nAmbiance\nY des animatrices qui s’occupent des enfants\nIdéal pr les parents et les enfants\nBravo",
  },
  {
    name: "Amira",
    initials: "A",
    meta: "Local Guide · 296 avis · 363 photos",
    date: "Modifié il y a 2 ans",
    rating: 5,
    source: "google",
    text: "Un espace de jeux familial par excellence !\nL’air de jeux est très bien encadré et les enfants sont surveillés par un personnel supers veillant !",
  },
  {
    name: "Sanaa",
    initials: "S",
    meta: "8 avis",
    date: "il y a un an",
    rating: 5,
    source: "google",
    text: "Endroit très agréable pour emmener les enfants jouer et se détendre autour d'un café.\nSon emplacement, à l'écart de la rue, est un vrai plus, car il permet de se sentir en toute tranquillité.",
  },
  {
    name: "Olfa Olfa",
    initials: "OO",
    meta: "Recommandé sur Facebook",
    date: "",
    rating: 5,
    source: "facebook",
    isArabic: true,
    text: "من أعز البلايص الي مشينالهم بصغارنا وحتى احنا اذا ننفردو بقعة تهبل وخاصة الهواء الطلق الي فيها روعة",
  },
  {
    name: "Lamia",
    initials: "L",
    meta: "2 avis · 4 photos",
    date: "il y a 10 mois",
    rating: 5,
    source: "google",
    text: "Très agréable endroit pour grands et petits\nPersonnel très accueillant et souriant, à conseiller",
  },
];

export const whatsAppUrl = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
  contact.whatsappMessage,
)}`;

export const birthdayWhatsAppUrl = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
  contact.birthdayWhatsappMessage,
)}`;
