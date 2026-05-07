#!/usr/bin/env bash
# Downloads public-domain headshots for all politicians in data/politicians.json.
# Sources:
#   - Congress members: https://bioguide.congress.gov (public domain)
#   - Presidents: Wikimedia Commons (public domain White House portraits)
#
# Run from the repo root: bash scripts/download-headshots.sh

set -euo pipefail

DEST="public/politicians"
mkdir -p "$DEST"

download() {
  local name="$1"
  local url="$2"
  local file="$DEST/$name"
  if [[ -f "$file" ]]; then
    echo "  skip  $name (already exists)"
    return
  fi
  echo "  fetch $name"
  curl -fsSL -o "$file" "$url"
}

# Congress members — bioguide.congress.gov portraits (all public domain)
# Bioguide ID format: https://bioguide.congress.gov/bioguide/photo/{FIRST_LETTER}/{ID}.jpg
BIOGUIDE="https://bioguide.congress.gov/bioguide/photo"

download "bill-foster.jpg"           "$BIOGUIDE/F/F000454.jpg"
download "jerry-mcnerney.jpg"        "$BIOGUIDE/M/M001166.jpg"
download "elaine-luria.jpg"          "$BIOGUIDE/L/L000590.jpg"
download "alan-grayson.jpg"          "$BIOGUIDE/G/G000556.jpg"
download "bill-cassidy.jpg"          "$BIOGUIDE/C/C001075.jpg"
download "rand-paul.jpg"             "$BIOGUIDE/P/P000603.jpg"
download "rush-holt.jpg"             "$BIOGUIDE/H/H000045.jpg"
download "vernon-ehlers.jpg"         "$BIOGUIDE/E/E000110.jpg"
download "vern-buchanan.jpg"         "$BIOGUIDE/B/B001260.jpg"
download "eddie-bernice-johnson.jpg" "$BIOGUIDE/J/J000126.jpg"
download "brian-babin.jpg"           "$BIOGUIDE/B/B001291.jpg"
download "david-schweikert.jpg"      "$BIOGUIDE/S/S001183.jpg"
download "roscoe-bartlett.jpg"       "$BIOGUIDE/B/B000206.jpg"

# Presidents — official White House portraits via Wikimedia Commons (public domain)
WIKI="https://upload.wikimedia.org/wikipedia/commons"

download "herbert-hoover.jpg" \
  "$WIKI/thumb/0/05/HHPL-hhpres.jpg/400px-HHPL-hhpres.jpg"

download "jimmy-carter.jpg" \
  "$WIKI/thumb/5/5a/JimmyCarterPortrait_%28cropped%29.jpg/400px-JimmyCarterPortrait_%28cropped%29.jpg"

echo ""
echo "Done. Files in $DEST:"
ls -lh "$DEST"
