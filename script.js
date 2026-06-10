/* ============================================================
   SHINTOO PORTFOLIO – SCRIPT.JS
   Interactions, Animations & Dynamic Effects
============================================================ */

'use strict';

// ===== LOADER =====
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.classList.add('hidden');
      setTimeout(() => { loader.style.display = 'none'; }, 600);
    }
    document.body.style.overflow = 'auto';
  }, 2000);
});
document.body.style.overflow = 'hidden';

// ===== CUSTOM CURSOR =====
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  if (cursor) { cursor.style.left = mouseX + 'px'; cursor.style.top = mouseY + 'px'; }
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  if (follower) { follower.style.left = followerX + 'px'; follower.style.top = followerY + 'px'; }
  requestAnimationFrame(animateFollower);
}
animateFollower();

const hoverTargets = document.querySelectorAll('a, button, .project-card, .skill-pill, .comp-item, .contact-channel');
hoverTargets.forEach(el => {
  el.addEventListener('mouseenter', () => {
    if (cursor) cursor.style.transform = 'translate(-50%, -50%) scale(2.5)';
    if (follower) { follower.style.width = '50px'; follower.style.height = '50px'; follower.style.borderColor = 'rgba(79,142,247,0.8)'; }
  });
  el.addEventListener('mouseleave', () => {
    if (cursor) cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    if (follower) { follower.style.width = '30px'; follower.style.height = '30px'; follower.style.borderColor = 'rgba(79,142,247,0.5)'; }
  });
});

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }
  updateActiveNav();
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger?.addEventListener('click', () => {
  navLinks?.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  hamburger.classList.toggle('active');
  if (hamburger.classList.contains('active')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Close menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks?.classList.remove('open');
    if (hamburger?.classList.contains('active')) {
      hamburger.click();
    }
  });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
function updateActiveNav() {
  const sections = ['hero', 'about', 'experience', 'projects', 'skills', 'education', 'contact'];
  const scrollY = window.scrollY + 100;
  let current = 'hero';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && el.offsetTop <= scrollY) current = id;
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
  });
}

// ===== HEADLINE TYPEWRITER EFFECT =====
const headlines = [
  'Founder & CEO',
  'Innovation Ambassador',
  'Product Builder',
  'AI Enthusiast',
  'Student Entrepreneur',
  'Tech Leader'
];
let hIdx = 0, charIdx = 0, isDeleting = false;
const dynamicEl = document.getElementById('headline-dynamic');

function typeHeadline() {
  if (!dynamicEl) return;
  const current = headlines[hIdx];
  if (!isDeleting) {
    dynamicEl.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) {
      isDeleting = true;
      setTimeout(typeHeadline, 2000);
      return;
    }
  } else {
    dynamicEl.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) {
      isDeleting = false;
      hIdx = (hIdx + 1) % headlines.length;
    }
  }
  setTimeout(typeHeadline, isDeleting ? 60 : 100);
}
setTimeout(typeHeadline, 1500);

// ===== STATS COUNTER ANIMATION =====
function animateCounter(el, target, suffix = '') {
  const duration = 1800;
  const start = performance.now();
  const update = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  };
  requestAnimationFrame(update);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const strip = entry.target;
      strip.querySelectorAll('.stat-number').forEach(el => {
        const target = parseInt(el.dataset.target);
        animateCounter(el, target);
      });
      statsObserver.unobserve(strip);
    }
  });
}, { threshold: 0.3 });
const statsStrip = document.getElementById('stats-strip');
if (statsStrip) statsObserver.observe(statsStrip);

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

// Timeline items
document.querySelectorAll('.timeline-item').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.15}s`;
  revealObserver.observe(el);
});

// Project cards
document.querySelectorAll('.project-card').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.1}s`;
  revealObserver.observe(el);
});

// Education / cert cards
document.querySelectorAll('.edu-card, .cert-card').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.15}s`;
  revealObserver.observe(el);
});

// ===== PARTICLES =====
const particlesContainer = document.getElementById('particles');
if (particlesContainer) {
  const count = 18;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const size = Math.random() * 4 + 2;
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = (Math.random() * 15 + 10) + 's';
    p.style.animationDelay = (Math.random() * 10) + 's';
    p.style.opacity = (Math.random() * 0.5 + 0.1).toString();
    particlesContainer.appendChild(p);
  }
}

// ===== CONTACT FORM =====
function handleFormSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('form-name')?.value.trim();
  const emailVal = document.getElementById('form-email')?.value.trim();
  const subject = document.getElementById('form-subject')?.value.trim() || 'Portfolio Contact';
  const message = document.getElementById('form-message')?.value.trim();

  if (!name || !emailVal || !message) return;

  // Open email client with pre-filled message
  const mailto = `mailto:shintoo.6385@gmail.com?subject=${encodeURIComponent(subject + ' – from ' + name)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${emailVal}\n\n${message}`)}`;
  window.location.href = mailto;

  // Show success state
  document.getElementById('contact-form').style.display = 'none';
  document.getElementById('form-success').style.display = 'block';
  setTimeout(() => {
    document.getElementById('form-success').style.display = 'none';
    document.getElementById('contact-form').style.display = 'block';
    document.getElementById('contact-form').reset();
  }, 5000);
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===== TILT EFFECT ON PROJECT CARDS =====
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -5;
    const rotY = ((x - cx) / cx) * 5;
    card.style.transform = `translateY(-6px) perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ===== TIMELINE HOVER GLOW =====
document.querySelectorAll('.timeline-content').forEach(el => {
  el.addEventListener('mouseenter', () => {
    el.style.background = 'rgba(79,142,247,0.06)';
  });
  el.addEventListener('mouseleave', () => {
    el.style.background = '';
  });
});

// ===== SKILL PILL ANIMATION =====
document.querySelectorAll('.skill-pill').forEach((pill, i) => {
  pill.style.opacity = '0';
  pill.style.transform = 'scale(0.8)';
  pill.style.transition = `opacity 0.3s ease ${i * 0.04}s, transform 0.3s ease ${i * 0.04}s`;
  const pillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'scale(1)';
        pillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  pillObserver.observe(pill);
});

// ===== COMPETENCY ITEMS STAGGER =====
document.querySelectorAll('.comp-item').forEach((item, i) => {
  item.style.opacity = '0';
  item.style.transform = 'translateY(12px)';
  item.style.transition = `opacity 0.4s ease ${i * 0.06}s, transform 0.4s ease ${i * 0.06}s`;
  const compObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = '';
        compObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  compObserver.observe(item);
});

// ===== ABOUT PHOTO PARALLAX =====
window.addEventListener('scroll', () => {
  const aboutPhoto = document.querySelector('.about-photo');
  if (aboutPhoto) {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      const rect = aboutSection.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const scrolled = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        aboutPhoto.style.transform = `translateY(${scrolled * -15}px)`;
      }
    }
  }
});

console.log('%c✨ Portfolio of S. S. Shintoo Shel Lal – Founder & CEO, Zhynor IT Services & Solutions', 'color: #4f8ef7; font-size: 14px; font-weight: bold;');
