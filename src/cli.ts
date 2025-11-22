#!/usr/bin/env node
import { Command } from "commander";
import inquirer from "inquirer";
import simpleGit from "simple-git";

const program = new Command();
const git = simpleGit();

program
  .name('commit-helper')
  .description('Generate Conventional Commit messages easily')
  .version('1.0.0');


program.action(async () => {
  const { type, scope, description } = await inquirer.prompt([
    {
      type: 'list',
      name: 'type',
      message: 'Select commit type',
      choices: ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore']
    },
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

  const message = `${type}${scope ? `(${scope})`: ''}: ${description}`;
  await git.commit(message);
  console.log(`✅Commit created: "${message}"`);
});

program.parse(process.argv);