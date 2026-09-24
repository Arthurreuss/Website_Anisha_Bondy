#!/usr/bin/env python3
"""Löst Merge-Konflikte in i18n/locales/*.json: Top-Level-Schlüssel beider Seiten
vereinen (Sub-Agenten schreiben je eigene Namespaces). Bei gleichem Schlüssel
werden Objekte rekursiv vereint; bei echtem Wertkonflikt bricht das Skript ab.
  python3 scripts/merge-locales.py   (während eines Merges)"""
import json, subprocess, sys

def deep(a, b, path=''):
    out = dict(a)
    for k, v in b.items():
        if k in out and isinstance(out[k], dict) and isinstance(v, dict):
            out[k] = deep(out[k], v, f'{path}.{k}')
        elif k in out and out[k] != v:
            sys.exit(f'Wertkonflikt bei {path}.{k}: {out[k]!r} vs {v!r}')
        else:
            out[k] = v
    return out

for lang in ('en', 'de'):
    f = f'i18n/locales/{lang}.json'
    ours = json.loads(subprocess.check_output(['git', 'show', f':2:{f}']))
    theirs = json.loads(subprocess.check_output(['git', 'show', f':3:{f}']))
    open(f, 'w').write(json.dumps(deep(ours, theirs), ensure_ascii=False, indent=2) + '\n')
    subprocess.check_call(['git', 'add', f])
    print(f, 'ok')
