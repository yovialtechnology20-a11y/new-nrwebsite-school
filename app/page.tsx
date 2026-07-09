import HeroSection from '@/components/sections/HeroSection';
import StatisticsSection from '@/components/sections/StatisticsSection';
import WelcomeSection from '@/components/sections/WelcomeSection';
import QuickLinksSection from '@/components/sections/QuickLinksSection';
import NewsSection from '@/components/sections/NewsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import CTASection from '@/components/sections/CTASection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatisticsSection />
      <WelcomeSection />
      <QuickLinksSection />
      <NewsSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
