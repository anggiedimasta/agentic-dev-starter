#!/usr/bin/env node

/**
 * Agentic Dev Starter - Installer
 *
 * Installs agentic development configuration into your project.
 *
 * Usage:
 *   npx agentic-dev-starter
 *   bunx agentic-dev-starter
 */

const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  gray: '\x1b[90m',
  red: '\x1b[31m',
  magenta: '\x1b[35m'
};

const log = {
  info: (msg) => console.log(`${colors.cyan}${msg}${colors.reset}`),
  success: (msg) => console.log(`${colors.green}   ✓ ${msg}${colors.reset}`),
  skip: (msg) => console.log(`${colors.yellow}   ○ ${msg}${colors.reset}`),
  warn: (msg) => console.log(`${colors.yellow}   ! ${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}   ✗ ${msg}${colors.reset}`),
  section: (msg) => console.log(`\n${colors.bold}${msg}${colors.reset}`),
  dim: (msg) => console.log(`${colors.gray}   ${msg}${colors.reset}`)
};

// Provider configurations (ordered by popularity)
const PROVIDERS = [
  { id: 'cursor', name: 'Cursor', dir: '.cursor/rules', description: 'AI-powered IDE with rules system' },
  { id: 'claude', name: 'Claude Code', dir: '.claude', description: 'Anthropic Claude CLI agent' },
  { id: 'copilot', name: 'GitHub Copilot', dir: '.github', description: 'GitHub Copilot Chat instructions' },
  { id: 'cline', name: 'Cline', dir: '.clinerules', description: 'VS Code extension with rules' },
  { id: 'windsurf', name: 'Windsurf', dir: '.windsurf/rules', description: 'Codeium Cascade agent' },
  { id: 'opencode', name: 'OpenCode', dir: '.opencode', description: 'Open-source AI coding tool' },
  { id: 'antigravity', name: 'Antigravity', dir: '.gemini/workflows', description: 'Google Gemini AI IDE' },
  { id: 'trae', name: 'Trae', dir: '.trae', description: 'ByteDance AI coding assistant' },
  { id: 'kiro', name: 'Kiro', dir: '.kiro/agents', description: 'AWS AI coding IDE' },
  { id: 'droid', name: 'Factory Droid', dir: '.factory/droids', description: 'Factory.ai coding agent' }
];

// File conflict options
const CONFLICT_OPTIONS = {
  SKIP: 'skip',
  MERGE: 'merge',
  OVERWRITE: 'overwrite',
  BACKUP: 'backup'
};

// Get template directory (package root, one level up from bin/)
function getTemplateDir() {
  return path.join(__dirname, '..');
}

// Target directory (user's project)
const TARGET_DIR = process.cwd();
const TEMPLATE_DIR = getTemplateDir();

// Get provider config by id
function getProvider(id) {
  return PROVIDERS.find(p => p.id === id);
}

// Select providers with checkbox UI
async function selectProviders() {
  console.log('\n' + colors.bold + colors.magenta + '🚀 Agentic Dev Starter' + colors.reset);
  console.log(colors.gray + '   Universal AI coding assistant configuration\n' + colors.reset);

  // Pad names for alignment
  const maxNameLen = Math.max(...PROVIDERS.map(p => p.name.length));

  const choices = PROVIDERS.map(p => ({
    name: `${p.name.padEnd(maxNameLen)} ${colors.gray}(${p.description})${colors.reset}`,
    value: p.id,
    checked: p.id === 'cursor' // Only Cursor pre-selected
  }));

  const { providers } = await inquirer.prompt([{
    type: 'checkbox',
    name: 'providers',
    message: 'Select AI coding tools (space to toggle, enter to confirm)',
    choices,
    pageSize: 12
  }]);

  return providers;
}

// Handle file conflict
async function handleConflict(filePath) {
  const relativePath = path.relative(TARGET_DIR, filePath);

  const { choice } = await inquirer.prompt([{
    type: 'list',
    name: 'choice',
    message: `File exists: ${relativePath}. What to do?`,
    choices: [
      { name: 'Skip (keep existing)', value: CONFLICT_OPTIONS.SKIP },
      { name: 'Merge (prepend our rules)', value: CONFLICT_OPTIONS.MERGE },
      { name: 'Overwrite', value: CONFLICT_OPTIONS.OVERWRITE },
      { name: 'Backup (rename to .backup)', value: CONFLICT_OPTIONS.BACKUP }
    ]
  }]);

  return choice;
}

// Ensure directory exists
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Copy file with conflict handling
async function copyFile(srcPath, destPath, globalChoice = null) {
  const relativeDest = path.relative(TARGET_DIR, destPath);

  if (!fs.existsSync(srcPath)) {
    log.error(`Template not found: ${path.relative(TEMPLATE_DIR, srcPath)}`);
    return globalChoice;
  }

  ensureDir(path.dirname(destPath));

  if (fs.existsSync(destPath)) {
    let choice = globalChoice;

    if (!choice) {
      choice = await handleConflict(destPath);
    }

    switch (choice) {
      case CONFLICT_OPTIONS.SKIP:
        log.skip(`Skipped: ${relativeDest}`);
        return choice;

      case CONFLICT_OPTIONS.MERGE:
        const existing = fs.readFileSync(destPath, 'utf8');
        const template = fs.readFileSync(srcPath, 'utf8');
        const merged = template + '\n\n---\n\n# Your Existing Rules\n\n' + existing;
        fs.writeFileSync(destPath, merged);
        log.success(`Merged: ${relativeDest}`);
        return choice;

      case CONFLICT_OPTIONS.BACKUP:
        // Read source content BEFORE any file operations
        const sourceContent = fs.readFileSync(srcPath, 'utf8');
        const backupPath = destPath + '.backup';
        fs.renameSync(destPath, backupPath);
        log.dim(`Backed up to: ${path.relative(TARGET_DIR, backupPath)}`);
        fs.writeFileSync(destPath, sourceContent);
        log.success(`Created: ${relativeDest}`);
        return choice;

      case CONFLICT_OPTIONS.OVERWRITE:
        fs.copyFileSync(srcPath, destPath);
        log.success(`Overwritten: ${relativeDest}`);
        return choice;
    }
  } else {
    fs.copyFileSync(srcPath, destPath);
    log.success(`Created: ${relativeDest}`);
  }

  return globalChoice;
}

// Copy directory recursively
async function copyDir(srcDir, destDir, globalChoice = null) {
  if (!fs.existsSync(srcDir)) {
    return globalChoice;
  }

  ensureDir(destDir);

  const entries = fs.readdirSync(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    // Skip backup files
    if (entry.name.endsWith('.backup')) {
      continue;
    }

    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      globalChoice = await copyDir(srcPath, destPath, globalChoice);
    } else {
      globalChoice = await copyFile(srcPath, destPath, globalChoice);
    }
  }

  return globalChoice;
}

// Generate provider config from .agent source
async function generateProviderConfig(providerId) {
  const agentSrcDir = path.join(TEMPLATE_DIR, '.agent', 'agents');
  const commandSrcDir = path.join(TEMPLATE_DIR, '.agent', 'commands');
  const config = getProvider(providerId);

  if (!fs.existsSync(agentSrcDir)) {
    log.warn(`Agent templates not found at ${agentSrcDir}`);
    return;
  }

  const destDir = path.join(TARGET_DIR, config.dir);
  ensureDir(destDir);

  const agentFiles = fs.readdirSync(agentSrcDir).filter(f => f.endsWith('.md'));
  const commandFiles = fs.existsSync(commandSrcDir)
    ? fs.readdirSync(commandSrcDir).filter(f => f.endsWith('.md'))
    : [];

  switch (providerId) {
    case 'cursor':
      let cursorContent = '---\ndescription: AI agent definitions\nalwaysApply: false\n---\n\n# Agents\n\n';
      agentFiles.forEach(f => {
        const name = path.basename(f, '.md');
        const content = fs.readFileSync(path.join(agentSrcDir, f), 'utf8');
        const body = content.replace(/^---[\s\S]*?---\n/, '');
        cursorContent += `## @${name}\n\n**File:** \`.agent/agents/${name}.md\`\n\n${body}\n\n---\n\n`;
      });
      fs.writeFileSync(path.join(destDir, 'agents.mdc'), cursorContent);
      log.success(`Created: ${config.dir}/agents.mdc`);

      // Commands go to .cursor/commands/ as .md files
      const cursorCmdDir = path.join(TARGET_DIR, '.cursor', 'commands');
      ensureDir(cursorCmdDir);
      commandFiles.forEach(f => {
        const src = path.join(commandSrcDir, f);
        const dest = path.join(cursorCmdDir, f); // Keep as .md
        fs.copyFileSync(src, dest);
        log.success(`Created: .cursor/commands/${path.basename(dest)}`);
      });
      break;

    case 'cline':
      const agentsContent = fs.readFileSync(path.join(TEMPLATE_DIR, 'AGENTS.md'), 'utf8');
      fs.writeFileSync(path.join(destDir, '01-rules.md'), agentsContent);
      log.success(`Created: ${config.dir}/01-rules.md`);

      let agentRef = '# Agents\n\n';
      agentFiles.forEach(f => {
        const name = path.basename(f, '.md');
        agentRef += `## @${name}\n\n**Source:** \`.agent/agents/${name}.md\`\n\n`;
      });
      fs.writeFileSync(path.join(destDir, '02-agents.md'), agentRef);
      log.success(`Created: ${config.dir}/02-agents.md`);
      break;

    case 'claude':
      const claudeContent = fs.readFileSync(path.join(TEMPLATE_DIR, 'AGENTS.md'), 'utf8');
      fs.writeFileSync(path.join(TARGET_DIR, 'CLAUDE.md'), claudeContent);
      log.success(`Created: CLAUDE.md`);

      const settings = { permissions: { allow: ['Read', 'Write', 'Bash'], deny: [] } };
      fs.writeFileSync(path.join(destDir, 'settings.json'), JSON.stringify(settings, null, 2));
      log.success(`Created: ${config.dir}/settings.json`);
      break;

    case 'copilot':
      const copilotContent = fs.readFileSync(path.join(TEMPLATE_DIR, 'AGENTS.md'), 'utf8');
      fs.writeFileSync(path.join(destDir, 'copilot-instructions.md'), copilotContent);
      log.success(`Created: ${config.dir}/copilot-instructions.md`);
      break;

    case 'windsurf':
      let windsurfContent = fs.readFileSync(path.join(TEMPLATE_DIR, 'AGENTS.md'), 'utf8');
      windsurfContent += '\n\n# Agents\n\n';
      agentFiles.forEach(f => {
        const name = path.basename(f, '.md');
        windsurfContent += `- **@${name}**: \`.agent/agents/${name}.md\`\n`;
      });
      fs.writeFileSync(path.join(destDir, 'rules.md'), windsurfContent);
      log.success(`Created: ${config.dir}/rules.md`);
      break;

    case 'trae':
      const traeContent = fs.readFileSync(path.join(TEMPLATE_DIR, 'AGENTS.md'), 'utf8');
      fs.writeFileSync(path.join(destDir, 'project_rules.md'), traeContent);
      log.success(`Created: ${config.dir}/project_rules.md`);
      break;

    case 'kiro':
      agentFiles.forEach(f => {
        const name = path.basename(f, '.md');
        const content = fs.readFileSync(path.join(agentSrcDir, f), 'utf8');
        const body = content.replace(/^---[\s\S]*?---\n/, '');
        const json = { name, prompt: body, model: 'claude-sonnet-4', tools: ['read', 'write'] };
        fs.writeFileSync(path.join(destDir, `${name}.json`), JSON.stringify(json, null, 2));
        log.success(`Created: ${config.dir}/${name}.json`);
      });
      break;

    case 'droid':
      agentFiles.forEach(f => {
        fs.copyFileSync(path.join(agentSrcDir, f), path.join(destDir, f));
        log.success(`Created: ${config.dir}/${f}`);
      });
      break;

    case 'opencode':
      const openAgentDir = path.join(destDir, 'agent');
      const openCmdDir = path.join(destDir, 'command');
      ensureDir(openAgentDir);
      ensureDir(openCmdDir);

      agentFiles.forEach(f => {
        fs.copyFileSync(path.join(agentSrcDir, f), path.join(openAgentDir, f));
        log.success(`Created: ${config.dir}/agent/${f}`);
      });
      commandFiles.forEach(f => {
        fs.copyFileSync(path.join(commandSrcDir, f), path.join(openCmdDir, f));
        log.success(`Created: ${config.dir}/command/${f}`);
      });
      break;

    case 'antigravity':
      commandFiles.forEach(f => {
        const content = fs.readFileSync(path.join(commandSrcDir, f), 'utf8');
        const body = content.replace(/^---[\s\S]*?---\n/, '');
        fs.writeFileSync(path.join(destDir, f), body);
        log.success(`Created: ${config.dir}/${f}`);
      });
      break;
  }
}

// Install for specific provider
async function installProvider(providerId) {
  const config = getProvider(providerId);
  if (!config) return;

  log.section(`📦 Installing ${config.name}...`);

  // Providers that need generation (have multiple directories or special handling)
  const generateOnly = ['cursor', 'opencode', 'cline', 'claude', 'copilot', 'windsurf', 'trae', 'kiro', 'droid', 'antigravity'];

  if (generateOnly.includes(providerId)) {
    await generateProviderConfig(providerId);
  } else {
    const srcDir = path.join(TEMPLATE_DIR, config.dir);
    if (fs.existsSync(srcDir)) {
      await copyDir(srcDir, path.join(TARGET_DIR, config.dir));
    } else {
      await generateProviderConfig(providerId);
    }
  }
}

// Main installation
async function main() {
  try {
    // 1. Select providers
    const providers = await selectProviders();

    if (providers.length === 0) {
      console.log('\n' + colors.yellow + '   No providers selected. Exiting.' + colors.reset + '\n');
      return;
    }

    console.log(`\n${colors.gray}   Selected: ${providers.map(id => getProvider(id).name).join(', ')}${colors.reset}`);

    // 2. Install .agent directory (source of truth)
    log.section('📁 Installing core files...');

    const agentSrc = path.join(TEMPLATE_DIR, '.agent');
    const agentDest = path.join(TARGET_DIR, '.agent');
    await copyDir(agentSrc, agentDest);

    // 3. Install AGENTS.md
    await copyFile(
      path.join(TEMPLATE_DIR, 'AGENTS.md'),
      path.join(TARGET_DIR, 'AGENTS.md')
    );

    // 4. Install provider-specific configs
    for (const providerId of providers) {
      await installProvider(providerId);
    }

    // 5. Done!
    console.log('\n' + colors.green + colors.bold + '✨ Installation complete!' + colors.reset);
    console.log('\n' + colors.gray + '   Next steps:' + colors.reset);
    console.log('   1. Review and customize AGENTS.md for your project');
    console.log('   2. Check .agent/ for agent and command definitions');
    console.log('   3. Commit to version control\n');

  } catch (err) {
    if (err.message?.includes('User force closed')) {
      console.log('\n' + colors.yellow + '   Cancelled.' + colors.reset + '\n');
    } else {
      log.error(err.message);
    }
  }
}

// Parse CLI args
const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  console.log(`
${colors.bold}Agentic Dev Starter${colors.reset}

Usage:
  npx agentic-dev-starter     Interactive installation
  bunx agentic-dev-starter    Interactive installation

Options:
  --help, -h      Show this help
  --version, -v   Show version

Supported providers:
${PROVIDERS.map(p => `  - ${p.name.padEnd(15)} (${p.id})`).join('\n')}
`);
  process.exit(0);
}

if (args.includes('--version') || args.includes('-v')) {
  const pkg = require('../package.json');
  console.log(pkg.version);
  process.exit(0);
}

main().catch(console.error);
