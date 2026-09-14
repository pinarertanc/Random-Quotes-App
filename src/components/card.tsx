import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`
        relative rounded-2xl sm:rounded-3xl p-4 sm:p-6
        /* Dengeli Cam Opaklığı */
        bg-white/20 dark:bg-black/30
        /* Dengeli Buzlanma ve Renk Doygunluğu */
        backdrop-blur-md backdrop-saturate-150
        /* Cam Kenarlığı */
        border border-white/40 dark:border-white/15
        /* Gölge */
        shadow-[0_8px_32px_0_rgba(0,0,0,0.12)]
        dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.4)]
        transition-all duration-300
        ${className}
      `}
    >
      {children}
    </div>
  );
}