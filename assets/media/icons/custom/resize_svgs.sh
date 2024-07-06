#!/bin/bash

# Directory containing SVG files
svgDirectory="."

# Desired width and height
desiredWidth="32"
desiredHeight="32"

# Process each SVG file in the directory
for file in "$svgDirectory"/*.svg; do
  # Check if file exists to avoid errors in an empty directory
  [ -e "$file" ] || continue

  # Use sed to add or replace width and height attributes in the <svg> tag
  sed -i -E \
      -e 's/(<svg[^>]*?)width="[0-9]+"/\1 width="'"$desiredWidth"'"/' \
      -e 's/(<svg[^>]*?)height="[0-9]+"/\1 height="'"$desiredHeight"'"/' \
      -e '/<svg/{s/width="[^"]*"//;s/height="[^"]*"//;s/<svg /<svg width="'"$desiredWidth"'" height="'"$desiredHeight"'" /}' \
      "$file"

  echo "Resized $file to ${desiredWidth}x${desiredHeight}px"
done

echo "SVG resizing completed."
