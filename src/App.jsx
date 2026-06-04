import React, { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { supabase } from "./supabaseClient.js";
import { CSS } from "./styles.js";

// ============================================================
//  Helpers de fecha
// ============================================================
const MS_DAY = 86400000;
function toISO(d) { const y = d.getFullYear(); const m = String(d.getMonth() + 1).padStart(2, "0"); const day = String(d.getDate()).padStart(2, "0"); return `${y}-${m}-${day}`; }
function parseISO(s) { return new Date(s + "T00:00:00"); }
function addMonthClamped(iso) {
  const d = parseISO(iso); const day = d.getDate();
  const target = new Date(d.getFullYear(), d.getMonth() + 1, 1);
  const lastDay = new Date(target.getFullYear(), target.getMonth() + 2, 0).getDate();
  target.setDate(Math.min(day, lastDay));
  return toISO(target);
}
function fmtFecha(iso) { if (!iso) return "—"; return parseISO(iso).toLocaleDateString("es-AR", { day: "2-digit", month: "short", year: "numeric" }); }
function fmtPesos(n) { return "$" + Number(n).toLocaleString("es-AR"); }
function mesKey(iso) { return iso.slice(0, 7); }
function mesLabel(key) { const [y, m] = key.split("-"); const d = new Date(Number(y), Number(m) - 1, 1); const s = d.toLocaleDateString("es-AR", { month: "long", year: "numeric" }); return s.charAt(0).toUpperCase() + s.slice(1); }
const HOY = toISO(new Date());
function calcEstado(v) { const diff = Math.round((parseISO(v).getTime() - parseISO(HOY).getTime()) / MS_DAY); if (diff < 0) return { key: "vencido", label: "Vencido" }; if (diff <= 3) return { key: "porVencer", label: "Por vencer" }; return { key: "alDia", label: "Al día" }; }
const emailOk = (m) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(m);

// ============================================================
//  APP
// ============================================================
export default function App() {
  const [sesion, setSesion] = useState(null);
  const [perfil, setPerfil] = useState(null);
  const [cargandoSesion, setCargandoSesion] = useState(true);

  const [planes, setPlanes] = useState([]);
  const [socios, setSocios] = useState([]);
  const [equipo, setEquipo] = useState([]);
  const [cargandoDatos, setCargandoDatos] = useState(false);

  const [tab, setTab] = useState("dashboard");
  const [selected, setSelected] = useState(null);
  const [showAlta, setShowAlta] = useState(false);
  const [editSocio, setEditSocio] = useState(null);
  const [showPerfil, setShowPerfil] = useState(false);
  const [query, setQuery] = useState("");
  const [filtro, setFiltro] = useState("todos");
  const [toast, setToast] = useState(null);

  const aviso = useCallback((msg, esError = false) => { setToast({ msg, esError }); setTimeout(() => setToast(null), 2800); }, []);

  // ---- Sesión ----
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => { setSesion(data.session); setCargandoSesion(false); });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSesion(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  // ---- Cargar perfil propio ----
  useEffect(() => {
    if (!sesion) { setPerfil(null); return; }
    supabase.from("perfiles").select("*").eq("id", sesion.user.id).single()
      .then(({ data }) => setPerfil(data));
  }, [sesion]);

  // ---- Cargar todos los datos ----
  const cargarDatos = useCallback(async () => {
    setCargandoDatos(true);
    const [pl, so, pa, eq] = await Promise.all([
      supabase.from("planes").select("*").order("precio"),
      supabase.from("socios").select("*"),
      supabase.from("pagos").select("*").order("fecha"),
      supabase.from("perfiles").select("*"),
    ]);
    setPlanes(pl.data || []);
    setEquipo(eq.data || []);
    const pagosPorSocio = {};
    (pa.data || []).forEach((p) => { (pagosPorSocio[p.socio_id] ||= []).push(p); });
    const arr = (so.data || []).map((s) => ({ ...s, pagos: pagosPorSocio[s.id] || [] }));
    arr.sort((a, b) => parseISO(a.vencimiento) - parseISO(b.vencimiento));
    setSocios(arr);
    setCargandoDatos(false);
  }, []);

  useEffect(() => { if (sesion && perfil) cargarDatos(); }, [sesion, perfil, cargarDatos]);

  const planById = (id) => planes.find((p) => p.id === id) || { nombre: "—", precio: 0 };
  const enriched = useMemo(() => socios.map((s) => ({ ...s, estado: calcEstado(s.vencimiento), plan: planById(s.plan_id) })), [socios, planes]);
  const stats = useMemo(() => ({
    total: enriched.length,
    alDia: enriched.filter((s) => s.estado.key === "alDia").length,
    porVencer: enriched.filter((s) => s.estado.key === "porVencer").length,
    vencido: enriched.filter((s) => s.estado.key === "vencido").length,
  }), [enriched]);
  const filtered = useMemo(() => enriched
    .filter((s) => (filtro === "todos" ? true : s.estado.key === filtro))
    .filter((s) => { const q = query.trim().toLowerCase(); return !q || (`${s.nombre} ${s.apellido} ${s.mail}`).toLowerCase().includes(q); }), [enriched, filtro, query]);

  // ---- Acciones ----
  async function registrarPago(socioId, metodo) {
    const socio = socios.find((s) => s.id === socioId);
    if (socio.pagos.some((p) => p.fecha === HOY)) { aviso("Ya hay un pago registrado hoy", true); return; }
    const nuevoVenc = addMonthClamped(HOY);
    const e1 = await supabase.from("pagos").insert({ socio_id: socioId, fecha: HOY, monto: planById(socio.plan_id).precio, metodo, registrado_por: perfil.nombre });
    const e2 = await supabase.from("socios").update({ vencimiento: nuevoVenc }).eq("id", socioId);
    if (e1.error || e2.error) { aviso("Error al registrar el pago", true); return; }
    aviso("Pago registrado ✓"); await cargarDatos();
  }
  async function anularPago(socioId, pagoId) {
    await supabase.from("pagos").delete().eq("id", pagoId);
    const socio = socios.find((s) => s.id === socioId);
    const quedan = socio.pagos.filter((p) => p.id !== pagoId);
    const nuevoVenc = quedan.length ? addMonthClamped(quedan.map((p) => p.fecha).sort().slice(-1)[0]) : socio.alta;
    await supabase.from("socios").update({ vencimiento: nuevoVenc }).eq("id", socioId);
    aviso("Pago anulado"); await cargarDatos();
  }
  async function altaSocio(data) {
    const venc = addMonthClamped(HOY);
    const { data: nuevo, error } = await supabase.from("socios").insert({ nombre: data.nombre, apellido: data.apellido, mail: data.mail, tel: data.tel || null, plan_id: data.planId, alta: HOY, vencimiento: venc }).select().single();
    if (error) { aviso("Error al crear socio", true); return; }
    await supabase.from("pagos").insert({ socio_id: nuevo.id, fecha: HOY, monto: planById(data.planId).precio, metodo: data.metodoInicial, registrado_por: perfil.nombre });
    setShowAlta(false); aviso("Socio creado ✓"); await cargarDatos();
  }
  async function guardarEdicionSocio(id, data) {
    const { error } = await supabase.from("socios").update({ nombre: data.nombre, apellido: data.apellido, mail: data.mail, tel: data.tel || null, plan_id: data.planId }).eq("id", id);
    if (error) { aviso("Error al guardar", true); return; }
    setEditSocio(null); aviso("Datos actualizados ✓"); await cargarDatos();
  }
  async function eliminarSocio(id) {
    await supabase.from("socios").delete().eq("id", id);
    setSelected(null); aviso("Socio eliminado"); await cargarDatos();
  }
  async function guardarPlan(id, nombre, precio) {
    await supabase.from("planes").update({ nombre, precio: Number(precio) || 0 }).eq("id", id);
    aviso("Plan actualizado ✓"); await cargarDatos();
  }
  async function actualizarRolEquipo(id, rol) {
    await supabase.from("perfiles").update({ rol }).eq("id", id);
    aviso("Rol actualizado ✓"); await cargarDatos();
  }
  async function crearUsuario(data) {
    const { data: fn, error } = await supabase.functions.invoke("crear-usuario", { body: data });
    if (error || fn?.error) { aviso(fn?.error || "Error al crear el perfil", true); return false; }
    aviso("Perfil creado ✓"); await cargarDatos(); return true;
  }
  async function actualizarMiPerfil(patch) {
    await supabase.from("perfiles").update(patch).eq("id", perfil.id);
    if (patch.pass) await supabase.auth.updateUser({ password: patch.pass });
    setPerfil((p) => ({ ...p, ...patch })); setShowPerfil(false); aviso("Perfil actualizado ✓"); await cargarDatos();
  }
  async function logout() { await supabase.auth.signOut(); setTab("dashboard"); }

  const selectedSocio = enriched.find((s) => s.id === selected);
  const esDueño = perfil && perfil.rol === "dueño";

  // ---- Render ----
  if (cargandoSesion) return <Root><div className="il-center"><div className="il-spinner" /></div></Root>;
  if (!sesion) return <Root><Login aviso={aviso} /></Root>;
  if (!perfil) return <Root><div className="il-center"><div className="il-spinner" /></div></Root>;

  return (
    <Root>
      <TopBar perfil={perfil} tab={tab} setTab={setTab} onOpenProfile={() => setShowPerfil(true)} onLogout={logout} esDueño={esDueño} />
      <main className="il-main">
        {cargandoDatos && socios.length === 0 ? <div className="il-center" style={{ minHeight: "40vh" }}><div className="il-spinner" /></div> : (
          <>
            {tab === "dashboard" && <Dashboard stats={stats} enriched={enriched} onOpen={setSelected} perfil={perfil} />}
            {tab === "socios" && <Socios filtered={filtered} query={query} setQuery={setQuery} filtro={filtro} setFiltro={setFiltro} onOpen={setSelected} onAlta={() => setShowAlta(true)} />}
            {tab === "cobros" && <Cobros socios={socios} planById={planById} />}
            {tab === "planes" && esDueño && <Planes planes={planes} onSave={guardarPlan} />}
            {tab === "equipo" && esDueño && <Equipo equipo={equipo} perfil={perfil} onRol={actualizarRolEquipo} onCrear={crearUsuario} />}
          </>
        )}
      </main>
      {selectedSocio && <FichaSocio socio={selectedSocio} onClose={() => setSelected(null)} onPay={registrarPago} onAnular={anularPago} onEditar={() => setEditSocio(selectedSocio)} onEliminar={eliminarSocio} />}
      {showAlta && <SocioForm modo="alta" planes={planes} onClose={() => setShowAlta(false)} onSave={altaSocio} />}
      {editSocio && <SocioForm modo="editar" planes={planes} socio={editSocio} onClose={() => setEditSocio(null)} onSave={(d) => guardarEdicionSocio(editSocio.id, d)} />}
      {showPerfil && <PerfilModal perfil={perfil} onClose={() => setShowPerfil(false)} onSave={actualizarMiPerfil} />}
      {toast && <div className={"il-toast" + (toast.esError ? " err" : "")}>{toast.msg}</div>}
    </Root>
  );
}

function Root({ children }) {
  return (
    <div className="il-root">
      <style>{CSS}</style>
      <div className="il-bg-grad" />
      <div className="il-bg-crest"><Crest /></div>
      <div className="il-shell">{children}</div>
    </div>
  );
}

// Emblema original estilo crest deportivo (escudo + monograma N + ráfagas)
function Emblem({ size = 46 }) {
  return (
    <svg className="il-logo-emblem" style={{ width: size, height: size }} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 4 L90 18 V52 C90 76 72 90 50 96 C28 90 10 76 10 52 V18 Z" fill="#16284a" />
      <path d="M50 12 L82 23 V52 C82 71 68 83 50 88 C32 83 18 71 18 52 V23 Z" fill="none" stroke="#f4efe5" strokeWidth="2.5" />
      <circle cx="50" cy="48" r="22" fill="#8a2433" />
      <circle cx="50" cy="48" r="22" fill="none" stroke="#f4efe5" strokeWidth="2" />
      <text x="50" y="59" fontFamily="Oswald, sans-serif" fontSize="30" fontWeight="700" fill="#f4efe5" textAnchor="middle">N</text>
    </svg>
  );
}

// Versión grande y discreta para el fondo
function Crest() {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 4 L90 18 V52 C90 76 72 90 50 96 C28 90 10 76 10 52 V18 Z" fill="#16284a" />
      <circle cx="50" cy="48" r="22" fill="#8a2433" />
      <text x="50" y="59" fontFamily="Oswald, sans-serif" fontSize="30" fontWeight="700" fill="#f4efe5" textAnchor="middle">N</text>
    </svg>
  );
}

// ---------- LOGIN ----------
function Login({ aviso }) {
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  async function entrar() {
    setError(""); setCargando(true);
    const { error } = await supabase.auth.signInWithPassword({ email: mail.trim(), password: pass });
    setCargando(false);
    if (error) setError("Mail o contraseña incorrectos.");
  }
  return (
    <div className="il-center">
      <div className="il-login-card">
        <div className="il-logo"><Emblem /><div className="il-logo-txt">NanoGYM<small>Gestión de gimnasio</small></div></div>
        <div className="il-field"><label>Mail</label><input className="il-input" value={mail} onChange={(e) => setMail(e.target.value)} placeholder="tu@mail.com" onKeyDown={(e) => e.key === "Enter" && entrar()} /></div>
        <div className="il-field"><label>Contraseña</label><input className="il-input" type="password" value={pass} onChange={(e) => setPass(e.target.value)} onKeyDown={(e) => e.key === "Enter" && entrar()} /></div>
        {error && <div className="il-err-msg" style={{ marginBottom: 12 }}>{error}</div>}
        <button className="il-btn" onClick={entrar} disabled={cargando || !mail || !pass}>{cargando ? "Ingresando…" : "Ingresar"}</button>
      </div>
    </div>
  );
}

// ---------- TOPBAR ----------
function TopBar({ perfil, tab, setTab, onOpenProfile, onLogout, esDueño }) {
  const tabs = [{ k: "dashboard", l: "Inicio" }, { k: "socios", l: "Socios" }, { k: "cobros", l: "Cobros" }];
  if (esDueño) tabs.push({ k: "planes", l: "Planes" }, { k: "equipo", l: "Equipo" });
  return (
    <header className="il-topbar">
      <div className="il-logo" style={{ marginBottom: 0 }}><Emblem size={34} /><div className="il-logo-txt" style={{ fontSize: 19 }}>NanoGYM</div></div>
      <nav className="il-nav">{tabs.map((t) => <button key={t.k} className={tab === t.k ? "active" : ""} onClick={() => setTab(t.k)}>{t.l}</button>)}</nav>
      <div className="il-user-chip">
        <div onClick={onOpenProfile} title="Mi perfil" style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", padding: "4px 8px", borderRadius: 10 }}>
          <div style={{ textAlign: "right" }}><div style={{ fontSize: 13.5, fontWeight: 700 }}>{perfil.nombre}</div><div className="il-role-tag">{perfil.rol} · editar</div></div>
          <div className="il-avatar">{perfil.foto ? <img src={perfil.foto} alt="" /> : perfil.nombre[0]}</div>
        </div>
        <button className="il-close" title="Salir" onClick={onLogout}>⏻</button>
      </div>
    </header>
  );
}

// ---------- DASHBOARD ----------
function Dashboard({ stats, enriched, onOpen, perfil }) {
  const atencion = enriched.filter((s) => s.estado.key !== "alDia").sort((a, b) => parseISO(a.vencimiento) - parseISO(b.vencimiento));
  return (
    <>
      <h1 className="il-page-title">Hola, {perfil.nombre} 👋</h1>
      <p className="il-page-sub">Resumen al {fmtFecha(HOY)}</p>
      <div className="il-stats">
        <div className="il-stat s-total"><span className="bar" /><div className="num">{stats.total}</div><div className="lbl">Socios activos</div></div>
        <div className="il-stat s-dia"><span className="bar" /><div className="num" style={{ color: "var(--green)" }}>{stats.alDia}</div><div className="lbl">Al día</div></div>
        <div className="il-stat s-pv"><span className="bar" /><div className="num" style={{ color: "var(--amber)" }}>{stats.porVencer}</div><div className="lbl">Por vencer (≤3 días)</div></div>
        <div className="il-stat s-venc"><span className="bar" /><div className="num" style={{ color: "var(--red)" }}>{stats.vencido}</div><div className="lbl">Vencidos</div></div>
      </div>
      <h3 className="il-section-h">Requieren atención</h3>
      {atencion.length === 0 ? <div className="il-empty">Todo en orden. Nadie con cuota pendiente. 🎉</div> : <div className="il-card-list">{atencion.map((s) => <SocioRow key={s.id} s={s} onOpen={onOpen} />)}</div>}
    </>
  );
}

// ---------- SOCIOS ----------
function Socios({ filtered, query, setQuery, filtro, setFiltro, onOpen, onAlta }) {
  const chips = [{ k: "todos", l: "Todos" }, { k: "alDia", l: "Al día" }, { k: "porVencer", l: "Por vencer" }, { k: "vencido", l: "Vencidos" }];
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
        <div><h1 className="il-page-title">Socios</h1><p className="il-page-sub">{filtered.length} resultado(s)</p></div>
        <button className="il-btn sm" onClick={onAlta}>+ Nuevo socio</button>
      </div>
      <div className="il-toolbar">
        <div className="il-search"><input className="il-input" placeholder="Buscar por nombre, apellido o mail…" value={query} onChange={(e) => setQuery(e.target.value)} /></div>
        <div className="il-filters">{chips.map((c) => <button key={c.k} className={"il-chip" + (filtro === c.k ? " on" : "")} onClick={() => setFiltro(c.k)}>{c.l}</button>)}</div>
      </div>
      {filtered.length === 0 ? <div className="il-empty">No hay socios que coincidan.</div> : <div className="il-card-list">{filtered.map((s) => <SocioRow key={s.id} s={s} onOpen={onOpen} />)}</div>}
    </>
  );
}
function SocioRow({ s, onOpen }) {
  const e = s.estado;
  return (
    <div className="il-row" onClick={() => onOpen(s.id)}>
      <span className={"il-dot " + e.key} />
      <div className="il-row-main"><div className="il-row-name">{s.nombre} {s.apellido}</div><div className="il-row-meta">{s.plan.nombre} · {s.mail}</div></div>
      <div className="il-row-right"><span className={"il-badge " + e.key}>{e.label}</span><div className="il-row-venc">{e.key === "vencido" ? `Venció el ${fmtFecha(s.vencimiento)}` : `Vence ${fmtFecha(s.vencimiento)}`}</div></div>
    </div>
  );
}

// ---------- COBROS ----------
function Cobros({ socios, planById }) {
  const pagos = useMemo(() => {
    const out = [];
    socios.forEach((s) => s.pagos.forEach((p) => out.push({ ...p, socio: `${s.nombre} ${s.apellido}`, plan: planById(s.plan_id).nombre })));
    return out.sort((a, b) => (a.fecha < b.fecha ? 1 : -1));
  }, [socios, planById]);
  const meses = useMemo(() => { const set = new Set(pagos.map((p) => mesKey(p.fecha))); set.add(mesKey(HOY)); return Array.from(set).sort().reverse(); }, [pagos]);
  const [mes, setMes] = useState(mesKey(HOY));
  const delMes = pagos.filter((p) => mesKey(p.fecha) === mes);
  const total = delMes.reduce((a, p) => a + Number(p.monto), 0);
  const efectivo = delMes.filter((p) => p.metodo === "Efectivo").reduce((a, p) => a + Number(p.monto), 0);
  const mp = delMes.filter((p) => p.metodo === "Mercado Pago").reduce((a, p) => a + Number(p.monto), 0);
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
        <div><h1 className="il-page-title">Cobros</h1><p className="il-page-sub">Historial de pagos registrados</p></div>
        <select className="il-select" style={{ width: "auto" }} value={mes} onChange={(e) => setMes(e.target.value)}>{meses.map((m) => <option key={m} value={m}>{mesLabel(m)}</option>)}</select>
      </div>
      <div className="il-money-grid">
        <div className="il-money-card"><div className="big" style={{ color: "var(--volt)" }}>{fmtPesos(total)}</div><div className="sub">Total del mes · {delMes.length} cobro(s)</div></div>
        <div className="il-money-card"><div className="big">{fmtPesos(efectivo)}</div><div className="sub">💵 Efectivo</div></div>
        <div className="il-money-card"><div className="big">{fmtPesos(mp)}</div><div className="sub">📱 Mercado Pago</div></div>
      </div>
      <h3 className="il-section-h">Detalle de {mesLabel(mes)}</h3>
      {delMes.length === 0 ? <div className="il-empty">No hay cobros registrados en este mes.</div> : (
        <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 14, padding: "4px 18px" }}>
          {delMes.map((p) => (
            <div className="il-hist-row" key={p.id}>
              <div className="il-hist-left"><div className="d">{p.socio}<span className="il-tag-met">{p.metodo}</span></div><div className="m">{fmtFecha(p.fecha)} · {p.plan} · registró {p.registrado_por || "—"}</div></div>
              <div className="il-hist-amt">{fmtPesos(p.monto)}</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

// ---------- FICHA SOCIO ----------
function FichaSocio({ socio, onClose, onPay, onAnular, onEditar, onEliminar }) {
  const [metodo, setMetodo] = useState("Efectivo");
  const [confirmAdelanto, setConfirmAdelanto] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [anularId, setAnularId] = useState(null);
  const e = socio.estado;
  const pagoHoy = socio.pagos.find((p) => p.fecha === HOY);
  const puedeCobrarDirecto = e.key === "vencido" || e.key === "porVencer";
  const Cobrar = () => <button className="il-btn" onClick={() => { onPay(socio.id, metodo); }}>Cobrar {fmtPesos(socio.plan.precio)} · vence el {fmtFecha(addMonthClamped(HOY))}</button>;
  const histOrdenado = [...socio.pagos].sort((a, b) => (a.fecha < b.fecha ? 1 : -1));
  return (
    <div className="il-overlay" onClick={onClose}>
      <div className="il-modal" onClick={(ev) => ev.stopPropagation()}>
        <div className="il-modal-head"><div><div className="il-modal-title">{socio.nombre} {socio.apellido}</div><span className={"il-badge " + e.key} style={{ marginTop: 8, display: "inline-block" }}>{e.label}</span></div><button className="il-close" onClick={onClose}>×</button></div>
        <div className="il-info-grid">
          <div className="il-info-item"><div className="k">Plan</div><div className="v">{socio.plan.nombre} · {fmtPesos(socio.plan.precio)}</div></div>
          <div className="il-info-item"><div className="k">Próximo vencimiento</div><div className="v">{fmtFecha(socio.vencimiento)}</div></div>
          <div className="il-info-item"><div className="k">Mail</div><div className="v" style={{ fontWeight: 500, fontSize: 14 }}>{socio.mail}</div></div>
          <div className="il-info-item"><div className="k">Teléfono</div><div className="v" style={{ fontWeight: 500, fontSize: 14 }}>{socio.tel || "—"}</div></div>
          <div className="il-info-item"><div className="k">Socio desde</div><div className="v" style={{ fontWeight: 500, fontSize: 14 }}>{fmtFecha(socio.alta)}</div></div>
        </div>
        <div className="il-pay-box">
          <h4>Registrar pago de hoy</h4>
          {pagoHoy ? <div className="il-aldia-note">✓ Ya se registró un pago hoy ({pagoHoy.metodo}). El próximo vence el {fmtFecha(socio.vencimiento)}.</div> : (
            <>
              <div className="il-pay-methods">
                <button className={"il-method" + (metodo === "Efectivo" ? " on" : "")} onClick={() => setMetodo("Efectivo")}>💵 Efectivo</button>
                <button className={"il-method" + (metodo === "Mercado Pago" ? " on" : "")} onClick={() => setMetodo("Mercado Pago")}>📱 Mercado Pago</button>
              </div>
              {puedeCobrarDirecto ? <Cobrar /> : confirmAdelanto ? (
                <>
                  <div className="il-confirm">Está al día hasta el {fmtFecha(socio.vencimiento)}. Si cobrás ahora, el ciclo se reinicia desde hoy y el próximo vencimiento pasa a ser el {fmtFecha(addMonthClamped(HOY))}. ¿Confirmás?</div>
                  <div style={{ display: "flex", gap: 8 }}><button className="il-btn ghost" onClick={() => setConfirmAdelanto(false)}>Cancelar</button><Cobrar /></div>
                </>
              ) : (
                <>
                  <div className="il-aldia-note" style={{ marginBottom: 12 }}>Está al día hasta el {fmtFecha(socio.vencimiento)}. No hace falta cobrar todavía.</div>
                  <button className="il-btn sec" onClick={() => setConfirmAdelanto(true)}>Registrar pago adelantado igual</button>
                </>
              )}
            </>
          )}
        </div>
        <div className="il-hist">
          <h4>Historial de pagos ({socio.pagos.length})</h4>
          {histOrdenado.length === 0 && <div className="il-empty" style={{ padding: "20px 0" }}>Sin pagos registrados.</div>}
          {histOrdenado.map((p) => (
            <div className="il-hist-row" key={p.id}>
              <div className="il-hist-left"><div className="d">{fmtFecha(p.fecha)}<span className="il-tag-met">{p.metodo}</span></div><div className="m">Registrado por {p.registrado_por || "—"}</div></div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div className="il-hist-amt">{fmtPesos(p.monto)}</div>
                {anularId === p.id ? (
                  <><button className="il-btn xs ghost" onClick={() => setAnularId(null)}>No</button><button className="il-btn xs danger" onClick={() => { onAnular(socio.id, p.id); setAnularId(null); }}>Anular</button></>
                ) : <button className="il-btn xs ghost" title="Anular este pago" onClick={() => setAnularId(p.id)}>✕</button>}
              </div>
            </div>
          ))}
        </div>
        <div className="il-actions-row">
          <button className="il-btn sec sm" onClick={onEditar}>✎ Editar datos</button>
          {confirmDelete ? <><button className="il-btn ghost sm" onClick={() => setConfirmDelete(false)}>Cancelar</button><button className="il-btn danger sm" onClick={() => onEliminar(socio.id)}>Sí, eliminar socio</button></> : <button className="il-btn danger sm" onClick={() => setConfirmDelete(true)}>🗑 Eliminar socio</button>}
        </div>
        {confirmDelete && <div className="il-danger-confirm" style={{ marginTop: 12, marginBottom: 0 }}>Se borra el socio y todo su historial de pagos. Esta acción no se puede deshacer.</div>}
      </div>
    </div>
  );
}

// ---------- FORM SOCIO ----------
function SocioForm({ modo, planes, socio, onClose, onSave }) {
  const init = socio ? { nombre: socio.nombre, apellido: socio.apellido, mail: socio.mail, tel: socio.tel || "", planId: socio.plan_id, metodoInicial: "Efectivo" } : { nombre: "", apellido: "", mail: "", tel: "", planId: planes[0]?.id, metodoInicial: "Efectivo" };
  const [f, setF] = useState(init);
  const [touched, setTouched] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const esAlta = modo === "alta";
  const errors = { nombre: !f.nombre.trim() ? "Ingresá el nombre." : null, apellido: !f.apellido.trim() ? "Ingresá el apellido." : null, mail: !f.mail.trim() ? "Ingresá el mail." : !emailOk(f.mail) ? "El mail no tiene un formato válido (ej: nombre@mail.com)." : null };
  const hayErrores = Object.values(errors).some(Boolean);
  const showErr = (k) => touched && errors[k];
  async function intentar() { setTouched(true); if (hayErrores) return; setGuardando(true); await onSave(f); setGuardando(false); }
  return (
    <div className="il-overlay" onClick={onClose}>
      <div className="il-modal" onClick={(ev) => ev.stopPropagation()}>
        <div className="il-modal-head"><div className="il-modal-title">{esAlta ? "Nuevo socio" : "Editar socio"}</div><button className="il-close" onClick={onClose}>×</button></div>
        <div className="il-info-grid">
          <div className="il-field"><label>Nombre</label><input className={"il-input" + (showErr("nombre") ? " err" : "")} value={f.nombre} onChange={set("nombre")} />{showErr("nombre") && <div className="il-err-msg">{errors.nombre}</div>}</div>
          <div className="il-field"><label>Apellido</label><input className={"il-input" + (showErr("apellido") ? " err" : "")} value={f.apellido} onChange={set("apellido")} />{showErr("apellido") && <div className="il-err-msg">{errors.apellido}</div>}</div>
          <div className="il-field"><label>Mail</label><input className={"il-input" + (showErr("mail") ? " err" : "")} value={f.mail} onChange={set("mail")} placeholder="ejemplo@mail.com" />{showErr("mail") && <div className="il-err-msg">{errors.mail}</div>}</div>
          <div className="il-field"><label>Teléfono <span style={{ textTransform: "none", color: "#5a606b" }}>(opcional)</span></label><input className="il-input" value={f.tel} onChange={set("tel")} placeholder="11 …" /></div>
          <div className="il-field"><label>Plan</label><select className="il-select" value={f.planId} onChange={set("planId")}>{planes.map((p) => <option key={p.id} value={p.id}>{p.nombre} — {fmtPesos(p.precio)}</option>)}</select></div>
          {esAlta && <div className="il-field"><label>Pago inicial</label><select className="il-select" value={f.metodoInicial} onChange={set("metodoInicial")}><option>Efectivo</option><option>Mercado Pago</option></select></div>}
        </div>
        {esAlta && <div className="il-banner">Al dar de alta se registra el <b>primer pago hoy</b> ({fmtFecha(HOY)}) y el próximo vencimiento queda el <b>{fmtFecha(addMonthClamped(HOY))}</b>.</div>}
        <button className="il-btn" onClick={intentar} disabled={guardando}>{guardando ? "Guardando…" : esAlta ? "Crear socio" : "Guardar cambios"}</button>
      </div>
    </div>
  );
}

// ---------- PLANES ----------
function Planes({ planes, onSave }) {
  const [editId, setEditId] = useState(null);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  function empezar(p) { setEditId(p.id); setNombre(p.nombre); setPrecio(String(p.precio)); }
  function guardar() { onSave(editId, nombre.trim() || "Plan", precio); setEditId(null); }
  return (
    <>
      <h1 className="il-page-title">Planes</h1>
      <p className="il-page-sub">Configuración general · solo Dueño</p>
      <div className="il-banner"><b>Recordatorios automáticos:</b> el sistema enviará un aviso <b>3 días antes</b> del vencimiento y otro el <b>día del vencimiento</b>. (Los mails se activan en el paso siguiente.)</div>
      {planes.map((p) => (
        <div className="il-plan-card" key={p.id}>
          {editId === p.id ? (
            <>
              <div style={{ flex: 1, display: "flex", gap: 10, flexWrap: "wrap" }}>
                <input className="il-input" style={{ flex: 2, minWidth: 140 }} value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre del plan" />
                <input className="il-input" style={{ flex: 1, minWidth: 110 }} type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} placeholder="Precio" />
              </div>
              <div style={{ display: "flex", gap: 8 }}><button className="il-btn ghost sm" onClick={() => setEditId(null)}>Cancelar</button><button className="il-btn sm" onClick={guardar}>Guardar</button></div>
            </>
          ) : (
            <>
              <div><div className="il-plan-name">{p.nombre}</div><div style={{ color: "var(--txt-dim)", fontSize: 13, marginTop: 4 }}>Renovación mensual</div></div>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}><div className="il-plan-price">{fmtPesos(p.precio)}</div><button className="il-btn ghost sm" onClick={() => empezar(p)}>Editar</button></div>
            </>
          )}
        </div>
      ))}
    </>
  );
}

// ---------- EQUIPO ----------
function Equipo({ equipo, perfil, onRol, onCrear }) {
  const [showNuevo, setShowNuevo] = useState(false);
  const dueños = equipo.filter((u) => u.rol === "dueño").length;
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
        <div><h1 className="il-page-title">Equipo</h1><p className="il-page-sub">Perfiles que pueden ingresar al sistema · solo Dueño</p></div>
        <button className="il-btn sm" onClick={() => setShowNuevo(true)}>+ Nuevo perfil</button>
      </div>
      {equipo.map((u) => {
        const esYo = u.id === perfil.id;
        const ultimoDueño = u.rol === "dueño" && dueños === 1;
        return (
          <div className="il-team-row" key={u.id}>
            <div className="il-team-av">{u.foto ? <img src={u.foto} alt="" /> : u.nombre[0]}</div>
            <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontWeight: 700, fontSize: 15.5 }}>{u.nombre} {esYo && <span style={{ color: "var(--txt-dim)", fontWeight: 500, fontSize: 12 }}>(vos)</span>}</div></div>
            <div className="il-rol-pills">
              <button className={"il-rol-pill" + (u.rol === "empleado" ? " on" : "")} disabled={ultimoDueño} onClick={() => !ultimoDueño && onRol(u.id, "empleado")}>Empleado</button>
              <button className={"il-rol-pill" + (u.rol === "dueño" ? " on" : "")} onClick={() => onRol(u.id, "dueño")}>Dueño</button>
            </div>
          </div>
        );
      })}
      <div className="il-banner" style={{ marginTop: 18 }}>Podés tener <b>más de un dueño</b>. El <b>Dueño</b> gestiona planes, equipo y todo lo demás. El <b>Empleado</b> gestiona socios, pagos y cobros.</div>
      {showNuevo && <NuevoUsuarioModal onClose={() => setShowNuevo(false)} onCrear={onCrear} />}
    </>
  );
}

function NuevoUsuarioModal({ onClose, onCrear }) {
  const [f, setF] = useState({ nombre: "", mail: "", password: "", rol: "empleado", foto: null });
  const [touched, setTouched] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const fileRef = useRef(null);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const errors = {
    nombre: !f.nombre.trim() ? "Ingresá el nombre." : null,
    mail: !f.mail.trim() ? "Ingresá el mail." : !emailOk(f.mail) ? "El mail no tiene un formato válido." : null,
    password: !f.password ? "Ingresá una contraseña." : f.password.length < 6 ? "Mínimo 6 caracteres." : null,
  };
  const hayErrores = Object.values(errors).some(Boolean);
  const showErr = (k) => touched && errors[k];
  function onFile(e) { const file = e.target.files?.[0]; if (!file) return; const r = new FileReader(); r.onload = () => setF((p) => ({ ...p, foto: r.result })); r.readAsDataURL(file); }
  async function intentar() {
    setTouched(true); if (hayErrores) return;
    setGuardando(true);
    const ok = await onCrear({ nombre: f.nombre.trim(), mail: f.mail.trim(), password: f.password, rol: f.rol, foto: f.foto });
    setGuardando(false);
    if (ok) onClose();
  }
  return (
    <div className="il-overlay" onClick={onClose}>
      <div className="il-modal" onClick={(ev) => ev.stopPropagation()}>
        <div className="il-modal-head"><div className="il-modal-title">Nuevo perfil</div><button className="il-close" onClick={onClose}>×</button></div>
        <div className="il-photo-pick">
          <div className="il-team-av" onClick={() => fileRef.current?.click()} title="Subir foto">{f.foto ? <img src={f.foto} alt="" /> : "+"}</div>
          <div>
            <button className="il-btn ghost sm" onClick={() => fileRef.current?.click()}>Subir foto</button>
            {f.foto && <button className="il-btn ghost sm" style={{ marginLeft: 8 }} onClick={() => setF({ ...f, foto: null })}>Quitar</button>}
            <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={onFile} />
          </div>
        </div>
        <div className="il-field"><label>Nombre</label><input className={"il-input" + (showErr("nombre") ? " err" : "")} value={f.nombre} onChange={set("nombre")} />{showErr("nombre") && <div className="il-err-msg">{errors.nombre}</div>}</div>
        <div className="il-field"><label>Mail</label><input className={"il-input" + (showErr("mail") ? " err" : "")} value={f.mail} onChange={set("mail")} placeholder="persona@gym.com" />{showErr("mail") && <div className="il-err-msg">{errors.mail}</div>}</div>
        <div className="il-field"><label>Contraseña</label><input className={"il-input" + (showErr("password") ? " err" : "")} type="text" value={f.password} onChange={set("password")} placeholder="Con la que va a ingresar" />{showErr("password") && <div className="il-err-msg">{errors.password}</div>}</div>
        <div className="il-field"><label>Rol</label><div className="il-rol-pills"><button className={"il-rol-pill" + (f.rol === "empleado" ? " on" : "")} onClick={() => setF({ ...f, rol: "empleado" })}>Empleado</button><button className={"il-rol-pill" + (f.rol === "dueño" ? " on" : "")} onClick={() => setF({ ...f, rol: "dueño" })}>Dueño</button></div></div>
        <button className="il-btn" style={{ marginTop: 8 }} onClick={intentar} disabled={guardando}>{guardando ? "Creando…" : "Crear perfil"}</button>
      </div>
    </div>
  );
}

// ---------- PERFIL ----------
function PerfilModal({ perfil, onClose, onSave }) {
  const [f, setF] = useState({ nombre: perfil.nombre, foto: perfil.foto || null });
  const [pass, setPass] = useState("");
  const [touched, setTouched] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const fileRef = useRef(null);
  const errNombre = touched && !f.nombre.trim() ? "Ingresá tu nombre." : null;
  function onFile(e) { const file = e.target.files?.[0]; if (!file) return; const r = new FileReader(); r.onload = () => setF((p) => ({ ...p, foto: r.result })); r.readAsDataURL(file); }
  async function intentar() { setTouched(true); if (!f.nombre.trim()) return; setGuardando(true); const patch = { nombre: f.nombre.trim(), foto: f.foto }; if (pass) patch.pass = pass; await onSave(patch); setGuardando(false); }
  return (
    <div className="il-overlay" onClick={onClose}>
      <div className="il-modal" onClick={(ev) => ev.stopPropagation()}>
        <div className="il-modal-head"><div><div className="il-modal-title">Mi perfil</div><span className="il-role-tag" style={{ marginTop: 6, display: "block" }}>Rol: {perfil.rol}</span></div><button className="il-close" onClick={onClose}>×</button></div>
        <div className="il-photo-pick">
          <div className="il-team-av" onClick={() => fileRef.current?.click()} title="Cambiar foto">{f.foto ? <img src={f.foto} alt="" /> : (f.nombre[0] || "+")}</div>
          <div>
            <button className="il-btn ghost sm" onClick={() => fileRef.current?.click()}>Cambiar foto</button>
            {f.foto && <button className="il-btn ghost sm" style={{ marginLeft: 8 }} onClick={() => setF({ ...f, foto: null })}>Quitar</button>}
            <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={onFile} />
          </div>
        </div>
        <div className="il-field"><label>Nombre</label><input className={"il-input" + (errNombre ? " err" : "")} value={f.nombre} onChange={(e) => setF({ ...f, nombre: e.target.value })} />{errNombre && <div className="il-err-msg">{errNombre}</div>}</div>
        <div className="il-field"><label>Nueva contraseña <span style={{ textTransform: "none", color: "#5a606b" }}>(opcional)</span></label><input className="il-input" type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Dejar vacío para no cambiar" /></div>
        <button className="il-btn" onClick={intentar} disabled={guardando}>{guardando ? "Guardando…" : "Guardar cambios"}</button>
      </div>
    </div>
  );
}
