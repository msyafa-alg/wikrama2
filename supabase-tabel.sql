-- Tabel Berita
CREATE TABLE berita (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  judul TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  konten TEXT NOT NULL,
  gambar TEXT DEFAULT '',
  penulis TEXT DEFAULT '',
  tanggal DATE NOT NULL DEFAULT CURRENT_DATE,
  kategori TEXT DEFAULT 'Kegiatan',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabel Pengumuman
CREATE TABLE pengumuman (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  judul TEXT NOT NULL,
  konten TEXT NOT NULL,
  tanggal DATE NOT NULL DEFAULT CURRENT_DATE,
  penting BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger auto-update updated_at (optional, biar otomatis)
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_berita_updated_at
  BEFORE UPDATE ON berita
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_pengumuman_updated_at
  BEFORE UPDATE ON pengumuman
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
