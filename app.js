// ----------------------------------------------------
// KONECTA2.IO — COMPONENT CONTROLLER & GSAP ANIMATIONS
// ----------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  // Ensure GSAP and ScrollTrigger are loaded
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.error('GSAP or ScrollTrigger is missing. Standard scrolling is used.');
    return;
  }
  gsap.registerPlugin(ScrollTrigger);
  if (typeof ScrollToPlugin !== 'undefined') {
    gsap.registerPlugin(ScrollToPlugin);
  }  // State Management
  let currentLang = 'es'; // default Spanish

  // Custom Cursor variables
  const cursor = document.querySelector('.custom-cursor');
  const cursorGlow = document.querySelector('.custom-cursor-glow');
  let cursorX = 0, cursorY = 0;
  let glowX = 0, glowY = 0;
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Main Cursor frame loop
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

  // Active Visual Stage Helper for interactive Solution Showcase
  const setActiveVisualStage = (stageNum) => {
    for (let i = 1; i <= 3; i++) {
      const visualEl = document.getElementById(`visual-stage-${i}`);
      const stepEl = document.getElementById(`solution-step-${i}`);
      if (visualEl) {
        if (i === stageNum) {
          visualEl.classList.add('active');
        } else {
          visualEl.classList.remove('active');
        }
      }
      if (stepEl) {
        if (i === stageNum) {
          stepEl.classList.add('active');
        } else {
          stepEl.classList.remove('active');
        }
      }
    }
  };

  // Cursor Hover Actions
  const updateCursorHoverListeners = () => {
    const hoverElements = document.querySelectorAll('a, button, .glass-card, .case-card, .wipe-comparison-inner, .sector-arrow, input');
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
  // SMART HEADER NAVIGATION MENU (Hide/Show on Scroll)
  // --------------------------------------------------
  const initSmartHeader = () => {
    const navWrap = document.getElementById('header-nav-wrap');
    if (!navWrap) return;

    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 80 && currentScrollY > lastScrollY) {
        navWrap.classList.add('nav-hidden');
      } 
      else if (currentScrollY < lastScrollY) {
        navWrap.classList.remove('nav-hidden');
      }

      lastScrollY = currentScrollY;
    }, { passive: true });
  };
  initSmartHeader();

  // --------------------------------------------------
  // THREE-LAYER DUST STARFIELD ENGINE (Parallax Depth)
  // --------------------------------------------------
  const initSpaceStarfield = () => {
    const canvas = document.getElementById('bg-space-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Three layers of stars representing parallax travel
    const stars = [];

    // Layer 1: Foreground bright stars (50 stars, travel fast)
    for (let i = 0; i < 40; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.8 + 1.2,
        speed: 0.12,
        opacity: Math.random() * 0.4 + 0.6,
        color: '#FFFFFF',
        twinkleRate: 0.02,
        twinkleDir: 1
      });
    }

    // Layer 2: Midground stars (80 stars, twinkling, neon cyan highlights)
    for (let i = 0; i < 90; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.0 + 0.8,
        speed: 0.06,
        opacity: Math.random() * 0.5 + 0.3,
        color: '#00FFDB',
        twinkleRate: 0.015,
        twinkleDir: 1
      });
    }

    // Layer 3: Faint deep space dust (100 stars, travel slow)
    for (let i = 0; i < 110; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 0.6 + 0.3,
        speed: 0.025,
        opacity: Math.random() * 0.4 + 0.15,
        color: '#1B38C4',
        twinkleRate: 0.008,
        twinkleDir: 1
      });
    }

    let targetParallaxX = 0;
    let targetParallaxY = 0;
    let parallaxX = 0;
    let parallaxY = 0;

    window.addEventListener('mousemove', (e) => {
      targetParallaxX = (e.clientX - window.innerWidth / 2) * 0.06;
      targetParallaxY = (e.clientY - window.innerHeight / 2) * 0.06;
    });

    const drawStars = () => {
      ctx.clearRect(0, 0, width, height);

      parallaxX += (targetParallaxX - parallaxX) * 0.05;
      parallaxY += (targetParallaxY - parallaxY) * 0.05;

      const currentScrollY = window.scrollY;

      stars.forEach(star => {
        // twinkle
        star.opacity += star.twinkleRate * star.twinkleDir;
        if (star.opacity > 1.0 || star.opacity < 0.1) {
          star.twinkleDir *= -1;
        }

        ctx.beginPath();
        let finalX = star.x - (parallaxX * star.speed * 8);
        let finalY = star.y - (parallaxY * star.speed * 8) - (currentScrollY * star.speed);

        finalX = (finalX + width) % width;
        finalY = (finalY + height) % height;

        ctx.fillStyle = star.color;
        ctx.globalAlpha = Math.max(0.1, Math.min(1.0, star.opacity));
        ctx.arc(finalX, finalY, star.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
      });

      requestAnimationFrame(drawStars);
    };

    drawStars();

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });
  };
  initSpaceStarfield();

  // --------------------------------------------------
  // DYNAMIC RENDERING CONTROLLER (Live Translation)
  // --------------------------------------------------
  const renderDynamicContent = (lang) => {
    const data = window.translations[lang];
    if (!data) return;

    // 1. Static simple translations
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

    // Re-bind all viewport-locked scroll triggers
    initScrollAnimations();
  };

  // --------------------------------------------------
  // NAV LANGUAGE TOGGLER
  // --------------------------------------------------
  const langBtn = document.getElementById('lang-toggle');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      currentLang = currentLang === 'es' ? 'en' : 'es';
      renderDynamicContent(currentLang);
      langBtn.innerHTML = currentLang === 'es' ? 'EN' : 'ES';
    });
  }

  // --------------------------------------------------
  // STRICT VIEWPORT-LOCKED SCROLL ANIMATIONS (100% On-View)
  // --------------------------------------------------
  let scrollTriggersInstance = [];

  function initScrollAnimations() {
    scrollTriggersInstance.forEach(t => t.kill());
    scrollTriggersInstance = [];

    // Header entrances (Shared desktop/mobile logic)
    const animateHeaders = (triggerSelector) => {
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerSelector,
          start: 'top 85%',
        }
      });
      headerTl.from(`${triggerSelector} .badge`, { opacity: 0, y: 15, duration: 0.5 })
              .from(`${triggerSelector} .section-title`, { opacity: 0, y: 25, duration: 0.6 }, '-=0.3')
              .from(`${triggerSelector} .section-subtitle`, { opacity: 0, y: 15, duration: 0.6 }, '-=0.3');
      scrollTriggersInstance.push(headerTl.scrollTrigger);
    };

    ['#problem', '#cases', '#why-reviews', '#comparison', '#timeline', '#testimonials'].forEach(sec => {
      animateHeaders(sec);
    });

    let mm = gsap.matchMedia();

    // --------------------------------------------------
    // DESKTOP LAYOUT SCROLL TRIGGER ANCHORS & PINS
    // --------------------------------------------------
    mm.add("(min-width: 1025px)", () => {
      // 1. HERO PINNED EXPERIENCE
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: '+=100%',
          pin: true,
          scrub: 1.2,
          invalidateOnRefresh: true
        }
      });
      heroTl.to('#hero-content-group', { opacity: 0, y: -60, duration: 1 }, 0);
      heroTl.to('#hero-canvas-group', {
        x: '-30%',
        scale: 1.15,
        duration: 1.2,
        ease: 'power2.inOut'
      }, 0);
      scrollTriggersInstance.push(heroTl.scrollTrigger);

      // 2. PROBLEM CARDS PINNED REVEAL
      const problemTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#problem',
          start: 'top top',
          end: '+=100%',
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true
        }
      });
      problemTl.from('.problem-card', {
        opacity: 0,
        y: 60,
        stagger: 0.6,
        duration: 1.5,
        ease: 'power2.out'
      });
      scrollTriggersInstance.push(problemTl.scrollTrigger);

      // 3. SOLUTION INTERACTIVE 3-STEP SCROLL PIN
      setActiveVisualStage(1);
      const solutionTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#solution',
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: 0.5,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;
            if (progress >= 0 && progress < 0.33) {
              setActiveVisualStage(1);
            } 
            else if (progress >= 0.33 && progress < 0.66) {
              setActiveVisualStage(2);
              const step2Progress = (progress - 0.33) / 0.33;
              const phone = document.getElementById('tapping-phone-mockup');
              const banner = document.getElementById('phone-notification-banner');
              if (phone) {
                const xVal = 140 - (110 * step2Progress);
                const rotVal = -12 + (12 * step2Progress);
                phone.style.transform = `translate(${xVal}px, 40px) rotate(${rotVal}deg)`;
              }
              if (banner) {
                if (step2Progress > 0.65) {
                  banner.classList.add('slide-down');
                } else {
                  banner.classList.remove('slide-down');
                }
              }
            } 
            else if (progress >= 0.66) {
              setActiveVisualStage(3);
            }
          }
        }
      });
      scrollTriggersInstance.push(solutionTl.scrollTrigger);

      // 4. REVIEWS PINNED POPUP STORM
      const reviewsTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#why-reviews',
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true
        }
      });
      reviewsTl.to('#popup-notif-1', { opacity: 1, scale: 1, y: 0, duration: 0.8 }, 0.2);

      let rateVal = { value: 4.1 };
      reviewsTl.to(rateVal, {
        value: 4.5,
        duration: 0.8,
        onUpdate: () => {
          const el = document.getElementById('live-rating-count');
          if (el) el.innerHTML = rateVal.value.toFixed(1);
        }
      }, 0.2);
      reviewsTl.to('#popup-notif-2', { opacity: 1, scale: 1, y: 0, duration: 0.8 }, 0.6);
      reviewsTl.to(rateVal, {
        value: 4.7,
        duration: 0.8,
        onUpdate: () => {
          const el = document.getElementById('live-rating-count');
          if (el) el.innerHTML = rateVal.value.toFixed(1);
        }
      }, 0.6);
      reviewsTl.to('#popup-notif-3', { opacity: 1, scale: 1, y: 0, duration: 0.8 }, 1.0);
      reviewsTl.to(rateVal, {
        value: 4.9,
        duration: 0.8,
        onUpdate: () => {
          const el = document.getElementById('live-rating-count');
          if (el) el.innerHTML = rateVal.value.toFixed(1);
        }
      }, 1.0);
      scrollTriggersInstance.push(reviewsTl.scrollTrigger);

      // Counter animation
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

      // 5. INTERACTIVE SPLIT WIPER PIN
      const futureLayer = document.getElementById('future-layer');
      const sliderHandle = document.getElementById('slider-handle');
      if (futureLayer && sliderHandle) {
        const wipeTl = gsap.timeline({
          scrollTrigger: {
            trigger: '#comparison',
            start: 'top top',
            end: '+=100%',
            pin: true,
            scrub: 0.5,
            invalidateOnRefresh: true
          }
        });
        wipeTl.to(futureLayer, {
          duration: 1,
          ease: 'none',
          onUpdate: function() {
            const percent = this.progress() * 100;
            futureLayer.style.setProperty('--wipe-pos', `${percent}%`);
            sliderHandle.style.setProperty('--wipe-pos', `${percent}%`);
          }
        });
        scrollTriggersInstance.push(wipeTl.scrollTrigger);
      }

      // 6. SECTORES (Horizontal scroll pin & click arrow controllers)
      const horizWrapper = document.getElementById('horizontal-cards-wrapper');
      if (horizWrapper) {
        const getScrollAmount = () => {
          let cardsWidth = horizWrapper.scrollWidth;
          return -(cardsWidth - window.innerWidth + window.innerWidth * 0.15);
        };
        const horizTl = gsap.to(horizWrapper, {
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
        scrollTriggersInstance.push(horizTl.scrollTrigger);

        const triggerST = horizTl.scrollTrigger;
        let activeCardIdx = 0;

        ScrollTrigger.create({
          trigger: '.horizontal-scroll-section',
          start: 'top top',
          end: () => `+=${horizWrapper.scrollWidth - window.innerWidth}`,
          onUpdate: (self) => {
            activeCardIdx = Math.round(self.progress * 5);
          }
        });

        const btnNext = document.getElementById('sector-next');
        const btnPrev = document.getElementById('sector-prev');
        if (btnNext && btnPrev) {
          // Unbind existing listeners by replacement
          const newBtnNext = btnNext.cloneNode(true);
          const newBtnPrev = btnPrev.cloneNode(true);
          btnNext.parentNode.replaceChild(newBtnNext, btnNext);
          btnPrev.parentNode.replaceChild(newBtnPrev, btnPrev);

          newBtnNext.addEventListener('click', () => {
            activeCardIdx = Math.min(activeCardIdx + 1, 5);
            const targetProgress = activeCardIdx / 5;
            const targetScroll = triggerST.start + (targetProgress * (triggerST.end - triggerST.start));
            gsap.to(window, { scrollTo: targetScroll, duration: 0.8, ease: 'power2.out' });
          });

          newBtnPrev.addEventListener('click', () => {
            activeCardIdx = Math.max(activeCardIdx - 1, 0);
            const targetProgress = activeCardIdx / 5;
            const targetScroll = triggerST.start + (targetProgress * (triggerST.end - triggerST.start));
            gsap.to(window, { scrollTo: targetScroll, duration: 0.8, ease: 'power2.out' });
          });
        }
      }

      // 7. TIMELINE STEP-BY-STEP PIN reveal
      const timelineTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#timeline',
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true
        }
      });
      timelineTl.to('#timeline-paint-line', { attr: { x2: 1000 }, duration: 1.5, ease: 'none' }, 0);
      timelineTl.to('#timeline-step-0', { className: 'timeline-step active', duration: 0.3 }, 0.1);
      timelineTl.to('#timeline-step-1', { className: 'timeline-step active', duration: 0.3 }, 0.6);
      timelineTl.to('#timeline-step-2', { className: 'timeline-step active', duration: 0.3 }, 1.1);
      scrollTriggersInstance.push(timelineTl.scrollTrigger);
    });

    // --------------------------------------------------
    // MOBILE / TABLET LAYOUT SMOOTH FADE SCROLL REVEALS
    // --------------------------------------------------
    mm.add("(max-width: 1024px)", () => {
      // Reset any manual transformations applied by desktop timeline logic
      const phone = document.getElementById('tapping-phone-mockup');
      const horizWrapper = document.getElementById('horizontal-cards-wrapper');
      if (phone) phone.style.transform = '';
      if (horizWrapper) horizWrapper.style.transform = '';

      // Reset step visuals state: all active & static
      setActiveVisualStage(1);
      const stepIds = ['#solution-step-1', '#solution-step-2', '#solution-step-3'];
      stepIds.forEach((stepId, idx) => {
        const stepEl = document.querySelector(stepId);
        if (stepEl) {
          stepEl.style.opacity = '1';
          stepEl.style.visibility = 'visible';
          stepEl.style.transform = 'none';
        }
      });

      // --- Dynamic local scroll triggers for mobile visual steps ---
      // Step 1: Card 3D rotation based on scroll
      const step1Card = document.querySelector('#solution-step-1 .mobile-step-visual .nfc-card-3d');
      if (step1Card) {
        const step1Tl = gsap.to(step1Card, {
          rotateY: 18,
          rotateX: 12,
          y: -15,
          ease: 'none',
          scrollTrigger: {
            trigger: '#solution-step-1',
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 1
          }
        });
        scrollTriggersInstance.push(step1Tl.scrollTrigger);
      }

      // Step 2: Scroll-driven tap approach & push notification drop
      const step2Phone = document.querySelector('#solution-step-2 .mobile-step-visual .tapping-phone-mockup');
      const step2Banner = document.querySelector('#solution-step-2 .mobile-step-visual .phone-notification-banner');
      if (step2Phone) {
        const step2Tl = gsap.to(step2Phone, {
          x: 0,
          y: 0,
          rotation: 0,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: '#solution-step-2',
            start: 'top 80%',
            end: 'bottom 40%',
            scrub: 0.5,
            onUpdate: (self) => {
              if (step2Banner) {
                if (self.progress > 0.6) {
                  step2Banner.style.top = '20px';
                } else {
                  step2Banner.style.top = '-85px';
                }
              }
            }
          }
        });
        scrollTriggersInstance.push(step2Tl.scrollTrigger);
      }

      // Step 3: Checkmark scale bounce on entrance
      const step3Check = document.querySelector('#solution-step-3 .mobile-step-visual .success-checkmark');
      if (step3Check) {
        const step3Tl = gsap.to(step3Check, {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '#solution-step-3',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        });
        scrollTriggersInstance.push(step3Tl.scrollTrigger);
      }

      // Simple Problem cards stagger entrance
      const problemTl = gsap.from('.problem-card', {
        opacity: 0,
        y: 35,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#problem-cards-container',
          start: 'top 85%'
        }
      });
      scrollTriggersInstance.push(problemTl.scrollTrigger);

      // Cases cases-grid fade reveal
      const casesTl = gsap.from('.case-card', {
        opacity: 0,
        y: 30,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#cases-grid',
          start: 'top 85%'
        }
      });
      scrollTriggersInstance.push(casesTl.scrollTrigger);

      // Testimonial cards stagger entrance
      const testTl = gsap.from('.testimonial-card', {
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#testimonials-slider',
          start: 'top 85%'
        }
      });
      scrollTriggersInstance.push(testTl.scrollTrigger);

      // Reviews map counter animation and popup entrances
      const reviewsTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#why-reviews',
          start: 'top 85%',
        }
      });
      reviewsTl.to('#popup-notif-1', { opacity: 1, scale: 1, y: 0, duration: 0.5 }, 0.1)
               .to('#popup-notif-2', { opacity: 1, scale: 1, y: 0, duration: 0.5 }, 0.4)
               .to('#popup-notif-3', { opacity: 1, scale: 1, y: 0, duration: 0.5 }, 0.7);

      // Counter animation for mobile
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
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#why-reviews',
            start: 'top 85%',
          },
          onUpdate: () => {
            el.innerHTML = Math.floor(initialVal.value) + c.suffix;
          }
        });
      });
      scrollTriggersInstance.push(reviewsTl.scrollTrigger);

      // Mobile timeline steps entrances (since they are stacked vertically, make them fade in as scrolled)
      const timelineSteps = document.querySelectorAll('.timeline-step');
      timelineSteps.forEach((step, idx) => {
        const stepTl = gsap.to(step, {
          className: 'timeline-step active',
          duration: 0.4,
          scrollTrigger: {
            trigger: step,
            start: 'top 80%',
          }
        });
        scrollTriggersInstance.push(stepTl.scrollTrigger);
      });
    });
  }

  // Mobile Hamburger Navigation Drawer Toggler
  const hamburger = document.querySelector('.hamburger');
  const navWrap = document.getElementById('header-nav-wrap');
  
  if (hamburger && navWrap) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navWrap.classList.toggle('mobile-active');
    });

    // Close menu when clicking nav links
    const navLinks = navWrap.querySelectorAll('nav a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navWrap.classList.remove('mobile-active');
      });
    });
  }

  // Initial rendering triggers
  renderDynamicContent(currentLang);
});
