import * as vscode from 'vscode';
import * as path from 'path';
import { marked } from 'marked';

export function activate(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerCommand('prettymd.openPretty', async (uri: vscode.Uri) => {
        // Get the URI - either from context menu or active editor
        const fileUri = uri || vscode.window.activeTextEditor?.document.uri;

        if (!fileUri) {
            vscode.window.showErrorMessage('No markdown file selected');
            return;
        }

        // Read the file
        const document = await vscode.workspace.openTextDocument(fileUri);
        const content = document.getText();

        // Create webview panel
        const panel = vscode.window.createWebviewPanel(
            'prettymd',
            `✨ ${path.basename(fileUri.fsPath)}`,
            vscode.ViewColumn.Beside,
            {
                enableScripts: true,
                retainContextWhenHidden: true
            }
        );

        // Get configuration
        const config = vscode.workspace.getConfiguration('prettymd');
        const maxWidth = config.get<string>('maxWidth', '680px');
        const fontSize = config.get<string>('fontSize', '18px');
        const fontFamily = config.get<string>('fontFamily', "Georgia, 'Times New Roman', serif");
        const theme = config.get<string>('theme', 'warm');
        const lineHeight = config.get<string>('lineHeight', '1.8');

        // Parse markdown
        const html = await marked.parse(content);

        // Set webview content
        panel.webview.html = getWebviewContent(html, {
            maxWidth,
            fontSize,
            fontFamily,
            theme,
            lineHeight
        });

        // Watch for file changes
        const changeDisposable = vscode.workspace.onDidChangeTextDocument(async (e) => {
            if (e.document.uri.toString() === fileUri.toString()) {
                const newContent = e.document.getText();
                const newHtml = await marked.parse(newContent);
                panel.webview.postMessage({
                    type: 'update',
                    content: newHtml
                });
            }
        });

        panel.onDidDispose(() => {
            changeDisposable.dispose();
        });
    });

    context.subscriptions.push(disposable);
}

interface ThemeConfig {
    maxWidth: string;
    fontSize: string;
    fontFamily: string;
    theme: string;
    lineHeight: string;
}

function getWebviewContent(markdownHtml: string, config: ThemeConfig): string {
    const themes = {
        warm: {
            bg: '#faf8f3',
            text: '#2c2416',
            headingColor: '#1a1410',
            linkColor: '#b8634a',
            linkHover: '#8b4532',
            codeBg: '#f0ede4',
            codeColor: '#5c4d3d',
            quoteBorder: '#d4b896',
            quoteBg: '#f5f2ea',
            hrColor: '#e8dfc8',
            accentColor: '#b8634a'
        },
        cool: {
            bg: '#f8fafb',
            text: '#1e293b',
            headingColor: '#0f172a',
            linkColor: '#3b82f6',
            linkHover: '#2563eb',
            codeBg: '#f1f5f9',
            codeColor: '#475569',
            quoteBorder: '#94a3b8',
            quoteBg: '#f8fafc',
            hrColor: '#e2e8f0',
            accentColor: '#3b82f6'
        },
        dark: {
            bg: '#1a1a1a',
            text: '#e4e4e4',
            headingColor: '#f5f5f5',
            linkColor: '#f0c674',
            linkHover: '#ffd98a',
            codeBg: '#2a2a2a',
            codeColor: '#b5bd68',
            quoteBorder: '#555',
            quoteBg: '#222',
            hrColor: '#404040',
            accentColor: '#f0c674'
        },
        paper: {
            bg: '#ffffff',
            text: '#1a1a1a',
            headingColor: '#000000',
            linkColor: '#0066cc',
            linkHover: '#0052a3',
            codeBg: '#f6f6f6',
            codeColor: '#333333',
            quoteBorder: '#d0d0d0',
            quoteBg: '#fafafa',
            hrColor: '#e0e0e0',
            accentColor: '#0066cc'
        }
    };

    const currentTheme = themes[config.theme as keyof typeof themes] || themes.warm;

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pretty Markdown</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,400;0,600;0,700;1,400&family=Lora:ital,wght@0,400;0,600;1,400&family=Merriweather:ital,wght@0,400;0,700;1,400&family=JetBrains+Mono:wght@400;500&display=swap');

        * {
            box-sizing: border-box;
        }

        html {
            font-size: ${config.fontSize};
            scroll-behavior: smooth;
        }

        body {
            margin: 0;
            padding: 0;
            background: ${currentTheme.bg};
            color: ${currentTheme.text};
            font-family: ${config.fontFamily};
            line-height: ${config.lineHeight};
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeLegibility;
        }

        /* Paper texture overlay */
        body::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0.03;
            background-image:
                repeating-linear-gradient(0deg, transparent, transparent 2px, ${currentTheme.text} 3px),
                repeating-linear-gradient(90deg, transparent, transparent 2px, ${currentTheme.text} 3px);
            pointer-events: none;
            z-index: -1;
        }

        #content {
            max-width: ${config.maxWidth};
            margin: 0 auto;
            padding: 4rem 2.5rem;
            min-height: 100vh;
            animation: fadeIn 0.5s ease-out;
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /* Typography */
        h1, h2, h3, h4, h5, h6 {
            color: ${currentTheme.headingColor};
            font-weight: 700;
            line-height: 1.3;
            margin-top: 2.5em;
            margin-bottom: 0.8em;
            letter-spacing: -0.02em;
        }

        h1 {
            font-size: 2.5em;
            margin-top: 0;
            padding-bottom: 0.3em;
            border-bottom: 3px solid ${currentTheme.accentColor};
            margin-bottom: 1.2em;
        }

        h2 {
            font-size: 2em;
            padding-bottom: 0.25em;
            border-bottom: 1px solid ${currentTheme.hrColor};
        }

        h3 {
            font-size: 1.6em;
        }

        h4 {
            font-size: 1.3em;
        }

        h5, h6 {
            font-size: 1.1em;
        }

        p {
            margin: 1.5em 0;
            hyphens: auto;
            word-wrap: break-word;
        }

        /* Links */
        a {
            color: ${currentTheme.linkColor};
            text-decoration: none;
            border-bottom: 1px solid transparent;
            transition: all 0.2s ease;
        }

        a:hover {
            color: ${currentTheme.linkHover};
            border-bottom-color: ${currentTheme.linkHover};
        }

        /* Lists */
        ul, ol {
            margin: 1.5em 0;
            padding-left: 2em;
        }

        li {
            margin: 0.5em 0;
        }

        li > p {
            margin: 0.5em 0;
        }

        /* Code */
        code {
            font-family: 'JetBrains Mono', 'Menlo', 'Monaco', 'Courier New', monospace;
            font-size: 0.88em;
            background: ${currentTheme.codeBg};
            color: ${currentTheme.codeColor};
            padding: 0.2em 0.4em;
            border-radius: 3px;
            font-weight: 500;
        }

        pre {
            background: ${currentTheme.codeBg};
            border-radius: 8px;
            padding: 1.5em;
            overflow-x: auto;
            margin: 2em 0;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
            border-left: 4px solid ${currentTheme.accentColor};
        }

        pre code {
            background: transparent;
            padding: 0;
            font-size: 0.9em;
            line-height: 1.6;
        }

        /* Blockquotes */
        blockquote {
            margin: 2em 0;
            padding: 1em 1.5em;
            background: ${currentTheme.quoteBg};
            border-left: 4px solid ${currentTheme.quoteBorder};
            font-style: italic;
            color: ${currentTheme.text};
            opacity: 0.95;
        }

        blockquote p:first-child {
            margin-top: 0;
        }

        blockquote p:last-child {
            margin-bottom: 0;
        }

        /* Horizontal Rule */
        hr {
            border: none;
            height: 1px;
            background: linear-gradient(to right, transparent, ${currentTheme.hrColor}, transparent);
            margin: 3em 0;
        }

        /* Tables */
        table {
            border-collapse: collapse;
            width: 100%;
            margin: 2em 0;
            font-size: 0.95em;
        }

        th, td {
            border: 1px solid ${currentTheme.hrColor};
            padding: 0.75em 1em;
            text-align: left;
        }

        th {
            background: ${currentTheme.codeBg};
            font-weight: 600;
            color: ${currentTheme.headingColor};
        }

        tr:nth-child(even) {
            background: ${currentTheme.quoteBg};
        }

        /* Images */
        img {
            max-width: 100%;
            height: auto;
            border-radius: 8px;
            margin: 2em 0;
            box-shadow: 0 4px 16px rgba(0,0,0,0.1);
        }

        /* Task lists */
        input[type="checkbox"] {
            margin-right: 0.5em;
        }

        /* Emphasis */
        strong {
            font-weight: 600;
            color: ${currentTheme.headingColor};
        }

        em {
            font-style: italic;
        }

        /* Drop cap for first paragraph (optional flourish) */
        #content > p:first-of-type::first-letter {
            font-size: 3.2em;
            line-height: 0.9;
            float: left;
            margin: 0.1em 0.1em 0 0;
            color: ${currentTheme.accentColor};
            font-weight: 700;
        }

        /* Smooth scrolling */
        @media (prefers-reduced-motion: reduce) {
            html {
                scroll-behavior: auto;
            }

            * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }

        /* Print styles */
        @media print {
            body {
                background: white;
                color: black;
            }

            #content {
                max-width: 100%;
                padding: 0;
            }

            a {
                text-decoration: underline;
            }
        }
    </style>
</head>
<body>
    <div id="content">
        ${markdownHtml}
    </div>

    <script>
        const vscode = acquireVsCodeApi();

        window.addEventListener('message', event => {
            const message = event.data;
            if (message.type === 'update') {
                document.getElementById('content').innerHTML = message.content;
            }
        });
    </script>
</body>
</html>`;
}

export function deactivate() {}
