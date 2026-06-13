const resumeForm = document.getElementById("resume-form");
const resumePreview = document.getElementById("resume-preview");
const resumeResult = document.getElementById("resume-result");
const resumeTemplateSelect = document.getElementById("resume-template");

const templatePreviews = {
  modern: `<svg viewBox="0 0 200 260" class="template-preview"><rect width="200" height="260" rx="2" fill="#fff" stroke="#dbe4ef"/><line x1="18" y1="63" x2="182" y2="63" stroke="#1f6feb" stroke-width="3"/><text x="18" y="28" font-size="8" fill="#1f6feb" font-weight="700">RESUME</text><text x="18" y="47" font-size="15" fill="#111827" font-weight="700">Jane Doe</text><text x="18" y="57" font-size="7" fill="#405168">Product Designer</text><text x="18" y="88" font-size="7" fill="#334155">Profile summary with measurable impact.</text><text x="18" y="119" font-size="7" fill="#1f6feb" font-weight="700">EXPERIENCE</text><rect x="125" y="112" width="44" height="12" fill="#edf5ff"/><rect x="125" y="130" width="36" height="12" fill="#edf5ff"/><text x="18" y="135" font-size="6" fill="#333">Led product launch and improved conversion.</text><text x="125" y="105" font-size="7" fill="#1f6feb" font-weight="700">SKILLS</text><text x="18" y="156" font-size="6" fill="#333">Built design systems for web and mobile.</text></svg>`,
  professional: `<svg viewBox="0 0 200 260" class="template-preview"><rect width="200" height="260" rx="2" fill="#fff" stroke="#d8dee8"/><rect width="62" height="260" fill="#172033"/><text x="15" y="30" font-size="10" fill="#fff" font-weight="700">Jane</text><text x="15" y="43" font-size="10" fill="#fff" font-weight="700">Doe</text><text x="15" y="57" font-size="5" fill="#cbd5e1">PRODUCT DESIGNER</text><text x="15" y="88" font-size="6" fill="#93c5fd" font-weight="700">CONTACT</text><text x="15" y="122" font-size="6" fill="#93c5fd" font-weight="700">SKILLS</text><text x="76" y="35" font-size="7" fill="#172033" font-weight="700">PROFILE</text><line x1="76" y1="41" x2="184" y2="41" stroke="#cbd5e1"/><text x="76" y="59" font-size="6" fill="#334155">Professional summary and impact.</text><text x="76" y="91" font-size="7" fill="#172033" font-weight="700">EXPERIENCE</text><line x1="76" y1="97" x2="184" y2="97" stroke="#cbd5e1"/><text x="76" y="115" font-size="6" fill="#333">Led design operations and delivery.</text></svg>`,
  minimal: `<svg viewBox="0 0 200 260" class="template-preview"><rect width="200" height="260" rx="2" fill="#fff" stroke="#e1e6ed"/><text x="18" y="32" font-size="14" fill="#202733" font-weight="700">Jane Doe</text><text x="18" y="46" font-size="7" fill="#536172">Product Designer</text><line x1="18" y1="61" x2="182" y2="61" stroke="#aeb8c5"/><text x="18" y="84" font-size="6" fill="#202733" font-weight="700">SUMMARY</text><text x="72" y="84" font-size="6" fill="#364456">Clear profile with measurable impact.</text><line x1="18" y1="104" x2="182" y2="104" stroke="#e1e6ed"/><text x="18" y="128" font-size="6" fill="#202733" font-weight="700">EXPERIENCE</text><text x="72" y="128" font-size="6" fill="#364456">Led launches and improved outcomes.</text><line x1="18" y1="150" x2="182" y2="150" stroke="#e1e6ed"/><text x="18" y="174" font-size="6" fill="#202733" font-weight="700">SKILLS</text><text x="72" y="174" font-size="6" fill="#364456">Design  Strategy  Figma</text></svg>`,
};

let previewTimer;
let previewRequest;

function getPayload() {
  return Object.fromEntries(new FormData(resumeForm).entries());
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
resumeForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  resumeResult.textContent = "Generating PDF...";

  try {
    const response = await fetch("/api/resume/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(getPayload()),
    });
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
});
