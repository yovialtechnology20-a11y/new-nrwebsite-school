'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import type { SiteSettings } from '@/lib/database.types';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';

export default function WelcomeSection() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    async function fetchSettings() {
      const { data } = await supabase
        .from('site_settings')
        .select('*')
        .limit(1)
        .maybeSingle();
      if (data) setSettings(data);
    }
    fetchSettings();
  }, []);

  const highlights = [
    'Expert Faculty',
    'Olympiad Focus',
    'Smart Classrooms',
    'Individual Attention',
    'Proven Results',
    'Holistic Development',
  ];

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/8199141/pexels-photo-8199141.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Students learning"
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent" />
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-6 -right-6 md:bottom-8 md:right-8 bg-white rounded-2xl shadow-xl p-6 max-w-xs">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-full gradient-gold flex items-center justify-center">
                  <span className="text-primary font-bold text-xl">15+</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Years of</p>
                  <p className="text-muted-foreground">Excellence</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div>
              <p className="text-secondary font-medium mb-2">Welcome to PACE NR</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                {settings?.welcome_title || 'Excellence in Education'}
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {settings?.welcome_message ||
                  'Welcome to PACE NR Olympiad School, where excellence meets opportunity. We nurture young minds with world-class education, Olympiad coaching, and holistic development.'}
              </p>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-4">
              <Button asChild className="gradient-primary hover:opacity-90">
                <Link href="/about">
                  Learn More About Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                <Link href="/admissions">
                  Apply for Admission
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
