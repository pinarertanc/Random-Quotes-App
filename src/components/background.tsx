// src/components/background.tsx
import Image from 'next/image';

export function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none select-none">
      <Image
        src="/backgroundpicture.webp"
        alt="Background Books"
        fill
        priority
        quality={75}
        sizes="100vw"
        className="object-cover object-center blur-[2px] opacity-75 scale-105" 
      />
      <div className="absolute inset-0 bg-black/20 dark:bg-black/40" />
    </div>
  );
}