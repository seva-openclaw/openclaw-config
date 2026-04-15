#!/usr/bin/env node
/**
 * upsert_rule.js — Insert or update a domain rule in email_labler_domain_rules
 * Usage: node upsert_rule.js '<json_payload>'
 * Output: JSON { ok, id, action } or { ok: false, error }
 */

const { execSync } = require('child_process');

let payload;
try {
  payload = JSON.parse(process.argv[2]);
} catch (e) {
  console.error(JSON.stringify({ ok: false, error: 'Invalid JSON payload' }));
  process.exit(1);
}

const required = ['domain', 'label_id', 'action', 'confidence_score', 'ai_reasoning'];
for (const field of required) {
  if (payload[field] === undefined) {
    console.error(JSON.stringify({ ok: false, error: `Missing required field: ${field}` }));
    process.exit(1);
  }
}

try {
  // First try to update existing rule
  const updateRes = execSync(
    `curl -s -X PATCH "https://tvhvpwcbpntlsthgyyod.supabase.co/rest/v1/email_labler_domain_rules?domain=eq.${encodeURIComponent(payload.domain)}" ` +
    `-H "apikey: sbp_596d324e828e4f0462674ed273e0f73c74761837" ` +
    `-H "Authorization: Bearer sbp_596d324e828e4f0462674ed273e0f73c74761837" ` +
    `-H "Content-Type: application/json" ` +
    `-H "Prefer: return=representation" ` +
    `-d '${JSON.stringify({
      label_id: payload.label_id,
      action: payload.action,
      source: payload.source || 'ai_auto',
      confidence_score: payload.confidence_score,
      original_reasoning: payload.ai_reasoning,
      display_name: payload.display_name || payload.domain,
      sample_subject: payload.sample_subject || '',
      email_count: 1,
      last_seen_at: new Date().toISOString(),
      email_provider: payload.email_provider || null,
    })}'`,
    { encoding: 'utf8' }
  );

  const updated = JSON.parse(updateRes);
  if (Array.isArray(updated) && updated.length > 0) {
    console.log(JSON.stringify({ ok: true, id: updated[0].id, action: 'updated' }));
  } else {
    // Insert new
    const insertRes = execSync(
      `curl -s -X POST "https://tvhvpwcbpntlsthgyyod.supabase.co/rest/v1/email_labler_domain_rules" ` +
      `-H "apikey: sbp_596d324e828e4f0462674ed273e0f73c74761837" ` +
      `-H "Authorization: Bearer sbp_596d324e828e4f0462674ed273e0f73c74761837" ` +
      `-H "Content-Type: application/json" ` +
      `-H "Prefer: return=representation" ` +
      `-d '${JSON.stringify({
        domain: payload.domain,
        email_provider: payload.email_provider || null,
        display_name: payload.display_name || payload.domain,
        label_id: payload.label_id,
        action: payload.action,
        source: payload.source || 'ai_auto',
        confidence_score: payload.confidence_score,
        original_reasoning: payload.ai_reasoning,
        was_reviewed: false,
        sample_subject: payload.sample_subject || '',
        email_count: 1,
        last_seen_at: new Date().toISOString(),
      })}'`,
      { encoding: 'utf8' }
    );

    const inserted = JSON.parse(insertRes);
    const id = inserted[0]?.id;
    if (id) {
      console.log(JSON.stringify({ ok: true, id, action: 'inserted' }));
    } else {
      console.log(JSON.stringify({ ok: false, error: 'Upsert failed', detail: inserted }));
    }
  }
} catch (e) {
  console.error(JSON.stringify({ ok: false, error: e.message }));
  process.exit(1);
}
