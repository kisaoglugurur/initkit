#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import inquirer from 'inquirer';
import chalk from 'chalk';

const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>My App</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <h1>Hello, world!</h1>
    <script src="script.js"></script>
  </body>
</html>`;

const css = `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}`;

const js = `console.log('Hello, world!');`;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
  console.log(chalk.cyan.bold('\n📦 Welcome to initkit CLI!\n'));

  const { projectName } = await inquirer.prompt([
    {
      name: 'projectName',
      type: 'input',
      message: 'Enter your project name:',
      default: 'my-app',
    },
  ]);

  const projectPath = path.join(process.cwd(), projectName);

  if (fs.existsSync(projectPath)) {
    console.log(chalk.red(`\nFolder "${projectName}" already exists. Please choose another name.\n`));
    process.exit(1);
  }

  fs.mkdirSync(projectPath);
  fs.writeFileSync(path.join(projectPath, 'index.html'), html);
  fs.writeFileSync(path.join(projectPath, 'style.css'), css);
  fs.writeFileSync(path.join(projectPath, 'script.js'), js);

  console.log(chalk.green(`\nProject "${projectName}" created successfully.`));
  console.log(chalk.blue(`\nGet started: cd ${projectName}\n`));
})();