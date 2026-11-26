# Engineering Examples

Small, self-contained demonstrations that can be run and reviewed independently.

## Node.js

- [Node.js HTTP API](node-api/README.md) — built-in HTTP server, JSON responses, and automated tests.
- [Webhook signature verification](node-api/webhook-verification.js) — HMAC-SHA256 verification over the raw request body, constant-time comparison, and timestamp tolerance. The example is provider-neutral; adapt the signed-message format to the payment provider's official specification.

Run the Node.js examples and tests:

```bash
cd examples/node-api
npm test
npm start
```

## PHP

- [PDO secure query pattern](php/secure-query.php) — prepared statements and parameter binding.
- [Authentication security helpers](php/auth-security.php) — password hashing and verification, secure session settings, session ID rotation, and CSRF token helpers.

## Important

These examples are educational starting points, not complete production systems. A real application also needs requirements-specific validation, authorization, logging, rate limiting, replay protection, error handling, tests, deployment configuration, monitoring, and a security review. Never commit secrets, real customer data, or production credentials.
