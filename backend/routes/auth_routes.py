import json
from pathlib import Path

from flask import Blueprint, request, jsonify, session
from werkzeug.security import generate_password_hash, check_password_hash

from backend.config import BASE_DIR

auth_bp = Blueprint("auth_bp", __name__)

USERS_FILE = BASE_DIR / "users.json"

def load_users():
    if not USERS_FILE.exists():
        return {}
    try:
        return json.loads(USERS_FILE.read_text(encoding="utf-8"))
    except Exception:
        return {}

def save_users(users):
    USERS_FILE.write_text(json.dumps(users, indent=2), encoding="utf-8")


@auth_bp.route("/signup", methods=["POST"])
def signup():
    data = request.get_json() or {}
    email = (data.get("email") or "").strip().lower()
    password = data.get("password") or ""
    if not email or not password:
        return jsonify({"success": False, "error": "Email and password required"}), 400

    users = load_users()
    if email in users:
        return jsonify({"success": False, "error": "User already exists"}), 409

    users[email] = {"password": generate_password_hash(password)}
    save_users(users)
    session["user"] = email
    return jsonify({"success": True, "email": email})


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    email = (data.get("email") or "").strip().lower()
    password = data.get("password") or ""
    users = load_users()
    user = users.get(email)
    if not user or not check_password_hash(user.get("password", ""), password):
        return jsonify({"success": False, "error": "Invalid credentials"}), 401

    session["user"] = email
    return jsonify({"success": True, "email": email})


@auth_bp.route("/me", methods=["GET"])
def me():
    user = session.get("user")
    if not user:
        return jsonify({"authenticated": False}), 200
    return jsonify({"authenticated": True, "email": user}), 200


@auth_bp.route("/logout", methods=["POST"])
def logout():
    session.pop("user", None)
    return jsonify({"success": True}), 200
