import { InvalidSourceFileError, SourceTooLargeError } from '../errors';
import { computeSourceHash } from './hash-source';

export interface ParsedSourceDocument {
  normalizedContent: string;
  sourceHash: string;
  lineCount: number;
  characterCount: number;
  byteSize: number;
  detectedFormat: 'markdown' | 'text';
}

export interface ParseSourceOptions {
  fileName?: string;
  mimeType?: string;
  maxBytes?: number;
}

const DEFAULT_MAX_BYTES = 256 * 1024; // 256 KB

const ALLOWED_EXTENSIONS = ['.md', '.markdown', '.txt'];

export function parseAndNormalizeSource(
  rawInput: string | Buffer,
  options: ParseSourceOptions = {}
): ParsedSourceDocument {
  const maxBytes = options.maxBytes || DEFAULT_MAX_BYTES;

  // 1. Extension validation if filename provided
  if (options.fileName) {
    const lowerName = options.fileName.toLowerCase();
    const hasValidExt = ALLOWED_EXTENSIONS.some((ext) => lowerName.endsWith(ext));
    if (!hasValidExt) {
      throw new InvalidSourceFileError(
        `Unsupported file extension for "${options.fileName}". Allowed extensions: .md, .markdown, .txt`
      );
    }
  }

  // 2. Convert Buffer to String
  let contentStr: string;
  let byteSize: number;

  if (Buffer.isBuffer(rawInput)) {
    byteSize = rawInput.length;
    if (byteSize > maxBytes) {
      throw new SourceTooLargeError(byteSize, maxBytes);
    }
    // Check for null bytes indicating binary file
    if (rawInput.includes(0x00)) {
      throw new InvalidSourceFileError('The file contains binary null bytes and cannot be parsed as text.');
    }
    contentStr = rawInput.toString('utf8');
  } else if (typeof rawInput === 'string') {
    byteSize = Buffer.byteLength(rawInput, 'utf8');
    if (byteSize > maxBytes) {
      throw new SourceTooLargeError(byteSize, maxBytes);
    }
    if (rawInput.includes('\0')) {
      throw new InvalidSourceFileError('The input contains binary null bytes and cannot be processed.');
    }
    contentStr = rawInput;
  } else {
    throw new InvalidSourceFileError('Source input must be a string or Buffer.');
  }

  // 3. Strip BOM
  if (contentStr.charCodeAt(0) === 0xfeff) {
    contentStr = contentStr.slice(1);
  }

  // 4. Normalize CRLF to LF
  let normalized = contentStr.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  // 5. Trim leading/trailing blank lines
  normalized = normalized.trim();

  if (normalized.length === 0) {
    throw new InvalidSourceFileError('Source document content is empty.');
  }

  // 6. Detect format
  const isMarkdown =
    (options.fileName && (options.fileName.endsWith('.md') || options.fileName.endsWith('.markdown'))) ||
    /^#+\s|(\*\*|__).+(\*\*|__)|^\s*-\s|^\s*\d+\.\s/m.test(normalized);

  const lines = normalized.split('\n');
  const sourceHash = computeSourceHash(normalized);

  return {
    normalizedContent: normalized,
    sourceHash,
    lineCount: lines.length,
    characterCount: normalized.length,
    byteSize,
    detectedFormat: isMarkdown ? 'markdown' : 'text',
  };
}
