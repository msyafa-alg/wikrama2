-- =============================================
-- 0. GRANT DASAR — biar authenticated bisa akses
-- =============================================
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- =============================================
-- 1. TABEL SISWA (data dasar)
-- =============================================
DROP TABLE IF EXISTS student_details CASCADE;
DROP TABLE IF EXISTS students CASCADE;

CREATE TABLE students (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  nama TEXT NOT NULL,
  rombel TEXT,
  alamat TEXT,
  kelas TEXT NOT NULL CHECK (kelas IN ('kelas10', 'kelas11', 'kelas12')),
  foto TEXT,
  is_dev_web BOOLEAN DEFAULT FALSE,
  is_creator BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- =============================================
-- 2. TABEL DETAIL SISWA
-- =============================================
CREATE TABLE student_details (
  id BIGINT PRIMARY KEY REFERENCES students(id) ON DELETE CASCADE,
  ttl TEXT,
  nisn TEXT,
  email TEXT,
  no_hp TEXT,
  tentang TEXT,
  keahlian JSONB DEFAULT '[]',
  cv_link TEXT,
  porto_link TEXT,
  sertifikat JSONB DEFAULT '[]',
  cv JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW()
);

-- =============================================
-- 3. GRANT ULANG (untuk tabel baru)
-- =============================================
GRANT ALL ON students TO anon, authenticated;
GRANT ALL ON student_details TO anon, authenticated;
GRANT ALL ON students_id_seq TO anon, authenticated;

-- =============================================
-- 4. ROW LEVEL SECURITY
-- =============================================
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_details ENABLE ROW LEVEL SECURITY;

-- Hapus policies lama kalo ada
DROP POLICY IF EXISTS "Publik bisa baca students" ON students;
DROP POLICY IF EXISTS "Publik bisa baca student_details" ON student_details;
DROP POLICY IF EXISTS "Admin bisa insert students" ON students;
DROP POLICY IF EXISTS "Admin bisa update students" ON students;
DROP POLICY IF EXISTS "Admin bisa delete students" ON students;
DROP POLICY IF EXISTS "Admin bisa insert student_details" ON student_details;
DROP POLICY IF EXISTS "Admin bisa update student_details" ON student_details;
DROP POLICY IF EXISTS "Admin bisa delete student_details" ON student_details;

-- Publik bisa baca
CREATE POLICY "Publik bisa baca students" ON students
  FOR SELECT USING (true);

CREATE POLICY "Publik bisa baca student_details" ON student_details
  FOR SELECT USING (true);

-- Authenticated bisa insert / update / delete
CREATE POLICY "Admin bisa insert students" ON students
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Admin bisa update students" ON students
  FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Admin bisa delete students" ON students
  FOR DELETE TO authenticated USING (true);

CREATE POLICY "Admin bisa insert student_details" ON student_details
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Admin bisa update student_details" ON student_details
  FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Admin bisa delete student_details" ON student_details
  FOR DELETE TO authenticated USING (true);

-- =============================================
-- 5. STORAGE POLICY (pastiin bucket student-files udah dibuat)
-- =============================================
DROP POLICY IF EXISTS "Public access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated upload" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated delete" ON storage.objects;

CREATE POLICY "Public access" ON storage.objects
  FOR SELECT USING (bucket_id = 'student-files');

CREATE POLICY "Authenticated upload" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'student-files');

CREATE POLICY "Authenticated delete" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'student-files');

-- =============================================
-- 6. TABEL ALUMNI
-- =============================================
CREATE TABLE IF NOT EXISTS alumni (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  nama TEXT NOT NULL,
  rombel TEXT,
  alamat TEXT,
  angkatan TEXT NOT NULL DEFAULT '2026',
  aktivitas TEXT DEFAULT '-',
  foto TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS alumni_details (
  id BIGINT PRIMARY KEY REFERENCES alumni(id) ON DELETE CASCADE,
  ttl TEXT,
  nisn TEXT,
  email TEXT,
  no_hp TEXT,
  tentang TEXT,
  keahlian JSONB DEFAULT '[]',
  cv_link TEXT,
  porto_link TEXT,
  sertifikat JSONB DEFAULT '[]',
  cv JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW()
);

GRANT ALL ON alumni TO anon, authenticated;
GRANT ALL ON alumni_details TO anon, authenticated;
GRANT ALL ON alumni_id_seq TO anon, authenticated;

ALTER TABLE alumni ENABLE ROW LEVEL SECURITY;
ALTER TABLE alumni_details ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Publik bisa baca alumni" ON alumni;
DROP POLICY IF EXISTS "Publik bisa baca alumni_details" ON alumni_details;
DROP POLICY IF EXISTS "Admin bisa insert alumni" ON alumni;
DROP POLICY IF EXISTS "Admin bisa update alumni" ON alumni;
DROP POLICY IF EXISTS "Admin bisa delete alumni" ON alumni;
DROP POLICY IF EXISTS "Admin bisa insert alumni_details" ON alumni_details;
DROP POLICY IF EXISTS "Admin bisa update alumni_details" ON alumni_details;
DROP POLICY IF EXISTS "Admin bisa delete alumni_details" ON alumni_details;

CREATE POLICY "Publik bisa baca alumni" ON alumni
  FOR SELECT USING (true);

CREATE POLICY "Publik bisa baca alumni_details" ON alumni_details
  FOR SELECT USING (true);

CREATE POLICY "Admin bisa insert alumni" ON alumni
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Admin bisa update alumni" ON alumni
  FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Admin bisa delete alumni" ON alumni
  FOR DELETE TO authenticated USING (true);

CREATE POLICY "Admin bisa insert alumni_details" ON alumni_details
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Admin bisa update alumni_details" ON alumni_details
  FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Admin bisa delete alumni_details" ON alumni_details
  FOR DELETE TO authenticated USING (true);
