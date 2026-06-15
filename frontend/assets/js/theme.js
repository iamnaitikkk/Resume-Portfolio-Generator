/* ============================================================
   Shared Theme Toggle + Scroll Reveal
   Used across all pages for a consistent soothing experience.
   ============================================================ */

(function () {
  const html = document.documentElement;
  const saved = localStorage.getItem("theme") || "light";
  html.dataset.theme = saved;

  function updateToggleUI(theme) {
    const toggle = document.getElementById("theme-toggle");
    const label = document.getElementById("theme-label");
    const isLight = theme === "light";
    if (toggle) {
      toggle.classList.toggle("lamp-on", isLight);
      toggle.setAttribute("aria-pressed", String(isLight));
    }
    if (label) label.textContent = isLight ? "Dark" : "Light";
  }

  document.addEventListener("DOMContentLoaded", () => {
    updateToggleUI(saved);

    const themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
      themeToggle.addEventListener("click", () => {
        const next = html.dataset.theme === "light" ? "dark" : "light";
        html.dataset.theme = next;
        localStorage.setItem("theme", next);
        updateToggleUI(next);
      });
    }

    /* ---------- Scroll Reveal ---------- */
    const revealEls = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window && revealEls.length) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
      );
      revealEls.forEach((el) => observer.observe(el));
    } else {
      revealEls.forEach((el) => el.classList.add("is-visible"));
    }

    /* ---------- Active Nav Link Highlight on Scroll ---------- */
    const navLinks = document.querySelectorAll(".nav-links a[href^='#']");
    const sections = [...navLinks]
      .map((link) => document.querySelector(link.getAttribute("href")))
      .filter(Boolean);

    if (sections.length) {
      const navObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const id = `#${entry.target.id}`;
              navLinks.forEach((link) => {
                link.classList.toggle("active", link.getAttribute("href") === id);
              });
            }
          });
        },
        { rootMargin: "-40% 0px -50% 0px" }
      );
      sections.forEach((section) => navObserver.observe(section));
    }

    /* ---------- Sticky Navbar Shadow ---------- */
    const navbar = document.querySelector(".navbar");
    if (navbar) {
      const onScroll = () => {
        navbar.classList.toggle("scrolled", window.scrollY > 12);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    /* ---------- Mobile Nav Toggle ---------- */
    const navToggle = document.getElementById("nav-toggle");
    const navMenu = document.querySelector(".nav-links");
    if (navToggle && navMenu) {
      navToggle.addEventListener("click", () => {
        navMenu.classList.toggle("open");
        navToggle.classList.toggle("open");
      });
      navMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
          navMenu.classList.remove("open");
          navToggle.classList.remove("open");
        });
      });
    }
  });
})();
