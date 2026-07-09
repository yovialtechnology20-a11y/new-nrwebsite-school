'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Faculty } from '@/lib/database.types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Award, BookOpen, Users } from 'lucide-react';

export default function FacultyPage() {
  const [faculty, setFaculty] = useState<Faculty[]>([]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase
        .from('faculty')
        .select('*')
        .eq('is_active', true)
        .order('display_order');
      if (data) setFaculty(data);
    }
    fetchData();
  }, []);

  const departments = Array.from(new Set(faculty.map((f) => f.department).filter(Boolean)));

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 gradient-primary">
          <div className="absolute inset-0 opacity-10">
            <img
              src="https://images.pexels.com/photos/8373028/pexels-photo-8373028.jpeg?auto=compress&cs=tinysrgb&w=1920"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="container-custom relative z-10 text-center">
          <Badge variant="secondary" className="mb-4 gradient-gold text-primary">
            Our Team
          </Badge>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Meet Our Faculty
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Dedicated educators committed to nurturing excellence in every student
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-muted/30">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Expert Faculty', value: '150+', icon: Users },
              { label: 'Total Experience', value: '500+', icon: Award },
              { label: 'Departments', value: '8+', icon: BookOpen },
              { label: 'PhD Holders', value: '25+', icon: Award },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="text-center p-6 bg-white rounded-2xl shadow-md animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-14 h-14 rounded-full gradient-primary flex items-center justify-center mx-auto mb-3">
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <p className="text-3xl font-bold text-foreground mb-1">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Faculty Grid */}
      <section className="section-padding">
        <div className="container-custom">
          {faculty.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-16 w-16 text-muted mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Faculty information coming soon
              </h3>
              <p className="text-muted-foreground">
                Check back later for updates.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {faculty.map((member, index) => (
                <Card
                  key={member.id}
                  className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="relative h-64 overflow-hidden">
                    {member.image_url ? (
                      <img
                        src={member.image_url}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full gradient-primary flex items-center justify-center">
                        <span className="text-6xl font-display font-bold text-white/50">
                          {member.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    {member.department && (
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-white/90 text-primary text-xs">
                          {member.department}
                        </Badge>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-5 text-center">
                    <h3 className="font-display text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-sm text-secondary font-medium mb-3">
                      {member.designation}
                    </p>
                    {member.qualification && (
                      <p className="text-xs text-muted-foreground mb-2">
                        {member.qualification}
                      </p>
                    )}
                    {member.experience && (
                      <p className="text-xs text-muted-foreground">
                        {member.experience} experience
                      </p>
                    )}
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="inline-flex items-center gap-1 text-sm text-primary hover:underline mt-3"
                      >
                        <Mail className="h-3 w-3" />
                        Contact
                      </a>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
