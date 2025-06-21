# initkit

> Instantly bootstrap a minimalist HTML/CSS/JS project right from your terminal.

## What is it?

**initkit** is a dead-simple CLI tool that sets up a basic front-end project with:

- `index.html` (linked to style and script)
- `style.css` (basic reset)
- `script.js` (hello world)

### Perfect for:
- Teaching beginners
- Rapid prototyping
- Testing front-end snippets
- Not wasting time

## Installation

```bash
git clone https://github.com/your-username/initkit.git
cd initkit
npm install
```

### Optionally, link it globally:
```bash
npm link
```

## Usage
```bash
initkit
```
Then follow the prompt to name your project. That’s it.

## Output Example
<pre>
my-project/ 
├── index.html 
├── style.css 
└── script.js
</pre>

## To-Do
- Add support for custom templates
- Include README and .gitignore
- Optional framework presets (React, Vue, etc.)
- Dark mode for HTML starter (why not?)

## Why?
Because you shouldn't have to open VS Code and build folders and files just to log Hello, world!.