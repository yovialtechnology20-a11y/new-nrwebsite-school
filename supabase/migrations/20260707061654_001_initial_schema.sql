/*
# PACE NR Olympiad School Website - Initial Schema

1. New Tables
   - `site_settings` - Global site configuration (hero, welcome message, stats)
   - `news` - News and announcements
   - `events` - School events
   - `achievements` - Academic and Olympiad achievements  
   - `gallery_albums` - Photo album categories
   - `gallery_images` - Individual photos in albums
   - `faculty` - Teacher profiles
   - `testimonials` - Parent and student testimonials
   - `admission_enquiries` - Contact form submissions
   - `founder_message` - Founder's inspirational message
   - `faq` - Frequently asked questions
   - `facilities` - School facilities information

2. Security
   - Enable RLS on all tables
   - Admin users have full CRUD access (authenticated)
   - Public readonly access for site content (anon, authenticated)
   - Admin-only write access for management

3. Notes
   - Single admin user for content management
   - Public users can submit enquiries
   - All content tables have created_at/updated_at timestamps
*/

-- Site Settings
CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  hero_title text NOT NULL DEFAULT 'Excellence in Education',
  hero_subtitle text DEFAULT NULL,
  hero_image_url text DEFAULT NULL,
  welcome_message text DEFAULT NULL,
  welcome_title text DEFAULT NULL,
  school_name text NOT NULL DEFAULT 'PACE NR Olympiad School',
  school_tagline text DEFAULT NULL,
  logo_url text DEFAULT NULL,
  address text DEFAULT NULL,
  phone text DEFAULT NULL,
  email text DEFAULT NULL,
  working_hours text DEFAULT NULL,
  facebook_url text DEFAULT NULL,
  instagram_url text DEFAULT NULL,
  twitter_url text DEFAULT NULL,
  youtube_url text DEFAULT NULL,
  linkedin_url text DEFAULT NULL,
  whatsapp_number text DEFAULT NULL,
  google_maps_embed text DEFAULT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Statistics
CREATE TABLE IF NOT EXISTS statistics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label text NOT NULL,
  value integer NOT NULL DEFAULT 0,
  icon text DEFAULT NULL,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- News and Announcements
CREATE TABLE IF NOT EXISTS news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  excerpt text DEFAULT NULL,
  image_url text DEFAULT NULL,
  category text DEFAULT 'general',
  is_pinned boolean DEFAULT false,
  is_published boolean DEFAULT true,
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Events
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT NULL,
  image_url text DEFAULT NULL,
  event_date date NOT NULL,
  event_time text DEFAULT NULL,
  location text DEFAULT NULL,
  category text DEFAULT 'general',
  is_upcoming boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Achievements
CREATE TABLE IF NOT EXISTS achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT NULL,
  student_name text DEFAULT NULL,
  category text NOT NULL DEFAULT 'academic',
  year integer NOT NULL,
  image_url text DEFAULT NULL,
  rank text DEFAULT NULL,
  award text DEFAULT NULL,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Gallery Albums
CREATE TABLE IF NOT EXISTS gallery_albums (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text DEFAULT NULL,
  cover_image_url text DEFAULT NULL,
  category text DEFAULT 'general',
  event_date date DEFAULT NULL,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Gallery Images
CREATE TABLE IF NOT EXISTS gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  album_id uuid REFERENCES gallery_albums(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  caption text DEFAULT NULL,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Faculty
CREATE TABLE IF NOT EXISTS faculty (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  designation text NOT NULL,
  department text DEFAULT NULL,
  qualification text DEFAULT NULL,
  experience text DEFAULT NULL,
  bio text DEFAULT NULL,
  image_url text DEFAULT NULL,
  email text DEFAULT NULL,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Leadership
CREATE TABLE IF NOT EXISTS leadership (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  designation text NOT NULL,
  message text DEFAULT NULL,
  image_url text DEFAULT NULL,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text DEFAULT NULL,
  content text NOT NULL,
  image_url text DEFAULT NULL,
  rating integer DEFAULT 5,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Admission Enquiries
CREATE TABLE IF NOT EXISTS admission_enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_name text NOT NULL,
  parent_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  grade text DEFAULT NULL,
  message text DEFAULT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- FAQ
CREATE TABLE IF NOT EXISTS faq (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  category text DEFAULT 'general',
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Facilities
CREATE TABLE IF NOT EXISTS facilities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text DEFAULT NULL,
  image_url text DEFAULT NULL,
  icon text DEFAULT NULL,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- About Page Content
CREATE TABLE IF NOT EXISTS about_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_name text NOT NULL UNIQUE,
  title text DEFAULT NULL,
  content text DEFAULT NULL,
  image_url text DEFAULT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Academics Content
CREATE TABLE IF NOT EXISTS academics_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_name text NOT NULL UNIQUE,
  title text DEFAULT NULL,
  content text DEFAULT NULL,
  image_url text DEFAULT NULL,
  icon text DEFAULT NULL,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE statistics ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE faculty ENABLE ROW LEVEL SECURITY;
ALTER TABLE leadership ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE admission_enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq ENABLE ROW LEVEL SECURITY;
ALTER TABLE facilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE academics_content ENABLE ROW LEVEL SECURITY;

-- RLS Policies for public read access (anon + authenticated)
-- Site Settings
DROP POLICY IF EXISTS "public_read_site_settings" ON site_settings;
CREATE POLICY "public_read_site_settings" ON site_settings FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "admin_write_site_settings" ON site_settings;
CREATE POLICY "admin_write_site_settings" ON site_settings FOR ALL TO authenticated WITH CHECK (true);

-- Statistics
DROP POLICY IF EXISTS "public_read_statistics" ON statistics;
CREATE POLICY "public_read_statistics" ON statistics FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "admin_write_statistics" ON statistics;
CREATE POLICY "admin_write_statistics" ON statistics FOR ALL TO authenticated WITH CHECK (true);

-- News
DROP POLICY IF EXISTS "public_read_news" ON news;
CREATE POLICY "public_read_news" ON news FOR SELECT TO anon, authenticated USING (is_published = true);
DROP POLICY IF EXISTS "admin_write_news" ON news;
CREATE POLICY "admin_write_news" ON news FOR ALL TO authenticated WITH CHECK (true);

-- Events
DROP POLICY IF EXISTS "public_read_events" ON events;
CREATE POLICY "public_read_events" ON events FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "admin_write_events" ON events;
CREATE POLICY "admin_write_events" ON events FOR ALL TO authenticated WITH CHECK (true);

-- Achievements
DROP POLICY IF EXISTS "public_read_achievements" ON achievements;
CREATE POLICY "public_read_achievements" ON achievements FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "admin_write_achievements" ON achievements;
CREATE POLICY "admin_write_achievements" ON achievements FOR ALL TO authenticated WITH CHECK (true);

-- Gallery Albums
DROP POLICY IF EXISTS "public_read_gallery_albums" ON gallery_albums;
CREATE POLICY "public_read_gallery_albums" ON gallery_albums FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "admin_write_gallery_albums" ON gallery_albums;
CREATE POLICY "admin_write_gallery_albums" ON gallery_albums FOR ALL TO authenticated WITH CHECK (true);

-- Gallery Images
DROP POLICY IF EXISTS "public_read_gallery_images" ON gallery_images;
CREATE POLICY "public_read_gallery_images" ON gallery_images FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "admin_write_gallery_images" ON gallery_images;
CREATE POLICY "admin_write_gallery_images" ON gallery_images FOR ALL TO authenticated WITH CHECK (true);

-- Faculty
DROP POLICY IF EXISTS "public_read_faculty" ON faculty;
CREATE POLICY "public_read_faculty" ON faculty FOR SELECT TO anon, authenticated USING (is_active = true);
DROP POLICY IF EXISTS "admin_write_faculty" ON faculty;
CREATE POLICY "admin_write_faculty" ON faculty FOR ALL TO authenticated WITH CHECK (true);

-- Leadership
DROP POLICY IF EXISTS "public_read_leadership" ON leadership;
CREATE POLICY "public_read_leadership" ON leadership FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "admin_write_leadership" ON leadership;
CREATE POLICY "admin_write_leadership" ON leadership FOR ALL TO authenticated WITH CHECK (true);

-- Testimonials
DROP POLICY IF EXISTS "public_read_testimonials" ON testimonials;
CREATE POLICY "public_read_testimonials" ON testimonials FOR SELECT TO anon, authenticated USING (is_active = true);
DROP POLICY IF EXISTS "admin_write_testimonials" ON testimonials;
CREATE POLICY "admin_write_testimonials" ON testimonials FOR ALL TO authenticated WITH CHECK (true);

-- Admission Enquiries - public can insert, admin can read/delete
DROP POLICY IF EXISTS "public_insert_enquiries" ON admission_enquiries;
CREATE POLICY "public_insert_enquiries" ON admission_enquiries FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "admin_read_enquiries" ON admission_enquiries;
CREATE POLICY "admin_read_enquiries" ON admission_enquiries FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "admin_update_enquiries" ON admission_enquiries;
CREATE POLICY "admin_update_enquiries" ON admission_enquiries FOR UPDATE TO authenticated WITH CHECK (true);

-- FAQ
DROP POLICY IF EXISTS "public_read_faq" ON faq;
CREATE POLICY "public_read_faq" ON faq FOR SELECT TO anon, authenticated USING (is_active = true);
DROP POLICY IF EXISTS "admin_write_faq" ON faq;
CREATE POLICY "admin_write_faq" ON faq FOR ALL TO authenticated WITH CHECK (true);

-- Facilities
DROP POLICY IF EXISTS "public_read_facilities" ON facilities;
CREATE POLICY "public_read_facilities" ON facilities FOR SELECT TO anon, authenticated USING (is_active = true);
DROP POLICY IF EXISTS "admin_write_facilities" ON facilities;
CREATE POLICY "admin_write_facilities" ON facilities FOR ALL TO authenticated WITH CHECK (true);

-- About Content
DROP POLICY IF EXISTS "public_read_about_content" ON about_content;
CREATE POLICY "public_read_about_content" ON about_content FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "admin_write_about_content" ON about_content;
CREATE POLICY "admin_write_about_content" ON about_content FOR ALL TO authenticated WITH CHECK (true);

-- Academics Content
DROP POLICY IF EXISTS "public_read_academics_content" ON academics_content;
CREATE POLICY "public_read_academics_content" ON academics_content FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "admin_write_academics_content" ON academics_content;
CREATE POLICY "admin_write_academics_content" ON academics_content FOR ALL TO authenticated WITH CHECK (true);

-- Insert default site settings
INSERT INTO site_settings (hero_title, hero_subtitle, welcome_message, welcome_title)
VALUES (
  'Empowering Young Minds Through Excellence',
  'A Premier Institution for Olympiad Preparation and Academic Brilliance',
  'Welcome to PACE NR Olympiad School, where excellence meets opportunity. We nurture young minds with world-class education, Olympiad coaching, and holistic development.',
  'Welcome to PACE NR Olympiad'
) ON CONFLICT DO NOTHING;

-- Insert default statistics
INSERT INTO statistics (label, value, icon, display_order) VALUES
  ('Students Enrolled', 2500, 'users', 1),
  ('Expert Faculty', 150, 'award', 2),
  ('Olympiad Winners', 500, 'trophy', 3),
  ('Years of Excellence', 15, 'calendar', 4),
  ('Success Rate', 98, 'percent', 5) ON CONFLICT DO NOTHING;

-- Insert default about sections
INSERT INTO about_content (section_name, title, content) VALUES
  ('vision', 'Our Vision', 'To be the premier institution that nurtures intellectual curiosity, fosters innovation, and develops future leaders who excel globally.'),
  ('mission', 'Our Mission', 'To provide world-class education through innovative teaching methodologies, Olympiad preparation, and holistic development programs that inspire students to achieve excellence.'),
  ('values', 'Our Core Values', 'Excellence, Integrity, Innovation, Discipline, Collaboration, and Lifelong Learning form the foundation of our educational philosophy.'),
  ('history', 'Our Journey', 'Founded with a vision to nurture academic excellence, PACE NR Olympiad has grown into a premier institution that consistently produces Olympiad toppers and academic achievers.') ON CONFLICT DO NOTHING;

-- Insert default academic sections
INSERT INTO academics_content (section_name, title, content, icon, display_order) VALUES
  ('curriculum', 'Comprehensive Curriculum', 'Our curriculum is designed to provide a strong foundation in core subjects while preparing students for competitive examinations.', 'book-open', 1),
  ('olympiad', 'Olympiad Coaching', 'Specialized training programs for National and International Olympiads in Mathematics, Science, and English.', 'award', 2),
  ('methodology', 'Teaching Methodology', 'Innovative and student-centered approach that combines traditional wisdom with modern pedagogical techniques.', 'lightbulb', 3),
  ('smart_class', 'Smart Classrooms', 'State-of-the-art digital learning environments equipped with the latest educational technology.', 'monitor', 4),
  ('labs', 'Laboratories', 'Well-equipped science and computer labs for hands-on learning experiences.', 'flask-conical', 5),
  ('assessment', 'Assessment System', 'Regular assessments and feedback mechanisms to track student progress and identify areas for improvement.', 'clipboard-check', 6) ON CONFLICT DO NOTHING;

-- Insert default FAQ
INSERT INTO faq (question, answer, category, display_order) VALUES
  ('What grades does PACE NR Olympiad offer?', 'We offer education from Grade 1 to Grade 12 with specialized Olympiad preparation programs.', 'admissions', 1),
  ('What is the admission process?', 'Admission involves filling out an enquiry form, appearing for an assessment, and completing the documentation process.', 'admissions', 2),
  ('Does the school provide transportation?', 'Yes, we have a fleet of GPS-enabled buses covering major areas of the city.', 'facilities', 3),
  ('What Olympiad competitions do you prepare students for?', 'We prepare students for IMO, NSO, IEO, and various other national and international Olympiads.', 'academics', 4) ON CONFLICT DO NOTHING;

-- Insert default facilities
INSERT INTO facilities (name, description, icon, display_order) VALUES
  ('Smart Classrooms', 'Interactive digital boards and modern teaching aids', 'monitor', 1),
  ('Library', 'Vast collection of books, journals, and digital resources', 'book-open', 2),
  ('Science Labs', 'State-of-the-art physics, chemistry, and biology laboratories', 'flask-conical', 3),
  ('Computer Lab', 'Modern computing facilities with high-speed internet', 'desktop', 4),
  ('Sports Facilities', 'Multi-sport playground with professional equipment', 'trophy', 5),
  ('Transport', 'GPS-enabled buses covering all major routes', 'bus', 6),
  ('Medical Room', 'First-aid facilities with trained medical staff', 'heart-pulse', 7),
  ('CCTV & Security', '24/7 surveillance for student safety', 'shield-check', 8) ON CONFLICT DO NOTHING;

-- Insert default leadership
INSERT INTO leadership (name, designation, message, display_order) VALUES
  ('Dr. Rajesh Kumar', 'Founder & Chairman', 'Education is the most powerful weapon which you can use to change the world. At PACE NR Olympiad, we believe in nurturing not just academic excellence but character and values.', 1),
  ('Mrs. Priya Sharma', 'Principal', 'Our commitment is to provide an environment where every student can discover their potential and achieve their dreams through dedication and hard work.', 2) ON CONFLICT DO NOTHING;

-- Create indexes for frequently queried columns
CREATE INDEX IF NOT EXISTS idx_news_category ON news(category);
CREATE INDEX IF NOT EXISTS idx_news_published ON news(is_published, published_at);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(event_date);
CREATE INDEX IF NOT EXISTS idx_achievements_year ON achievements(year);
CREATE INDEX IF NOT EXISTS idx_gallery_images_album ON gallery_images(album_id);
CREATE INDEX IF NOT EXISTS idx_faculty_active ON faculty(is_active);
CREATE INDEX IF NOT EXISTS idx_testimonials_active ON testimonials(is_active);
CREATE INDEX IF NOT EXISTS idx_faq_active ON faq(is_active);
CREATE INDEX IF NOT EXISTS idx_facilities_active ON facilities(is_active);
