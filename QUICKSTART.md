# Quick Start Guide

Your PrettyMD extension is ready to use! Follow these steps to test it out:

## Testing the Extension

1. **Open this folder in VS Code** (if you haven't already)

2. **Press F5** to launch a new Extension Development Host window
   - This opens a new VS Code window with your extension loaded
   - The original window stays open for debugging

3. **In the new window, open the example file**:
   - Use File > Open Folder and select this `prettymd` directory
   - Open `example.md` from the file explorer

4. **Right-click on `example.md`** (either in the file explorer or on the editor tab)
   - Select **"Open Pretty Preview"** from the context menu

5. **Enjoy the beautiful preview!**
   - The markdown will render in a new tab with elegant styling
   - Try editing `example.md` - the preview updates live!

## Try Different Themes

1. In the Extension Development Host window, open Settings (`Cmd+,` or `Ctrl+,`)
2. Search for "prettymd"
3. Try different themes:
   - **warm** - Cozy cream/sepia (default)
   - **cool** - Clean light blue
   - **dark** - Elegant dark mode
   - **paper** - Minimal white

4. Adjust other settings:
   - `prettymd.maxWidth` - Try `800px` or `45rem`
   - `prettymd.fontSize` - Try `16px` or `20px`
   - `prettymd.lineHeight` - Try `1.6` or `2.0`

## Testing with Your Own Markdown

Create or open any `.md` file and use the same right-click > "Open Pretty Preview" command!

## Building a VSIX Package

To install this extension in your regular VS Code (not just the development host):

```bash
npm run package
```

This creates a `.vsix` file that you can install via:
- VS Code > Extensions > `...` menu > Install from VSIX

## Troubleshooting

**If the command doesn't appear:**
- Make sure you're right-clicking on a `.md` file
- Try reloading the Extension Development Host window (Cmd+R / Ctrl+R)

**If styles don't load:**
- Check the Developer Tools console (Help > Toggle Developer Tools)
- Make sure the extension compiled successfully

**If live updates don't work:**
- The webview should update automatically when you save the markdown file
- If not, try closing and reopening the preview

## Next Steps

- Customize the styling in `src/extension.ts` (search for the theme definitions)
- Add more themes by extending the `themes` object
- Experiment with different fonts and colors
- Share your creation!

Enjoy your beautiful markdown reading experience! ✨
