from pathlib import Path

from jinja2 import Environment, FileSystemLoader, select_autoescape

from backend.config import TEMPLATE_DIRS

TEMPLATE_FOLDER = TEMPLATE_DIRS["resume"]


def list_templates():
    names = set()
    if TEMPLATE_FOLDER.exists():
        for entry in TEMPLATE_FOLDER.iterdir():
            if entry.is_dir() and (entry / "template.html").is_file():
                names.add(entry.name)
            if entry.is_file() and entry.suffix == ".html":
                names.add(entry.stem)
    return sorted(names)


def _split_items(value, separator=None):
    if isinstance(value, list):
        return [str(item).strip() for item in value if str(item).strip()]
    if not value:
        return []
    if separator:
        raw_items = str(value).split(separator)
    else:
        raw_items = str(value).splitlines()
    return [item.strip() for item in raw_items if item.strip()]


def _normalize_resume_data(data):
    skills = _split_items(data.get("skills"), ",")
    experience = _split_items(data.get("experience"))
    education = _split_items(data.get("education"))

    return {
        "name": (data.get("name") or "Your Name").strip(),
        "title": (data.get("title") or "Target Role").strip(),
        "email": (data.get("email") or "email@example.com").strip(),
        "phone": (data.get("phone") or "(555) 123-4567").strip(),
        "location": (data.get("location") or "City, Country").strip(),
        "summary": (
            data.get("summary")
            or "A focused professional summary that highlights your strongest experience, measurable impact, and the kind of role you are pursuing."
        ).strip(),
        "skills": skills or ["Leadership", "Communication", "Problem Solving"],
        "experience": experience
        or [
            "Describe a recent role, the scope of your work, and a measurable result you created.",
            "Use action verbs and numbers wherever possible to make each achievement credible.",
        ],
        "education": education or ["Degree or Certification - Institution Name"],
    }


def render_resume(template_name, data):
    # Prefer folder-based template {name}/template.html, fall back to {name}.html
    template_folder = TEMPLATE_FOLDER / template_name
    if (template_folder / "template.html").is_file():
        env = Environment(
            loader=FileSystemLoader(str(template_folder)),
            autoescape=select_autoescape(["html", "xml"]),
        )
        template = env.get_template("template.html")
        return template.render(**_normalize_resume_data(data))

    # fall back to single-file template
    single_file = TEMPLATE_FOLDER / f"{template_name}.html"
    if single_file.is_file():
        env = Environment(
            loader=FileSystemLoader(str(TEMPLATE_FOLDER)),
            autoescape=select_autoescape(["html", "xml"]),
        )
        template = env.get_template(f"{template_name}.html")
        return template.render(**_normalize_resume_data(data))

    # fallback to modern
    fallback = "modern"
    fallback_folder = TEMPLATE_FOLDER / fallback
    if (fallback_folder / "template.html").is_file():
        env = Environment(
            loader=FileSystemLoader(str(fallback_folder)),
            autoescape=select_autoescape(["html", "xml"]),
        )
        template = env.get_template("template.html")
        return template.render(**_normalize_resume_data(data))

    # final fallback: modern.html file
    fallback_file = TEMPLATE_FOLDER / f"{fallback}.html"
    if fallback_file.is_file():
        env = Environment(
            loader=FileSystemLoader(str(TEMPLATE_FOLDER)),
            autoescape=select_autoescape(["html", "xml"]),
        )
        template = env.get_template(f"{fallback}.html")
        return template.render(**_normalize_resume_data(data))

    raise FileNotFoundError("No resume templates available to render.")
