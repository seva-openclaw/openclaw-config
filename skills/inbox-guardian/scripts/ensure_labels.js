#!/usr/bin/env node
/**
 * ensure_labels.js — Sync Supabase labels to Gmail
 * 
 * Creates any missing Gmail labels from the email_labler_labels table.
 * Run this once after adding new labels to Supabase.
 * 
 * Usage: node ensure_labels.js [account]
 * Example: node ensure_labels.js suzy
 */

const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://tvhvpwcbpntlsthgyyod.supabase.co';
const SUPABASE_PAT = process.env.SUPABASE_SERVICE_PAT || 'sbp_596d324e828e4f0462674ed273e0f73c74761837';
const ACCOUNT = process.argv[2] || 'suzzy';
const ACCOUNT_MAP = { suzy: 'suzzyp178@gmail.com' };
const GMAIL_ACCOUNT = ACCOUNT_MAP[ACCOUNT] || ACCOUNT;

const { execSync } = require('child_process');
const GOG_BIN = '/data/gog-v0.12.0';

function gog(args) {
  const env = { ...process.env, GOG_KEYRING_PASSWORD: 'gogsecrets123' };
  const cmd = `${GOG_BIN} ${args} -j -a ${GMAIL_ACCOUNT}`;
  return JSON.parse(execSync(cmd, { env, maxBuffer: 10 * 1024 * 1024 }));
}

async function main() {
  // Get labels from Supabase
  const sb = createClient(SUPABASE_URL, SUPABASE_PAT);
  const { data: labels, error } = await sb
    .from('email_labler_labels')
    .select('id, name, description')
    .eq('is_active', true)
    .order('name');

  if (error) {
    console.error('Failed to fetch labels from Supabase:', error.message);
    process.exit(1);
  }

  console.log(`Found ${labels.length} labels in Supabase:`);
  for (const label of labels) {
    console.log(`  - ${label.name}`);
  }

  // Get existing Gmail labels
  let existingLabels = [];
  try {
    const result = gog('gmail labels list');
    existingLabels = (result.labels || []).map(l => l.name);
    console.log(`\nGmail has ${existingLabels.length} labels`);
  } catch (e) {
    console.warn('Could not list Gmail labels (auth may be missing):', e.message);
  }

  // Create missing labels
  console.log('\nSyncing to Gmail...');
  let created = 0;
  let skipped = 0;

  for (const label of labels) {
    if (existingLabels.includes(label.name)) {
      console.log(`  ✓ ${label.name} (already exists)`);
      skipped++;
      continue;
    }

    try {
      const result = gog(`gmail labels create "${label.name}"`);
      console.log(`  + ${label.name} (created${result.alreadyExists ? ', was duplicate' : ''})`);
      created++;
    } catch (e) {
      if (e.message.includes('already exists')) {
        console.log(`  ✓ ${label.name} (already exists)`);
        skipped++;
      } else {
        console.warn(`  ! ${label.name} (failed: ${e.message})`);
      }
    }
  }

  console.log(`\nDone: ${created} created, ${skipped} already present`);
  if (created > 0) {
    console.log('Gmail labels are now in sync with Supabase.');
  }
}

main().catch(e => {
  console.error('Error:', e.message);
  process.exit(1);
});
