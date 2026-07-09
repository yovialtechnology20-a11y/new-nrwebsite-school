'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Achievements } from '@/lib/database.types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Trophy, Medal, Award, Star, BookOpen, Users, Music } from 'lucide-react';

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'academic', label: 'Academic' },
  { value: 'olympiad', label: 'Olympiad' },
  { value: 'sports', label: 'Sports' },
  { value: 'cultural', label: 'Cultural' },
];

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  academic: BookOpen,
  olympiad: Trophy,
  sports: Medal,
  cultural: Music,
  default: Award,
};

const categoryColors: Record<string, string> = {
  academic: 'bg-blue-500',
  olympiad: 'bg-amber-500',
  sports: 'bg-green-500',
  cultural: 'bg-rose-500',
};

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<Achievements[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [years, setYears] = useState<number[]>([]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase
        .from('achievements')
        .select('*')
        .order('year', { ascending: false })
        .order('display_order');
      if (data) {
        setAchievements(data);
        const uniqueYears = Array.from(new Set(data.map((a) => a.year))).sort((a, b) => b - a);
        setYears(uniqueYears);
      }
    }
    fetchData();
  }, []);

  const filteredAchievements = achievements.filter((a) => {
    const categoryMatch = selectedCategory === 'all' || a.category === selectedCategory;
    const yearMatch = selectedYear === 'all' || a.year.toString() === selectedYear;
    return categoryMatch && yearMatch;
  });

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 gradient-primary">
          <div className="absolute inset-0 opacity-10">
            <img
              src="https://images.pexels.com/photos/5212321/pexels-photo-5212321.jpeg?auto=compress&cs=tinysrgb&w=1920"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="container-custom relative z-10 text-center">
          <Badge variant="secondary" className="mb-4 gradient-gold text-primary">
            Achievements
          </Badge>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Our Proud Moments
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Celebrating excellence in academics, Olympiads, sports, and cultural activities
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-muted/30">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Olympiad Winners', value: '500+', icon: Trophy },
              { label: 'Academic Toppers', value: '250+', icon: BookOpen },
              { label: 'Sports Championships', value: '100+', icon: Medal },
              { label: 'Cultural Awards', value: '75+', icon: Star },
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

      {/* Filters */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Achievements Grid */}
          {filteredAchievements.length === 0 ? (
            <div className="text-center py-12">
              <Trophy className="h-16 w-16 text-muted mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No achievements found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your filters or check back later.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAchievements.map((achievement, index) => {
                const Icon = iconMap[achievement.category] || iconMap.default;
                const color = categoryColors[achievement.category] || 'bg-primary';
                return (
                  <Card
                    key={achievement.id}
                    className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 animate-fade-in-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="relative h-48 overflow-hidden">
                      {achievement.image_url ? (
                        <img
                          src={achievement.image_url}
                          alt={achievement.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className={`w-full h-full ${color} flex items-center justify-center`}>
                          <Icon className="h-16 w-16 text-white/50" />
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <Badge className={`${color} text-white border-0`}>
                          {achievement.category}
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-sm font-medium text-foreground">
                          {achievement.year}
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {achievement.title}
                      </h3>
                      {achievement.student_name && (
                        <p className="text-sm text-secondary font-medium mb-1">
                          {achievement.student_name}
                        </p>
                      )}
                      {achievement.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {achievement.description}
                        </p>
                      )}
                      {achievement.rank && (
                        <div className="flex items-center gap-2 mt-3">
                          <Medal className="h-4 w-4 text-secondary" />
                          <span className="text-sm font-medium text-foreground">
                            Rank: {achievement.rank}
                          </span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
