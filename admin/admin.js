const BASE_URL = 'https://portfolio-production-557c.up.railway.app';
let ADMIN_KEY = "";

// ---------- Toast helper ----------
function showToast(msg, type = "success") {
  const toast = document.getElementById("toast");
  toast.textContent = (type === "success" ? "✅ " : "❌ ") + msg;
  toast.className = "show " + type;
  setTimeout(() => { toast.className = ""; }, 3000);
}

// ---------- Status badge ----------
function setOnline() {
  const badge = document.getElementById("statusBadge");
  const text = document.getElementById("statusText");
  if (badge && text) {
    badge.classList.add("online");
    text.textContent = "Online";
  }
}

// ---------- Login ----------
function login() {
  ADMIN_KEY = document.getElementById("adminKey").value.trim();

  if (!ADMIN_KEY) {
    showToast("Enter admin key", "error");
    return;
  }

  fetch(`${BASE_URL}/api/contact`, {
    method: "GET",
    headers: { "X-ADMIN-KEY": ADMIN_KEY }
  })
    .then(res => {
      if (!res.ok) throw new Error("Unauthorized");
      return res.json();
    })
    .then(data => {
      document.getElementById("loginBox").style.display = "none";
      document.getElementById("dashboard").style.display = "block";
      setOnline();
      populateTable(data);
      showToast("Logged in successfully");
    })
    .catch(() => {
      showToast("Invalid admin key", "error");
    });
}

// ---------- Load contacts ----------
function loadContacts() {
  fetch(`${BASE_URL}/api/contact`, {
    method: "GET",
    headers: { "X-ADMIN-KEY": ADMIN_KEY }
  })
    .then(res => {
      if (!res.ok) throw new Error("Unauthorized");
      return res.json();
    })
    .then(data => populateTable(data))
    .catch(err => {
      showToast("Failed to refresh", "error");
      console.error(err);
    });
}

// ---------- Populate table ----------
function populateTable(data) {
  const tbody = document.querySelector("#contactTable tbody");
  const count = document.getElementById("recordCount");

  tbody.innerHTML = "";

  if (count) {
    count.textContent = data.length + " record" + (data.length !== 1 ? "s" : "");
  }

  if (data.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5">
          <div class="empty-state">
            <div class="empty-icon">📭</div>
            <p>No messages yet</p>
          </div>
        </td>
      </tr>`;
    return;
  }

  data.forEach(contact => {
    const row = `
      <tr>
        <td>#${contact.id}</td>
        <td>${escapeHtml(contact.name)}</td>
        <td>${escapeHtml(contact.email)}</td>
        <td>${escapeHtml(contact.message)}</td>
        <td>
          <button class="btn-danger" onclick="deleteContact(${contact.id})">
            Delete
          </button>
        </td>
      </tr>`;
    tbody.innerHTML += row;
  });
}

// ---------- Delete ----------
function deleteContact(id) {
  if (!confirm("Delete this message?")) return;

  fetch(`${BASE_URL}/api/contact/${id}`, {
    method: "DELETE",
    headers: { "X-ADMIN-KEY": ADMIN_KEY }
  })
    .then(() => {
      showToast("Message deleted");
      loadContacts();
    })
    .catch(err => {
      showToast("Delete failed", "error");
      console.error(err);
    });
}

// ---------- XSS guard ----------
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ---------- Enter key on login ----------
document.getElementById("adminKey").addEventListener("keydown", e => {
  if (e.key === "Enter") login();
});
