---
date: "2024-04-13T09:00:00Z"
draft: false
lastmod: "2018-08-28T17:00:00Z"
title: Gallery
toc: false
weight: 1

# Section design
design:
  columns: "1"
  # Use a dark navy background with light text.
  background:
    color: 'navy'
    text_color_light: true
---

<style>
.gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.gallery-item {
  flex: 1 1 calc(33.333% - 16px);
  box-sizing: border-box;
  position: relative;
  cursor: pointer;
}

.gallery-item img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 8px;
}

.lightbox {
  display: none;
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  justify-content: center;
  align-items: center;
}

.lightbox img {
  max-width: 90%;
  max-height: 90%;
}

.lightbox.active {
  display: flex;
}

.close-lightbox {
  position: absolute;
  top: 20px;
  right: 20px;
  color: white;
  font-size: 2em;
  text-decoration: none;
  cursor: pointer;
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function () {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.createElement('div');
  lightbox.classList.add('lightbox');
  document.body.appendChild(lightbox);

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      lightbox.classList.add('active');
      const img = document.createElement('img');
      img.src = item.querySelector('img').src;
      while (lightbox.firstChild) {
        lightbox.removeChild(lightbox.firstChild);
      }
      lightbox.appendChild(img);
    });
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target !== e.currentTarget) return;
    lightbox.classList.remove('active');
  });
});
</script>

It's great to have co-workers who support your goals and inspire you, and the line between colleagues and friends can often blur.

{{< gallery >}}


