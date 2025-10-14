"use client";

import { useEffect, useState } from "react";

const texts = {
  en: {
    title: "We use cookies",
    desc: "We use cookies to improve your experience, analyze traffic, and for marketing.",
    accept: "Accept all",
    reject: "Reject",
    policy: "Learn more",
  },
  fr: {
    title: "Nous utilisons des cookies",
    desc: "Nous utilisons des cookies pour améliorer votre expérience, analyser le trafic et à des fins marketing.",
    accept: "Tout accepter",
    reject: "Refuser",
    policy: "En savoir plus",
  },
};

export default function CookieConsent({ locale = "en", initialOpen = true, policyHref = "/en/legal-page" }) {
  const t = texts[locale] || texts.en;
  const [open, setOpen] = useState(initialOpen);

  useEffect(() => {
    // if cookie already set by server render or another tab, close
    const v = document.cookie.match(/(?:^|;\s*)cookie-consent=([^;]+)/)?.[1];
    if (v === "granted" || v === "denied") setOpen(false);
  }, []);

  function setConsent(val) {
    // 6 months
    const maxAge = 60 * 60 * 24 * 180;
    document.cookie = `cookie-consent=${val}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
    setOpen(false);
    // let the app know (optional)
    window.dispatchEvent(new CustomEvent("cookie-consent-update", { detail: { value: val } }));
  }

  if (!open) return null;

  return (
    <div style={{
      position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 50,
      background: "rgba(17,17,17,0.98)", color: "white", padding: "16px",
      boxShadow: "0 -4px 16px rgba(0,0,0,0.25)"
    }}>
      <div style={{maxWidth: 1000, margin: "0 auto", display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap"}}>
        <div style={{flex: 1, minWidth: 260}}>
          <div style={{fontWeight: 600, marginBottom: 6}}>{t.title}</div>
          <div style={{opacity: 0.9}}>{t.desc} <a href={policyHref} style={{textDecoration: "underline", color: "white"}}>{t.policy}</a>.</div>
        </div>
        <div style={{display: "flex", gap: 8}}>
          <button onClick={() => setConsent("denied")} style={{padding: "10px 14px", borderRadius: 8, border: "1px solid #fff", background: "transparent", color: "white"}}>
            {t.reject}
          </button>
          <button onClick={() => setConsent("granted")} style={{padding: "10px 14px", borderRadius: 8, border: 0, background: "white", color: "black", fontWeight: 600}}>
            {t.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
