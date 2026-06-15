import { escHtml, sendMail } from "@/lib/email";

function appUrl(): string {
  return process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
}

function layout(opts: { heading: string; bodyHtml: string }): string {
  return `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #1a4a2e;">
      <div style="background: #1a4a2e; padding: 24px 32px;">
        <h1 style="color: #d4a853; font-size: 22px; margin: 0; font-weight: 400; letter-spacing: 0.05em;">
          ${escHtml(opts.heading)} — Amoohaa Farms
        </h1>
      </div>
      <div style="padding: 32px; background: #faf6ef; border: 1px solid #e8e0d0; font-size: 15px; color: #3d3d36; line-height: 1.8;">
        ${opts.bodyHtml}
      </div>
      <div style="padding: 16px 32px; background: #1a4a2e;">
        <p style="font-size: 11px; color: rgba(255,255,255,0.4); margin: 0; letter-spacing: 0.12em; text-transform: uppercase;">
          Amoohaa Farms · Agra-Mathura Highway, Agra · letsconnect@amoohaafarms.com
        </p>
      </div>
    </div>
  `;
}

function button(href: string, label: string): string {
  return `
    <a href="${escHtml(href)}" style="display: inline-block; margin-top: 8px; padding: 12px 28px; background: #d4a853; color: #1a4a2e; font-weight: bold; text-decoration: none; text-transform: uppercase; letter-spacing: 0.1em; font-size: 12px;">
      ${escHtml(label)}
    </a>
  `;
}

export async function sendVerificationEmail(to: string, name: string, token: string): Promise<void> {
  const link = `${appUrl()}/verify-email/${token}`;
  const html = layout({
    heading: "Verify Your Email",
    bodyHtml: `
      <p>Hi ${escHtml(name)},</p>
      <p>Thanks for creating an account with Amoohaa Farms. Please verify your email address to activate your account.</p>
      ${button(link, "Verify Email")}
      <p style="margin-top: 24px; font-size: 12px; color: #8a8a80;">If the button doesn't work, copy and paste this link into your browser:<br />${escHtml(link)}</p>
      <p style="margin-top: 16px; font-size: 12px; color: #8a8a80;">This link expires in 24 hours. If you didn't create this account, you can ignore this email.</p>
    `,
  });

  await sendMail({
    to,
    subject: "Verify your email — Amoohaa Farms",
    html,
    text: `Hi ${name},\n\nVerify your email by visiting: ${link}\n\nThis link expires in 24 hours. If you didn't create this account, you can ignore this email.`,
  });
}

export async function sendWelcomeEmail(to: string, name: string): Promise<void> {
  const html = layout({
    heading: "Welcome to Amoohaa Farms",
    bodyHtml: `
      <p>Hi ${escHtml(name)},</p>
      <p>Welcome to Amoohaa Farms! Your account has been created successfully.</p>
      <p>You can now browse our farm-fresh products, place orders, and track them from your account dashboard.</p>
      ${button(`${appUrl()}/products`, "Start Shopping")}
    `,
  });

  await sendMail({
    to,
    subject: "Welcome to Amoohaa Farms",
    html,
    text: `Hi ${name},\n\nWelcome to Amoohaa Farms! Your account has been created successfully.\n\nYou can now browse our farm-fresh products at ${appUrl()}/products.`,
  });
}

export async function sendPasswordResetEmail(to: string, name: string, token: string): Promise<void> {
  const link = `${appUrl()}/reset-password/${token}`;
  const html = layout({
    heading: "Reset Your Password",
    bodyHtml: `
      <p>Hi ${escHtml(name)},</p>
      <p>We received a request to reset your password. Click the button below to choose a new one.</p>
      ${button(link, "Reset Password")}
      <p style="margin-top: 24px; font-size: 12px; color: #8a8a80;">If the button doesn't work, copy and paste this link into your browser:<br />${escHtml(link)}</p>
      <p style="margin-top: 16px; font-size: 12px; color: #8a8a80;">This link expires in 1 hour. If you didn't request this, you can safely ignore this email — your password will not be changed.</p>
    `,
  });

  await sendMail({
    to,
    subject: "Reset your password — Amoohaa Farms",
    html,
    text: `Hi ${name},\n\nReset your password by visiting: ${link}\n\nThis link expires in 1 hour. If you didn't request this, you can ignore this email.`,
  });
}
