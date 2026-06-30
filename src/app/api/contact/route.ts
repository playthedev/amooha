import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, company, email, enquiryType, message } = body as Record<string, string>;

  // Basic validation
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json(
      { error: "Name, email and message are required." },
      { status: 422 }
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 422 });
  }

  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_SECURE,
    SMTP_USER,
    SMTP_PASS,
    CONTACT_TO,
    CONTACT_FROM_NAME,
  } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !CONTACT_TO) {
    console.error("Missing email environment variables — check .env.local");
    return NextResponse.json(
      { error: "Email service is not configured. Please contact us directly." },
      { status: 503 }
    );
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT ?? 465),
    secure: SMTP_SECURE !== "false",
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const htmlBody = `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #1a4a2e;">
      <div style="background: #1a4a2e; padding: 24px 32px;">
        <h1 style="color: #d4a853; font-size: 22px; margin: 0; font-weight: 400; letter-spacing: 0.05em;">
          New Enquiry — Amoohaa Farms
        </h1>
      </div>
      <div style="padding: 32px; background: #faf6ef; border: 1px solid #e8e0d0;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e8e0d0; font-size: 12px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #b8893a; width: 130px;">Name</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e8e0d0; font-size: 15px; color: #1a4a2e;">${escHtml(name)}</td>
          </tr>
          ${company ? `
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e8e0d0; font-size: 12px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #b8893a;">Company</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e8e0d0; font-size: 15px; color: #1a4a2e;">${escHtml(company)}</td>
          </tr>` : ""}
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e8e0d0; font-size: 12px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #b8893a;">Email</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e8e0d0; font-size: 15px;"><a href="mailto:${escHtml(email)}" style="color: #1a4a2e;">${escHtml(email)}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e8e0d0; font-size: 12px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #b8893a;">Enquiry Type</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e8e0d0; font-size: 15px; color: #1a4a2e;">${escHtml(enquiryType ?? "Not specified")}</td>
          </tr>
        </table>
        <div style="margin-top: 24px;">
          <p style="font-size: 12px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #b8893a; margin: 0 0 10px;">Message</p>
          <p style="font-size: 15px; color: #3d3d36; line-height: 1.8; margin: 0; white-space: pre-wrap;">${escHtml(message)}</p>
        </div>
      </div>
      <div style="padding: 16px 32px; background: #1a4a2e;">
        <p style="font-size: 11px; color: rgba(255,255,255,0.4); margin: 0; letter-spacing: 0.12em; text-transform: uppercase;">
          Amooha Farms Pvt Ltd. · Kristal Quartz 5, Flat # 101, 1st Floor, Kristal Quartz 10, SH 35, Chikkadunnasandra, Yamare, Bangalore 562125 · letsconnect@amoohaafarms.com
        </p>
      </div>
    </div>
  `;

  const confirmationHtml = `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #1a4a2e;">
      <div style="background: #1a4a2e; padding: 24px 32px;">
        <h1 style="color: #d4a853; font-size: 22px; margin: 0; font-weight: 400; letter-spacing: 0.05em;">
          We've Received Your Enquiry — Amoohaa Farms
        </h1>
      </div>
      <div style="padding: 32px; background: #faf6ef; border: 1px solid #e8e0d0; font-size: 15px; color: #3d3d36; line-height: 1.8;">
        <p>Hi ${escHtml(name)},</p>
        <p>Thank you for reaching out to Amoohaa Farms. We've received your enquiry and our team will get back to you within 1–2 business days.</p>
        <p style="margin-top: 24px; font-size: 12px; color: #8a8a80;">A copy of your message:</p>
        <p style="font-size: 14px; color: #3d3d36; line-height: 1.8; white-space: pre-wrap; border-left: 3px solid #e8e0d0; padding-left: 12px;">${escHtml(message)}</p>
      </div>
      <div style="padding: 16px 32px; background: #1a4a2e;">
        <p style="font-size: 11px; color: rgba(255,255,255,0.4); margin: 0; letter-spacing: 0.12em; text-transform: uppercase;">
          Amooha Farms Pvt Ltd. · Kristal Quartz 5, Flat # 101, 1st Floor, Kristal Quartz 10, SH 35, Chikkadunnasandra, Yamare, Bangalore 562125 · letsconnect@amoohaafarms.com
        </p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"${CONTACT_FROM_NAME ?? "Amoohaa Farms Website"}" <${SMTP_USER}>`,
      to: CONTACT_TO,
      replyTo: `"${name}" <${email}>`,
      subject: `New Enquiry: ${enquiryType ?? "General"} — ${name}`,
      html: htmlBody,
      text: `New enquiry from ${name} (${email})\nCompany: ${company ?? "—"}\nType: ${enquiryType ?? "—"}\n\n${message}`,
    });

    try {
      await transporter.sendMail({
        from: `"${CONTACT_FROM_NAME ?? "Amoohaa Farms"}" <${SMTP_USER}>`,
        to: email,
        subject: "We've received your enquiry — Amoohaa Farms",
        html: confirmationHtml,
        text: `Hi ${name},\n\nThank you for reaching out to Amoohaa Farms. We've received your enquiry and our team will get back to you within 1-2 business days.\n\nYour message:\n${message}`,
      });
    } catch (err) {
      console.error("Failed to send enquiry confirmation email to submitter:", err);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to send contact email:", err);
    return NextResponse.json(
      { error: "Failed to send your message. Please try again or email us directly." },
      { status: 500 }
    );
  }
}

function escHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
