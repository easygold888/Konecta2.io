// ----------------------------------------------------
// KONECTA2.IO — COMPONENT CONTROLLER & GSAP ANIMATIONS
// ----------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  // Ensure GSAP and ScrollTrigger are loaded
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.error('GSAP or ScrollTrigger is missing. Scrolling animations cannot be initialized.');
    return;
  }
  gsap.registerPlugin(ScrollTrigger);

  // State Management
  let currentLang = 'es'; // default Spanish

  // Custom Cursor lerp variables
  const cursor = document.querySelector('.custom-cursor');
  const cursorGlow = document.querySelector('.custom-cursor-glow');
  let cursorX = 0, cursorY = 0;
  let glowX = 0, glowY = 0;

  // Track mouse coordinates
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Custom cursor smooth frame loop
  const renderCursor = () => {
    cursorX += (mouseX - cursorX) * 0.22;
    cursorY += (mouseY - cursorY) * 0.22;

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

  // Add Hover Scaling listeners
  const updateCursorHoverListeners = () => {
    const hoverElements = document.querySelectorAll('a, button, .glass-card, .case-card, .wipe-comparison-inner, input');
    hoverElements.forEach(el => {
      el.removeEventListener('mouseenter', addCursorHover);
      el.removeEventListener('mouseleave', removeCursorHover);
      
      el.addEventListener('mouseenter', addCursorHover);
      el.addEventListener('mouseleave', removeCursorHover);
    });
  };

  const addCursorHover = () => cursor && cursor.classList.add('hovered');
  const removeCursorHover = () => cursor && cursor.classList.remove('hovered');

  // --------------------------------------------------
  // DYNAMIC RENDERING CONTROLLER (Live Translation)
  // --------------------------------------------------
  const renderDynamicContent = (lang) => {
    const data = window.translations[lang];
    if (!data) return;

    // 1. Simple text translations
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

    // 2. Problem Cards
    const problemContainer = document.getElementById('problem-cards-container');
    if (problemContainer) {
      problemContainer.innerHTML = '';
      data.problem.cards.forEach((card, idx) => {
        problemContainer.innerHTML += `
          <div class="glass-card problem-card">
            <div class="problem-number">0${idx + 1}</div>
            <h3>${card.title}</h3>
            <p>${card.desc}</p>
          </div>
        `;
      });
    }

    // 3. Solution Grid (6 Cases)
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
          <div class="glass-card case-card">
            <div class="case-icon">${icons[idx]}</div>
            <h3>${card.title}</h3>
            <p>${card.desc}</p>
          </div>
        `;
      });
    }

    // 4. Past vs Future Lists (Wiper)
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
          <div class="timeline-step" id="timeline-step-${idx}">
            <div class="timeline-dot">${step.step}</div>
            <h3>${step.title}</h3>
            <p>${step.desc}</p>
          </div>
        `;
      });
    }

    // 7. Dynamic Testimonials
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

    // Reinitialize dynamic Lucide icons
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }

    updateCursorHoverListeners();
  };

  // Initial Content Load
  renderDynamicContent(currentLang);

  // --------------------------------------------------
  // NAV TRANSLATION TRIGGER
  // --------------------------------------------------
  const langBtn = document.getElementById('lang-toggle');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      currentLang = currentLang === 'es' ? 'en' : 'es';
      renderDynamicContent(currentLang);
      langBtn.innerHTML = currentLang === 'es' ? 'EN' : 'ES';

      // Refresh positions
      ScrollTrigger.refresh();
    });
  }

  // --------------------------------------------------
  // WAITLIST FORM VALIDATION
  // --------------------------------------------------
  const waitlistForm = document.getElementById('waitlist-form');
  const waitlistMsg = document.getElementById('waitlist-msg');

  if (waitlistForm && waitlistMsg) {
    waitlistForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const emailInput = waitlistForm.querySelector('input[type="email"]');
      const emailVal = emailInput.value.trim();

      waitlistMsg.className = 'waitlist-msg';
      waitlistMsg.innerHTML = '';

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(emailVal)) {
        waitlistMsg.classList.add('error');
        waitlistMsg.innerHTML = window.translations[currentLang].waitlist.invalidEmail;
        return;
      }

      waitlistMsg.classList.add('success');
      waitlistMsg.innerHTML = window.translations[currentLang].waitlist.success;
      emailInput.value = '';

      const btn = waitlistForm.querySelector('button');
      gsap.to(btn, { scale: 1.05, duration: 0.1, yoyo: true, repeat: 1 });
    });
  }

  // --------------------------------------------------
  // ADVANCED CINEMATIC SCROLL EXPERIENCES (GSAP)
  // --------------------------------------------------
  
  // 1. HERO PINNED EXPERIENCE
  // Viewport pins. Text dissolves, 3D Canvas shifts to center, scales up and rotates.
  const initHeroScrollExperience = () => {
    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: '+=100%',
        pin: true,
        scrub: 1.2,
      }
    });

    // Fade out text content groups
    heroTl.to('#hero-content-group', {
      opacity: 0,
      y: -60,
      duration: 1
    }, 0);

    // Shift WebGL 3D Canvas container to the center and scale up
    const isDesktop = window.innerWidth > 1024;
    heroTl.to('#hero-canvas-group', {
      x: isDesktop ? '-30%' : '0%',
      scale: 1.15,
      duration: 1.2,
      ease: 'power2.inOut'
    }, 0);
  };
  initHeroScrollExperience();

  // 2. STAGGER ENTRANCE HEADERS
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
      delay: 0.1,
      scrollTrigger: {
        trigger: triggerSelector,
        start: 'top 80%',
      }
    });

    gsap.from(`${triggerSelector} .section-subtitle`, {
      opacity: 0,
      y: 25,
      duration: 0.8,
      delay: 0.2,
      scrollTrigger: {
        trigger: triggerSelector,
        start: 'top 80%',
      }
    });
  };

  ['#problem', '#solution', '#why-reviews', '#comparison', '#timeline', '#testimonials'].forEach(sec => {
    animateHeaders(sec);
  });

  // Problem & Solution grids entry fades
  gsap.from('#problem-cards-container', {
    opacity: 0,
    y: 40,
    duration: 1,
    scrollTrigger: {
      trigger: '#problem-cards-container',
      start: 'top 80%'
    }
  });

  gsap.from('#cases-grid', {
    opacity: 0,
    y: 40,
    duration: 1,
    scrollTrigger: {
      trigger: '#cases-grid',
      start: 'top 80%'
    }
  });

  // 3. REVIEWS PINNED NOTIFICATIONS STORM
  // Pins the viewport while 3 reviews popup notification boxes slide up sequentially.
  const initReviewsScrollExperience = () => {
    const reviewsTl = gsap.timeline({
      scrollTrigger: {
        trigger: '#why-reviews',
        start: 'top top',
        end: '+=120%',
        pin: true,
        scrub: 1,
      }
    });

    // 1st popup slides up
    reviewsTl.to('#popup-notif-1', {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.8,
    }, 0.2);

    // Live star rating shifts from 4.1 to 4.5
    let rateVal = { value: 4.1 };
    reviewsTl.to(rateVal, {
      value: 4.5,
      duration: 0.8,
      onUpdate: () => {
        document.getElementById('live-rating-count').innerHTML = rateVal.value.toFixed(1);
      }
    }, 0.2);

    // 2nd popup
    reviewsTl.to('#popup-notif-2', {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.8,
    }, 0.6);

    // Live rating shifts to 4.7
    reviewsTl.to(rateVal, {
      value: 4.7,
      duration: 0.8,
      onUpdate: () => {
        document.getElementById('live-rating-count').innerHTML = rateVal.value.toFixed(1);
      }
    }, 0.6);

    // 3rd popup
    reviewsTl.to('#popup-notif-3', {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.8,
    }, 1.0);

    // Live rating shifts to 4.9
    reviewsTl.to(rateVal, {
      value: 4.9,
      duration: 0.8,
      onUpdate: () => {
        document.getElementById('live-rating-count').innerHTML = rateVal.value.toFixed(1);
      }
    }, 1.0);

    // General counters running in background
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
          start: 'top top',
        },
        onUpdate: () => {
          el.innerHTML = Math.floor(initialVal.value) + c.suffix;
        }
      });
    });
  };
  initReviewsScrollExperience();

  // 4. INTERACTIVE SPLIT WIPER (Wipe slider)
  // Pins the slide comparison. Scroll sweeps `--wipe-pos` clip-path from 0% to 100%.
  const initWipeScrollExperience = () => {
    const sliderContainer = document.getElementById('wipe-slider');
    const futureLayer = document.getElementById('future-layer');
    const sliderHandle = document.getElementById('slider-handle');

    if (!sliderContainer || !futureLayer || !sliderHandle) return;

    gsap.to(futureLayer, {
      scrollTrigger: {
        trigger: '#comparison',
        start: 'top top',
        end: '+=100%',
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          // Progress percentage from 0 to 100
          const percent = self.progress * 100;
          futureLayer.style.setProperty('--wipe-pos', `${percent}%`);
          sliderHandle.style.setProperty('--wipe-pos', `${percent}%`);
        }
      }
    });
  };
  initWipeScrollExperience();

  // 5. SECTORES (Horizontal scroll pinning)
  const initHorizontalScroll = () => {
    const horizWrapper = document.getElementById('horizontal-cards-wrapper');
    const pinSection = document.querySelector('.pin-container');

    if (!horizWrapper || !pinSection) return;

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
        invalidateOnRefresh: true
      }
    });

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
  };
  initHorizontalScroll();

  // 6. TIMELINE STEP-BY-STEP PIN (Paint & Reveal)
  // Pins setup. Neon painting line stretches, steps activate one by one.
  const initTimelineScrollExperience = () => {
    const timelineTl = gsap.timeline({
      scrollTrigger: {
        trigger: '#timeline',
        start: 'top top',
        end: '+=120%',
        pin: true,
        scrub: 1,
      }
    });

    // Draw the SVG paint path indicator
    timelineTl.to('#timeline-paint-line', {
      attr: { x2: 1000 },
      duration: 1.5,
      ease: 'none'
    }, 0);

    // Staggered trigger highlights for steps
    timelineTl.to('#timeline-step-0', {
      className: 'timeline-step active',
      duration: 0.3
    }, 0.1);

    timelineTl.to('#timeline-step-1', {
      className: 'timeline-step active',
      duration: 0.3
    }, 0.6);

    timelineTl.to('#timeline-step-2', {
      className: 'timeline-step active',
      duration: 0.3
    }, 1.1);
  };
  initTimelineScrollExperience();

  // Background blobs slow organic parallax
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
});
