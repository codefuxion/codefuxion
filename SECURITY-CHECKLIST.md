# Application Security Checklist

A practical review aid for web applications and APIs. Tailor it to the application's architecture, threat model, jurisdiction and risk. This checklist is not a certification or a substitute for a professional security assessment.

## Identity and access

- [ ] Hash passwords with a modern password-hashing function such as Argon2id or bcrypt through a maintained library.
- [ ] Enforce authorization on the server for every protected action and resource.
- [ ] Apply least privilege to user, staff, administrator and service accounts.
- [ ] Rotate session identifiers after authentication and privilege changes.
- [ ] Configure cookies with Secure, HttpOnly and an appropriate SameSite policy.
- [ ] Add rate limits and abuse monitoring to login, password reset and sensitive endpoints.
- [ ] Use multi-factor authentication for privileged accounts where possible.

## Input, output and browser protections

- [ ] Validate input on the server using allowlists and explicit schemas.
- [ ] Use parameterized queries; never concatenate untrusted input into SQL.
- [ ] Encode output for its destination context to reduce injection risk.
- [ ] Implement CSRF protection for cookie-authenticated state-changing requests.
- [ ] Configure a restrictive Content Security Policy where practical.
- [ ] Set appropriate security headers and HTTPS-only transport.
- [ ] Restrict upload size, type and storage location; do not execute uploaded files.

## APIs and integrations

- [ ] Authenticate and authorize each API operation.
- [ ] Validate webhook signatures against the exact raw request body.
- [ ] Enforce provider timestamp tolerance where the provider supports it.
- [ ] Store and enforce idempotency keys or event IDs to prevent duplicate processing.
- [ ] Verify payment status server-to-server; never trust a browser redirect as proof of payment.
- [ ] Validate amount, currency, merchant reference and transaction ownership.
- [ ] Keep API keys and secrets outside source control and rotate exposed credentials.
- [ ] Apply timeouts, retry limits and safe error handling to external requests.

## Data and operations

- [ ] Collect only the personal data the product needs.
- [ ] Encrypt traffic in transit and protect sensitive data at rest.
- [ ] Restrict database permissions and separate application and migration credentials.
- [ ] Keep dependencies and server runtimes patched.
- [ ] Log security-relevant events without logging passwords, tokens or full payment details.
- [ ] Back up important data and test restoration.
- [ ] Monitor errors, availability and suspicious activity.
- [ ] Define incident response and credential-rotation procedures.

## Release review

- [ ] Run automated tests and static checks.
- [ ] Review authorization boundaries and sensitive business logic.
- [ ] Test failure paths, duplicate requests and concurrency.
- [ ] Review environment configuration and production debug settings.
- [ ] Confirm secrets, backups and customer data are not committed.
- [ ] Record known risks and assign owners for remediation.

## Reporting a vulnerability

Please do not publish exploit details or sensitive data in a public issue. Follow the private reporting instructions in [SECURITY.md](SECURITY.md).
