// --------------------------------------------------
// Beyond Code — Mountaineering Gallery
// Self-contained carousel, lightbox, touch & keyboard nav
// --------------------------------------------------
(function () {
  "use strict";

  // ── Slide Data ──────────────────────────────────────
  // Altitude values are only populated when independently verified.
  // Empty strings are omitted from the rendered caption automatically.
  const BEYOND_CODE_SLIDES = [
    {
      image: "frontend/assets/GLANCE/DKD 2 Uttarkashi expedition 2025.jpeg",
      title: "DKD-II Expedition",
      location: "Uttarkashi",
      year: "2025",
      altitude: "5,670",
      alt: "Bhuvanshu holding the Indian flag during a snow-covered Himalayan expedition"
    },
    {
      image: "frontend/assets/GLANCE/SHITIDHAR PEAK HIMACHAL.jpeg",
      title: "Shitidhar Peak",
      location: "Himachal Pradesh",
      year: "",
      altitude: "5,294",
      alt: "Bhuvanshu during the Shitidhar Peak expedition in Himachal Pradesh"
    },
    {
      image: "frontend/assets/GLANCE/REO PURGYIL HIGHEST HIMACHAL expedition.jpeg",
      title: "Reo Purgyil Expedition",
      location: "Himachal Pradesh",
      year: "",
      altitude: "6,816",
      alt: "Bhuvanshu during a high-altitude expedition in the Himalayas"
    },
    {
      image: "frontend/assets/GLANCE/WhatsApp Image 2026-08-20 at 2.14.55 PM (1).jpeg",
      title: "High-Altitude Expedition",
      location: "Himalayan Mountaineering",
      year: "",
      altitude: "",
      alt: "Bhuvanshu holding a flag during a high-altitude Himalayan expedition"
    },
    {
      image: "frontend/assets/GLANCE/IMF NEW DELHI.jpeg",
      title: "Indian Mountaineering Foundation",
      location: "New Delhi",
      year: "",
      altitude: "",
      alt: "Bhuvanshu at the Indian Mountaineering Foundation in New Delhi"
    },
    {
      image: "frontend/assets/GLANCE/Laison offider breifing IMF Delhi.jpeg",
      title: "Liaison Officer Briefing",
      location: "Indian Mountaineering Foundation",
      year: "",
      altitude: "",
      alt: "Bhuvanshu presenting at a liaison officer briefing at the Indian Mountaineering Foundation"
    },
    {
      image: "frontend/assets/GLANCE/WhatsApp Image 2026-08-20 at 2.14.54 PM.jpeg",
      title: "UIAA & UAAA",
      location: "Mountaineering Organizations",
      year: "",
      altitude: "",
      alt: "UIAA and UAAA international mountaineering federation signage"
    },
    {
      image: "frontend/assets/GLANCE/WhatsApp Image 2026-08-20 at 2.14.49 PM (2).jpeg",
      title: "Expedition Briefing",
      location: "Indian Mountaineering Foundation",
      year: "",
      altitude: "",
      alt: "Expedition briefing at the Indian Mountaineering Foundation"
    }
  ];

  // ── Helpers ─────────────────────────────────────────
  function buildSubtitle(slide) {
    var parts = [];
    if (slide.location) parts.push(slide.location);
    if (slide.year) parts.push(slide.year);
    if (slide.altitude) parts.push(slide.altitude + " m");
    return parts.join(" \u00b7 ");
  }

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ── DOM References ──────────────────────────────────
  var gallery = document.getElementById("bc-gallery");
  if (!gallery) return; // Section not present

  var featuredImg = document.getElementById("bc-featured-img");
  var captionTitle = document.getElementById("bc-caption-title");
  var captionSub = document.getElementById("bc-caption-sub");
  var thumbContainer = document.getElementById("bc-thumbnails");
  var dotsContainer = document.getElementById("bc-dots");
  var prevBtn = document.getElementById("bc-prev");
  var nextBtn = document.getElementById("bc-next");

  // Lightbox
  var lightbox = document.getElementById("bc-lightbox");
  var lbImg = document.getElementById("bc-lb-img");
  var lbCaption = document.getElementById("bc-lb-caption");
  var lbCounter = document.getElementById("bc-lb-counter");
  var lbClose = document.getElementById("bc-lb-close");
  var lbPrev = document.getElementById("bc-lb-prev");
  var lbNext = document.getElementById("bc-lb-next");

  // ── State ───────────────────────────────────────────
  var currentSlide = 0;
  var totalSlides = BEYOND_CODE_SLIDES.length;

  // ── Build Thumbnails & Dots ─────────────────────────
  BEYOND_CODE_SLIDES.forEach(function (slide, i) {
    // Thumbnail
    var thumb = document.createElement("button");
    thumb.className = "bc-thumb" + (i === 0 ? " active" : "");
    thumb.setAttribute("aria-label", "View slide " + (i + 1) + ": " + slide.title);
    thumb.setAttribute("type", "button");

    var thumbImg = document.createElement("img");
    thumbImg.src = slide.image;
    thumbImg.alt = slide.alt;
    thumbImg.loading = "lazy";
    thumbImg.decoding = "async";
    thumbImg.draggable = false;
    thumb.appendChild(thumbImg);

    thumb.addEventListener("click", function () { showSlide(i); });
    thumbContainer.appendChild(thumb);

    // Dot
    var dot = document.createElement("button");
    dot.className = "bc-dot" + (i === 0 ? " active" : "");
    dot.setAttribute("aria-label", "Go to slide " + (i + 1));
    dot.setAttribute("type", "button");
    dot.addEventListener("click", function () { showSlide(i); });
    dotsContainer.appendChild(dot);
  });

  // ── Core: showSlide ─────────────────────────────────
  function showSlide(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    currentSlide = index;

    var slide = BEYOND_CODE_SLIDES[index];

    // Transition
    if (!prefersReducedMotion) {
      featuredImg.style.opacity = "0";
      setTimeout(function () {
        featuredImg.src = slide.image;
        featuredImg.alt = slide.alt;
        featuredImg.style.opacity = "1";
      }, 200);
    } else {
      featuredImg.src = slide.image;
      featuredImg.alt = slide.alt;
    }

    // Caption
    captionTitle.textContent = slide.title;
    captionSub.textContent = buildSubtitle(slide);

    // Thumbnails
    var thumbs = thumbContainer.querySelectorAll(".bc-thumb");
    thumbs.forEach(function (t, i) {
      t.classList.toggle("active", i === index);
    });

    // Scroll active thumbnail into view
    if (thumbs[index]) {
      thumbs[index].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
    }

    // Dots
    var dots = dotsContainer.querySelectorAll(".bc-dot");
    dots.forEach(function (d, i) {
      d.classList.toggle("active", i === index);
    });
  }

  function nextSlide() { showSlide(currentSlide + 1); }
  function previousSlide() { showSlide(currentSlide - 1); }

  // ── Arrow Buttons ───────────────────────────────────
  if (prevBtn) prevBtn.addEventListener("click", function (e) { e.stopPropagation(); previousSlide(); });
  if (nextBtn) nextBtn.addEventListener("click", function (e) { e.stopPropagation(); nextSlide(); });

  // ── Keyboard Navigation (Gallery) ───────────────────
  document.addEventListener("keydown", function (e) {
    // Only respond when lightbox is closed and gallery is in viewport
    if (lightbox && lightbox.classList.contains("active")) return;

    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      var rect = gallery.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        if (e.key === "ArrowRight") nextSlide();
        else previousSlide();
      }
    }
  });

  // ── Touch Swipe (Featured Image) ────────────────────
  var touchStartX = 0;
  var touchStartY = 0;
  var touchDeltaX = 0;

  var featuredContainer = document.getElementById("bc-featured-container");
  if (featuredContainer) {
    featuredContainer.addEventListener("touchstart", function (e) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchDeltaX = 0;
    }, { passive: true });

    featuredContainer.addEventListener("touchmove", function (e) {
      touchDeltaX = e.touches[0].clientX - touchStartX;
      var deltaY = Math.abs(e.touches[0].clientY - touchStartY);
      // Prevent page scroll only if horizontal swipe dominates
      if (Math.abs(touchDeltaX) > deltaY && Math.abs(touchDeltaX) > 10) {
        e.preventDefault();
      }
    }, { passive: false });

    featuredContainer.addEventListener("touchend", function () {
      if (Math.abs(touchDeltaX) > 50) {
        if (touchDeltaX < 0) nextSlide();
        else previousSlide();
      }
    }, { passive: true });
  }

  // ── Lightbox ────────────────────────────────────────
  function openLightbox(index) {
    if (!lightbox) return;
    if (typeof index === "number") showSlide(index);

    var slide = BEYOND_CODE_SLIDES[currentSlide];
    lbImg.src = slide.image;
    lbImg.alt = slide.alt;
    lbCaption.textContent = slide.title;
    lbCounter.textContent = (currentSlide + 1) + " / " + totalSlides;

    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  }

  function lightboxShowSlide(index) {
    showSlide(index);
    var slide = BEYOND_CODE_SLIDES[currentSlide];
    if (!prefersReducedMotion) {
      lbImg.style.opacity = "0";
      setTimeout(function () {
        lbImg.src = slide.image;
        lbImg.alt = slide.alt;
        lbImg.style.opacity = "1";
      }, 200);
    } else {
      lbImg.src = slide.image;
      lbImg.alt = slide.alt;
    }
    lbCaption.textContent = slide.title;
    lbCounter.textContent = (currentSlide + 1) + " / " + totalSlides;
  }

  // Featured image click → open lightbox (but not when clicking arrows)
  if (featuredContainer) {
    featuredContainer.addEventListener("click", function (e) {
      // Don't open lightbox if user clicked an arrow button
      if (e.target.closest(".bc-arrow")) return;
      openLightbox(currentSlide);
    });
    featuredContainer.style.cursor = "zoom-in";
  }

  // Lightbox controls
  if (lbClose) lbClose.addEventListener("click", closeLightbox);
  if (lbPrev) lbPrev.addEventListener("click", function () { lightboxShowSlide(currentSlide - 1); });
  if (lbNext) lbNext.addEventListener("click", function () { lightboxShowSlide(currentSlide + 1); });

  // Click outside image → close
  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox || e.target.classList.contains("bc-lb-backdrop")) {
        closeLightbox();
      }
    });
  }

  // Keyboard: ESC → close, arrows → navigate in lightbox
  document.addEventListener("keydown", function (e) {
    if (!lightbox || !lightbox.classList.contains("active")) return;

    if (e.key === "Escape") {
      closeLightbox();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      lightboxShowSlide(currentSlide + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      lightboxShowSlide(currentSlide - 1);
    }
  });

  // Lightbox touch swipe
  var lbTouchStartX = 0;
  var lbTouchDelta = 0;

  if (lightbox) {
    lightbox.addEventListener("touchstart", function (e) {
      lbTouchStartX = e.touches[0].clientX;
      lbTouchDelta = 0;
    }, { passive: true });

    lightbox.addEventListener("touchmove", function (e) {
      lbTouchDelta = e.touches[0].clientX - lbTouchStartX;
    }, { passive: true });

    lightbox.addEventListener("touchend", function () {
      if (Math.abs(lbTouchDelta) > 50) {
        if (lbTouchDelta < 0) lightboxShowSlide(currentSlide + 1);
        else lightboxShowSlide(currentSlide - 1);
      }
    }, { passive: true });
  }

  // ── Initialize First Slide ──────────────────────────
  var first = BEYOND_CODE_SLIDES[0];
  featuredImg.src = first.image;
  featuredImg.alt = first.alt;
  captionTitle.textContent = first.title;
  captionSub.textContent = buildSubtitle(first);

})();
