#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const inquirer_1 = __importDefault(require("inquirer"));
const simple_git_1 = __importDefault(require("simple-git"));
const program = new commander_1.Command();
const git = (0, simple_git_1.default)();
program
    .name('commit-helper')
    .description('Generate Conventional Commit messages easily')
    .version('1.0.0');
program.action(async () => {
    const { type, scope, description } = await inquirer_1.default.prompt([
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
    const message = `${type}${scope ? `(${scope})` : ''}: ${description}`;
    await git.commit(message);
    console.log(`✅Commit created: "${message}"`);
});
program.parse(process.argv);
