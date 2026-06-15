import uuid

from flask import Blueprint, request, jsonify, session, Response

from backend.config import WEBSITE_DIR
from backend.services.portfolio_generator import list_templates as list_portfolio_templates, render_portfolio

portfolio_bp = Blueprint("portfolio_bp", __name__)

@portfolio_bp.route("/templates", methods=["GET"])
def templates():
    return jsonify({"templates": list_portfolio_templates()})


@portfolio_bp.route("/preview", methods=["POST"])
def preview_portfolio():
    data = request.get_json() or {}
    template = data.get("template", "developer")
    html = render_portfolio(template, data)
    return Response(html, mimetype="text/html")


@portfolio_bp.route("/generate", methods=["POST"])
def generate_portfolio():
    if not session.get("user"):
        return jsonify({"success": False, "error": "Authentication required"}), 401

    data = request.get_json() or {}
    template = data.get("template", "developer")
    available = list_portfolio_templates()
    warning = None
    if template not in available:
        warning = f"Template '{template}' not found. Using fallback 'developer'."

    html = render_portfolio(template, data)
    WEBSITE_DIR.mkdir(parents=True, exist_ok=True)
    filename = f"portfolio_{uuid.uuid4().hex[:8]}.html"
    output_file = WEBSITE_DIR / filename
    output_file.write_text(html, encoding="utf-8")
    resp = {
        "success": True,
        "siteUrl": f"/generated/websites/{output_file.name}",
        "filename": output_file.name,
    }
    if warning:
        resp["warning"] = warning
    return jsonify(resp)
