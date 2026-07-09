'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { GalleryAlbums, GalleryImages } from '@/lib/database.types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';
import { X, ChevronLeft, ChevronRight, Image as ImageIcon, Play } from 'lucide-react';

export default function GalleryPage() {
  const [albums, setAlbums] = useState<GalleryAlbums[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);
  const [images, setImages] = useState<GalleryImages[]>([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    async function fetchAlbums() {
      const { data } = await supabase
        .from('gallery_albums')
        .select('*')
        .order('display_order');
      if (data) setAlbums(data);
    }
    fetchAlbums();
  }, []);

  useEffect(() => {
    async function fetchImages() {
      if (selectedAlbum) {
        const { data } = await supabase
          .from('gallery_images')
          .select('*')
          .eq('album_id', selectedAlbum)
          .order('display_order');
        if (data) setImages(data);
      } else {
        const { data } = await supabase
          .from('gallery_images')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(24);
        if (data) setImages(data);
      }
    }
    fetchImages();
  }, [selectedAlbum]);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const albumCategories = [
    { label: 'All Photos', value: null },
    { label: 'Annual Day', value: 'annual-day' },
    { label: 'Sports Day', value: 'sports-day' },
    { label: 'Science Fair', value: 'science-fair' },
    { label: 'Cultural Fest', value: 'cultural-fest' },
    { label: 'Classroom', value: 'classroom' },
    { label: 'Campus', value: 'campus' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 gradient-primary">
          <div className="absolute inset-0 opacity-10">
            <img
              src="https://images.pexels.com/photos/8199917/pexels-photo-8199917.jpeg?auto=compress&cs=tinysrgb&w=1920"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="container-custom relative z-10 text-center">
          <Badge variant="secondary" className="mb-4 gradient-gold text-primary">
            Gallery
          </Badge>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Explore Our Campus
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            A visual journey through our events, activities, and campus life
          </p>
        </div>
      </section>

      {/* Albums */}
      <section className="py-8 bg-muted/30">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-3">
            {albumCategories.map((cat) => (
              <Button
                key={cat.label}
                variant={selectedAlbum === cat.value ? 'default' : 'outline'}
                className={
                  selectedAlbum === cat.value
                    ? 'gradient-primary hover:opacity-90'
                    : 'hover:bg-muted'
                }
                onClick={() => setSelectedAlbum(cat.value)}
              >
                {cat.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding">
        <div className="container-custom">
          {images.length === 0 ? (
            <div className="text-center py-12">
              <ImageIcon className="h-16 w-16 text-muted mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No photos available
              </h3>
              <p className="text-muted-foreground">
                Check back later for updates.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((image, index) => (
                <div
                  key={image.id}
                  className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
                  onClick={() => openLightbox(index)}
                >
                  <img
                    src={image.image_url || 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400'}
                    alt={image.caption || 'Gallery image'}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ImageIcon className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  {image.caption && (
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                      <p className="text-white text-sm">{image.caption}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-5xl p-0 bg-black/95 border-none">
          <div className="relative">
            <DialogClose className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors">
              <X className="h-5 w-5" />
            </DialogClose>

            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {images[currentImageIndex] && (
              <div className="flex items-center justify-center min-h-[60vh]">
                <img
                  src={images[currentImageIndex].image_url || 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=1200'}
                  alt={images[currentImageIndex].caption || 'Gallery image'}
                  className="max-h-[80vh] max-w-full object-contain"
                />
              </div>
            )}

            {images[currentImageIndex]?.caption && (
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-center">
                <p className="text-white">{images[currentImageIndex].caption}</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Video Gallery Placeholder */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">Video Gallery</Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Watch Our Stories
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience our events and activities through video
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'https://images.pexels.com/photos/8199917/pexels-photo-8199917.jpeg?auto=compress&cs=tinysrgb&w=600',
              'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=600',
              'https://images.pexels.com/photos/8566472/pexels-photo-8566472.jpeg?auto=compress&cs=tinysrgb&w=600',
            ].map((thumb, index) => (
              <div
                key={index}
                className="relative aspect-video rounded-2xl overflow-hidden cursor-pointer group"
              >
                <img
                  src={thumb}
                  alt="Video thumbnail"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="h-8 w-8 text-primary ml-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
