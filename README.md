# Bhuvanshu — Full-Stack Developer Portfolio

This is a production-ready developer portfolio showcasing backend engineering systems, research projects, and deployable web applications built with **Java Spring Boot**, **MySQL**, and modern web technologies.

---

## 🔗 Live Platforms

*   **Frontend (Public Portfolio)**:https://bhuvanshu.github.io/portfolio/
*   **Backend API**: Deployed via Railway Cloud Infrastructure
*   **Admin Panel**: Secured dashboard for managing contact submissions

---

## 📌 Overview

This portfolio is a complete full-stack system including:
*   **Responsive Frontend**: Optimized for all devices with Dark/Light mode support.
*   **REST API Backend**: Built with Spring Boot for high-performance data handling.
*   **Cloud-hosted Database**: Managed MySQL instance on Railway.
*   **Admin Console**: Secured dashboard with role-specific data access.
*   **Secure Pipeline**: Environment-based secret management and header-based authentication.

---

## 🏗 System Architecture

```
User → Frontend UI → REST API → Database
                     ↓
                Admin Console
```

Contact form submissions are processed via backend APIs and persist in the managed MySQL cloud database.

---

## 🛠 Tech Stack

### Frontend
*   HTML5, CSS3, JavaScript
*   Responsive Grid Layout
*   Dark/Light Theme Toggle (Circular Icon UI)
*   Animated Galaxy Canvas Background

### Backend
*   **Java 17 (LTS)**
*   **Spring Boot 3.4.x**
*   Spring Web (RESTful Controllers)
*   Spring Data JPA (Hibernate)

### Database
*   MySQL (Remote Cloud Instance)
*   HikariCP Connection Pooling

### Admin & Security
*   Admin Console Dashboard
*   `X-ADMIN-KEY` Header-based Protection
*   REST API CORS Restrictions

---

## ✨ Key Features

*   ✅ **Real-time Persistence**: Submissions saved directly to MySQL.
*   ✅ **Admin Console**: Professional interface to view and manage leads.
*   ✅ **Modern UI**: Clean, responsive design with smooth micro-interactions.
*   ✅ **Certification Gallery**: Dynamic display of technical credentials.
*   ✅ **Deployment Ready**: Fully configured for Railway & GitHub Pages.

---

## 📂 Project Structure

```text
Portfolio/
├── admin/        → Admin Console Dashboard
├── backend/      → Spring Boot REST API
├── frontend/     → CSS, JS, and Assets
├── index.html    → Main Entry Point
└── Procfile      → Cloud Deployment Config
```

---

## 🚀 Deployment

| Layer    | Platform                |
| -------- | ----------------------- |
| Frontend | GitHub Pages            |
| Backend  | Railway (Container)     |
| Database | Managed MySQL (Railway) |

---

## 🔐 Security Notes

*   Sensitive credentials (DB, Mail, Admin Key) are handled via environment variables.
*   Public API endpoints are validated using Jakarta Validation bits.
*   Admin data retrieval is protected by mandatory secret header verification.

---

© 2026 Bhuvanshu Singh — Developer Portfolio
