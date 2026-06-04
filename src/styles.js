export const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');
* { box-sizing:border-box; margin:0; padding:0; }
.il-root {
  --bg:#0b0e16; --bg-2:#0f131e; --surface:rgba(24,29,43,0.66); --surface-solid:#181d2b; --surface-2:rgba(33,39,56,0.6);
  --line:rgba(255,255,255,0.08); --line-2:rgba(255,255,255,0.14); --txt:#eef1f7; --txt-dim:#8c93a8;
  --navy:#1c2b52; --navy-lite:#2a3d6e; --burgundy:#9e2440; --burgundy-lite:#c43356; --grey:#3a4256;
  --accent:#9e2440; --accent-lite:#c43356; --green:#3ad29f; --amber:#f1b24a; --red:#ff5a6a;
  --font-disp:'Sora',sans-serif; --font-body:'Inter',sans-serif;
  font-family:var(--font-body); background:var(--bg); color:var(--txt); min-height:100vh; width:100%; -webkit-font-smoothing:antialiased;
}
.il-root::selection { background:var(--burgundy); color:#fff; }
.il-bg-grad { position:fixed; inset:0; pointer-events:none; z-index:0; background:
  radial-gradient(1200px 700px at 82% -15%, rgba(158,36,64,0.16), transparent 58%),
  radial-gradient(900px 600px at -10% 110%, rgba(28,43,82,0.4), transparent 60%),
  linear-gradient(180deg, #0b0e16 0%, #0a0d15 100%); }
.il-bg-crest { position:fixed; right:-160px; top:50%; transform:translateY(-50%); width:640px; height:640px; opacity:0.04; pointer-events:none; z-index:0; filter:grayscale(0.2); }
.il-bg-crest img { width:100%; height:100%; object-fit:contain; }
.il-shell { position:relative; z-index:1; }
.il-center { min-height:100vh; display:grid; place-items:center; padding:24px; }

/* ----- LOGIN glass ----- */
.il-login-card { width:100%; max-width:420px; position:relative; border-radius:26px; padding:42px 36px 34px;
  background:linear-gradient(160deg, rgba(40,46,66,0.55), rgba(18,22,33,0.55)); border:1px solid var(--line-2);
  backdrop-filter:blur(22px); box-shadow:0 30px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.08);
  animation:rise .5s cubic-bezier(.2,.8,.2,1); overflow:hidden; }
.il-login-card::before { content:""; position:absolute; top:-40%; left:-10%; width:70%; height:80%; border-radius:50%;
  background:radial-gradient(circle, rgba(196,51,86,0.35), transparent 70%); filter:blur(30px); pointer-events:none; }
@keyframes rise { from{opacity:0; transform:translateY(16px)} to{opacity:1; transform:translateY(0)} }
.il-login-logo { display:flex; flex-direction:column; align-items:center; gap:14px; margin-bottom:26px; position:relative; }
.il-login-logo img { width:92px; height:92px; object-fit:contain; filter:drop-shadow(0 8px 20px rgba(0,0,0,0.5)); }
.il-login-welcome { font-family:var(--font-disp); font-weight:700; font-size:26px; text-align:center; letter-spacing:-0.3px; }
.il-login-sub { text-align:center; color:var(--txt-dim); font-size:13.5px; margin-top:2px; margin-bottom:24px; }

.il-logo { display:flex; align-items:center; gap:11px; }
.il-logo img { width:38px; height:38px; object-fit:contain; }
.il-logo-txt { font-family:var(--font-disp); font-weight:800; font-size:19px; letter-spacing:0.3px; }
.il-logo-txt b { color:var(--burgundy-lite); }

.il-field { margin-bottom:15px; }
.il-field label { display:block; font-size:11.5px; color:var(--txt-dim); margin-bottom:7px; font-weight:600; letter-spacing:0.3px; }
.il-input, .il-select { width:100%; background:rgba(12,15,24,0.6); border:1px solid var(--line-2); color:var(--txt); padding:13px 15px; border-radius:13px; font-size:15px; font-family:var(--font-body); font-weight:500; transition:border-color .18s, box-shadow .18s, background .18s; }
.il-input:focus, .il-select:focus { outline:none; border-color:var(--burgundy-lite); box-shadow:0 0 0 3px rgba(196,51,86,0.18); background:rgba(12,15,24,0.85); }
.il-input::placeholder { color:#5e6377; }
.il-input.err, .il-select.err { border-color:var(--red); box-shadow:0 0 0 3px rgba(255,90,106,0.14); }
.il-err-msg { color:var(--red); font-size:12px; margin-top:6px; font-weight:500; }

.il-btn { background:linear-gradient(135deg, var(--accent-lite), var(--accent)); color:#fff; border:none; padding:13px 20px; border-radius:13px; font-family:var(--font-body); font-weight:700; font-size:14.5px; cursor:pointer; transition:transform .12s, box-shadow .18s, filter .18s; width:100%; box-shadow:0 8px 22px rgba(158,36,64,0.35); }
.il-btn:hover { filter:brightness(1.07); box-shadow:0 10px 28px rgba(158,36,64,0.45); transform:translateY(-1px); }
.il-btn:active { transform:translateY(0); }
.il-btn:disabled { opacity:.5; cursor:not-allowed; filter:none; box-shadow:none; }
.il-btn.sec { background:rgba(255,255,255,0.06); color:var(--txt); border:1px solid var(--line-2); box-shadow:none; }
.il-btn.sec:hover { background:rgba(255,255,255,0.1); transform:translateY(-1px); }
.il-btn.sm { width:auto; padding:9px 16px; font-size:13px; }
.il-btn.xs { width:auto; padding:5px 11px; font-size:12px; border-radius:9px; box-shadow:none; }
.il-btn.ghost { background:transparent; color:var(--txt-dim); border:1px solid var(--line-2); box-shadow:none; }
.il-btn.ghost:hover { color:var(--txt); border-color:var(--line-2); background:rgba(255,255,255,0.04); transform:none; }
.il-btn.danger { background:transparent; color:var(--red); border:1px solid rgba(255,90,106,0.4); box-shadow:none; }
.il-btn.danger:hover { background:rgba(255,90,106,0.1); transform:none; }

/* ----- TOPBAR ----- */
.il-topbar { display:flex; align-items:center; justify-content:space-between; padding:14px 24px; border-bottom:1px solid var(--line); background:rgba(11,14,22,0.72); backdrop-filter:blur(14px); position:sticky; top:0; z-index:30; }
.il-nav { display:flex; gap:4px; flex-wrap:wrap; }
.il-nav button { background:transparent; border:none; color:var(--txt-dim); font-family:var(--font-body); font-weight:600; font-size:14px; padding:8px 15px; border-radius:11px; cursor:pointer; transition:color .15s, background .15s; }
.il-nav button:hover { color:var(--txt); background:rgba(255,255,255,0.04); }
.il-nav button.active { color:#fff; background:linear-gradient(135deg, var(--navy-lite), var(--navy)); box-shadow:0 4px 14px rgba(28,43,82,0.5); }
.il-user-chip { display:flex; align-items:center; gap:10px; position:relative; }
.il-chip-btn { display:flex; align-items:center; gap:10px; cursor:pointer; padding:5px 6px 5px 12px; border-radius:40px; border:1px solid var(--line); background:rgba(255,255,255,0.03); transition:background .15s, border-color .15s; }
.il-chip-btn:hover { background:rgba(255,255,255,0.07); border-color:var(--line-2); }
.il-avatar { width:34px; height:34px; border-radius:50%; background:var(--navy); border:2px solid var(--burgundy); display:grid; place-items:center; font-weight:700; font-size:13px; color:#fff; overflow:hidden; flex:none; }
.il-avatar img { width:100%; height:100%; object-fit:cover; }
.il-role-tag { font-size:10px; text-transform:uppercase; letter-spacing:0.8px; color:var(--burgundy-lite); font-weight:700; }

/* ----- DROPDOWN MENU perfil ----- */
.il-menu { position:absolute; top:54px; right:0; width:230px; background:var(--surface-solid); border:1px solid var(--line-2); border-radius:16px; padding:8px; z-index:50; box-shadow:0 24px 60px rgba(0,0,0,0.55); animation:menuIn .16s ease; }
@keyframes menuIn { from{opacity:0; transform:translateY(-6px) scale(.98)} to{opacity:1; transform:translateY(0) scale(1)} }
.il-menu-head { display:flex; align-items:center; gap:11px; padding:10px 10px 12px; border-bottom:1px solid var(--line); margin-bottom:6px; }
.il-menu-head .nm { font-weight:700; font-size:14.5px; }
.il-menu-item { display:flex; align-items:center; gap:11px; width:100%; background:transparent; border:none; color:var(--txt); padding:10px 11px; border-radius:10px; cursor:pointer; font-size:14px; font-family:var(--font-body); font-weight:500; text-align:left; transition:background .13s; }
.il-menu-item:hover { background:rgba(255,255,255,0.06); }
.il-menu-item.danger { color:var(--red); }
.il-menu-sep { height:1px; background:var(--line); margin:6px 4px; }
.il-menu-ico { width:18px; text-align:center; opacity:.85; }

.il-main { padding:28px 24px 60px; max-width:1060px; margin:0 auto; animation:fadeUp .35s ease; }
@keyframes fadeUp { from{opacity:0; transform:translateY(8px)} to{opacity:1; transform:translateY(0)} }
.il-page-title { font-family:var(--font-disp); font-weight:800; font-size:30px; letter-spacing:-0.5px; margin-bottom:4px; }
.il-page-sub { color:var(--txt-dim); font-size:14px; margin-bottom:26px; }
.il-stats { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-bottom:30px; }
.il-stat { background:var(--surface); border:1px solid var(--line); border-radius:18px; padding:20px; position:relative; overflow:hidden; backdrop-filter:blur(10px); transition:transform .18s, border-color .18s; }
.il-stat:hover { transform:translateY(-3px); border-color:var(--line-2); }
.il-stat .num { font-family:var(--font-disp); font-weight:800; font-size:38px; line-height:1; }
.il-stat .lbl { color:var(--txt-dim); font-size:12.5px; margin-top:8px; font-weight:500; }
.il-stat .bar { position:absolute; left:0; top:0; bottom:0; width:4px; }
.il-stat.s-total .bar { background:var(--burgundy-lite); }
.il-stat.s-dia .bar { background:var(--green); }
.il-stat.s-venc .bar { background:var(--red); }
.il-stat.s-pv .bar { background:var(--amber); }
.il-section-h { font-family:var(--font-disp); font-weight:700; font-size:18px; margin:8px 0 14px; }
.il-toolbar { display:flex; gap:10px; flex-wrap:wrap; margin-bottom:18px; align-items:center; }
.il-search { flex:1; min-width:200px; }
.il-filters { display:flex; gap:6px; flex-wrap:wrap; }
.il-chip { background:var(--surface-2); border:1px solid var(--line); color:var(--txt-dim); padding:9px 14px; border-radius:999px; font-size:12.5px; font-weight:600; cursor:pointer; transition:all .15s; font-family:var(--font-body); }
.il-chip:hover { color:var(--txt); border-color:var(--line-2); }
.il-chip.on { background:#fff; color:#0b0e16; border-color:#fff; }
.il-card-list { display:flex; flex-direction:column; gap:8px; }
.il-row { display:flex; align-items:center; gap:14px; background:var(--surface); border:1px solid var(--line); border-radius:15px; padding:14px 16px; cursor:pointer; transition:border-color .15s, transform .12s, background .15s; backdrop-filter:blur(8px); }
.il-row:hover { border-color:var(--line-2); transform:translateX(3px); background:rgba(33,39,56,0.7); }
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
.il-overlay { position:fixed; inset:0; background:rgba(5,7,12,0.66); backdrop-filter:blur(6px); z-index:40; display:grid; place-items:center; padding:20px; animation:fade .2s ease; }
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
.il-pay-box { background:rgba(12,15,24,0.5); border:1px solid var(--line); border-radius:15px; padding:18px; margin-bottom:22px; }
.il-pay-box h4 { font-size:12px; text-transform:uppercase; letter-spacing:0.5px; color:var(--burgundy-lite); margin-bottom:14px; font-weight:700; }
.il-pay-methods { display:flex; gap:8px; margin-bottom:14px; }
.il-method { flex:1; background:rgba(255,255,255,0.03); border:1px solid var(--line); color:var(--txt); padding:11px; border-radius:11px; cursor:pointer; font-weight:600; font-size:14px; font-family:var(--font-body); transition:all .15s; }
.il-method.on { border-color:var(--burgundy-lite); background:rgba(196,51,86,0.12); color:var(--burgundy-lite); }
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
.il-plan-price { font-family:var(--font-disp); font-weight:800; font-size:24px; color:var(--burgundy-lite); }
.il-banner { background:rgba(28,43,82,0.25); border:1px solid rgba(42,61,110,0.5); border-radius:13px; padding:13px 16px; font-size:13px; color:#aeb8d4; margin-bottom:22px; line-height:1.5; }
.il-banner b { color:#fff; }
.il-team-row { display:flex; align-items:center; gap:14px; background:var(--surface); border:1px solid var(--line); border-radius:16px; padding:14px 16px; margin-bottom:10px; flex-wrap:wrap; backdrop-filter:blur(8px); }
.il-team-av { width:46px; height:46px; border-radius:50%; background:var(--navy); border:2px solid var(--burgundy); display:grid; place-items:center; font-weight:700; color:#fff; overflow:hidden; flex:none; }
.il-team-av img { width:100%; height:100%; object-fit:cover; }
.il-photo-pick { display:flex; align-items:center; gap:14px; margin-bottom:16px; }
.il-photo-pick .il-team-av { width:64px; height:64px; cursor:pointer; }
.il-rol-pills { display:flex; gap:8px; }
.il-rol-pill { background:rgba(255,255,255,0.03); border:1px solid var(--line); color:var(--txt-dim); padding:6px 13px; border-radius:999px; font-size:12.5px; font-weight:600; cursor:pointer; transition:all .15s; }
.il-rol-pill.on { border-color:var(--burgundy-lite); color:var(--burgundy-lite); background:rgba(196,51,86,0.12); }
.il-money-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin-bottom:26px; }
.il-money-card { background:var(--surface); border:1px solid var(--line); border-radius:18px; padding:20px; backdrop-filter:blur(8px); }
.il-money-card .big { font-family:var(--font-disp); font-weight:800; font-size:30px; }
.il-money-card .sub { color:var(--txt-dim); font-size:13px; margin-top:6px; font-weight:500; }
.il-actions-row { display:flex; gap:8px; margin-top:18px; flex-wrap:wrap; }
.il-spinner { width:42px; height:42px; border:3px solid var(--line-2); border-top-color:var(--burgundy-lite); border-radius:50%; animation:spin .8s linear infinite; }
@keyframes spin { to { transform:rotate(360deg); } }
.il-toast { position:fixed; bottom:24px; left:50%; transform:translateX(-50%); background:var(--surface-solid); border:1px solid var(--line-2); color:var(--txt); padding:12px 20px; border-radius:13px; z-index:60; font-size:14px; font-weight:600; box-shadow:0 14px 40px rgba(0,0,0,0.5); animation:rise .25s ease; }
.il-toast.err { border-color:var(--red); color:var(--red); }
@media (max-width:720px) {
  .il-stats { grid-template-columns:1fr 1fr; }
  .il-money-grid { grid-template-columns:1fr; }
  .il-nav button { padding:8px 11px; font-size:13px; }
  .il-info-grid { grid-template-columns:1fr; }
  .il-page-title { font-size:25px; }
  .il-main { padding:22px 14px 50px; }
  .il-topbar { padding:13px 14px; flex-wrap:wrap; gap:10px; }
  .il-bg-crest { width:420px; height:420px; right:-160px; }
  .il-menu { right:0; }
}
`;
