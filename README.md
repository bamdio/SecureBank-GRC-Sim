# 🏦 SecureVault Bank — AI-Powered GRC Security Simulation Platform

> **DISCLAIMER**: This is a fictional simulation for training and educational purposes only.  
> "SecureVault Bank" is a completely fictional institution. No real bank data, credentials, or systems are involved.

---

## 📌 Overview

**SecureVault Bank GRC Simulation** is a full-stack cybersecurity governance, risk, and compliance (GRC) platform simulation demonstrating how AI can be applied to:

- 🔍 **Vulnerability Management** — AI-driven scanning, scoring, and remediation
- 🚨 **Threat Management** — Real-time threat intelligence and risk scoring
- 📋 **Incident Response** — Automated playbooks and escalation workflows
- 🔄 **Disaster Recovery** — RTO/RPO tracking and recovery orchestration
- ✅ **Compliance** — ISO 27001, NIST CSF, COBIT 2019, COSO ERM, ITIL v4
- ☁️ **AWS Hybrid Architecture** — On-prem + Cloud security posture management

---

## 🏗️ Architecture

```
SecureVault Bank — Hybrid Architecture
├── On-Premises (Core Banking)
│   ├── Mainframe (Transactions, Ledger)
│   ├── Internal Active Directory
│   └── SIEM (Splunk)
└── AWS Cloud (Digital Banking)
    ├── API Gateway + WAF
    ├── Lambda (AI Processing)
    ├── RDS Multi-AZ (Customer Data)
    ├── S3 (Encrypted Logs)
    ├── GuardDuty (Threat Detection)
    └── Security Hub (GRC Aggregation)
```

---

## 🔧 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML5, CSS3, Vanilla JS (no build step) |
| AI Engine | Anthropic Claude API (claude-sonnet-4-20250514) |
| Cloud | AWS (simulated: GuardDuty, Security Hub, Config) |
| SIEM | Splunk (simulated log feeds) |
| Frameworks | ISO 27001, NIST CSF 2.0, COBIT 2019, COSO ERM, ITIL v4 |

---

## 📂 Project Structure

```
SecureBank-GRC-Sim/
├── README.md
├── LICENSE
├── index.html                    # Main dashboard entry point
├── src/
│   ├── components/
│   │   ├── vulnerability.html    # Vulnerability Management Module
│   │   ├── threats.html          # Threat Intelligence Module
│   │   ├── incidents.html        # Incident Response Module
│   │   ├── disaster-recovery.html# DR Orchestration Module
│   │   └── compliance.html       # GRC Compliance Dashboard
│   ├── data/
│   │   ├── vulnerabilities.json  # Sample CVE dataset
│   │   ├── threats.json          # Threat intelligence feeds
│   │   ├── incidents.json        # Incident scenarios
│   │   └── controls.json         # GRC control mappings
│   └── utils/
│       ├── ai-engine.js          # Claude AI integration
│       ├── risk-calculator.js    # CVSS & risk scoring
│       └── compliance-mapper.js  # Framework cross-mapping
├── docs/
│   ├── GRC-Framework-Guide.md
│   ├── AWS-Architecture.md
│   ├── Incident-Playbooks.md
│   └── Compliance-Mapping.md
└── assets/
    └── architecture-diagram.svg
```

---

## 🚀 Quick Start

### Prerequisites
- Any modern web browser (Chrome, Firefox, Edge)
- Anthropic API key (for AI features)
- Optional: Local HTTP server for full functionality

### Running Locally

```bash
# Clone the repository
git clone https://github.com/your-org/SecureBank-GRC-Sim.git
cd SecureBank-GRC-Sim

# Option 1: Python simple server
python3 -m http.server 8080

# Option 2: Node.js
npx serve .

# Option 3: Just open index.html in browser
open index.html
```

### Configure AI Engine
1. Open `src/utils/ai-engine.js`
2. The API key is entered via the dashboard UI (never hardcode keys)
3. Click "Configure AI" in the top navigation

---

## 🔐 GRC Framework Alignment

### ISO 27001:2022
- **A.5** — Information Security Policies
- **A.8** — Asset Management
- **A.12** — Operations Security
- **A.16** — Incident Management
- **A.17** — Business Continuity

### NIST Cybersecurity Framework 2.0
| Function | Coverage |
|----------|---------|
| GOVERN | Risk governance, policy management |
| IDENTIFY | Asset inventory, risk assessment |
| PROTECT | Access control, data protection |
| DETECT | Continuous monitoring, anomaly detection |
| RESPOND | Incident response, communications |
| RECOVER | Recovery planning, improvements |

### COBIT 2019
- **APO12** — Risk Management
- **APO13** — Security Management
- **DSS02** — Incident Management
- **DSS04** — Continuity Management

### COSO ERM 2017
- Risk Governance & Culture
- Risk Strategy & Objective-Setting
- Risk in Execution
- Risk Information & Communication
- Monitoring Enterprise Risk Performance

### ITIL v4
- Incident Management Practice
- Problem Management Practice
- Change Enablement
- Service Continuity Management
- Information Security Management

---

## 🤖 AI Capabilities

| Feature | AI Function |
|---------|------------|
| Vulnerability Analysis | CVE severity contextualisation, remediation prioritization |
| Threat Intelligence | Pattern recognition, threat actor attribution |
| Incident Triage | Automated classification, severity scoring |
| DR Playbook | Step generation, dependency mapping |
| Compliance Gap Analysis | Control mapping across frameworks |
| Risk Narrative | Natural language risk reporting |

---

## ⚠️ Legal & Ethical Notice

This simulation is designed **exclusively for**:
- Cybersecurity training and education
- GRC framework demonstration
- AI in security research
- Academic study

**Do NOT use** any techniques demonstrated here against real systems without explicit written authorization.

---

## 📄 License

MIT License — See `LICENSE` file for details.

---

## 🤝 Contributing

Pull requests welcome. Please read `CONTRIBUTING.md` before submitting.

---

*Built for the cybersecurity community — SecureVault Bank is fictional. Stay secure.*
