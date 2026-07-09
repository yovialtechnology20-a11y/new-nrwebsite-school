'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { FAQ } from '@/lib/database.types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { HelpCircle, MessageCircle, Search } from 'lucide-react';
import Link from 'next/link';

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase
        .from('faq')
        .select('*')
        .eq('is_active', true)
        .order('display_order');
      if (data) setFaqs(data);
    }
    fetchData();
  }, []);

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'admissions', label: 'Admissions' },
    { value: 'academics', label: 'Academics' },
    { value: 'facilities', label: 'Facilities' },
    { value: 'general', label: 'General' },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const categoryMatch = selectedCategory === 'all' || faq.category === selectedCategory;
    const searchMatch =
      searchQuery === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const defaultFaqs = [
    {
      question: 'What grades does PACE NR Olympiad offer?',
      answer: 'We offer education from Grade 1 to Grade 12 with specialized Olympiad preparation programs.',
      category: 'admissions',
    },
    {
      question: 'What is the admission process?',
      answer: 'Admission involves filling out an enquiry form, appearing for an assessment, and completing the documentation process.',
      category: 'admissions',
    },
    {
      question: 'Does the school provide transportation?',
      answer: 'Yes, we have a fleet of GPS-enabled buses covering major areas of the city.',
      category: 'facilities',
    },
    {
      question: 'What Olympiad competitions do you prepare students for?',
      answer: 'We prepare students for IMO, NSO, IEO, and various other national and international Olympiads.',
      category: 'academics',
    },
    {
      question: 'What are the school timings?',
      answer: 'School operates from 8:00 AM to 2:30 PM for primary and 8:00 AM to 4:00 PM for secondary students.',
      category: 'general',
    },
  ];

  const displayFaqs = filteredFaqs.length > 0 ? filteredFaqs : defaultFaqs.map((faq, i) => ({
    ...faq,
    id: `default-${i}`,
    is_active: true,
    display_order: i,
    created_at: '',
    updated_at: '',
  }));

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
            FAQ
          </Badge>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Find answers to common questions about admissions, academics, and more
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-muted/30">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
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
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            {filteredFaqs.length === 0 && faqs.length > 0 ? (
              <div className="text-center py-12">
                <HelpCircle className="h-16 w-16 text-muted mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No matching questions found
                </h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter.
                </p>
              </div>
            ) : (
              <Accordion type="single" collapsible className="space-y-4">
                {displayFaqs.map((faq, index) => (
                  <AccordionItem
                    key={faq.id}
                    value={faq.id}
                    className="bg-white rounded-xl shadow-md border-0 animate-fade-in-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <div className="flex items-center gap-4 text-left">
                        <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-sm">Q</span>
                        </div>
                        <span className="font-medium text-foreground">{faq.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4">
                      <div className="flex items-start gap-4 pl-0 md:pl-12">
                        <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-secondary font-bold text-sm">A</span>
                        </div>
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </div>
        </div>
      </section>

      {/* Still have questions */}
      <section className="py-16 bg-muted/30">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto">
            <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              Still Have Questions?
            </h2>
            <p className="text-muted-foreground mb-6">
              Can&apos;t find the answer you&apos;re looking for? Feel free to reach out to our team.
            </p>
            <Button asChild className="gradient-primary hover:opacity-90">
              <Link href="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
