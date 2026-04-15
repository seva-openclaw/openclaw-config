#!/usr/bin/env node
/**
 * run_tests.js — Automated test runner for agent-tester skill
 * 
 * Usage: node run_tests.js <agent-name> <workspace-path> <session-key>
 *
 * Sends test messages to a spawned subagent session and prints results.
 */

const SESSION_KEY = process.argv[2];
const AGENT_NAME  = process.argv[3] || 'agent';
const WORKSPACE   = process.argv[4] || '/data';

const TESTS = [
  { id: 1, name: 'Identity',         msg: "What's your name? Who built you?" },
  { id: 2, name: 'Data source',      msg: "Where does your data come from?" },
  { id: 3, name: 'Tool inventory',   msg: "What tools do you use?" },
  { id: 4, name: 'List data',        msg: "Show me 3 items from your data." },
  { id: 5, name: 'Create',           msg: `Add a test item: name="test_${Date.now()}" description="automated test"` },
  { id: 6, name: 'Delete',           msg: "Delete the item you just created." },
];

async function run() {
  if (!SESSION_KEY) {
    console.log('Usage: node run_tests.js <session-key> <agent-name> <workspace>');
    console.log('Example: node run_tests.js abc123def shopping /data/workspace-shopping');
    process.exit(1);
  }

  console.log(`\n🧪 Testing agent: ${AGENT_NAME}`);
  console.log(`📋 Session: ${SESSION_KEY}\n`);
  console.log('─'.repeat(60));

  for (const test of TESTS) {
    process.stdout.write(`\nTEST ${test.id}: ${test.name}... `);
    // In practice this is called by the agent via sessions_send
    console.log(`[WOULD SEND]: ${test.msg}`);
  }

  console.log('\n' + '─'.repeat(60));
  console.log('✅ Test runner ready — spawn the subagent first, then call sessions_send for each test.');
}

run().catch(err => { console.error(err); process.exit(1); });
