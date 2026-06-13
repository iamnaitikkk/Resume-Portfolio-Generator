from pathlib import Path
from uuid import uuid4

from backend.config import PDF_DIR

PDF_DIR.mkdir(parents=True, exist_ok=True)

try:
    from weasyprint import HTML
    _PDF_ENGINE = "weasyprint"
except Exception:
    _PDF_ENGINE = "fallback"


def save_pdf(html_content, filename=None):
    filename = filename or f"resume_{uuid4().hex[:8]}.pdf"
    output_path = PDF_DIR / filename

    if _PDF_ENGINE == "weasyprint":
        HTML(string=html_content).write_pdf(str(output_path))
        return output_path

    try:
        from xhtml2pdf import pisa
    except ImportError as error:
        raise RuntimeError(
            "PDF generation requires WeasyPrint or xhtml2pdf. "
            "Install the dependency and ensure system libraries are available."
        ) from error

    with output_path.open("wb") as file_handle:
        pisa_status = pisa.CreatePDF(html_content, dest=file_handle)
        if pisa_status.err:
            raise RuntimeError("PDF generation failed using xhtml2pdf.")

    return output_path
