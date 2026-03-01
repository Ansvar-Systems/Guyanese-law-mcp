#!/usr/bin/env tsx
/**
 * Guyana Law MCP -- Census Script
 *
 * Scrapes parliament.gov.gy for individual Acts of Parliament.
 * Uses offset-based pagination: /publications/acts-of-parliament/P{offset}
 *
 * Portal: 185 pages, 10 acts per page, ~1,850 individual acts
 * PDF URL pattern: /new2/documents/acts/{id}-act_no._{num}_of_{year}.pdf
 *
 * Source: https://parliament.gov.gy
 * NOTE: This file does NOT use child_process. PDF extraction is in parser.ts.
 *
 * Usage:
 *   npx tsx scripts/census.ts
 *   npx tsx scripts/census.ts --limit 100
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.resolve(__dirname, '../data');
const CENSUS_PATH = path.join(DATA_DIR, 'census.json');

const BASE_URL = 'https://www.parliament.gov.gy';
const ACTS_PATH = '/publications/acts-of-parliament/';
const PAGE_SIZE = 10;
const MAX_PAGES = 200;
const MIN_DELAY_MS = 500;

const USER_AGENT = 'guyanese-law-mcp/1.0 (https://github.com/Ansvar-Systems/Guyanese-law-mcp; hello@ansvar.ai)';

/* ---------- Types ---------- */

interface RawActEntry {
  title: string;
  pdfUrl: string;
  year: string;
  actNumber: string;
}

/* ---------- HTTP ---------- */

async function fetchPage(url: string): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, MIN_DELAY_MS));

  const response = await fetch(url, {
    headers: {
      'User-Agent': USER_AGENT,
      'Accept': 'text/html',
    },
    redirect: 'follow',
  });

  if (response.status !== 200) {
    throw new Error(`HTTP ${response.status} for ${url}`);
  }

  return response.text();
}

/* ---------- Parsing ---------- */

function parseActsPage(html: string): RawActEntry[] {
  const entries: RawActEntry[] = [];

  // Match PDF download links
  const pdfRe = /href=["']([^"']*documents\/acts\/[^"']*\.pdf)["']/gi;
  let match: RegExpExecArray | null;

  while ((match = pdfRe.exec(html)) !== null) {
    let url = match[1];
    if (!url.startsWith('http')) {
      url = `${BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
    }

    // Extract act number and year from URL
    const numYearMatch = url.match(/act[_\s]*(?:no[._\s]*)?(\d+)[_\s]*of[_\s]*(\d{4})/i);
    const year = numYearMatch ? numYearMatch[2] : '';
    const actNumber = numYearMatch ? numYearMatch[1] : '';

    // Extract title from filename
    const filenameMatch = url.match(/acts\/\d+-(.+?)\.pdf$/i);
    let title = '';
    if (filenameMatch) {
      title = filenameMatch[1]
        .replace(/_/g, ' ')
        .replace(/\bact no \d+ of \d+\b/gi, '')
        .replace(/^\s*[-_]\s*/, '')
        .trim();
    }

    // Try to find a nearby title in HTML (look backwards for text content)
    const beforePdf = html.substring(Math.max(0, match.index - 500), match.index);
    const titleMatch = beforePdf.match(/(?:<(?:h[2-6]|strong|b|td|p)[^>]*>|>\s*)([^<]{5,150}?)\s*(?:<\/|$)/gi);
    if (titleMatch) {
      const lastTitle = titleMatch[titleMatch.length - 1]
        .replace(/<[^>]*>/g, '')
        .trim();
      if (lastTitle.length > 3 && lastTitle.length < 200) {
        title = lastTitle;
      }
    }

    if (!title && actNumber && year) {
      title = `Act No. ${actNumber} of ${year}`;
    }

    if (title.length > 2) {
      entries.push({ title, pdfUrl: url, year, actNumber });
    }
  }

  return entries;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 60);
}

function parseArgs(): { limit: number | null } {
  const args = process.argv.slice(2);
  let limit: number | null = null;
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--limit' && args[i + 1]) {
      limit = parseInt(args[i + 1], 10);
      i++;
    }
  }
  return { limit };
}

/* ---------- Main ---------- */

async function main(): Promise<void> {
  const { limit } = parseArgs();

  console.log('Guyana Law MCP -- Census');
  console.log('========================\n');
  console.log('  Source: parliament.gov.gy (Acts of Parliament)');
  console.log('  Method: Offset-based pagination (/P{offset})');
  if (limit) console.log(`  --limit ${limit}`);
  console.log('');

  fs.mkdirSync(DATA_DIR, { recursive: true });

  const allEntries: RawActEntry[] = [];
  const seenUrls = new Set<string>();
  let emptyPages = 0;

  for (let page = 0; page < MAX_PAGES; page++) {
    const offset = page * PAGE_SIZE;
    const url = page === 0
      ? `${BASE_URL}${ACTS_PATH}`
      : `${BASE_URL}${ACTS_PATH}P${offset}`;

    process.stdout.write(`  Page ${page + 1} (offset ${offset})...`);

    try {
      const html = await fetchPage(url);
      const entries = parseActsPage(html);

      let newCount = 0;
      for (const entry of entries) {
        if (!seenUrls.has(entry.pdfUrl)) {
          seenUrls.add(entry.pdfUrl);
          allEntries.push(entry);
          newCount++;
        }
      }

      console.log(` ${entries.length} found, ${newCount} new`);

      if (entries.length === 0) {
        emptyPages++;
        if (emptyPages >= 3) {
          console.log('  3 consecutive empty pages, stopping');
          break;
        }
      } else {
        emptyPages = 0;
      }
    } catch (err) {
      console.log(` ERROR: ${err instanceof Error ? err.message : String(err)}`);
      emptyPages++;
      if (emptyPages >= 3) break;
    }

    if (limit && allEntries.length >= limit) break;
  }

  const laws = allEntries
    .slice(0, limit ?? allEntries.length)
    .map((entry) => {
      const id = `gy-act-${entry.year || 'unknown'}-${entry.actNumber || '0'}-${slugify(entry.title)}`;

      return {
        id,
        title: entry.title,
        identifier: entry.actNumber && entry.year
          ? `Act No. ${entry.actNumber} of ${entry.year}`
          : entry.title,
        url: entry.pdfUrl,
        status: 'in_force' as const,
        category: 'act' as const,
        classification: 'ingestable' as const,
        ingested: false,
        provision_count: 0,
        ingestion_date: null as string | null,
        issued_date: entry.year ? `${entry.year}-01-01` : '',
      };
    });

  const census = {
    schema_version: '2.0',
    jurisdiction: 'GY',
    jurisdiction_name: 'Guyana',
    portal: 'parliament.gov.gy',
    census_date: new Date().toISOString().split('T')[0],
    agent: 'guyanese-law-mcp/census.ts',
    summary: {
      total_laws: laws.length,
      ingestable: laws.filter(l => l.classification === 'ingestable').length,
      ocr_needed: 0,
      inaccessible: 0,
      excluded: 0,
    },
    laws,
  };

  fs.writeFileSync(CENSUS_PATH, JSON.stringify(census, null, 2));

  console.log('\n==================================================');
  console.log('CENSUS COMPLETE');
  console.log('==================================================');
  console.log(`  Total acts discovered:  ${laws.length}`);
  console.log(`  Ingestable:            ${census.summary.ingestable}`);
  console.log(`\n  Output: ${CENSUS_PATH}`);
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
