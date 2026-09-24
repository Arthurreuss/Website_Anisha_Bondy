#!/usr/bin/env python3
"""Vorläufige Cover (D-018): Bild (Datei oder URL, z. B. YouTube-Thumbnail)
mittig auf 4:5 beschneiden und als JPG speichern.

  python3 scripts/make-cover.py <quelle> public/media/<slug>/cover.jpg [--focus 0.5]
  YouTube: https://i.ytimg.com/vi/<id>/maxresdefault.jpg
--focus = horizontale Bildmitte 0..1 (Standard 0.5). Benötigt Pillow.
Gibt Breite und Höhe aus (für width/height im Projekt).
"""
import io, sys, os, urllib.request
from PIL import Image

src, out = sys.argv[1], sys.argv[2]
focus = float(sys.argv[sys.argv.index('--focus') + 1]) if '--focus' in sys.argv else 0.5
data = urllib.request.urlopen(src).read() if src.startswith('http') else open(src, 'rb').read()
im = Image.open(io.BytesIO(data)).convert('RGB')
w, h = im.size
if w / h > 4 / 5:
    cw = round(h * 4 / 5)
    x = min(max(round(w * focus - cw / 2), 0), w - cw)
    im = im.crop((x, 0, x + cw, h))
else:
    ch = round(w * 5 / 4)
    y = max((h - ch) // 2, 0)
    im = im.crop((0, y, w, y + ch))
os.makedirs(os.path.dirname(out), exist_ok=True)
im.save(out, 'JPEG', quality=82, optimize=True, progressive=True)
print(im.size[0], im.size[1])
