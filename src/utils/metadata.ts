/**
 * Response metadata types and generator for Guyana Law MCP.
 *
 * Provides the _meta block required on every tool response per the
 * law-mcp golden standard (Section 4.9b).
 */

import type Database from '@ansvar/mcp-sqlite';
import { readDbMetadata } from '../capabilities.js';
import type { CitationMetadata } from './citation.js';

export interface ResponseMeta {
  disclaimer: string;
  data_age: string;
  copyright: string;
  source_url: string;
  [key: string]: unknown;
}

export interface ToolResponse<T> {
  results: T;
  _meta: ResponseMeta;
  _citation?: CitationMetadata;
  _error_type?: string;
}

export function generateResponseMetadata(db: InstanceType<typeof Database>): ResponseMeta {
  const meta = readDbMetadata(db);
  return {
    disclaimer:
      'This data is provided for informational purposes only and does not constitute legal advice. ' +
      'Always verify citations with official sources before relying on them.',
    data_age: meta.built_at ?? 'unknown',
    copyright: 'Laws of Guyana. Published by the Ministry of Legal Affairs, Government of Guyana.',
    source_url: 'https://legalaffairs.gov.gy',
  };
}
