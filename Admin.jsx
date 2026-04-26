import { useState, useEffect, useCallback } from "react";
import { supabase } from "./supabase.js";

const LOGO_IMG = "data:image/png;base64,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";
const ADMIN_PASS = "koten2025";

const SLOTS = [
  "14:00 - 15:30","15:30 - 16:30","16:30 - 18:00",
  "18:00 - 19:30","19:30 - 21:00","21:00 - 22:30","22:30 - 00:00",
];
const COURTS = [1, 2, 3];

function getToday() { return new Date().toISOString().split("T")[0]; }
function getNext14Days() {
  const days = [];
  for (let i = 0; i < 14; i++) {
    const d = new Date(); d.setDate(d.getDate() + i);
    days.push(d.toISOString().split("T")[0]);
  }
  return days;
}
function fmtDate(iso) {
  const d = new Date(iso + "T12:00:00");
  const dn = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
  const mn = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
  return `${dn[d.getDay()]} ${d.getDate()} de ${mn[d.getMonth()]}`;
}
function fmtTime(iso) {
  return new Date(iso).toLocaleTimeString("es-AR", { hour:"2-digit", minute:"2-digit" });
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Nunito:wght@400;500;600&display=swap');
  *{box-sizing:border-box;margin:0;padding:0}
  :root{--g:#7BEA00;--c:#111;--c2:#161616;--b:#1e1e1e;--red:#ff4444;--yellow:#FFCC00}
  body{font-family:'Nunito',sans-serif;background:#080808;color:#fff;overflow-x:hidden}
  .root{min-height:100vh;display:flex}
  .login{min-height:100vh;width:100%;display:flex;align-items:center;justify-content:center;background:#080808;padding:24px}
  .lbox{background:var(--c);border:1px solid var(--b);border-radius:20px;padding:48px 40px;width:100%;max-width:420px;text-align:center}
  .licon{font-size:48px;margin-bottom:16px}
  .ltitle{font-family:'Barlow Condensed',sans-serif;font-size:32px;font-weight:900;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px}
  .lsub{color:#666;font-size:14px;margin-bottom:32px}
  .inp{width:100%;background:#0d0d0d;border:1px solid #222;border-radius:10px;color:#fff;font-family:'Nunito',sans-serif;font-size:15px;padding:13px 16px;outline:none;transition:border-color .2s;margin-bottom:14px}
  .inp:focus{border-color:var(--g)}
  .inp::placeholder{color:#444}
  .btn-g{width:100%;background:var(--g);color:#000;font-family:'Barlow Condensed',sans-serif;font-weight:900;font-size:17px;letter-spacing:2px;text-transform:uppercase;padding:14px;border:none;border-radius:10px;cursor:pointer;transition:all .2s}
  .btn-g:hover{background:#fff;transform:translateY(-2px)}
  .lerr{color:var(--red);font-size:14px;margin-top:10px}
  .sidebar{position:fixed;top:0;left:0;bottom:0;width:240px;background:var(--c);border-right:1px solid var(--b);display:flex;flex-direction:column;z-index:50}
  .sb-logo{padding:24px 20px;border-bottom:1px solid var(--b)}
  .sb-logo-title{font-family:'Barlow Condensed',sans-serif;font-size:22px;font-weight:900;text-transform:uppercase;letter-spacing:1px}
  .sb-logo-sub{font-size:11px;color:#555;letter-spacing:2px;text-transform:uppercase;margin-top:2px}
  .ni{display:flex;align-items:center;gap:12px;padding:12px 20px;cursor:pointer;transition:all .2s;font-size:14px;font-weight:600;color:#666;border-left:3px solid transparent}
  .ni:hover{color:#fff;background:rgba(255,255,255,.03)}
  .ni.act{color:var(--g);border-left-color:var(--g);background:rgba(123,234,0,.06)}
  .ni-icon{font-size:18px;width:20px;text-align:center}
  .sb-footer{margin-top:auto;padding:16px 20px;border-top:1px solid var(--b)}
  .logout{width:100%;background:transparent;border:1px solid #222;color:#666;font-family:'Nunito',sans-serif;font-size:13px;font-weight:600;padding:10px;border-radius:8px;cursor:pointer;transition:all .2s}
  .logout:hover{border-color:var(--red);color:var(--red)}
  .main{margin-left:240px;flex:1;padding:32px;min-height:100vh;background:#080808}
  .ptitle{font-family:'Barlow Condensed',sans-serif;font-size:36px;font-weight:900;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px}
  .psub{color:#555;font-size:14px;margin-bottom:28px}
  .stats{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:16px;margin-bottom:28px}
  .stat{background:var(--c);border:1px solid var(--b);border-radius:14px;padding:22px 20px}
  .stat-icon{font-size:22px;margin-bottom:8px}
  .stat-label{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#555;margin-bottom:4px}
  .stat-val{font-family:'Barlow Condensed',sans-serif;font-size:34px;font-weight:900}
  .green{color:var(--g)} .red{color:var(--red)} .yellow{color:var(--yellow)}
  .filters{display:flex;gap:12px;margin-bottom:20px;flex-wrap:wrap;align-items:center}
  .flabel{font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#555}
  .fsel{background:#111;border:1px solid #222;border-radius:8px;color:#fff;font-family:'Nunito',sans-serif;font-size:14px;padding:9px 14px;outline:none;cursor:pointer}
  .fsel:focus{border-color:var(--g)}
  .fbtn{padding:9px 18px;background:var(--c);border:1px solid var(--b);border-radius:8px;color:#aaa;font-family:'Nunito',sans-serif;font-size:13px;font-weight:600;cursor:pointer;transition:all .2s}
  .fbtn:hover{border-color:#444;color:#fff}
  .fbtn.act{background:rgba(123,234,0,.1);border-color:var(--g);color:var(--g)}
  .rfbtn{background:transparent;border:1px solid #222;color:#666;font-size:13px;font-weight:600;padding:9px 16px;border-radius:8px;cursor:pointer;transition:all .2s;font-family:'Nunito',sans-serif}
  .rfbtn:hover{border-color:#444;color:#fff}
  .tw{background:var(--c);border:1px solid var(--b);border-radius:14px;overflow:hidden}
  .th{padding:16px 24px;border-bottom:1px solid var(--b);display:flex;justify-content:space-between;align-items:center}
  .th-title{font-family:'Barlow Condensed',sans-serif;font-size:18px;font-weight:700}
  .th-count{font-size:13px;color:#555;background:#0d0d0d;border:1px solid #222;border-radius:20px;padding:4px 12px}
  table{width:100%;border-collapse:collapse}
  th{padding:12px 16px;text-align:left;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#555;border-bottom:1px solid #1a1a1a;background:#0d0d0d}
  td{padding:13px 16px;font-size:14px;border-bottom:1px solid #141414;vertical-align:middle}
  tr:last-child td{border-bottom:none}
  tr:hover td{background:rgba(255,255,255,.015)}
  .badge{display:inline-block;padding:3px 10px;border-radius:100px;font-size:11px;font-weight:700;letter-spacing:.5px;text-transform:uppercase}
  .b-act{background:rgba(123,234,0,.1);color:var(--g);border:1px solid rgba(123,234,0,.2)}
  .b-can{background:rgba(255,68,68,.1);color:var(--red);border:1px solid rgba(255,68,68,.2)}
  .b-court{background:rgba(155,48,255,.1);color:#c084fc;border:1px solid rgba(155,48,255,.2)}
  .btn-cancel{background:transparent;border:1px solid rgba(255,68,68,.3);color:#ff6666;font-size:12px;font-weight:600;padding:6px 14px;border-radius:6px;cursor:pointer;transition:all .2s;font-family:'Nunito',sans-serif}
  .btn-cancel:hover{background:rgba(255,68,68,.1);border-color:var(--red)}
  .cal-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
  .cal-c{background:var(--c);border:1px solid var(--b);border-radius:14px;overflow:hidden}
  .cal-h{padding:14px 18px;border-bottom:1px solid var(--b);display:flex;align-items:center;justify-content:space-between}
  .cal-htitle{font-family:'Barlow Condensed',sans-serif;font-size:18px;font-weight:800;text-transform:uppercase;color:var(--g)}
  .cal-slot{display:flex;align-items:center;justify-content:space-between;padding:10px 18px;border-bottom:1px solid #141414}
  .cal-slot:last-child{border-bottom:none}
  .cal-time{font-family:'Barlow Condensed',sans-serif;font-size:14px;font-weight:700}
  .cal-name{font-size:13px;color:#aaa;max-width:90px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .cal-free{color:#333;font-size:13px;font-style:italic}
  .empty{text-align:center;padding:56px 32px;color:#444}
  .empty-icon{font-size:36px;margin-bottom:10px}
  .ld{display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--g);animation:pp 1.2s infinite;margin:0 3px}
  .ld:nth-child(2){animation-delay:.2s}.ld:nth-child(3){animation-delay:.4s}
  @keyframes pp{0%,80%,100%{transform:scale(.6);opacity:.4}40%{transform:scale(1);opacity:1}}
  .lc{text-align:center;padding:48px;color:#555}
  .toast{position:fixed;bottom:32px;right:32px;background:#1a1a1a;border:1px solid #333;border-radius:12px;padding:14px 20px;font-size:14px;color:#fff;z-index:999;animation:fin .3s ease}
  @keyframes fin{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
  .mo{position:fixed;inset:0;background:rgba(0,0,0,.75);z-index:200;display:flex;align-items:center;justify-content:center;padding:24px}
  .mbox{background:var(--c);border:1px solid var(--b);border-radius:16px;padding:32px;width:100%;max-width:400px}
  .mtitle{font-family:'Barlow Condensed',sans-serif;font-size:22px;font-weight:800;text-transform:uppercase;margin-bottom:8px}
  .mtext{color:#aaa;font-size:14px;line-height:1.6;margin-bottom:20px}
  .mdet{background:#0d0d0d;border-radius:10px;padding:16px;margin-bottom:20px;font-size:14px;line-height:2}
  .mdet strong{color:var(--g)}
  .mbtns{display:flex;gap:12px}
  .btn-mok{flex:1;background:rgba(255,68,68,.1);border:1px solid rgba(255,68,68,.3);color:#ff6666;font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:16px;letter-spacing:1px;text-transform:uppercase;padding:12px;border-radius:8px;cursor:pointer;transition:all .2s}
  .btn-mok:hover{background:var(--red);color:#fff}
  .btn-mback{flex:1;background:transparent;border:1px solid #222;color:#aaa;font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:16px;letter-spacing:1px;text-transform:uppercase;padding:12px;border-radius:8px;cursor:pointer;transition:all .2s}
  .btn-mback:hover{border-color:#444;color:#fff}
  @media(max-width:900px){.sidebar{display:none}.main{margin-left:0}.cal-grid{grid-template-columns:1fr}}
`;

export default function Admin() {
  const [authed, setAuthed]     = useState(false);
  const [pass, setPass]         = useState("");
  const [loginErr, setLoginErr] = useState("");
  const [view, setView]         = useState("today");
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading]   = useState(false);
  const [filterDate, setFilterDate]     = useState(getToday());
  const [filterCourt, setFilterCourt]   = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [toast, setToast]       = useState(null);
  const [modal, setModal]       = useState(null);
  const [cancelling, setCancelling]     = useState(false);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3500); };

  const fetchRes = useCallback(async (date) => {
    setLoading(true);
    try {
      let q = supabase.from("reservations").select("*").order("slot_index").order("court");
      if (date) q = q.eq("date", date); else q = q.gte("date", getToday());
      const { data, error } = await q;
      if (error) throw error;
      setReservations(data || []);
    } catch(e) { showToast("❌ Error al cargar reservas"); }
    setLoading(false);
  }, []);

  const cancelRes = async (id) => {
    setCancelling(true);
    try {
      const { error } = await supabase.from("reservations").update({ cancelled_at: new Date().toISOString() }).eq("id", id);
      if (error) throw error;
      showToast("✅ Turno cancelado correctamente");
      setModal(null);
      await fetchRes(view === "today" ? getToday() : filterDate);
    } catch(e) { showToast("❌ Error al cancelar"); }
    setCancelling(false);
  };

  useEffect(() => {
    if (!authed) return;
    fetchRes(view === "today" ? getToday() : filterDate);
  }, [authed, view, filterDate, fetchRes]);

  useEffect(() => {
    if (!authed) return;
    const interval = setInterval(() => fetchRes(view === "today" ? getToday() : filterDate), 30000);
    return () => clearInterval(interval);
  }, [authed, view, filterDate, fetchRes]);

  if (!authed) return (
    <div className="login">
      <style>{css}</style>
      <div className="lbox">
        <div className="licon">🔐</div>
        <div className="ltitle">Panel Admin</div>
        <div className="lsub">Koten Padel · Bialet Massé</div>
        <input className="inp" type="password" placeholder="Contraseña de administrador" value={pass}
          onChange={e => setPass(e.target.value)}
          onKeyDown={e => { if(e.key==="Enter"){ if(pass===ADMIN_PASS){setAuthed(true);setLoginErr("");}else setLoginErr("Contraseña incorrecta"); }}} />
        {loginErr && <div className="lerr">{loginErr}</div>}
        <button className="btn-g" style={{marginTop:"8px"}} onClick={() => { if(pass===ADMIN_PASS){setAuthed(true);setLoginErr("");}else setLoginErr("Contraseña incorrecta"); }}>
          Ingresar →
        </button>
      </div>
    </div>
  );

  const active    = reservations.filter(r => !r.cancelled_at);
  const cancelled = reservations.filter(r =>  r.cancelled_at);
  const filtered  = reservations.filter(r => {
    if (filterCourt !== "all" && r.court !== parseInt(filterCourt)) return false;
    if (filterStatus === "active" && r.cancelled_at) return false;
    if (filterStatus === "cancelled" && !r.cancelled_at) return false;
    return true;
  });

  const calData = {};
  COURTS.forEach(c => { calData[c] = {}; SLOTS.forEach((_,i) => { calData[c][i] = null; }); });
  active.forEach(r => { if(calData[r.court]) calData[r.court][r.slot_index] = r; });

  const today = getToday();
  const dateLabel = view === "today" ? today : filterDate;

  return (
    <div className="root">
      <style>{css}</style>
      <div className="sidebar">
        <div className="sb-logo">
          <div className="sb-logo-title">Koten Padel</div>
          <div className="sb-logo-sub">Panel Administrativo</div>
        </div>
        {[{id:"today",icon:"📅",label:"Hoy"},{id:"calendar",icon:"🎾",label:"Vista Canchas"},{id:"list",icon:"📋",label:"Todas las Reservas"}].map(item => (
          <div key={item.id} className={`ni ${view===item.id?"act":""}`} onClick={() => setView(item.id)}>
            <span className="ni-icon">{item.icon}</span>{item.label}
          </div>
        ))}
        <div className="sb-footer">
          <button className="logout" onClick={() => { setAuthed(false); setPass(""); }}>Cerrar sesión</button>
        </div>
      </div>

      <div className="main">
        <div className="stats">
          <div className="stat"><div className="stat-icon">🎾</div><div className="stat-label">Activas</div><div className="stat-val green">{active.length}</div></div>
          <div className="stat"><div className="stat-icon">❌</div><div className="stat-label">Canceladas</div><div className="stat-val red">{cancelled.length}</div></div>
          <div className="stat"><div className="stat-icon">🏟️</div><div className="stat-label">Canchas ocupadas</div><div className="stat-val yellow">{COURTS.filter(c=>active.some(r=>r.court===c)).length} / 3</div></div>
          <div className="stat">
            <div className="stat-icon">⏱️</div><div className="stat-label">Próximo turno</div>
            <div className="stat-val" style={{fontSize:"20px",marginTop:"4px"}}>
              {(() => { const now=new Date(); const nx=active.filter(r=>{ const [hh]=SLOTS[r.slot_index].split(":").map(Number); const td=new Date(); td.setHours(hh,0,0,0); return r.date===today&&td>now; }).sort((a,b)=>a.slot_index-b.slot_index)[0]; return nx?SLOTS[nx.slot_index].split(" - ")[0]:"—"; })()}
            </div>
          </div>
        </div>

        {view === "today" && (
          <>
            <div className="ptitle">Reservas de Hoy</div>
            <div className="psub">{fmtDate(today)} · Auto-actualización cada 30s</div>
            <div style={{display:"flex",justifyContent:"flex-end",marginBottom:"16px"}}>
              <button className="rfbtn" onClick={() => fetchRes(today)}>🔄 Actualizar</button>
            </div>
            {loading ? <div className="lc"><span className="ld"/><span className="ld"/><span className="ld"/></div>
              : active.length === 0 ? <div className="empty"><div className="empty-icon">📭</div><div>No hay reservas activas para hoy</div></div>
              : <div className="tw">
                  <div className="th"><span className="th-title">Turnos Activos</span><span className="th-count">{active.length} reservas</span></div>
                  <table>
                    <thead><tr><th>Horario</th><th>Cancha</th><th>Cliente</th><th>Teléfono</th><th>Reservado a las</th><th>Acción</th></tr></thead>
                    <tbody>
                      {active.sort((a,b)=>a.slot_index-b.slot_index||a.court-b.court).map(r => (
                        <tr key={r.id}>
                          <td style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:16}}>{SLOTS[r.slot_index]}</td>
                          <td><span className="badge b-court">Cancha {r.court}</span></td>
                          <td style={{fontWeight:600}}>{r.customer_name}</td>
                          <td style={{color:"#666"}}>{r.customer_phone||"—"}</td>
                          <td style={{color:"#555",fontSize:13}}>{fmtTime(r.created_at)}</td>
                          <td><button className="btn-cancel" onClick={() => setModal(r)}>Cancelar</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>}
          </>
        )}

        {view === "calendar" && (
          <>
            <div className="ptitle">Vista de Canchas</div>
            <div className="psub">Estado en tiempo real por cancha y horario</div>
            <div className="filters" style={{marginBottom:"20px"}}>
              <span className="flabel">Fecha:</span>
              <select className="fsel" value={filterDate} onChange={e => setFilterDate(e.target.value)}>
                {getNext14Days().map(d => <option key={d} value={d}>{d===today?`Hoy (${d})`:d}</option>)}
              </select>
              <button className="rfbtn" onClick={() => fetchRes(filterDate)}>🔄 Actualizar</button>
            </div>
            {loading ? <div className="lc"><span className="ld"/><span className="ld"/><span className="ld"/></div>
              : <div className="cal-grid">
                  {COURTS.map(c => (
                    <div key={c} className="cal-c">
                      <div className="cal-h"><span className="cal-htitle">Cancha {c}</span><span style={{fontSize:13,color:"#555"}}>{Object.values(calData[c]).filter(Boolean).length}/7</span></div>
                      {SLOTS.map((_,i) => {
                        const r = calData[c][i];
                        return (
                          <div key={i} className="cal-slot" style={{background:r?"rgba(123,234,0,.04)":"transparent"}}>
                            <div>
                              <div className="cal-time" style={{color:r?"#fff":"#444"}}>{SLOTS[i]}</div>
                              {r ? <div className="cal-name">{r.customer_name}</div> : <div className="cal-free">Disponible</div>}
                            </div>
                            {r && <button className="btn-cancel" style={{fontSize:11,padding:"4px 10px"}} onClick={() => setModal(r)}>✕</button>}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>}
          </>
        )}

        {view === "list" && (
          <>
            <div className="ptitle">Todas las Reservas</div>
            <div className="psub">Historial completo</div>
            <div className="filters">
              <span className="flabel">Fecha:</span>
              <select className="fsel" value={filterDate} onChange={e => setFilterDate(e.target.value)}>
                {getNext14Days().map(d => <option key={d} value={d}>{d===today?`Hoy (${d})`:d}</option>)}
              </select>
              <span className="flabel" style={{marginLeft:8}}>Cancha:</span>
              <select className="fsel" value={filterCourt} onChange={e => setFilterCourt(e.target.value)}>
                <option value="all">Todas</option>
                {COURTS.map(c => <option key={c} value={c}>Cancha {c}</option>)}
              </select>
              <span className="flabel" style={{marginLeft:8}}>Estado:</span>
              {["all","active","cancelled"].map(s => (
                <button key={s} className={`fbtn ${filterStatus===s?"act":""}`} onClick={() => setFilterStatus(s)}>
                  {s==="all"?"Todas":s==="active"?"Activas":"Canceladas"}
                </button>
              ))}
              <button className="rfbtn" onClick={() => fetchRes(filterDate)}>🔄 Actualizar</button>
            </div>
            {loading ? <div className="lc"><span className="ld"/><span className="ld"/><span className="ld"/></div>
              : filtered.length === 0 ? <div className="empty"><div className="empty-icon">📭</div><div>No hay reservas con esos filtros</div></div>
              : <div className="tw">
                  <div className="th"><span className="th-title">Reservas</span><span className="th-count">{filtered.length}</span></div>
                  <table>
                    <thead><tr><th>Estado</th><th>Horario</th><th>Cancha</th><th>Cliente</th><th>Teléfono</th><th>Reservado</th><th>Acción</th></tr></thead>
                    <tbody>
                      {filtered.map(r => (
                        <tr key={r.id}>
                          <td><span className={`badge ${r.cancelled_at?"b-can":"b-act"}`}>{r.cancelled_at?"Cancelado":"Activo"}</span></td>
                          <td style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:15}}>{SLOTS[r.slot_index]}</td>
                          <td><span className="badge b-court">C{r.court}</span></td>
                          <td style={{fontWeight:600}}>{r.customer_name}</td>
                          <td style={{color:"#666"}}>{r.customer_phone||"—"}</td>
                          <td style={{color:"#555",fontSize:13}}>{fmtTime(r.created_at)}</td>
                          <td>{!r.cancelled_at&&<button className="btn-cancel" onClick={() => setModal(r)}>Cancelar</button>}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>}
          </>
        )}
      </div>

      {modal && (
        <div className="mo" onClick={() => !cancelling && setModal(null)}>
          <div className="mbox" onClick={e => e.stopPropagation()}>
            <div className="mtitle">⚠️ Cancelar Turno</div>
            <div className="mtext">¿Confirmás la cancelación? El horario quedará disponible nuevamente.</div>
            <div className="mdet">
              <div><strong>Cliente:</strong> {modal.customer_name}</div>
              <div><strong>Cancha:</strong> {modal.court}</div>
              <div><strong>Horario:</strong> {SLOTS[modal.slot_index]}</div>
              <div><strong>Fecha:</strong> {fmtDate(modal.date)}</div>
            </div>
            <div className="mbtns">
              <button className="btn-mback" onClick={() => setModal(null)} disabled={cancelling}>Volver</button>
              <button className="btn-mok" onClick={() => cancelRes(modal.id)} disabled={cancelling}>{cancelling?"Cancelando...":"Sí, cancelar"}</button>
            </div>
          </div>
        </div>
      )}

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
