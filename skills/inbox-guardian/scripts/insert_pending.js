#!/usr/bin/env node
/**
 * insert_pending.js — Insert an entry into email_labler_pending_review
 * Usage: node insert_pending.js '<json_payload>'
 * Output: JSON { ok, id } or { ok: false, error }
 */

const { execSync } = require('child_process');

let payload;
try {
  payload = JSON.parse(process.argv[2]);
} catch (e) {
  console.error(JSON.stringify({ ok: false, error: 'Invalid JSON payload' }));
  process.exit(1);
}

const required = ['domain', 'from_address', 'subject', 'suggested_action', 'confidence_score', 'ai_reasoning'];
for (const field of required) {
  if (payload[field] === undefined) {
    console.error(JSON.stringify({ ok: false, error: `Missing required field: ${field}` }));
    process.exit(1);
  }
}

try {
  const res = execSync(
    `curl -s -X POST "https://tvhvpwcbpntlsthgyyod.supabase.co/rest/v1/email_labler_pending_review" ` +
    `-H "apikey: sbp_596d324e828e4f0462674ed273e0f73c74761837" ` +
    `-H "Authorization: Bearer sbp_596d324e828e4f0462674ed273e0f73c74761837" ` +
    `-H "Content-Type: application/json" ` +
    `-H "Prefer: return=representation" ` +
    `-d '${JSON.stringify({
      domain: payload.domain,
      email_provider: payload.email_provider || null,
      from_address: payload.from_address,
      subject: payload.subject,
      body_preview: (payload.body_preview || '').slice(0, 500),
      suggested_label_id: payload.suggested_label_id || null,
      suggested_action: payload.suggested_action,
      confidence_score: payload.confidence_score,
      ai_reasoning: payload.ai_reasoning,
      alternative_label: payload.alternative_label || null,
      alternative_confidence: payload.alternative_confidence || null,
      status: 'pending',
      seen_count: payload.seen_count || 1,
    })}'`,
    { encoding: 'utf8' }
  );

  const result = JSON.parse(res);
  const id = result[0]?.id;
  if (id) {
    console.log(JSON.stringify({ ok: true, id }));
  } else {
    console.log(JSON.stringify({ ok: false, error: 'Insert failed', detail: result }));
  }
} catch (e) {
  console.error(JSON.stringify({ ok: false, error: e.message }));
  process.exit(1);
}
