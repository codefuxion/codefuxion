# Cybersecurity Practice & Responsible Disclosure

I am interested in cybersecurity, secure application development, infrastructure security, and practical security education.

## Areas of focus

- Secure web application development.
- Authentication, authorization, and session security.
- Input validation, output encoding, and common web application risks.
- Dependency and configuration hygiene.
- Linux and server administration fundamentals.
- Defensive monitoring, logging, and incident-response concepts.
- Security awareness and responsible technical education.

## Responsible practice

All security testing must be performed only on systems I own or have explicit written permission to assess. Testing must stay within the agreed scope and must not disrupt services, access other people's data, or bypass authorization.

## Secure development checklist

- Never commit passwords, API keys, tokens, private keys, or production secrets.
- Keep secrets in environment variables or an approved secret manager.
- Validate and authorize every sensitive server-side action.
- Use parameterized database queries or safe ORM patterns.
- Apply least-privilege access to users, services, and database accounts.
- Keep dependencies and server software updated.
- Validate payment notifications server-side; do not trust browser redirects as proof of payment.
- Verify webhook signatures and design transaction handlers to be idempotent.
- Protect administrative actions with strong authentication and audit trails.
- Back up important data and periodically test restoration.
- Log security-relevant events without exposing credentials or sensitive personal data.

## Reporting a vulnerability

Please do not publish exploit details, credentials, or sensitive user data in a public issue. Contact me privately through my GitHub profile to coordinate a responsible disclosure. Include the affected project, impact, reproduction steps within authorized scope, and any suggested remediation.

This document describes responsible practice and learning interests; it is not a claim of a particular certification or independent security audit.
