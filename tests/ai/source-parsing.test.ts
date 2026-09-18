import { describe, it } from 'node:test';
import assert from 'node:assert';
import { parseAndNormalizeSource } from '../../lib/ai/source/parse-source';
import { computeSourceHash } from '../../lib/ai/source/hash-source';
import { InvalidSourceFileError, SourceTooLargeError } from '../../lib/ai/errors';

describe('Source Parsing and Normalization', () => {
  it('parses valid Markdown content and computes SHA-256 hash', () => {
    const rawMarkdown = `# Retail Sales Dashboard\n\n- Used Power BI\n- Weekly POS data from CSV\n`;
    const result = parseAndNormalizeSource(rawMarkdown, { fileName: 'project.md' });

    assert.strictEqual(result.detectedFormat, 'markdown');
    assert.strictEqual(result.lineCount, 4);
    assert.strictEqual(result.sourceHash, computeSourceHash(result.normalizedContent));
  });

  it('parses valid plain text content', () => {
    const rawText = `Made sales dashboard for store branches. Weekly refresh.`;
    const result = parseAndNormalizeSource(rawText, { fileName: 'notes.txt' });

    assert.strictEqual(result.detectedFormat, 'text');
    assert.strictEqual(result.characterCount, rawText.length);
  });

  it('removes UTF-8 BOM and normalizes CRLF line endings to LF', () => {
    const rawWithBOM = '\uFEFFLine 1\r\nLine 2\r\nLine 3\r\n';
    const result = parseAndNormalizeSource(rawWithBOM);

    assert.strictEqual(result.normalizedContent, 'Line 1\nLine 2\nLine 3');
    assert.strictEqual(result.normalizedContent.charCodeAt(0), 'L'.charCodeAt(0));
  });

  it('rejects empty or whitespace-only content', () => {
    assert.throws(
      () => parseAndNormalizeSource('   \n\n\r\n   '),
      (err: unknown) => err instanceof InvalidSourceFileError
    );
  });

  it('rejects oversized files exceeding max byte limit', () => {
    const bigContent = 'A'.repeat(500);
    assert.throws(
      () => parseAndNormalizeSource(bigContent, { maxBytes: 100 }),
      (err: unknown) => err instanceof SourceTooLargeError
    );
  });

  it('rejects unsupported file extensions', () => {
    assert.throws(
      () => parseAndNormalizeSource('Sample text', { fileName: 'data.pdf' }),
      (err: unknown) => err instanceof InvalidSourceFileError
    );
  });

  it('rejects binary content with null bytes', () => {
    const binaryBuffer = Buffer.from([0x48, 0x65, 0x00, 0x6c, 0x6f]); // "He\0lo"
    assert.throws(
      () => parseAndNormalizeSource(binaryBuffer, { fileName: 'test.txt' }),
      (err: unknown) => err instanceof InvalidSourceFileError
    );
  });
});
