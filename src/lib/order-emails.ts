import { escHtml, sendMail } from "@/lib/email";
import { CURRENCY_META, isCurrency } from "@/currency/config";
import { minorUnitFactor } from "@/commerce/pricing";
import type { OrderDocument } from "@/models/Order";

function formatAmount(amountMinor: number, currency: string): string {
  if (!isCurrency(currency)) return String(amountMinor);
  const meta = CURRENCY_META[currency];
  const major = amountMinor / minorUnitFactor(currency);
  try {
    return new Intl.NumberFormat(meta.locale, {
      style: "currency",
      currency,
      maximumFractionDigits: meta.fractionDigits,
      minimumFractionDigits: meta.fractionDigits,
    }).format(major);
  } catch {
    return `${meta.symbol}${major.toFixed(meta.fractionDigits)}`;
  }
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

function lineItemsHtml(order: OrderDocument): string {
  return order.lines
    .map(
      (line) => `
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #e8e0d0; font-size: 14px; color: #3d3d36;">
            ${escHtml(line.name)} <span style="color: #8a8a80;">· ${escHtml(line.variantLabel)}</span>
          </td>
          <td style="padding: 8px 0; border-bottom: 1px solid #e8e0d0; font-size: 14px; color: #3d3d36; text-align: right; white-space: nowrap;">
            × ${line.qty}
          </td>
        </tr>
      `,
    )
    .join("");
}

function orderSummaryTable(order: OrderDocument): string {
  return `
    <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
      ${lineItemsHtml(order)}
    </table>
    <p style="margin-top: 16px; font-size: 15px;">
      <strong>Total: ${formatAmount(order.amountMinor, order.currency)}</strong>
    </p>
    <p style="font-size: 12px; color: #8a8a80;">Order ID: ${escHtml(order._id.toString())}</p>
    ${order.razorpayPaymentId ? `<p style="font-size: 12px; color: #8a8a80;">Payment ID: ${escHtml(order.razorpayPaymentId)}</p>` : ""}
  `;
}

export async function sendOrderConfirmationEmails(order: OrderDocument): Promise<void> {
  const shipping = order.shipping!;

  const customerHtml = layout({
    heading: "Order Confirmed",
    bodyHtml: `
      <p>Hi ${escHtml(shipping.fullName)},</p>
      <p>Thank you for your order! We've received your payment and your order is being prepared.</p>
      ${orderSummaryTable(order)}
      <p style="margin-top: 24px; font-size: 12px; color: #8a8a80;">
        Shipping to: ${escHtml(shipping.address)}, ${escHtml(shipping.city)}, ${escHtml(shipping.stateRegion)} ${escHtml(shipping.postalCode)}, ${escHtml(shipping.country)}
      </p>
      <p style="margin-top: 16px;">You can view your order history anytime from your account.</p>
    `,
  });

  const ownerHtml = layout({
    heading: "New Order Received",
    bodyHtml: `
      <p>A new order has been paid for and is ready to be fulfilled.</p>
      ${orderSummaryTable(order)}
      <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #e8e0d0; font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #b8893a; width: 110px;">Customer</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #e8e0d0; font-size: 14px; color: #3d3d36;">${escHtml(shipping.fullName)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #e8e0d0; font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #b8893a;">Email</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #e8e0d0; font-size: 14px;"><a href="mailto:${escHtml(shipping.email)}" style="color: #1a4a2e;">${escHtml(shipping.email)}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #e8e0d0; font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #b8893a;">Phone</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #e8e0d0; font-size: 14px; color: #3d3d36;">${escHtml(shipping.phone)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #e8e0d0; font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #b8893a;">Address</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #e8e0d0; font-size: 14px; color: #3d3d36;">${escHtml(shipping.address)}, ${escHtml(shipping.city)}, ${escHtml(shipping.stateRegion)} ${escHtml(shipping.postalCode)}, ${escHtml(shipping.country)}</td>
        </tr>
      </table>
    `,
  });

  const ownerEmail = process.env.CONTACT_TO;

  await Promise.allSettled([
    sendMail({
      to: shipping.email,
      subject: `Order confirmed — Amoohaa Farms (${formatAmount(order.amountMinor, order.currency)})`,
      html: customerHtml,
      text: `Hi ${shipping.fullName},\n\nThank you for your order! We've received your payment and your order is being prepared.\n\nTotal: ${formatAmount(order.amountMinor, order.currency)}\nOrder ID: ${order._id.toString()}\n\nShipping to: ${shipping.address}, ${shipping.city}, ${shipping.stateRegion} ${shipping.postalCode}, ${shipping.country}`,
    }),
    ownerEmail
      ? sendMail({
          to: ownerEmail,
          subject: `New order received — ${formatAmount(order.amountMinor, order.currency)}`,
          html: ownerHtml,
          text: `New order received.\n\nCustomer: ${shipping.fullName}\nEmail: ${shipping.email}\nPhone: ${shipping.phone}\nAddress: ${shipping.address}, ${shipping.city}, ${shipping.stateRegion} ${shipping.postalCode}, ${shipping.country}\n\nTotal: ${formatAmount(order.amountMinor, order.currency)}\nOrder ID: ${order._id.toString()}`,
        })
      : Promise.resolve(),
  ]).then((results) => {
    for (const result of results) {
      if (result.status === "rejected") {
        console.error("Failed to send order confirmation email:", result.reason);
      }
    }
  });
}
