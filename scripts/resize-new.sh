#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

NEW=(birria-hero exterior-night tortillas-press grill-flames cilantro-prep \
  consomme-pot cook-plating quesabirria-pull taco-trio-overhead mole-poblano \
  chilaquiles-breakfast carne-asada loaded-nachos seafood tamales burrito-cross \
  salsa-trio friends-night family-dining busy-interior cheers-drinks first-bite \
  delivery-bag open-late table-spread)

before=$(du -sk public/food | awk '{print $1}')
for f in "${NEW[@]}"; do
  src="public/food/$f.webp"
  if [ ! -f "$src" ]; then echo "MISS $f"; continue; fi
  dims=$(webpinfo "$src" 2>/dev/null | awk -F: '/Width/{gsub(/ /,"",$2);w=$2}/Height/{gsub(/ /,"",$2);h=$2}END{print w" "h}')
  w=${dims% *}; h=${dims#* }
  target=1100; [ "$f" = "table-spread" ] && target=1600
  if [ "$w" -ge "$h" ]; then
    if [ "$w" -gt "$target" ]; then rw=$target; else rw=$w; fi; rh=0
  else
    if [ "$h" -gt "$target" ]; then rh=$target; else rh=$h; fi; rw=0
  fi
  dwebp -quiet "$src" -o "$tmp/$f.png"
  cwebp -quiet -q 78 -resize "$rw" "$rh" "$tmp/$f.png" -o "$src"
  echo "ok $f ${w}x${h} -> resize($rw,$rh)"
done
after=$(du -sk public/food | awk '{print $1}')
echo "food dir: ${before}K -> ${after}K"
