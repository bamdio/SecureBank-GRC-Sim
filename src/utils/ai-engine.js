/**
 * SecureVault Bank — AI Engine (Claude Integration)
 * Handles all Anthropic Claude API calls for the GRC platform
 * 
 * DISCLAIMER: Simulation only — fictional bank, no real data
 */

const AIEngine = {
  apiKey: null,
  model: 'claude-sonnet-4-20250514',
  baseURL: 'https://api.anthropic.com/v1/messages',

  // System context for the banking GRC AI
  SYSTEM_PROMPT: `You are SecureVault Bank's AI Security Advisor — an expert GRC analyst 
specializing in cybersecurity for US financial institutions. You have deep expertise in:
- ISO 27001:2022, NIST CSF 2.0, COBIT 2019, COSO ERM 2017, ITIL v4
- AWS security services (GuardDuty, Security Hub, Inspector, Macie, WAF, Shield)
- Banking regulations: OCC, FFIEC, GLBA, PCI DSS, SOX
- Incident response, vulnerability management, and disaster recovery
- SWIFT CSP requirements and financial fraud prevention

Always provide structured, actionable recommendations aligned with regulatory requirements.
Keep responses concise but comprehensive. Format with clear sections.
DISCLAIMER: This is a training simulation — all data is fictional.`,

  setApiKey(key) {
    this.apiKey = key;
    localStorage.setItem('svb_ai_key', key);
  },

  loadApiKey() {
    const saved = localStorage.getItem('svb_ai_key');
    if (saved) this.apiKey = saved;
    return !!this.apiKey;
  },

  async analyze(prompt, context = '') {
    if (!this.apiKey) {
      throw new Error('API key not configured. Click "Configure AI" to add your Anthropic API key.');
    }

    const userMessage = context 
      ? `Context:\n${context}\n\nRequest:\n${prompt}`
      : prompt;

    const response = await fetch(this.baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: this.model,
        max_tokens: 1500,
        system: this.SYSTEM_PROMPT,
        messages: [{ role: 'user', content: userMessage }]
      })
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error?.message || `API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.content[0].text;
  },

  // Specialized analysis functions
  async analyzeVulnerability(vuln) {
    const prompt = `Analyze this vulnerability for SecureVault Bank and provide:
1. **Risk Assessment** — Business impact and likelihood
2. **Regulatory Impact** — Which regulations/frameworks are at risk
3. **Remediation Plan** — Step-by-step with priority
4. **AWS Mitigation** — Specific AWS services to deploy
5. **Timeline** — Recommended SLA based on CVSS ${vuln.cvss}`;
    
    const context = JSON.stringify(vuln, null, 2);
    return this.analyze(prompt, context);
  },

  async analyzeThreat(threat) {
    const prompt = `Analyze this threat intelligence for SecureVault Bank:
1. **Threat Actor Profile** — TTPs, motivation, capability
2. **Attack Path Analysis** — Likely attack progression
3. **Immediate Actions** — What to do right now (next 24 hours)
4. **Detection Rules** — SIEM/GuardDuty rules to create
5. **Regulatory Reporting** — Does this require OCC/FinCEN notification?`;
    
    const context = JSON.stringify(threat, null, 2);
    return this.analyze(prompt, context);
  },

  async generateIncidentPlaybook(incident) {
    const prompt = `Generate a detailed incident response playbook for:
1. **Immediate Containment** — First 30 minutes actions
2. **Investigation Steps** — Evidence collection, forensics
3. **Communication Plan** — Internal escalation + regulatory notification timeline
4. **Eradication & Recovery** — Step-by-step system restoration
5. **Post-Incident** — Lessons learned, control improvements
6. **Regulatory Obligations** — OCC 12 CFR 30, FFIEC, FinCEN requirements`;
    
    const context = JSON.stringify(incident, null, 2);
    return this.analyze(prompt, context);
  },

  async analyzeDRScenario(scenario) {
    const prompt = `Analyze this disaster recovery scenario for SecureVault Bank:
1. **RTO/RPO Gap Analysis** — Current vs target (flag any gaps)
2. **AWS Architecture Review** — Are the right services in place?
3. **Regulatory Compliance** — FFIEC BCP requirements met?
4. **Improvement Recommendations** — Specific technical steps
5. **Test Frequency** — Recommended DR test schedule`;
    
    const context = JSON.stringify(scenario, null, 2);
    return this.analyze(prompt, context);
  },

  async generateComplianceReport(frameworkData) {
    const prompt = `Generate an executive compliance status report for SecureVault Bank:
1. **Overall Posture** — Traffic light summary across frameworks
2. **Critical Gaps** — Top 5 gaps requiring immediate attention
3. **Framework Cross-Mapping** — Overlapping controls we can leverage
4. **Remediation Roadmap** — 30/60/90 day plan
5. **Board Reporting** — Key metrics for the Risk Committee
6. **Regulatory Risk** — Likelihood of examination findings`;
    
    const context = JSON.stringify(frameworkData, null, 2);
    return this.analyze(prompt, context);
  },

  async chat(message, conversationHistory = []) {
    if (!this.apiKey) {
      throw new Error('API key not configured.');
    }

    const messages = [
      ...conversationHistory,
      { role: 'user', content: message }
    ];

    const response = await fetch(this.baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: this.model,
        max_tokens: 1500,
        system: this.SYSTEM_PROMPT,
        messages
      })
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error?.message || `API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.content[0].text;
  }
};

// Risk scoring utilities
const RiskCalculator = {
  cvssToRisk(cvss) {
    if (cvss >= 9.0) return { label: 'CRITICAL', color: '#dc2626', priority: 1 };
    if (cvss >= 7.0) return { label: 'HIGH', color: '#ea580c', priority: 2 };
    if (cvss >= 4.0) return { label: 'MEDIUM', color: '#ca8a04', priority: 3 };
    return { label: 'LOW', color: '#16a34a', priority: 4 };
  },

  calculateRiskScore(likelihood, impact) {
    // Simple 5x5 risk matrix
    return likelihood * impact;
  },

  slaBreached(daysOpen, slaDays) {
    return daysOpen > slaDays;
  },

  slaPercentUsed(daysOpen, slaDays) {
    return Math.min(100, Math.round((daysOpen / slaDays) * 100));
  }
};

// Framework compliance mapper
const ComplianceMapper = {
  // Cross-reference controls across frameworks
  crossMap: {
    'A.16.1': ['NIST RS.RP-1', 'COBIT DSS02', 'ITIL Incident Mgmt', 'COSO Performance'],
    'A.12.6': ['NIST ID.RA-1', 'COBIT APO12', 'ITIL Problem Mgmt'],
    'A.9.2':  ['NIST PR.AC-1', 'COBIT APO13', 'COSO Governance'],
    'A.17.1': ['NIST RC.RP-1', 'COBIT DSS04', 'ITIL Service Continuity'],
  },

  getRelatedControls(isoControl) {
    return this.crossMap[isoControl] || [];
  },

  getComplianceColor(pct) {
    if (pct >= 85) return '#16a34a';
    if (pct >= 70) return '#ca8a04';
    return '#dc2626';
  }
};

// Export for browser use
window.AIEngine = AIEngine;
window.RiskCalculator = RiskCalculator;
window.ComplianceMapper = ComplianceMapper;
