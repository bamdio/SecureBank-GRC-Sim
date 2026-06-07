# SecureVault Bank — Incident Response Playbooks

> **SIMULATION ONLY** — For training purposes only

---

## Playbook Index

| ID | Scenario | Severity | Owner |
|----|---------|----------|-------|
| PB-PHISH-01 | Spear Phishing / BEC | P2 | SOC Lead |
| PB-RANSOM-01 | Ransomware | P1 | CISO |
| PB-DATA-01 | Data Breach / Exfiltration | P1 | CISO + Legal |
| PB-DDOS-01 | DDoS Attack | P2 | NOC Lead |
| PB-SWIFT-01 | SWIFT Fraud | P1 | CISO + Treasury |
| PB-INSIDER-01 | Insider Threat | P1 | CISO + HR + Legal |
| PB-CLOUD-01 | AWS Cloud Compromise | P1 | Cloud Security |

---

## PB-RANSOM-01: Ransomware Response Playbook

### Phase 1: DETECTION (0-15 min)
- [ ] SIEM alert received: shadow copy deletion / mass file encryption
- [ ] SOC analyst validates alert — not false positive
- [ ] Declare P1 Incident — page CISO via PagerDuty
- [ ] Activate IR Bridge: Zoom War Room (link in LastPass)
- [ ] Log incident in ServiceNow: Category = Malware/Ransomware

### Phase 2: CONTAINMENT (15-60 min)
- [ ] Identify Patient Zero host via Splunk query: `index=edr event_type=shadow_copy_delete | stats count by host`
- [ ] Isolate affected hosts via CrowdStrike Falcon "Network Containment"
- [ ] Isolate at network layer: remove VLAN access on affected switch port
- [ ] Disable AD accounts for affected users (precaution)
- [ ] Take forensic memory dump before isolation if possible
- [ ] **AWS Actions**:
  - Trigger AWS Backup vault-lock snapshot for all RDS instances
  - Detach affected EC2 from Auto Scaling groups
  - Enable VPC Flow Log enhanced monitoring
  - Activate GuardDuty EC2 finding suppression for investigation

### Phase 3: INVESTIGATION (1-4 hours)
- [ ] Engage CrowdStrike Incident Response retainer (1-800-SVB-IR)
- [ ] Acquire forensic disk image of Patient Zero
- [ ] Identify ransomware variant: `strings malware.exe | grep -i ransom`
- [ ] Check IOC databases: VirusTotal, MalwareBazaar, Ransomwhere
- [ ] Determine encryption scope: mapped drives, network shares, backups
- [ ] Identify entry vector: phishing, RDP brute force, VPN exploit
- [ ] Review CloudTrail for unusual API activity in prior 72 hours
- [ ] Check if data was exfiltrated before encryption (double extortion)

### Phase 4: NOTIFICATION (within 2 hours of P1 declaration)
**Internal**:
- [ ] CISO → CEO → Board Risk Committee
- [ ] Legal counsel engaged
- [ ] Communications team on standby (customer notification)

**Regulatory** (check with Legal for specific thresholds):
- [ ] OCC: Notification within 36 hours if critical operations impacted
- [ ] Federal Reserve: If systemic risk
- [ ] FinCEN SAR: If data exfil with financial fraud nexus
- [ ] State Attorney General: If customer PII exfiltrated (per state law)
- [ ] CISA: Voluntary notification (CIRCIA when effective)

### Phase 5: ERADICATION (4-24 hours)
- [ ] Never pay ransom without OFAC clearance from Legal
- [ ] Rebuild affected systems from golden AMIs (AWS Systems Manager)
- [ ] Restore data from AWS Backup immutable vault (last clean snapshot)
- [ ] Validate data integrity with SHA-256 checksums
- [ ] Run full AV/EDR scan on all systems before reconnection
- [ ] Rotate all credentials (AD, AWS IAM, service accounts, API keys)
- [ ] Patch identified entry vulnerability before reconnecting

### Phase 6: RECOVERY (24-72 hours)
- [ ] Gradual service restoration with enhanced monitoring
- [ ] Validate transaction integrity for 24-hour window post-ransom
- [ ] Customer communication (if required by Legal/Compliance)
- [ ] Monitor for re-infection for 30 days

### Phase 7: POST-INCIDENT (within 30 days)
- [ ] Root cause analysis report (RCA)
- [ ] Lessons learned workshop
- [ ] Control improvement implementation
- [ ] Update IR playbook
- [ ] Board briefing
- [ ] Regulatory follow-up (if applicable)

---

## PB-SWIFT-01: SWIFT Payment Fraud Playbook

### Immediate (0-5 min)
- [ ] Block outgoing SWIFT message immediately
- [ ] Contact correspondent bank: request payment freeze
- [ ] Alert Treasury and CISO simultaneously

### Investigation (5-30 min)
- [ ] Review SWIFT audit logs for credential usage
- [ ] Identify authentication method used
- [ ] Check for concurrent sessions from unusual IPs

### Containment (30-60 min)
- [ ] Rotate all SWIFT operator credentials
- [ ] Enable step-up authentication for all SWIFT transactions
- [ ] Notify SWIFT ISAC of potential compromise

### Regulatory (within 24 hours)
- [ ] FinCEN SAR filing (required if fraudulent transfer attempted)
- [ ] OCC notification
- [ ] Correspondent bank formal notification

---

## RTO/RPO Reference

| System | RTO Target | RPO Target | Recovery Method |
|--------|-----------|-----------|----------------|
| Core Banking | 4 hours | 1 hour | On-prem HA + AWS DR |
| Online Banking | 1 hour | 15 min | AWS Multi-AZ |
| SWIFT Gateway | 2 hours | 30 min | Manual failover |
| ATM Network | 2 hours | 1 hour | Vendor coordination |
| Email | 30 min | 15 min | M365 geo-redundant |

---

*SecureVault Bank IR Playbooks — Training Simulation Only*
