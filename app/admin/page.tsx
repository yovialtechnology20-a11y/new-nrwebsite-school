'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Image,
  Newspaper,
  Award,
  Users,
  MessageSquare,
  Calendar,
  TrendingUp,
  Clock,
  Mail,
} from 'lucide-react';

interface Stats {
  gallery: number;
  news: number;
  achievements: number;
  faculty: number;
  enquiries: number;
  events: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    gallery: 0,
    news: 0,
    achievements: 0,
    faculty: 0,
    enquiries: 0,
    events: 0,
  });
  const [recentEnquiries, setRecentEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [galleryRes, newsRes, achievementsRes, facultyRes, enquiriesRes, eventsRes] =
          await Promise.all([
            supabase.from('gallery_images').select('id', { count: 'exact', head: true }),
            supabase.from('news').select('id', { count: 'exact', head: true }),
            supabase.from('achievements').select('id', { count: 'exact', head: true }),
            supabase.from('faculty').select('id', { count: 'exact', head: true }),
            supabase.from('admission_enquiries').select('*', { count: 'exact' }),
            supabase.from('events').select('id', { count: 'exact', head: true }),
          ]);

        setStats({
          gallery: galleryRes.count || 0,
          news: newsRes.count || 0,
          achievements: achievementsRes.count || 0,
          faculty: facultyRes.count || 0,
          enquiries: enquiriesRes.count || 0,
          events: eventsRes.count || 0,
        });

        if (enquiriesRes.data) {
          setRecentEnquiries(enquiriesRes.data.slice(0, 5));
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const statCards = [
    { name: 'Gallery Images', value: stats.gallery, icon: Image, color: 'bg-blue-500' },
    { name: 'News Posts', value: stats.news, icon: Newspaper, color: 'bg-green-500' },
    { name: 'Achievements', value: stats.achievements, icon: Award, color: 'bg-amber-500' },
    { name: 'Faculty Members', value: stats.faculty, icon: Users, color: 'bg-purple-500' },
    { name: 'Enquiries', value: stats.enquiries, icon: MessageSquare, color: 'bg-rose-500' },
    { name: 'Events', value: stats.events, icon: Calendar, color: 'bg-cyan-500' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to the admin panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.name} className="border-0 shadow-md">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.name}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Enquiries */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              Recent Enquiries
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentEnquiries.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">
                No enquiries yet
              </p>
            ) : (
              <div className="space-y-3">
                {recentEnquiries.map((enquiry) => (
                  <div
                    key={enquiry.id}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-foreground">
                        {enquiry.student_name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Grade: {enquiry.grade}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        enquiry.status === 'pending'
                          ? 'bg-amber-100 text-amber-700'
                          : enquiry.status === 'contacted'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {enquiry.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <a
                href="/admin/news"
                className="p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors text-center"
              >
                <Newspaper className="h-6 w-6 text-primary mx-auto mb-2" />
                <span className="text-sm font-medium">Add News</span>
              </a>
              <a
                href="/admin/gallery"
                className="p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors text-center"
              >
                <Image className="h-6 w-6 text-primary mx-auto mb-2" />
                <span className="text-sm font-medium">Upload Photo</span>
              </a>
              <a
                href="/admin/achievements"
                className="p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors text-center"
              >
                <Award className="h-6 w-6 text-primary mx-auto mb-2" />
                <span className="text-sm font-medium">Add Achievement</span>
              </a>
              <a
                href="/admin/faculty"
                className="p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors text-center"
              >
                <Users className="h-6 w-6 text-primary mx-auto mb-2" />
                <span className="text-sm font-medium">Add Faculty</span>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
