'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function LogoAnimation({ logoSrc }: { logoSrc: string }) {
  return (
    <motion.div
      style={{ width: 'min(560px, 90vw)', height: 'auto', aspectRatio: '5.24 / 1' }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 2, ease: 'easeOut', delay: 1 }}
    >
      <Image
        src={logoSrc}
        alt="PACE NR Olympiad School"
        width={960}
        height={184}
        style={{
          width: '100%',
          height: 'auto',
          filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.06))',
        }}
        priority
        sizes="(max-width: 640px) 90vw, 560px"
      />
    </motion.div>
  );
}
