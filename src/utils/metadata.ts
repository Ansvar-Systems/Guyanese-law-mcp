/**
 * Response metadata utilities for Guyanese Law MCP.
 */

import type Database from '@ansvar/mcp-sqlite';

export interface ResponseMetadata {
  data_source: string;
  jurisdiction: string;
  disclaimer: string;
  freshness?: string;
  note?: string;
  query_strategy?: string;
}

export interface ToolResponse<T> {
  results: T;
  _metadata: ResponseMetadata;
}

export function generateResponseMetadata(
  db: InstanceType<typeof Database>,
): ResponseMetadata {
  let freshness: string | undefined;
  try {
    const row = db.prepare(
      "SELECT value FROM db_metadata WHERE key = 'built_at'"
    ).get() as { value: string } | undefined;
    if (row) freshness = row.value;
  } catch {
    // Ignore
  }

  return {
    data_source: 'Laws of Guyana (legalaffairs.gov.gy) — Attorney General\'s Chambers and Ministry of Legal Affairs',
    jurisdiction: 'GY',
    disclaimer:
      'This data is sourced from the Laws of Guyana portal maintained by the Attorney General\'s Chambers. ' +
      'Government legislation is public domain under Guyanese law. ' +
      'Always verify with the official Laws of Guyana portal (legalaffairs.gov.gy).',
    freshness,
  };
}
