# SecureVault Bank — AWS Hybrid Architecture Guide

> **SIMULATION ONLY** — Fictional institution for cybersecurity training

---

## Architecture Overview

SecureVault Bank operates a **hybrid architecture** combining on-premises core banking systems with AWS cloud for digital banking, security operations, and disaster recovery.

```
                    ┌─────────────────────────────────────┐
                    │         INTERNET / USERS             │
                    │  Online Banking | Mobile | SWIFT     │
                    └──────────────┬──────────────────────┘
                                   │
                    ┌──────────────▼──────────────────────┐
                    │     AWS EDGE / DDoS PROTECTION       │
                    │  Shield Advanced + CloudFront + WAF  │
                    └──────────────┬──────────────────────┘
                                   │
          ┌────────────────────────▼──────────────────────┐
          │         AWS us-east-1 (PRIMARY REGION)         │
          │                                               │
          │  ┌─────────┐  ┌──────────┐  ┌─────────────┐  │
          │  │API GW   │  │ Lambda   │  │ RDS Multi-AZ│  │
          │  │+ Cognito│  │ (AI/Biz) │  │ PostgreSQL  │  │
          │  └─────────┘  └──────────┘  └─────────────┘  │
          │                                               │
          │  SECURITY: GuardDuty | Security Hub | Macie  │
          │           Inspector | CloudTrail | Config    │
          └──────────────────┬────────────────────────────┘
                             │ AWS Direct Connect (10Gbps)
          ┌──────────────────▼────────────────────────────┐
          │         ON-PREMISES DATA CENTER               │
          │                                               │
          │  ┌──────────┐  ┌──────────┐  ┌────────────┐  │
          │  │Mainframe │  │  SWIFT   │  │  Splunk    │  │
          │  │(Core Tx) │  │  Gateway │  │  (SIEM)    │  │
          │  └──────────┘  └──────────┘  └────────────┘  │
          │                                               │
          │  Active Directory | CrowdStrike EDR | HSM    │
          └──────────────────┬────────────────────────────┘
                             │ Cross-Region Replication
          ┌──────────────────▼────────────────────────────┐
          │      AWS us-west-2 (DR / SECONDARY REGION)    │
          │                                               │
          │  Route 53 Failover | RDS Replica | S3 CRR    │
          │  AWS Backup Immutable Vaults | CloudFormation │
          └───────────────────────────────────────────────┘
```

---

## Security Services Detail

### AWS GuardDuty
- **Purpose**: Continuous threat detection using ML
- **Data Sources**: CloudTrail, VPC Flow Logs, DNS logs, S3 data events
- **SVB Use**: Detects anomalous API calls, crypto-mining, C2 traffic
- **Integration**: Findings → Security Hub → EventBridge → Lambda → PagerDuty

### AWS Security Hub
- **Purpose**: Centralized security posture management
- **Standards Enabled**: AWS Foundational (FSBP), CIS AWS v1.4, PCI DSS v3.2.1
- **SVB Score**: 78.4 / 100
- **Integration**: Aggregates GuardDuty, Inspector, Macie, Config findings

### AWS Inspector v2
- **Purpose**: Automated vulnerability management
- **Scope**: EC2 instances, Lambda functions, ECR container images
- **SVB Critical Finding**: OpenSSL 3.0.7 in payment Lambda (CVE-2024-0087)

### Amazon Macie
- **Purpose**: S3 data classification and PII detection
- **SVB Use**: Scans customer data buckets for unintended PII exposure
- **Regulatory**: GLBA Safeguards Rule compliance evidence

### AWS CloudTrail
- **Purpose**: API audit logging
- **Configuration**: All regions, CloudWatch Logs integration, S3 + Glacier
- **Retention**: 7 years (SOX requirement)

### AWS Config
- **Purpose**: Configuration compliance
- **Rules Active**: 87 managed rules
- **Compliance**: 82% of resources compliant
- **Non-compliant**: Unrestricted Security Groups, unencrypted EBS volumes

### IAM Access Analyzer
- **Purpose**: Least privilege enforcement
- **SVB Finding**: Dev team has excessive prod access (CVE-2024-0143)
- **Action**: Permission boundaries under implementation

### AWS Shield Advanced
- **Purpose**: DDoS protection
- **Incident**: Oct 25 — 3.8 Tbps DDoS blocked automatically
- **Cost**: $3,000/month (ROI vs $2.4M avg DDoS incident cost)

### AWS WAF
- **Purpose**: Web application firewall
- **Rules**: AWS Managed Rules (SQLi, XSS, CommonRuleSet)
- **Custom Rules**: Rate limiting, geo-blocking high-risk countries

### AWS KMS
- **Purpose**: Key management
- **Keys**: CMK per service (RDS, S3, Secrets Manager, SQS)
- **Rotation**: Annual automatic rotation enabled

### AWS Backup
- **Purpose**: Centralized backup + DR
- **Vaults**: Standard (30-day) + Locked Immutable (90-day for ransomware)
- **Cross-Region**: us-east-1 → us-west-2 replication

---

## Network Architecture

### VPC Design
```
Production VPC (10.0.0.0/16)
├── Public Subnets (10.0.1.0/24, 10.0.2.0/24)
│   └── ALB, NAT Gateway, Bastion Host
├── Private App Subnets (10.0.11.0/24, 10.0.12.0/24)
│   └── ECS/Lambda, API Gateway VPC Endpoint
└── Private Data Subnets (10.0.21.0/24, 10.0.22.0/24)
    └── RDS Multi-AZ, ElastiCache

Security Groups:
- ALB SG: 443 inbound from 0.0.0.0/0
- App SG: 8443 from ALB SG only
- DB SG: 5432 from App SG only
- Bastion SG: 22 from jump server IPs only
```

### Direct Connect
- **Bandwidth**: 10 Gbps (primary) + 1 Gbps (backup)
- **Use Cases**: Core banking data sync, SWIFT traffic, DR replication
- **Encryption**: MACsec encryption on Direct Connect links

---

## Compliance Evidence Collection

| Regulation | Evidence | AWS Service | Frequency |
|-----------|---------|------------|-----------|
| SOX | IAM access logs | CloudTrail | Continuous |
| PCI DSS | Network flow logs | VPC Flow Logs | Continuous |
| GLBA | PII scans | Macie | Weekly |
| OCC | Config snapshots | Config | Daily |
| FFIEC | DR test results | Backup/Systems Manager | Quarterly |

---

## Cost Optimization + Security Balance

| Service | Monthly Cost | Risk Reduction |
|---------|-------------|----------------|
| GuardDuty | ~$2,400 | $4.2M avg breach prevention |
| Security Hub | ~$800 | Consolidation of 5 tools |
| Shield Advanced | ~$3,000 | DDoS (avg $2.4M incident) |
| Macie | ~$600 | GLBA fine avoidance ($100K+) |
| Inspector | ~$1,200 | Vuln management automation |
| **Total** | **~$8,000/mo** | **vs $6.2M+ avg breach** |

---

*SecureVault Bank AWS Architecture — Training Simulation Only*
