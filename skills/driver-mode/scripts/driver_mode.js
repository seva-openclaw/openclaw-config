#!/usr/bin/env node
/**
 * driver_mode.js - Driving mode state manager
 * Usage: node driver_mode.js <on|off|status>
 */

const fs = require('fs');
const path = '/data/workspace-coding/driving_mode.txt';

const validModes = ['on', 'off', 'status'];

function read() {
  try {
    return fs.readFileSync(path, 'utf8').trim();
  } catch {
    return 'off';
  }
}

function write(mode) {
  fs.writeFileSync(path, mode + '\n');
}

const arg = process.argv[2]?.toLowerCase();

if (!arg || !validModes.includes(arg)) {
  console.log('Usage: driver_mode.js <on|off|status>');
  process.exit(1);
}

if (arg === 'status') {
  const current = read();
  console.log(current);
  process.exit(0);
}

write(arg);
console.log(arg);
