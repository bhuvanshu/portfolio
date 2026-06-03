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

    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
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

// Load Certificate hover functionality
const certContainer = document.querySelector(".certifications-container");

if (certContainer) {
  let scrollSpeed = 0;

  certContainer.addEventListener("mousemove", (e) => {
    const rect = certContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const edgeZone = 120;

    if (x < edgeZone) {
      scrollSpeed = -6;
    } else if (x > width - edgeZone) {
      scrollSpeed = 6;
    } else {
      scrollSpeed = 0;
    }
  });

  certContainer.addEventListener("mouseleave", () => {
    scrollSpeed = 0;
  });

  function autoScroll() {
    certContainer.scrollLeft += scrollSpeed;
    requestAnimationFrame(autoScroll);
  }

  autoScroll();
}

// Certificate Modal Functionality
const modal = document.getElementById("certModal");
const modalImg = document.getElementById("certModalImg");
const closeBtn = document.querySelector(".cert-close");

document.querySelectorAll(".cert-img").forEach(img => {
  img.addEventListener("click", () => {
    modal.style.display = "block";
    modalImg.src = img.src;
  });
});

closeBtn.onclick = () => {
  modal.style.display = "none";
};

modal.onclick = (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
};

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

