'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { AdmissionEnquiries } from '@/lib/database.types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { Mail, Phone, Calendar, Download, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';

export default function AdmissionsManagement() {
  const [enquiries, setEnquiries] = useState<AdmissionEnquiries[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchEnquiries();
  }, []);

  async function fetchEnquiries() {
    try {
      const { data } = await supabase
        .from('admission_enquiries')
        .select('*')
        .order('created_at', { ascending: false });
      if (data) setEnquiries(data);
    } catch (error) {
      console.error('Error fetching enquiries:', error);
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id: string, status: string) {
    try {
      const { error } = await supabase
        .from('admission_enquiries')
        .update({ status })
        .eq('id', id);
      if (error) throw error;
      toast.success('Status updated');
      fetchEnquiries();
    } catch (error) {
      toast.error('Failed to update status');
    }
  }

  const filteredEnquiries = enquiries.filter((e) =>
    statusFilter === 'all' ? true : e.status === statusFilter
  );

  const statusCounts = {
    all: enquiries.length,
    pending: enquiries.filter((e) => e.status === 'pending').length,
    contacted: enquiries.filter((e) => e.status === 'contacted').length,
    enrolled: enquiries.filter((e) => e.status === 'enrolled').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">
            Admission Enquiries
          </h1>
          <p className="text-muted-foreground">
            Manage incoming admission enquiries
          </p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export to Excel
        </Button>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'All', value: 'all', color: 'bg-primary' },
          { label: 'Pending', value: 'pending', color: 'bg-amber-500' },
          { label: 'Contacted', value: 'contacted', color: 'bg-blue-500' },
          { label: 'Enrolled', value: 'enrolled', color: 'bg-green-500' },
        ].map((stat) => (
          <Card
            key={stat.value}
            className={`cursor-pointer border-0 shadow-md ${
              statusFilter === stat.value ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setStatusFilter(stat.value)}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                  <span className="text-white font-bold">
                    {statusCounts[stat.value as keyof typeof statusCounts]}
                  </span>
                </div>
                <span className="text-sm font-medium">{stat.label}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enquiries List */}
      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : filteredEnquiries.length === 0 ? (
        <Card className="border-0 shadow-md">
          <CardContent className="py-12 text-center">
            <MessageSquare className="h-12 w-12 text-muted mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No enquiries found</h3>
            <p className="text-muted-foreground">
              {statusFilter === 'all'
                ? 'No admission enquiries yet'
                : `No ${statusFilter} enquiries`}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredEnquiries.map((enquiry) => (
            <Card key={enquiry.id} className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg text-foreground">
                        {enquiry.student_name}
                      </h3>
                      <Badge
                        className={
                          enquiry.status === 'pending'
                            ? 'bg-amber-100 text-amber-700'
                            : enquiry.status === 'contacted'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-green-100 text-green-700'
                        }
                      >
                        {enquiry.status}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <span className="font-medium">Parent:</span> {enquiry.parent_name}
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="font-medium">Grade:</span> {enquiry.grade}
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {enquiry.phone}
                      </div>
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {enquiry.email}
                      </div>
                    </div>
                    {enquiry.message && (
                      <p className="text-sm text-muted-foreground mt-2 bg-muted/50 p-3 rounded-lg">
                        {enquiry.message}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {format(new Date(enquiry.created_at), 'MMM dd, yyyy - hh:mm a')}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Select
                      value={enquiry.status}
                      onValueChange={(value) => updateStatus(enquiry.id, value)}
                    >
                      <SelectTrigger className="w-36">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="enrolled">Enrolled</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button size="sm" variant="outline" asChild>
                      <a href={`mailto:${enquiry.email}`}>Send Email</a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
