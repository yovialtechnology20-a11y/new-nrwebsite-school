'use client';

import Link from 'next/link';
import { GraduationCap, CalendarDays, Award, Phone, BookOpen, Users } from 'lucide-react';

const quickLinks = [
  {
    title: 'Admissions',
    description: 'Start your journey with us',
    icon: GraduationCap,
    href: '/admissions',
    color: 'bg-blue-500',
  },
  {
    title: 'Gallery',
    description: 'Explore our campus & events',
    icon: BookOpen,
    href: '/gallery',
    color: 'bg-green-500',
  },
  {
    title: 'Achievements',
    description: 'Our proud moments',
    icon: Award,
    href: '/achievements',
    color: 'bg-amber-500',
  },
  {
    title: 'Contact',
    description: 'Get in touch with us',
    icon: Phone,
    href: '/contact',
    color: 'bg-rose-500',
  },
];

export default function QuickLinksSection() {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container-custom">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {quickLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.title}
                href={link.href}
                className="group relative overflow-hidden rounded-2xl bg-white p-6 md:p-8 shadow-md hover:shadow-xl transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`absolute top-0 right-0 w-32 h-32 ${link.color} opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500`} />
                <div className={`w-14 h-14 rounded-xl ${link.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {link.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {link.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
