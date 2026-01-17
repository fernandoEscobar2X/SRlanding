# SR Studio Salon - Landing Page

Landing page profesional y minimalista para SR Studio Salon, especializado en estilismo femenino de alta calidad en Xalapa, Veracruz.

## 🎯 Características

### Diseño
- **Minimalista y lujoso**: Paleta blanco/negro con detalles dorados
- **Mobile-first**: Completamente responsive
- **Performance optimizada**: Core Web Vitals optimizados
- **Accesibilidad**: WCAG 2.1 AA compliant

### Funcionalidades
- ✅ Hero section impactante con CTA claros
- ✅ Galería de trabajos con lazy loading
- ✅ Sección de servicios con iconos
- ✅ Botón flotante de WhatsApp
- ✅ Smooth scroll navigation
- ✅ Animaciones sutiles on-scroll
- ✅ SEO optimizado con Schema.org
- ✅ Google Analytics integrado
- ✅ Performance monitoring

## 🛠️ Stack Técnico

- **HTML5**: Semántico y accesible
- **CSS3**: Custom properties (tokens), Grid, Flexbox
- **JavaScript ES6+**: Modular, clases, async/await
- **APIs Web**: Intersection Observer, Performance Observer
- **Hosting**: Netlify (recomendado)

## 📁 Estructura del Proyecto

```
sr-studio-salon/
├── index.html              # Página principal
├── css/
│   ├── tokens.css         # Sistema de diseño (variables)
│   ├── base.css           # Reset y estilos base
│   └── components.css     # Componentes específicos
├── js/
│   └── main.js            # JavaScript principal
├── images/                # Imágenes locales
└── README.md             # Este archivo
```

## 🚀 Instalación y Uso

### Opción 1: Despliegue en Netlify (Recomendado)

1. Sube el proyecto a GitHub
2. Conecta el repositorio con Netlify
3. Configuración automática (sin build commands necesarios)
4. ¡Desplegado!

### Opción 2: Servidor Local

```bash
# Usando Python
python -m http.server 8000

# Usando Node.js (http-server)
npx http-server

# Usando PHP
php -S localhost:8000
```

## ⚙️ Configuración

### 1. Número de WhatsApp

Edita `js/main.js`:

```javascript
const CONFIG = {
  whatsappNumber: '52228XXXXXXX', // Reemplazar con número real
  // ...
};
```

### 2. Información de Contacto

Edita `index.html` y busca:
- `tel:+52228XXXXXXX` (múltiples instancias)
- `wa.me/52228XXXXXXX` (múltiples instancias)
- Dirección física en el Schema.org markup
- Horarios de apertura

### 3. Google Analytics

Agrega antes del cierre de `</head>` en `index.html`:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 4. Imágenes de Galería

Opción A - Usar imágenes del salón:
1. Coloca las imágenes en `/images/gallery/`
2. Edita `CONFIG.galleryImages` en `js/main.js`

Opción B - Mantener Unsplash (temporal):
- Ya configurado, ideal para demo

## 🎨 Personalización de Colores

Edita `css/tokens.css`:

```css
:root {
  --color-primary: #000000;      /* Negro principal */
  --color-secondary: #FFFFFF;    /* Blanco */
  --color-accent: #D4AF37;       /* Dorado - CAMBIAR AQUÍ */
}
```

## 📊 SEO & Meta Tags

### Schema.org
El sitio incluye marcado estructurado para:
- BeautySalon
- Dirección
- Horarios
- Teléfono
- Redes sociales

### Open Graph
Configurado para compartir en redes sociales. Actualiza:
- `og:image` con imagen real del salón
- `og:description` si es necesario

## 🔧 Optimizaciones de Performance

### Implementadas
- [x] Lazy loading de imágenes
- [x] CSS crítico inline (tokens)
- [x] Fuentes optimizadas con preconnect
- [x] Async JavaScript
- [x] Compression (Netlify automático)
- [x] CDN (Netlify automático)

### Métricas Objetivo
- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1
- **Performance Score**: > 90

## 📱 Responsive Breakpoints

```css
/* Mobile: < 640px (default) */
/* Tablet: 768px */
/* Desktop: 1024px */
/* Large: 1280px */
```

## 🔒 Seguridad

- ✅ HTTPS automático (Netlify)
- ✅ Headers de seguridad configurados
- ✅ Sin dependencias externas vulnerables
- ✅ CSP friendly

## 🚀 Mejoras Futuras

### Fase 2 (Opcional)
- [ ] Sistema de reservas online
- [ ] Blog/Consejos de belleza
- [ ] Testimonios de clientes
- [ ] Programa de lealtad
- [ ] PWA completo con Service Worker

### Integraciones Posibles
- [ ] Google My Business API
- [ ] Instagram Feed
- [ ] Calendly para citas
- [ ] Mailchimp para newsletter

## 📞 Soporte

Desarrollado por **VisibleMX**
- Web: https://visiblemx.com
- Email: contacto@visiblemx.com

## 📄 Licencia

© 2025 SR Studio Salon. Todos los derechos reservados.
Desarrollado por VisibleMX.

---

## 📝 Checklist Pre-Lanzamiento

### Contenido
- [ ] Actualizar número de WhatsApp (4 ubicaciones)
- [ ] Actualizar número de teléfono (3 ubicaciones)
- [ ] Agregar dirección física exacta
- [ ] Confirmar horarios de apertura
- [ ] Reemplazar imágenes de galería con fotos reales

### Técnico
- [ ] Configurar Google Analytics
- [ ] Configurar dominio personalizado
- [ ] Probar formularios
- [ ] Verificar todos los enlaces
- [ ] Optimizar imágenes (< 200KB cada una)
- [ ] Probar en móviles reales

### SEO
- [ ] Enviar sitemap a Google Search Console
- [ ] Configurar Google My Business
- [ ] Verificar meta tags
- [ ] Probar Schema.org con herramienta de Google

### Legal
- [ ] Agregar página de privacidad (si recolectas datos)
- [ ] Agregar términos y condiciones (si aplica)