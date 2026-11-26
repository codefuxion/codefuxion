"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const { verifyWebhookSignature } = require("./webhook-verification");

const secret = "local-test-secret-do-not-use-in-production";
const timestamp = 1_800_000_000;
const nowMs = timestamp * 1000;
const rawBody = Buffer.from('{"event":"payment.success","id":"evt_demo_01"}');

function sign(body, time = timestamp) {
  const digest = crypto
    .createHmac("sha256", secret)
    .update(Buffer.concat([Buffer.from(String(time) + "."), body]))
    .digest("hex");
  return "sha256=" + digest;
}

test("accepts a valid signature for the exact raw body", () => {
  assert.equal(verifyWebhookSignature({
    rawBody, signature: sign(rawBody), timestamp, secret, nowMs
  }), true);
});

test("rejects a modified body", () => {
  assert.equal(verifyWebhookSignature({
    rawBody: Buffer.from('{"event":"payment.failed"}'),
    signature: sign(rawBody), timestamp, secret, nowMs
  }), false);
});

test("rejects an expired timestamp", () => {
  assert.equal(verifyWebhookSignature({
    rawBody, signature: sign(rawBody), timestamp: timestamp - 600,
    secret, nowMs
  }), false);
});

test("rejects malformed signatures and missing secrets", () => {
  assert.equal(verifyWebhookSignature({
    rawBody, signature: "not-a-signature", timestamp, secret, nowMs
  }), false);
  assert.equal(verifyWebhookSignature({
    rawBody, signature: sign(rawBody), timestamp, secret: "", nowMs
  }), false);
});
