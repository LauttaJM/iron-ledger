export const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');
* { box-sizing:border-box; margin:0; padding:0; }
.il-root {
  --bg:#0a0d15; --bg-2:#0e121d; --surface:rgba(22,27,40,0.7); --surface-solid:#161b28; --surface-2:rgba(30,36,52,0.6);
  --line:rgba(255,255,255,0.07); --line-2:rgba(255,255,255,0.13); --txt:#eef1f7; --txt-dim:#888fa3;
  --navy:#172038; --accent:#c0263e; --accent-lite:#d8324c; --accent-dk:#8e1a2c;
  --green:#3ad29f; --amber:#f1b24a; --red:#ff5a6a;
  --font-disp:'Sora',sans-serif; --font-body:'Inter',sans-serif;
  font-family:var(--font-body); background:var(--bg); color:var(--txt); min-height:100vh; width:100%; -webkit-font-smoothing:antialiased;
}
.il-root::selection { background:var(--accent); color:#fff; }
.il-bg-grad { position:fixed; inset:0; pointer-events:none; z-index:0; background:
  radial-gradient(1100px 700px at 80% -15%, rgba(192,38,62,0.13), transparent 56%),
  radial-gradient(900px 600px at -8% 108%, rgba(23,33,60,0.5), transparent 60%),
  linear-gradient(180deg,#0a0d15,#080b12); }
.il-shell { position:relative; z-index:1; }
.il-center { min-height:100vh; display:grid; place-items:center; padding:24px; }

/* LOGIN */
.il-login-card { width:100%; max-width:410px; position:relative; border-radius:24px; padding:40px 34px 32px;
  background:linear-gradient(160deg, rgba(36,42,60,0.6), rgba(16,20,30,0.6)); border:1px solid var(--line-2);
  backdrop-filter:blur(22px); box-shadow:0 30px 80px rgba(0,0,0,0.55); animation:rise .5s cubic-bezier(.2,.8,.2,1); overflow:hidden; }
.il-login-card::before { content:""; position:absolute; top:-35%; left:-5%; width:65%; height:75%; border-radius:50%;
  background:radial-gradient(circle, rgba(216,50,76,0.3), transparent 70%); filter:blur(34px); pointer-events:none; }
@keyframes rise { from{opacity:0; transform:translateY(16px)} to{opacity:1; transform:translateY(0)} }
.il-login-logo { display:flex; justify-content:center; margin-bottom:8px; position:relative; }
.il-login-logo img { width:108px; height:108px; object-fit:contain; border-radius:24px; filter:drop-shadow(0 10px 26px rgba(0,0,0,0.55)); }
.il-login-welcome { font-family:var(--font-disp); font-weight:700; font-size:25px; text-align:center; }
.il-login-sub { text-align:center; color:var(--txt-dim); font-size:13.5px; margin-top:3px; margin-bottom:24px; }
.il-field { margin-bottom:15px; }
.il-field label { display:block; font-size:11.5px; color:var(--txt-dim); margin-bottom:7px; font-weight:600; }
.il-input, .il-select { width:100%; background:rgba(10,13,21,0.6); border:1px solid var(--line-2); color:var(--txt); padding:13px 15px; border-radius:13px; font-size:15px; font-family:var(--font-body); font-weight:500; transition:border-color .18s, box-shadow .18s, background .18s; }
.il-input:focus, .il-select:focus { outline:none; border-color:var(--accent-lite); box-shadow:0 0 0 3px rgba(216,50,76,0.16); background:rgba(10,13,21,0.85); }
.il-input::placeholder { color:#5b6175; }
.il-input.err, .il-select.err { border-color:var(--red); box-shadow:0 0 0 3px rgba(255,90,106,0.14); }
.il-err-msg { color:var(--red); font-size:12px; margin-top:6px; font-weight:500; }
.il-btn { background:linear-gradient(135deg, var(--accent-lite), var(--accent-dk)); color:#fff; border:none; padding:13px 20px; border-radius:13px; font-family:var(--font-body); font-weight:700; font-size:14.5px; cursor:pointer; transition:transform .12s, box-shadow .18s, filter .18s; width:100%; box-shadow:0 8px 22px rgba(192,38,62,0.35); }
.il-btn:hover { filter:brightness(1.08); box-shadow:0 10px 28px rgba(192,38,62,0.45); transform:translateY(-1px); }
.il-btn:active { transform:translateY(0); }
.il-btn:disabled { opacity:.5; cursor:not-allowed; filter:none; box-shadow:none; }
.il-btn.sec { background:rgba(255,255,255,0.06); color:var(--txt); border:1px solid var(--line-2); box-shadow:none; }
.il-btn.sec:hover { background:rgba(255,255,255,0.1); transform:translateY(-1px); }
.il-btn.sm { width:auto; padding:9px 16px; font-size:13px; }
.il-btn.xs { width:auto; padding:5px 11px; font-size:12px; border-radius:9px; box-shadow:none; }
.il-btn.ghost { background:transparent; color:var(--txt-dim); border:1px solid var(--line-2); box-shadow:none; }
.il-btn.ghost:hover { color:var(--txt); background:rgba(255,255,255,0.04); transform:none; }
.il-btn.danger { background:transparent; color:var(--red); border:1px solid rgba(255,90,106,0.4); box-shadow:none; }
.il-btn.danger:hover { background:rgba(255,90,106,0.1); transform:none; }

/* LAYOUT con SIDEBAR */
.il-app { display:flex; min-height:100vh; }
.il-sidebar { width:230px; flex:none; border-right:1px solid var(--line); background:rgba(12,15,24,0.75); backdrop-filter:blur(14px); padding:22px 16px; display:flex; flex-direction:column; position:sticky; top:0; height:100vh; }
.il-sb-logo { display:flex; align-items:center; gap:11px; padding:4px 6px 22px; }
.il-sb-logo img { width:42px; height:42px; object-fit:contain; border-radius:11px; }
.il-sb-logo .txt { font-family:var(--font-disp); font-weight:800; font-size:18px; }
.il-sb-logo .txt b { color:var(--accent-lite); }
.il-sb-nav { display:flex; flex-direction:column; gap:4px; flex:1; }
.il-sb-nav button { display:flex; align-items:center; gap:12px; background:transparent; border:none; color:var(--txt-dim); font-family:var(--font-body); font-weight:600; font-size:14.5px; padding:11px 13px; border-radius:12px; cursor:pointer; transition:color .15s, background .15s; text-align:left; }
.il-sb-nav button:hover { color:var(--txt); background:rgba(255,255,255,0.04); }
.il-sb-nav button.active { color:#fff; background:linear-gradient(135deg, var(--accent), var(--accent-dk)); box-shadow:0 6px 18px rgba(192,38,62,0.4); }
.il-sb-ico { width:20px; text-align:center; font-size:16px; }
.il-sb-foot { border-top:1px solid var(--line); padding-top:14px; margin-top:10px; }
.il-sb-user { display:flex; align-items:center; gap:11px; cursor:pointer; padding:9px; border-radius:12px; transition:background .15s; }
.il-sb-user:hover { background:rgba(255,255,255,0.05); }
.il-sb-user .nm { font-weight:700; font-size:14px; }
.il-content { flex:1; min-width:0; }

/* TOPBAR MOBILE */
.il-mobile-bar { display:none; }

.il-avatar { width:36px; height:36px; border-radius:50%; background:#141b30; border:2px solid var(--accent); display:grid; place-items:center; font-weight:700; font-size:14px; color:#fff; overflow:hidden; flex:none; }
.il-avatar img { width:100%; height:100%; object-fit:cover; }
.il-role-tag { font-size:10px; text-transform:uppercase; letter-spacing:0.8px; color:var(--accent-lite); font-weight:700; }

/* MENU perfil */
.il-menu { position:absolute; bottom:74px; left:14px; width:204px; background:var(--surface-solid); border:1px solid var(--line-2); border-radius:15px; padding:7px; z-index:50; box-shadow:0 24px 60px rgba(0,0,0,0.55); animation:menuIn .16s ease; }
@keyframes menuIn { from{opacity:0; transform:translateY(6px) scale(.98)} to{opacity:1; transform:translateY(0) scale(1)} }
.il-menu-item { display:flex; align-items:center; gap:11px; width:100%; background:transparent; border:none; color:var(--txt); padding:10px 11px; border-radius:10px; cursor:pointer; font-size:14px; font-family:var(--font-body); font-weight:500; text-align:left; transition:background .13s; }
.il-menu-item:hover { background:rgba(255,255,255,0.06); }
.il-menu-item.danger { color:var(--red); }
.il-menu-sep { height:1px; background:var(--line); margin:5px 4px; }
.il-menu-ico { width:18px; text-align:center; opacity:.85; }

.il-main { padding:30px 32px 60px; max-width:1080px; margin:0 auto; animation:fadeUp .35s ease; }
@keyframes fadeUp { from{opacity:0; transform:translateY(8px)} to{opacity:1; transform:translateY(0)} }
.il-page-title { font-family:var(--font-disp); font-weight:800; font-size:30px; letter-spacing:-0.5px; margin-bottom:4px; }
.il-page-sub { color:var(--txt-dim); font-size:14px; margin-bottom:26px; }
.il-stats { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-bottom:30px; }
.il-stat { background:var(--surface); border:1px solid var(--line); border-radius:18px; padding:20px; position:relative; overflow:hidden; backdrop-filter:blur(10px); transition:transform .18s, border-color .18s; }
.il-stat:hover { transform:translateY(-3px); border-color:var(--line-2); }
.il-stat .num { font-family:var(--font-disp); font-weight:800; font-size:38px; line-height:1; }
.il-stat .lbl { color:var(--txt-dim); font-size:12.5px; margin-top:8px; font-weight:500; }
.il-stat .bar { position:absolute; left:0; top:0; bottom:0; width:4px; }
.il-stat.s-total .bar { background:var(--accent-lite); }
.il-stat.s-dia .bar { background:var(--green); }
.il-stat.s-venc .bar { background:var(--red); }
.il-stat.s-pv .bar { background:var(--amber); }
.il-section-h { font-family:var(--font-disp); font-weight:700; font-size:18px; margin:8px 0 14px; }
.il-toolbar { display:flex; gap:10px; flex-wrap:wrap; margin-bottom:18px; align-items:center; }
.il-search { flex:1; min-width:200px; }
.il-filters { display:flex; gap:6px; flex-wrap:wrap; }
.il-chip { background:var(--surface-2); border:1px solid var(--line); color:var(--txt-dim); padding:9px 14px; border-radius:999px; font-size:12.5px; font-weight:600; cursor:pointer; transition:all .15s; font-family:var(--font-body); }
.il-chip:hover { color:var(--txt); border-color:var(--line-2); }
.il-chip.on { background:#fff; color:#0a0d15; border-color:#fff; }
.il-card-list { display:flex; flex-direction:column; gap:8px; }
.il-row { display:flex; align-items:center; gap:14px; background:var(--surface); border:1px solid var(--line); border-radius:15px; padding:14px 16px; cursor:pointer; transition:border-color .15s, transform .12s, background .15s; backdrop-filter:blur(8px); }
.il-row:hover { border-color:var(--line-2); transform:translateX(3px); background:rgba(30,36,52,0.7); }
.il-dot { width:9px; height:9px; border-radius:50%; flex:none; }
.il-dot.alDia { background:var(--green); box-shadow:0 0 10px rgba(58,210,159,0.6); }
.il-dot.porVencer { background:var(--amber); box-shadow:0 0 10px rgba(241,178,74,0.6); }
.il-dot.vencido { background:var(--red); box-shadow:0 0 10px rgba(255,90,106,0.6); }
.il-row-main { flex:1; min-width:0; }
.il-row-name { font-weight:700; font-size:15.5px; }
.il-row-meta { color:var(--txt-dim); font-size:12.5px; margin-top:2px; }
.il-row-right { text-align:right; flex:none; }
.il-badge { display:inline-block; font-size:10.5px; font-weight:700; padding:4px 10px; border-radius:999px; text-transform:uppercase; letter-spacing:0.4px; }
.il-badge.alDia { background:rgba(58,210,159,0.14); color:var(--green); }
.il-badge.porVencer { background:rgba(241,178,74,0.15); color:var(--amber); }
.il-badge.vencido { background:rgba(255,90,106,0.14); color:var(--red); }
.il-row-venc { font-size:12px; color:var(--txt-dim); margin-top:5px; }
.il-empty { text-align:center; color:var(--txt-dim); padding:50px 20px; font-size:14px; }
.il-overlay { position:fixed; inset:0; background:rgba(5,7,12,0.66); backdrop-filter:blur(6px); z-index:80; display:grid; place-items:center; padding:20px; animation:fade .2s ease; }
@keyframes fade { from{opacity:0} to{opacity:1} }
.il-modal { width:100%; max-width:560px; max-height:90vh; overflow:auto; background:var(--surface-solid); border:1px solid var(--line-2); border-radius:22px; padding:28px; animation:pop .22s cubic-bezier(.2,.8,.2,1); box-shadow:0 30px 80px rgba(0,0,0,0.6); }
@keyframes pop { from{transform:scale(.95) translateY(8px); opacity:0} to{transform:scale(1) translateY(0); opacity:1} }
.il-modal-head { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:20px; }
.il-modal-title { font-family:var(--font-disp); font-weight:800; font-size:23px; letter-spacing:-0.3px; }
.il-close { background:rgba(255,255,255,0.05); border:1px solid var(--line); color:var(--txt-dim); width:34px; height:34px; border-radius:11px; cursor:pointer; font-size:18px; line-height:1; transition:background .15s; }
.il-close:hover { color:var(--txt); background:rgba(255,255,255,0.1); }
.il-info-grid { display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:22px; }
.il-info-item .k { font-size:10.5px; text-transform:uppercase; letter-spacing:0.5px; color:var(--txt-dim); margin-bottom:3px; font-weight:600; }
.il-info-item .v { font-size:15px; font-weight:600; }
.il-pay-box { background:rgba(10,13,21,0.5); border:1px solid var(--line); border-radius:15px; padding:18px; margin-bottom:22px; }
.il-pay-box h4 { font-size:12px; text-transform:uppercase; letter-spacing:0.5px; color:var(--accent-lite); margin-bottom:14px; font-weight:700; }
.il-pay-methods { display:flex; gap:8px; margin-bottom:14px; }
.il-method { flex:1; background:rgba(255,255,255,0.03); border:1px solid var(--line); color:var(--txt); padding:11px; border-radius:11px; cursor:pointer; font-weight:600; font-size:14px; font-family:var(--font-body); transition:all .15s; }
.il-method.on { border-color:var(--accent-lite); background:rgba(216,50,76,0.12); color:var(--accent-lite); }
.il-aldia-note { background:rgba(58,210,159,0.08); border:1px solid rgba(58,210,159,0.28); color:var(--green); border-radius:13px; padding:13px 16px; font-size:13.5px; line-height:1.5; }
.il-confirm { background:rgba(241,178,74,0.08); border:1px solid rgba(241,178,74,0.3); border-radius:13px; padding:13px 16px; font-size:13px; color:var(--amber); margin-bottom:12px; line-height:1.5; }
.il-danger-confirm { background:rgba(255,90,106,0.08); border:1px solid rgba(255,90,106,0.3); border-radius:13px; padding:13px 16px; font-size:13px; color:var(--red); margin-bottom:12px; line-height:1.5; }
.il-hist h4 { font-size:12px; text-transform:uppercase; letter-spacing:0.5px; color:var(--txt-dim); margin-bottom:12px; font-weight:700; }
.il-hist-row { display:flex; justify-content:space-between; align-items:center; padding:11px 0; border-bottom:1px solid var(--line); gap:10px; }
.il-hist-row:last-child { border-bottom:none; }
.il-hist-left .d { font-weight:600; font-size:14px; }
.il-hist-left .m { font-size:12px; color:var(--txt-dim); margin-top:2px; }
.il-hist-amt { font-family:var(--font-disp); font-weight:700; white-space:nowrap; }
.il-tag-met { font-size:10px; padding:2px 7px; border-radius:6px; background:rgba(255,255,255,0.06); color:var(--txt-dim); margin-left:8px; }
.il-plan-card { display:flex; justify-content:space-between; align-items:center; background:var(--surface); border:1px solid var(--line); border-radius:16px; padding:18px 20px; margin-bottom:10px; gap:14px; backdrop-filter:blur(8px); transition:border-color .15s; }
.il-plan-card:hover { border-color:var(--line-2); }
.il-plan-name { font-family:var(--font-disp); font-weight:700; font-size:18px; }
.il-plan-price { font-family:var(--font-disp); font-weight:800; font-size:24px; color:var(--accent-lite); }
.il-banner { background:rgba(192,38,62,0.08); border:1px solid rgba(192,38,62,0.28); border-radius:13px; padding:13px 16px; font-size:13px; color:#e7b3bc; margin-bottom:22px; line-height:1.5; }
.il-banner b { color:#fff; }
.il-team-row { display:flex; align-items:center; gap:14px; background:var(--surface); border:1px solid var(--line); border-radius:16px; padding:14px 16px; margin-bottom:10px; flex-wrap:wrap; backdrop-filter:blur(8px); }
.il-team-av { width:46px; height:46px; border-radius:50%; background:#141b30; border:2px solid var(--accent); display:grid; place-items:center; font-weight:700; color:#fff; overflow:hidden; flex:none; }
.il-team-av img { width:100%; height:100%; object-fit:cover; }
.il-photo-pick { display:flex; align-items:center; gap:14px; margin-bottom:16px; }
.il-photo-pick .il-team-av { width:64px; height:64px; cursor:pointer; }
.il-rol-pills { display:flex; gap:8px; }
.il-rol-pill { background:rgba(255,255,255,0.03); border:1px solid var(--line); color:var(--txt-dim); padding:6px 13px; border-radius:999px; font-size:12.5px; font-weight:600; cursor:pointer; transition:all .15s; }
.il-rol-pill.on { border-color:var(--accent-lite); color:var(--accent-lite); background:rgba(216,50,76,0.12); }
.il-money-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin-bottom:26px; }
.il-money-card { background:var(--surface); border:1px solid var(--line); border-radius:18px; padding:20px; backdrop-filter:blur(8px); }
.il-money-card .big { font-family:var(--font-disp); font-weight:800; font-size:30px; }
.il-money-card .sub { color:var(--txt-dim); font-size:13px; margin-top:6px; font-weight:500; }
.il-actions-row { display:flex; gap:8px; margin-top:18px; flex-wrap:wrap; }
.il-spinner { width:42px; height:42px; border:3px solid var(--line-2); border-top-color:var(--accent-lite); border-radius:50%; animation:spin .8s linear infinite; }
@keyframes spin { to { transform:rotate(360deg); } }
.il-toast { position:fixed; bottom:24px; left:50%; transform:translateX(-50%); background:var(--surface-solid); border:1px solid var(--line-2); color:var(--txt); padding:12px 20px; border-radius:13px; z-index:90; font-size:14px; font-weight:600; box-shadow:0 14px 40px rgba(0,0,0,0.5); animation:rise .25s ease; }
.il-toast.err { border-color:var(--red); color:var(--red); }

@media (max-width:860px) {
  .il-sidebar { display:none; }
  .il-mobile-bar { display:flex; align-items:center; justify-content:space-between; padding:13px 16px; border-bottom:1px solid var(--line); background:rgba(10,13,21,0.85); backdrop-filter:blur(14px); position:sticky; top:0; z-index:60; }
  .il-mobile-logo { display:flex; align-items:center; gap:10px; }
  .il-mobile-logo img { width:34px; height:34px; border-radius:9px; object-fit:contain; }
  .il-mobile-logo .txt { font-family:var(--font-disp); font-weight:800; font-size:17px; }
  .il-mobile-logo .txt b { color:var(--accent-lite); }
  .il-burger { background:rgba(255,255,255,0.05); border:1px solid var(--line-2); color:var(--txt); width:40px; height:40px; border-radius:11px; font-size:20px; cursor:pointer; }
  .il-drawer { position:fixed; inset:0; z-index:70; }
  .il-drawer-bg { position:absolute; inset:0; background:rgba(5,7,12,0.6); backdrop-filter:blur(4px); }
  .il-drawer-panel { position:absolute; left:0; top:0; bottom:0; width:250px; background:var(--surface-solid); border-right:1px solid var(--line-2); padding:22px 16px; display:flex; flex-direction:column; animation:slideIn .22s ease; }
  @keyframes slideIn { from{transform:translateX(-100%)} to{transform:translateX(0)} }
  .il-main { padding:22px 16px 50px; }
  .il-stats { grid-template-columns:1fr 1fr; }
  .il-money-grid { grid-template-columns:1fr; }
  .il-info-grid { grid-template-columns:1fr; }
  .il-page-title { font-size:25px; }
  .il-menu { bottom:auto; }
}
`;
