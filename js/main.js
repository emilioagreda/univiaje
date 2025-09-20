// JS mínimo: menú móvil y búsqueda (simulada)
document.addEventListener('DOMContentLoaded', function(){
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.querySelector('.site-nav');
  if(navToggle && siteNav){
    navToggle.addEventListener('click', ()=>{
      const shown = siteNav.style.display === 'block';
      siteNav.style.display = shown ? '' : 'block';
      navToggle.setAttribute('aria-expanded', String(!shown));
    });
  }

  const searchForm = document.querySelector('.search-form');
  if(searchForm){
    searchForm.addEventListener('submit', function(e){
      e.preventDefault();
      const q = (this.querySelector('input[type="search"]').value || '').trim();
      if(!q){
        alert('Por favor escribe un destino para buscar.');
        return;
      }
      // Búsqueda simulada: resaltar cards que coincidan
      const cards = document.querySelectorAll('.card');
      let found = false;
      cards.forEach(card=>{
        const title = card.querySelector('h3').textContent.toLowerCase();
        if(title.includes(q.toLowerCase())){
          card.style.outline = '3px solid rgba(14,165,164,0.2)';
          found = true;
        } else {
          card.style.outline = '';
        }
      });
      if(!found) alert('No se encontraron destinos que coincidan. Prueba otra búsqueda.');
    });
  }

  // Modal de itinerarios
  const modal = document.getElementById('itinerary-modal');
  const modalBody = document.getElementById('modal-body');
  const modalTitle = document.getElementById('modal-title');
  const closeBtn = document.querySelector('.modal-close');

  function openItinerary(key){
    modal.setAttribute('aria-hidden','false');
    // Contenido simulado por clave
    let title = '';
    let body = '';
    switch(key){
      case 'islas':
        title = 'Islas Paradisíacas — Itinerario';
        body = '<ul><li>Día 1: Llegada y check-in</li><li>Día 2: Playa y snorkel</li><li>Día 3: Excursión en barco</li><li>Día 4-7: Relax y actividades opcionales</li></ul>';
        break;
      case 'ciudades':
        title = 'Ciudades Históricas — Itinerario';
        body = '<ul><li>Día 1: Ciudad A — Tour de bienvenida</li><li>Día 2: Museos y patrimonio</li><li>Día 3: Ciudad B — Visitas guiadas</li></ul>';
        break;
      case 'aventura':
        title = 'Aventura y Trekking — Itinerario';
        body = '<ul><li>Día 1: Preparación y briefing</li><li>Día 2-6: Rutas de trekking</li><li>Día 7-10: Retorno y actividades</li></ul>';
        break;
      case 'peru':
        title = 'Perú Clásico — Itinerario';
        body = '<p>Cusco, Valle Sagrado, Machu Picchu, Lago Titicaca.</p>';
        break;
      case 'italia':
        title = 'Italia Esencial — Itinerario';
        body = '<p>Roma, Florencia, Venecia y costa Amalfitana.</p>';
        break;
      case 'bali':
        title = 'Bali y Wellness — Itinerario';
        body = '<p>Playas, templos y retiros de bienestar.</p>';
        break;
      default:
        title = 'Itinerario';
        body = '<p>Detalle no disponible.</p>';
    }
    modalTitle.innerHTML = title;
    modalBody.innerHTML = body;
  }

  function closeModal(){
    modal.setAttribute('aria-hidden','true');
    modalBody.innerHTML = '';
  }

  document.addEventListener('click', function(e){
    const target = e.target;
    if(target.matches('.ver-itinerario')){
      const key = target.getAttribute('data-itinerary');
      openItinerary(key);
    }
    if(target.classList.contains('modal-backdrop')){
      closeModal();
    }
  });

  if(closeBtn){
    closeBtn.addEventListener('click', closeModal);
  }
  // cerrar con ESC
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape') closeModal();
  });

  // Smooth scroll for internal links and scrollspy
  const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');
  const sections = [];
  navLinks.forEach(link=>{
    const id = link.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if(el) sections.push({id,el,link});
    // smooth scroll on click
    link.addEventListener('click', function(e){
      e.preventDefault();
      const target = document.getElementById(this.getAttribute('href').slice(1));
      if(target){
        target.scrollIntoView({behavior:'smooth',block:'start'});
        // close mobile nav after click
        if(siteNav && window.getComputedStyle(navToggle).display !== 'none') siteNav.style.display = '';
      }
    });
  });

  function onScrollSpy(){
    const scrollY = window.scrollY + (window.innerHeight/6);
    sections.forEach(item=>{
      const rect = item.el.getBoundingClientRect();
      const top = window.scrollY + rect.top;
      const bottom = top + item.el.offsetHeight;
      if(scrollY >= top && scrollY < bottom){
        item.link.classList.add('active');
      } else {
        item.link.classList.remove('active');
      }
    });
  }
  window.addEventListener('scroll', onScrollSpy);
  // initial call
  onScrollSpy();
});