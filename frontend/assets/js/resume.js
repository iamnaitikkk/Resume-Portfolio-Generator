const resumeForm = document.getElementById("resume-form");
const resumePreview = document.getElementById("resume-preview");
const resumeResult = document.getElementById("resume-result");
const resumeTemplateSelect = document.getElementById("resume-template");
const resumeCertificatesInput = document.getElementById("resume-certificates");
const resumeCertificatesList = document.getElementById("resume-certificates-list");
const resumeAchievementsPreview = document.getElementById("resume-achievements-preview");
let resumeCertificates = [];

const templatePreviews = {
  modern: `<svg viewBox="0 0 200 260" class="template-preview"><rect width="200" height="260" rx="2" fill="#fff" stroke="#dbe4ef"/><line x1="18" y1="63" x2="182" y2="63" stroke="#1f6feb" stroke-width="3"/><text x="18" y="28" font-size="8" fill="#1f6feb" font-weight="700">RESUME</text><text x="18" y="47" font-size="15" fill="#111827" font-weight="700">Jane Doe</text><text x="18" y="57" font-size="7" fill="#405168">Product Designer</text><text x="18" y="88" font-size="7" fill="#334155">Profile summary with measurable impact.</text><text x="18" y="119" font-size="7" fill="#1f6feb" font-weight="700">EXPERIENCE</text><rect x="125" y="112" width="44" height="12" fill="#edf5ff"/><rect x="125" y="130" width="36" height="12" fill="#edf5ff"/><text x="18" y="135" font-size="6" fill="#333">Led product launch and improved conversion.</text><text x="125" y="105" font-size="7" fill="#1f6feb" font-weight="700">SKILLS</text><text x="18" y="156" font-size="6" fill="#333">Built design systems for web and mobile.</text></svg>`,
  professional: `<svg viewBox="0 0 200 260" class="template-preview"><rect width="200" height="260" rx="2" fill="#fff" stroke="#d8dee8"/><rect width="62" height="260" fill="#172033"/><text x="15" y="30" font-size="10" fill="#fff" font-weight="700">Jane</text><text x="15" y="43" font-size="10" fill="#fff" font-weight="700">Doe</text><text x="15" y="57" font-size="5" fill="#cbd5e1">PRODUCT DESIGNER</text><text x="15" y="88" font-size="6" fill="#93c5fd" font-weight="700">CONTACT</text><text x="15" y="122" font-size="6" fill="#93c5fd" font-weight="700">SKILLS</text><text x="76" y="35" font-size="7" fill="#172033" font-weight="700">PROFILE</text><line x1="76" y1="41" x2="184" y2="41" stroke="#cbd5e1"/><text x="76" y="59" font-size="6" fill="#334155">Professional summary and impact.</text><text x="76" y="91" font-size="7" fill="#172033" font-weight="700">EXPERIENCE</text><line x1="76" y1="97" x2="184" y2="97" stroke="#cbd5e1"/><text x="76" y="115" font-size="6" fill="#333">Led design operations and delivery.</text></svg>`,
  minimal: `<svg viewBox="0 0 200 260" class="template-preview"><rect width="200" height="260" rx="2" fill="#fff" stroke="#e1e6ed"/><text x="18" y="32" font-size="14" fill="#202733" font-weight="700">Jane Doe</text><text x="18" y="46" font-size="7" fill="#536172">Product Designer</text><line x1="18" y1="61" x2="182" y2="61" stroke="#aeb8c5"/><text x="18" y="84" font-size="6" fill="#202733" font-weight="700">SUMMARY</text><text x="72" y="84" font-size="6" fill="#364456">Clear profile with measurable impact.</text><line x1="18" y1="104" x2="182" y2="104" stroke="#e1e6ed"/><text x="18" y="128" font-size="6" fill="#202733" font-weight="700">EXPERIENCE</text><text x="72" y="128" font-size="6" fill="#364456">Led launches and improved outcomes.</text><line x1="18" y1="150" x2="182" y2="150" stroke="#e1e6ed"/><text x="18" y="174" font-size="6" fill="#202733" font-weight="700">SKILLS</text><text x="72" y="174" font-size="6" fill="#364456">Design  Strategy  Figma</text></svg>`,
  classic: `<svg viewBox="0 0 200 260" class="template-preview"><rect width="200" height="260" rx="2" fill="#fff" stroke="#ddd8cc"/><line x1="20" y1="48" x2="180" y2="48" stroke="#2b2b2b" stroke-width="2"/><text x="100" y="32" font-size="13" fill="#2b2b2b" font-weight="700" text-anchor="middle" font-family="Georgia,serif">JANE DOE</text><text x="100" y="42" font-size="6" fill="#5a5246" font-style="italic" text-anchor="middle">Product Designer</text><rect x="20" y="58" width="160" height="22" fill="#fff4ec"/><text x="26" y="72" font-size="6" fill="#3a3a3a">A focused summary highlighting impact.</text><text x="20" y="98" font-size="7" fill="#2b2b2b" font-weight="700" letter-spacing="1">EXPERIENCE</text><line x1="20" y1="103" x2="180" y2="103" stroke="#cfc9bb"/><text x="20" y="118" font-size="6" fill="#3a3a3a">Led product launch and improved conversion.</text><text x="20" y="150" font-size="7" fill="#2b2b2b" font-weight="700" letter-spacing="1">SKILLS</text><line x1="20" y1="155" x2="180" y2="155" stroke="#cfc9bb"/><text x="20" y="170" font-size="6" fill="#3a3a3a" font-style="italic">Design · Strategy · Figma</text></svg>`,
  executive: `<svg viewBox="0 0 200 260" class="template-preview"><rect width="200" height="260" fill="#fff" stroke="#d8dee8"/><rect width="68" height="260" fill="#1c2230"/><text x="12" y="32" font-size="11" fill="#fff" font-weight="700">Jane</text><text x="12" y="46" font-size="11" fill="#fff" font-weight="700">Doe</text><text x="12" y="60" font-size="5" fill="#c7a256" letter-spacing="1">PRODUCT DESIGNER</text><text x="12" y="92" font-size="6" fill="#c7a256" font-weight="700">CONTACT</text><line x1="12" y1="96" x2="60" y2="96" stroke="#3a4256"/><text x="12" y="130" font-size="6" fill="#c7a256" font-weight="700">SKILLS</text><line x1="12" y1="134" x2="60" y2="134" stroke="#3a4256"/><rect x="12" y="140" width="30" height="12" rx="6" fill="#2c3447"/><text x="80" y="35" font-size="7" fill="#1c2230" font-weight="700" letter-spacing="1">PROFILE</text><line x1="80" y1="41" x2="184" y2="41" stroke="#c7a256" stroke-width="2"/><text x="80" y="60" font-size="6" fill="#3a4256">Strategic leader driving measurable growth.</text><text x="80" y="95" font-size="7" fill="#1c2230" font-weight="700" letter-spacing="1">EXPERIENCE</text><line x1="80" y1="101" x2="184" y2="101" stroke="#c7a256" stroke-width="2"/><text x="80" y="120" font-size="6" fill="#333">Directed cross-functional teams to deliver impact.</text></svg>`,
  creative: `<svg viewBox="0 0 200 260" class="template-preview"><rect width="200" height="260" rx="10" fill="#fff" stroke="#f3e4d4"/><rect width="200" height="58" rx="10" fill="#ff8a5b"/><rect width="200" height="48" y="10" fill="#ff8a5b"/><text x="18" y="32" font-size="14" fill="#fff" font-weight="700">Jane Doe</text><text x="18" y="46" font-size="7" fill="#fff" font-weight="600">Product Designer</text><rect x="18" y="70" width="164" height="22" rx="4" fill="#fff4ec"/><text x="24" y="84" font-size="6" fill="#4a4540">Bold and friendly profile summary.</text><text x="18" y="110" font-size="7" fill="#ff6f91" font-weight="700" letter-spacing="1">EXPERIENCE</text><text x="18" y="125" font-size="6" fill="#333">Led product launch and improved conversion.</text><text x="18" y="150" font-size="7" fill="#ff6f91" font-weight="700" letter-spacing="1">SKILLS</text><rect x="18" y="158" width="36" height="14" rx="7" fill="#ffe3d3"/><text x="24" y="168" font-size="5" fill="#c2410c">Design</text><rect x="60" y="158" width="36" height="14" rx="7" fill="#ffe3d3"/><text x="66" y="168" font-size="5" fill="#c2410c">Figma</text></svg>`,
  tech: `<svg viewBox="0 0 200 260" class="template-preview"><rect width="200" height="260" fill="#fff" stroke="#d6dce5"/><line x1="18" y1="48" x2="182" y2="48" stroke="#94a3b8" stroke-dasharray="3,2"/><text x="18" y="22" font-size="6" fill="#16a34a" font-family="monospace">~/resume $ whoami</text><text x="18" y="38" font-size="13" fill="#0f172a" font-weight="700" font-family="monospace">Jane Doe</text><text x="18" y="62" font-size="7" fill="#2563eb" font-weight="700" font-family="monospace">Product Designer</text><rect x="18" y="74" width="164" height="22" fill="#f1f5f9"/><text x="24" y="88" font-size="6" fill="#334155" font-family="monospace">Builds delightful, scalable products.</text><text x="18" y="112" font-size="7" fill="#0f172a" font-weight="700" font-family="monospace">$ experience</text><text x="18" y="126" font-size="6" fill="#334155" font-family="monospace">- Led product launch (+30% conv.)</text><text x="18" y="150" font-size="7" fill="#0f172a" font-weight="700" font-family="monospace">$ skills</text><rect x="18" y="158" width="40" height="14" rx="3" fill="#0f172a"/><text x="24" y="168" font-size="5" fill="#4ade80" font-family="monospace">React</text></svg>`,
  compact: `<svg viewBox="0 0 200 260" class="template-preview"><rect width="200" height="260" fill="#fff" stroke="#e1e6ed"/><line x1="18" y1="40" x2="182" y2="40" stroke="#1f2933" stroke-width="2"/><text x="18" y="26" font-size="13" fill="#1f2933" font-weight="700">Jane Doe</text><text x="18" y="36" font-size="6" fill="#52606d" font-weight="700" letter-spacing="1">PRODUCT DESIGNER</text><text x="182" y="22" font-size="5" fill="#52606d" text-anchor="end">jane@x.com</text><text x="182" y="30" font-size="5" fill="#52606d" text-anchor="end">+1 555 123 4567</text><text x="18" y="56" font-size="6" fill="#334155">Concise summary with measurable impact.</text><text x="18" y="76" font-size="6" fill="#1f2933" font-weight="700" letter-spacing="1">EXPERIENCE</text><line x1="18" y1="80" x2="182" y2="80" stroke="#cbd2d9"/><text x="18" y="92" font-size="5.5" fill="#334155">Led product launch and improved conversion.</text><text x="18" y="104" font-size="5.5" fill="#334155">Built and scaled design systems.</text><text x="18" y="124" font-size="6" fill="#1f2933" font-weight="700" letter-spacing="1">SKILLS</text><line x1="18" y1="128" x2="182" y2="128" stroke="#cbd2d9"/><text x="18" y="140" font-size="5.5" fill="#334155">Design · Strategy · Figma · UX Writing</text></svg>`,
  elegant: `<svg viewBox="0 0 200 260" class="template-preview"><rect width="200" height="260" fill="#fff" stroke="#f6f7f3"/><text x="100" y="32" font-size="13" fill="#2f3a33" text-anchor="middle" letter-spacing="3" font-family="Georgia,serif">JANE DOE</text><text x="100" y="46" font-size="6" fill="#6f8d76" text-anchor="middle" letter-spacing="2">PRODUCT DESIGNER</text><line x1="85" y1="56" x2="115" y2="56" stroke="#6f8d76"/><text x="100" y="74" font-size="6" fill="#3f4a42" text-anchor="middle" font-style="italic">Thoughtful design for meaningful products.</text><text x="100" y="100" font-size="7" fill="#6f8d76" text-anchor="middle" letter-spacing="2">EXPERIENCE</text><text x="100" y="116" font-size="6" fill="#3f4a42" text-anchor="middle">Led product launch &amp; improved outcomes</text><text x="100" y="142" font-size="7" fill="#6f8d76" text-anchor="middle" letter-spacing="2">SKILLS</text><text x="100" y="158" font-size="6" fill="#3f4a42" text-anchor="middle" font-style="italic">Design · Strategy · Figma</text></svg>`,
  timeline: `<svg viewBox="0 0 200 260" class="template-preview"><rect width="200" height="260" fill="#fff" stroke="#e2e8f0"/><line x1="18" y1="48" x2="182" y2="48" stroke="#7c3aed" stroke-width="3"/><text x="18" y="28" font-size="13" fill="#1e293b" font-weight="700">Jane Doe</text><text x="18" y="40" font-size="7" fill="#7c3aed" font-weight="700">Product Designer</text><text x="18" y="62" font-size="6" fill="#334155">Crafting impactful digital experiences.</text><text x="18" y="84" font-size="7" fill="#7c3aed" font-weight="700" letter-spacing="1">EXPERIENCE</text><line x1="22" y1="92" x2="22" y2="150" stroke="#e9d5ff" stroke-width="2"/><circle cx="22" cy="98" r="3" fill="#7c3aed"/><text x="32" y="101" font-size="6" fill="#334155">Led product launch and growth</text><circle cx="22" cy="118" r="3" fill="#7c3aed"/><text x="32" y="121" font-size="6" fill="#334155">Built design systems at scale</text><rect x="18" y="160" width="38" height="14" rx="5" fill="#f3e8ff"/><text x="24" y="170" font-size="5" fill="#6b21a8">Figma</text></svg>`,
};

let previewTimer;
let previewRequest;

function getPayload() {
  const payload = Object.fromEntries(new FormData(resumeForm).entries());
  payload.certificates = resumeCertificates;
  return payload;
}

function renderResumeAchievements() {
  if (!resumeAchievementsPreview) return;
  if (!resumeCertificates || resumeCertificates.length === 0) {
    resumeAchievementsPreview.innerHTML = '';
    return;
  }
  resumeAchievementsPreview.innerHTML = `
    <h3>Achievements</h3>
    <div class="achievements-grid">
      ${resumeCertificates
        .map((c) =>
          c.type && c.type.startsWith('image/')
            ? `<div class="achievement"><img src="${c.dataUrl}" alt="${c.name}" /><div class="name">${c.name}</div></div>`
            : `<div class="achievement"><div class="file-icon">📄</div><div class="name">${c.name}</div></div>`
        )
        .join('')}
    </div>
  `;
}

function showPreview(html) {
  let frame = resumePreview.querySelector("iframe");
  if (!frame) {
    resumePreview.innerHTML = '<iframe class="resume-preview-frame" title="Resume preview"></iframe>';
    frame = resumePreview.querySelector("iframe");
  }
  frame.srcdoc = html;
}

async function updatePreview() {
  const payload = getPayload();

  if (previewRequest) {
    previewRequest.abort();
  }

  previewRequest = new AbortController();

  try {
    const response = await fetch("/api/resume/preview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: previewRequest.signal,
    });

    if (!response.ok) {
      throw new Error("Preview request failed");
    }

    showPreview(await response.text());
  } catch (error) {
    if (error.name !== "AbortError") {
      resumePreview.innerHTML = '<p class="preview-error">Unable to update preview.</p>';
    }
  }
}

function schedulePreviewUpdate() {
  window.clearTimeout(previewTimer);
  previewTimer = window.setTimeout(updatePreview, 180);
}

async function loadTemplates() {
  const response = await fetch("/api/resume/templates");
  const result = await response.json();
  const templates = result.templates || [];

  resumeTemplateSelect.innerHTML = templates
    .map((template) => `<option value="${template}">${template}</option>`)
    .join("");

  const container = document.getElementById("resume-templates");
  container.innerHTML = templates
    .map((template) => {
      const preview = templatePreviews[template] || templatePreviews.modern;
      return `<div class="template-card" data-template="${template}" role="button" tabindex="0" aria-label="Use ${template} resume template">
        <div class="template-preview-container">${preview}</div>
        <div class="template-name">${template}</div>
      </div>`;
    })
    .join("");

  const selected = templates[0] || "modern";
  const cards = container.querySelectorAll(".template-card");
  cards.forEach((card) => {
    if (card.dataset.template === selected) {
      card.classList.add("active");
    }

    card.addEventListener("click", () => {
      cards.forEach((currentCard) => currentCard.classList.remove("active"));
      card.classList.add("active");
      resumeTemplateSelect.value = card.dataset.template;
      updatePreview();
    });

    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        card.click();
      }
    });
  });

  resumeTemplateSelect.value = selected;
}

resumeForm.addEventListener("input", schedulePreviewUpdate);
if (resumeCertificatesInput) {
  resumeCertificatesInput.addEventListener("change", async (e) => {
    const files = Array.from(e.target.files || []);
    resumeCertificates = [];
    resumeCertificatesList.innerHTML = '';
    for (const file of files) {
      const reader = new FileReader();
      await new Promise((res) => {
        reader.onload = () => {
          const dataUrl = reader.result;
          resumeCertificates.push({ name: file.name, type: file.type, dataUrl });
          const item = document.createElement('div');
          item.className = 'certificate-item';
          if (file.type.startsWith('image/')) {
            item.innerHTML = `<img src="${dataUrl}" alt="${file.name}" /><div class="cert-name">${file.name}</div>`;
          } else {
            item.innerHTML = `<div class="cert-file">${file.name}</div>`;
          }
          resumeCertificatesList.appendChild(item);
          res();
        };
        reader.readAsDataURL(file);
      });
    }
    renderResumeAchievements();
    schedulePreviewUpdate();
  });
}
resumeForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  resumeResult.textContent = "Generating PDF...";

  try {
    const response = await fetch("/api/resume/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(getPayload()),
    });
    if (response.status === 401) {
      window.location.href = '/login.html';
      return;
    }
    const result = await response.json();
    if (result.success) {
      resumeResult.innerHTML = `<p>PDF is ready.</p><a href="${result.pdfUrl}" target="_blank" class="primary-button">Download Resume</a>`;
    } else {
      resumeResult.textContent = "Unable to generate the PDF. Try again.";
    }
  } catch (error) {
    resumeResult.textContent = "Server error while generating the PDF.";
  }
});

window.addEventListener("DOMContentLoaded", async () => {
  await loadTemplates();
  updatePreview();
  renderResumeAchievements();
});
