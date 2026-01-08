#!/bin/bash

# URLs base
CDN_BASE="https://cdn.prod.website-files.com/6761c515ac21ce5af80bd29d"

# Crear directorios
mkdir -p assets/images
mkdir -p assets/videos
mkdir -p assets/fonts

# Descargar imágenes principales
curl -o assets/images/logo-dark.png "${CDN_BASE}/68153defb4c0c0db17d985fb_Spicy%20Automations%20dark.png"
curl -o assets/images/hero-grid.svg "${CDN_BASE}/6761c515ac21ce5af80bd35d_Hero%20Background%20Grid.svg"
curl -o assets/images/fire-icon.png "${CDN_BASE}/67b252c43cf72a106c7bbec9_7812576.ai.png"
curl -o assets/images/favicon.png "${CDN_BASE}/6761e2549194f5efcde7e7ba_SPICY%20LEADS.png"

# Descargar videos de fondo
curl -o assets/videos/flames-right.mp4 "${CDN_BASE}/68194501c1c1f0d067163b69_freepik__a-vibrant-flame-graphic-with-shades-of-orange-and-__59710-transcode.mp4"
curl -o assets/videos/flames-left.mp4 "${CDN_BASE}/6819452ada1e34aa66fb148c_copy_9D2C082B-B7B4-4BA3-BAF6-124940B19B08%202-transcode.mp4"

# Descargar logos de clientes (ejemplo de algunos)
curl -o assets/images/logo-1.svg "${CDN_BASE}/6761c515ac21ce5af80bd387_Logo%20(1).svg"
curl -o assets/images/logo-2.svg "${CDN_BASE}/6761c515ac21ce5af80bd386_Logo%20(3).svg"

echo "✅ Assets descargados exitosamente!"