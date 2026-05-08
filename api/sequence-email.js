const nodemailer = require('nodemailer');

const PLAN_DETAILS = {
  starter: {
    name: 'Starter',
    price: 'EUR 47',
    deliverables: [
      'Framework ROI IA — 6 fases completas (PDF)',
      'Calculadora de ROI — Excel/Google Sheets',
      '15 casos de uso por industria',
      'Checklists de evaluación',
    ],
  },
  professional: {
    name: 'Professional',
    price: 'EUR 97',
    deliverables: [
      'Todo del plan Starter',
      'Plantillas ejecutivas para board',
      'Guía de gobernanza y ética de IA',
      'Plan de implementación 90 días',
      'Templates de business case',
      'Soporte por email 30 días',
    ],
  },
};

function buildEmailHTML(plan) {
  const p = PLAN_DETAILS[plan] || PLAN_DETAILS.professional;
  const items = p.deliverables.map(d => `<li style="margin-bottom:8px;color:#b0b8c4">${d}</li>`).join('');
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#0a0a0f;font-family:Inter,Arial,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#111118;border-radius:12px;border:1px solid rgba(255,255,255,0.08)">
<tr><td style="padding:40px 40px 16px">
  <div style="font-size:20px;font-weight:700;color:#e8eaed;margin-bottom:4px">AI ROI Blueprint</div>
  <div style="color:#6b7280;font-size:13px">Framework de ROI para IA Empresarial</div>
</td></tr>
<tr><td style="padding:8px 40px 24px">
  <h1 style="font-size:24px;font-weight:700;color:#e8eaed;margin:0 0 8px">Tu plan ${p.name} esta listo</h1>
  <p style="color:#b0b8c4;font-size:15px;line-height:1.6;margin:0">Gracias por tu compra. A continuacion tienes acceso a todo el material incluido en tu plan ${p.name} (${p.price}).</p>
</td></tr>
<tr><td style="padding:0 40px 24px">
  <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:8px;padding:24px">
    <div style="font-size:13px;font-weight:600;color:#818cf8;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:16px">Tu plan incluye</div>
    <ul style="padding:0 0 0 20px;margin:0;font-size:15px">${items}</ul>
  </div>
</td></tr>
<tr><td style="padding:0 40px 24px">
  <div style="background:rgba(16,185,129,0.06);border:1px solid rgba(16,185,129,0.15);border-radius:8px;padding:20px">
    <div style="font-size:14px;font-weight:600;color:#10b981;margin-bottom:4px">Proximo paso</div>
    <p style="color:#b0b8c4;font-size:14px;margin:0;line-height:1.6">Descarga el Framework ROI IA y comienza por la Fase 1: Auditoria. El primer entregable es un diagnostico del estado actual de IA en tu empresa.</p>
  </div>
</td></tr>
<tr><td style="padding:0 40px 16px;text-align:center">
  <a href="https://ai-roi-blueprint.vercel.app" style="display:inline-block;background:#6366f1;color:#fff;padding:12px 32px;border-radius:8px;text-decoration:none;font-weight:600;font-size:15px">Ir a la plataforma</a>
</td></tr>
<tr><td style="padding:24px 40px;border-top:1px solid rgba(255,255,255,0.06)">
  <p style="color:#6b7280;font-size:13px;margin:0;line-height:1.6">Si tienes cualquier duda, responde a este email.<br>— El equipo de AI ROI Blueprint</p>
  <p style="color:#4b5563;font-size:11px;margin:16px 0 0">AI ROI Blueprint. Todos los derechos reservados.</p>
</td></tr>
</table>
</body></html>`;
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { email, plan } = req.body || {};
    if (!email) return res.status(400).json({ error: 'email requerido' });

    const validPlan = (plan === 'starter' || plan === 'professional') ? plan : 'professional';

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER || process.env.EMAIL_FROM,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"AI ROI Blueprint" <${process.env.GMAIL_USER || process.env.EMAIL_FROM}>`,
      to: email,
      subject: `Tu plan ${PLAN_DETAILS[validPlan].name} — Acceso al Framework ROI IA`,
      html: buildEmailHTML(validPlan),
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('sequence-email error:', err.message);
    return res.status(500).json({ error: err.message });
  }
};
