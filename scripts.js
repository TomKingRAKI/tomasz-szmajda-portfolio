
// Loader - na samym początku pliku
window.addEventListener('load', function() {
    setTimeout(function() {
      document.body.classList.add('loaded');
      
      // Usuń loader po animacji
      const loader = document.getElementById('global-loader');
      loader.addEventListener('transitionend', function() {
        loader.remove();
      });
    }, 2500); // Minimalny czas pokazywania loadera
  });

// Smooth scrolling dla linków
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Efekt sticky header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
});

// Animacja pasków umiejętności
function animateSkills() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        const progressBar = item.querySelector('.skill-progress');
        const percentElement = item.querySelector('[data-count]');
        const targetWidth = progressBar.getAttribute('data-width');
        const targetPercent = percentElement.getAttribute('data-count');
        
        let currentPercent = 0;
        const interval = setInterval(() => {
            if (currentPercent >= targetPercent) {
                clearInterval(interval);
            } else {
                currentPercent++;
                percentElement.textContent = currentPercent + '%';
            }
        }, 20);
        
        progressBar.style.width = targetWidth + '%';
    });
}

// Obserwator do wyzwalania animacji
const aboutSection = document.querySelector('.about');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkills();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

observer.observe(aboutSection);

document.addEventListener('DOMContentLoaded', function() {
    particlesJS('particles-js', {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#800020" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: "#800020", opacity: 0.4, width: 1 },
        move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out" }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "repulse" },
          onclick: { enable: true, mode: "push" }
        }
      }
    });
  });

  // Inicjalizacja ScrollReveal
  const sr = ScrollReveal({
    origin: 'bottom',
    distance: '40px',
    duration: 800,
    delay: 200,
    reset: false,
    easing: 'cubic-bezier(0.5, 0, 0, 1)'
  });
  
  // Efekty dla poszczególnych sekcji
  sr.reveal('.hero-content, .hero-image', { delay: 300, origin: 'bottom' });
  sr.reveal('.about-image, .about-content', { origin: 'left', distance: '100px', interval: 100 });

  
  // Sekcja Skills
  sr.reveal('.skill-category', { 
    interval: 150,
    scale: 0.95,
    viewFactor: 0.2
  });
  
  // Sekcja Certyfikaty
  sr.reveal('.certificate-card', {
    interval: 100,
    rotate: { x: 10 },
    viewFactor: 0.3
  });
  
  // Nagłówki sekcji
  sr.reveal('.section-title', {
    delay: 100,
    origin: 'top',
    distance: '60px'
  });

  sr.reveal('.skill-bar', {
    delay: 400,
    beforeReveal: (el) => {
      const progress = el.querySelector('.skill-progress');
      progress.style.width = progress.style.width; // Trigger animation
    }
  });
// Modal functionality
const modal = document.getElementById('modal');
const modalFrame = document.getElementById('certificate-frame');
const downloadBtn = document.getElementById('download-btn');
let currentPdf = '';

function openModal(pdfUrl) {
    const loader = document.querySelector('.pdf-loader');
  loader.style.display = 'block';
  modal.style.display = 'block';
  
  setTimeout(() => {
    modalFrame.src = pdfUrl;
    loader.style.display = 'none';
  }, 500);
  currentPdf = pdfUrl;
  modalFrame.src = pdfUrl;
  downloadBtn.href = pdfUrl;
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
  modalFrame.src = '';
}

// Close modal events
document.querySelector('.close-modal').addEventListener('click', closeModal);
window.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

// Zmodyfikowane przyciski certyfikatów
document.querySelectorAll('.certificate-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const pdfUrl = btn.getAttribute('data-pdf');
    openModal(pdfUrl);
  });
});
ScrollReveal({ reset: false }); // Zamiast true
document.getElementById('pdf-frame').innerHTML = `
  <embed src="${pdfUrl}#toolbar=0&navpanes=0" type="application/pdf" width="100%" height="100%">
`;

window.addEventListener('scroll', function() {
  const scrollPosition = window.pageYOffset;
  document.querySelector('.hero-image').style.transform = 
    `translateY(${scrollPosition * 0.3}px)`;
  document.querySelector('.about-image').style.transform = 
    `translateY(${scrollPosition * 0.1}px)`;
});

window.addEventListener('scroll', () => {
    const dividers = document.querySelectorAll('.section-divider');
    const scrollY = window.scrollY;
    
    dividers.forEach(div => {
        const speed = div.dataset.speed || 0.3;
        const offset = scrollY * speed;
        div.style.backgroundPositionY = `${offset}px`;
    });
});

