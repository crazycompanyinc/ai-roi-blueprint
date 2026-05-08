// Vercel serverless — sends email via Gmail SMTP (nodemailer)
// Env: GMAIL_APP_PASSWORD
let nodemailer;
try { nodemailer = require('nodemailer'); } catch(e) { nodemailer = null; }

const FROM = '"AI ROI Blueprint" <crazycompanyincmail@gmail.com>';
const TO = 'crazycompanyincmail@gmail.com';

async function sendMail(transporter, opts) {
  return transporter.sendMail({ from: FROM, ...opts });
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
        subject: 'Tu mini-guía ROI de IA — AI ROI Blueprint',
        text: `¡Gracias por tu interés en AI ROI Blueprint!\n\n📊 LOS 3 ERRORES MÁS COSTOSOS AL MEDIR ROI DE IA\n\nError 1: No definir baseline antes de implementar\n→ Sin baseline, no puedes demostrar impacto. Mide ANTES de empezar.\n\nError 2: Confundir adopción con impacto\n→ Que tu equipo use ChatGPT no significa que tu empresa sea más eficiente.\nMide horas ahorradas en procesos específicos, no uso de herramientas.\n\nError 3: Medir solo costes, no revenue\n→ El ROI real de IA incluye: ahorro de costes + revenue incremental + reducción de errores.\n\n📐 FÓMULA RÁPIDA:\nROI = [(Ahorro anual + Revenue incremental) - Coste implementación] / Coste implementación × 100\n\n💡 TIP PRO: Empieza con un piloto de 30 días en un solo proceso.\nMide, demuestra ROI, y usa esos datos para escalar.\n\n---\n¿Quieres el framework completo con calculadora, plantillas y playbook ejecutivo?\n→ https://ai-roi-blueprint.vercel.app\n\nAI ROI Blueprint\nhola@airoiblueprint.com`
      });
      return res.status(200).json({ ok: true });
    }

    return res.status(400).json({ error: 'Tipo no válido' });
  } catch (err) {
    console.error('Email error:', err.message);
    return res.status(500).json({ error: 'Error enviando email. Intenta de nuevo o escribe a hola@airoiblueprint.com' });
  }
};
