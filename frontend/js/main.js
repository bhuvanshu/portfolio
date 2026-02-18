// Theme toggle functionality
(function () {
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const themeText = document.getElementById('themeText');
  const html = document.documentElement;

  // Mobile nav toggle
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('show');
      });
    });
  }

  // Function to set theme
  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    if (theme === 'dark') {
      themeIcon.textContent = '☀️';
      themeText.textContent = 'Light';
    } else {
      themeIcon.textContent = '🌙';
      themeText.textContent = 'Dark';
    }
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
    const types = ['star', 'meteor', 'comet'];
    const type = types[Math.floor(Math.random() * types.length)];

    let particle = {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      type: type,
      speed: Math.random() * 2 + 0.5,
      opacity: Math.random(),
      size: Math.random() * 2 + 1
    };

    if (type === 'meteor' || type === 'comet') {
      particle.x = Math.random() * canvas.width;
      particle.y = -10;
      particle.dx = (Math.random() - 0.5) * 2;
      particle.dy = Math.random() * 2 + 1;
    }

    return particle;
  }

  function initParticles() {
    particles = [];
    const numParticles = Math.floor((canvas.width * canvas.height) / 15000); // Adjust density
    for (let i = 0; i < numParticles; i++) {
      particles.push(createParticle());
    }
  }

  function updateParticles() {
    particles.forEach((p, index) => {
      if (p.type === 'star') {
        p.opacity += (Math.random() - 0.5) * 0.02;
        p.opacity = Math.max(0, Math.min(1, p.opacity));
      } else if (p.type === 'meteor' || p.type === 'comet') {
        p.x += p.dx * p.speed;
        p.y += p.dy * p.speed;
        p.opacity -= 0.005;
        if (p.y > canvas.height + 10 || p.opacity <= 0) {
          particles[index] = createParticle();
        }
      }
    });
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.save();
      ctx.globalAlpha = p.opacity;

      if (p.type === 'star') {
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.type === 'meteor') {
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x - p.dx * 10, p.y - p.dy * 10);
        ctx.stroke();
      } else if (p.type === 'comet') {
        ctx.strokeStyle = '#60a5fa';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x - p.dx * 20, p.y - p.dy * 20);
        ctx.stroke();
        // Add glow
        ctx.shadowColor = '#60a5fa';
        ctx.shadowBlur = 5;
        ctx.stroke();
      }

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

    const res = await fetch("http://localhost:8080/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    // ---------- Backend response handling ----------
    if (res.ok) {

      alert("Message Sent Successfully ✅");

      document.getElementById("contactForm").reset();

    } else if (res.status === 400) {

      alert("Invalid input ❌ Check fields again");

    } else {

      alert("Server error ⚠️ Try later");

    }

  } catch (error) {

    console.error(error);
    alert("Backend not reachable ❌");

  }
}

