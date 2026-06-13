from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
TEMPLATE_DIR = BASE_DIR / "templates"
GENERATED_DIR = BASE_DIR / "generated"
PDF_DIR = GENERATED_DIR / "pdfs"
WEBSITE_DIR = GENERATED_DIR / "websites"
FRONTEND_DIR = BASE_DIR.parent / "frontend"
TEMPLATE_DIRS = {
    "resume": TEMPLATE_DIR / "resume_templates",
    "portfolio": TEMPLATE_DIR / "portfolio_templates",
}
