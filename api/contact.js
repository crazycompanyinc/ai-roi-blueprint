// Vercel serverless — sends email via Gmail SMTP (nodemailer)
// Env: GMAIL_APP_PASSWORD
let nodemailer;
try { nodemailer = require('nodemailer'); } catch(e) { nodemailer = null; }

const FROM = '"AI ROI Blueprint" <crazycompanyincmail@gmail.com>';
const TO = 'crazycompanyincmail@gmail.com';

async function sendMail(transporter, opts) {
  return transporter.sendMail({ from: FROM, ...opts });
}

function getLeadMagnetHTML() {
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#0a0a0f;font-family:Inter,Arial,sans-serif;color:#b0b8c4">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#111118;border-radius:12px;border:1px solid rgba(255,255,255,0.08)">
<tr><td style="padding:48px 48px 24px">
  <div style="font-size:22px;font-weight:700;color:#e8eaed;margin-bottom:4px">AI ROI Blueprint</div>
  <div style="color:#6b7280;font-size:13px;margin-bottom:32px">Tu guia de ROI de IA — preparate para 20 minutos de lectura</div>
  <h1 style="font-size:28px;font-weight:700;color:#e8eaed;margin:0 0 12px;line-height:1.3">Los 7 errores que matan el ROI de IA en empresas</h1>
  <p style="color:#8a8f98;font-size:15px;line-height:1.7;margin:0">Y el framework de 5 pasos para evitarlos y empezar a ver retorno real en 90 dias.</p>
</td></tr>

<tr><td style="padding:0 48px">
  <div style="background:rgba(239,68,68,0.06);border:1px solid rgba(239,68,68,0.12);border-radius:8px;padding:24px;margin-bottom:24px">
    <div style="font-size:13px;font-weight:700;color:#f87171;text-transform:uppercase;letter-spacing:1px;margin-bottom:14px">Errores que cuestan millones</div>
    <ol style="padding:0 0 0 20px;margin:0;font-size:14px;line-height:2.2">
      <li style="color:#d0d6e0"><strong style="color:#f87171">Sin baseline medible.</strong> Inviertes sin saber donde estas. Nunca puedes demostrar mejora si no mediste el punto de partida.</li>
      <li style="color:#d0d6e0"><strong style="color:#f87171">Confundir adopcion con impacto.</strong> Que tu gente use ChatGPT no significa que tu empresa sea mas eficiente. Mide horas ahorradas en procesos especificos.</li>
      <li style="color:#d0d6e0"><strong style="color:#f87171">No contar costes ocultos.</strong> Licencias son solo el 25%. Integracion, datos, formacion, MLOps: si no los cuentas, tu ROI esta inflado.</li>
      <li style="color:#d0d6e0"><strong style="color:#f87171">Proyectos eternos sin entregables.</strong> 18 meses de "pilotos" sin produccion. Cada mes sin ROI es dinero quemado.</li>
      <li style="color:#d0d6e0"><strong style="color:#f87171">Ignorar la gestion del cambio.</strong> La tecnologia es la parte facil. Que la gente la adopte es el 80% del trabajo.</li>
      <li style="color:#d0d6e0"><strong style="color:#f87171">No tener un sponsor ejecutivo.</strong> Sin alguien con poder y presupuesto respaldando, el proyecto muere cuando hay presion.</li>
      <li style="color:#d0d6e0"><strong style="color:#f87171">Medir solo costes, no revenue.</strong> El ROI real incluye ahorro + revenue incremental + reduccion de errores + retencion de clientes.</li>
    </ol>
  </div>
</td></tr>

<tr><td style="padding:0 48px">
  <div style="background:rgba(16,185,129,0.06);border:1px solid rgba(16,185,129,0.12);border-radius:8px;padding:24px;margin-bottom:24px">
    <div style="font-size:13px;font-weight:700;color:#34d399;text-transform:uppercase;letter-spacing:1px;margin-bottom:14px">El framework de 5 pasos</div>
    <div style="font-size:14px;line-height:2.2">
      <div style="margin-bottom:12px"><strong style="color:#34d399;font-family:monospace">FASE 1 — AUDITORIA</strong><br>Mapea datos, procesos y capacidades actuales. Donde esta tu empresa hoy?<br><span style="color:#8a8f98;font-size:12px">Entregable: Informe de auditoria con gap analysis</span></div>
      <div style="margin-bottom:12px"><strong style="color:#34d399;font-family:monospace">FASE 2 — PRIORIZACION</strong><br>Matriz impacto x viabilidad. Elige UN piloto con datos disponibles y ROI demostrable.<br><span style="color:#8a8f98;font-size:12px">Entregable: Business case con ROI estimado</span></div>
      <div style="margin-bottom:12px"><strong style="color:#34d399;font-family:monospace">FASE 3 — PILOTO (90 DIAS)</strong><br>Implementa, mide, itera. No busques perfeccion. Busca datos.<br><span style="color:#8a8f98;font-size:12px">Entregable: Piloto funcional con metricas antes/despues</span></div>
      <div style="margin-bottom:12px"><strong style="color:#34d399;font-family:monospace">FASE 4 — MEDICION</strong><br>Compara KPI antes vs despues. Calcula ROI real. Documenta aprendizajes.<br><span style="color:#8a8f98;font-size:12px">Entregable: Informe de resultados con ROI real vs estimado</span></div>
      <div><strong style="color:#34d399;font-family:monospace">FASE 5 — ESCALA</strong><br>Usa datos del piloto para expandir. Segundo caso de uso. Gobernanza. Centro de excelencia.<br><span style="color:#8a8f98;font-size:12px">Entregable: Roadmap de escalado + modelo de gobernanza</span></div>
    </div>
  </div>
</td></tr>

<tr><td style="padding:0 48px">
  <div style="background:rgba(99,102,241,0.06);border:1px solid rgba(99,102,241,0.12);border-radius:8px;padding:24px;margin-bottom:24px">
    <div style="font-size:13px;font-weight:700;color:#818cf8;text-transform:uppercase;letter-spacing:1px;margin-bottom:14px">Formula de ROI que si funciona</div>
    <div style="font-size:16px;color:#b0b8c4;line-height:1.6">
      <strong style="color:#e8eaed">ROI.</strong> (Ahorro anual + Revenue incremental) menos Coste total de implementacion. Entre Coste total. Por 100.<br><br>
      <strong style="color:#e8eaed">Coste total.</strong> Licencias + Integracion + Datos (limpieza+etiquetado) + Formacion + MLOps + Gestion del cambio.<br><br>
      <strong style="color:#e8eaed">Ejemplo real.</strong> E-commerce con 50.000 tickets/mes. Automatiza 40% con coste por ticket de 0,30 EUR vs 4,50 EUR humano. Ahorro: EUR 504.000/ano (conservador). Coste: EUR 34.800. <strong style="color:#34d399">ROI ano 1: 1.348%.</strong>
    </div>
  </div>
</td></tr>

<tr><td style="padding:0 48px 8px">
  <div style="font-size:13px;font-weight:700;color:#818cf8;text-transform:uppercase;letter-spacing:1px;margin-bottom:14px">6 Quick Wins de IA (implementables en 2 semanas)</div>
  <ul style="padding:0 0 0 20px;margin:0;font-size:14px;line-height:2.2">
    <li style="color:#d0d6e0"><strong style="color:#e8eaed">Clasificacion automatica de emails/tickets.</strong> Ahorra 3-5 horas/semana por agente.</li>
    <li style="color:#d0d6e0"><strong style="color:#e8eaed">Resumenes automaticos de reuniones.</strong> 30 min ahorradas por reunion larga.</li>
    <li style="color:#d0d6e0"><strong style="color:#e8eaed">Generacion de reportes recurrentes.</strong> Lo que tu junior tarda 4h, IA lo hace en 10 min.</li>
    <li style="color:#d0d6e0"><strong style="color:#e8eaed">Busqueda inteligente en documentacion interna.</strong> Deja de perder horas buscando en Drive.</li>
    <li style="color:#d0d6e0"><strong style="color:#e8eaed">Draft automatico de propuestas comerciales.</strong> Tu equipo revisa en vez de escribir desde cero.</li>
    <li style="color:#d0d6e0"><strong style="color:#e8eaed">Chatbot de FAQ interno.</strong> RRHH, IT, Operaciones. Las preguntas repetidas desaparecen.</li>
  </ul>
</td></tr>

<tr><td style="padding:16px 48px 24px">
  <div style="text-align:center">
    <a href="https://ai-roi-blueprint.vercel.app" style="display:inline-block;background:#6366f1;color:#fff;padding:14px 40px;border-radius:8px;text-decoration:none;font-weight:600;font-size:15px">Quiero el Blueprint completo con plantillas</a>
    <div style="margin-top:12px;font-size:12px;color:#6b7280">Framework de 42 paginas + Calculadora financiera + 15 casos de uso + Gobernanza</div>
  </div>
</td></tr>

<tr><td style="padding:24px 48px;border-top:1px solid rgba(255,255,255,0.06)">
  <p style="color:#6b7280;font-size:13px;margin:0;line-height:1.6">Si quieres el framework completo con las plantillas, calculadora financiera, auditoria de madurez, playboard ejecutivo y el plan de 90 dias detallado, esta todo en el Blueprint.<br><br>Responde a este email si tienes cualquier duda. Leo todos.<br>— AI ROI Blueprint</p>
  <p style="color:#4b5563;font-size:11px;margin:16px 0 0">AI ROI Blueprint. Todos los derechos reservados.</p>
</td></tr>
</table>
</body></html>`;
}

function getLeadMagnetText() {
  return `LOS 7 ERRORES QUE MATAN EL ROI DE IA EN EMPRESAS
Y el framework de 5 pasos para evitarlos

============================================
7 ERRORES QUE CUESTAN MILLONES
============================================

1. SIN BASELINE MEDIBLE
Inviertes sin saber donde esta tu empresa. Nunca puedes demostrar mejora si no mediste antes de empezar. Define KPIs antes del dia 1.

2. CONFUNDIR ADOPCION CON IMPACTO
Que tu gente use ChatGPT no significa que tu empresa sea mas eficiente. Mide horas ahorradas en procesos especificos, no uso de herramientas.

3. NO CONTAR COSTES OCULTOS
Licencias son solo el 25% del coste real. Integracion, limpieza de datos, formacion, MLOps, gestion del cambio: si no los cuentas, tu ROI esta inflado un 300%.

4. PROYECTOS ETERNOS SIN ENTREGABLES
18 meses de "pilotos" sin pasar a produccion. Cada mes sin ROI es dinero quemado. Regla: 90 dias maximo para primer entregable.

5. IGNORAR LA GESTION DEL CAMBIO
La tecnologia es la parte facil. Que la gente la adopte es el 80% del trabajo. Plan de comunicacion, formacion, sponsors.

6. NO TENER UN SPONSOR EJECUTIVO
Sin alguien con poder y presupuesto que respalde activamente, el proyecto muestra la primera presion de costes.

7. MEDIR SOLO COSTES, NO REVENUE
El ROI real de IA incluye: ahorro de costes directos + revenue incremental por mejor experiencia + reduccion de churn + retencion de talento.

============================================
EL FRAMEWORK DE 5 PASOS
============================================

FASE 1 — AUDITORIA (Semana 1-2)
Mapea datos, procesos y capacidades actuales.
Entregable: Informe de auditoria con gap analysis

FASE 2 — PRIORIZACION (Semana 3-4)
Matriz impacto x viabilidad. Elige UN piloto con datos disponibles.
Entregable: Business case con ROI estimado

FASE 3 — PILOTO 90 DIAS (Semana 5-8)
Implementa, mide, itera. No busques perfeccion. Busca datos.
Entregable: Piloto funcional con metricas antes/despues

FASE 4 — MEDICION (Semana 9-10)
Compara KPI antes vs despues. ROI real vs estimado.
Entregable: Informe de resultados

FASE 5 — ESCALA (Semana 11+)
Usa datos del piloto para expandir. Segundo caso de uso. Gobernanza.
Entregable: Roadmap de escalado

============================================
FORMULA DE ROI QUE SI FUNCIONA
============================================

ROI = [(Ahorro anual + Revenue incremental) - Coste total] / Coste total x 100

Coste total = Licencias + Integracion + Datos + Formacion + MLOps + Gestion del cambio

Ejemplo real: E-commerce, 50.000 tickets/mes
- Automatiza 40% de tickets
- Coste humano: EUR 4,50/ticket
- Coste IA: EUR 0,30/ticket
- Ahorro: 240.000 tickets x EUR 4,20 = EUR 1.008.000/ano
- Conservador (30% ramp-up ano 1): EUR 302.400
- Coste implementacion: EUR 34.800
- ROI ano 1: 769%

============================================
6 QUICK WINS DE IA (2 SEMANAS)
============================================

1. Clasificacion automatica de emails/tickets: 3-5 horas/semana por agente
2. Resumenes automaticos de reuniones: 30 min por reunion
3. Reportes recurrentes automaticos: 4h -> 10 min
4. Busqueda inteligente en documentacion: tiempo de buscador eliminado
5. Draft automatico de propuestas: revisar en vez de escribir desde cero
6. Chatbot FAQ interno (RRHH/IT): preguntas repetidas eliminadas

============================================
Quieres el framework completo?
Framework de 42 paginas + Calculadora financiera interactiva
+ 15 casos de uso por industria + Auditoria de madurez
+ Playboard ejecutivo + Plan 90 dias + Gobernanza
https://ai-roi-blueprint.vercel.app

Responde a este email si tienes dudas. Leo todos.`;
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, email, empresa, message, type } = req.body || {};
  if (!email) return res.status(400).json({ error: 'Email requerido' });

  if (!nodemailer) return res.status(500).json({ error: 'Servicio de email no disponible' });

  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!pass) {
    console.error('GMAIL_APP_PASSWORD not set');
    return res.status(500).json({ error: 'Servicio no configurado' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', port: 587, secure: false,
      auth: { user: 'crazycompanyincmail@gmail.com', pass }
    });

    if (type === 'contact') {
      if (!name || !message) return res.status(400).json({ error: 'Nombre y mensaje requeridos' });
      await sendMail(transporter, {
        to: TO, replyTo: email,
        subject: `[Contacto] ${name} — AI ROI Blueprint`,
        text: `Nombre: ${name}\nEmail: ${email}\nEmpresa: ${empresa || 'N/A'}\n\n${message}\n\n---\nEnviado desde airoiblueprint.com`
      });
      return res.status(200).json({ ok: true });
    }

    if (type === 'lead') {
      await sendMail(transporter, {
        to: email,
        subject: `Los 7 errores que matan el ROI de IA en empresas`,
        text: getLeadMagnetText(),
        html: getLeadMagnetHTML(),
      });
      return res.status(200).json({ ok: true });
    }

    return res.status(400).json({ error: 'Tipo no valido' });
  } catch (err) {
    console.error('Email error:', err.message);
    return res.status(500).json({ error: 'Error enviando email. Intenta de nuevo o escribe a hola@airoiblueprint.com' });
  }
};
