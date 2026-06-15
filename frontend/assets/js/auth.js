// Simple auth handlers for login/signup
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');

  function getRedirectTarget() {
    const params = new URLSearchParams(window.location.search);
    const next = params.get('next');
    if (next && next.startsWith('/')) return next;
    return '/resume-builder.html';
  }

  async function postJson(url, body) {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify(body),
    });
    return { status: res.status, body: await res.json().catch(() => ({})) };
  }

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
      const { status, body } = await postJson('/api/auth/login', { email, password });
      if (status === 200 && body.success) {
        window.location.href = getRedirectTarget();
      } else {
        alert(body.error || 'Login failed');
      }
    });
  }

  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('signup-email').value;
      const password = document.getElementById('signup-password').value;
      const { status, body } = await postJson('/api/auth/signup', { email, password });
      if (status === 200 && body.success) {
        window.location.href = getRedirectTarget();
      } else {
        alert(body.error || 'Signup failed');
      }
    });
  }
});
