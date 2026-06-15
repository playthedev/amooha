import nodemailer, { type Transporter } from "nodemailer";

let cachedTransporter: Transporter | null = null;

function getTransporter(): Transporter {
  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    throw new Error("Missing email environment variables — check .env.local");
  }

  if (!cachedTransporter) {
    cachedTransporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT ?? 465),
      secure: SMTP_SECURE !== "false",
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
  }

  return cachedTransporter;
}

type SendMailInput = {
  to: string;
  subject: string;
  html: string;
  text: string;
};

export async function sendMail({ to, subject, html, text }: SendMailInput): Promise<void> {
  const { SMTP_USER, CONTACT_FROM_NAME } = process.env;
  const transporter = getTransporter();

  await transporter.sendMail({
    from: `"${CONTACT_FROM_NAME ?? "Amoohaa Farms"}" <${SMTP_USER}>`,
    to,
    subject,
    html,
    text,
  });
}

export function escHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
