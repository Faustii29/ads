-- ================================================
-- KOTEN PADEL - Supabase Database Setup
-- Ejecutar en: Supabase > SQL Editor > New Query
-- ================================================

CREATE TABLE reservations (
  id              UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  date            DATE        NOT NULL,
  slot_index      INTEGER     NOT NULL CHECK (slot_index >= 0 AND slot_index <= 6),
  court           INTEGER     NOT NULL CHECK (court >= 1 AND court <= 3),
  customer_name   TEXT        NOT NULL,
  customer_phone  TEXT        DEFAULT '',
  cancel_code     TEXT        NOT NULL,
  cancelled_at    TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Restriccion: solo un turno activo por cancha/horario/fecha
CREATE UNIQUE INDEX unique_active_booking
  ON reservations(date, slot_index, court)
  WHERE cancelled_at IS NULL;

-- Row Level Security
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_access"
  ON reservations FOR ALL
  USING (true)
  WITH CHECK (true);
