#!/usr/bin/env python3
"""Stamp a build id into the package page and version.json.

Run before every push. An open tab polls version.json and reloads itself when
the id changes, which is the only stale case that actually matters: HTTP
caching here is max-age=600, so a reloaded page fixes itself within ten
minutes, but a tab left open from this morning never re-fetches at all.
"""
import datetime, json, pathlib, re, sys

ROOT = pathlib.Path(__file__).parent
PKG = ROOT / 'package'
build = datetime.datetime.now().strftime('%Y%m%d-%H%M%S')

(PKG / 'version.json').write_text(json.dumps({'build': build}) + '\n')

idx = PKG / 'index.html'
html = idx.read_text()
if 'data-build=' in html:
    html = re.sub(r'data-build="[^"]*"', f'data-build="{build}"', html, count=1)
else:
    sys.exit('index.html has no data-build marker — add the updater block first')
idx.write_text(html)
print('stamped', build)
