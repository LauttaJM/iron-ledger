export const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Sora:wght@400;500;600;700&display=swap');
* { box-sizing:border-box; margin:0; padding:0; }
.il-root {
  --bg:#120608; --surface:rgba(48,17,21,0.66); --surface-solid:#1a0c0f; --line:rgba(217,106,118,0.16); --line-2:rgba(217,106,118,0.3);
  --txt:#f3e6e6; --txt-dim:#a78a8d; --accent:#b62b3c; --accent-lite:#e87b86; --accent-dk:#7a1c28; --cream:#f0c9cd;
  --green:#f0c9cd; --amber:#f0a8b0; --red:#ff8a94;
  --font-disp:'Space Grotesk',sans-serif; --font-body:'Sora',sans-serif;
  font-family:var(--font-body); background:var(--bg); color:var(--txt); min-height:100vh; width:100%; -webkit-font-smoothing:antialiased; letter-spacing:-0.1px;
}
.il-root::selection { background:var(--accent); color:#fff; }
.il-bg-grad { position:fixed; inset:0; pointer-events:none; z-index:0; background:
  radial-gradient(900px 540px at 50% -14%,rgba(150,40,55,0.42),transparent 60%),
  radial-gradient(680px 560px at 100% 116%,rgba(107,30,35,0.4),transparent 58%),
  radial-gradient(560px 480px at -6% 30%,rgba(60,12,18,0.5),transparent 62%),
  linear-gradient(180deg,#1a080b,#100507); }
.il-bg-tex { position:fixed; inset:0; pointer-events:none; z-index:0; opacity:.07; background-image:radial-gradient(rgba(255,180,180,.5) .6px,transparent .6px); background-size:34px 34px; }
.il-shell { position:relative; z-index:1; }
.il-center { min-height:100vh; display:grid; place-items:center; padding:24px; }

@keyframes rise { from{opacity:0; transform:translateY(16px)} to{opacity:1; transform:translateY(0)} }
@keyframes fadeUp { from{opacity:0; transform:translateY(10px)} to{opacity:1; transform:translateY(0)} }
@keyframes pop { from{transform:scale(.95) translateY(8px); opacity:0} to{transform:scale(1) translateY(0); opacity:1} }
@keyframes menuIn { from{opacity:0; transform:translateY(-6px) scale(.98)} to{opacity:1; transform:translateY(0) scale(1)} }
@keyframes spin { to { transform:rotate(360deg); } }
@keyframes floaty { 0%,100%{ transform:translateY(-50%) translateZ(0); } 50%{ transform:translateY(calc(-50% - 8px)); } }
@keyframes pulseGlow { 0%,100%{ opacity:.5; } 50%{ opacity:.85; } }
@keyframes growBar { from{ transform:scaleY(0); } to{ transform:scaleY(1); } }
@keyframes fillBar { from{ width:0; } }

/* LOGIN */
.il-login-card { width:100%; max-width:420px; position:relative; border-radius:26px; padding:42px 38px 34px; overflow:hidden;
  background:linear-gradient(160deg,rgba(54,18,23,0.6),rgba(20,8,11,0.6)); border:1px solid var(--line-2);
  backdrop-filter:blur(22px); box-shadow:0 40px 100px rgba(0,0,0,.6),inset 0 1px 0 rgba(255,190,195,.14); animation:rise .55s cubic-bezier(.2,.8,.2,1); }
.il-login-card::before { content:""; position:absolute; top:-35%; left:-8%; width:62%; height:72%; border-radius:50%;
  background:radial-gradient(circle,rgba(217,106,118,.4),transparent 70%); filter:blur(34px); pointer-events:none; animation:pulseGlow 5s ease-in-out infinite; }
.il-login-logo { display:flex; justify-content:center; margin-bottom:14px; position:relative; }
.il-login-logo img { width:108px; height:108px; object-fit:contain; border-radius:24px; filter:drop-shadow(0 10px 30px rgba(180,40,55,.6)); }
.il-login-welcome { font-family:var(--font-disp); font-weight:700; font-size:27px; text-align:center; color:#fbeef0; }
.il-login-sub { text-align:center; color:var(--txt-dim); font-size:13.5px; margin-top:4px; margin-bottom:26px; }

.il-field { margin-bottom:16px; }
.il-field label { display:block; font-size:11.5px; color:var(--txt-dim); margin-bottom:7px; font-weight:600; }
.il-input, .il-select { width:100%; background:rgba(12,5,7,0.6); border:1px solid var(--line-2); color:var(--txt); padding:13px 15px; border-radius:13px; font-size:15px; font-family:var(--font-body); font-weight:500; transition:border-color .18s, box-shadow .18s, background .18s; }
.il-input:focus, .il-select:focus { outline:none; border-color:var(--accent-lite); box-shadow:0 0 0 3px rgba(232,123,134,.18); background:rgba(12,5,7,0.85); }
.il-input::placeholder { color:#7c6164; }
.il-input.err, .il-select.err { border-color:var(--red); box-shadow:0 0 0 3px rgba(255,138,148,.14); }
.il-err-msg { color:var(--red); font-size:12px; margin-top:6px; font-weight:500; }

.il-btn { background:linear-gradient(105deg,var(--accent),var(--accent-dk)); color:#fde8ea; border:1px solid rgba(232,123,134,.4); padding:13px 20px; border-radius:13px; font-family:var(--font-disp); font-weight:600; font-size:14.5px; cursor:pointer; transition:transform .14s, box-shadow .2s, filter .18s; width:100%; box-shadow:0 12px 30px rgba(150,30,45,.45),inset 0 1px 0 rgba(255,190,195,.22); }
.il-btn:hover { filter:brightness(1.1); box-shadow:0 14px 36px rgba(150,30,45,.55); transform:translateY(-2px); }
.il-btn:active { transform:translateY(0); }
.il-btn:disabled { opacity:.5; cursor:not-allowed; filter:none; box-shadow:none; transform:none; }
.il-btn.sec { background:rgba(255,255,255,0.05); color:var(--txt); border:1px solid var(--line-2); box-shadow:none; }
.il-btn.sec:hover { background:rgba(255,255,255,0.09); }
.il-btn.sm { width:auto; padding:9px 16px; font-size:13px; }
.il-btn.xs { width:auto; padding:5px 11px; font-size:12px; border-radius:9px; box-shadow:none; }
.il-btn.ghost { background:transparent; color:var(--txt-dim); border:1px solid var(--line-2); box-shadow:none; }
.il-btn.ghost:hover { color:var(--txt); background:rgba(255,255,255,0.04); transform:none; }
.il-btn.danger { background:transparent; color:var(--red); border:1px solid rgba(255,138,148,.4); box-shadow:none; }
.il-btn.danger:hover { background:rgba(255,138,148,.1); transform:none; }

/* LAYOUT */
.il-app { display:flex; min-height:100vh; }
.il-sidebar { width:224px; flex:none; border-right:1px solid var(--line); background:rgba(18,7,9,0.72); backdrop-filter:blur(14px); padding:22px 15px; display:flex; flex-direction:column; position:sticky; top:0; height:100vh; }
.il-sb-logo { display:flex; align-items:center; gap:11px; padding:2px 6px 22px; }
.il-sb-logo img { width:40px; height:40px; object-fit:contain; border-radius:11px; box-shadow:0 0 18px rgba(200,50,68,.55); }
.il-sb-logo .txt { font-family:var(--font-disp); font-weight:700; font-size:17px; }
.il-sb-logo .txt b { color:var(--accent-lite); }
.il-grp { font-size:10.5px; text-transform:uppercase; letter-spacing:1.2px; color:#7c6164; font-weight:600; margin:14px 8px 8px; }
.il-sb-nav { display:flex; flex-direction:column; gap:4px; }
.il-sb-nav button { position:relative; display:flex; align-items:center; gap:13px; background:transparent; border:1px solid transparent; color:var(--txt-dim); font-family:var(--font-body); font-weight:500; font-size:14px; padding:11px 13px; border-radius:12px; cursor:pointer; transition:color .15s, background .15s; text-align:left; }
.il-sb-nav button:hover { color:var(--txt); background:rgba(255,255,255,0.03); }
.il-sb-nav button svg { width:19px; height:19px; stroke:var(--txt-dim); stroke-width:1.7; fill:none; flex:none; transition:stroke .15s, filter .15s; }
.il-sb-nav button.active { color:#fdeaec; background:linear-gradient(100deg,rgba(107,30,35,0.85),rgba(40,14,18,0.5)); border:1px solid rgba(232,123,134,.45); box-shadow:0 0 22px rgba(232,123,134,.28),inset 0 0 14px rgba(232,123,134,.1); }
.il-sb-nav button.active svg { stroke:#ff9ba4; filter:drop-shadow(0 0 7px rgba(232,123,134,.95)); }
.il-sb-spacer { flex:1; }
.il-sb-foot { border-top:1px solid var(--line); padding-top:12px; margin-top:12px; display:flex; flex-direction:column; gap:2px; }
.il-sb-foot button { display:flex; align-items:center; gap:12px; background:transparent; border:none; color:#8c7073; font-family:var(--font-body); font-size:13px; font-weight:500; padding:9px 13px; border-radius:10px; cursor:pointer; transition:color .15s, background .15s; text-align:left; }
.il-sb-foot button:hover { color:var(--txt); background:rgba(255,255,255,0.03); }
.il-sb-foot button svg { width:18px; height:18px; stroke:#8c7073; stroke-width:1.7; fill:none; flex:none; }
.il-cta { margin-top:14px; }
.il-content { flex:1; min-width:0; }

.il-avatar { width:38px; height:38px; border-radius:50%; background:#1a0c0f; border:2px solid var(--accent); display:grid; place-items:center; font-weight:700; font-size:14px; color:#fff; overflow:hidden; flex:none; }
.il-avatar img { width:100%; height:100%; object-fit:cover; }
.il-role-tag { font-size:10px; text-transform:uppercase; letter-spacing:0.8px; color:var(--accent-lite); font-weight:700; }
.il-sb-user { display:flex; align-items:center; gap:11px; cursor:pointer; padding:9px; border-radius:12px; transition:background .15s; }
.il-sb-user:hover { background:rgba(255,255,255,0.04); }

.il-menu { position:absolute; bottom:64px; left:14px; width:200px; background:var(--surface-solid); border:1px solid var(--line-2); border-radius:15px; padding:7px; z-index:50; box-shadow:0 24px 60px rgba(0,0,0,.6); animation:menuIn .16s ease; }
.il-menu-item { display:flex; align-items:center; gap:11px; width:100%; background:transparent; border:none; color:var(--txt); padding:10px 11px; border-radius:10px; cursor:pointer; font-size:14px; font-family:var(--font-body); font-weight:500; text-align:left; transition:background .13s; }
.il-menu-item:hover { background:rgba(255,255,255,0.06); }
.il-menu-item.danger { color:var(--red); }
.il-menu-sep { height:1px; background:var(--line); margin:5px 4px; }
.il-menu-ico { width:18px; text-align:center; opacity:.85; }

/* MOBILE */
.il-mobile-bar { display:none; }
.il-tabbar { display:none; }

.il-main { padding:28px 30px 60px; max-width:1080px; margin:0 auto; animation:fadeUp .4s ease; }
.il-topnav { display:flex; align-items:center; justify-content:space-between; padding:18px 30px 4px; }
.il-crumb { font-size:13px; color:var(--txt-dim); } .il-crumb b { color:#f0e2e3; font-weight:600; }
.il-page-title { font-family:var(--font-disp); font-weight:700; font-size:34px; letter-spacing:-1px; color:#fbeef0; line-height:1.05; }
.il-page-title em { font-style:normal; background:linear-gradient(90deg,#f0a8b0,#a02436); -webkit-background-clip:text; background-clip:text; color:transparent; }
.il-page-sub { color:var(--txt-dim); font-size:13.5px; margin-top:8px; margin-bottom:24px; }
.il-chip { display:inline-block; font-size:11px; font-weight:600; color:var(--cream); background:rgba(217,106,118,.14); border:1px solid rgba(217,106,118,.36); padding:5px 13px; border-radius:999px; margin-bottom:14px; }

.il-cols { display:flex; gap:20px; align-items:flex-start; }
.il-colmain { flex:1; min-width:0; }
.il-colside { width:300px; flex:none; display:flex; flex-direction:column; gap:16px; }

.il-glass { position:relative; border-radius:20px; overflow:hidden; border:1px solid var(--line-2); background:linear-gradient(150deg,rgba(48,17,21,0.72),rgba(24,9,12,0.66)); backdrop-filter:blur(12px); box-shadow:inset 0 1px 0 rgba(255,190,195,.13),0 16px 40px rgba(0,0,0,.4); animation:fadeUp .5s ease backwards; }
.il-glass::after { content:""; position:absolute; top:0; left:0; right:42%; height:1px; background:linear-gradient(90deg,rgba(255,190,195,.5),transparent); }

.il-hero-panel { padding:26px 28px; margin-bottom:18px; background:radial-gradient(420px 280px at 90% 28%,rgba(160,36,54,0.55),transparent 62%),linear-gradient(150deg,rgba(54,18,23,0.82),rgba(22,9,11,0.7)); }
.il-hero-panel .lbl { font-size:11px; color:#e08891; font-weight:600; text-transform:uppercase; letter-spacing:1px; }
.il-hero-panel h2 { font-family:var(--font-disp); font-weight:700; font-size:22px; color:#fbeef0; margin:6px 0 4px; }
.il-hero-panel .d { font-size:12.5px; color:var(--txt-dim); }
.il-metrics { display:flex; gap:30px; margin-top:22px; position:relative; z-index:2; }
.il-metric .n { font-family:var(--font-disp); font-weight:700; font-size:34px; color:#fff; line-height:1; }
.il-metric .l { font-size:11.5px; color:var(--txt-dim); margin-top:5px; }
.il-metric.c .n { color:var(--cream); } .il-metric.r .n { color:var(--red); }
.il-athlete { position:absolute; right:4px; bottom:0; top:0; width:300px; display:flex; align-items:center; justify-content:flex-end; pointer-events:none; }
.il-athlete .gl { position:absolute; right:26px; top:50%; transform:translateY(-50%); width:250px; height:250px; border-radius:50%; background:radial-gradient(circle,rgba(210,70,92,.5),transparent 64%); filter:blur(22px); animation:pulseGlow 5s ease-in-out infinite; }
.il-athlete img { position:relative; height:200px; width:auto; object-fit:contain; filter:brightness(0) invert(7%) sepia(55%) saturate(1300%) hue-rotate(326deg) drop-shadow(0 10px 22px rgba(0,0,0,.6)); opacity:.95; animation:floaty 6s ease-in-out infinite; }

.il-section-h { font-family:var(--font-disp); font-weight:600; font-size:16px; color:#f3e6e6; margin:6px 0 12px; display:flex; justify-content:space-between; align-items:center; }
.il-section-h a, .il-section-h .lnk { font-size:12px; color:var(--accent-lite); font-weight:600; cursor:pointer; }
.il-toolbar { display:flex; gap:10px; flex-wrap:wrap; margin-bottom:18px; align-items:center; }
.il-search { flex:1; min-width:200px; }
.il-filters { display:flex; gap:6px; flex-wrap:wrap; }
.il-fchip { background:var(--surface); border:1px solid var(--line); color:var(--txt-dim); padding:9px 14px; border-radius:999px; font-size:12.5px; font-weight:600; cursor:pointer; transition:all .15s; font-family:var(--font-body); }
.il-fchip:hover { color:var(--txt); border-color:var(--line-2); }
.il-fchip.on { background:var(--accent); color:#fff; border-color:var(--accent); box-shadow:0 0 16px rgba(182,43,60,.5); }
.il-card-list { display:flex; flex-direction:column; gap:10px; }
.il-row { display:flex; align-items:center; gap:14px; border-radius:15px; padding:14px 16px; cursor:pointer; border:1px solid var(--line); background:linear-gradient(120deg,rgba(44,15,19,0.7),rgba(22,9,11,0.6)); backdrop-filter:blur(10px); transition:border-color .15s, transform .14s, box-shadow .2s; animation:fadeUp .4s ease backwards; }
.il-row:hover { border-color:var(--line-2); transform:translateX(3px); box-shadow:0 0 22px rgba(232,123,134,.12); }
.il-rowico { width:42px; height:42px; border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:17px; flex:none; background:rgba(217,106,118,.12); color:var(--accent-lite); border:1px solid rgba(217,106,118,.2); }
.il-dot { width:9px; height:9px; border-radius:50%; flex:none; }
.il-dot.alDia { background:#5fd6a8; box-shadow:0 0 10px rgba(95,214,168,.6); }
.il-dot.porVencer { background:var(--amber); box-shadow:0 0 10px rgba(240,168,176,.6); }
.il-dot.vencido { background:var(--red); box-shadow:0 0 10px rgba(255,138,148,.6); }
.il-row-main { flex:1; min-width:0; }
.il-row-name { font-weight:600; font-size:14.5px; color:#f3e6e6; }
.il-row-meta { color:var(--txt-dim); font-size:12px; margin-top:2px; }
.il-row-right { text-align:right; flex:none; }
.il-badge { display:inline-block; font-size:10px; font-weight:700; padding:5px 11px; border-radius:999px; letter-spacing:.4px; text-transform:uppercase; }
.il-badge.alDia { background:rgba(95,214,168,.13); color:#5fd6a8; }
.il-badge.porVencer { background:rgba(240,168,176,.16); color:var(--amber); }
.il-badge.vencido { background:rgba(255,138,148,.16); color:var(--red); }
.il-row-venc { font-size:11.5px; color:var(--txt-dim); margin-top:5px; }
.il-empty { text-align:center; color:var(--txt-dim); padding:50px 20px; font-size:14px; }

.il-pcard { padding:24px 20px; text-align:center; background:radial-gradient(220px 130px at 50% -6%,rgba(160,36,54,0.5),transparent 70%),linear-gradient(160deg,rgba(48,17,21,0.78),rgba(20,8,10,0.7)); }
.il-pav { width:80px; height:80px; border-radius:50%; border:3px solid var(--accent-lite); overflow:hidden; margin:0 auto 13px; box-shadow:0 0 34px rgba(180,40,55,.55); }
.il-pav img { width:100%; height:100%; object-fit:cover; }
.il-pcard h3 { font-family:var(--font-disp); font-weight:600; font-size:18px; color:#fbeef0; }
.il-pcard .tier { font-size:12px; color:var(--accent-lite); font-weight:600; margin-top:3px; }
.il-pstats { display:flex; gap:11px; margin-top:18px; }
.il-ps { flex:1; background:rgba(217,106,118,0.06); border:1px solid rgba(217,106,118,0.16); border-radius:14px; padding:13px 6px; }
.il-ps .n { font-family:var(--font-disp); font-weight:700; font-size:23px; color:#fff; }
.il-ps.r .n { color:var(--accent-lite); }
.il-ps .l { font-size:10.5px; color:var(--txt-dim); margin-top:3px; }

.il-chartcard { padding:20px 22px; }
.il-chartcard .ti { font-family:var(--font-disp); font-weight:600; font-size:14px; color:#f3e6e6; }
.il-chartcard .big { font-family:var(--font-disp); font-weight:700; font-size:24px; color:#fff; margin:4px 0 14px; }
.il-chart { display:flex; align-items:flex-end; gap:8px; height:64px; }
.il-chart .b { flex:1; border-radius:5px 5px 0 0; background:linear-gradient(180deg,rgba(217,106,118,.35),rgba(217,106,118,.06)); transform-origin:bottom; animation:growBar .6s cubic-bezier(.2,.8,.2,1) backwards; }
.il-chart .b.hi { background:linear-gradient(180deg,#e87b86,#8f1f2e); box-shadow:0 0 16px rgba(217,106,118,.6); }
.il-chl { display:flex; justify-content:space-between; margin-top:7px; font-size:9.5px; color:#8c7073; }

.il-feed { padding:22px; }
.il-feed h4 { font-family:var(--font-disp); font-weight:600; font-size:14.5px; color:#f3e6e6; margin-bottom:15px; }
.il-fi { display:flex; gap:11px; margin-bottom:15px; }
.il-fi:last-child { margin-bottom:0; }
.il-fi .d { width:30px; height:30px; border-radius:50%; background:rgba(217,106,118,0.12); border:1px solid rgba(217,106,118,.2); flex:none; display:flex; align-items:center; justify-content:center; font-size:12px; color:var(--accent-lite); }
.il-fi .tx { font-size:12px; color:#c9b3b5; line-height:1.4; } .il-fi .tx b { color:#fff; font-weight:600; }
.il-fi .ag { font-size:10.5px; color:#8c7073; margin-top:2px; }

.il-stats { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-bottom:26px; }
.il-stat { background:var(--surface); border:1px solid var(--line); border-radius:16px; padding:18px; position:relative; overflow:hidden; backdrop-filter:blur(8px); animation:fadeUp .45s ease backwards; }
.il-stat .num { font-family:var(--font-disp); font-weight:700; font-size:32px; line-height:1; }
.il-stat .lbl { color:var(--txt-dim); font-size:12px; margin-top:8px; }
.il-stat .bar { position:absolute; left:0; top:0; bottom:0; width:3px; }
.il-stat.s-total .bar { background:var(--accent-lite); }
.il-stat.s-dia .bar { background:#5fd6a8; }
.il-stat.s-venc .bar { background:var(--red); }
.il-stat.s-pv .bar { background:var(--amber); }

.il-overlay { position:fixed; inset:0; background:rgba(8,3,5,0.66); backdrop-filter:blur(6px); z-index:80; display:grid; place-items:center; padding:20px; animation:fadeUp .2s ease; }
.il-modal { width:100%; max-width:560px; max-height:90vh; overflow:auto; background:var(--surface-solid); border:1px solid var(--line-2); border-radius:22px; padding:28px; animation:pop .24s cubic-bezier(.2,.8,.2,1); box-shadow:0 30px 80px rgba(0,0,0,.6); }
.il-modal-head { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:20px; }
.il-modal-title { font-family:var(--font-disp); font-weight:700; font-size:23px; color:#fbeef0; }
.il-close { background:rgba(255,255,255,0.05); border:1px solid var(--line); color:var(--txt-dim); width:34px; height:34px; border-radius:11px; cursor:pointer; font-size:18px; line-height:1; transition:background .15s; }
.il-close:hover { color:var(--txt); background:rgba(255,255,255,0.1); }
.il-info-grid { display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:22px; }
.il-info-item .k { font-size:10.5px; text-transform:uppercase; letter-spacing:0.5px; color:var(--txt-dim); margin-bottom:3px; font-weight:600; }
.il-info-item .v { font-size:15px; font-weight:600; color:#f3e6e6; }
.il-pay-box { background:rgba(12,5,7,0.5); border:1px solid var(--line); border-radius:15px; padding:18px; margin-bottom:22px; }
.il-pay-box h4 { font-size:12px; text-transform:uppercase; letter-spacing:0.5px; color:var(--accent-lite); margin-bottom:14px; font-weight:700; }
.il-pay-methods { display:flex; gap:8px; margin-bottom:14px; }
.il-method { flex:1; background:rgba(255,255,255,0.03); border:1px solid var(--line); color:var(--txt); padding:11px; border-radius:11px; cursor:pointer; font-weight:600; font-size:14px; font-family:var(--font-body); transition:all .15s; }
.il-method.on { border-color:var(--accent-lite); background:rgba(232,123,134,.12); color:var(--accent-lite); }
.il-aldia-note { background:rgba(95,214,168,.07); border:1px solid rgba(95,214,168,.26); color:#7fd6a8; border-radius:13px; padding:13px 16px; font-size:13.5px; line-height:1.5; }
.il-confirm { background:rgba(240,168,176,.08); border:1px solid rgba(240,168,176,.3); border-radius:13px; padding:13px 16px; font-size:13px; color:var(--amber); margin-bottom:12px; line-height:1.5; }
.il-danger-confirm { background:rgba(255,138,148,.08); border:1px solid rgba(255,138,148,.3); border-radius:13px; padding:13px 16px; font-size:13px; color:var(--red); margin-bottom:12px; line-height:1.5; }
.il-hist h4 { font-size:12px; text-transform:uppercase; letter-spacing:0.5px; color:var(--txt-dim); margin-bottom:12px; font-weight:700; }
.il-hist-row { display:flex; justify-content:space-between; align-items:center; padding:11px 0; border-bottom:1px solid var(--line); gap:10px; }
.il-hist-row:last-child { border-bottom:none; }
.il-hist-left .d { font-weight:600; font-size:14px; color:#f3e6e6; }
.il-hist-left .m { font-size:12px; color:var(--txt-dim); margin-top:2px; }
.il-hist-amt { font-family:var(--font-disp); font-weight:700; white-space:nowrap; }
.il-tag-met { font-size:10px; padding:2px 7px; border-radius:6px; background:rgba(255,255,255,0.06); color:var(--txt-dim); margin-left:8px; }
.il-plan-card { display:flex; justify-content:space-between; align-items:center; background:var(--surface); border:1px solid var(--line); border-radius:16px; padding:18px 20px; margin-bottom:10px; gap:14px; backdrop-filter:blur(8px); transition:border-color .15s; }
.il-plan-card:hover { border-color:var(--line-2); }
.il-plan-name { font-family:var(--font-disp); font-weight:700; font-size:18px; color:#fbeef0; }
.il-plan-price { font-family:var(--font-disp); font-weight:700; font-size:24px; color:var(--accent-lite); }
.il-banner { background:rgba(107,30,35,0.22); border:1px solid rgba(217,106,118,.28); border-radius:13px; padding:13px 16px; font-size:13px; color:#e7b3bc; margin-bottom:22px; line-height:1.5; }
.il-banner b { color:#fff; }
.il-team-row { display:flex; align-items:center; gap:14px; background:var(--surface); border:1px solid var(--line); border-radius:16px; padding:14px 16px; margin-bottom:10px; flex-wrap:wrap; backdrop-filter:blur(8px); }
.il-team-av { width:46px; height:46px; border-radius:50%; background:#1a0c0f; border:2px solid var(--accent); display:grid; place-items:center; font-weight:700; color:#fff; overflow:hidden; flex:none; }
.il-team-av img { width:100%; height:100%; object-fit:cover; }
.il-photo-pick { display:flex; align-items:center; gap:14px; margin-bottom:16px; }
.il-photo-pick .il-team-av { width:64px; height:64px; cursor:pointer; }
.il-rol-pills { display:flex; gap:8px; }
.il-rol-pill { background:rgba(255,255,255,0.03); border:1px solid var(--line); color:var(--txt-dim); padding:6px 13px; border-radius:999px; font-size:12.5px; font-weight:600; cursor:pointer; transition:all .15s; }
.il-rol-pill.on { border-color:var(--accent-lite); color:var(--accent-lite); background:rgba(232,123,134,.12); }
.il-money-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin-bottom:26px; }
.il-money-card { background:var(--surface); border:1px solid var(--line); border-radius:18px; padding:20px; backdrop-filter:blur(8px); }
.il-money-card .big { font-family:var(--font-disp); font-weight:700; font-size:28px; }
.il-money-card .sub { color:var(--txt-dim); font-size:13px; margin-top:6px; }
.il-spinner { width:42px; height:42px; border:3px solid var(--line-2); border-top-color:var(--accent-lite); border-radius:50%; animation:spin .8s linear infinite; }
.il-toast { position:fixed; bottom:24px; left:50%; transform:translateX(-50%); background:var(--surface-solid); border:1px solid var(--line-2); color:var(--txt); padding:12px 20px; border-radius:13px; z-index:90; font-size:14px; font-weight:600; box-shadow:0 14px 40px rgba(0,0,0,.5); animation:rise .25s ease; }
.il-toast.err { border-color:var(--red); color:var(--red); }

@media (max-width:860px) {
  .il-sidebar { display:none; }
  .il-mobile-bar { display:flex; align-items:center; justify-content:space-between; padding:15px 18px; border-bottom:1px solid var(--line); background:rgba(18,7,9,0.85); backdrop-filter:blur(14px); position:sticky; top:0; z-index:60; }
  .il-mobile-logo { display:flex; align-items:center; gap:10px; }
  .il-mobile-logo img { width:34px; height:34px; border-radius:9px; object-fit:contain; box-shadow:0 0 14px rgba(200,50,68,.5); }
  .il-mobile-logo .txt { font-family:var(--font-disp); font-weight:700; font-size:16px; }
  .il-mobile-logo .txt b { color:var(--accent-lite); }
  .il-mobile-av { width:36px; height:36px; border-radius:50%; border:2px solid var(--accent); overflow:hidden; }
  .il-mobile-av img { width:100%; height:100%; object-fit:cover; }
  .il-tabbar { display:flex; justify-content:space-around; padding:9px 6px calc(9px + env(safe-area-inset-bottom)); background:rgba(14,6,8,.94); border-top:1px solid var(--line); backdrop-filter:blur(12px); position:fixed; left:0; right:0; bottom:0; z-index:60; }
  .il-tabbar button { display:flex; flex-direction:column; align-items:center; gap:3px; background:transparent; border:none; font-size:9.5px; color:#8c7073; font-weight:500; cursor:pointer; font-family:var(--font-body); padding:4px 8px; }
  .il-tabbar button svg { width:21px; height:21px; stroke:#8c7073; stroke-width:1.7; fill:none; }
  .il-tabbar button.active { color:#ff9ba4; }
  .il-tabbar button.active svg { stroke:#ff9ba4; filter:drop-shadow(0 0 6px rgba(232,123,134,.9)); }
  .il-cols { flex-direction:column; }
  .il-colside { width:100%; }
  .il-athlete { width:130px; }
  .il-athlete img { height:130px; }
  .il-athlete .gl { width:150px; height:150px; }
  .il-main { padding:20px 16px 90px; }
  .il-topnav { padding:14px 16px 0; }
  .il-stats { grid-template-columns:1fr 1fr; }
  .il-money-grid { grid-template-columns:1fr; }
  .il-info-grid { grid-template-columns:1fr; }
  .il-page-title { font-size:26px; }
}
`;
