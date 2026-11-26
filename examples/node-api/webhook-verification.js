"use strict";

const crypto = require("node:crypto");

/**
 * Verify a provider-neutral HMAC-SHA256 webhook signature.
 *
 * Expected signature format: sha256=<hex digest>
 * Signed message: <timestamp>.<exact raw request body>
 *
 * The provider's official signing specification takes precedence. Do not
 * parse and re-serialize JSON before verifying; use the exact raw bytes.
 */
function verifyWebhookSignature({
  rawBody,
  signature,
  timestamp,
  secret,
  nowMs = Date.now(),
  toleranceSeconds = 300
}) {
  if (!Buffer.isBuffer(rawBody) || typeof signature !== "string") return false;
  if (typeof secret !== "string" || secret.length === 0) return false;

  const timestampSeconds = Number(timestamp);
  if (!Number.isInteger(timestampSeconds) || timestampSeconds <= 0) return false;

  const ageSeconds = Math.abs(Math.floor(nowMs / 1000) - timestampSeconds);
  if (ageSeconds > toleranceSeconds) return false;

  const match = /^sha256=([a-f0-9]{64})$/i.exec(signature);
  if (!match) return false;

  const signedPayload = Buffer.concat([
    Buffer.from(String(timestampSeconds) + ".", "utf8"),
    rawBody
  ]);
  const expected = crypto
    .createHmac("sha256", secret)
    .update(signedPayload)
    .digest();

  const received = Buffer.from(match[1], "hex");
  if (received.length !== expected.length) return false;

  return crypto.timingSafeEqual(expected, received);
}

module.exports = { verifyWebhookSignature };
