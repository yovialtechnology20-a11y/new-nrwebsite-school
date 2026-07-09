'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { AboutContent, Leadership } from '@/lib/database.types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Target, Eye, Heart, History, Users, Lightbulb, Shield, Award } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  vision: Eye,
  mission: Target,
  values: Heart,
  history: History,
};

export default function AboutPage() {
  const [content, setContent] = useState<AboutContent[]>([]);
  const [leadership, setLeadership] = useState<Leadership[]>([]);

  useEffect(() => {
    async function fetchData() {
      const [contentRes, leadershipRes] = await Promise.all([
        supabase.from('about_content').select('*'),
        supabase.from('leadership').select('*').order('display_order'),
      ]);
      if (contentRes.data) setContent(contentRes.data);
      if (leadershipRes.data) setLeadership(leadershipRes.data);
    }
    fetchData();
  }, []);

  const getContentSection = (name: string) => {
    return content.find((c) => c.section_name === name);
  };

  const values = [
    { icon: Lightbulb, title: 'Excellence', description: 'Striving for the highest standards in everything we do' },
    { icon: Shield, title: 'Integrity', description: 'Honest, ethical, and transparent in all our actions' },
    { icon: Users, title: 'Collaboration', description: 'Working together to achieve shared goals' },
    { icon: Award, title: 'Innovation', description: 'Embracing new ideas and continuous improvement' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 gradient-primary">
          <div className="absolute inset-0 opacity-10">
            <img
              src="https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=1920"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="container-custom relative z-10 text-center">
          <Badge variant="secondary" className="mb-4 gradient-gold text-primary">
            About Us
          </Badge>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Know Our Story
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            A journey of excellence in education, nurturing young minds since our inception
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Vision */}
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-secondary/20 rounded-full blur-2xl" />
              <Card className="relative border-0 shadow-xl">
                <CardContent className="p-8 md:p-10">
                  <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mb-6">
                    <Eye className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                    {getContentSection('vision')?.title || 'Our Vision'}
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {getContentSection('vision')?.content ||
                      'To be the premier institution that nurtures intellectual curiosity, fosters innovation, and develops future leaders who excel globally.'}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Mission */}
            <div className="relative">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
              <Card className="relative border-0 shadow-xl">
                <CardContent className="p-8 md:p-10">
                  <div className="w-16 h-16 rounded-2xl gradient-gold flex items-center justify-center mb-6">
                    <Target className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                    {getContentSection('mission')?.title || 'Our Mission'}
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {getContentSection('mission')?.content ||
                      'To provide world-class education through innovative teaching methodologies, Olympiad preparation, and holistic development programs that inspire students to achieve excellence.'}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">Our Foundation</Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Core Values
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {getContentSection('values')?.content ||
                'The principles that guide everything we do at PACE NR Olympiad'}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="text-center p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* History/Timeline */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">Our Journey</Badge>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                {getContentSection('history')?.title || 'Our History'}
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                {getContentSection('history')?.content ||
                  'Founded with a vision to nurture academic excellence, PACE NR Olympiad has grown into a premier institution that consistently produces Olympiad toppers and academic achievers.'}
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-primary">2009</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Foundation</h4>
                    <p className="text-muted-foreground text-sm">Established with a vision to transform education</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-secondary">2015</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Expansion</h4>
                    <p className="text-muted-foreground text-sm">First batch of Olympiad toppers</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-primary">2024</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Present</h4>
                    <p className="text-muted-foreground text-sm">2500+ students, 500+ Olympiad winners</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/8199917/pexels-photo-8199917.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="School history"
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section id="leadership" className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">Leadership</Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Meet Our Leaders
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Visionary leaders guiding PACE NR Olympiad towards excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {leadership.map((leader, index) => (
              <Card
                key={leader.id}
                className="overflow-hidden border-0 shadow-xl animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <div className="h-48 md:h-full relative">
                      {leader.image_url ? (
                        <img
                          src={leader.image_url}
                          alt={leader.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full gradient-primary flex items-center justify-center">
                          <span className="text-6xl font-display font-bold text-white">
                            {leader.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="md:w-2/3 p-6">
                    <h3 className="font-display text-xl font-bold text-foreground mb-1">
                      {leader.name}
                    </h3>
                    <p className="text-secondary font-medium mb-4">{leader.designation}</p>
                    {leader.message && (
                      <p className="text-muted-foreground text-sm italic">
                        &ldquo;{leader.message}&rdquo;
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">Why Choose Us</Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              The PACE NR Advantage
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              What sets us apart from other institutions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Expert Faculty', description: 'Highly qualified teachers with Olympiad expertise', icon: Users },
              { title: 'Proven Results', description: 'Consistent track record of Olympiad toppers', icon: Award },
              { title: 'Modern Infrastructure', description: 'Smart classrooms and well-equipped labs', icon: Lightbulb },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="text-center p-6 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
