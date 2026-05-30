// ----------------------------------------------------
// KONECTA2.IO — COMPONENT CONTROLLER & WEBGL STORYTELLING ENGINE
// ----------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  // Ensure GSAP and ScrollTrigger are loaded
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.error('GSAP or ScrollTrigger is missing. Storytelling Core offline.');
    return;
  }
  gsap.registerPlugin(ScrollTrigger);
  if (typeof ScrollToPlugin !== 'undefined') {
    gsap.registerPlugin(ScrollToPlugin);
  }

  // --------------------------------------------------
  // 1. LENIS SMOOTH MOMENTUM SCROLL ENGINE (Wero Wallet Feel)
  // --------------------------------------------------
  let lenis;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth exponential decay
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1.0,
      smoothTouch: false, // touch screens keep native smooth scrolling
      touchMultiplier: 2.0,
      infinite: false
    });

    // Connect Lenis scroll ticking to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  }

  // State Management
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
    const hoverElements = document.querySelectorAll('a, button, .glass-card, .case-card, .sector-arrow, input');
    hoverElements.forEach(el => {
      el.removeEventListener('mouseenter', addCursorHover);
      el.removeEventListener('mouseleave', removeCursorHover);
      
      el.addEventListener('mouseenter', addCursorHover);
      el.addEventListener('mouseleave', removeCursorHover);
    });
  };

  const addCursorHover = () => cursor && cursor.classList.add('hovered');
  const removeCursorHover = () => cursor && cursor.classList.remove('hovered');

  // Smart header navigation menu (Hide/Show on Scroll)
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

    // 4. Past vs Future Lists
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

    // 6. Dynamic Timeline Steps
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

  // Nav language toggler
  const langBtn = document.getElementById('lang-toggle');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      currentLang = currentLang === 'es' ? 'en' : 'es';
      renderDynamicContent(currentLang);
      langBtn.innerHTML = currentLang === 'es' ? 'EN' : 'ES';
    });
  }

  // --------------------------------------------------
  // ATMOSPHERIC COSMIC THEME SCROLL SHIFTS (Space Sectors)
  // --------------------------------------------------
  const initSpaceScrollSectors = () => {
    // Problem Sector: turns background to cosmic dark crimson
    gsap.to(':root', {
      '--bg-secondary': '#12040a',
      scrollTrigger: {
        trigger: '#problem',
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 1
      }
    });

    // Back to space blue for solution cases
    gsap.to(':root', {
      '--bg-secondary': '#05081b',
      scrollTrigger: {
        trigger: '#cases',
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 1
      }
    });

    // Reviews Sector: turns background to emerald stardust green
    gsap.to(':root', {
      '--bg-secondary': '#041c16',
      scrollTrigger: {
        trigger: '#why-reviews',
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 1
      }
    });

    // Waitlist Sector: turns background to corona cian solar blue
    gsap.to(':root', {
      '--bg-secondary': '#010c14',
      scrollTrigger: {
        trigger: '#cta-waitlist',
        start: 'top 80%',
        scrub: 1
      }
    });
  };

  // --------------------------------------------------
  // UNIFIED 3D WEBGL STORYTELLING SCROLL CAMERA PATH CONTROLLER
  // --------------------------------------------------
  let scrollTriggersInstance = [];

  function initScrollAnimations() {
    scrollTriggersInstance.forEach(t => t.kill());
    scrollTriggersInstance = [];

    const isDesktop = window.innerWidth > 1024;

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
    // DESKTOP INTERACTIVE STORYTELLING PATHS
    // --------------------------------------------------
    mm.add("(min-width: 1025px)", () => {
      // 1. HERO PERSPECTIVE & 3D CAMERA PATH
      // Puts 3D Plaque shifted to the right in the Hero
      if (window.heroObjectGroup && window.heroCamera) {
        gsap.set(window.heroObjectGroup.position, { x: 1.3, y: 0.1, z: 0 });
        gsap.set(window.heroCamera.position, { z: 6.5, y: 0 });
      }

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
      scrollTriggersInstance.push(heroTl.scrollTrigger);

      // 2. EL PROBLEMA (Camera flies inside a chaotic crimson space dust)
      if (window.heroCamera && window.heroObjectGroup) {
        const problemCamTl = gsap.timeline({
          scrollTrigger: {
            trigger: '#problem',
            start: 'top bottom',
            end: 'top top',
            scrub: 1.2,
            onUpdate: (self) => {
              const prog = self.progress;
              if (window.heroParticleMat) {
                // Interpolate star colors from Cyan to Crimson Red!
                const c = new THREE.Color().lerpColors(new THREE.Color(0x00FFDB), new THREE.Color(0xFF3E3E), prog);
                window.heroParticleMat.color.copy(c);
              }
              window.starSpeedMultiplier = 1.0 + (prog * 3.5); // Accelerate stars
            }
          }
        });
        // Sweep camera and shift 3D Card to left center
        problemCamTl.to(window.heroCamera.position, { z: 5.2, y: 0.5, ease: 'power2.inOut' }, 0)
                    .to(window.heroObjectGroup.position, { x: -1.3, y: 0.4, ease: 'power2.inOut' }, 0)
                    .to(window.heroObjectGroup.rotation, { z: 0.35, ease: 'power1.inOut' }, 0);
        scrollTriggersInstance.push(problemCamTl.scrollTrigger);

        const problemRevealTl = gsap.timeline({
          scrollTrigger: {
            trigger: '#problem',
            start: 'top top',
            end: '+=100%',
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true
          }
        });
        problemRevealTl.from('.problem-card', {
          opacity: 0,
          y: 60,
          stagger: 0.6,
          duration: 1.5,
          ease: 'power2.out'
        });
        scrollTriggersInstance.push(problemRevealTl.scrollTrigger);
      }

      // 3. SOLUTION INTERACTIVE 3-STEP SCROLL SHOWCASE (Morph 3D elements)
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
            
            // Revert particles to Cyan in solution zone
            if (window.heroParticleMat) {
              window.heroParticleMat.color.setHex(0x00FFDB);
            }
            window.starSpeedMultiplier = 1.0;

            if (progress >= 0 && progress < 0.33) {
              setActiveVisualStage(1);
              if (window.heroCamera && window.heroObjectGroup) {
                window.heroCamera.position.z = 4.8;
                window.heroObjectGroup.position.set(-1.4, 0, 0);
                window.heroObjectGroup.rotation.z = 0;
              }
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

              // Pulse the NFC concentric rings waves on scroll tap
              if (window.heroNfcRings) {
                window.heroNfcRings.scale.setScalar(1.0 + step2Progress * 0.4);
              }
            } 
            else if (progress >= 0.66) {
              setActiveVisualStage(3);
              if (window.heroNfcRings) {
                window.heroNfcRings.scale.setScalar(1.4);
              }
            }
          }
        }
      });
      scrollTriggersInstance.push(solutionTl.scrollTrigger);

      // 4. WHY REVIEWS (Camera shifts to a beautiful overhead emerald constellation)
      if (window.heroCamera && window.heroObjectGroup) {
        const reviewsCamTl = gsap.timeline({
          scrollTrigger: {
            trigger: '#why-reviews',
            start: 'top bottom',
            end: 'top top',
            scrub: 1.2,
            onUpdate: (self) => {
              const prog = self.progress;
              if (window.heroParticleMat) {
                // Morph to Emerald Green
                const c = new THREE.Color().lerpColors(new THREE.Color(0x00FFDB), new THREE.Color(0x10B981), prog);
                window.heroParticleMat.color.copy(c);
              }
            }
          }
        });
        reviewsCamTl.to(window.heroCamera.position, { z: 5.0, y: 2.0, ease: 'power2.inOut' }, 0)
                    .to(window.heroObjectGroup.position, { x: 1.2, y: -0.5, ease: 'power2.inOut' }, 0)
                    .to(window.heroObjectGroup.rotation, { x: 0.8, y: 0.4, ease: 'power2.inOut' }, 0);
        scrollTriggersInstance.push(reviewsCamTl.scrollTrigger);

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
          value: 4.9,
          duration: 0.8,
          onUpdate: () => {
            const el = document.getElementById('live-rating-count');
            if (el) el.innerHTML = rateVal.value.toFixed(1);
          }
        }, 0.2);
        reviewsTl.to('#popup-notif-2', { opacity: 1, scale: 1, y: 0, duration: 0.8 }, 0.6);
        reviewsTl.to('#popup-notif-3', { opacity: 1, scale: 1, y: 0, duration: 0.8 }, 1.0);
        scrollTriggersInstance.push(reviewsTl.scrollTrigger);
      }

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

      // 8. CTA WAITLIST (3D Camera positions over input panel)
      if (window.heroCamera && window.heroObjectGroup) {
        const ctaCamTl = gsap.timeline({
          scrollTrigger: {
            trigger: '#cta-waitlist',
            start: 'top bottom',
            end: 'top top',
            scrub: 1
          }
        });
        ctaCamTl.to(window.heroCamera.position, { z: 5.0, x: 0, y: 0, ease: 'power1.inOut' }, 0)
                .to(window.heroObjectGroup.position, { x: -1.3, y: 0, ease: 'power1.inOut' }, 0)
                .to(window.heroObjectGroup.rotation, { x: 0, y: 0.5, z: 0, ease: 'power1.inOut' }, 0);
        scrollTriggersInstance.push(ctaCamTl.scrollTrigger);
      }
    });

    // --------------------------------------------------
    // MOBILE / TABLET LAYOUT SMOOTH FADE SCROLL REVEALS
    // --------------------------------------------------
    mm.add("(max-width: 1024px)", () => {
      // Centered plaque on mobile devices
      if (window.heroObjectGroup && window.heroCamera) {
        gsap.set(window.heroObjectGroup.position, { x: 0, y: 1.0, z: 0 });
        gsap.set(window.heroCamera.position, { z: 7.2, y: 0 });
      }

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

      // Mobile timeline steps entrances
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

  // --------------------------------------------------
  // PROCEDURAL COSMIC AMBIENT DRONE SYNTHESIZER (Web Audio API)
  // --------------------------------------------------
  let audioCtx = null;
  let spaceDrone = null;

  const startSpaceDrone = () => {
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      
      const osc1 = audioCtx.createOscillator();
      const osc2 = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      const filterNode = audioCtx.createBiquadFilter();
      
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(55, audioCtx.currentTime); // A1 note
      
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(110, audioCtx.currentTime); // A2 note
      
      const modulator = audioCtx.createOscillator();
      const modGain = audioCtx.createGain();
      modulator.frequency.setValueAtTime(0.08, audioCtx.currentTime); // LFO sweep
      modGain.gain.setValueAtTime(120, audioCtx.currentTime);
      
      filterNode.type = 'lowpass';
      filterNode.frequency.setValueAtTime(180, audioCtx.currentTime);
      filterNode.Q.setValueAtTime(4, audioCtx.currentTime);
      
      modulator.connect(modGain);
      modGain.connect(filterNode.frequency);
      
      osc1.connect(filterNode);
      osc2.connect(filterNode);
      filterNode.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.06, audioCtx.currentTime + 3.5);
      
      osc1.start();
      osc2.start();
      modulator.start();
      
      spaceDrone = { osc1, osc2, modulator, gainNode, filterNode };
    } catch (err) {
      console.warn("Web Audio API is not supported on this device.", err);
    }
  };

  const stopSpaceDrone = () => {
    if (spaceDrone && audioCtx) {
      spaceDrone.gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 1.2);
      setTimeout(() => {
        if (spaceDrone) {
          spaceDrone.osc1.stop();
          spaceDrone.osc2.stop();
          spaceDrone.modulator.stop();
        }
        if (audioCtx) {
          audioCtx.close();
        }
        audioCtx = null;
        spaceDrone = null;
      }, 1300);
    }
  };

  const droneToggleBtn = document.getElementById('drone-toggle');
  if (droneToggleBtn) {
    droneToggleBtn.addEventListener('click', () => {
      droneToggleBtn.classList.toggle('active');
      if (droneToggleBtn.classList.contains('active')) {
        startSpaceDrone();
      } else {
        stopSpaceDrone();
      }
    });
  }

  // --------------------------------------------------
  // 3-SECOND COSMIC AWAKENING (Cinematic Warp Transition)
  // --------------------------------------------------
  const triggerCosmicAwakening = () => {
    // 1. Zoom and rotate Three.js Hero 3D object
    if (typeof window.triggerHeroCinematicTransition === 'function') {
      window.triggerHeroCinematicTransition();
    }

    // 2. Volumetric warp speed canvas starfield acceleration
    window.starSpeedMultiplier = 1.0;
    gsap.timeline()
      .to(window, {
        starSpeedMultiplier: 38.0,
        duration: 0.9,
        ease: 'power3.in'
      })
      .to(window, {
        starSpeedMultiplier: 1.8, // drifting Active speed
        duration: 1.6,
        ease: 'power2.out'
      });

    // 3. Shockwave radial ring expansion
    const shockwave = document.getElementById('shockwave-ring');
    if (shockwave) {
      gsap.timeline()
        .set(shockwave, { scale: 0, opacity: 0.95 })
        .to(shockwave, {
          scale: 14,
          opacity: 0,
          duration: 1.8,
          ease: 'power2.out'
        });
    }

    // 4. Flash and expand background mesh nebulae
    gsap.to('.blob-1', {
      scale: 1.35,
      opacity: 0.35,
      duration: 1.2,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut'
    });

    // 5. Reveal [ NFC SYSTEM ONLINE ] Logo badge
    const logoBadge = document.querySelector('.nfc-ops-badge');
    if (logoBadge) {
      logoBadge.classList.add('revealed');
    }

    // 6. Text dynamic glow effect reveal
    gsap.from('#hero-content-group h1', {
      textShadow: '0 0 50px rgba(0, 255, 219, 0.9)',
      duration: 1.2,
      ease: 'power2.out'
    });
  };

  // Wait exactly 3 seconds after loading to trigger the cinematic space jump
  setTimeout(triggerCosmicAwakening, 3000);

  // Run scroll shifts
  initSpaceScrollSectors();

  // Initial rendering triggers
  renderDynamicContent(currentLang);
});
