/**
 * SR Studio Salon - JavaScript
 * v2.0 - Limpio y optimizado
 */

const CATALOG = {
  color: [
    { type: 'video', src: 'resources/vid3.mp4', poster: 'resources/posters/vid3.webp' },
    { type: 'video', src: 'resources/vid11.mp4', poster: 'resources/posters/vid11.webp' },
    { type: 'video', src: 'resources/vid12.mp4', poster: 'resources/posters/vid12.webp' },
    { type: 'image', src: 'resources/foto5_1_11zon.webp' }
  ],
  peinados: [
    { type: 'video', src: 'resources/vid5.mp4', poster: 'resources/posters/vid5.webp' },
    { type: 'video', src: 'resources/peinado1.mp4', poster: 'resources/posters/peinado1.webp' },
    { type: 'video', src: 'resources/peinado2.mp4', poster: 'resources/posters/peinado2.webp' },
    { type: 'video', src: 'resources/peinado3.mp4', poster: 'resources/posters/peinado3.webp' }
  ]
};

const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 100);
}, { passive: true });

function loadCatalog() {
  Object.keys(CATALOG).forEach(category => {
    const grid = document.querySelector(`[data-category="${category}"]`);
    if (!grid) return;
    CATALOG[category].forEach(item => grid.appendChild(createCatalogItem(item)));
  });
}

function createCatalogItem(item) {
  const div = document.createElement('div');
  div.className = 'catalog-item';
  
  if (item.type === 'video') {
    const video = document.createElement('video');
    video.src = item.src;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = 'metadata';
    video.poster = item.poster || '';
    div.appendChild(video);
    
    const playIcon = document.createElement('div');
    playIcon.className = 'play-icon';
    playIcon.innerHTML = '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';
    div.appendChild(playIcon);
    
    div.addEventListener('mouseenter', () => { video.play(); playIcon.style.opacity = '0'; });
    div.addEventListener('mouseleave', () => { video.pause(); video.currentTime = 0; playIcon.style.opacity = ''; });
    
    div.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.stopPropagation();
        if (video.paused) {
          document.querySelectorAll('.catalog-item video').forEach(v => {
            if (v !== video) { v.pause(); v.currentTime = 0; }
          });
          video.play(); playIcon.style.opacity = '0';
        } else {
          video.pause(); video.currentTime = 0; playIcon.style.opacity = '';
        }
      }
    });
  } else {
    const img = document.createElement('img');
    img.src = item.src;
    img.alt = 'Trabajo de SR Studio Salon';
    img.loading = 'lazy';
    div.appendChild(img);
  }
  
  const overlay = document.createElement('div');
  overlay.className = 'catalog-item-overlay';
  div.appendChild(overlay);
  return div;
}

function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  
  document.querySelectorAll('.animate-in, .stagger-children, .catalog-section').forEach(el => {
    if (el.classList.contains('catalog-section')) el.classList.add('animate-in');
    observer.observe(el);
  });
}

function initFloatingCta() {
  const floatingCta = document.getElementById('floatingCta');
  const hero = document.querySelector('.hero');
  if (!floatingCta || !hero) return;
  
  new IntersectionObserver((entries) => {
    floatingCta.classList.toggle('visible', !entries[0].isIntersecting);
  }, { threshold: 0, rootMargin: '-100px 0px 0px 0px' }).observe(hero);
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth' });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const preloader = document.getElementById('preloader');
  const preloaderLogo = document.querySelector('.preloader-logo');

  if (preloader && preloaderLogo) {
    gsap.to(preloaderLogo, {
      opacity: 1, duration: 0.4, ease: 'power2.out',
      onComplete: () => {
        gsap.to(preloader, {
          opacity: 0, duration: 0.4, delay: 0.1, ease: 'power2.inOut',
          onComplete: () => preloader.classList.add('is-hidden')
        });
      }
    });
  }

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true, wheelMultiplier: 1, touchMultiplier: 2,
  });
  (function raf(time) { lenis.raf(time); requestAnimationFrame(raf); })();

  if (window.matchMedia('(min-width: 1024px)').matches) {
    const cursor = document.getElementById('customCursor');
    if (cursor) {
      window.addEventListener('mousemove', (e) => {
        gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1, ease: 'power2.out' });
      });
    }
  }

  loadCatalog();
  initScrollAnimations();
  initFloatingCta();
  
  console.log('%cSR Studio Salon', 'font-size:20px;font-weight:bold;color:#000');
  console.log('%cby VisibleMX', 'font-size:12px;color:#666');
});
