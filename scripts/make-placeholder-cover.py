#!/usr/bin/env python3
"""Typografisches Platzhalter-Cover (D-019) in der Säulenfarbe, 4:5, als SVG.

  python3 scripts/make-placeholder-cover.py <slug> <pillar> "<Titel>" "<Jahr>"
  pillar: direct | create | participate  →  public/media/<slug>/cover.svg
Titel darf mit | in Zeilen umbrochen werden ("Der Zauberer|von Oz").
"""
import os, sys
from xml.sax.saxutils import escape

slug, pillar, title, year = sys.argv[1:5]
colors = {'direct': '#b01e3c', 'create': '#15294f', 'participate': '#c27c14'}
labels = {'direct': 'DIRECT', 'create': 'CREATE', 'participate': 'PARTICIPATE'}
lines = title.split('|')
size = 132 if max(len(l) for l in lines) <= 12 else 104 if max(len(l) for l in lines) <= 16 else 84
tspans = ''.join(
    f'<tspan x="90" dy="{0 if i == 0 else size * 1.02:.0f}">{escape(l)}</tspan>' for i, l in enumerate(lines)
)
svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1500" width="1200" height="1500">
<rect width="1200" height="1500" fill="{colors[pillar]}"/>
<text x="90" y="150" fill="#fff" font-family="Inter, Helvetica, Arial, sans-serif" font-size="34" letter-spacing="4" opacity=".85">{labels[pillar]}</text>
<text x="1110" y="150" fill="#fff" font-family="Inter, Helvetica, Arial, sans-serif" font-size="34" text-anchor="end" opacity=".85">{escape(year)}</text>
<text x="90" y="{1360 - size * 1.02 * (len(lines) - 1):.0f}" fill="#fff" font-family="Inter, Helvetica, Arial, sans-serif" font-size="{size}" font-weight="500" letter-spacing="-2">{tspans}</text>
</svg>
'''
os.makedirs(f'public/media/{slug}', exist_ok=True)
open(f'public/media/{slug}/cover.svg', 'w').write(svg)
print(f'public/media/{slug}/cover.svg 1200 1500')
