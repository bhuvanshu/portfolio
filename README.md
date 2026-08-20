# Bhuvanshu — Developer Portfolio

A responsive personal portfolio showcasing backend engineering work, applied
machine learning, research projects, and shipped products.

---

## 🔗 Live Site

* **Portfolio**: https://bhuvanshu.github.io/portfolio/

---

## 📌 Overview

A static, dependency-free front end built with plain HTML, CSS and JavaScript:

* **Responsive Layout**: Optimised for desktop, tablet and mobile.
* **Dark Cyber Theme**: Animated galaxy canvas background and glassmorphism cards.
* **Certification Gallery**: Swipeable carousel with a full-size image viewer.
* **Contact Form**: Submits to a standalone HTTP endpoint (no secrets in the client).

---

## 🛠 Tech Stack

* HTML5, CSS3, JavaScript (no build step, no framework)
* CSS Grid + Flexbox responsive layout
* Canvas 2D particle background

---

## 📂 Project Structure

```text
portfolio/
├── frontend/
│   ├── assets/    → images, icons, certificates, résumé
│   ├── css/       → style.css
│   └── js/        → main.js, profile-hover.js
├── index.html     → single-page entry point
└── README.md
```

---

## 🚀 Deployment

| Layer        | Platform                  |
| ------------ | ------------------------- |
| Static site  | GitHub Pages              |
| Contact API  | Cloudflare Worker (HTTP)  |

The contact form posts JSON (`name`, `email`, `message`) to a public Worker
endpoint. No API keys, tokens or credentials are stored in this repository.

---

© 2026 Bhuvanshu Singh — Developer Portfolio
