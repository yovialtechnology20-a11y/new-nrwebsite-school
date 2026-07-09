'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { GalleryAlbums, GalleryImages } from '@/lib/database.types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { Plus, Image as ImageIcon, Trash2, FolderPlus } from 'lucide-react';

export default function GalleryManagement() {
  const [albums, setAlbums] = useState<GalleryAlbums[]>([]);
  const [images, setImages] = useState<GalleryImages[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAlbum, setSelectedAlbum] = useState<string>('');
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [albumDialogOpen, setAlbumDialogOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imageCaption, setImageCaption] = useState('');
  const [albumName, setAlbumName] = useState('');
  const [albumCategory, setAlbumCategory] = useState('general');

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const [albumsRes, imagesRes] = await Promise.all([
        supabase.from('gallery_albums').select('*').order('display_order'),
        supabase.from('gallery_images').select('*').order('created_at', { ascending: false }),
      ]);
      if (albumsRes.data) setAlbums(albumsRes.data);
      if (imagesRes.data) setImages(imagesRes.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddImage(e: React.FormEvent) {
    e.preventDefault();
    try {
      const { error } = await supabase.from('gallery_images').insert({
        image_url: imageUrl,
        caption: imageCaption || null,
        album_id: selectedAlbum || null,
      });
      if (error) throw error;
      toast.success('Image added successfully');
      setImageDialogOpen(false);
      setImageUrl('');
      setImageCaption('');
      fetchData();
    } catch (error) {
      toast.error('Failed to add image');
    }
  }

  async function handleAddAlbum(e: React.FormEvent) {
    e.preventDefault();
    try {
      const { error } = await supabase.from('gallery_albums').insert({
        name: albumName,
        category: albumCategory,
      });
      if (error) throw error;
      toast.success('Album created successfully');
      setAlbumDialogOpen(false);
      setAlbumName('');
      setAlbumCategory('general');
      fetchData();
    } catch (error) {
      toast.error('Failed to create album');
    }
  }

  async function handleDeleteImage(id: string) {
    if (!confirm('Delete this image?')) return;
    try {
      const { error } = await supabase.from('gallery_images').delete().eq('id', id);
      if (error) throw error;
      toast.success('Image deleted');
      fetchData();
    } catch (error) {
      toast.error('Failed to delete image');
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Gallery</h1>
          <p className="text-muted-foreground">Manage photos and albums</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={albumDialogOpen} onOpenChange={setAlbumDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <FolderPlus className="h-4 w-4 mr-2" />
                New Album
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Album</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddAlbum} className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Album Name</label>
                  <Input
                    value={albumName}
                    onChange={(e) => setAlbumName(e.target.value)}
                    placeholder="Album name"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <Select value={albumCategory} onValueChange={setAlbumCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="annual-day">Annual Day</SelectItem>
                      <SelectItem value="sports-day">Sports Day</SelectItem>
                      <SelectItem value="science-fair">Science Fair</SelectItem>
                      <SelectItem value="cultural-fest">Cultural Fest</SelectItem>
                      <SelectItem value="classroom">Classroom</SelectItem>
                      <SelectItem value="campus">Campus</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setAlbumDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="gradient-primary">Create</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
          <Dialog open={imageDialogOpen} onOpenChange={setImageDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gradient-primary">
                <Plus className="h-4 w-4 mr-2" />
                Add Image
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Image</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddImage} className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Image URL</label>
                  <Input
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://..."
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Caption</label>
                  <Input
                    value={imageCaption}
                    onChange={(e) => setImageCaption(e.target.value)}
                    placeholder="Image caption"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Album</label>
                  <Select value={selectedAlbum} onValueChange={setSelectedAlbum}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select album (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">No Album</SelectItem>
                      {albums.map((album) => (
                        <SelectItem key={album.id} value={album.id}>
                          {album.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setImageDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="gradient-primary">Add</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Albums */}
      {albums.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedAlbum === '' ? 'default' : 'outline'}
            onClick={() => setSelectedAlbum('')}
            className={selectedAlbum === '' ? 'gradient-primary' : ''}
          >
            All Images ({images.length})
          </Button>
          {albums.map((album) => (
            <Button
              key={album.id}
              variant={selectedAlbum === album.id ? 'default' : 'outline'}
              onClick={() => setSelectedAlbum(album.id)}
              className={selectedAlbum === album.id ? 'gradient-primary' : ''}
            >
              {album.name} ({images.filter((i) => i.album_id === album.id).length})
            </Button>
          ))}
        </div>
      )}

      {/* Grid */}
      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : images.length === 0 ? (
        <Card className="border-0 shadow-md">
          <CardContent className="py-12 text-center">
            <ImageIcon className="h-12 w-12 text-muted mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No images yet</h3>
            <p className="text-muted-foreground mb-4">Add your first image</p>
            <Button onClick={() => setImageDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Image
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {images
            .filter((img) => !selectedAlbum || img.album_id === selectedAlbum)
            .map((image) => (
              <div
                key={image.id}
                className="relative aspect-square rounded-xl overflow-hidden group"
              >
                <img
                  src={image.image_url}
                  alt={image.caption || 'Gallery image'}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                  <button
                    onClick={() => handleDeleteImage(image.id)}
                    className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
                {image.caption && (
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
                    <p className="text-white text-xs truncate">{image.caption}</p>
                  </div>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
