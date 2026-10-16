import { describe, it } from 'node:test';
import assert from 'node:assert';
import { NextRequest } from 'next/server';
import { POST } from '../../app/api/ai/generate/route';

const TEST_SECRET = 'test_editorial_secret_xyz';

describe('AI Generation Route Security and Safeguards', () => {
  it('blocks unauthenticated requests when production credentials are required', async () => {
    const originalEnv = process.env.NODE_ENV;
    const originalSecret = process.env.SANITY_PREVIEW_SECRET;
    const originalAllowMock = process.env.ALLOW_MOCK_IN_PRODUCTION;

    try {
      // @ts-expect-error mutating NODE_ENV for test
      process.env.NODE_ENV = 'production';
      process.env.SANITY_PREVIEW_SECRET = TEST_SECRET;
      process.env.ALLOW_MOCK_IN_PRODUCTION = 'true';

      const req = new NextRequest('http://localhost:3000/api/ai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // No Authorization header
        },
        body: JSON.stringify({
          sourceContent: 'Sample notes',
          confidentialityAcknowledged: true,
        }),
      });

      const res = await POST(req);
      assert.strictEqual(res.status, 401);
      const data = await res.json();
      assert.strictEqual(data.error, 'Unauthorized');
    } finally {
      // @ts-expect-error restoring NODE_ENV
      process.env.NODE_ENV = originalEnv;
      process.env.SANITY_PREVIEW_SECRET = originalSecret;
      process.env.ALLOW_MOCK_IN_PRODUCTION = originalAllowMock;
    }
  });

  it('rejects empty or missing sourceContent with 400', async () => {
    const originalSecret = process.env.SANITY_PREVIEW_SECRET;
    process.env.SANITY_PREVIEW_SECRET = TEST_SECRET;

    try {
      const req = new NextRequest('http://localhost:3000/api/ai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TEST_SECRET}`,
        },
        body: JSON.stringify({
          sourceContent: '',
          confidentialityAcknowledged: true,
        }),
      });

      const res = await POST(req);
      assert.strictEqual(res.status, 400);
      const data = await res.json();
      assert.strictEqual(data.error, 'INVALID_INPUT');
    } finally {
      process.env.SANITY_PREVIEW_SECRET = originalSecret;
    }
  });

  it('rejects unacknowledged confidentiality with 400', async () => {
    const originalSecret = process.env.SANITY_PREVIEW_SECRET;
    process.env.SANITY_PREVIEW_SECRET = TEST_SECRET;

    try {
      const req = new NextRequest('http://localhost:3000/api/ai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TEST_SECRET}`,
        },
        body: JSON.stringify({
          sourceContent: 'Some retail notes',
          confidentialityAcknowledged: false,
        }),
      });

      const res = await POST(req);
      assert.strictEqual(res.status, 400);
      const data = await res.json();
      assert.strictEqual(data.error, 'CONFIDENTIALITY_REQUIRED');
    } finally {
      process.env.SANITY_PREVIEW_SECRET = originalSecret;
    }
  });

  it('blocks confidential source classification with 403', async () => {
    const originalSecret = process.env.SANITY_PREVIEW_SECRET;
    process.env.SANITY_PREVIEW_SECRET = TEST_SECRET;

    try {
      const req = new NextRequest('http://localhost:3000/api/ai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TEST_SECRET}`,
        },
        body: JSON.stringify({
          sourceContent: 'Confidential corporate strategy and salary tables',
          confidentialityStatus: 'confidential_do_not_process',
          confidentialityAcknowledged: true,
        }),
      });

      const res = await POST(req);
      assert.strictEqual(res.status, 403);
      const data = await res.json();
      assert.strictEqual(data.error, 'CONFIDENTIALITY_BLOCKED');
    } finally {
      process.env.SANITY_PREVIEW_SECRET = originalSecret;
    }
  });

  it('rejects sourceDocumentId containing path traversal or illegal characters', async () => {
    const originalSecret = process.env.SANITY_PREVIEW_SECRET;
    process.env.SANITY_PREVIEW_SECRET = TEST_SECRET;

    try {
      const req = new NextRequest('http://localhost:3000/api/ai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TEST_SECRET}`,
        },
        body: JSON.stringify({
          sourceContent: 'Some valid notes',
          sourceDocumentId: '../../etc/passwd',
          confidentialityAcknowledged: true,
        }),
      });

      const res = await POST(req);
      assert.strictEqual(res.status, 400);
      const data = await res.json();
      assert.strictEqual(data.error, 'INVALID_SOURCE_ID');
    } finally {
      process.env.SANITY_PREVIEW_SECRET = originalSecret;
    }
  });

  it('rejects targetCaseStudyId attempting to target singletons or invalid patterns', async () => {
    const originalSecret = process.env.SANITY_PREVIEW_SECRET;
    process.env.SANITY_PREVIEW_SECRET = TEST_SECRET;

    try {
      const req = new NextRequest('http://localhost:3000/api/ai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TEST_SECRET}`,
        },
        body: JSON.stringify({
          sourceContent: 'Some valid notes',
          targetCaseStudyId: 'siteSettings', // Illegal target
          confidentialityAcknowledged: true,
        }),
      });

      const res = await POST(req);
      assert.strictEqual(res.status, 400);
      const data = await res.json();
      assert.strictEqual(data.error, 'INVALID_TARGET_ID');
    } finally {
      process.env.SANITY_PREVIEW_SECRET = originalSecret;
    }
  });

  it('rejects oversized source content (> 256KB) with 413', async () => {
    const originalSecret = process.env.SANITY_PREVIEW_SECRET;
    process.env.SANITY_PREVIEW_SECRET = TEST_SECRET;

    try {
      const oversizedContent = 'A'.repeat(260 * 1024);
      const req = new NextRequest('http://localhost:3000/api/ai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TEST_SECRET}`,
        },
        body: JSON.stringify({
          sourceContent: oversizedContent,
          confidentialityAcknowledged: true,
        }),
      });

      const res = await POST(req);
      assert.strictEqual(res.status, 413);
      const data = await res.json();
      assert.strictEqual(data.error, 'PAYLOAD_TOO_LARGE');
    } finally {
      process.env.SANITY_PREVIEW_SECRET = originalSecret;
    }
  });
});
