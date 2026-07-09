'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { SiteSettings, Statistics } from '@/lib/database.types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Save, Settings, BarChart2 } from 'lucide-react';

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [stats, setStats] = useState<Statistics[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const [settingsRes, statsRes] = await Promise.all([
        supabase.from('site_settings').select('*').limit(1).maybeSingle(),
        supabase.from('statistics').select('*').order('display_order'),
      ]);
      if (settingsRes.data) setSettings(settingsRes.data);
      if (statsRes.data) setStats(statsRes.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveSettings() {
    if (!settings) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from('site_settings')
        .update({
          ...settings,
          updated_at: new Date().toISOString(),
        })
        .eq('id', settings.id);
      if (error) throw error;
      toast.success('Settings saved successfully');
    } catch (error) {
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  }

  async function handleSaveStats() {
    setSaving(true);
    try {
      for (const stat of stats) {
        const { error } = await supabase
          .from('statistics')
          .update({
            value: stat.value,
            label: stat.label,
            is_active: stat.is_active,
          })
          .eq('id', stat.id);
        if (error) throw error;
      }
      toast.success('Statistics saved successfully');
    } catch (error) {
      toast.error('Failed to save statistics');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage site-wide settings and content</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Site Settings */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              Site Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Hero Title</label>
              <Input
                value={settings?.hero_title || ''}
                onChange={(e) =>
                  setSettings((prev) => (prev ? { ...prev, hero_title: e.target.value } : null))
                }
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Hero Subtitle</label>
              <Input
                value={settings?.hero_subtitle || ''}
                onChange={(e) =>
                  setSettings((prev) => (prev ? { ...prev, hero_subtitle: e.target.value } : null))
                }
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Welcome Title</label>
              <Input
                value={settings?.welcome_title || ''}
                onChange={(e) =>
                  setSettings((prev) => (prev ? { ...prev, welcome_title: e.target.value } : null))
                }
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Welcome Message</label>
              <Textarea
                value={settings?.welcome_message || ''}
                onChange={(e) =>
                  setSettings((prev) => (prev ? { ...prev, welcome_message: e.target.value } : null))
                }
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Phone</label>
                <Input
                  value={settings?.phone || ''}
                  onChange={(e) =>
                    setSettings((prev) => (prev ? { ...prev, phone: e.target.value } : null))
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Email</label>
                <Input
                  value={settings?.email || ''}
                  onChange={(e) =>
                    setSettings((prev) => (prev ? { ...prev, email: e.target.value } : null))
                  }
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Address</label>
              <Textarea
                value={settings?.address || ''}
                onChange={(e) =>
                  setSettings((prev) => (prev ? { ...prev, address: e.target.value } : null))
                }
                rows={2}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Working Hours</label>
              <Input
                value={settings?.working_hours || ''}
                onChange={(e) =>
                  setSettings((prev) => (prev ? { ...prev, working_hours: e.target.value } : null))
                }
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">WhatsApp Number</label>
              <Input
                value={settings?.whatsapp_number || ''}
                onChange={(e) =>
                  setSettings((prev) => (prev ? { ...prev, whatsapp_number: e.target.value } : null))
                }
                placeholder="911234567890"
              />
            </div>
            <Button
              onClick={handleSaveSettings}
              className="gradient-primary w-full"
              disabled={saving}
            >
              <Save className="h-4 w-4 mr-2" />
              {saving ? 'Saving...' : 'Save Settings'}
            </Button>
          </CardContent>
        </Card>

        {/* Statistics */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart2 className="h-5 w-5 text-primary" />
              Statistics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {stats.map((stat, index) => (
              <div key={stat.id} className="flex items-center gap-3">
                <div className="flex-1">
                  <Input
                    value={stat.label}
                    onChange={(e) => {
                      const newStats = [...stats];
                      newStats[index].label = e.target.value;
                      setStats(newStats);
                    }}
                    placeholder="Label"
                  />
                </div>
                <div className="w-24">
                  <Input
                    type="number"
                    value={stat.value}
                    onChange={(e) => {
                      const newStats = [...stats];
                      newStats[index].value = parseInt(e.target.value) || 0;
                      setStats(newStats);
                    }}
                    placeholder="Value"
                  />
                </div>
              </div>
            ))}
            <Button
              onClick={handleSaveStats}
              className="gradient-primary w-full"
              disabled={saving}
            >
              <Save className="h-4 w-4 mr-2" />
              {saving ? 'Saving...' : 'Save Statistics'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
