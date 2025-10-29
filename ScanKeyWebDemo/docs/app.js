// ---- DEMO: simulación de salida IA con reglas ScanKey ----
const demoResult = {
  input_id: "demo-abc123",
  timestamp: new Date().toISOString(),
  manufacturer_hint: { found: true, name: "JMA", confidence: 0.91 },
  results: [
    {
      rank: 1, id_model_ref: "JMA_TE8I", type: "plana",
      brand: "JMA", model: "TE8I", orientation: "izquierda",
      head_color: "plateado", visual_state: "buena", patentada: false,
      compatibility_tags: ["TESA_TE8", "Silca_TE8"], confidence: 0.94,
      explain_text: "Perfil TE8 con orientación izquierda; OCR sugiere TE8I.",
      crop_bbox: { x: 0.1, y: 0.18, w: 0.72, h: 0.52 }
    },
    {
      rank: 2, id_model_ref: "TESA_TE8D", type: "plana",
      brand: "TESA", model: "TE8D", orientation: "derecha",
      head_color: "plateado", visual_state: "buena", patentada: false,
      compatibility_tags: ["JMA_TE8"], confidence: 0.78,
      explain_text: "Coincidencia por contorno y familia TE8, posible derecha.",
      crop_bbox: { x: 0.12, y: 0.2, w: 0.70, h: 0.5 }
    },
    {
      rank: 3, id_model_ref: "SILCA_TE8", type: "plana",
      brand: "SILCA", model: "TE8", orientation: "simétrica",
      head_color: "plateado", visual_state: "desgastada", patentada: false,
      compatibility_tags: ["TE8 familia"], confidence: 0.62,
      explain_text: "Familia compatible; desgaste visible reduce score.",
      crop_bbox: { x: 0.08, y: 0.22, w: 0.75, h: 0.48 }
    }
  ],
  low_confidence: false,
  high_confidence: false,
  should_store_sample: true,
  storage_probability: 0.75,
  current_samples_for_candidate: 12,
  manual_correction_hint: { fields: ["marca","modelo","tipo","orientacion","ocr_text"] },
  debug: { processing_time_ms: 210, model_version: "demo_v1" }
};

function applyGlobalFlags(payload){
  const top = payload.results?.[0]?.confidence ?? 0;
  payload.high_confidence = top >= 0.95;
  payload.low_confidence  = top < 0.60;
  payload.should_store_sample = top >= 0.75;
  return payload;
}

function simulateScan(){
  const enriched = applyGlobalFlags(structuredClone(demoResult));
  localStorage.setItem("sk_last_result", JSON.stringify(enriched));
  window.location.href = "results.html";
}

function renderResults(){
  const data = localStorage.getItem("sk_last_result");
  const payload = data ? JSON.parse(data) : applyGlobalFlags(structuredClone(demoResult));

  const banner = document.getElementById("confidenceBanner");
  if(!banner) return;

  if(payload.high_confidence){
    banner.className = "banner ok";
    banner.textContent = "Alta confianza: puedes aceptar directamente.";
  } else if(payload.low_confidence){
    banner.className = "banner bad";
    banner.textContent = "Resultado dudoso: recomendamos corrección manual.";
  } else {
    banner.className = "banner warn";
    banner.textContent = "Confianza media: revisa los 3 candidatos.";
  }

  const cards = document.getElementById("cards");
  cards.innerHTML = "";
  payload.results.slice(0,3).forEach(r => {
    const el = document.createElement("div");
    el.className = "result-card";
    el.innerHTML = `
      <div class="tag">#${r.rank} • ${r.type} • ${r.brand ?? "-"} ${r.model ?? "-"}</div>
      <h3>${r.id_model_ref ?? (r.brand+"_"+r.model)}</h3>
      <p><b>Orientación:</b> ${r.orientation ?? "—"}</p>
      <p><b>Estado:</b> ${r.visual_state ?? "—"} • <b>Patentada:</b> ${r.patentada ? "sí":"no"}</p>
      <p><b>Compatibilidad:</b> ${r.compatibility_tags.join(", ")}</p>
      <p class="score">Confianza: ${(r.confidence*100).toFixed(1)}%</p>
      <p class="muted">${r.explain_text}</p>
      <div class="actions">
        <button class="btn primary" onclick='accept("${r.id_model_ref}")'>Elegir esta</button>
      </div>
    `;
    cards.appendChild(el);
  });
}

function accept(id){
  alert(`Seleccionado: ${id}\n(En la app real aquí seguiría el flujo de duplicado/envío a taller)`);
}

function openManual(){
  document.getElementById("manualModal").classList.remove("hidden");
}
function closeManual(){
  document.getElementById("manualModal").classList.add("hidden");
}
function submitManual(ev){
  ev.preventDefault();
  const payload = {
    marca: document.getElementById("marca").value || null,
    modelo: document.getElementById("modelo").value || null,
    tipo: document.getElementById("tipo").value || null,
    orientacion: document.getElementById("orientacion").value || null,
    ocr_text: document.getElementById("ocr_text").value || null
  };
  console.log("Manual correction:", payload);
  closeManual();
  alert("Guardado (demo). Gracias.");
}
