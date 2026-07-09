'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Achievements } from '@/lib/database.types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
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
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Plus, Edit, Trash2, Award, Trophy } from 'lucide-react';

export default function AchievementsManagement() {
  const [achievements, setAchievements] = useState<Achievements[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Achievements | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    student_name: '',
    category: 'academic',
    year: new Date().getFullYear(),
    image_url: '',
    rank: '',
    award: '',
  });

  useEffect(() => {
    fetchAchievements();
  }, []);

  async function fetchAchievements() {
    try {
      const { data } = await supabase
        .from('achievements')
        .select('*')
        .order('year', { ascending: false })
        .order('display_order');
      if (data) setAchievements(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }

  function openCreateDialog() {
    setEditingItem(null);
    setFormData({
      title: '',
      description: '',
      student_name: '',
      category: 'academic',
      year: new Date().getFullYear(),
      image_url: '',
      rank: '',
      award: '',
    });
    setDialogOpen(true);
  }

  function openEditDialog(item: Achievements) {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description || '',
      student_name: item.student_name || '',
      category: item.category,
      year: item.year,
      image_url: item.image_url || '',
      rank: item.rank || '',
      award: item.award || '',
    });
    setDialogOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      if (editingItem) {
        const { error } = await supabase
          .from('achievements')
          .update({ ...formData, updated_at: new Date().toISOString() })
          .eq('id', editingItem.id);
        if (error) throw error;
        toast.success('Achievement updated');
      } else {
        const { error } = await supabase.from('achievements').insert(formData);
        if (error) throw error;
        toast.success('Achievement added');
      }
      setDialogOpen(false);
      fetchAchievements();
    } catch (error) {
      toast.error('Failed to save');
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this achievement?')) return;
    try {
      const { error } = await supabase.from('achievements').delete().eq('id', id);
      if (error) throw error;
      toast.success('Achievement deleted');
      fetchAchievements();
    } catch (error) {
      toast.error('Failed to delete');
    }
  }

  const categoryColors: Record<string, string> = {
    academic: 'bg-blue-500',
    olympiad: 'bg-amber-500',
    sports: 'bg-green-500',
    cultural: 'bg-rose-500',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Achievements</h1>
          <p className="text-muted-foreground">Manage student and school achievements</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gradient-primary" onClick={openCreateDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Add Achievement
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingItem ? 'Edit Achievement' : 'Add Achievement'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Title</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Achievement title"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Student Name</label>
                  <Input
                    value={formData.student_name}
                    onChange={(e) => setFormData({ ...formData, student_name: e.target.value })}
                    placeholder="Optional"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="academic">Academic</SelectItem>
                      <SelectItem value="olympiad">Olympiad</SelectItem>
                      <SelectItem value="sports">Sports</SelectItem>
                      <SelectItem value="cultural">Cultural</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Year</label>
                  <Input
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                    placeholder="2024"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Rank/Position</label>
                  <Input
                    value={formData.rank}
                    onChange={(e) => setFormData({ ...formData, rank: e.target.value })}
                    placeholder="1st Rank, Gold Medal, etc."
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description"
                  rows={3}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Image URL</label>
                <Input
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="gradient-primary">
                  {editingItem ? 'Update' : 'Add'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : achievements.length === 0 ? (
        <Card className="border-0 shadow-md">
          <CardContent className="py-12 text-center">
            <Trophy className="h-12 w-12 text-muted mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No achievements yet</h3>
            <p className="text-muted-foreground mb-4">Add your first achievement</p>
            <Button onClick={openCreateDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Add Achievement
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((item) => (
            <Card key={item.id} className="border-0 shadow-md overflow-hidden">
              <div className="relative h-40 bg-muted">
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className={`w-full h-full ${categoryColors[item.category]} flex items-center justify-center`}>
                    <Award className="h-12 w-12 text-white/50" />
                  </div>
                )}
                <div className="absolute top-2 left-2 flex gap-1">
                  <Badge className={`${categoryColors[item.category]} text-white border-0`}>
                    {item.category}
                  </Badge>
                  <Badge className="bg-white/90 text-foreground">{item.year}</Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-foreground mb-1 line-clamp-1">{item.title}</h3>
                {item.student_name && (
                  <p className="text-sm text-secondary font-medium">{item.student_name}</p>
                )}
                {item.rank && (
                  <p className="text-sm text-muted-foreground mt-1">{item.rank}</p>
                )}
                <div className="flex justify-end gap-2 mt-3">
                  <Button size="sm" variant="ghost" onClick={() => openEditDialog(item)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleDelete(item.id)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
