/**
 * SR Studio Salon - JavaScript Principal
 * Rediseño 2026 - Alta Conversión
 */

// === CONFIGURACIÓN - GALERÍA COMPACTA 5 ITEMS ===
const CONFIG = {
  instagramUrl: 'https://www.instagram.com/srstudiosalon',
  // Solo 5 items - los mejores trabajos
  galleryItems: [
    {
      type: 'video',
      src: 'resources/vid3.mp4',
      
      tag: 'Color'
    },
    {
      type: 'video',
      src: 'resources/vid5.mp4',
      
      tag: 'Peinado'
    },
    {
      type: 'video',
      src: 'resources/vid11.mp4',
      
      tag: 'Color'
    },
    {
      type: 'video',
      src: 'resources/vid12.mp4',
      
      tag: 'Color'
    },
    {
      type: 'image',
      src: 'resources/foto6.jpeg',
      alt: 'Glamour Rubio',
      
      tag: 'Peinado'
    }
  ]
};

// === HEADER SCROLL ===
const header = document.getElementById('header');

const handleScroll = () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
};

window.addEventListener('scroll', handleScroll, { passive: true });

// === GALERÍA LOADER ===
class GalleryLoader {
  constructor() {
    this.container = document.getElementById('galleryGrid');
    this.items = CONFIG.galleryItems;
    this.init();
  }

  init() {
    if (!this.container) return;
    this.container.innerHTML = '';
    
    this.items.forEach((item, index) => {
      const element = this.createGalleryItem(item, index);
      this.container.appendChild(element);
    });
  }

  createGalleryItem(item, index) {
    const wrapper = document.createElement('div');
    wrapper.className = 'gallery-item';
    wrapper.style.opacity = '0';
    wrapper.style.transform = 'translateY(20px)';
    
    if (item.type === 'video') {
      const video = document.createElement('video');
      video.src = item.src;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.preload = 'metadata';
      
      const playIndicator = document.createElement('div');
      playIndicator.className = 'play-indicator';
      playIndicator.innerHTML = `
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z"/>
        </svg>
      `;
      
      wrapper.appendChild(video);
      wrapper.appendChild(playIndicator);
      
      // Desktop: hover play
      wrapper.addEventListener('mouseenter', () => {
        video.play();
        playIndicator.style.opacity = '0';
      });
      
      wrapper.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
        playIndicator.style.opacity = '1';
      });
      
      // Mobile: tap play
      wrapper.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          if (video.paused) {
            // Pausar otros
            document.querySelectorAll('.gallery-item video').forEach(v => {
              if (v !== video) {
                v.pause();
                v.currentTime = 0;
                const ind = v.closest('.gallery-item').querySelector('.play-indicator');
                if (ind) ind.style.opacity = '1';
              }
            });
            video.play();
            playIndicator.style.opacity = '0';
          } else {
            video.pause();
            playIndicator.style.opacity = '1';
          }
        }
      });
      
    } else {
      const img = document.createElement('img');
      img.src = item.src;
      img.alt = item.alt || item.caption;
      img.loading = index > 1 ? 'lazy' : 'eager';
      wrapper.appendChild(img);
    }
    
    // Overlay
    const overlay = document.createElement('div');
    overlay.className = 'gallery-overlay';
    
    if (item.tag) {
      const tag = document.createElement('span');
      tag.className = 'gallery-tag';
      tag.textContent = item.tag;
      overlay.appendChild(tag);
    }
    
    const caption = document.createElement('p');
    caption.className = 'gallery-caption';
    caption.textContent = item.caption;
    overlay.appendChild(caption);
    
    wrapper.appendChild(overlay);
    
    // Animate in
    setTimeout(() => {
      wrapper.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      wrapper.style.opacity = '1';
      wrapper.style.transform = 'translateY(0)';
    }, index * 100);
    
    return wrapper;
  }
}

// === SCROLL ANIMATIONS ===
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const animateOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      animateOnScroll.unobserve(entry.target);
    }
  });
}, observerOptions);

// === ANALYTICS ===
const trackClick = (label) => {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'click', { event_label: label });
  }
};

// === INIT ===
document.addEventListener('DOMContentLoaded', () => {
  new GalleryLoader();
  
  // Animate sections
  document.querySelectorAll('.section-header, .cta-features, .cta-button').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`;
    animateOnScroll.observe(el);
  });
  
  // Track clicks
  document.querySelectorAll('a[href*="instagram"]').forEach(link => {
    link.addEventListener('click', () => trackClick('instagram_cta'));
  });
  
  console.log('%c✨ SR Studio Salon', 'font-size:24px;font-weight:bold;color:#C9A227');
  console.log('%cDesarrollado por VisibleMX', 'font-size:12px;color:#666');
});