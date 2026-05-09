#!/usr/bin/env bash
# HOW TO ADD A NEW POLITICIAN:
# 1. Add their entry to data/politicians.json with an "image" field
# 2. Add a curl line below using the same filename
# 3. Run: bash scripts/download-headshots.sh
# Sources: bioguide.congress.gov (Congress members), Wikimedia Commons (historical/others)
#
# Run from the repo root: bash scripts/download-headshots.sh

set -uo pipefail

DEST="public/politicians"
mkdir -p "$DEST"

FAILED=0

download() {
  local name="$1"
  local url="$2"
  local file="$DEST/$name"
  if [[ -f "$file" ]]; then
    echo "✓ skipped  $name (already exists)"
    return
  fi
  if curl -fsSL --max-time 30 -o "$file" "$url"; then
    echo "✓ downloaded  $name"
  else
    echo "✗ failed  $name  ($url)"
    rm -f "$file"
    FAILED=1
  fi
}

# Congress members — bioguide.congress.gov portraits (public domain)
# URL pattern: https://bioguide.congress.gov/bioguide/photo/{FIRST_LETTER}/{BIOGUIDE_ID}.jpg
BIOGUIDE="https://bioguide.congress.gov/bioguide/photo"

download "bill-foster.jpg"           "$BIOGUIDE/F/F000454.jpg"
download "jerry-mcnerney.jpg"        "$BIOGUIDE/M/M001166.jpg"
download "elaine-luria.jpg"          "$BIOGUIDE/L/L000590.jpg"
download "alan-grayson.jpg"          "$BIOGUIDE/G/G000556.jpg"
download "bill-cassidy.jpg"          "$BIOGUIDE/C/C001075.jpg"
download "rand-paul.jpg"             "$BIOGUIDE/P/P000603.jpg"
download "vernon-ehlers.jpg"         "$BIOGUIDE/E/E000110.jpg"
download "roscoe-bartlett.jpg"       "$BIOGUIDE/B/B000153.jpg"
download "brian-babin.jpg"           "$BIOGUIDE/B/B001291.jpg"
download "david-schweikert.jpg"      "$BIOGUIDE/S/S001183.jpg"
download "vern-buchanan.jpg"         "$BIOGUIDE/B/B001260.jpg"

# Wikimedia Commons — public domain portraits
WIKI="https://upload.wikimedia.org/wikipedia/commons"

download "rush-holt.jpg" \
  "$WIKI/thumb/e/e4/Rep_Holt_Official_Headshot.jpg/440px-Rep_Holt_Official_Headshot.jpg"

download "eddie-bernice-johnson.jpg" \
  "$WIKI/thumb/4/4d/Eddie_Bernice_Johnson_Portrait.jpg/440px-Eddie_Bernice_Johnson_Portrait.jpg"

download "herbert-hoover.jpg" \
  "$WIKI/thumb/6/65/Herbert_Hoover.jpg/440px-Herbert_Hoover.jpg"

download "jimmy-carter.jpg" \
  "$WIKI/thumb/5/5a/JimmyCarter.jpg/440px-JimmyCarter.jpg"

echo ""
if [[ "$FAILED" -ne 0 ]]; then
  echo "Some downloads failed. Check the ✗ lines above."
  exit 1
fi
echo "All done. Files in $DEST:"
ls -lh "$DEST"
