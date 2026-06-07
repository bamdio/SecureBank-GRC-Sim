# SecureVault Bank — GRC Framework Guide

> **SIMULATION ONLY** — Fictional bank for training purposes

---

## Overview

This guide documents how SecureVault Bank maps its security controls across the five GRC frameworks deployed in this simulation: ISO 27001, NIST CSF 2.0, COBIT 2019, COSO ERM 2017, and ITIL v4 — plus AWS-native security services.

---

## ISO 27001:2022

**Standard**: Information Security Management Systems (ISMS)  
**Certifying Body**: BSI / Bureau Veritas / SGS  
**SVB Coverage**: 85% (79 of 93 controls implemented)

### Key Annex A Controls Implemented

| Control | Name | SVB Implementation |
|---------|------|--------------------|
| A.5.1 | Information Security Policies | Policy Portal in SharePoint |
| A.6.3 | Information Security Awareness | Annual + quarterly training |
| A.8.8 | Management of Technical Vulnerabilities | Qualys + AWS Inspector |
| A.9.2 | Identity Management | Okta + AWS IAM |
| A.10.1 | Data at Rest Encryption | AWS KMS, TDE on SQL |
| A.12.6 | Technical Vulnerability Mgmt | 14-day patch SLA (HIGH) |
| A.13.1 | Network Security Controls | AWS VPC, NACLs, Security Groups |
| A.16.1 | Management of Incidents | ServiceNow + IR Runbooks |
| A.17.1 | Business Continuity Planning | DR tested Q1/Q3 annually |

### Gaps (15% incomplete)
- A.8.16 — Monitoring activities (partial — needs UEBA)
- A.5.23 — Cloud service security (in progress)
- A.8.12 — Data leakage prevention (DLP not fully deployed)

---

## NIST Cybersecurity Framework 2.0

**Standard**: NIST CSF 2.0 (released 2024)  
**SVB Coverage**: 86% (91 of 106 subcategories)

### Function Summary

| Function | Purpose | SVB Score |
|----------|---------|-----------|
| GOVERN (GV) | Risk governance, policies | 83% |
| IDENTIFY (ID) | Asset mgmt, risk assessment | 90% |
| PROTECT (PR) | Access control, awareness | 84% |
| DETECT (DE) | Monitoring, anomalies | 85% |
| RESPOND (RS) | IR, communications | 82% |
| RECOVER (RC) | Recovery, improvements | 92% |

### AI Alignment to NIST Functions
- **GOVERN**: AI generates risk appetite statements, board reports
- **IDENTIFY**: AI scores asset criticality, maps attack surface
- **PROTECT**: AI recommends compensating controls for gaps
- **DETECT**: AI correlates GuardDuty + SIEM alerts
- **RESPOND**: AI generates incident playbooks in real-time
- **RECOVER**: AI models RTO/RPO scenarios, validates DR plans

---

## COBIT 2019

**Standard**: Control Objectives for Information Technologies  
**Publisher**: ISACA  
**SVB Coverage**: 70% (28 of 40 objectives at Level 3+)

### Relevant Process Areas

| Domain | Process | Maturity |
|--------|---------|---------|
| APO12 | Managed Risk | Level 3 — Defined |
| APO13 | Managed Security | Level 3 — Defined |
| DSS02 | Managed Service Requests & Incidents | Level 4 — Quantitatively Managed |
| DSS04 | Managed Continuity | Level 3 — Defined |
| MEA03 | Managed Compliance | Level 3 — Defined |

### Key Gaps
- APO14 (Managed Data) — Level 2, needs elevation
- BAI08 (Managed Knowledge) — Level 1, wiki initiative planned
- Board IT governance reporting needs formalization

---

## COSO ERM 2017

**Standard**: Enterprise Risk Management — Integrating with Strategy  
**Publisher**: Committee of Sponsoring Organizations  
**SVB Coverage**: 75% (15 of 20 principles fully met)

### Five Component Coverage

| Component | Principles | Met | Status |
|-----------|-----------|-----|--------|
| Governance & Culture | 5 | 4 | ✓ Good |
| Strategy & Objective-Setting | 4 | 3 | ⚠ Partial |
| Performance | 5 | 4 | ✓ Good |
| Review & Revision | 3 | 2 | ⚠ Partial |
| Information & Reporting | 3 | 2 | ⚠ Partial |

### AI Integration with COSO
The AI engine supports COSO ERM by:
1. Generating risk narratives for Board Risk Committee
2. Quantifying risk appetite vs. current exposure
3. Cross-mapping operational risks to cyber events
4. Producing KRI dashboards from real-time threat data

---

## ITIL v4

**Standard**: IT Infrastructure Library, version 4  
**Publisher**: Axelos / PeopleCert  
**SVB Coverage**: 80% (10 of 15 key practices at "Managed" or above)

### Practice Maturity

| Practice | Maturity | Score |
|----------|---------|-------|
| Incident Management | Optimized | 5/5 |
| Problem Management | Managed | 4/5 |
| Change Enablement | Defined | 3/5 |
| Service Continuity Mgmt | Managed | 4/5 |
| Information Security Mgmt | Managed | 4/5 |
| Risk Management | Defined | 3/5 |

### ITIL + AI Integration
- **Incident**: AI auto-classifies severity, suggests assignment group
- **Problem**: AI identifies recurring incident patterns (root cause)
- **Change**: AI assesses change risk, recommends approval tier
- **Continuity**: AI validates DR scenarios against RPO/RTO targets

---

## AWS Security Services Mapping

| AWS Service | GRC Function | Framework Alignment |
|-------------|-------------|---------------------|
| GuardDuty | Threat Detection | NIST DE, ISO A.16 |
| Security Hub | Compliance Aggregation | All frameworks |
| Inspector v2 | Vulnerability Mgmt | ISO A.8.8, NIST ID |
| Macie | Data Classification | ISO A.8.12, GLBA |
| CloudTrail | Audit Logging | ISO A.12.4, SOX |
| Config | Configuration Compliance | COBIT DSS05, NIST PR |
| IAM Access Analyzer | Least Privilege | ISO A.9, NIST PR.AC |
| Shield Advanced | DDoS Protection | ISO A.17, NIST RC |
| WAF | Application Security | PCI DSS, ISO A.13 |
| KMS | Encryption | ISO A.10, GLBA |
| Secrets Manager | Credential Management | ISO A.9.4 |
| Backup | DR / Recovery | ISO A.17, NIST RC |
| Audit Manager | Compliance Evidence | All frameworks |

---

## Regulatory Mapping

| Regulation | Primary Framework | Key AWS Service |
|------------|------------------|----------------|
| OCC 12 CFR 30 | NIST CSF, FFIEC | Security Hub |
| GLBA Safeguards | ISO 27001, NIST | Macie, KMS |
| PCI DSS 4.0 | ISO 27001 | WAF, Inspector |
| SOX IT Controls | COBIT, COSO | CloudTrail, Config |
| FFIEC BCP | ITIL, ISO A.17 | Backup, Route 53 |
| FinCEN AML | COSO ERM | Fraud Detector |

---

*SecureVault Bank GRC Simulation — Training Use Only*
