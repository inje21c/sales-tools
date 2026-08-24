(function () {
  var cfg = window.APP_CONFIG || {};
  if (!cfg.supabaseUrl || !cfg.supabaseAnonKey || cfg.supabaseUrl === 'YOUR_SUPABASE_URL') {
    document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;color:#ff6b6b;font-family:sans-serif;font-size:15px;">config.js 파일이 없거나 설정되지 않았습니다. config.example.js를 복사하여 config.js를 만들고 Supabase 정보를 입력해주세요.</div>';
    throw new Error('config.js not configured');
  }
  window.SalesTools = window.SalesTools || {};
  window.SalesTools.supabase = supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey);
}());
