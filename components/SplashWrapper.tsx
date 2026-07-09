'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import SplashScreen from '@/components/SplashScreen';

const SESSION_KEY = 'pace_splash_played';

export default function SplashWrapper({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const played = sessionStorage.getItem(SESSION_KEY);
      if (!played) {
        setShowSplash(true);
      }
    } catch {
      setShowSplash(true);
    }
  }, []);

  const handleComplete = () => {
    try {
      sessionStorage.setItem(SESSION_KEY, '1');
    } catch {
      // ignore
    }
    setShowSplash(false);
  };

  if (!mounted) {
    return <div className="fixed inset-0 bg-white z-[100]" aria-hidden="true" />;
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {showSplash && <SplashScreen key="splash" onComplete={handleComplete} />}
      </AnimatePresence>

      <div
        aria-hidden={showSplash}
        style={{ visibility: showSplash ? 'hidden' : 'visible' }}
        className={showSplash ? 'pointer-events-none' : ''}
      >
        {children}
      </div>
    </>
  );
}
