#!/usr/bin/env node
/**
 * BlackRoad Brand Color Validator
 * Scans source files for forbidden colors and validates brand compliance
 * Usage: node scripts/brand-validator.js [--dir=src/] [--fix]
 */

const fs = require('fs');
const path = require('path');

const BRAND_COLORS = {
  black: '#000000',
  white: '#FFFFFF',
  amber: '#F5A623',
  'hot-pink': '#FF1D6C',
  'electric-blue': '#2979FF',
  violet: '#9C27B0',
};

const GRADIENT = 'linear-gradient(135deg, #F5A623 0%, #FF1D6C 38.2%, #9C27B0 61.8%, #2979FF 100%)';

const FORBIDDEN = [
  '#FF9D00', '#FF6B00', '#FF0066', '#FF006B', '#D600AA', '#7700FF', '#0066FF',
].map(c => c.toLowerCase());

const SCAN_EXTENSIONS = ['.css', '.scss', '.ts', '.tsx', '.js', '.jsx', '.html', '.json'];

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8').toLowerCase();
  const issues = [];
  for (const forbidden of FORBIDDEN) {
    if (content.includes(forbidden)) {
      issues.push({ file: filePath, color: forbidden.toUpperCase(), type: 'FORBIDDEN' });
    }
  }
  return issues;
}

function scanDirectory(dir) {
  const allIssues = [];
  if (!fs.existsSync(dir)) return allIssues;
  
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory() && !['node_modules', '.git', 'dist', '.next'].includes(entry.name)) {
      allIssues.push(...scanDirectory(fullPath));
    } else if (entry.isFile() && SCAN_EXTENSIONS.includes(path.extname(entry.name))) {
      // Skip this validator script itself (it contains forbidden color strings by definition)
      if (path.resolve(fullPath) !== path.resolve(__filename)) {
        allIssues.push(...scanFile(fullPath));
      }
    }
  }
  return allIssues;
}

function printReport(issues) {
  console.log('\n🎨 BlackRoad Brand Color Validator\n');
  console.log('Brand Colors:');
  for (const [name, hex] of Object.entries(BRAND_COLORS)) {
    console.log(`  ✓ ${name.padEnd(16)} ${hex}`);
  }
  console.log('\nGradient:');
  console.log(`  ${GRADIENT}\n`);
  
  if (issues.length === 0) {
    console.log('✅ No forbidden colors found! Brand compliance: PASS\n');
    return 0;
  }
  
  console.log(`❌ Found ${issues.length} brand violation(s):\n`);
  for (const issue of issues) {
    console.log(`  ${issue.file}: ${issue.color} (${issue.type})`);
  }
  console.log('\nReplace with:');
  console.log('  #F5A623 → amber     #FF1D6C → hot-pink');
  console.log('  #9C27B0 → violet    #2979FF → electric-blue\n');
  return 1;
}

// Run
const dir = process.argv.find(a => a.startsWith('--dir='))?.split('=')[1] || '.';
const issues = scanDirectory(dir);
process.exit(printReport(issues));
