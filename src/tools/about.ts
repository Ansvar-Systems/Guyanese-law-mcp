/**
 * about — Server metadata, dataset statistics, and provenance.
 */

import type Database from '@ansvar/mcp-sqlite';
import { detectCapabilities, readDbMetadata } from '../capabilities.js';
import { SERVER_NAME, SERVER_VERSION, REPOSITORY_URL } from '../constants.js';
import { generateResponseMetadata } from '../utils/metadata.js';

export interface AboutContext {
  version: string;
  fingerprint: string;
  dbBuilt: string;
}

function safeCount(db: InstanceType<typeof Database>, sql: string): number {
  try {
    const row = db.prepare(sql).get() as { count: number } | undefined;
    return row ? Number(row.count) : 0;
  } catch {
    return 0;
  }
}

export function getAbout(db: InstanceType<typeof Database>, context: AboutContext) {
  const caps = detectCapabilities(db);
  const meta = readDbMetadata(db);

  return {
    server: SERVER_NAME,
    version: context.version,
    repository: REPOSITORY_URL,
    database: {
      fingerprint: context.fingerprint,
      built_at: context.dbBuilt,
      tier: meta.tier,
      schema_version: meta.schema_version,
      capabilities: [...caps],
    },
    statistics: {
      documents: safeCount(db, 'SELECT COUNT(*) as count FROM legal_documents'),
      provisions: safeCount(db, 'SELECT COUNT(*) as count FROM legal_provisions'),
      definitions: safeCount(db, 'SELECT COUNT(*) as count FROM definitions'),
    },
    data_source: {
      name: 'Laws of Guyana',
      authority: 'Ministry of Legal Affairs, Government of Guyana',
      url: 'https://legalaffairs.gov.gy',
      license: 'Government Open Data',
      jurisdiction: 'GY',
      languages: ['en'],
    },
    _meta: generateResponseMetadata(db),
  };
}
