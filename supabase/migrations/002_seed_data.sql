-- ============================================================
-- PureBeauty — Seed Data
-- Run AFTER 001_initial_schema.sql
-- ============================================================

-- ─── PRODUCTS ────────────────────────────────────────────────
INSERT INTO public.products (name, brand, category, image_url, tags, suitable_for, price) VALUES

('Luminous Silk Foundation', 'Giorgio Armani', 'Luxury',
 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80',
 ARRAY['foundation','luminous','medium-coverage'],
 '{"undertone":["warm","neutral"],"skin_type":["normal","dry"]}',
 64.00),

('Pillow Talk Lipstick', 'Charlotte Tilbury', 'Luxury',
 'https://images.unsplash.com/photo-1586495777744-4e6232bf2f9a?w=400&q=80',
 ARRAY['lipstick','matte','nude','everyday'],
 '{"undertone":["warm","neutral","cool"],"skin_type":["all"]}',
 38.00),

('Killawatt Freestyle Highlighter', 'Fenty Beauty', 'Luxury',
 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&q=80',
 ARRAY['highlighter','glow','shimmer','buildable'],
 '{"undertone":["warm","neutral","cool"],"skin_type":["all"]}',
 40.00),

('True Match Foundation', 'L''Oréal Paris', 'Drugstore',
 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&q=80',
 ARRAY['foundation','matte','buildable'],
 '{"undertone":["neutral","cool"],"skin_type":["normal","oily"]}',
 13.99),

('Lash Sensational Mascara', 'Maybelline', 'Drugstore',
 'https://images.unsplash.com/photo-1631214499478-9af8b2f6cdb8?w=400&q=80',
 ARRAY['mascara','volumizing','lengthening','everyday'],
 '{"undertone":["warm","neutral","cool"],"skin_type":["all"]}',
 10.99),

('Fit Me Blush', 'Maybelline', 'Drugstore',
 'https://images.unsplash.com/photo-1599733589046-833f5be7d0d3?w=400&q=80',
 ARRAY['blush','natural','buildable','matte'],
 '{"undertone":["warm","neutral"],"skin_type":["all"]}',
 8.99)

ON CONFLICT DO NOTHING;


-- ─── TUTORIALS ───────────────────────────────────────────────
INSERT INTO public.tutorials (title, description, steps, tags, suitable_for) VALUES
(
  'Foundation & Contour Basics',
  'A step-by-step AR guide tailored to your skin profile.',
  '[
    {"step":1,"title":"Apply Foundation","desc":"Start from the center of your face and blend outward using circular motions.","zone":"Center Face"},
    {"step":2,"title":"Contour Cheekbones","desc":"Follow the natural shadow beneath your cheekbones. Blend upward toward temples.","zone":"Cheeks"},
    {"step":3,"title":"Highlight T-Zone","desc":"Apply highlighter to the bridge of your nose and center of forehead.","zone":"T-Zone"},
    {"step":4,"title":"Set with Powder","desc":"Lightly dust translucent powder to lock your look and control shine.","zone":"Full Face"}
  ]',
  ARRAY['foundation','contour','beginner','everyday'],
  '{"undertone":["warm","neutral","cool"],"face_shape":["oval","round","heart","square"]}'
)
ON CONFLICT DO NOTHING;
