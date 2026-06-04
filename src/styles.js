export const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Archivo:wght@400;500;600;700&family=Archivo+Black&display=swap');
* { box-sizing:border-box; margin:0; padding:0; }
.il-root {
  --bg:#0a0b0d; --surface:#131519; --surface-2:#1b1e24; --line:#2a2e36; --txt:#f2f4f5; --txt-dim:#8b919c;
  --volt:#d6ff3f; --volt-dim:#a8cc2e; --green:#45e08a; --amber:#ffc24b; --red:#ff5d5d;
  --font-disp:'Bricolage Grotesque',sans-serif; --font-body:'Archivo',sans-serif;
  font-family:var(--font-body); background:var(--bg); color:var(--txt); min-height:100vh; width:100%; -webkit-font-smoothing:antialiased;
}
.il-root::selection { background:var(--volt); color:#000; }
.il-bg-grad { position:fixed; inset:0; pointer-events:none; z-index:0; background:radial-gradient(900px 500px at 85% -10%, rgba(214,255,63,0.08), transparent 60%), radial-gradient(700px 400px at -10% 110%, rgba(69,224,138,0.05), transparent 60%); }
.il-shell { position:relative; z-index:1; }
.il-center { min-height:100vh; display:grid; place-items:center; padding:24px; }
.il-login-card { width:100%; max-width:440px; background:var(--surface); border:1px solid var(--line); border-radius:20px; padding:40px 34px; box-shadow:0 30px 80px rgba(0,0,0,0.5); }
.il-logo { display:flex; align-items:center; gap:12px; margin-bottom:28px; }
.il-logo-mark { width:44px; height:44px; border-radius:12px; background:var(--volt); display:grid; place-items:center; color:#000; font-family:'Archivo Black'; font-size:22px; transform:rotate(-6deg); }
.il-logo-txt { font-family:var(--font-disp); font-weight:800; font-size:22px; letter-spacing:-0.5px; }
.il-logo-txt small { display:block; font-family:var(--font-body); font-weight:500; font-size:11px; color:var(--txt-dim); letter-spacing:2px; text-transform:uppercase; }
.il-field { margin-bottom:16px; }
.il-field label { display:block; font-size:12px; color:var(--txt-dim); margin-bottom:7px; text-transform:uppercase; letter-spacing:0.5px; font-weight:600; }
.il-input, .il-select { width:100%; background:var(--surface-2); border:1px solid var(--line); color:var(--txt); padding:12px 14px; border-radius:10px; font-size:15px; font-family:var(--font-body); transition:border-color .15s, box-shadow .15s; }
.il-input:focus, .il-select:focus { outline:none; border-color:var(--volt); box-shadow:0 0 0 3px rgba(214,255,63,0.15); }
.il-input::placeholder { color:#5a606b; }
.il-input.err, .il-select.err { border-color:var(--red); box-shadow:0 0 0 3px rgba(255,93,93,0.12); }
.il-err-msg { color:var(--red); font-size:12px; margin-top:6px; }
.il-btn { background:var(--volt); color:#000; border:none; padding:13px 20px; border-radius:10px; font-family:var(--font-body); font-weight:700; font-size:15px; cursor:pointer; transition:transform .1s, filter .15s; width:100%; }
.il-btn:hover { filter:brightness(1.08); }
.il-btn:active { transform:translateY(1px); }
.il-btn:disabled { opacity:.45; cursor:not-allowed; }
.il-btn.sec { background:var(--surface-2); color:var(--txt); border:1px solid var(--line); }
.il-btn.sec:hover { border-color:var(--volt); }
.il-btn.sm { width:auto; padding:9px 16px; font-size:14px; }
.il-btn.xs { width:auto; padding:5px 11px; font-size:12.5px; border-radius:8px; }
.il-btn.ghost { background:transparent; color:var(--txt-dim); border:1px solid var(--line); }
.il-btn.ghost:hover { color:var(--txt); border-color:var(--txt-dim); }
.il-btn.danger { background:transparent; color:var(--red); border:1px solid rgba(255,93,93,0.4); }
.il-btn.danger:hover { background:rgba(255,93,93,0.1); }
.il-demo-hint { margin-top:22px; font-size:12.5px; color:var(--txt-dim); line-height:1.6; text-align:center; }
.il-demo-hint b { color:var(--volt-dim); }
.il-topbar { display:flex; align-items:center; justify-content:space-between; padding:16px 24px; border-bottom:1px solid var(--line); background:rgba(19,21,25,0.7); backdrop-filter:blur(10px); position:sticky; top:0; z-index:20; }
.il-nav { display:flex; gap:6px; flex-wrap:wrap; }
.il-nav button { background:transparent; border:none; color:var(--txt-dim); font-family:var(--font-body); font-weight:600; font-size:14.5px; padding:8px 14px; border-radius:9px; cursor:pointer; transition:color .15s, background .15s; }
.il-nav button:hover { color:var(--txt); }
.il-nav button.active { color:#000; background:var(--volt); }
.il-user-chip { display:flex; align-items:center; gap:10px; }
.il-avatar { width:34px; height:34px; border-radius:50%; background:var(--surface-2); border:1px solid var(--line); display:grid; place-items:center; font-weight:700; font-size:13px; color:var(--volt); overflow:hidden; flex:none; }
.il-avatar img { width:100%; height:100%; object-fit:cover; }
.il-role-tag { font-size:10px; text-transform:uppercase; letter-spacing:1px; color:var(--txt-dim); }
.il-main { padding:28px 24px 60px; max-width:1080px; margin:0 auto; }
.il-page-title { font-family:var(--font-disp); font-weight:800; font-size:30px; letter-spacing:-1px; margin-bottom:4px; }
.il-page-sub { color:var(--txt-dim); font-size:14px; margin-bottom:26px; }
.il-stats { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-bottom:30px; }
.il-stat { background:var(--surface); border:1px solid var(--line); border-radius:16px; padding:20px; position:relative; overflow:hidden; }
.il-stat .num { font-family:var(--font-disp); font-weight:800; font-size:38px; line-height:1; letter-spacing:-1px; }
.il-stat .lbl { color:var(--txt-dim); font-size:13px; margin-top:8px; font-weight:500; }
.il-stat .bar { position:absolute; left:0; top:0; bottom:0; width:4px; }
.il-stat.s-total .bar { background:var(--volt); }
.il-stat.s-dia .bar { background:var(--green); }
.il-stat.s-venc .bar { background:var(--red); }
.il-stat.s-pv .bar { background:var(--amber); }
.il-section-h { font-family:var(--font-disp); font-weight:700; font-size:18px; margin:8px 0 14px; }
.il-toolbar { display:flex; gap:10px; flex-wrap:wrap; margin-bottom:18px; align-items:center; }
.il-search { flex:1; min-width:200px; }
.il-filters { display:flex; gap:6px; flex-wrap:wrap; }
.il-chip { background:var(--surface-2); border:1px solid var(--line); color:var(--txt-dim); padding:9px 14px; border-radius:999px; font-size:13px; font-weight:600; cursor:pointer; transition:all .15s; font-family:var(--font-body); }
.il-chip:hover { color:var(--txt); }
.il-chip.on { background:var(--txt); color:#000; border-color:var(--txt); }
.il-card-list { display:flex; flex-direction:column; gap:8px; }
.il-row { display:flex; align-items:center; gap:14px; background:var(--surface); border:1px solid var(--line); border-radius:14px; padding:14px 16px; cursor:pointer; transition:border-color .15s, transform .1s; }
.il-row:hover { border-color:#3a4049; transform:translateX(2px); }
.il-dot { width:10px; height:10px; border-radius:50%; flex:none; }
.il-dot.alDia { background:var(--green); box-shadow:0 0 10px rgba(69,224,138,0.5); }
.il-dot.porVencer { background:var(--amber); box-shadow:0 0 10px rgba(255,194,75,0.5); }
.il-dot.vencido { background:var(--red); box-shadow:0 0 10px rgba(255,93,93,0.5); }
.il-row-main { flex:1; min-width:0; }
.il-row-name { font-weight:700; font-size:15.5px; }
.il-row-meta { color:var(--txt-dim); font-size:12.5px; margin-top:2px; }
.il-row-right { text-align:right; flex:none; }
.il-badge { display:inline-block; font-size:11px; font-weight:700; padding:4px 10px; border-radius:999px; text-transform:uppercase; letter-spacing:0.4px; }
.il-badge.alDia { background:rgba(69,224,138,0.13); color:var(--green); }
.il-badge.porVencer { background:rgba(255,194,75,0.13); color:var(--amber); }
.il-badge.vencido { background:rgba(255,93,93,0.13); color:var(--red); }
.il-row-venc { font-size:12px; color:var(--txt-dim); margin-top:5px; }
.il-empty { text-align:center; color:var(--txt-dim); padding:50px 20px; font-size:14px; }
.il-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.6); backdrop-filter:blur(4px); z-index:40; display:grid; place-items:center; padding:20px; animation:fade .2s ease; }
@keyframes fade { from{opacity:0} to{opacity:1} }
.il-modal { width:100%; max-width:560px; max-height:90vh; overflow:auto; background:var(--surface); border:1px solid var(--line); border-radius:20px; padding:28px; animation:pop .2s ease; }
@keyframes pop { from{transform:scale(.96); opacity:0} to{transform:scale(1); opacity:1} }
.il-modal-head { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:20px; }
.il-modal-title { font-family:var(--font-disp); font-weight:800; font-size:24px; letter-spacing:-0.5px; }
.il-close { background:var(--surface-2); border:1px solid var(--line); color:var(--txt-dim); width:34px; height:34px; border-radius:9px; cursor:pointer; font-size:18px; line-height:1; }
.il-close:hover { color:var(--txt); }
.il-info-grid { display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:22px; }
.il-info-item .k { font-size:11px; text-transform:uppercase; letter-spacing:0.5px; color:var(--txt-dim); margin-bottom:3px; font-weight:600; }
.il-info-item .v { font-size:15px; font-weight:600; }
.il-pay-box { background:var(--surface-2); border:1px solid var(--line); border-radius:14px; padding:18px; margin-bottom:22px; }
.il-pay-box h4 { font-size:13px; text-transform:uppercase; letter-spacing:0.5px; color:var(--volt-dim); margin-bottom:14px; }
.il-pay-methods { display:flex; gap:8px; margin-bottom:14px; }
.il-method { flex:1; background:var(--surface); border:1px solid var(--line); color:var(--txt); padding:11px; border-radius:10px; cursor:pointer; font-weight:600; font-size:14px; font-family:var(--font-body); transition:all .15s; }
.il-method.on { border-color:var(--volt); background:rgba(214,255,63,0.08); color:var(--volt); }
.il-aldia-note { background:rgba(69,224,138,0.08); border:1px solid rgba(69,224,138,0.25); color:var(--green); border-radius:12px; padding:13px 16px; font-size:13.5px; line-height:1.5; }
.il-confirm { background:rgba(255,194,75,0.08); border:1px solid rgba(255,194,75,0.3); border-radius:12px; padding:13px 16px; font-size:13px; color:var(--amber); margin-bottom:12px; line-height:1.5; }
.il-danger-confirm { background:rgba(255,93,93,0.08); border:1px solid rgba(255,93,93,0.3); border-radius:12px; padding:13px 16px; font-size:13px; color:var(--red); margin-bottom:12px; line-height:1.5; }
.il-hist h4 { font-size:13px; text-transform:uppercase; letter-spacing:0.5px; color:var(--txt-dim); margin-bottom:12px; }
.il-hist-row { display:flex; justify-content:space-between; align-items:center; padding:11px 0; border-bottom:1px solid var(--line); gap:10px; }
.il-hist-row:last-child { border-bottom:none; }
.il-hist-left .d { font-weight:600; font-size:14px; }
.il-hist-left .m { font-size:12px; color:var(--txt-dim); margin-top:2px; }
.il-hist-amt { font-family:var(--font-disp); font-weight:700; white-space:nowrap; }
.il-tag-met { font-size:10px; padding:2px 7px; border-radius:6px; background:var(--surface-2); color:var(--txt-dim); margin-left:8px; }
.il-plan-card { display:flex; justify-content:space-between; align-items:center; background:var(--surface); border:1px solid var(--line); border-radius:14px; padding:18px 20px; margin-bottom:10px; gap:14px; }
.il-plan-name { font-family:var(--font-disp); font-weight:700; font-size:18px; }
.il-plan-price { font-family:var(--font-disp); font-weight:800; font-size:22px; color:var(--volt); }
.il-banner { background:rgba(214,255,63,0.07); border:1px solid rgba(214,255,63,0.25); border-radius:12px; padding:13px 16px; font-size:13px; color:var(--volt-dim); margin-bottom:22px; line-height:1.5; }
.il-banner b { color:var(--volt); }
.il-team-row { display:flex; align-items:center; gap:14px; background:var(--surface); border:1px solid var(--line); border-radius:14px; padding:14px 16px; margin-bottom:10px; flex-wrap:wrap; }
.il-team-av { width:46px; height:46px; border-radius:50%; background:var(--surface-2); border:1px solid var(--line); display:grid; place-items:center; font-weight:700; color:var(--volt); overflow:hidden; flex:none; }
.il-team-av img { width:100%; height:100%; object-fit:cover; }
.il-photo-pick { display:flex; align-items:center; gap:14px; margin-bottom:16px; }
.il-photo-pick .il-team-av { width:64px; height:64px; cursor:pointer; }
.il-rol-pills { display:flex; gap:8px; }
.il-rol-pill { background:var(--surface); border:1px solid var(--line); color:var(--txt-dim); padding:6px 12px; border-radius:999px; font-size:12.5px; font-weight:600; cursor:pointer; }
.il-rol-pill.on { border-color:var(--volt); color:var(--volt); background:rgba(214,255,63,0.08); }
.il-money-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin-bottom:26px; }
.il-money-card { background:var(--surface); border:1px solid var(--line); border-radius:16px; padding:20px; }
.il-money-card .big { font-family:var(--font-disp); font-weight:800; font-size:30px; letter-spacing:-1px; }
.il-money-card .sub { color:var(--txt-dim); font-size:13px; margin-top:6px; }
.il-actions-row { display:flex; gap:8px; margin-top:18px; flex-wrap:wrap; }
.il-spinner { width:40px; height:40px; border:3px solid var(--line); border-top-color:var(--volt); border-radius:50%; animation:spin .8s linear infinite; }
@keyframes spin { to { transform:rotate(360deg); } }
.il-toast { position:fixed; bottom:24px; left:50%; transform:translateX(-50%); background:var(--surface-2); border:1px solid var(--line); color:var(--txt); padding:12px 20px; border-radius:12px; z-index:60; font-size:14px; font-weight:600; box-shadow:0 10px 30px rgba(0,0,0,0.4); }
.il-toast.err { border-color:var(--red); color:var(--red); }
@media (max-width:720px) {
  .il-stats { grid-template-columns:1fr 1fr; }
  .il-money-grid { grid-template-columns:1fr; }
  .il-nav button { padding:8px 10px; font-size:13px; }
  .il-info-grid { grid-template-columns:1fr; }
  .il-page-title { font-size:25px; }
  .il-main { padding:22px 14px 50px; }
  .il-topbar { padding:14px 14px; flex-wrap:wrap; gap:10px; }
}
`;
