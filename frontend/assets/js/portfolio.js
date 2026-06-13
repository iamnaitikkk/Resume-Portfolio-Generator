const portfolioForm = document.getElementById("portfolio-form");
const portfolioPreview = document.getElementById("portfolio-preview");
const portfolioResult = document.getElementById("portfolio-result");
const portfolioTemplateSelect = document.getElementById("portfolio-template");

// SVG template previews
const templatePreviews = {
  developer: `<svg viewBox="0 0 200 260" class="template-preview"><rect width="200" height="260" fill="#fff" stroke="#e5e7eb" stroke-width="1"/><rect width="200" height="35" fill="#0f172a"/><text x="10" y="65" font-size="11" font-weight="bold" fill="#000">Alex Johnson</text><text x="10" y="78" font-size="8" fill="#666">Full Stack Developer</text><line x1="10" y1="85" x2="190" y2="85" stroke="#e5e7eb"/><text x="10" y="105" font-size="7" fill="#666">Skills</text><rect x="10" y="110" width="35" height="14" fill="#e0f2fe" rx="2"/><text x="15" y="119" font-size="5" fill="#2563eb">React</text><rect x="50" y="110" width="35" height="14" fill="#e0f2fe" rx="2"/><text x="55" y="119" font-size="5" fill="#2563eb">Node.js</text><text x="10" y="145" font-size="7" fill="#666">Projects</text><text x="10" y="160" font-size="6" fill="#333">Amazing App</text><text x="10" y="170" font-size="5" fill="#999">Built with React</text></svg>`,
  creative: `<svg viewBox="0 0 200 260" class="template-preview"><rect width="200" height="260" fill="#fff" stroke="#e5e7eb" stroke-width="1"/><rect width="200" height="45" fill="#f97316"/><text x="10" y="70" font-size="11" font-weight="bold" fill="#000">Alex Johnson</text><text x="10" y="85" font-size="8" fill="#666">Creative Designer</text><line x1="10" y1="92" x2="190" y2="92" stroke="#e5e7eb"/><text x="10" y="112" font-size="7" fill="#666">Skills</text><text x="10" y="125" font-size="6" fill="#333">Design, Figma, UI/UX</text><text x="10" y="145" font-size="7" fill="#666">Featured</text><rect x="10" y="150" width="50" height="30" fill="#fcd34d" rx="3"/><text x="20" y="170" font-size="5" fill="#333">Project 1</text></svg>`,
  minimal: `<svg viewBox="0 0 200 260" class="template-preview"><rect width="200" height="260" fill="#fff" stroke="#e5e7eb" stroke-width="1"/><text x="10" y="25" font-size="12" font-weight="bold">Alex Johnson</text><text x="10" y="40" font-size="8" fill="#666">Developer</text><text x="10" y="52" font-size="6" fill="#999">alex@example.com</text><line x1="10" y1="58" x2="190" y2="58" stroke="#e5e7eb"/><text x="10" y="75" font-size="7" font-weight="600">Skills</text><text x="10" y="87" font-size="6" fill="#333">React · Node.js · Design</text><text x="10" y="105" font-size="7" font-weight="600">Projects</text><text x="10" y="117" font-size="6" fill="#333">Project One</text><text x="10" y="130" font-size="6" fill="#333">Project Two</text></svg>`,
};

function createPortfolioPreview(data) {
  const skills = data.skills ? data.skills.split(",").map((skill) => skill.trim()).filter(Boolean) : [];
  const projects = [
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

  portfolioPreview.innerHTML = `
    <div class="preview-portfolio">
      <header>
        <h2>${data.name || "Your Name"}</h2>
        <p>${data.role || "Your Role"}</p>
        <p>${data.email || "email@example.com"} · ${data.phone || "(555) 123-4567"} · ${data.website || "https://example.com"}</p>
      </header>
      <section>
        <h3>About</h3>
        <p>${data.about || "A short introduction helps visitors understand who you are."}</p>
      </section>
      <section>
        <h3>Skills</h3>
        <p>${skills.join(" · ")}</p>
      </section>
      <section>
        <h3>Projects</h3>
        ${projects
          .map(
            (project) => `
              <article>
                <h4>${project.name}</h4>
                <p>${project.description}</p>
                ${project.link ? `<a href="${project.link}" target="_blank">View project</a>` : ""}
              </article>
            `
          )
          .join("")}
      </section>
    </div>
  `;
}

function updatePreview() {
  const formData = new FormData(portfolioForm);
  const data = Object.fromEntries(formData.entries());
  createPortfolioPreview(data);
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
    });
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") card.click();
    });
  });

  portfolioTemplateSelect.value = selected;
}

portfolioForm.addEventListener("input", updatePreview);
portfolioForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  portfolioResult.textContent = "Generating website…";
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

  try {
    const response = await fetch("/api/portfolio/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
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
