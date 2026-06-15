/* ============================================================
   Auth Guard — protects builder pages, requires login/signup
   Redirects to /login.html if the user is not authenticated.
   Also wires up any #logout-btn on the page.
   ============================================================ */

(function () {
  async function checkAuth() {
    try {
      const res = await fetch("/api/auth/me", {
        method: "GET",
        credentials: "same-origin",
      });
      const data = await res.json().catch(() => ({}));

      if (!data.authenticated) {
        const next = encodeURIComponent(window.location.pathname);
        window.location.href = "/login.html?next=" + next;
        return;
      }

      // Show the page now that we know the user is authenticated
      document.documentElement.classList.add("auth-ready");

      // Populate user email where requested
      document.querySelectorAll("[data-user-email]").forEach((el) => {
        el.textContent = data.email || "";
      });
    } catch (err) {
      // If the auth check itself fails, send to login to be safe
      window.location.href = "/login.html";
    }
  }

  // Hide content until auth check completes (avoids flash of protected UI)
  document.documentElement.classList.add("auth-pending");
  checkAuth();

  document.addEventListener("DOMContentLoaded", () => {
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", async () => {
        try {
          await fetch("/api/auth/logout", {
            method: "POST",
            credentials: "same-origin",
          });
        } catch (err) {
          /* ignore */
        }
        window.location.href = "/login.html";
      });
    }
  });
})();
