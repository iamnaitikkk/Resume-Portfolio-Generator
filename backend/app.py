from pathlib import Path

from flask import Flask, send_from_directory

from backend.routes.resume_routes import resume_bp
from backend.routes.portfolio_routes import portfolio_bp

BASE_DIR = Path(__file__).resolve().parent
FRONTEND_DIR = BASE_DIR.parent / "frontend"

app = Flask(__name__, static_folder=None)
app.register_blueprint(resume_bp, url_prefix="/api/resume")
app.register_blueprint(portfolio_bp, url_prefix="/api/portfolio")

@app.route("/")
def index():
    return send_from_directory(FRONTEND_DIR, "index.html")

@app.route("/resume-builder.html")
def resume_builder_page():
    return send_from_directory(FRONTEND_DIR / "pages", "resume-builder.html")

@app.route("/portfolio-builder.html")
def portfolio_builder_page():
    return send_from_directory(FRONTEND_DIR / "pages", "portfolio-builder.html")

@app.route("/assets/<path:filename>")
def assets(filename):
    return send_from_directory(FRONTEND_DIR / "assets", filename)

@app.route("/components/<path:filename>")
def components(filename):
    return send_from_directory(FRONTEND_DIR / "components", filename)

@app.route("/generated/<path:filename>")
def generated(filename):
    return send_from_directory(BASE_DIR / "generated", filename)

if __name__ == '__main__':
    app.run(debug=True)
