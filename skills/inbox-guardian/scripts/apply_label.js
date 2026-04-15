#!/usr/bin/env node
/**
 * apply_label.js — Apply a Gmail label/action to a message via gog
 * 
 * Usage: node apply_label.js <message_id> <label_name> <remove_inbox> <account>
 * 
 * Example - archive with Newsletter label:
 *   node apply_label.js "msg123" "Newsletter" true "suzzy"
 * 
 * Example - mark as read and keep in INBOX:
 *   node apply_label.js "msg123" "Work" false "suzzy"
 * 
 * remove_inbox: "true" means remove INBOX (archive), "false" means keep in INBOX
 * 
 * Gmail API: addLabelIds + removeLabelIds are applied atomically in one call.
 * System labels (INBOX, TRASH, UNREAD) and custom labels work identically.
 */

const { execSync } = require('child_process');

const MSG_ID = process.argv[2];
const LABEL = process.argv[3];
const REMOVE_INBOX = process.argv[4] === 'true';
const PROVIDER = process.argv[5] || 'suzzy';

const ACCOUNT_MAP = {
  suzy: 'suzzyp178@gmail.com',
};

const ACCOUNT = ACCOUNT_MAP[PROVIDER] || PROVIDER;
const GOG_BIN = '/data/gog-v0.12.0';

if (!MSG_ID || !LABEL) {
  console.error(JSON.stringify({
    ok: false,
    error: 'Usage: node apply_label.js <message_id> <label_name> <remove_inbox> [account]'
  }));
  process.exit(1);
}

function gog(args) {
  const env = { ...process.env, GOG_KEYRING_PASSWORD: 'gogsecrets123' };
  const cmd = `${GOG_BIN} ${args} -j -a ${ACCOUNT}`;
  return JSON.parse(execSync(cmd, { env, maxBuffer: 10 * 1024 * 1024 }));
}

async function apply() {
  try {
    // Build the modify command
    // --add adds a label, --remove removes a label — both happen atomically
    let cmd = `gmail messages modify ${MSG_ID} --add "${LABEL}"`;
    if (REMOVE_INBOX) {
      cmd += ` --remove INBOX`;
    }
    
    const result = gog(cmd);
    
    return {
      ok: true,
      action: 'labeled',
      label: LABEL,
      removedInbox: REMOVE_INBOX,
      messageId: MSG_ID,
      account: ACCOUNT
    };
  } catch (e) {
    return {
      ok: false,
      error: e.message,
      messageId: MSG_ID,
      label: LABEL,
      account: ACCOUNT
    };
  }
}

apply().then(r => {
  console.log(JSON.stringify(r, null, 2));
}).catch(e => {
  console.error(JSON.stringify({ ok: false, error: e.message }));
  process.exit(1);
});
