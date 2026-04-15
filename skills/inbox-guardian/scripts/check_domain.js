#!/usr/bin/env node
/**
 * check_domain.js — Look up a domain in email_labler_domain_rules
 * Usage: node check_domain.js <domain> [email_provider]
 * Output: JSON { ok, found, rule } or { ok: false, error }
 */

const { execSync } = require('child_process');

const DOMAIN = process.argv[2];
const PROVIDER = process.argv[3];

if (!DOMAIN) {
  console.error(JSON.stringify({ ok: false, error: 'Usage: node check_domain.js <domain> [email_provider]' }));
  process.exit(1);
}

let url = `https://tvhvpwcbpntlsthgyyod.supabase.co/rest/v1/email_labler_domain_rules?domain=eq.${encodeURIComponent(DOMAIN)}&limit=1`;
if (PROVIDER) {
  url += `&email_provider=eq.${encodeURIComponent(PROVIDER)}`;
}

try {
  const res = execSync(
    `curl -s "${url}" ` +
    `-H "apikey: sbp_596d324e828e4f0462674ed273e0f73c74761837" ` +
    `-H "Authorization: Bearer sbp_596d324e828e4f0462674ed273e0f73c74761837"`,
    { encoding: 'utf8' }
  );

  const rules = JSON.parse(res);
  if (Array.isArray(rules) && rules.length > 0) {
    console.log(JSON.stringify({ ok: true, found: true, rule: rules[0] }));
  } else {
    console.log(JSON.stringify({ ok: true, found: false }));
  }
} catch (e) {
  console.error(JSON.stringify({ ok: false, error: e.message }));
  process.exit(1);
}
