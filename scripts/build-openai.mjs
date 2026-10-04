#!/usr/bin/env node
/**
 * Build the OpenAI (ChatGPT / Codex) submission zip from this repo.
 *
 *   node scripts/build-openai.mjs [out.zip]
 *   default out: ../cineflo-plugin-openai-<version>.zip
 *
 * The Claude plugin is this repo as-is (.claude-plugin/, skills/). The OpenAI
 * package differs, so it is assembled here rather than kept by hand:
 *   - root plugin.json (agent-plugins schema, extensions.com.openai listing,
 *     review test cases, release notes) and .codex-plugin/plugin.json
 *   - mcp.json (schema) and .mcp.json, assets/icon.png
 *   - every skill gets the "Tool availability and host behavior" block right
 *     after its front matter; connect-cineflo is replaced by its OpenAI copy;
 *     the general cineflo-production skill is added
 * Sources live in openai/. Version comes from .claude-plugin/plugin.json and
 * release notes from openai/release-notes.txt.
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const version = JSON.parse(read('.claude-plugin/plugin.json')).version;
const notes = read('openai/release-notes.txt').trim();
const out = path.resolve(
  process.argv[2] ?? path.join(root, '..', `cineflo-plugin-openai-${version}.zip`)
);

const fill = s =>
  s.replaceAll('{{VERSION}}', version).replaceAll('{{RELEASE_NOTES}}', JSON.stringify(notes).slice(1, -1));

const stage = fs.mkdtempSync(path.join(os.tmpdir(), 'cineflo-openai-'));
const write = (rel, body) => {
  const file = path.join(stage, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, body);
};

write('plugin.json', fill(read('openai/plugin.json')));
write('.codex-plugin/plugin.json', fill(read('openai/codex-plugin.json')));
write('mcp.json', read('openai/mcp.json'));
write('.mcp.json', read('openai/dot-mcp.json'));
write('README.md', fill(read('openai/README.md')));
write('LICENSE', read('LICENSE'));
fs.mkdirSync(path.join(stage, 'assets'), { recursive: true });
fs.copyFileSync(path.join(root, '.claude-plugin/icon.png'), path.join(stage, 'assets/icon.png'));

const block = read('openai/host-block.md').trimEnd() + '\n\n';
const overrides = path.join(root, 'openai/skills');
const skills = new Set([
  ...fs.readdirSync(path.join(root, 'skills')),
  ...fs.readdirSync(overrides),
]);
for (const name of [...skills].sort()) {
  const override = path.join(overrides, name, 'SKILL.md');
  if (fs.existsSync(override)) {
    write(`skills/${name}/SKILL.md`, fs.readFileSync(override, 'utf8'));
    continue;
  }
  const src = read(`skills/${name}/SKILL.md`);
  // The host block goes right after the front matter, before the title.
  const head = src.match(/^---\n[\s\S]*?\n---\n/)?.[0];
  if (!head) throw new Error(`skills/${name}/SKILL.md has no front matter`);
  const rest = src.slice(head.length).replace(/^\n+/, '');
  write(`skills/${name}/SKILL.md`, `${head}\n${block}${rest}`);
}

// Fixed timestamps, like the accepted 1.2.2 package, so a rebuild of the same
// sources gives the same zip.
execFileSync('find', [stage, '-exec', 'touch', '-t', '198001010000', '{}', '+']);
fs.rmSync(out, { force: true });
execFileSync('zip', ['-q', '-r', '-X', '-D', out, '.', '-x', '*.DS_Store'], { cwd: stage });
fs.rmSync(stage, { recursive: true, force: true });
console.log(`${path.relative(process.cwd(), out)} (CineFlo ${version})`);
