#!/usr/bin/env node
import { Command } from "commander";
import inquirer from "inquirer";
import { select } from '@inquirer/prompts';
import { simpleGit } from "simple-git";

const program = new Command();
const git = simpleGit();

program
  .name('commit-helper')
  .description('Generate Conventional Commit messages easily')
  .version('1.0.0');


program.action(async () => {
  const status = await git.status();
  const stagedFiles = status.staged;

  if (stagedFiles.length === 0) {
    console.error('❌No Staged files found. Please stage files before committing.');
    process.exit(1);
  }
  console.log('📁Staged files:');
  stagedFiles.forEach((file: string) => console.log(`- ${file}`));

  const { confirm } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: 'Do you want to commit these files?',
      default: true
    }
  ]);

  if (!confirm) {
    console.log('❌Commit canceled by user.');
    process.exit(1);
  }

  const type = await select({
    message: 'Select commit type',
    choices: [
      { name: '✨feat', value: 'feat' },
      { name: '🐛fix', value: 'fix' },
      { name: '📄docs', value: 'docs' },
      { name: '🎨style', value: 'style' },
      { name: '🔄refactor', value: 'refactor' },
      { name: '✅test', value: 'test' },
      { name: '🔧chore', value: 'chore' }
    ]
  });

  const { scope, description } = await inquirer.prompt([
    {
      type: 'input',
      name: 'scope',
      message: 'Enter scope (optional):'
    },
    {
      type: 'input',
      name: 'description',
      message: 'Enter commit description'
    }
  ]);

  if (!type) {
    console.log('❌Required type parameter.');
    process.exit(1);
  }

  if (!description) {
    console.log('❌Required description parameter.');
    process.exit(1);
  }

  const message = `${type}${scope ? `(${scope})`: ''}: ${description}`;
  await git.commit(message);
  console.log(`✅Commit created: "${message}"`);
});

program.parse(process.argv);