#!/usr/bin/env node
/**
 * get_labels.js — Fetch all classification labels from email_labler_labels
 * Usage: node get_labels.js
 * Output: JSON { ok, labels: [{id, name, description, default_action, removes_inbox}] }
 */

const { execSync } = require('child_process');

const SUPABASE_URL = 'https://tvhvpwcbpntlsthgyyod.supabase.co';
const SUPABASE_PAT = process.env.SUPABASE_SERVICE_PAT || 'sbp_596d324e828e4f0462674ed273e0f73c74761837';

try {
  const res = execSync(
    `curl -s "${SUPABASE_URL}/rest/v1/email_labler_labels?select=id,name,description,default_action,removes_inbox&is_active=eq.true&order=name.asc" ` +
    `-H "apikey: ${SUPABASE_PAT}" ` +
    `-H "Authorization: Bearer ${SUPABASE_PAT}"`,
    { encoding: 'utf8' }
  );

  const labels = JSON.parse(res);
  if (Array.isArray(labels)) {
    console.log(JSON.stringify({ ok: true, labels }));
  } else {
    console.log(JSON.stringify({ ok: false, error: 'Unexpected response', detail: labels }));
  }
} catch (e) {
  console.error(JSON.stringify({ ok: false, error: e.message }));
  process.exit(1);
}
