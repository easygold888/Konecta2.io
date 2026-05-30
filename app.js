// ----------------------------------------------------
// KONECTA2.IO — COMPONENT CONTROLLER & GSAP ANIMATIONS
// ----------------------------------------------------

// Wait for GSAP and i18n to load
document.addEventListener('DOMContentLoaded', () => {
  // Ensure GSAP and ScrollTrigger are loaded
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('GSAP or ScrollTrigger is missing. Standard scrolls will fall back.');
  } else {
    gsap.registerPlugin(ScrollTrigger);
  }

  // State Management
  let currentLang = 'es'; // default Spanish

  // Custom Cursor lerp variables
  const cursor = document.querySelector('.custom-cursor');
  const cursorGlow = document.querySelector('.custom-cursor-glow');
  let cursorX = 0, cursorY = 0;
  let glowX = 0, glowY = 0;

  // Track real mouse positions
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Smooth cursor lerping animation loop
  const renderCursor = () => {
    // Lerping calculations
    cursorX += (mouseX - cursorX) * 0.25;
    cursorY += (mouseY - cursorY) * 0.25;

    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;

    if (cursor) {
      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;
    }
    if (cursorGlow) {
      cursorGlow.style.left = `${glowX}px`;
      cursorGlow.style.top = `${glowY}px`;
    }

    requestAnimationFrame(renderCursor);
  };
  renderCursor();

  // Add Hover Scaling classes
  const updateCursorHoverListeners = () => {
    const hoverElements = document.querySelectorAll('a, button, .glass-card, input, select');
    hoverElements.forEach(el => {
      // Remove any existing listeners first to prevent duplicates
      el.removeEventListener('mouseenter', addCursorHover);
      el.removeEventListener('mouseleave', removeCursorHover);
      
      el.addEventListener('mouseenter', addCursorHover);
      el.addEventListener('mouseleave', removeCursorHover);
    });
  };

  const addCursorHover = () => cursor && cursor.classList.add('hovered');
  const removeCursorHover = () => cursor && cursor.classList.remove('hovered');

  // --------------------------------------------------
  // DYNAMIC RENDERING CONTROLLER (Supports Live Translation)
  // --------------------------------------------------
  const renderDynamicContent = (lang) => {
    const data = window.translations[lang];
    if (!data) return;

    // 1. Static simple text fields (H1, H2, Badges, etc.)
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const path = el.getAttribute('data-i18n').split('.');
      let val = data;
      for (const key of path) {
        if (val[key] !== undefined) {
          val = val[key];
        } else {
          val = null;
          break;
        }
      }
      if (val) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.setAttribute('placeholder', val);
        } else {
          el.innerHTML = val;
        }
      }
    });

    // 2. Dynamic Problem Cards
    const problemContainer = document.getElementById('problem-cards-container');
    if (problemContainer) {
      problemContainer.innerHTML = '';
      data.problem.cards.forEach((card, idx) => {
        problemContainer.innerHTML += `
          <div class="glass-card problem-card" data-idx="${idx}">
            <div class="problem-number">0${idx + 1}</div>
            <h3>${card.title}</h3>
            <p>${card.desc}</p>
          </div>
        `;
      });
    }

    // 3. Dynamic Solution Grid (6 Cases)
    const casesGrid = document.getElementById('cases-grid');
    if (casesGrid) {
      casesGrid.innerHTML = '';
      const icons = [
        '<i data-lucide="star"></i>',
        '<i data-lucide="user-plus"></i>',
        '<i data-lucide="utensils"></i>',
        '<i data-lucide="wifi"></i>',
        '<i data-lucide="credit-card"></i>',
        '<i data-lucide="share-2"></i>'
      ];
      data.solution.cards.forEach((card, idx) => {
        casesGrid.innerHTML += `
          <div class="glass-card case-card" data-idx="${idx}">
            <div class="case-icon">${icons[idx]}</div>
            <h3>${card.title}</h3>
            <p>${card.desc}</p>
          </div>
        `;
      });
    }

    // 4. Past vs Future Comparisons lists
    const pastList = document.getElementById('past-list');
    const futureList = document.getElementById('future-list');
    if (pastList && futureList) {
      pastList.innerHTML = '';
      futureList.innerHTML = '';

      data.pastVsFuture.past.items.forEach(item => {
        pastList.innerHTML += `
          <li>
            <i data-lucide="x-circle"></i>
            <span>${item}</span>
          </li>
        `;
      });

      data.pastVsFuture.future.items.forEach(item => {
        futureList.innerHTML += `
          <li>
            <i data-lucide="check-circle-2"></i>
            <span>${item}</span>
          </li>
        `;
      });
    }

    // 5. Dynamic Horizontal Sectors (Industries)
    const horizWrapper = document.getElementById('horizontal-cards-wrapper');
    if (horizWrapper) {
      horizWrapper.innerHTML = '';
      // Premium stock unsplash assets representing clean commercial visual palettes
      const imageUrls = [
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=400&auto=format&fit=crop', // Restaurant
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=400&auto=format&fit=crop', // Hotel
        'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=400&auto=format&fit=crop', // Professional
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=400&auto=format&fit=crop', // Retail
        'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=400&auto=format&fit=crop', // Events
        'https://images.unsplash.com/photo-1504813184591-015578998d25?q=80&w=400&auto=format&fit=crop'  // Healthcare
      ];

      data.industries.items.forEach((item, idx) => {
        horizWrapper.innerHTML += `
          <div class="glass-card horizontal-card">
            <img src="${imageUrls[idx]}" alt="${item.title}" class="horizontal-card-image">
            <div class="horizontal-card-bg"></div>
            <div class="horizontal-card-content">
              <h3>${item.title}</h3>
              <p>${item.desc}</p>
            </div>
          </div>
        `;
      });
    }

    // 6. Dynamic Timeline Steps (How it Works)
    const timelineContainer = document.getElementById('timeline-steps');
    if (timelineContainer) {
      timelineContainer.innerHTML = '';
      data.howItWorks.steps.forEach((step, idx) => {
        timelineContainer.innerHTML += `
          <div class="timeline-step" id="step-${idx}">
            <div class="timeline-dot">${step.step}</div>
            <h3>${step.title}</h3>
            <p>${step.desc}</p>
          </div>
        `;
      });
    }

    // 7. Dynamic Testimonials slider
    const testimonialsSlider = document.getElementById('testimonials-slider');
    if (testimonialsSlider) {
      testimonialsSlider.innerHTML = '';
      const letters = ['AR', 'MS', 'CM', 'SG'];
      data.testimonials.list.forEach((t, idx) => {
        testimonialsSlider.innerHTML += `
          <div class="glass-card testimonial-card">
            <div>
              <div class="testimonial-stars">
                <i data-lucide="star"></i>
                <i data-lucide="star"></i>
                <i data-lucide="star"></i>
                <i data-lucide="star"></i>
                <i data-lucide="star"></i>
              </div>
              <p class="testimonial-quote">"${t.quote}"</p>
            </div>
            <div class="testimonial-author-info">
              <div class="testimonial-pic">${letters[idx]}</div>
              <div class="testimonial-author-name">
                <h4>${t.author}</h4>
                <p>${t.role}</p>
              </div>
            </div>
          </div>
        `;
      });
    }

    // Reinitialize icons rendered dynamically by Lucide
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }

    // Update cursor hover states for new items
    updateCursorHoverListeners();
  };

  // Initial Content Load (ES)
  renderDynamicContent(currentLang);

  // --------------------------------------------------
  // TRANSLATION TOGGLE TRIGGER
  // --------------------------------------------------
  const langBtn = document.getElementById('lang-toggle');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      // Toggle
      currentLang = currentLang === 'es' ? 'en' : 'es';
      
      // Re-render
      renderDynamicContent(currentLang);
      
      // Update toggle indicator text in navbar
      langBtn.innerHTML = currentLang === 'es' ? 'EN' : 'ES';

      // Re-trigger scroll animations refresh to account for sizing adjustments
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }
    });
  }

  // --------------------------------------------------
  // WAITLIST FORM CONTROLLER (Local verification)
  // --------------------------------------------------
  const waitlistForm = document.getElementById('waitlist-form');
  const waitlistMsg = document.getElementById('waitlist-msg');

  if (waitlistForm && waitlistMsg) {
    waitlistForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const emailInput = waitlistForm.querySelector('input[type="email"]');
      const emailVal = emailInput.value.trim();

      // Clear previous classes
      waitlistMsg.className = 'waitlist-msg';
      waitlistMsg.innerHTML = '';

      // Clean validation regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(emailVal)) {
        waitlistMsg.classList.add('error');
        waitlistMsg.innerHTML = window.translations[currentLang].waitlist.invalidEmail;
        return;
      }

      // Success local response simulating startup deployment queues
      waitlistMsg.classList.add('success');
      waitlistMsg.innerHTML = window.translations[currentLang].waitlist.success;
      emailInput.value = '';

      // Animate submit button glow micro-interaction
      const btn = waitlistForm.querySelector('button');
      gsap.to(btn, { scale: 1.05, duration: 0.1, yoyo: true, repeat: 1 });
    });
  }

  // --------------------------------------------------
  // GSAP SCROLL STORYTELLING SYSTEM
  // --------------------------------------------------
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    
    // 1. Text entrance staggers (All section headers)
    const animateHeaders = (triggerSelector) => {
      gsap.from(`${triggerSelector} .badge`, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        scrollTrigger: {
          trigger: triggerSelector,
          start: 'top 85%',
        }
      });

      gsap.from(`${triggerSelector} .section-title`, {
        opacity: 0,
        y: 35,
        duration: 0.8,
        delay: 0.15,
        scrollTrigger: {
          trigger: triggerSelector,
          start: 'top 80%',
        }
      });

      gsap.from(`${triggerSelector} .section-subtitle`, {
        opacity: 0,
        y: 25,
        duration: 0.8,
        delay: 0.3,
        scrollTrigger: {
          trigger: triggerSelector,
          start: 'top 80%',
        }
      });
    };

    // Apply staggering to all sections
    ['#problem', '#solution', '#why-reviews', '#comparison', '#timeline', '#testimonials'].forEach(sec => {
      animateHeaders(sec);
    });

    // 2. Section 2 Cards Entrance
    gsap.from('#problem-cards-container', {
      opacity: 0,
      y: 40,
      duration: 1,
      scrollTrigger: {
        trigger: '#problem-cards-container',
        start: 'top 80%'
      }
    });

    // 3. Section 3 Grid Entrance
    gsap.from('#cases-grid', {
      opacity: 0,
      y: 40,
      duration: 1,
      scrollTrigger: {
        trigger: '#cases-grid',
        start: 'top 80%'
      }
    });

    // 4. Section 4 Counters and Maps Mock animation
    const animateReviewsSection = () => {
      // Counter increments
      const counts = [
        { id: '#count-1', target: 93, suffix: '%' },
        { id: '#count-2', target: 3, suffix: 'x' },
        { id: '#count-3', target: 340, suffix: '%' }
      ];

      counts.forEach(c => {
        const el = document.querySelector(c.id);
        if (!el) return;
        
        let initialVal = { value: 0 };
        gsap.to(initialVal, {
          value: c.target,
          duration: 2.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#why-reviews',
            start: 'top 75%',
          },
          onUpdate: () => {
            el.innerHTML = Math.floor(initialVal.value) + c.suffix;
          }
        });
      });

      // Slide up Google Review Card inside map mock
      gsap.to('.maps-mock-latest-review', {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 1.2,
        scrollTrigger: {
          trigger: '#why-reviews',
          start: 'top 70%'
        },
        onStart: () => {
          document.querySelector('.maps-mock-latest-review').classList.add('show');
        }
      });
    };
    animateReviewsSection();

    // 5. Section 5 Split Screen wiping entries
    gsap.from('.side-past', {
      x: -60,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: '#comparison',
        start: 'top 75%'
      }
    });

    gsap.from('.side-future', {
      x: 60,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: '#comparison',
        start: 'top 75%'
      }
    });

    // 6. Section 6 Horizontal pinning (Sectores)
    const horizWrapper = document.getElementById('horizontal-cards-wrapper');
    const pinSection = document.querySelector('.pin-container');

    if (horizWrapper && pinSection) {
      const getScrollAmount = () => {
        let cardsWidth = horizWrapper.scrollWidth;
        return -(cardsWidth - window.innerWidth + window.innerWidth * 0.15);
      };

      gsap.to(horizWrapper, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: '.horizontal-scroll-section',
          start: 'top top',
          end: () => `+=${horizWrapper.scrollWidth - window.innerWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true // support resizing dynamically
        }
      });

      // Animate pinned headers independently
      gsap.from('.pin-header', {
        opacity: 0,
        x: -40,
        duration: 0.8,
        scrollTrigger: {
          trigger: '.horizontal-scroll-section',
          start: 'top top',
          scrub: false
        }
      });
    }

    // 7. Section 7 Timeline Active step highlighter on scroll
    const timelineSteps = document.querySelectorAll('.timeline-step');
    timelineSteps.forEach((step, idx) => {
      ScrollTrigger.create({
        trigger: step,
        start: 'top 65%',
        end: 'bottom 45%',
        onEnter: () => step.classList.add('active'),
        onLeaveBack: () => step.classList.remove('active'),
      });
    });

    // 8. Background blobs slow organic parallax
    gsap.to('.blob-1', {
      y: 100,
      x: -50,
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 2
      }
    });

    gsap.to('.blob-2', {
      y: -150,
      x: 100,
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 2
      }
    });
  }
});
