'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Testimonials } from '@/lib/database.types';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonials[]>([]);

  useEffect(() => {
    async function fetchTestimonials() {
      const { data } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_active', true)
        .order('display_order');
      if (data) setTestimonials(data);
    }
    fetchTestimonials();
  }, []);

  if (testimonials.length === 0) {
    return (
      <section className="section-padding bg-primary">
        <div className="container-custom">
          <div className="text-center mb-12">
            <p className="text-secondary font-medium mb-4">Testimonials</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              What Parents & Students Say
            </h2>
          </div>
          <div className="text-center text-white/70">
            <p>Testimonials coming soon...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-primary">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-secondary font-medium mb-4">Testimonials</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            What Parents & Students Say
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Hear from our community about their experience at PACE NR Olympiad School
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((item, index) => (
            <Card
              key={item.id}
              className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                {/* Quote icon */}
                <Quote className="h-8 w-8 text-secondary mb-4" />

                {/* Content */}
                <p className="text-white/90 mb-6 leading-relaxed">
                  {item.content}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < (item.rating || 5) ? 'text-secondary fill-secondary' : 'text-white/30'
                      }`}
                    />
                  ))}
                </div>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-white text-lg font-semibold">
                        {item.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{item.name}</p>
                    <p className="text-sm text-white/70">{item.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
