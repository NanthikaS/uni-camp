/*
  # Authentication and User Management Tables

  1. New Tables
    - `credentials`
      - `id` (uuid, primary key)
      - `user_id` (text, unique)
      - `email` (text, unique)
      - `password` (text)
      - `role` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `credentials` table
    - Add policies for authenticated users
*/

CREATE TABLE IF NOT EXISTS credentials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text UNIQUE NOT NULL,
  email text UNIQUE NOT NULL,
  password text NOT NULL,
  role text NOT NULL CHECK (role IN ('student', 'faculty', 'admin')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE credentials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own credentials"
  ON credentials
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = user_id);

CREATE POLICY "Admin can manage all credentials"
  ON credentials
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM credentials 
    WHERE user_id = auth.uid()::text 
    AND role = 'admin'
  ));