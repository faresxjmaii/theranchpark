type SectionTitleProps = {
  id?: string;
  title: string;
  titleAriaLabel?: string;
  titleHref?: string;
  subtitle?: string;
  align?: "left" | "center" | "mobile-center";
  inverse?: boolean;
};

export default function SectionTitle({
  id,
  title,
  titleAriaLabel,
  titleHref,
  subtitle,
  align = "center",
  inverse = false,
}: SectionTitleProps) {
  const titleClasses = `section-title font-heading text-3xl font-bold tracking-normal sm:text-4xl lg:text-5xl ${
    inverse ? "text-white" : "text-ranch-navy"
  }`;

  return (
    <div
      id={id}
      className={`mx-auto max-w-3xl scroll-mt-36 ${
        align === "center"
          ? "text-center"
          : align === "mobile-center"
            ? "text-center lg:text-left"
            : "text-left"
      }`}
    >
      {titleHref ? (
        <h2>
          <a
            aria-label={titleAriaLabel}
            className={`${titleClasses} group inline-block cursor-pointer transition-colors duration-300 hover:text-ranch-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ranch-blue`}
            href={titleHref}
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="bg-gradient-to-r from-current to-current bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 group-hover:bg-[length:100%_2px] group-focus-visible:bg-[length:100%_2px]">
              {title}
            </span>
          </a>
        </h2>
      ) : (
        <h2 className={titleClasses}>{title}</h2>
      )}
      {subtitle ? (
        <p
          className={`section-subtitle mt-4 text-base leading-8 sm:text-lg ${
            inverse ? "text-white/90 font-medium" : "text-slate-600"
          }`}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
