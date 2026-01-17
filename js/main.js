/**
 * SR Studio Salon - JavaScript Principal
 * Funcionalidades modernas con performance optimizada
 */

// === CONFIGURACIÓN ===
const CONFIG = {
  whatsappNumber: '52228XXXXXXX', // Reemplazar con número real
  galleryImages: [
    {
      src: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&auto=format&fit=crop',
      alt: 'Corte moderno femenino',
      caption: 'Corte Moderno'
    },
    {
      src: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop',
      alt: 'Coloración profesional',
      caption: 'Color Profesional'
    },
    {
      src: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&auto=format&fit=crop',
      alt: 'Peinado elegante para evento',
      caption: 'Peinado de Evento'
    },
    {
      src: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop',
      alt: 'Tratamiento capilar',
      caption: 'Tratamiento Capilar'
    },
    {
      src: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800&auto=format&fit=crop',
      alt: 'Estilo contemporáneo',
      caption: 'Estilo Contemporáneo'
    },
    {
      src: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=800&auto=format&fit=crop',
      alt: 'Balayage artístico',
      caption: 'Balayage Artístico'
    }
  ]
};

// === UTILIDADES ===
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// === HEADER SCROLL EFFECT ===
class HeaderController {
  constructor() {
    this.header = document.getElementById('header');
    this.lastScroll = 0;
    this.init();
  }

  init() {
    window.addEventListener('scroll', throttle(() => this.handleScroll(), 100));
  }

  handleScroll() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      this.header.classList.add('scrolled');
    } else {
      this.header.classList.remove('scrolled');
    }

    this.lastScroll = currentScroll;
  }
}

// === SMOOTH SCROLL NAVIGATION ===
class SmoothScroll {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        
        // Ignorar enlaces sin destino válido
        if (href === '#' || !href) return;
        
        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();
        
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      });
    });
  }
}

// === INTERSECTION OBSERVER PARA ANIMACIONES ===
class AnimationObserver {
  constructor() {
    this.options = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    this.init();
  }

  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, this.options);

    // Observar elementos que se deben animar
    const animatedElements = document.querySelectorAll(
      '.service-card, .gallery-item, .section-header'
    );

    animatedElements.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
      observer.observe(el);
    });
  }
}

// === GALLERY LOADER ===
class GalleryLoader {
  constructor() {
    this.container = document.getElementById('galleryGrid');
    this.images = CONFIG.galleryImages;
    this.init();
  }

  init() {
    // Limpiar placeholders
    this.container.innerHTML = '';
    
    // Cargar imágenes con lazy loading
    this.images.forEach((image, index) => {
      const item = this.createGalleryItem(image, index);
      this.container.appendChild(item);
    });

    // Iniciar lazy loading
    this.setupLazyLoading();
  }

  createGalleryItem(image, index) {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.style.opacity = '0';
    item.style.transform = 'scale(0.9)';
    
    const img = document.createElement('img');
    img.dataset.src = image.src;
    img.alt = image.alt;
    img.loading = 'lazy';
    img.className = 'lazy-image';
    
    const overlay = document.createElement('div');
    overlay.className = 'gallery-overlay';
    
    const caption = document.createElement('p');
    caption.className = 'gallery-caption';
    caption.textContent = image.caption;
    
    overlay.appendChild(caption);
    item.appendChild(img);
    item.appendChild(overlay);
    
    // Animar entrada
    setTimeout(() => {
      item.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
      item.style.opacity = '1';
      item.style.transform = 'scale(1)';
    }, index * 100);
    
    return item;
  }

  setupLazyLoading() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy-image');
          imageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll('.lazy-image').forEach(img => {
      imageObserver.observe(img);
    });
  }
}

// === WHATSAPP CONTACT HANDLER ===
class WhatsAppHandler {
  constructor() {
    this.number = CONFIG.whatsappNumber;
    this.init();
  }

  init() {
    // Actualizar todos los enlaces de WhatsApp
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    whatsappLinks.forEach(link => {
      const currentHref = link.getAttribute('href');
      const updatedHref = currentHref.replace('52228XXXXXXX', this.number);
      link.setAttribute('href', updatedHref);
    });
  }

  openChat(message = 'Hola, me gustaría agendar una cita') {
    const url = `https://wa.me/${this.number}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}

// === ANALYTICS & TRACKING ===
class Analytics {
  constructor() {
    this.init();
  }

  init() {
    this.trackPageView();
    this.setupEventTracking();
  }

  trackPageView() {
    // Google Analytics 4 tracking
    if (typeof gtag !== 'undefined') {
      gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: window.location.pathname
      });
    }
  }

  setupEventTracking() {
    // Track CTA clicks
    document.querySelectorAll('.btn-primary, .btn-accent').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.trackEvent('cta_click', {
          button_text: btn.textContent.trim(),
          button_location: this.getElementLocation(btn)
        });
      });
    });

    // Track WhatsApp clicks
    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
      link.addEventListener('click', () => {
        this.trackEvent('whatsapp_click', {
          link_location: this.getElementLocation(link)
        });
      });
    });

    // Track scroll depth
    this.setupScrollTracking();
  }

  trackEvent(eventName, params = {}) {
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, params);
    }
    console.log('Event tracked:', eventName, params);
  }

  getElementLocation(element) {
    const section = element.closest('section');
    return section ? section.id || 'unknown' : 'header';
  }

  setupScrollTracking() {
    const scrollPercentages = [25, 50, 75, 100];
    const tracked = new Set();

    window.addEventListener('scroll', debounce(() => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );

      scrollPercentages.forEach(percent => {
        if (scrollPercent >= percent && !tracked.has(percent)) {
          tracked.add(percent);
          this.trackEvent('scroll_depth', { percent });
        }
      });
    }, 500));
  }
}

// === PERFORMANCE MONITORING ===
class PerformanceMonitor {
  constructor() {
    this.init();
  }

  init() {
    if ('PerformanceObserver' in window) {
      this.observeLCP();
      this.observeFID();
      this.observeCLS();
    }
  }

  observeLCP() {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
    });
    observer.observe({ type: 'largest-contentful-paint', buffered: true });
  }

  observeFID() {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        console.log('FID:', entry.processingStart - entry.startTime);
      });
    });
    observer.observe({ type: 'first-input', buffered: true });
  }

  observeCLS() {
    let clsValue = 0;
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          console.log('CLS:', clsValue);
        }
      });
    });
    observer.observe({ type: 'layout-shift', buffered: true });
  }
}

// === INICIALIZACIÓN ===
document.addEventListener('DOMContentLoaded', () => {
  // Inicializar componentes
  new HeaderController();
  new SmoothScroll();
  new AnimationObserver();
  new GalleryLoader();
  new WhatsAppHandler();
  new Analytics();
  
  // Monitoring solo en desarrollo
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    new PerformanceMonitor();
  }

  console.log('%c🎨 SR Studio Salon', 'font-size: 24px; font-weight: bold; color: #D4AF37;');
  console.log('%cDesarrollado por VisibleMX', 'font-size: 12px; color: #666;');
});

// === SERVICE WORKER REGISTRATION (PWA Ready) ===
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Descomentar cuando esté listo el service worker
    // navigator.serviceWorker.register('/sw.js')
    //   .then(reg => console.log('Service Worker registered'))
    //   .catch(err => console.log('Service Worker registration failed'));
  });
}