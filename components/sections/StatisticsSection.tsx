'use client';

import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import type { Statistics } from '@/lib/database.types';
import { Users, Award, Trophy, Calendar, Percent, Star, BookOpen, GraduationCap } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  users: Users,
  award: Award,
  trophy: Trophy,
  calendar: Calendar,
  percent: Percent,
  star: Star,
  'book-open': BookOpen,
  graduation: GraduationCap,
};

interface CounterItemProps {
  label: string;
  value: number;
  icon: string;
  index: number;
}

function CounterItem({ label, value, icon, index }: CounterItemProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const IconComponent = iconMap[icon] || Star;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            const duration = 2000;
            const steps = 60;
            const stepValue = value / steps;
            let current = 0;
            const timer = setInterval(() => {
              current += stepValue;
              if (current >= value) {
                setCount(value);
                clearInterval(timer);
              } else {
                setCount(Math.floor(current));
              }
            }, duration / steps);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <div
      ref={ref}
      className="text-center p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-border/50 animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4">
        <IconComponent className="h-8 w-8 text-white" />
      </div>
      <h3 className="font-display text-4xl font-bold text-primary mb-2">
        {count.toLocaleString()}{label.includes('Rate') ? '%' : '+'}
      </h3>
      <p className="text-muted-foreground">{label}</p>
    </div>
  );
}

export default function StatisticsSection() {
  const [stats, setStats] = useState<Statistics[]>([]);

  useEffect(() => {
    async function fetchStats() {
      const { data } = await supabase
        .from('statistics')
        .select('*')
        .eq('is_active', true)
        .order('display_order');
      if (data) setStats(data);
    }
    fetchStats();
  }, []);

  return (
    <section className="section-padding -mt-20 relative z-10">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <CounterItem
              key={stat.id}
              label={stat.label}
              value={stat.value}
              icon={stat.icon || 'star'}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
