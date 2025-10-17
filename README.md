
# 🤖 GitHub Repo AI Analyzer

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

An advanced, AI-powered tool that provides instant, in-depth analysis of any public GitHub repository. Built with React, TypeScript, and the Google Gemini API, this application features a stunning, interactive 3D interface with light and dark modes.

**[➡️ LIVE DEMO](https://YOUR-GITHUB-USERNAME.github.io/YOUR-REPO-NAME/)** *(Replace with your GitHub Pages link)*

---

 
*(Suggestion: Record a short GIF of the app in action and replace this link!)*

## ✨ Key Features

-   **🤖 AI-Powered Analysis:** Leverages the Google Gemini API to provide intelligent insights into a repository's purpose, technology, and quality.
-   **🚀 Two Analysis Depths:**
    -   **Quick Overview:** Get a fast, high-level summary.
    -   **Deep Dive:** Receive a more thorough analysis including potential security, performance, and scalability considerations.
-   **🔮 Interactive 3D UI:** A stunning "glassmorphism" interface with 3D card tilt effects on hover.
-   **🎨 Light & Dark Modes:** A sleek theme switcher to toggle between a vibrant light mode and a futuristic dark mode.
-   **🔗 Shareable Reports:** Generate a unique, permanent link for any analysis to share with others.
-   **🕓 Analysis History:** Automatically saves your recent analyses in your browser for quick access.
-   **📋 Export to Markdown:** Download the complete analysis report as a neatly formatted Markdown file.
-   **📱 Fully Responsive:** A seamless experience on desktop, tablet, and mobile devices.

## 🛠️ Technology Stack

-   **Frontend:** [React](https://reactjs.org/) & [TypeScript](https://www.typescriptlang.org/)
-   **AI Model:** [Google Gemini API](https://ai.google.dev/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/) for utility-first styling.
-   **Markdown Parsing:** [Marked](https://marked.js.org/) & [DOMPurify](https://github.com/cure53/DOMPurify) for secure rendering.
-   **Deployment:** [GitHub Pages](https://pages.github.com/)

## 🤔 How It Works

The AI does **not** read the entire source code of the repository. Instead, it performs a high-level analysis based on publicly available metadata such as:
- The repository's README file.
- Project description and topics.
- File and folder structure (e.g., `package.json`, `pom.xml`, `Dockerfile`).
- Common conventions for the identified technology stack.

This approach provides a powerful and fast initial assessment, perfect for quickly understanding a new project.

## 🚀 Getting Started

You can run this project locally on your machine.

### Prerequisites

- A modern web browser.
- A [Google Gemini API Key](https://ai.google.dev/pricing).

### Local Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
    cd YOUR-REPO-NAME
    ```

2.  **Set up your API Key:**
    This project is configured to run directly in the browser without a build step. You will need to manually create a file to provide your API key.
    
    > **Note:** This method is for development only. Do not expose your API key in a public repository. The live version of this app should use a backend proxy to protect the key.

    - Create a new file named `env.js` in the root of the project.
    - Add the following content to `env.js`:
      ```javascript
      window.process = {
        env: {
          API_KEY: 'YOUR_GEMINI_API_KEY'
        }
      };
      ```
    - Replace `YOUR_GEMINI_API_KEY` with your actual Gemini API key.

3.  **Include the environment file:**
    Open `index.html` and add this script tag inside the `<head>` section, *before* the other scripts:
    ```html
    <script src="env.js"></script>
    ```
    
4.  **Open in Browser:**
    Simply open the `index.html` file in your web browser. You can do this by double-clicking the file or using a simple local server extension like "Live Server" in VS Code.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/YOUR-USERNAME/YOUR-REPO-NAME/issues).

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
