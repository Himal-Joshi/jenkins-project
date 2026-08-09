# ⚙️ Jenkins CI/CD - React Web Application

This repository contains a **React + Express** application paired with a production-ready **`Jenkinsfile`** pipeline for practicing Jenkins CI/CD automation.

---

## 📁 Repository Structure

```text
├── Jenkinsfile              # Jenkins CI/CD Pipeline definition script
├── app/                     # React + Express Application
│   ├── src/                 # React UI Components (App.jsx, index.css, main.jsx)
│   ├── index.html           # Single HTML entrypoint
│   ├── package.json         # Node.js dependencies
│   ├── server.js            # Express server
│   └── vite.config.js       # Vite build configuration
├── .github/workflows/       # GitHub Actions alternative workflow
├── README.md                # Project documentation
└── .gitignore               # Git ignore rules
```

---

## 🛠️ Jenkins Pipeline Stages (`Jenkinsfile`)

1. **Checkout**: Pulls latest code from git branch.
2. **Environment Check**: Verifies Node.js & npm versions on Jenkins agent.
3. **Install Dependencies**: Runs `npm install` inside `/app`.
4. **Build React App**: Compiles React SPA into production static bundle (`npm run build`).
5. **Deploy / Restart**: Automatically restarts Express application service.

---

## 🚀 How to Run Locally

```bash
cd app
npm install
npm run dev
```
Open `http://localhost:3000` in your browser.
