import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "light";
type ButtonSize = "sm" | "md" | "lg";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-ranch-rainbow text-white shadow-lift hover:-translate-y-0.5 hover:shadow-soft",
  secondary:
    "border border-ranch-blue/20 bg-white text-ranch-navy shadow-sm hover:-translate-y-0.5 hover:border-ranch-blue/40 hover:shadow-lift",
  ghost:
    "bg-transparent text-ranch-navy hover:bg-ranch-sky",
  light:
    "bg-white text-ranch-navy shadow-soft hover:-translate-y-0.5 hover:bg-ranch-sky",
};

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-10 px-4 text-sm",
  md: "min-h-12 px-5 text-sm",
  lg: "min-h-14 px-6 text-base",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-extrabold leading-none transition duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-ranch-yellow/60";

type SharedProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

type ButtonProps = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type AnchorProps = SharedProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

export default function Button(props: ButtonProps | AnchorProps) {
  const {
    children,
    className = "",
    variant = "primary",
    size = "md",
    ...rest
  } = props;
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if ("href" in props && props.href) {
    return (
      <a className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button
      className={classes}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
