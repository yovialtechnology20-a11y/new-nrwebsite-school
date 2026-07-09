'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { AcademicsContent } from '@/lib/database.types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  BookOpen,
  Award,
  Lightbulb,
  Monitor,
  FlaskConical,
  ClipboardCheck,
  GraduationCap,
  Users,
  Target,
  Brain,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'book-open': BookOpen,
  award: Award,
  lightbulb: Lightbulb,
  monitor: Monitor,
  'flask-conical': FlaskConical,
  'clipboard-check': ClipboardCheck,
  graduation: GraduationCap,
  users: Users,
  target: Target,
  brain: Brain,
};

export default function AcademicsPage() {
  const [content, setContent] = useState<AcademicsContent[]>([]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase
        .from('academics_content')
        .select('*')
        .order('display_order');
      if (data) setContent(data);
    }
    fetchData();
  }, []);

  const olympiadPrograms = [
    { name: 'IMO', full: 'International Mathematical Olympiad', icon: Target },
    { name: 'NSO', full: 'National Science Olympiad', icon: FlaskConical },
    { name: 'IEO', full: 'International English Olympiad', icon: BookOpen },
    { name: 'NTSE', full: 'National Talent Search Examination', icon: Brain },
  ];

  const methodology = [
    {
      title: 'Concept-Based Learning',
      description: 'Focus on understanding core concepts rather than rote memorization',
    },
    {
      title: 'Problem-Solving Approach',
      description: 'Develop critical thinking through challenging problems',
    },
    {
      title: 'Personalized Attention',
      description: 'Small batch sizes for individual guidance',
    },
    {
      title: 'Regular Assessments',
      description: 'Continuous evaluation to track progress',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 gradient-primary">
          <div className="absolute inset-0 opacity-10">
            <img
              src="https://images.pexels.com/photos/5212703/pexels-photo-5212703.jpeg?auto=compress&cs=tinysrgb&w=1920"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="container-custom relative z-10 text-center">
          <Badge variant="secondary" className="mb-4 gradient-gold text-primary">
            Academics
          </Badge>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Academic Excellence
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Comprehensive curriculum designed to nurture intellectual curiosity and prepare for competitive excellence
          </p>
        </div>
      </section>

      {/* Academic Programs */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">Our Programs</Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Academic Programs
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Rigorous academic programs tailored for excellence in board examinations and competitive tests
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.map((item, index) => {
              const Icon = iconMap[item.icon || ''] || BookOpen;
              return (
                <Card
                  key={item.id}
                  className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {item.content}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Olympiad Programs */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">Special Programs</Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Olympiad Preparation
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Specialized coaching for National and International Olympiad competitions
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {olympiadPrograms.map((program, index) => {
              const Icon = program.icon;
              return (
                <div
                  key={program.name}
                  className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-md hover:shadow-xl transition-all group animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                  <div className="w-14 h-14 rounded-xl gradient-gold flex items-center justify-center mb-4 relative">
                    <span className="text-primary font-bold text-lg">{program.name}</span>
                  </div>
                  <Icon className="h-6 w-6 text-primary mb-3 opacity-50" />
                  <h3 className="font-semibold text-foreground mb-1">{program.full}</h3>
                  <p className="text-sm text-muted-foreground">
                    Expert coaching with proven results
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Teaching Methodology */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">Our Approach</Badge>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Teaching Methodology
              </h2>
              <p className="text-muted-foreground mb-8">
                Our innovative teaching approach combines traditional wisdom with modern pedagogical techniques to ensure comprehensive understanding.
              </p>

              <div className="space-y-4">
                {methodology.map((item, index) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-4 p-4 bg-muted/50 rounded-xl animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">{index + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/8566472/pexels-photo-8566472.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Teaching methodology"
                  className="w-full h-[400px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full gradient-gold flex items-center justify-center">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">98%</p>
                    <p className="text-sm text-muted-foreground">Success Rate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Learning */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">Modern Infrastructure</Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Smart Learning Environment
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              State-of-the-art facilities designed for optimal learning outcomes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Monitor,
                title: 'Smart Classrooms',
                description: 'Interactive digital boards and multimedia learning tools',
                image: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400',
              },
              {
                icon: FlaskConical,
                title: 'Science Labs',
                description: 'Well-equipped physics, chemistry, and biology laboratories',
                image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=400',
              },
              {
                icon: BookOpen,
                title: 'Library',
                description: 'Vast collection of books, journals, and digital resources',
                image: 'https://images.pexels.com/photos/590041/pexels-photo-590041.jpeg?auto=compress&cs=tinysrgb&w=400',
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <Card
                  key={item.title}
                  className="overflow-hidden group border-0 shadow-lg animate-fade-in-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Assessment System */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <Badge variant="secondary" className="mb-4">Evaluation</Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Assessment System
            </h2>
            <p className="text-muted-foreground">
              Regular assessments and feedback mechanisms to track student progress and identify areas for improvement.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Weekly Tests', count: '4/month', icon: ClipboardCheck },
              { name: 'Practice Papers', count: '100+', icon: BookOpen },
              { name: 'Mock Exams', count: '12/year', icon: Target },
              { name: 'Parent Meetings', count: 'Quarterly', icon: Users },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.name}
                  className="text-center p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-14 h-14 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{item.name}</h3>
                  <p className="text-2xl font-bold text-primary">{item.count}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
