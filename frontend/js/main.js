// Theme toggle functionality
(function () {
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const themeText = document.getElementById('themeText');
  const html = document.documentElement;

  // Mobile nav toggle (sidebar)
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');

  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('show');
    });

    // Close sidebar when a link is clicked
    sidebar.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        sidebar.classList.remove('show');
      });
    });
  }

  // Scroll Spy active navigation highlight
  const navLinksList = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  function scrollSpy() {
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - 200) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinksList.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  }

  window.addEventListener('scroll', scrollSpy);
  window.addEventListener('load', scrollSpy);

  // Function to set theme
  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    if (themeIcon) themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    if (themeText) themeText.textContent = theme === 'dark' ? 'Light' : 'Dark';
  }

  // Function to toggle theme
  function toggleTheme() {
    const currentTheme = html.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  }

  // Initialize theme on load
  const savedTheme = localStorage.getItem('theme') || 'dark';
  setTheme(savedTheme);

  // Add event listener to toggle button
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  // Update year in footer
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }


  // Galaxy background animation
  const canvas = document.getElementById('galaxy-bg');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationId;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3 - 0.2,
      opacity: Math.random() * 0.5 + 0.1,
      size: Math.random() * 2 + 0.5,
      color: Math.random() > 0.5 ? '#3b82f6' : '#ec4899'
    };
  }

  function initParticles() {
    particles = [];
    const numParticles = Math.floor((canvas.width * canvas.height) / 12000);
    for (let i = 0; i < numParticles; i++) {
      particles.push(createParticle());
    }
  }

  function updateParticles() {
    particles.forEach((p, index) => {
      p.x += p.dx;
      p.y += p.dy;

      p.opacity += (Math.random() - 0.5) * 0.01;
      p.opacity = Math.max(0.1, Math.min(0.6, p.opacity));

      if (p.y < -10) p.y = canvas.height + 10;
      if (p.x < -10) p.x = canvas.width + 10;
      if (p.x > canvas.width + 10) p.x = -10;
      if (p.y > canvas.height + 10) p.y = -10;
    });
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = p.size * 2;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  }

  function animate() {
    updateParticles();
    drawParticles();
    animationId = requestAnimationFrame(animate);
  }

  // Initialize
  resizeCanvas();
  initParticles();
  animate();

  // Handle resize
  window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
  });

})();

// Premium Certificate Carousel Functionality
(function () {
  const certCarousel = document.getElementById("certCarousel");
  const certPrevBtn = document.getElementById("certPrevBtn");
  const certNextBtn = document.getElementById("certNextBtn");
  const certDotsContainer = document.getElementById("certDots");

  if (!certCarousel) return;

  const certCards = certCarousel.querySelectorAll(".cert-card");
  if (certCards.length === 0) return;

  // --- Helper: get the scroll step (one card width + gap) ---
  function getScrollStep() {
    const style = window.getComputedStyle(certCarousel);
    const gap = parseFloat(style.columnGap) || parseFloat(style.gap) || 24;
    return certCards[0].offsetWidth + gap;
  }

  // --- Helper: get the current card index from scroll position ---
  function getCurrentIndex() {
    const step = getScrollStep();
    if (step === 0) return 0;
    return Math.round(certCarousel.scrollLeft / step);
  }

  // --- Helper: get max scrollable index ---
  function getMaxIndex() {
    return certCards.length - 1;
  }

  // --- Create dot indicators ---
  certCards.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      scrollToIndex(index);
    });
    certDotsContainer.appendChild(dot);
  });

  const dots = certDotsContainer.querySelectorAll(".dot");

  // --- Update active dot + arrow visibility ---
  function updateIndicators() {
    const index = getCurrentIndex();

    dots.forEach(d => d.classList.remove("active"));
    if (dots[index]) dots[index].classList.add("active");

    // Show/hide arrows at boundaries
    if (certPrevBtn) {
      certPrevBtn.style.visibility = index <= 0 ? "hidden" : "visible";
    }
    if (certNextBtn) {
      const maxScroll = certCarousel.scrollWidth - certCarousel.clientWidth;
      certNextBtn.style.visibility = certCarousel.scrollLeft >= maxScroll - 2 ? "hidden" : "visible";
    }
  }

  // Debounced scroll listener for dot updates
  let scrollTimer = null;
  certCarousel.addEventListener("scroll", () => {
    if (scrollTimer) cancelAnimationFrame(scrollTimer);
    scrollTimer = requestAnimationFrame(updateIndicators);
  });

  // --- Programmatic smooth scroll to a specific index ---
  function scrollToIndex(index) {
    const step = getScrollStep();
    const target = Math.min(index * step, certCarousel.scrollWidth - certCarousel.clientWidth);

    // Temporarily disable snap so the smooth scroll isn't hijacked
    certCarousel.style.scrollSnapType = "none";
    certCarousel.scrollTo({ left: target, behavior: "smooth" });

    // Re-enable snap after the animation settles
    setTimeout(() => {
      certCarousel.style.scrollSnapType = "x mandatory";
    }, 450);
  }

  // --- Arrow navigation ---
  if (certPrevBtn) {
    certPrevBtn.addEventListener("click", () => {
      const idx = getCurrentIndex();
      if (idx > 0) scrollToIndex(idx - 1);
    });
  }

  if (certNextBtn) {
    certNextBtn.addEventListener("click", () => {
      const idx = getCurrentIndex();
      if (idx < getMaxIndex()) scrollToIndex(idx + 1);
    });
  }

  // --- Keyboard navigation (when carousel or arrows are focused) ---
  certCarousel.setAttribute("tabindex", "0");
  certCarousel.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      const idx = getCurrentIndex();
      if (idx < getMaxIndex()) scrollToIndex(idx + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const idx = getCurrentIndex();
      if (idx > 0) scrollToIndex(idx - 1);
    }
  });

  // --- Mouse drag to scroll ---
  let isDown = false;
  let dragStartX = 0;
  let dragScrollLeft = 0;

  certCarousel.addEventListener("mousedown", (e) => {
    isDown = true;
    certCarousel.dataset.isDragging = "false";
    certCarousel.style.scrollSnapType = "none";
    certCarousel.style.scrollBehavior = "auto"; // instant tracking while dragging
    dragStartX = e.pageX - certCarousel.offsetLeft;
    dragScrollLeft = certCarousel.scrollLeft;
  });

  const endDrag = () => {
    if (!isDown) return;
    isDown = false;
    certCarousel.style.scrollSnapType = "x mandatory";
    certCarousel.style.scrollBehavior = "smooth";
  };

  certCarousel.addEventListener("mouseleave", endDrag);
  certCarousel.addEventListener("mouseup", endDrag);

  certCarousel.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - certCarousel.offsetLeft;
    const walk = (x - dragStartX) * 1.5;
    if (Math.abs(walk) > 5) {
      certCarousel.dataset.isDragging = "true";
    }
    certCarousel.scrollLeft = dragScrollLeft - walk;
  });

  // --- Touch swipe support (mobile) ---
  let touchStartX = 0;
  let touchScrollLeft = 0;

  certCarousel.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].pageX;
    touchScrollLeft = certCarousel.scrollLeft;
    certCarousel.style.scrollSnapType = "none";
    certCarousel.dataset.isDragging = "false";
  }, { passive: true });

  certCarousel.addEventListener("touchmove", (e) => {
    const x = e.touches[0].pageX;
    const walk = (touchStartX - x) * 1.2;
    if (Math.abs(walk) > 5) {
      certCarousel.dataset.isDragging = "true";
    }
    certCarousel.scrollLeft = touchScrollLeft + walk;
  }, { passive: true });

  certCarousel.addEventListener("touchend", () => {
    certCarousel.style.scrollSnapType = "x mandatory";
  }, { passive: true });

  // --- Initial state ---
  updateIndicators();

  // Recalculate on resize (card widths change at breakpoints)
  window.addEventListener("resize", () => {
    updateIndicators();
  });
})();

// Certificate Modal Functionality
const modal = document.getElementById("certModal");
const modalImg = document.getElementById("certModalImg");
const closeBtn = document.querySelector(".cert-close");

if (modal && modalImg) {
  document.querySelectorAll(".cert-img-container").forEach(container => {
    container.addEventListener("click", (e) => {
      const carousel = container.closest('.certifications-carousel');
      if (carousel && carousel.dataset.isDragging === "true") {
        e.preventDefault();
        return;
      }
      const img = container.querySelector("img");
      if (img) {
        modal.style.display = "block";
        modalImg.src = img.src;
      }
    });
  });

  if (closeBtn) {
    closeBtn.onclick = () => {
      modal.style.display = "none";
    };
  }

  modal.onclick = (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  };

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "block") {
      modal.style.display = "none";
    }
  });
}

// Contact Form Functionality
document
  .getElementById("SendBtn")
  .addEventListener("click", sendMessage);

async function sendMessage() {

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  // ---------- Frontend validation ----------
  if (!name || !email || !message) {
    alert("All fields are required ❌");
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    alert("Enter valid email format ❌");
    return;
  }

  const data = { name, email, message };

  try {
    const API_BASE_URL = 'https://portfolio-production-557c.up.railway.app/api/contact';
    const res = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      const err = await res.json();
      alert("Submission failed ❌\n" + (err.message || "Unknown error"));
      return;
    }

    alert("Message sent successfully ✅");
    document.getElementById("contactForm").reset();

  } catch (error) {
    console.error("Submission error:", error);
    alert(`Backend not reachable ❌\n\nDetails: ${error.message}\nCheck console for more info.`);
  }
}

