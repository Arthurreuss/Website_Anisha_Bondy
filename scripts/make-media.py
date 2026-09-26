#!/usr/bin/env python3
"""Fotos für die Seite aufbereiten (D-039): auf ein Seitenverhältnis
zuschneiden, verkleinern, als JPG speichern. Ersetzt für echte Fotos
make-cover.py (das nur 4:5 ohne Verkleinerung kann).

  python3 scripts/make-media.py <quelle> public/media/<slug>/<name>.jpg \
      [--ratio 4:5|16:10|orig] [--width 1600] [--focus 0.5] [--focus-y 0.5]

Richtwerte (anfrage-anisha.md §4): Cover 4:5 / 1600, Einzelbild 16:10 / 2400,
Dreiergruppe 4:5 / 1200. --focus/--focus-y = Bildmitte des Ausschnitts 0..1.
Gibt Breite und Höhe aus (für width/height im Projekt). Benötigt Pillow.
"""
import argparse, os
from PIL import Image, ImageOps

ap = argparse.ArgumentParser()
ap.add_argument('src')
ap.add_argument('out')
ap.add_argument('--ratio', default='4:5')
ap.add_argument('--width', type=int, default=1600)
ap.add_argument('--focus', type=float, default=0.5)
ap.add_argument('--focus-y', type=float, default=0.5)
a = ap.parse_args()

im = ImageOps.exif_transpose(Image.open(a.src)).convert('RGB')
w, h = im.size
if a.ratio != 'orig':
    rw, rh = (int(x) for x in a.ratio.split(':'))
    if w / h > rw / rh:
        cw = round(h * rw / rh)
        x = min(max(round(w * a.focus - cw / 2), 0), w - cw)
        im = im.crop((x, 0, x + cw, h))
    else:
        ch = round(w * rh / rw)
        y = min(max(round(h * a.focus_y - ch / 2), 0), h - ch)
        im = im.crop((0, y, w, y + ch))
if im.width > a.width:
    im = im.resize((a.width, round(im.height * a.width / im.width)), Image.LANCZOS)
os.makedirs(os.path.dirname(a.out), exist_ok=True)
im.save(a.out, 'JPEG', quality=80, optimize=True, progressive=True)
print(im.width, im.height)
