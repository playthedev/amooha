import Link from "next/link";
import type { ReactNode } from "react";

export type PolicySection = {
  num: string;
  title: string;
  paragraphs?: string[];
  paragraphsAfter?: string[];
  list?: string[];
  listAfter?: string[];
  highlight?: string;
  table?: { headers: string[]; rows: string[][] };
  steps?: { title: string; text: string }[];
};

const COMPANY = "Amooha Farms Pvt Ltd.";
const EMAIL = "letsconnect@amoohaafarms.com";
const ADDRESS = "Kristal Quartz 5, Flat # 101, 1st Floor, Kristal Quartz 10, SH 35, Chikkadunnasandra, Yamare, Bangalore 562125";

export function fillTokens(text: string): ReactNode {
  const parts = text.split(/(\{COMPANY\}|\{EMAIL\}|\{ADDRESS\})/g);
  return parts.map((part, i) => {
    if (part === "{COMPANY}") return <strong key={i}>{COMPANY}</strong>;
    if (part === "{EMAIL}")
      return (
        <a key={i} href={`mailto:${EMAIL}`} className="policy-link">
          {EMAIL}
        </a>
      );
    if (part === "{ADDRESS}") return <span key={i}>{ADDRESS}</span>;
    return <span key={i}>{part}</span>;
  });
}

export const POLICY_COMPANY = COMPANY;
export const POLICY_EMAIL = EMAIL;
export const POLICY_ADDRESS = ADDRESS;

export const policyStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');

  .policy-hero { background: #1a4a2e; padding: 5rem 1.5rem 4rem; box-sizing: border-box; text-align: center; }
  .policy-eyebrow { font-family: 'DM Sans', sans-serif; font-size: .6rem; font-weight: 700; letter-spacing: .28em; text-transform: uppercase; color: rgba(212,168,83,.8); display: block; margin-bottom: 1rem; }
  .policy-hero-title { font-family: 'Playfair Display', serif; font-size: clamp(1.8rem, 5vw, 3.5rem); font-weight: 400; font-style: italic; color: #fff; line-height: 1.12; margin: 0; }
  .policy-updated { font-family: 'DM Sans', sans-serif; font-size: .7rem; color: rgba(255,255,255,.45); margin-top: 1rem; letter-spacing: .1em; }
  .policy-body { max-width: 820px; margin: 0 auto; padding: 4rem 1.5rem 7rem; font-family: 'DM Sans', sans-serif; box-sizing: border-box; }
  .policy-intro { font-size: 1rem; color: #3d3d36; line-height: 1.85; margin-bottom: 3rem; padding-bottom: 2rem; border-bottom: 1px solid rgba(26,74,46,.1); }
  .policy-section { margin-bottom: 2.75rem; }
  .policy-section-num { font-size: .58rem; font-weight: 700; letter-spacing: .24em; text-transform: uppercase; color: #b8893a; display: block; margin-bottom: .5rem; }
  .policy-section-title { font-family: 'Playfair Display', serif; font-size: 1.35rem; font-weight: 500; color: #1a4a2e; margin: 0 0 1rem; }
  .policy-text { font-size: .92rem; color: #3d3d36; line-height: 1.85; margin: 0 0 .85rem; }
  .policy-text:last-child { margin-bottom: 0; }
  .policy-list { margin: .5rem 0 .85rem 1.25rem; padding: 0; font-size: .92rem; color: #3d3d36; line-height: 1.85; }
  .policy-list li { margin-bottom: .4rem; }
  .policy-link { color: #1a4a2e; font-weight: 600; text-decoration: underline; text-underline-offset: 3px; }
  .policy-rule { border: none; border-top: 1px solid rgba(26,74,46,.1); margin: 3rem 0; }
  .policy-contact-box { background: #f2ede4; padding: 2rem; border: 1px solid rgba(26,74,46,.1); font-size: .88rem; color: #3d3d36; line-height: 1.8; }
  .policy-contact-box strong { color: #1a4a2e; }
  .policy-breadcrumb { display: flex; align-items: center; gap: .4rem; font-family: 'DM Sans', sans-serif; font-size: .62rem; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; color: #5a5550; max-width: 820px; margin: 1.5rem auto 0; padding: 0 1.5rem; }
  .policy-breadcrumb a { color: #1a4a2e; text-decoration: none; }
  .policy-breadcrumb a:hover { color: #b8893a; }
  .policy-breadcrumb-sep { opacity: .35; }
  .policy-table { width: 100%; border-collapse: collapse; font-size: .85rem; margin: 1rem 0; }
  .policy-table th { background: #1a4a2e; color: #fff; padding: .75rem 1rem; text-align: left; font-weight: 700; letter-spacing: .1em; font-size: .72rem; text-transform: uppercase; }
  .policy-table td { padding: .75rem 1rem; border-bottom: 1px solid rgba(26,74,46,.08); color: #3d3d36; vertical-align: top; }
  .policy-table tr:last-child td { border-bottom: none; }
  .policy-table tr:nth-child(even) td { background: rgba(26,74,46,.03); }
  .policy-highlight { background: #f0ede6; border-left: 3px solid #d4a853; padding: 1.1rem 1.4rem; margin: 1.25rem 0; font-size: .88rem; color: #3d3d36; line-height: 1.75; }
  .policy-highlight strong { color: #1a4a2e; }
  .policy-steps { margin: 1rem 0; display: flex; flex-direction: column; gap: 1px; }
  .policy-step { display: flex; gap: 1.25rem; align-items: flex-start; background: #f7f3ec; padding: 1.1rem 1.25rem; border: 1px solid rgba(26,74,46,.09); }
  .policy-step-num { width: 28px; height: 28px; border-radius: 50%; flex-shrink: 0; background: #1a4a2e; color: #fff; font-size: .7rem; font-weight: 700; display: flex; align-items: center; justify-content: center; }
  .policy-step-body { flex: 1; }
  .policy-step-title { font-size: .82rem; font-weight: 700; color: #1a4a2e; margin-bottom: .3rem; }
  .policy-step-text { font-size: .85rem; color: #5a5550; line-height: 1.65; }
  .policy-footer-links { margin-top: 2rem; font-family: 'DM Sans', sans-serif; font-size: .8rem; color: #5a5550; display: flex; gap: 1.5rem; flex-wrap: wrap; }
`;

export function PolicyHero({
  eyebrow,
  title,
  lastUpdatedLabel,
  lastUpdated,
}: {
  eyebrow: string;
  title: string;
  lastUpdatedLabel: string;
  lastUpdated: string;
}) {
  return (
    <div className="policy-hero">
      <span className="policy-eyebrow">{eyebrow}</span>
      <h1 className="policy-hero-title">{title}</h1>
      <p className="policy-updated">{lastUpdatedLabel}: {lastUpdated}</p>
    </div>
  );
}

export function PolicyBreadcrumb({ homeLabel, current }: { homeLabel: string; current: string }) {
  return (
    <nav className="policy-breadcrumb">
      <Link href="/">{homeLabel}</Link>
      <span className="policy-breadcrumb-sep">/</span>
      <span>{current}</span>
    </nav>
  );
}

export function PolicySectionBlock({ section }: { section: PolicySection }) {
  return (
    <div className="policy-section">
      <span className="policy-section-num">{section.num}</span>
      <h2 className="policy-section-title">{section.title}</h2>

      {section.paragraphs?.map((p, i) => (
        <p className="policy-text" key={`p-${i}`}>{fillTokens(p)}</p>
      ))}

      {section.highlight && (
        <div className="policy-highlight">{fillTokens(section.highlight)}</div>
      )}

      {section.table && (
        <table className="policy-table">
          <thead>
            <tr>
              {section.table.headers.map((h, i) => (
                <th key={i}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {section.table.rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j}>{j === 0 ? <strong>{cell}</strong> : cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {section.list && (
        <ul className="policy-list">
          {section.list.map((item, i) => (
            <li key={i}>{fillTokens(item)}</li>
          ))}
        </ul>
      )}

      {section.paragraphsAfter?.map((p, i) => (
        <p className="policy-text" key={`pa-${i}`}>{fillTokens(p)}</p>
      ))}

      {section.listAfter && (
        <ul className="policy-list">
          {section.listAfter.map((item, i) => (
            <li key={i}>{fillTokens(item)}</li>
          ))}
        </ul>
      )}

      {section.steps && (
        <div className="policy-steps">
          {section.steps.map((step, i) => (
            <div className="policy-step" key={i}>
              <div className="policy-step-num">{i + 1}</div>
              <div className="policy-step-body">
                <p className="policy-step-title">{step.title}</p>
                <p className="policy-step-text">{fillTokens(step.text)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
