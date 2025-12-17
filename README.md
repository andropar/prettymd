# PrettyMD ✨

A VS Code extension that renders markdown files with beautiful, refined typography and elegant styling. Transform your markdown reading experience into something closer to a literary magazine than a code preview.

## Features

- **Right-click Context Menu**: Right-click any markdown file and select "Open Pretty Preview"
- **Live Updates**: Preview updates automatically as you edit
- **Multiple Themes**: Choose from warm, cool, dark, or paper themes
- **Configurable Typography**: Customize font size, font family, line width, and line height
- **Editorial Design**: Refined, distraction-free reading experience with:
  - Beautiful serif typography
  - Generous whitespace and margins
  - Elegant code blocks with syntax highlighting
  - Sophisticated color palettes
  - Subtle paper texture overlay
  - Smooth animations and transitions

## Installation

### From Source

1. Clone or download this repository
2. Open the folder in VS Code
3. Run `npm install` to install dependencies
4. Press `F5` to open a new VS Code window with the extension loaded

### Building VSIX Package

To create an installable `.vsix` package:

```bash
npm install
npm run compile
npm run package
```

Then install the generated `.vsix` file via:
- VS Code > Extensions > `...` menu > Install from VSIX

## Usage

1. Open any markdown file in VS Code
2. Right-click the file (either in the explorer or in the editor tab)
3. Select **"Open Pretty Preview"**
4. The markdown will open in a new editor tab with beautiful styling

## Configuration

Customize the preview appearance in VS Code settings (`Cmd+,` or `Ctrl+,`):

### `prettymd.theme`
Choose a color theme:
- `warm` (default): Cream/sepia tones - cozy and literary
- `cool`: Light blue tones - clean and modern
- `dark`: Elegant dark theme - easy on the eyes
- `paper`: Minimal white - classic and simple

### `prettymd.maxWidth`
Maximum content width (default: `680px`)
- Examples: `680px`, `45rem`, `800px`
- Wider for technical docs, narrower for prose

### `prettymd.fontSize`
Base font size (default: `18px`)
- Examples: `18px`, `1.125rem`, `16px`

### `prettymd.fontFamily`
Font family for body text (default: `Georgia, 'Times New Roman', serif`)
- Examples:
  - `'Crimson Pro', Georgia, serif` - elegant and refined
  - `'Merriweather', Georgia, serif` - strong and readable
  - `'Lora', Georgia, serif` - balanced and beautiful

### `prettymd.lineHeight`
Line height for body text (default: `1.8`)
- Examples: `1.6`, `1.8`, `2.0`
- Higher values for easier reading, lower for density

## Example Settings

Add to your VS Code `settings.json`:

```json
{
  "prettymd.theme": "warm",
  "prettymd.maxWidth": "680px",
  "prettymd.fontSize": "18px",
  "prettymd.fontFamily": "'Crimson Pro', Georgia, serif",
  "prettymd.lineHeight": "1.8"
}
```

## Design Philosophy

PrettyMD is designed around the principle that reading markdown should be a pleasure, not a chore. The extension:

- Uses refined serif typography for readability
- Provides generous margins and whitespace
- Implements subtle visual details (paper texture, smooth animations)
- Offers multiple themes for different contexts
- Prioritizes distraction-free reading

The aesthetic is inspired by high-end editorial design, literary magazines, and beautifully typeset books.

## Development

```bash
# Install dependencies
npm install

# Compile TypeScript
npm run compile

# Watch mode for development
npm run watch

# Build VSIX package
npm run package
```

## License

MIT

## Credits

Built with:
- [marked](https://marked.js.org/) - Markdown parser
- Beautiful typography from Google Fonts (Crimson Pro, Lora, Merriweather)
- JetBrains Mono for code blocks
