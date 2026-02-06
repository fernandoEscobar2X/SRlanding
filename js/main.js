/**
 * SR Studio Salon - JavaScript
 * Catálogo por categorías + Animaciones
 */

// === DATOS DEL CATÁLOGO ===
const CATALOG = {
  color: [
    { type: 'video', src: 'resources/vid3.mp4',  poster: 'resources/posters/vid3.webp' },
    { type: 'video', src: 'resources/vid11.mp4',  poster: 'resources/posters/vid11.webp' },
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

// === HEADER SCROLL ===
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  
  if (currentScroll > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
}, { passive: true });

// === CARGAR CATÁLOGO ===
function loadCatalog() {
  Object.keys(CATALOG).forEach(category => {
    const grid = document.querySelector(`[data-category="${category}"]`);
    if (!grid) return;
    
    const items = CATALOG[category];
    
    // Actualizar contador
    const section = grid.closest('.catalog-section');
    const count = section.querySelector('.catalog-section-count');
    if (count) {
      count.textContent = `${items.length} trabajo${items.length !== 1 ? 's' : ''}`;
    }
    
    // Crear items
    items.forEach(item => {
      const el = createCatalogItem(item);
      grid.appendChild(el);
    });
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

    // ✅ ÚNICO CAMBIO: usar poster del catálogo (si no existe, fallback negro)
    video.poster = item.poster || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3Crect fill='%23222'/%3E%3C/svg%3E";

    div.appendChild(video);
    
    // Play icon
    const playIcon = document.createElement('div');
    playIcon.className = 'play-icon';
    playIcon.innerHTML = `<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>`;
    div.appendChild(playIcon);
    
    // Hover play (Desktop)
    div.addEventListener('mouseenter', () => {
      video.play();
      playIcon.style.opacity = '0';
    });
    
    div.addEventListener('mouseleave', () => {
      video.pause();
      video.currentTime = 0;
      playIcon.style.opacity = '';
    });
    
    // Mobile tap - Un solo click
    div.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.stopPropagation();
        if (video.paused) {
          // Pausar otros videos
          document.querySelectorAll('.catalog-item video').forEach(v => {
            if (v !== video) {
              v.pause();
              v.currentTime = 0;
              const icon = v.closest('.catalog-item').querySelector('.play-icon');
              if (icon) icon.style.opacity = '';
            }
          });
          video.play();
          playIcon.style.opacity = '0';
        } else {
          video.pause();
          video.currentTime = 0;
          playIcon.style.opacity = '';
        }
      }
    });
    
  } else {
    const img = document.createElement('img');
    img.src = item.src;
    img.alt = item.label;
    img.loading = 'lazy';
    div.appendChild(img);
  }
  
  // Overlay con label
   // Overlay con label (solo si existe)
  const overlay = document.createElement('div');
  overlay.className = 'catalog-item-overlay';

  if (item.label) {
    overlay.innerHTML = `<span class="catalog-item-label">${item.label}</span>`;
  }

  div.appendChild(overlay);

  return div;
}



// === ANIMACIONES SCROLL ===
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  // Observar elementos animables
  document.querySelectorAll('.animate-in, .stagger-children').forEach(el => {
    observer.observe(el);
  });
  
  // Observar secciones del catálogo
  document.querySelectorAll('.catalog-section').forEach(el => {
    el.classList.add('animate-in');
    observer.observe(el);
  });
}

// === FLOATING CTA ===
function initFloatingCta() {
  const floatingCta = document.getElementById('floatingCta');
  if (!floatingCta) return;
  
  const hero = document.querySelector('.hero');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        floatingCta.classList.remove('visible');
      } else {
        floatingCta.classList.add('visible');
      }
    });
  }, {
    threshold: 0,
    rootMargin: '-100px 0px 0px 0px'
  });
  
  if (hero) {
    observer.observe(hero);
  }
}

// === GALLERY VIDEOS ===
function initGalleryVideos() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  galleryItems.forEach(item => {
    const video = item.querySelector('video');
    const playIcon = item.querySelector('.play-icon');
    if (!video) return;
    
    // Mostrar/ocultar play icon según estado del video
    video.addEventListener('play', () => {
      if (playIcon) playIcon.style.opacity = '0';
    });
    
    video.addEventListener('pause', () => {
      if (playIcon) playIcon.style.opacity = '1';
    });
    
    // Desktop: hover play
    item.addEventListener('mouseenter', () => {
      video.play();
    });
    
    item.addEventListener('mouseleave', () => {
      video.pause();
      video.currentTime = 0;
    });
    
    // Mobile: tap play
    item.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.stopPropagation();
        if (video.paused) {
          // Pausar otros videos
          document.querySelectorAll('.gallery-item video').forEach(v => {
            if (v !== video) {
              v.pause();
              v.currentTime = 0;
            }
          });
          video.play();
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  });
}

// === SMOOTH SCROLL ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    
    const target = document.querySelector(href);
    if (!target) return;
    
    e.preventDefault();
    
    const offset = 100;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    
    window.scrollTo({
      top,
      behavior: 'smooth'
    });
  });
});


// === INIT ===
document.addEventListener('DOMContentLoaded', () => {
  // --- 1. PRELOADER (GSAP) ---
 const preloader = document.getElementById("preloader");
  const preloaderLogo = document.querySelector(".preloader-logo");

  if (preloader && preloaderLogo) {
    // 1. El logo aparece rápido
    gsap.to(preloaderLogo, {
      opacity: 1,
      y: 0,
      duration: 0.4, // Antes 1.0 (Más rápido)
      ease: "power2.out",
      onComplete: () => {
        // 2. El fondo negro desaparece casi de inmediato
        gsap.to(preloader, {
          opacity: 0,
          duration: 0.4, // Antes 0.8 (Más rápido)
          delay: 0.1,    // Antes 0.3 (Mínima pausa)
          ease: "power2.inOut",
          onComplete: () => {
            preloader.classList.add("is-hidden");
            animateHeroEntrance(); // Iniciar animaciones del hero
          }
        });
      }
    });
  } else {
    // Fallback por seguridad
    animateHeroEntrance();
  }

  // -- Lenis Smooth Scroll --
  // Configurado para sentirse fluido pero responsivo
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureDirection: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // -- Custom Cursor & Magnetic (Solo Desktop) --
  if (window.matchMedia("(min-width: 1024px)").matches) {
    const cursor = document.getElementById("customCursor");
    const magneticElements = document.querySelectorAll("[data-magnetic]");

    if (cursor) {
      // Movimiento del cursor
      window.addEventListener("mousemove", (e) => {
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1, // Muy reactivo
          ease: "power2.out"
        });
      });

      // Efecto Click
      window.addEventListener("mousedown", () => cursor.classList.add("is-clicking"));
      window.addEventListener("mouseup", () => cursor.classList.remove("is-clicking"));

      // Efecto Magnético en botones
      magneticElements.forEach((el) => {
        el.addEventListener("mouseenter", () => {
          cursor.classList.add("is-hovering");
          gsap.to(el, { scale: 0.95, duration: 0.3 });
        });

        el.addEventListener("mouseleave", () => {
          cursor.classList.remove("is-hovering");
          gsap.to(el, { x: 0, y: 0, scale: 1, duration: 0.5, ease: "elastic.out(1, 0.3)" });
        });

        el.addEventListener("mousemove", (e) => {
          const rect = el.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          
          gsap.to(el, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });
    }
  }
  loadCatalog();
  initScrollAnimations();
  initFloatingCta();
  initGalleryVideos();
  
  console.log('%cSR Studio Salon', 'font-size:20px;font-weight:bold;color:#000');
  console.log('%cby VisibleMX', 'font-size:12px;color:#666');
});
