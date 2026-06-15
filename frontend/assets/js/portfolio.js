const portfolioForm = document.getElementById("portfolio-form");
const portfolioPreview = document.getElementById("portfolio-preview");
const portfolioResult = document.getElementById("portfolio-result");
const portfolioTemplateSelect = document.getElementById("portfolio-template");
const portfolioCertificatesInput = document.getElementById("portfolio-certificates");
const portfolioCertificatesList = document.getElementById("portfolio-certificates-list");
let portfolioCertificates = [];

// SVG template previews
const templatePreviews = {
  developer: `<svg viewBox="0 0 200 260" class="template-preview"><rect width="200" height="260" fill="#fff" stroke="#e5e7eb" stroke-width="1"/><rect width="200" height="35" fill="#0f172a"/><text x="10" y="65" font-size="11" font-weight="bold" fill="#000">Alex Johnson</text><text x="10" y="78" font-size="8" fill="#666">Full Stack Developer</text><line x1="10" y1="85" x2="190" y2="85" stroke="#e5e7eb"/><text x="10" y="105" font-size="7" fill="#666">Skills</text><rect x="10" y="110" width="35" height="14" fill="#e0f2fe" rx="2"/><text x="15" y="119" font-size="5" fill="#2563eb">React</text><rect x="50" y="110" width="35" height="14" fill="#e0f2fe" rx="2"/><text x="55" y="119" font-size="5" fill="#2563eb">Node.js</text><text x="10" y="145" font-size="7" fill="#666">Projects</text><text x="10" y="160" font-size="6" fill="#333">Amazing App</text><text x="10" y="170" font-size="5" fill="#999">Built with React</text></svg>`,
  creative: `<svg viewBox="0 0 200 260" class="template-preview"><rect width="200" height="260" fill="#fff" stroke="#e5e7eb" stroke-width="1"/><rect width="200" height="45" fill="#f97316"/><text x="10" y="70" font-size="11" font-weight="bold" fill="#000">Alex Johnson</text><text x="10" y="85" font-size="8" fill="#666">Creative Designer</text><line x1="10" y1="92" x2="190" y2="92" stroke="#e5e7eb"/><text x="10" y="112" font-size="7" fill="#666">Skills</text><text x="10" y="125" font-size="6" fill="#333">Design, Figma, UI/UX</text><text x="10" y="145" font-size="7" fill="#666">Featured</text><rect x="10" y="150" width="50" height="30" fill="#fcd34d" rx="3"/><text x="20" y="170" font-size="5" fill="#333">Project 1</text></svg>`,
  minimal: `<svg viewBox="0 0 200 260" class="template-preview"><rect width="200" height="260" fill="#fff" stroke="#e5e7eb" stroke-width="1"/><text x="10" y="25" font-size="12" font-weight="bold">Alex Johnson</text><text x="10" y="40" font-size="8" fill="#666">Developer</text><text x="10" y="52" font-size="6" fill="#999">alex@example.com</text><line x1="10" y1="58" x2="190" y2="58" stroke="#e5e7eb"/><text x="10" y="75" font-size="7" font-weight="600">Skills</text><text x="10" y="87" font-size="6" fill="#333">React · Node.js · Design</text><text x="10" y="105" font-size="7" font-weight="600">Projects</text><text x="10" y="117" font-size="6" fill="#333">Project One</text><text x="10" y="130" font-size="6" fill="#333">Project Two</text></svg>`,
  dark: `<svg viewBox="0 0 200 260" class="template-preview"><rect width="200" height="260" fill="#0b0f19"/><rect x="10" y="10" width="180" height="80" rx="8" fill="#131a2b" stroke="#1f2940"/><text x="20" y="35" font-size="13" font-weight="bold" fill="#fff">Alex Johnson</text><text x="20" y="48" font-size="6" fill="#5eead4" letter-spacing="1">FULL STACK DEVELOPER</text><text x="20" y="65" font-size="5.5" fill="#94a3b8">Builds reliable, scalable web apps.</text><text x="10" y="108" font-size="7" fill="#5eead4" letter-spacing="1">SKILLS</text><rect x="10" y="114" width="38" height="14" rx="7" fill="#131a2b" stroke="#2dd4bf"/><text x="16" y="124" font-size="5" fill="#5eead4">React</text><rect x="54" y="114" width="44" height="14" rx="7" fill="#131a2b" stroke="#2dd4bf"/><text x="60" y="124" font-size="5" fill="#5eead4">Node.js</text><text x="10" y="150" font-size="7" fill="#5eead4" letter-spacing="1">PROJECTS</text><rect x="10" y="156" width="180" height="34" rx="8" fill="#131a2b" stroke="#1f2940"/><text x="20" y="172" font-size="6" fill="#fff">Amazing App</text><text x="20" y="183" font-size="5" fill="#94a3b8">Built with React</text></svg>`,
  agency: `<svg viewBox="0 0 200 260" class="template-preview"><rect width="200" height="260" fill="#fff" stroke="#e5e7eb"/><text x="10" y="20" font-size="5" fill="#6b7280" letter-spacing="2">PORTFOLIO</text><text x="10" y="50" font-size="22" font-weight="800" fill="#0a0a0a">Alex</text><text x="10" y="74" font-size="22" font-weight="800" fill="#0a0a0a">Johnson</text><line x1="10" y1="86" x2="190" y2="86" stroke="#0a0a0a" stroke-width="3"/><text x="10" y="100" font-size="6" fill="#374151" font-weight="600">Full Stack Developer</text><text x="10" y="120" font-size="6" fill="#0a0a0a" letter-spacing="2">SKILLS</text><rect x="10" y="128" width="34" height="14" fill="none" stroke="#0a0a0a" stroke-width="1.5"/><text x="15" y="138" font-size="5" font-weight="700">REACT</text><text x="10" y="165" font-size="6" fill="#0a0a0a" letter-spacing="2">SELECTED WORK</text><line x1="10" y1="172" x2="190" y2="172" stroke="#e5e7eb"/><text x="10" y="186" font-size="6" font-weight="700">Amazing App</text><text x="170" y="186" font-size="5" text-decoration="underline" fill="#0a0a0a">View →</text></svg>`,
  gradient: `<svg viewBox="0 0 200 260" class="template-preview"><rect width="200" height="260" fill="#f5f3ff"/><defs><linearGradient id="pg1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#6366f1"/><stop offset="50%" stop-color="#ec4899"/><stop offset="100%" stop-color="#f59e0b"/></linearGradient></defs><rect x="10" y="10" width="180" height="60" rx="14" fill="url(#pg1)"/><text x="100" y="38" font-size="13" font-weight="700" fill="#fff" text-anchor="middle">Alex Johnson</text><text x="100" y="52" font-size="6" fill="#fff" text-anchor="middle" opacity="0.9">Creative Developer</text><rect x="10" y="80" width="180" height="34" rx="10" fill="#fff"/><text x="20" y="100" font-size="6" fill="#1e1b2e" font-weight="700">About</text><rect x="10" y="124" width="180" height="34" rx="10" fill="#fff"/><text x="20" y="138" font-size="6" fill="#6366f1" font-weight="700">Skills</text><rect x="20" y="144" width="40" height="12" rx="6" fill="#ede9fe"/><text x="26" y="153" font-size="5" fill="#6d28d9">Design</text><rect x="10" y="168" width="180" height="34" rx="10" fill="#fff"/><text x="20" y="188" font-size="6" font-weight="700" fill="#1e1b2e">Project One</text></svg>`,
  photographer: `<svg viewBox="0 0 200 260" class="template-preview"><rect width="200" height="260" fill="#111111"/><text x="100" y="22" font-size="5" fill="#a3a3a3" text-anchor="middle" letter-spacing="3">VISUAL PORTFOLIO</text><text x="100" y="44" font-size="15" font-weight="300" fill="#f5f5f5" text-anchor="middle" letter-spacing="2">Alex Johnson</text><text x="100" y="58" font-size="6" fill="#d4d4d4" text-anchor="middle">Photographer &amp; Visual Artist</text><rect x="10" y="78" width="85" height="60" fill="#262626"/><rect x="105" y="78" width="85" height="60" fill="#404040"/><text x="18" y="130" font-size="5.5" fill="#fff">Editorial Series</text><text x="113" y="130" font-size="5.5" fill="#fff">Studio Work</text><rect x="10" y="148" width="85" height="60" fill="#404040"/><rect x="105" y="148" width="85" height="60" fill="#262626"/><text x="100" y="232" font-size="5" fill="#a3a3a3" text-anchor="middle" letter-spacing="2">FOCUS: PORTRAIT · STUDIO · TRAVEL</text></svg>`,
  business: `<svg viewBox="0 0 200 260" class="template-preview"><rect width="200" height="260" fill="#f1f5f9"/><rect x="10" y="10" width="64" height="240" rx="10" fill="#1e3a5f"/><text x="22" y="36" font-size="11" font-weight="700" fill="#fff">Alex</text><text x="22" y="50" font-size="11" font-weight="700" fill="#fff">Johnson</text><text x="22" y="64" font-size="5.5" fill="#93c5fd" font-weight="600">Consultant</text><text x="22" y="90" font-size="5" fill="#cbd5e1">alex@example.com</text><text x="22" y="100" font-size="5" fill="#cbd5e1">+1 555 123 4567</text><rect x="22" y="118" width="30" height="12" rx="3" fill="#2d4a6e"/><text x="27" y="127" font-size="4.5" fill="#e0f2fe">Strategy</text><rect x="84" y="10" width="106" height="60" rx="10" fill="#fff"/><text x="94" y="30" font-size="6" fill="#1e3a5f" font-weight="700" letter-spacing="1">ABOUT</text><text x="94" y="46" font-size="5.5" fill="#475569">Helping businesses grow with</text><text x="94" y="56" font-size="5.5" fill="#475569">data-driven strategy.</text><rect x="84" y="78" width="106" height="60" rx="10" fill="#fff"/><text x="94" y="98" font-size="6" fill="#1e3a5f" font-weight="700" letter-spacing="1">PROJECTS</text><text x="94" y="114" font-size="5.5" fill="#1e293b" font-weight="700">Market Expansion</text></svg>`,
  terminal: `<svg viewBox="0 0 200 260" class="template-preview"><rect width="200" height="260" fill="#0d1117"/><rect x="10" y="10" width="180" height="240" rx="8" fill="#161b22" stroke="#30363d"/><rect x="10" y="10" width="180" height="18" rx="8" fill="#21262d"/><circle cx="20" cy="19" r="3" fill="#ff5f56"/><circle cx="30" cy="19" r="3" fill="#ffbd2e"/><circle cx="40" cy="19" r="3" fill="#27c93f"/><text x="50" y="22" font-size="5" fill="#8b949e">portfolio.sh</text><text x="20" y="44" font-size="5.5" fill="#3fb950" font-family="monospace">$ whoami</text><text x="20" y="62" font-size="12" fill="#58a6ff" font-weight="700" font-family="monospace">Alex Johnson</text><text x="20" y="76" font-size="6" fill="#8b949e" font-family="monospace">Full Stack Developer</text><text x="20" y="96" font-size="5.5" fill="#3fb950" font-family="monospace">// skills</text><rect x="20" y="102" width="34" height="12" rx="3" fill="#21262d" stroke="#30363d"/><text x="25" y="111" font-size="5" fill="#79c0ff" font-family="monospace">React</text><text x="20" y="134" font-size="5.5" fill="#3fb950" font-family="monospace">// projects</text><text x="26" y="150" font-size="5.5" fill="#c9d1d9" font-family="monospace">Amazing App</text></svg>`,
};

function getPortfolioPayload() {
  const formData = new FormData(portfolioForm);
  const payload = Object.fromEntries(formData.entries());
  payload.projects = [
    {
      name: document.getElementById("project-1-name").value,
      description: document.getElementById("project-1-description").value,
      link: document.getElementById("project-1-link").value,
    },
    {
      name: document.getElementById("project-2-name").value,
      description: document.getElementById("project-2-description").value,
      link: document.getElementById("project-2-link").value,
    },
  ].filter((project) => project.name || project.description);
  payload.certificates = portfolioCertificates;
  return payload;
}

function showPortfolioPreview(html) {
  let frame = portfolioPreview.querySelector("iframe");
  if (!frame) {
    portfolioPreview.innerHTML = '<iframe class="portfolio-preview-frame" title="Portfolio preview"></iframe>';
    frame = portfolioPreview.querySelector("iframe");
  }
  frame.srcdoc = html;
}

let portfolioPreviewTimer;
let portfolioPreviewRequest;

async function updatePreview() {
  const payload = getPortfolioPayload();

  if (portfolioPreviewRequest) {
    portfolioPreviewRequest.abort();
  }
  portfolioPreviewRequest = new AbortController();

  try {
    const response = await fetch("/api/portfolio/preview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: portfolioPreviewRequest.signal,
    });

    if (!response.ok) {
      throw new Error("Preview request failed");
    }

    showPortfolioPreview(await response.text());
  } catch (error) {
    if (error.name !== "AbortError") {
      portfolioPreview.innerHTML = '<p class="preview-error">Unable to update preview.</p>';
    }
  }
}

function schedulePreviewUpdate() {
  window.clearTimeout(portfolioPreviewTimer);
  portfolioPreviewTimer = window.setTimeout(updatePreview, 180);
}

async function loadTemplates() {
  const response = await fetch("/api/portfolio/templates");
  const result = await response.json();
  const templates = result.templates || [];
  portfolioTemplateSelect.innerHTML = templates
    .map((template) => `<option value="${template}">${template}</option>`)
    .join("");

  const container = document.getElementById("portfolio-templates");
  container.innerHTML = templates
    .map(
      (t) => {
        const preview = templatePreviews[t] || '';
        return `<div class="template-card" data-template="${t}" role="button" tabindex="0">
          <div class="template-preview-container">${preview}</div>
          <div class="template-name">${t}</div>
        </div>`;
      }
    )
    .join("");

  let selected = templates[0] || "developer";
  const cards = container.querySelectorAll(".template-card");
  cards.forEach((card) => {
    if (card.dataset.template === selected) card.classList.add("active");
    card.addEventListener("click", () => {
      cards.forEach((c) => c.classList.remove("active"));
      card.classList.add("active");
      portfolioTemplateSelect.value = card.dataset.template;
      schedulePreviewUpdate();
    });
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") card.click();
    });
  });

  portfolioTemplateSelect.value = selected;
}

portfolioForm.addEventListener("input", schedulePreviewUpdate);
if (portfolioCertificatesInput) {
  portfolioCertificatesInput.addEventListener("change", async (e) => {
    const files = Array.from(e.target.files || []);
    portfolioCertificates = [];
    portfolioCertificatesList.innerHTML = '';
    for (const file of files) {
      const reader = new FileReader();
      await new Promise((res) => {
        reader.onload = () => {
          const dataUrl = reader.result;
          portfolioCertificates.push({ name: file.name, type: file.type, dataUrl });
          const item = document.createElement('div');
          item.className = 'certificate-item';
          if (file.type.startsWith('image/')) {
            item.innerHTML = `<img src="${dataUrl}" alt="${file.name}" /><div class="cert-name">${file.name}</div>`;
          } else {
            item.innerHTML = `<div class="cert-file">${file.name}</div>`;
          }
          portfolioCertificatesList.appendChild(item);
          res();
        };
        reader.readAsDataURL(file);
      });
    }
    schedulePreviewUpdate();
  });
}
portfolioForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  portfolioResult.textContent = "Generating website…";
  const payload = getPortfolioPayload();

  try {
    const response = await fetch("/api/portfolio/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (response.status === 401) {
      window.location.href = '/login.html';
      return;
    }
    const result = await response.json();
    if (result.success) {
      portfolioResult.innerHTML = `<p>Portfolio website is ready.</p><a href="${result.siteUrl}" target="_blank" class="primary-button">Open Website</a>`;
    } else {
      portfolioResult.textContent = "Unable to generate the website. Try again.";
    }
  } catch (error) {
    portfolioResult.textContent = "Server error while generating the website.";
  }
});

window.addEventListener("DOMContentLoaded", async () => {
  await loadTemplates();
  updatePreview();
});
