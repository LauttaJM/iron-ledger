export const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=Barlow:wght@400;500;600;700&display=swap');
* { box-sizing:border-box; margin:0; padding:0; }
.il-root {
  --bg:#e7e1d4; --surface:#ffffff; --surface-2:#f4efe5; --line:#d8d0c0; --txt:#16223d; --txt-dim:#6d7384;
  --navy:#16284a; --burgundy:#8a2433; --burgundy-dk:#6f1c29; --cream:#f4efe5;
  --volt:#8a2433; --volt-dim:#6f1c29; --green:#1f9d57; --amber:#b9821a; --red:#c0392b;
  --font-disp:'Oswald',sans-serif; --font-body:'Barlow',sans-serif;
  font-family:var(--font-body); background:var(--bg); color:var(--txt); min-height:100vh; width:100%; -webkit-font-smoothing:antialiased;
}
.il-root::selection { background:var(--burgundy); color:#fff; }
.il-bg-grad { position:fixed; inset:0; pointer-events:none; z-index:0; background:
  radial-gradient(1100px 600px at 88% -12%, rgba(22,40,74,0.06), transparent 60%),
  radial-gradient(800px 500px at -8% 108%, rgba(138,36,51,0.05), transparent 60%); }
.il-bg-crest { position:fixed; right:-120px; top:50%; transform:translateY(-50%); width:620px; height:620px; opacity:0.035; pointer-events:none; z-index:0; }
.il-bg-crest svg { width:100%; height:100%; }
.il-shell { position:relative; z-index:1; }
.il-center { min-height:100vh; display:grid; place-items:center; padding:24px; }
.il-login-card { width:100%; max-width:430px; background:var(--surface); border:1px solid var(--line); border-radius:18px; padding:40px 34px; box-shadow:0 24px 60px rgba(22,40,74,0.15); }
.il-logo { display:flex; align-items:center; gap:13px; margin-bottom:28px; }
.il-logo-emblem { width:46px; height:46px; flex:none; }
.il-logo-txt { font-family:var(--font-disp); font-weight:700; font-size:24px; letter-spacing:0.5px; text-transform:uppercase; color:var(--navy); line-height:1; }
.il-logo-txt small { display:block; font-family:var(--font-body); font-weight:600; font-size:10px; color:var(--burgundy); letter-spacing:3px; text-transform:uppercase; margin-top:3px; }
.il-field { margin-bottom:16px; }
.il-field label { display:block; font-size:11.5px; color:var(--txt-dim); margin-bottom:7px; text-transform:uppercase; letter-spacing:0.8px; font-weight:700; }
.il-input, .il-select { width:100%; background:var(--surface-2); border:1px solid var(--line); color:var(--txt); padding:12px 14px; border-radius:9px; font-size:15px; font-family:var(--font-body); font-weight:500; transition:border-color .15s, box-shadow .15s; }
.il-input:focus, .il-select:focus { outline:none; border-color:var(--navy); box-shadow:0 0 0 3px rgba(22,40,74,0.12); }
.il-input::placeholder { color:#a7a294; }
.il-input.err, .il-select.err { border-color:var(--red); box-shadow:0 0 0 3px rgba(192,57,43,0.12); }
.il-err-msg { color:var(--red); font-size:12px; margin-top:6px; font-weight:600; }
.il-btn { background:var(--burgundy); color:#fff; border:none; padding:13px 20px; border-radius:9px; font-family:var(--font-disp); font-weight:600; font-size:15px; letter-spacing:0.5px; text-transform:uppercase; cursor:pointer; transition:transform .1s, filter .15s; width:100%; }
.il-btn:hover { filter:brightness(1.08); }
.il-btn:active { transform:translateY(1px); }
.il-btn:disabled { opacity:.5; cursor:not-allowed; }
.il-btn.sec { background:var(--navy); color:#fff; }
.il-btn.sec:hover { filter:brightness(1.12); }
.il-btn.sm { width:auto; padding:9px 16px; font-size:13px; }
.il-btn.xs { width:auto; padding:5px 11px; font-size:12px; border-radius:7px; letter-spacing:0.3px; }
.il-btn.ghost { background:transparent; color:var(--navy); border:1.5px solid var(--line); }
.il-btn.ghost:hover { border-color:var(--navy); }
.il-btn.danger { background:transparent; color:var(--red); border:1.5px solid rgba(192,57,43,0.45); }
.il-btn.danger:hover { background:rgba(192,57,43,0.08); }
.il-topbar { display:flex; align-items:center; justify-content:space-between; padding:14px 24px; border-bottom:1px solid var(--line); background:rgba(255,255,255,0.85); backdrop-filter:blur(10px); position:sticky; top:0; z-index:20; }
.il-nav { display:flex; gap:4px; flex-wrap:wrap; }
.il-nav button { background:transparent; border:none; color:var(--txt-dim); font-family:var(--font-disp); font-weight:600; font-size:14px; letter-spacing:0.5px; text-transform:uppercase; padding:8px 14px; border-radius:8px; cursor:pointer; transition:color .15s, background .15s; }
.il-nav button:hover { color:var(--navy); }
.il-nav button.active { color:#fff; background:var(--navy); }
.il-user-chip { display:flex; align-items:center; gap:10px; }
.il-avatar { width:34px; height:34px; border-radius:50%; background:var(--navy); border:2px solid var(--burgundy); display:grid; place-items:center; font-weight:700; font-size:13px; color:#fff; overflow:hidden; flex:none; }
.il-avatar img { width:100%; height:100%; object-fit:cover; }
.il-role-tag { font-size:10px; text-transform:uppercase; letter-spacing:1px; color:var(--burgundy); font-weight:700; }
.il-main { padding:28px 24px 60px; max-width:1060px; margin:0 auto; }
.il-page-title { font-family:var(--font-disp); font-weight:700; font-size:32px; letter-spacing:0.5px; text-transform:uppercase; color:var(--navy); margin-bottom:4px; }
.il-page-sub { color:var(--txt-dim); font-size:14px; margin-bottom:26px; font-weight:500; }
.il-stats { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-bottom:30px; }
.il-stat { background:var(--surface); border:1px solid var(--line); border-radius:14px; padding:20px; position:relative; overflow:hidden; box-shadow:0 4px 14px rgba(22,40,74,0.04); }
.il-stat .num { font-family:var(--font-disp); font-weight:700; font-size:38px; line-height:1; color:var(--navy); }
.il-stat .lbl { color:var(--txt-dim); font-size:12.5px; margin-top:8px; font-weight:600; }
.il-stat .bar { position:absolute; left:0; top:0; bottom:0; width:4px; }
.il-stat.s-total .bar { background:var(--navy); }
.il-stat.s-dia .bar { background:var(--green); }
.il-stat.s-venc .bar { background:var(--red); }
.il-stat.s-pv .bar { background:var(--amber); }
.il-section-h { font-family:var(--font-disp); font-weight:600; font-size:18px; letter-spacing:0.5px; text-transform:uppercase; color:var(--navy); margin:8px 0 14px; }
.il-toolbar { display:flex; gap:10px; flex-wrap:wrap; margin-bottom:18px; align-items:center; }
.il-search { flex:1; min-width:200px; }
.il-filters { display:flex; gap:6px; flex-wrap:wrap; }
.il-chip { background:var(--surface); border:1px solid var(--line); color:var(--txt-dim); padding:9px 14px; border-radius:999px; font-size:12.5px; font-weight:600; cursor:pointer; transition:all .15s; font-family:var(--font-body); }
.il-chip:hover { color:var(--navy); }
.il-chip.on { background:var(--navy); color:#fff; border-color:var(--navy); }
.il-card-list { display:flex; flex-direction:column; gap:8px; }
.il-row { display:flex; align-items:center; gap:14px; background:var(--surface); border:1px solid var(--line); border-radius:12px; padding:14px 16px; cursor:pointer; transition:border-color .15s, transform .1s, box-shadow .15s; }
.il-row:hover { border-color:var(--navy); transform:translateX(2px); box-shadow:0 4px 14px rgba(22,40,74,0.06); }
.il-dot { width:10px; height:10px; border-radius:50%; flex:none; }
.il-dot.alDia { background:var(--green); }
.il-dot.porVencer { background:var(--amber); }
.il-dot.vencido { background:var(--red); }
.il-row-main { flex:1; min-width:0; }
.il-row-name { font-weight:700; font-size:15.5px; color:var(--navy); }
.il-row-meta { color:var(--txt-dim); font-size:12.5px; margin-top:2px; font-weight:500; }
.il-row-right { text-align:right; flex:none; }
.il-badge { display:inline-block; font-size:10.5px; font-weight:700; padding:4px 10px; border-radius:999px; text-transform:uppercase; letter-spacing:0.5px; }
.il-badge.alDia { background:rgba(31,157,87,0.13); color:var(--green); }
.il-badge.porVencer { background:rgba(185,130,26,0.15); color:var(--amber); }
.il-badge.vencido { background:rgba(192,57,43,0.13); color:var(--red); }
.il-row-venc { font-size:12px; color:var(--txt-dim); margin-top:5px; font-weight:500; }
.il-empty { text-align:center; color:var(--txt-dim); padding:50px 20px; font-size:14px; font-weight:500; }
.il-overlay { position:fixed; inset:0; background:rgba(22,40,74,0.35); backdrop-filter:blur(4px); z-index:40; display:grid; place-items:center; padding:20px; animation:fade .2s ease; }
@keyframes fade { from{opacity:0} to{opacity:1} }
.il-modal { width:100%; max-width:560px; max-height:90vh; overflow:auto; background:var(--surface); border:1px solid var(--line); border-radius:18px; padding:28px; animation:pop .2s ease; box-shadow:0 30px 70px rgba(22,40,74,0.25); }
@keyframes pop { from{transform:scale(.96); opacity:0} to{transform:scale(1); opacity:1} }
.il-modal-head { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:20px; }
.il-modal-title { font-family:var(--font-disp); font-weight:700; font-size:24px; letter-spacing:0.5px; text-transform:uppercase; color:var(--navy); }
.il-close { background:var(--surface-2); border:1px solid var(--line); color:var(--txt-dim); width:34px; height:34px; border-radius:9px; cursor:pointer; font-size:18px; line-height:1; }
.il-close:hover { color:var(--navy); }
.il-info-grid { display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:22px; }
.il-info-item .k { font-size:10.5px; text-transform:uppercase; letter-spacing:0.6px; color:var(--txt-dim); margin-bottom:3px; font-weight:700; }
.il-info-item .v { font-size:15px; font-weight:600; color:var(--navy); }
.il-pay-box { background:var(--surface-2); border:1px solid var(--line); border-radius:13px; padding:18px; margin-bottom:22px; }
.il-pay-box h4 { font-size:12px; text-transform:uppercase; letter-spacing:0.6px; color:var(--burgundy); margin-bottom:14px; font-weight:700; }
.il-pay-methods { display:flex; gap:8px; margin-bottom:14px; }
.il-method { flex:1; background:var(--surface); border:1px solid var(--line); color:var(--txt); padding:11px; border-radius:9px; cursor:pointer; font-weight:600; font-size:14px; font-family:var(--font-body); transition:all .15s; }
.il-method.on { border-color:var(--navy); background:rgba(22,40,74,0.06); color:var(--navy); }
.il-aldia-note { background:rgba(31,157,87,0.08); border:1px solid rgba(31,157,87,0.28); color:var(--green); border-radius:11px; padding:13px 16px; font-size:13.5px; line-height:1.5; font-weight:500; }
.il-confirm { background:rgba(185,130,26,0.08); border:1px solid rgba(185,130,26,0.3); border-radius:11px; padding:13px 16px; font-size:13px; color:#8a6212; margin-bottom:12px; line-height:1.5; font-weight:500; }
.il-danger-confirm { background:rgba(192,57,43,0.07); border:1px solid rgba(192,57,43,0.3); border-radius:11px; padding:13px 16px; font-size:13px; color:var(--red); margin-bottom:12px; line-height:1.5; font-weight:500; }
.il-hist h4 { font-size:12px; text-transform:uppercase; letter-spacing:0.6px; color:var(--txt-dim); margin-bottom:12px; font-weight:700; }
.il-hist-row { display:flex; justify-content:space-between; align-items:center; padding:11px 0; border-bottom:1px solid var(--line); gap:10px; }
.il-hist-row:last-child { border-bottom:none; }
.il-hist-left .d { font-weight:700; font-size:14px; color:var(--navy); }
.il-hist-left .m { font-size:12px; color:var(--txt-dim); margin-top:2px; font-weight:500; }
.il-hist-amt { font-family:var(--font-disp); font-weight:600; white-space:nowrap; color:var(--navy); }
.il-tag-met { font-size:10px; padding:2px 7px; border-radius:6px; background:var(--surface-2); color:var(--txt-dim); margin-left:8px; font-weight:600; }
.il-plan-card { display:flex; justify-content:space-between; align-items:center; background:var(--surface); border:1px solid var(--line); border-radius:13px; padding:18px 20px; margin-bottom:10px; gap:14px; box-shadow:0 4px 14px rgba(22,40,74,0.04); }
.il-plan-name { font-family:var(--font-disp); font-weight:700; font-size:18px; letter-spacing:0.5px; text-transform:uppercase; color:var(--navy); }
.il-plan-price { font-family:var(--font-disp); font-weight:700; font-size:24px; color:var(--burgundy); }
.il-banner { background:rgba(22,40,74,0.05); border:1px solid rgba(22,40,74,0.18); border-radius:11px; padding:13px 16px; font-size:13px; color:var(--navy); margin-bottom:22px; line-height:1.5; font-weight:500; }
.il-banner b { color:var(--burgundy); }
.il-team-row { display:flex; align-items:center; gap:14px; background:var(--surface); border:1px solid var(--line); border-radius:13px; padding:14px 16px; margin-bottom:10px; flex-wrap:wrap; box-shadow:0 4px 14px rgba(22,40,74,0.04); }
.il-team-av { width:46px; height:46px; border-radius:50%; background:var(--navy); border:2px solid var(--burgundy); display:grid; place-items:center; font-weight:700; color:#fff; overflow:hidden; flex:none; }
.il-team-av img { width:100%; height:100%; object-fit:cover; }
.il-photo-pick { display:flex; align-items:center; gap:14px; margin-bottom:16px; }
.il-photo-pick .il-team-av { width:64px; height:64px; cursor:pointer; }
.il-rol-pills { display:flex; gap:8px; }
.il-rol-pill { background:var(--surface); border:1px solid var(--line); color:var(--txt-dim); padding:6px 12px; border-radius:999px; font-size:12.5px; font-weight:600; cursor:pointer; }
.il-rol-pill.on { border-color:var(--navy); color:var(--navy); background:rgba(22,40,74,0.06); }
.il-money-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin-bottom:26px; }
.il-money-card { background:var(--surface); border:1px solid var(--line); border-radius:14px; padding:20px; box-shadow:0 4px 14px rgba(22,40,74,0.04); }
.il-money-card .big { font-family:var(--font-disp); font-weight:700; font-size:30px; color:var(--navy); }
.il-money-card .sub { color:var(--txt-dim); font-size:13px; margin-top:6px; font-weight:600; }
.il-actions-row { display:flex; gap:8px; margin-top:18px; flex-wrap:wrap; }
.il-spinner { width:40px; height:40px; border:3px solid var(--line); border-top-color:var(--burgundy); border-radius:50%; animation:spin .8s linear infinite; }
@keyframes spin { to { transform:rotate(360deg); } }
.il-toast { position:fixed; bottom:24px; left:50%; transform:translateX(-50%); background:var(--navy); border:1px solid var(--navy); color:#fff; padding:12px 20px; border-radius:11px; z-index:60; font-size:14px; font-weight:600; box-shadow:0 10px 30px rgba(22,40,74,0.3); }
.il-toast.err { background:var(--red); border-color:var(--red); }
@media (max-width:720px) {
  .il-stats { grid-template-columns:1fr 1fr; }
  .il-money-grid { grid-template-columns:1fr; }
  .il-nav button { padding:8px 10px; font-size:13px; }
  .il-info-grid { grid-template-columns:1fr; }
  .il-page-title { font-size:26px; }
  .il-main { padding:22px 14px 50px; }
  .il-topbar { padding:13px 14px; flex-wrap:wrap; gap:10px; }
  .il-bg-crest { width:420px; height:420px; right:-160px; }
}
`;
