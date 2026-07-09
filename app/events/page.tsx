'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { News, Events } from '@/lib/database.types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, MapPin, ArrowRight, Pin } from 'lucide-react';
import { format } from 'date-fns';

export default function EventsPage() {
  const [news, setNews] = useState<News[]>([]);
  const [events, setEvents] = useState<Events[]>([]);

  useEffect(() => {
    async function fetchData() {
      const [newsRes, eventsRes] = await Promise.all([
        supabase
          .from('news')
          .select('*')
          .eq('is_published', true)
          .order('published_at', { ascending: false }),
        supabase.from('events').select('*').order('event_date'),
      ]);
      if (newsRes.data) setNews(newsRes.data);
      if (eventsRes.data) setEvents(eventsRes.data);
    }
    fetchData();
  }, []);

  const upcomingEvents = events.filter(
    (e) => new Date(e.event_date) >= new Date()
  );
  const pastEvents = events.filter(
    (e) => new Date(e.event_date) < new Date()
  );

  const pinnedNews = news.filter((n) => n.is_pinned);
  const regularNews = news.filter((n) => !n.is_pinned);

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
            Events & News
          </Badge>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Stay Updated
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Latest news, announcements, and upcoming events at PACE NR Olympiad
          </p>
        </div>
      </section>

      {/* Content Tabs */}
      <section className="section-padding">
        <div className="container-custom">
          <Tabs defaultValue="news" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
              <TabsTrigger value="news" className="text-base">News & Announcements</TabsTrigger>
              <TabsTrigger value="events" className="text-base">Events</TabsTrigger>
            </TabsList>

            <TabsContent value="news" className="space-y-8">
              {/* Pinned Announcements */}
              {pinnedNews.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Pin className="h-5 w-5 text-secondary" />
                    <h3 className="font-semibold text-foreground">Important Announcements</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {pinnedNews.map((item) => (
                      <Card
                        key={item.id}
                        className="border-l-4 border-l-secondary shadow-md hover:shadow-lg transition-shadow"
                      >
                        <CardContent className="p-5">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                            <Calendar className="h-4 w-4" />
                            <span>{format(new Date(item.published_at), 'MMM dd, yyyy')}</span>
                            <Badge variant="secondary" className="ml-2">
                              {item.category}
                            </Badge>
                          </div>
                          <h4 className="font-display font-semibold text-foreground mb-2">
                            {item.title}
                          </h4>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {item.excerpt || item.content.replace(/<[^>]*>/g, '').slice(0, 150)}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Regular News */}
              <div>
                <h3 className="font-semibold text-foreground mb-4">All News</h3>
                <div className="space-y-4">
                  {regularNews.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                      No news available at the moment.
                    </p>
                  ) : (
                    regularNews.map((item, index) => (
                      <Card
                        key={item.id}
                        className="overflow-hidden group hover:shadow-md transition-shadow"
                      >
                        <div className="md:flex">
                          <div className="md:w-1/4 h-48 md:h-auto relative overflow-hidden">
                            <img
                              src={item.image_url || 'https://images.pexels.com/photos/5212703/pexels-photo-5212703.jpeg?auto=compress&cs=tinysrgb&w=400'}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <div className="md:w-3/4 p-5">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                              <Calendar className="h-4 w-4" />
                              <span>{format(new Date(item.published_at), 'MMM dd, yyyy')}</span>
                              <Badge variant="outline" className="ml-2">
                                {item.category}
                              </Badge>
                            </div>
                            <h4 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                              {item.title}
                            </h4>
                            <p className="text-muted-foreground line-clamp-2">
                              {item.excerpt || item.content.replace(/<[^>]*>/g, '').slice(0, 200)}
                            </p>
                          </div>
                        </div>
                      </Card>
                    ))
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="events" className="space-y-8">
              {/* Upcoming Events */}
              <div>
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Upcoming Events
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingEvents.length === 0 ? (
                    <p className="text-muted-foreground col-span-full text-center py-8">
                      No upcoming events scheduled.
                    </p>
                  ) : (
                    upcomingEvents.map((event) => (
                      <Card key={event.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                        <div className="relative h-48 overflow-hidden">
                          {event.image_url ? (
                            <img
                              src={event.image_url}
                              alt={event.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full gradient-primary flex items-center justify-center">
                              <Calendar className="h-12 w-12 text-white/50" />
                            </div>
                          )}
                          <div className="absolute top-4 left-4">
                            <Badge className="gradient-gold text-primary">
                              {event.category}
                            </Badge>
                          </div>
                        </div>
                        <CardContent className="p-5">
                          <h4 className="font-display text-lg font-semibold text-foreground mb-3">
                            {event.title}
                          </h4>
                          <div className="space-y-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              <span>{format(new Date(event.event_date), 'MMMM dd, yyyy')}</span>
                            </div>
                            {event.event_time && (
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                <span>{event.event_time}</span>
                              </div>
                            )}
                            {event.location && (
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                <span>{event.location}</span>
                              </div>
                            )}
                          </div>
                          {event.description && (
                            <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
                              {event.description}
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </div>

              {/* Past Events */}
              {pastEvents.length > 0 && (
                <div>
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    Past Events
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {pastEvents.slice(0, 8).map((event) => (
                      <Card key={event.id} className="bg-muted/50">
                        <CardContent className="p-4">
                          <p className="text-xs text-muted-foreground mb-1">
                            {format(new Date(event.event_date), 'MMM dd, yyyy')}
                          </p>
                          <h4 className="font-medium text-sm text-foreground">
                            {event.title}
                          </h4>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
