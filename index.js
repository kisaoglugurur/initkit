#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { execSync } from 'child_process';

const html = (useTypescript) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>My App</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <h1>Hello, world!</h1>
    <script src="${useTypescript ? 'main.ts' : 'script.js'}"></script>
  </body>
</html>`;

const css = `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}`;

const js = `console.log('Hello, world!');`;
const ts = `console.log('Hello, TypeScript world!');`;

const readme = (name) => `# ${name}
This project generated with **initkit** CLI.`;

const gitignore = `node_modules/
dist
.env
.DS_Store`;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
  console.log(chalk.cyan.bold('\n📦 Welcome to initkit CLI!\n'));

  const { projectName, initNpm, useTypescript, initGit } = await inquirer.prompt([
    {
      name: 'projectName',
      type: 'input',
      message: 'Enter your project name:',
      default: 'my-app',
    }, {
      name: 'initNpm',
      type: 'confirm',
      message: 'Do you want to run npm init -y',
      default: false,
    }, {
      name: 'useTypescript',
      type: 'confirm',
      message: 'Use TypeScript instead of JavaScript?',
      default: false,
    }, {
      name: 'initGit',
      type: 'confirm',
      message: 'Do you want to run git init?',
      default: false,
    }
  ]);

  const projectPath = path.join(process.cwd(), projectName);

  if (fs.existsSync(projectPath)) {
    console.log(chalk.red(`\nFolder "${projectName}" already exists. Please choose another name.\n`));
    process.exit(1);
  }

  fs.mkdirSync(projectPath);
  fs.mkdirSync(path.join(projectPath, 'src'));
  fs.writeFileSync(path.join(projectPath, 'src', 'index.html'), html(useTypescript));
  fs.writeFileSync(path.join(projectPath, 'src', 'style.css'), css);
  fs.writeFileSync(path.join(projectPath, 'README.md'), readme(projectName));
  fs.writeFileSync(path.join(projectPath, '.gitignore'), gitignore);

  if (initNpm) {
    execSync('npm init -y', {
      cwd: projectPath,
      stdio: 'inherit',
    });
  }

  if (initGit) {
    execSync('git init', {
      cwd: projectPath,
      stdio: 'ignore',
    });
  }

  if (useTypescript) {
    fs.writeFileSync(path.join(projectPath, 'src', 'main.ts'), ts);
  } else {
    fs.writeFileSync(path.join(projectPath, 'src', 'script.js'), js);
  }

  console.log(chalk.green(`\nProject "${projectName}" created successfully.`));
  console.log(chalk.blue(`\nGet started: cd ${projectName}\n`));
})();