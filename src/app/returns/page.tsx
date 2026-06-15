"use client";

import Link from "next/link";
import { useT } from "@/i18n/language-provider";
import {
  PolicyBreadcrumb,
  PolicyHero,
  PolicySectionBlock,
  policyStyles,
  POLICY_COMPANY,
  POLICY_EMAIL,
  fillTokens,
} from "@/components/policy-page";

const LAST_UPDATED = "24 May 2026";

export default function ReturnsPage() {
  const t = useT();
  const c = t.legal.common;
  const tr = t.legal.returns;

  return (
    <>
      <style>{policyStyles}</style>

      <div style={{ background: "#faf6ef" }}>
        <PolicyHero
          eyebrow={tr.eyebrow}
          title={c.returnsTitle}
          lastUpdatedLabel={c.lastUpdated}
          lastUpdated={LAST_UPDATED}
        />

        <PolicyBreadcrumb homeLabel={c.home} current={tr.breadcrumbLabel} />

        <div className="policy-body">
          <p className="policy-intro">{fillTokens(tr.intro)}</p>

          {tr.sections.map((section) => (
            <PolicySectionBlock key={section.num} section={section} />
          ))}

          <hr className="policy-rule" />

          <div className="policy-contact-box">
            <strong>{tr.queriesTitle}</strong><br />
            {tr.emailLabel}: <a href={`mailto:${POLICY_EMAIL}`} className="policy-link">{POLICY_EMAIL}</a><br />
            {POLICY_COMPANY}
          </div>

          <div className="policy-footer-links">
            <Link href="/terms" className="policy-link">{tr.termsLink}</Link>
            <Link href="/privacy" className="policy-link">{tr.privacyLink}</Link>
          </div>
        </div>
      </div>
    </>
  );
}
