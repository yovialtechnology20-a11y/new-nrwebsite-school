'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/lib/supabase';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import {
  FileText,
  CheckCircle,
  Download,
  Clock,
  Phone,
  Mail,
  MapPin,
  Calendar,
  ArrowRight,
} from 'lucide-react';

const admissionSchema = z.object({
  student_name: z.string().min(2, 'Student name is required'),
  parent_name: z.string().min(2, 'Parent/Guardian name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  grade: z.string().min(1, 'Grade is required'),
  message: z.string().optional(),
});

type AdmissionFormData = z.infer<typeof admissionSchema>;

const admissionProcess = [
  { step: 1, title: 'Submit Enquiry', description: 'Fill out the admission enquiry form' },
  { step: 2, title: 'Assessment', description: 'Appear for entrance assessment' },
  { step: 3, title: 'Interview', description: 'Personal interaction with parents' },
  { step: 4, title: 'Admission', description: 'Complete formalities and secure admission' },
];

const documents = [
  'Birth Certificate',
  'Previous School Records',
  'Transfer Certificate',
  'Passport Size Photos',
  'Aadhaar Card (Student & Parent)',
  'Address Proof',
];

const grades = [
  'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5',
  'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10',
  'Grade 11', 'Grade 12',
];

export default function AdmissionsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<AdmissionFormData>({
    resolver: zodResolver(admissionSchema),
    defaultValues: {
      student_name: '',
      parent_name: '',
      email: '',
      phone: '',
      grade: '',
      message: '',
    },
  });

  async function onSubmit(data: AdmissionFormData) {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('admission_enquiries').insert({
        student_name: data.student_name,
        parent_name: data.parent_name,
        email: data.email,
        phone: data.phone,
        grade: data.grade,
        message: data.message || null,
        status: 'pending',
      });

      if (error) throw error;
      toast.success('Thank you! Your enquiry has been submitted successfully.');
      form.reset();
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 gradient-primary">
          <div className="absolute inset-0 opacity-10">
            <img
              src="https://images.pexels.com/photos/8199141/pexels-photo-8199141.jpeg?auto=compress&cs=tinysrgb&w=1920"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="container-custom relative z-10 text-center">
          <Badge variant="secondary" className="mb-4 gradient-gold text-primary">
            Admissions Open 2024-25
          </Badge>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Begin Your Journey
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Take the first step towards your child&apos;s bright future. Apply for admission today.
          </p>
        </div>
      </section>

      {/* Admission Process */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">Admission Process</Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Simple 4-Step Process
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our streamlined admission process ensures a smooth experience for parents and students
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {admissionProcess.map((item, index) => (
              <div
                key={item.step}
                className="relative text-center p-6 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                  {item.step}
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
                {index < admissionProcess.length - 1 && (
                  <div className="hidden md:block absolute top-8 -right-3 w-6 h-6">
                    <ArrowRight className="h-6 w-6 text-muted" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form and Requirements */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Admission Form */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="font-display text-2xl">
                    Admission Enquiry Form
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="student_name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Student Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter student name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="parent_name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Parent/Guardian Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter parent name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="Enter email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input type="tel" placeholder="Enter phone number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="grade"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Seeking Admission For</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select grade" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {grades.map((grade) => (
                                  <SelectItem key={grade} value={grade}>
                                    {grade}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Additional Message (Optional)</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Any specific queries or requirements"
                                className="resize-none"
                                rows={4}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        className="w-full gradient-primary hover:opacity-90"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Documents Required */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-display text-lg">
                    <FileText className="h-5 w-5 text-primary" />
                    Documents Required
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {documents.map((doc) => (
                      <li key={doc} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-secondary mt-1 flex-shrink-0" />
                        <span className="text-sm text-foreground">{doc}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-display text-lg">
                    <Phone className="h-5 w-5 text-primary" />
                    Need Help?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">+91 123 456 7890</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">admissions@pacenr.edu</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Mon-Sat: 8AM - 4PM</span>
                  </div>
                </CardContent>
              </Card>

              {/* Download Brochure */}
              <Card className="border-0 shadow-lg gradient-primary">
                <CardContent className="p-6 text-center">
                  <Download className="h-10 w-10 text-white mx-auto mb-3" />
                  <h3 className="font-display font-semibold text-white mb-2">
                    Download Brochure
                  </h3>
                  <p className="text-sm text-white/80 mb-4">
                    Get detailed information about our school
                  </p>
                  <Button className="bg-white text-primary hover:bg-white/90">
                    Download PDF
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Fee Structure */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">Fee Information</Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Fee Enquiry
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              For detailed fee structure, please contact our admissions office or fill the enquiry form above.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Calendar, title: 'Academic Session', value: 'April - March' },
              { icon: Clock, title: 'Office Hours', value: '8:00 AM - 4:00 PM' },
              { icon: Phone, title: 'Helpline', value: '+91 123 456 7890' },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="text-center p-6 bg-white rounded-2xl shadow-md animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-14 h-14 rounded-full gradient-gold flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-muted-foreground">{item.value}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
