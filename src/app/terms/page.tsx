"use client";

import Link from "next/link";
import { useT } from "@/i18n/language-provider";
import {
  PolicyBreadcrumb,
  PolicyHero,
  PolicySectionBlock,
  policyStyles,
  POLICY_ADDRESS,
  POLICY_EMAIL,
} from "@/components/policy-page";

const LAST_UPDATED = "24 May 2026";

export default function TermsPage() {
  const t = useT();
  const c = t.legal.common;
  const tt = t.legal.terms;

  return (
    <>
      <style>{policyStyles}</style>

      <div style={{ background: "#faf6ef" }}>
        <PolicyHero
          eyebrow={c.eyebrow}
          title={c.termsTitle}
          lastUpdatedLabel={c.lastUpdated}
          lastUpdated={LAST_UPDATED}
        />

        <PolicyBreadcrumb homeLabel={c.home} current={tt.breadcrumbLabel} />

        <div className="policy-body">
          <p className="policy-intro">{tt.intro}</p>

          {tt.sections.map((section) => (
            <PolicySectionBlock key={section.num} section={section} />
          ))}

          <hr className="policy-rule" />

          <div className="policy-contact-box">
            <strong>{c.questionsAbout}</strong><br />
            {c.contactUsAt}{" "}
            <a href={`mailto:${POLICY_EMAIL}`} className="policy-link">{POLICY_EMAIL}</a><br />
            {POLICY_ADDRESS}
          </div>

          <div className="policy-footer-links">
            <Link href="/privacy" className="policy-link">{tt.privacyLink}</Link>
            <Link href="/returns" className="policy-link">{tt.returnsFooterLink}</Link>
          </div>
        </div>
      </div>
    </>
  );
}
