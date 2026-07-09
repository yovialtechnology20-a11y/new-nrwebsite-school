'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import LogoAnimation from './LogoAnimation';

const LOGO_SRC = '/images/pace-logo.png';

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => onComplete(), 20000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: '#ffffff' }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: 'easeInOut' }}
    >
      <LogoAnimation logoSrc={LOGO_SRC} />
    </motion.div>
  );
}
