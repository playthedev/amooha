"use client";

import Link from "next/link";
import { useT } from "@/i18n/language-provider";
import {
  PolicyBreadcrumb,
  PolicyHero,
  PolicySectionBlock,
  policyStyles,
  POLICY_ADDRESS,
  POLICY_COMPANY,
  POLICY_EMAIL,
} from "@/components/policy-page";

const LAST_UPDATED = "24 May 2026";

export default function PrivacyPage() {
  const t = useT();
  const c = t.legal.common;
  const tp = t.legal.privacy;

  return (
    <>
      <style>{policyStyles}</style>

      <div style={{ background: "#faf6ef" }}>
        <PolicyHero
          eyebrow={c.eyebrow}
          title={c.privacyTitle}
          lastUpdatedLabel={c.lastUpdated}
          lastUpdated={LAST_UPDATED}
        />

        <PolicyBreadcrumb homeLabel={c.home} current={tp.breadcrumbLabel} />

        <div className="policy-body">
          <p className="policy-intro">{tp.intro}</p>

          {tp.sections.map((section) => (
            <PolicySectionBlock key={section.num} section={section} />
          ))}

          <hr className="policy-rule" />

          <div className="policy-contact-box">
            <strong>{tp.grievanceOfficer}</strong><br />
            {POLICY_COMPANY}<br />
            <a href={`mailto:${POLICY_EMAIL}`} className="policy-link">{POLICY_EMAIL}</a><br />
            {POLICY_ADDRESS}
          </div>

          <div className="policy-footer-links">
            <Link href="/terms" className="policy-link">{tp.termsLink}</Link>
            <Link href="/returns" className="policy-link">{tp.returnsLink}</Link>
          </div>
        </div>
      </div>
    </>
  );
}
