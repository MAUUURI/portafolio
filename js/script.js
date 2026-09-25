/**
 * Portafolio Web - Mauricio Arnold
 * Interactividad y animaciones principales
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. Toggle del Menú Móvil
  // ==========================================
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileMenu.classList.toggle('hidden');
      const isExpanded = !mobileMenu.classList.contains('hidden');
      menuBtn.setAttribute('aria-expanded', isExpanded);
    });

    // Cerrar al hacer click en cualquier enlace del menú móvil
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });

    // Cerrar al hacer click fuera del menú
    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
        mobileMenu.classList.add('hidden');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ==========================================
  // 2. Scrollspy (IntersectionObserver)
  // ==========================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const highlightNavLink = (id) => {
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${id}`) {
        link.classList.add('text-indigo-400', 'font-semibold');
        link.classList.remove('text-slate-300');
      } else {
        link.classList.remove('text-indigo-400', 'font-semibold');
        link.classList.add('text-slate-300');
      }
    });
  };

  if ('IntersectionObserver' in window && sections.length > 0) {
    const scrollspyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          highlightNavLink(entry.target.id);
        }
      });
    }, {
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0
    });

    sections.forEach(section => scrollspyObserver.observe(section));
  }

  // ==========================================
  // 3. Scroll Reveal (IntersectionObserver)
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback si IntersectionObserver no está disponible
    revealElements.forEach(el => el.classList.add('reveal-visible'));
  }

  // ==========================================
  // 4. Efecto de Escritura en #typed-text
  // ==========================================
  const typedTextEl = document.getElementById('typed-text');
  if (typedTextEl) {
    const phrases = [
      'Desarrollador Junior',
      'Entusiasta Frontend & Backend',
      'Aprendiz Autodidacta'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    // Crear cursor parpadeante
    const cursorEl = document.createElement('span');
    cursorEl.className = 'typing-cursor';
    typedTextEl.parentNode.insertBefore(cursorEl, typedTextEl.nextSibling);

    const typeLoop = () => {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        typedTextEl.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        typedTextEl.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        // Pausa cuando se completa la frase
        typingSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500;
      }

      setTimeout(typeLoop, typingSpeed);
    };

    // Iniciar con la primera frase ya renderizada y comenzar a borrar después de pausa
    charIndex = typedTextEl.textContent.length || phrases[0].length;
    setTimeout(() => {
      isDeleting = true;
      typeLoop();
    }, 2000);
  }

  // ==========================================
  // 5. Animación de las .skill-bar
  // ==========================================
  const skillBars = document.querySelectorAll('.skill-bar');
  const habilidadesSection = document.getElementById('habilidades');

  if (skillBars.length > 0) {
    // Almacenar el ancho real definido en el style y poner en 0%
    skillBars.forEach(bar => {
      const realWidth = bar.style.width || '70%';
      bar.dataset.targetWidth = realWidth;
      bar.style.width = '0%';
      bar.style.transition = 'width 1.2s cubic-bezier(0.25, 1, 0.5, 1)';
    });

    if ('IntersectionObserver' in window && habilidadesSection) {
      const skillsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            skillBars.forEach(bar => {
              bar.style.width = bar.dataset.targetWidth;
            });
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.2
      });

      skillsObserver.observe(habilidadesSection);
    } else {
      // Fallback
      skillBars.forEach(bar => {
        bar.style.width = bar.dataset.targetWidth;
      });
    }
  }

  // ==========================================
  // 6. Botón #back-to-top
  // ==========================================
  const backToTopBtn = document.getElementById('back-to-top');

  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.remove('hidden');
      } else {
        backToTopBtn.classList.add('hidden');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ==========================================
  // 7. Modo Oscuro / Claro
  // ==========================================
  const themeToggleBtn = document.getElementById('theme-toggle');
  const lightIcon = document.getElementById('theme-toggle-light-icon');
  const darkIcon = document.getElementById('theme-toggle-dark-icon');
  const htmlRoot = document.documentElement;

  const updateThemeUI = (isDark) => {
    if (isDark) {
      htmlRoot.classList.add('dark');
      if (lightIcon) lightIcon.classList.remove('hidden');
      if (darkIcon) darkIcon.classList.add('hidden');
      if (themeToggleBtn) themeToggleBtn.setAttribute('title', 'Cambiar a modo claro');
    } else {
      htmlRoot.classList.remove('dark');
      if (lightIcon) lightIcon.classList.add('hidden');
      if (darkIcon) darkIcon.classList.remove('hidden');
      if (themeToggleBtn) themeToggleBtn.setAttribute('title', 'Cambiar a modo oscuro');
    }
  };

  // Inicializar estado del tema (desde localStorage o preferencia del sistema)
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialIsDark = savedTheme ? savedTheme === 'dark' : prefersDark || htmlRoot.classList.contains('dark');
  updateThemeUI(initialIsDark);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isCurrentlyDark = htmlRoot.classList.contains('dark');
      const newIsDark = !isCurrentlyDark;
      updateThemeUI(newIsDark);
      localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
    });
  }

  // ==========================================
  // 8. Validación de Formulario de Contacto
  // ==========================================
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');

      const nameVal = nameInput ? nameInput.value.trim() : '';
      const emailVal = emailInput ? emailInput.value.trim() : '';
      const messageVal = messageInput ? messageInput.value.trim() : '';

      // Validación de campos vacíos
      if (!nameVal || !emailVal || !messageVal) {
        formFeedback.textContent = 'Por favor, completa todos los campos requeridos.';
        formFeedback.className = 'text-sm font-medium text-center min-h-[20px] text-rose-400';
        return;
      }

      // Validación de email mediante regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailVal)) {
        formFeedback.textContent = 'Por favor, ingresa un correo electrónico válido.';
        formFeedback.className = 'text-sm font-medium text-center min-h-[20px] text-rose-400';
        return;
      }

      // Éxito simulado (sin backend)
      formFeedback.textContent = '¡Mensaje enviado con éxito! Me pondré en contacto contigo a la brevedad.';
      formFeedback.className = 'text-sm font-medium text-center min-h-[20px] text-emerald-400';

      contactForm.reset();

      // Limpiar mensaje tras 5 segundos
      setTimeout(() => {
        if (formFeedback.textContent.includes('éxito')) {
          formFeedback.textContent = '';
        }
      }, 5000);
    });
  }

});
