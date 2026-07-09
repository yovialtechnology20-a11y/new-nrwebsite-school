'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Facilities } from '@/lib/database.types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Monitor,
  BookOpen,
  FlaskConical,
  Computer,
  Trophy,
  Bus,
  HeartPulse,
  ShieldCheck,
  Wifi,
  Lightbulb,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  monitor: Monitor,
  'book-open': BookOpen,
  'flask-conical': FlaskConical,
  desktop: Computer,
  computer: Computer,
  trophy: Trophy,
  bus: Bus,
  'heart-pulse': HeartPulse,
  'shield-check': ShieldCheck,
  wifi: Wifi,
  lightbulb: Lightbulb,
};

const defaultFacilities = [
  {
    name: 'Smart Classrooms',
    description: 'Interactive digital boards and modern teaching aids',
    icon: Monitor,
    image: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    name: 'Library',
    description: 'Vast collection of books, journals, and digital resources',
    icon: BookOpen,
    image: 'https://images.pexels.com/photos/590041/pexels-photo-590041.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    name: 'Science Labs',
    description: 'Well-equipped physics, chemistry, and biology laboratories',
    icon: FlaskConical,
    image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    name: 'Computer Lab',
    description: 'Modern computing facilities with high-speed internet',
    icon: Computer,
    image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    name: 'Sports Facilities',
    description: 'Multi-sport playground with professional equipment',
    icon: Trophy,
    image: 'https://images.pexels.com/photos/1171084/pexels-photo-1171084.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    name: 'Transport',
    description: 'GPS-enabled buses covering all major routes',
    icon: Bus,
    image: 'https://images.pexels.com/photos/236347/pexels-photo-236347.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    name: 'Medical Room',
    description: 'First-aid facilities with trained medical staff',
    icon: HeartPulse,
    image: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    name: 'CCTV & Security',
    description: '24/7 surveillance for student safety',
    icon: ShieldCheck,
    image: 'https://images.pexels.com/photos/270605/pexels-photo-270605.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

export default function FacilitiesPage() {
  const [facilities, setFacilities] = useState<Facilities[]>([]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase
        .from('facilities')
        .select('*')
        .eq('is_active', true)
        .order('display_order');
      if (data && data.length > 0) setFacilities(data);
    }
    fetchData();
  }, []);

  const displayFacilities = facilities.length > 0 ? facilities : null;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 gradient-primary">
          <div className="absolute inset-0 opacity-10">
            <img
              src="https://images.pexels.com/photos/256469/pexels-photo-256469.jpeg?auto=compress&cs=tinysrgb&w=1920"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="container-custom relative z-10 text-center">
          <Badge variant="secondary" className="mb-4 gradient-gold text-primary">
            Infrastructure
          </Badge>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            World-Class Facilities
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            State-of-the-art infrastructure designed for optimal learning outcomes
          </p>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayFacilities ? facilities.map((facility, index) => {
              const Icon = iconMap[facility.icon || ''] || Lightbulb;
              return (
                <Card
                  key={facility.id}
                  className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={facility.image_url || 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400'}
                      alt={facility.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <div className="w-12 h-12 rounded-xl bg-white/90 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {facility.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {facility.description}
                    </p>
                  </CardContent>
                </Card>
              );
            }) : defaultFacilities.map((facility, index) => {
              const Icon = facility.icon;
              return (
                <Card
                  key={facility.name}
                  className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={facility.image}
                      alt={facility.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <div className="w-12 h-12 rounded-xl bg-white/90 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {facility.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {facility.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Virtual Tour CTA */}
      <section className="py-16 bg-muted/30">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto">
            <Badge variant="secondary" className="mb-4">Explore More</Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Virtual Campus Tour
            </h2>
            <p className="text-muted-foreground mb-6">
              Take a virtual tour of our campus and experience our world-class facilities from anywhere.
            </p>
            <button className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center">
                <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A6.3 6.3 0 0 0 2.5 8.5v3a6.3 6.3 0 0 0 3.8 5.659v1.341a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-1.341A6.3 6.3 0 0 0 18.5 11.5v-3a6.3 6.3 0 0 0-3.8-5.659V1.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v1.341zM8 15.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-semibold text-foreground">360° Campus Tour</p>
                <p className="text-sm text-muted-foreground">Click to explore</p>
              </div>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
