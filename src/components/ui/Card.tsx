import type { HTMLAttributes } from "react";

export default function Card({
  className = "",
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-[24px] border border-[rgba(7,27,77,0.05)] bg-white shadow-card ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
