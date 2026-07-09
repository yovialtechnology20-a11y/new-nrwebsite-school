'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Faculty } from '@/lib/database.types';
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
import { toast } from 'sonner';
import { Plus, Edit, Trash2, Users } from 'lucide-react';

export default function FacultyManagement() {
  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Faculty | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    department: '',
    qualification: '',
    experience: '',
    bio: '',
    image_url: '',
    email: '',
  });

  useEffect(() => {
    fetchFaculty();
  }, []);

  async function fetchFaculty() {
    try {
      const { data } = await supabase.from('faculty').select('*').order('display_order');
      if (data) setFaculty(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }

  function openCreateDialog() {
    setEditingItem(null);
    setFormData({
      name: '',
      designation: '',
      department: '',
      qualification: '',
      experience: '',
      bio: '',
      image_url: '',
      email: '',
    });
    setDialogOpen(true);
  }

  function openEditDialog(item: Faculty) {
    setEditingItem(item);
    setFormData({
      name: item.name,
      designation: item.designation,
      department: item.department || '',
      qualification: item.qualification || '',
      experience: item.experience || '',
      bio: item.bio || '',
      image_url: item.image_url || '',
      email: item.email || '',
    });
    setDialogOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      if (editingItem) {
        const { error } = await supabase
          .from('faculty')
          .update({ ...formData, updated_at: new Date().toISOString() })
          .eq('id', editingItem.id);
        if (error) throw error;
        toast.success('Faculty updated');
      } else {
        const { error } = await supabase.from('faculty').insert(formData);
        if (error) throw error;
        toast.success('Faculty added');
      }
      setDialogOpen(false);
      fetchFaculty();
    } catch (error) {
      toast.error('Failed to save');
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this faculty member?')) return;
    try {
      const { error } = await supabase.from('faculty').delete().eq('id', id);
      if (error) throw error;
      toast.success('Faculty deleted');
      fetchFaculty();
    } catch (error) {
      toast.error('Failed to delete');
    }
  }

  async function toggleActive(item: Faculty) {
    try {
      const { error } = await supabase
        .from('faculty')
        .update({ is_active: !item.is_active })
        .eq('id', item.id);
      if (error) throw error;
      toast.success(item.is_active ? 'Faculty hidden' : 'Faculty published');
      fetchFaculty();
    } catch (error) {
      toast.error('Failed to update');
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Faculty</h1>
          <p className="text-muted-foreground">Manage faculty members</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gradient-primary" onClick={openCreateDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Add Faculty
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingItem ? 'Edit Faculty' : 'Add Faculty'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Name</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Full name"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Designation</label>
                  <Input
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    placeholder="Teacher, HOD, etc."
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Department</label>
                  <Input
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    placeholder="Math, Science, etc."
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Experience</label>
                  <Input
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    placeholder="10+ years"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Qualification</label>
                <Input
                  value={formData.qualification}
                  onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                  placeholder="M.Sc, Ph.D, etc."
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Bio</label>
                <Textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Brief biography"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Photo URL</label>
                  <Input
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Email</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@school.edu"
                  />
                </div>
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
      ) : faculty.length === 0 ? (
        <Card className="border-0 shadow-md">
          <CardContent className="py-12 text-center">
            <Users className="h-12 w-12 text-muted mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No faculty members yet</h3>
            <p className="text-muted-foreground mb-4">Add your first faculty member</p>
            <Button onClick={openCreateDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Add Faculty
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {faculty.map((item) => (
            <Card
              key={item.id}
              className={`border-0 shadow-md overflow-hidden ${!item.is_active ? 'opacity-60' : ''}`}
            >
              <div className="relative h-48 bg-muted">
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full gradient-primary flex items-center justify-center">
                    <span className="text-5xl font-display font-bold text-white/50">
                      {item.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              <CardContent className="p-4 text-center">
                <h3 className="font-semibold text-foreground">{item.name}</h3>
                <p className="text-sm text-secondary">{item.designation}</p>
                {item.department && (
                  <p className="text-xs text-muted-foreground mt-1">{item.department}</p>
                )}
                <div className="flex justify-center gap-2 mt-3">
                  <Button size="sm" variant="ghost" onClick={() => openEditDialog(item)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant={item.is_active ? 'default' : 'secondary'}
                    onClick={() => toggleActive(item)}
                    className="text-xs"
                  >
                    {item.is_active ? 'Hide' : 'Show'}
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
