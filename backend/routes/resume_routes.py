from pathlib import Path

from flask import Blueprint, request, jsonify, Response

from backend.config import PDF_DIR
from backend.services.resume_generator import list_templates as list_resume_templates, render_resume
from backend.services.pdf_exporter import save_pdf

resume_bp = Blueprint("resume_bp", __name__)

@resume_bp.route("/templates", methods=["GET"])
def templates():
    return jsonify({"templates": list_resume_templates()})


@resume_bp.route("/preview", methods=["POST"])
def preview_resume():
    data = request.get_json() or {}
    template = data.get("template", "modern")
    html = render_resume(template, data)
    return Response(html, mimetype="text/html")


@resume_bp.route("/generate", methods=["POST"])
def generate_resume():
    data = request.get_json() or {}
    template = data.get("template", "modern")
    available = list_resume_templates()
    warning = None
    if template not in available:
        warning = f"Template '{template}' not found. Using fallback 'modern'."

    html = render_resume(template, data)
    output_path = save_pdf(html)
    resp = {
        "success": True,
        "pdfUrl": f"/generated/pdfs/{output_path.name}",
        "filename": output_path.name,
    }
    if warning:
        resp["warning"] = warning
    return jsonify(resp)
