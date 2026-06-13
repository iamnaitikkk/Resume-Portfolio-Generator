from pathlib import Path

from jinja2 import Environment, FileSystemLoader, select_autoescape

from backend.config import TEMPLATE_DIRS

TEMPLATE_FOLDER = TEMPLATE_DIRS["portfolio"]


def list_templates():
    names = set()
    if TEMPLATE_FOLDER.exists():
        for entry in TEMPLATE_FOLDER.iterdir():
            if entry.is_dir() and (entry / "template.html").is_file():
                names.add(entry.name)
            if entry.is_file() and entry.suffix == ".html":
                names.add(entry.stem)
    return sorted(names)


def _normalize_portfolio_data(data):
    skills = [skill.strip() for skill in data.get("skills", "").split(",") if skill.strip()]
    projects = data.get("projects") or []
    if isinstance(projects, str):
        projects = []
    return {
        "name": data.get("name", "Your Name"),
        "role": data.get("role", "Your Role"),
        "email": data.get("email", "email@example.com"),
        "phone": data.get("phone", "(555) 123-4567"),
        "website": data.get("website", "https://example.com"),
        "about": data.get("about", "Write a short introduction about yourself."),
        "skills": skills,
        "projects": [
            {
                "name": item.get("name", "Project Name"),
                "description": item.get("description", "A short overview of this project."),
                "link": item.get("link", "#"),
            }
            for item in projects
            if isinstance(item, dict) and item.get("name")
        ],
    }


def render_portfolio(template_name, data):
    # Prefer folder-based template {name}/template.html, fall back to {name}.html
    template_folder = TEMPLATE_FOLDER / template_name
    if (template_folder / "template.html").is_file():
        env = Environment(
            loader=FileSystemLoader(str(template_folder)),
            autoescape=select_autoescape(["html", "xml"]),
        )
        template = env.get_template("template.html")
        return template.render(**_normalize_portfolio_data(data))

    single_file = TEMPLATE_FOLDER / f"{template_name}.html"
    if single_file.is_file():
        env = Environment(
            loader=FileSystemLoader(str(TEMPLATE_FOLDER)),
            autoescape=select_autoescape(["html", "xml"]),
        )
        template = env.get_template(f"{template_name}.html")
        return template.render(**_normalize_portfolio_data(data))

    # fallback to developer
    fallback = "developer"
    fallback_folder = TEMPLATE_FOLDER / fallback
    if (fallback_folder / "template.html").is_file():
        env = Environment(
            loader=FileSystemLoader(str(fallback_folder)),
            autoescape=select_autoescape(["html", "xml"]),
        )
        template = env.get_template("template.html")
        return template.render(**_normalize_portfolio_data(data))

    fallback_file = TEMPLATE_FOLDER / f"{fallback}.html"
    if fallback_file.is_file():
        env = Environment(
            loader=FileSystemLoader(str(TEMPLATE_FOLDER)),
            autoescape=select_autoescape(["html", "xml"]),
        )
        template = env.get_template(f"{fallback}.html")
        return template.render(**_normalize_portfolio_data(data))

    raise FileNotFoundError("No portfolio templates available to render.")
