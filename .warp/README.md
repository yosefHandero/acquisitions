# Warp Configuration for Acquisitions API

This directory contains Warp-specific configurations to optimize your development experience with this Node.js/Express API project.

## Files Overview

### `warp.yaml`

Main project configuration defining:

- Project metadata and context
- Available workflows and commands
- Environment settings
- Path mappings for easy navigation

### `ai_context.md`

Detailed project context for Warp AI, including:

- Technology stack information
- Project structure explanation
- Available npm scripts
- Development patterns and conventions

### `aliases.ps1`

PowerShell aliases and functions for common tasks:

- `dev` - Start development server
- `lint` / `lintfix` - Run/fix ESLint
- `fmt` / `fmtcheck` - Format/check code formatting
- `dbgen` / `dbmigrate` / `dbstudio` - Database operations
- Navigation shortcuts (`goc`, `gom`, `gor`, etc.)
- `logs` / `errors` - View application logs
- `loadenv` - Load environment variables
- `info` - Show project information

### `settings.json`

Terminal appearance and behavior settings:

- Optimized theme and font settings
- Custom keybindings for common commands
- Environment variables for better color output
- Auto-completion and suggestions enabled

## Getting Started

1. **Load aliases**: Run `. .warp/aliases.ps1` to load all custom aliases
2. **Check setup**: Type `info` to see available commands
3. **Start developing**: Use `dev` to start the development server

## Quick Commands

| Alias      | Command               | Description                 |
| ---------- | --------------------- | --------------------------- |
| `dev`      | `npm run dev`         | Start development server    |
| `lint`     | `npm run lint`        | Run ESLint                  |
| `fmt`      | `npm run format`      | Format code with Prettier   |
| `dbstudio` | `npm run db:studio`   | Open Drizzle Studio         |
| `logs`     | Show application logs | View last 50 log entries    |
| `goc`      | Go to controllers     | Navigate to src/controllers |
| `gos`      | Go to services        | Navigate to src/services    |

## Keyboard Shortcuts

- `Ctrl+D` - Start development server
- `Ctrl+L` - Run linter
- `Ctrl+Shift+F` - Format code
- `Ctrl+Shift+D` - Open database studio

## Customization

Feel free to modify any of these files to match your preferences:

- Add new aliases in `aliases.ps1`
- Update keybindings in `settings.json`
- Extend project context in `ai_context.md`
- Add workflows in `warp.yaml`

## Auto-loading

The configuration includes a startup command to automatically load aliases when you open a terminal in this project directory.
