-- Update campus buildings
UPDATE buildings
SET nama = 'Gedung GTI'
WHERE id = 1;

INSERT INTO buildings (nama)
SELECT 'Gedung Adriansyah'
WHERE NOT EXISTS (
    SELECT 1
    FROM buildings
    WHERE nama = 'Gedung Adriansyah'
);

-- Update existing GTI room
UPDATE rooms
SET
    nama = 'Perpustakaan',
    lantai = '1',
    building_id = 1
WHERE id = 1;

-- Add GTI rooms if they do not already exist
INSERT INTO rooms (nama, lantai, building_id)
SELECT 'Aula GTI', '1', 1
WHERE NOT EXISTS (
    SELECT 1
    FROM rooms
    WHERE nama = 'Aula GTI'
      AND building_id = 1
);

INSERT INTO rooms (nama, lantai, building_id)
SELECT 'Ruangan Al-Jazari', '2', 1
WHERE NOT EXISTS (
    SELECT 1
    FROM rooms
    WHERE nama = 'Ruangan Al-Jazari'
      AND building_id = 1
);

INSERT INTO rooms (nama, lantai, building_id)
SELECT 'Ruangan dosen TRKJ', '2', 1
WHERE NOT EXISTS (
    SELECT 1
    FROM rooms
    WHERE nama = 'Ruangan dosen TRKJ'
      AND building_id = 1
);

INSERT INTO rooms (nama, lantai, building_id)
SELECT 'Al-Khawarizmi', '3', 1
WHERE NOT EXISTS (
    SELECT 1
    FROM rooms
    WHERE nama = 'Al-Khawarizmi'
      AND building_id = 1
);

INSERT INTO rooms (nama, lantai, building_id)
SELECT 'Laboratorium Komputer Linus', '3', 1
WHERE NOT EXISTS (
    SELECT 1
    FROM rooms
    WHERE nama = 'Laboratorium Komputer Linus'
      AND building_id = 1
);

-- Add Adriansyah rooms
INSERT INTO rooms (nama, lantai, building_id)
SELECT 'Ruangan HTML', '1', b.id
FROM buildings b
WHERE b.nama = 'Gedung Adriansyah'
  AND NOT EXISTS (
      SELECT 1
      FROM rooms r
      WHERE r.nama = 'Ruangan HTML'
        AND r.building_id = b.id
  );

INSERT INTO rooms (nama, lantai, building_id)
SELECT 'Ruangan C++', '1', b.id
FROM buildings b
WHERE b.nama = 'Gedung Adriansyah'
  AND NOT EXISTS (
      SELECT 1
      FROM rooms r
      WHERE r.nama = 'Ruangan C++'
        AND r.building_id = b.id
  );

-- Update locations
UPDATE locations
SET
    nama = 'Gerbang Utama',
    tipe = 'titik_awal',
    latitude = -3.7532835221900323,
    longitude = 114.7658193043085
WHERE id = 1;

UPDATE locations
SET
    nama = 'Gedung GTI',
    tipe = 'gedung',
    latitude = -3.75344139724123,
    longitude = 114.76761433660198
WHERE id = 2;

UPDATE locations
SET
    nama = 'Gedung Adriansyah',
    tipe = 'gedung',
    latitude = -3.753768196448153,
    longitude = 114.76712621229326
WHERE id = 3;

DELETE FROM locations
WHERE id = 4
  AND nama = 'Perpustakaan';