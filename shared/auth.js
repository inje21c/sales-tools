(function () {
  window.SalesTools = window.SalesTools || {};

  var _onLogin = null;
  var _onLogout = null;

  function showLogin() {
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('appScreen').style.display = 'none';
    document.getElementById('loginPassword').value = '';
    if (_onLogout) _onLogout();
  }

  async function checkSession() {
    var sb = window.SalesTools.supabase;
    var result = await sb.auth.getSession();
    if (result.data.session) {
      var s = result.data.session;
      document.getElementById('loginScreen').style.display = 'none';
      document.getElementById('appScreen').style.display = 'block';
      var emailEl = document.getElementById('accountEmail');
      if (emailEl) emailEl.textContent = s.user.email;
      if (_onLogin) await _onLogin(s.user.email, s.user.id);
    } else {
      showLogin();
    }
  }

  async function handleLogin() {
    var sb = window.SalesTools.supabase;
    var email = document.getElementById('loginEmail').value.trim();
    var password = document.getElementById('loginPassword').value;
    var statusEl = document.getElementById('loginStatus');
    var btn = document.getElementById('loginBtn');

    statusEl.textContent = '';
    statusEl.className = 'login-status';

    if (!email || !password) {
      statusEl.textContent = '이메일과 비밀번호를 입력해주세요.';
      statusEl.className = 'login-status error';
      return;
    }

    btn.disabled = true;
    btn.textContent = '로그인 중...';

    var result = await sb.auth.signInWithPassword({ email: email, password: password });

    btn.disabled = false;
    btn.textContent = '로그인';

    if (result.error) {
      statusEl.textContent = '로그인 실패: 이메일 또는 비밀번호를 확인해주세요.';
      statusEl.className = 'login-status error';
      return;
    }

    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('appScreen').style.display = 'block';
    var emailEl = document.getElementById('accountEmail');
    if (emailEl) emailEl.textContent = result.data.user.email;
    if (_onLogin) await _onLogin(result.data.user.email, result.data.user.id);
  }

  async function handleLogout() {
    var sb = window.SalesTools.supabase;
    await sb.auth.signOut();
    showLogin();
  }

  window.handleLogin = handleLogin;
  window.handleLogout = handleLogout;

  window.SalesTools.auth = {
    init: function (callbacks) {
      _onLogin = callbacks.onLogin || null;
      _onLogout = callbacks.onLogout || null;

      var pwInput = document.getElementById('loginPassword');
      if (pwInput) {
        pwInput.addEventListener('keydown', function (e) {
          if (e.key === 'Enter') handleLogin();
        });
      }

      checkSession();
    }
  };
}());
