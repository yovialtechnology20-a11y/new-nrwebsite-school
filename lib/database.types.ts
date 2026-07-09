export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      site_settings: {
        Row: {
          id: string;
          hero_title: string;
          hero_subtitle: string | null;
          hero_image_url: string | null;
          welcome_message: string | null;
          welcome_title: string | null;
          school_name: string;
          school_tagline: string | null;
          logo_url: string | null;
          address: string | null;
          phone: string | null;
          email: string | null;
          working_hours: string | null;
          facebook_url: string | null;
          instagram_url: string | null;
          twitter_url: string | null;
          youtube_url: string | null;
          linkedin_url: string | null;
          whatsapp_number: string | null;
          google_maps_embed: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          hero_title?: string;
          hero_subtitle?: string | null;
          hero_image_url?: string | null;
          welcome_message?: string | null;
          welcome_title?: string | null;
          school_name?: string;
          school_tagline?: string | null;
          logo_url?: string | null;
          address?: string | null;
          phone?: string | null;
          email?: string | null;
          working_hours?: string | null;
          facebook_url?: string | null;
          instagram_url?: string | null;
          twitter_url?: string | null;
          youtube_url?: string | null;
          linkedin_url?: string | null;
          whatsapp_number?: string | null;
          google_maps_embed?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          hero_title?: string;
          hero_subtitle?: string | null;
          hero_image_url?: string | null;
          welcome_message?: string | null;
          welcome_title?: string | null;
          school_name?: string;
          school_tagline?: string | null;
          logo_url?: string | null;
          address?: string | null;
          phone?: string | null;
          email?: string | null;
          working_hours?: string | null;
          facebook_url?: string | null;
          instagram_url?: string | null;
          twitter_url?: string | null;
          youtube_url?: string | null;
          linkedin_url?: string | null;
          whatsapp_number?: string | null;
          google_maps_embed?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      statistics: {
        Row: {
          id: string;
          label: string;
          value: number;
          icon: string | null;
          display_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          label: string;
          value?: number;
          icon?: string | null;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          label?: string;
          value?: number;
          icon?: string | null;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      news: {
        Row: {
          id: string;
          title: string;
          content: string;
          excerpt: string | null;
          image_url: string | null;
          category: string;
          is_pinned: boolean;
          is_published: boolean;
          published_at: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          content: string;
          excerpt?: string | null;
          image_url?: string | null;
          category?: string;
          is_pinned?: boolean;
          is_published?: boolean;
          published_at?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          content?: string;
          excerpt?: string | null;
          image_url?: string | null;
          category?: string;
          is_pinned?: boolean;
          is_published?: boolean;
          published_at?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      events: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          image_url: string | null;
          event_date: string;
          event_time: string | null;
          location: string | null;
          category: string;
          is_upcoming: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          image_url?: string | null;
          event_date: string;
          event_time?: string | null;
          location?: string | null;
          category?: string;
          is_upcoming?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          image_url?: string | null;
          event_date?: string;
          event_time?: string | null;
          location?: string | null;
          category?: string;
          is_upcoming?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      achievements: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          student_name: string | null;
          category: string;
          year: number;
          image_url: string | null;
          rank: string | null;
          award: string | null;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          student_name?: string | null;
          category?: string;
          year: number;
          image_url?: string | null;
          rank?: string | null;
          award?: string | null;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          student_name?: string | null;
          category?: string;
          year?: number;
          image_url?: string | null;
          rank?: string | null;
          award?: string | null;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      gallery_albums: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          cover_image_url: string | null;
          category: string;
          event_date: string | null;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          cover_image_url?: string | null;
          category?: string;
          event_date?: string | null;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          cover_image_url?: string | null;
          category?: string;
          event_date?: string | null;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      gallery_images: {
        Row: {
          id: string;
          album_id: string | null;
          image_url: string;
          caption: string | null;
          display_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          album_id?: string | null;
          image_url: string;
          caption?: string | null;
          display_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          album_id?: string | null;
          image_url?: string;
          caption?: string | null;
          display_order?: number;
          created_at?: string;
        };
      };
      faculty: {
        Row: {
          id: string;
          name: string;
          designation: string;
          department: string | null;
          qualification: string | null;
          experience: string | null;
          bio: string | null;
          image_url: string | null;
          email: string | null;
          display_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          designation: string;
          department?: string | null;
          qualification?: string | null;
          experience?: string | null;
          bio?: string | null;
          image_url?: string | null;
          email?: string | null;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          designation?: string;
          department?: string | null;
          qualification?: string | null;
          experience?: string | null;
          bio?: string | null;
          image_url?: string | null;
          email?: string | null;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      leadership: {
        Row: {
          id: string;
          name: string;
          designation: string;
          message: string | null;
          image_url: string | null;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          designation: string;
          message?: string | null;
          image_url?: string | null;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          designation?: string;
          message?: string | null;
          image_url?: string | null;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      testimonials: {
        Row: {
          id: string;
          name: string;
          role: string | null;
          content: string;
          image_url: string | null;
          rating: number;
          display_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          role?: string | null;
          content: string;
          image_url?: string | null;
          rating?: number;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          role?: string | null;
          content?: string;
          image_url?: string | null;
          rating?: number;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      admission_enquiries: {
        Row: {
          id: string;
          student_name: string;
          parent_name: string;
          email: string;
          phone: string;
          grade: string | null;
          message: string | null;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          student_name: string;
          parent_name: string;
          email: string;
          phone: string;
          grade?: string | null;
          message?: string | null;
          status?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          student_name?: string;
          parent_name?: string;
          email?: string;
          phone?: string;
          grade?: string | null;
          message?: string | null;
          status?: string;
          created_at?: string;
        };
      };
      faq: {
        Row: {
          id: string;
          question: string;
          answer: string;
          category: string;
          display_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          question: string;
          answer: string;
          category?: string;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          question?: string;
          answer?: string;
          category?: string;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      facilities: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          image_url: string | null;
          icon: string | null;
          display_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          image_url?: string | null;
          icon?: string | null;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          image_url?: string | null;
          icon?: string | null;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      about_content: {
        Row: {
          id: string;
          section_name: string;
          title: string | null;
          content: string | null;
          image_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          section_name: string;
          title?: string | null;
          content?: string | null;
          image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          section_name?: string;
          title?: string | null;
          content?: string | null;
          image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      academics_content: {
        Row: {
          id: string;
          section_name: string;
          title: string | null;
          content: string | null;
          image_url: string | null;
          icon: string | null;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          section_name: string;
          title?: string | null;
          content?: string | null;
          image_url?: string | null;
          icon?: string | null;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          section_name?: string;
          title?: string | null;
          content?: string | null;
          image_url?: string | null;
          icon?: string | null;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

export type SiteSettings = Database['public']['Tables']['site_settings']['Row'];
export type Statistics = Database['public']['Tables']['statistics']['Row'];
export type News = Database['public']['Tables']['news']['Row'];
export type Events = Database['public']['Tables']['events']['Row'];
export type Achievements = Database['public']['Tables']['achievements']['Row'];
export type GalleryAlbums = Database['public']['Tables']['gallery_albums']['Row'];
export type GalleryImages = Database['public']['Tables']['gallery_images']['Row'];
export type Faculty = Database['public']['Tables']['faculty']['Row'];
export type Leadership = Database['public']['Tables']['leadership']['Row'];
export type Testimonials = Database['public']['Tables']['testimonials']['Row'];
export type AdmissionEnquiries = Database['public']['Tables']['admission_enquiries']['Row'];
export type FAQ = Database['public']['Tables']['faq']['Row'];
export type Facilities = Database['public']['Tables']['facilities']['Row'];
export type AboutContent = Database['public']['Tables']['about_content']['Row'];
export type AcademicsContent = Database['public']['Tables']['academics_content']['Row'];
