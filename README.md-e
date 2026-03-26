# Guyanese Law MCP Server

**The Guyana Ministry of Legal Affairs alternative for the AI age.**

[![npm version](https://badge.fury.io/js/@ansvar%2Fguyanese-law-mcp.svg)](https://www.npmjs.com/package/@ansvar/guyanese-law-mcp)
[![MCP Registry](https://img.shields.io/badge/MCP-Registry-blue)](https://registry.modelcontextprotocol.io)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![GitHub stars](https://img.shields.io/github/stars/Ansvar-Systems/Guyanese-law-mcp?style=social)](https://github.com/Ansvar-Systems/Guyanese-law-mcp)
[![CI](https://github.com/Ansvar-Systems/Guyanese-law-mcp/actions/workflows/ci.yml/badge.svg)](https://github.com/Ansvar-Systems/Guyanese-law-mcp/actions/workflows/ci.yml)
[![Provisions](https://img.shields.io/badge/provisions-15%2C379-blue)]()

Query **1,655 Guyanese laws** -- from the Deeds Registry Act and Companies Act to the Natural Resource Fund Act, Anti-Money Laundering Act, and 17 CCJ judgments -- directly from Claude, Cursor, or any MCP-compatible client.

If you're building legal tech, compliance tools, or doing Guyanese legal research, this is your verified reference database.

Built by [Ansvar Systems](https://ansvar.eu) -- Stockholm, Sweden

---

## Why This Exists

Guyanese legal research means navigating [guyana.justia.com](https://guyana.justia.com), the Ministry of Legal Affairs portal (mola.gov.gy), and Caribbean Court of Justice publications -- often in scattered PDFs with inconsistent indexing. Whether you're:

- A **lawyer** validating citations in a brief or contract
- A **compliance officer** checking obligations under the Anti-Money Laundering Act or the Financial Institutions Act
- A **legal tech developer** building tools on Guyanese law, especially in the context of Guyana's emerging energy sector
- A **researcher** tracing Caribbean Court of Justice decisions and their domestic impact

...you shouldn't need dozens of browser tabs and manual cross-referencing. Ask Claude. Get the exact provision. With context.

This MCP server makes Guyanese law **searchable, cross-referenceable, and AI-readable**.

---

## Quick Start

### Use Remotely (No Install Needed)

> Connect directly to the hosted version -- zero dependencies, nothing to install.

**Endpoint:** `https://guyanese-law-mcp.vercel.app/mcp`

| Client | How to Connect |
|--------|---------------|
| **Claude.ai** | Settings > Connectors > Add Integration > paste URL |
| **Claude Code** | `claude mcp add guyanese-law --transport http https://guyanese-law-mcp.vercel.app/mcp` |
| **Claude Desktop** | Add to config (see below) |
| **GitHub Copilot** | Add to VS Code settings (see below) |

**Claude Desktop** -- add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "guyanese-law": {
      "type": "url",
      "url": "https://guyanese-law-mcp.vercel.app/mcp"
    }
  }
}
```

**GitHub Copilot** -- add to VS Code `settings.json`:

```json
{
  "github.copilot.chat.mcp.servers": {
    "guyanese-law": {
      "type": "http",
      "url": "https://guyanese-law-mcp.vercel.app/mcp"
    }
  }
}
```

### Use Locally (npm)

```bash
npx @ansvar/guyanese-law-mcp
```

**Claude Desktop** -- add to `claude_desktop_config.json`:

**macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "guyanese-law": {
      "command": "npx",
      "args": ["-y", "@ansvar/guyanese-law-mcp"]
    }
  }
}
```

**Cursor / VS Code:**

```json
{
  "mcp.servers": {
    "guyanese-law": {
      "command": "npx",
      "args": ["-y", "@ansvar/guyanese-law-mcp"]
    }
  }
}
```

---

## Example Queries

Once connected, just ask naturally:

- *"What does the Companies Act say about director duties and conflicts of interest?"*
- *"Is the Natural Resource Fund Act still in force?"*
- *"Find provisions about anti-money laundering obligations under the AML/CFT Act"*
- *"What does the Financial Institutions Act require for bank licensing?"*
- *"Search the CCJ judgments for cases involving CARICOM treaty interpretation from 2022"*
- *"What does the Petroleum (Exploration and Production) Act say about production sharing agreements?"*
- *"Validate the citation 'Section 15 of the Deeds Registry Act Chapter 5:01'"*
- *"Build a legal stance on environmental obligations for oil companies under Guyanese law"*
- *"What are the penalty provisions under the Cybercrime Act?"*

---

## What's Included

| Category | Count | Details |
|----------|-------|---------|
| **Laws** | 1,655 statutes | Comprehensive Guyanese legislation from Guyana Justia |
| **Provisions** | 15,379 sections | Full-text searchable with FTS5 |
| **CCJ Judgments** | 17 judgments | Caribbean Court of Justice decisions (2020-2026) |
| **Database Size** | ~28 MB | Optimized SQLite, portable |
| **Freshness Checks** | Automated | Drift detection against source |

**Verified data only** -- every citation is validated against official sources (guyana.justia.com, mola.gov.gy). Zero LLM-generated content.

---

## See It In Action

### Why This Works

**Verbatim Source Text (No LLM Processing):**
- All statute text is ingested from Guyana Justia (guyana.justia.com) and the Ministry of Legal Affairs (mola.gov.gy)
- CCJ judgments are ingested directly from the Caribbean Court of Justice's WordPress-based publication system
- Provisions and judgments are returned **unchanged** from SQLite FTS5 database rows
- Zero LLM summarization or paraphrasing -- the database contains legislation text, not AI interpretations

**Smart Context Management:**
- Search returns ranked provisions with BM25 scoring (safe for context)
- Provision retrieval gives exact text by Chapter number and section
- CCJ judgment search supports court, date, and case type filters

**Technical Architecture:**
```
Guyana Justia + MoLA + CCJ WordPress --> Parse --> SQLite --> FTS5 snippet() --> MCP response
                                           ^                        ^
                                    Provision parser         Verbatim database query
```

### Traditional Research vs. This MCP

| Traditional Approach | This MCP Server |
|---------------------|-----------------|
| Search Guyana Justia by Chapter number | Search by plain language: *"anti-money laundering"* |
| Navigate multi-part Acts manually | Get the exact provision with context |
| Manual cross-referencing between Acts | `build_legal_stance` aggregates across sources |
| "Is this Act still in force?" -- check manually | `check_currency` tool -- answer in seconds |
| Find CARICOM/CCJ decisions -- search CCJ website | Bundled CCJ judgments -- search directly |
| No API, no integration | MCP protocol -- AI-native |

**Traditional:** Search MoLA portal --> Download PDF --> Ctrl+F --> Check CCJ website for judgments --> Cross-reference CARICOM obligations --> Repeat

**This MCP:** *"What are the petroleum sector regulatory obligations under Guyanese law and which CCJ judgments address CARICOM treaty compliance?"* --> Done.

---

## Available Tools (13)

### Core Legal Research Tools (8)

| Tool | Description |
|------|-------------|
| `search_legislation` | FTS5 full-text search across 15,379 provisions with BM25 ranking. Supports quoted phrases, boolean operators, prefix wildcards |
| `get_provision` | Retrieve specific provision by Chapter number and section |
| `check_currency` | Check if an Act is in force, amended, or repealed |
| `validate_citation` | Validate citation against database -- zero-hallucination check |
| `build_legal_stance` | Aggregate citations from multiple Acts and CCJ judgments for a legal topic |
| `format_citation` | Format citations per Guyanese legal conventions (full/short/pinpoint) |
| `list_sources` | List all available Acts and judgment collections with metadata |
| `about` | Server info, capabilities, dataset statistics, and coverage summary |

### International Law Integration Tools (5)

| Tool | Description |
|------|-------------|
| `get_eu_basis` | Get international frameworks (CARICOM, Commonwealth, OAS) that a Guyanese Act aligns with |
| `get_guyanese_implementations` | Find Guyanese laws implementing a specific CARICOM decision or international convention |
| `search_eu_implementations` | Search international documents with Guyanese implementation counts |
| `get_provision_eu_basis` | Get international law references for a specific provision |
| `validate_eu_compliance` | Check alignment status of Guyanese Acts against international frameworks |

---

## International Law Alignment

Guyana is a CARICOM member state with the Caribbean Court of Justice as its final court of appeal for CARICOM treaty matters:

- **CARICOM (Caribbean Community):** Guyana is a founding CARICOM member and has accepted the CCJ as its final appellate court (since 2005), replacing the Privy Council for civil and criminal matters. CCJ judgments -- 17 of which are indexed in this database -- are binding on Guyanese courts
- **Caribbean Court of Justice:** The CCJ exercises both original jurisdiction (CARICOM treaty matters) and appellate jurisdiction (domestic appeals). The 17 CCJ judgments in this database cover 2020-2026 and address CARICOM treaty interpretation, border disputes, and trade law
- **Commonwealth Legal Framework:** Guyana's common law system stems from English common law, and Commonwealth standards on corporate governance, anti-corruption, and financial regulation inform domestic law
- **FATF/CFATF:** Guyana implements FATF recommendations through the Anti-Money Laundering and Countering the Financing of Terrorism Act and the Financial Intelligence Unit Act
- **UN Conventions:** Guyana has ratified UNCAC, UNCLOS (relevant to its offshore oil sector), and major UN environmental conventions
- **OAS:** Guyana is an OAS member and has ratified the Inter-American Convention against Corruption

The international alignment tools allow you to explore these relationships -- checking which Guyanese provisions correspond to international obligations, and vice versa.

> **Note:** International cross-references reflect alignment and implementation relationships. Guyana adopts its own legislative approach through the National Assembly.

---

## Data Sources & Freshness

All content is sourced from authoritative Guyanese legal databases:

- **[Guyana Justia](https://guyana.justia.com/)** -- Comprehensive mirror of Guyanese official legislation
- **[Ministry of Legal Affairs](https://mola.gov.gy/)** -- Official Guyanese government legal portal
- **[Caribbean Court of Justice](https://www.ccj.org/)** -- CCJ judgment publication system (17 judgments, 2020-2026)

### Data Provenance

| Field | Value |
|-------|-------|
| **Authority** | National Assembly of Guyana (statutes); CCJ (judgments) |
| **Retrieval method** | Structured scrape from Guyana Justia + MoLA + CCJ WordPress REST API |
| **Language** | English |
| **Coverage** | 1,655 Guyanese statutes + 17 CCJ judgments |
| **Database size** | ~28 MB |

### Automated Freshness Checks

A GitHub Actions workflow monitors for statute changes and new CCJ judgments:

| Check | Method |
|-------|--------|
| **Statute amendments** | Drift detection against known provision anchors |
| **New statutes** | Comparison against Guyana Justia index |
| **New CCJ judgments** | WordPress REST API monitoring (`/wp-json/wp/v2/project`) |

**Verified data only** -- every citation is validated against official sources. Zero LLM-generated content.

---

## Security

This project uses multiple layers of automated security scanning:

| Scanner | What It Does | Schedule |
|---------|-------------|----------|
| **CodeQL** | Static analysis for security vulnerabilities | Weekly + PRs |
| **Semgrep** | SAST scanning (OWASP top 10, secrets, TypeScript) | Every push |
| **Gitleaks** | Secret detection across git history | Every push |
| **Trivy** | CVE scanning on filesystem and npm dependencies | Daily |
| **Docker Security** | Container image scanning + SBOM generation | Daily |
| **Socket.dev** | Supply chain attack detection | PRs |
| **OSSF Scorecard** | OpenSSF best practices scoring | Weekly |
| **Dependabot** | Automated dependency updates | Weekly |

See [SECURITY.md](SECURITY.md) for the full policy and vulnerability reporting.

---

## Important Disclaimers

### Legal Advice

> **THIS TOOL IS NOT LEGAL ADVICE**
>
> Statute text is sourced from Guyana Justia and the Ministry of Legal Affairs. CCJ judgment text is sourced from the CCJ's official publication system. However:
> - This is a **research tool**, not a substitute for professional legal counsel
> - **CCJ judgment coverage is limited** -- 17 judgments from 2020-2026; earlier CCJ decisions and Privy Council decisions are not indexed
> - **Verify critical citations** against primary sources (National Assembly publications, official Gazette) for court filings
> - **International cross-references** reflect alignment relationships, not direct transposition
> - **Regional and municipal regulations** are not included -- this covers national legislation only

For professional legal advice in Guyana, consult a member of the **Guyana Bar Association**.

**Before using professionally, read:** [DISCLAIMER.md](DISCLAIMER.md) | [SECURITY.md](SECURITY.md)

### Client Confidentiality

Queries go through the Claude API. For privileged or confidential matters, use on-premise deployment.

---

## Development

### Setup

```bash
git clone https://github.com/Ansvar-Systems/Guyanese-law-mcp
cd Guyanese-law-mcp
npm install
npm run build
npm test
```

### Running Locally

```bash
npm run dev                                            # Start MCP server
npx @anthropic/mcp-inspector node dist/src/index.js   # Test with MCP Inspector
```

### Data Management

```bash
npm run ingest          # Ingest statutes from Guyana Justia / MoLA
npm run build:db        # Rebuild SQLite database
npm run drift:detect    # Run drift detection against anchors
npm run check-updates   # Check for amendments and new statutes/judgments
npm run census          # Generate coverage census
```

### Performance

- **Search Speed:** <100ms for most FTS5 queries
- **Database Size:** ~28 MB (efficient, portable)
- **Reliability:** 100% ingestion success rate across 1,655 laws

---

## Related Projects: Complete Compliance Suite

This server is part of **Ansvar's Compliance Suite** -- MCP servers that work together for end-to-end compliance coverage:

### [@ansvar/eu-regulations-mcp](https://github.com/Ansvar-Systems/EU_compliance_MCP)
**Query 49 EU regulations directly from Claude** -- GDPR, AI Act, DORA, NIS2, MiFID II, eIDAS, and more. Full regulatory text with article-level search. `npx @ansvar/eu-regulations-mcp`

### [@ansvar/us-regulations-mcp](https://github.com/Ansvar-Systems/US_Compliance_MCP)
**Query US federal and state compliance laws** -- HIPAA, CCPA, SOX, GLBA, FERPA, and more. `npx @ansvar/us-regulations-mcp`

### [@ansvar/jamaican-law-mcp](https://github.com/Ansvar-Systems/Jamaican-law-mcp)
**Query Jamaican legislation** -- fellow CARICOM member with 910 Acts and 16,310 provisions. `npx @ansvar/jamaican-law-mcp`

### [@ansvar/trinidadian-law-mcp](https://github.com/Ansvar-Systems/Trinidadian-law-mcp)
**Query Trinidad and Tobago legislation** -- fellow CARICOM member with 533 Acts and 21,562 provisions. `npx @ansvar/trinidadian-law-mcp`

**70+ national law MCPs** covering Australia, Brazil, Canada, Denmark, Finland, France, Germany, Ghana, India, Ireland, Italy, Japan, Kenya, Netherlands, Nigeria, Norway, Singapore, Sweden, Switzerland, UK, and more.

---

## Contributing

Contributions welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

Priority areas:
- CCJ judgment expansion (pre-2020 Guyana-related decisions)
- Privy Council decisions relevant to Guyana (pre-CCJ jurisdiction)
- Guyana Gazette amendment history integration
- Petroleum sector regulatory guidance documents

---

## Roadmap

- [x] Core statute database with FTS5 search
- [x] Full corpus ingestion (1,655 laws, 15,379 provisions)
- [x] CCJ judgment ingestion (17 judgments, 2020-2026)
- [x] International law alignment tools
- [x] Vercel Streamable HTTP deployment
- [x] npm package publication
- [ ] CCJ judgment expansion (pre-2020)
- [ ] Privy Council decisions (historical GY appeals)
- [ ] Guyana Gazette amendment history
- [ ] Petroleum sector regulatory guidance

---

## Citation

If you use this MCP server in academic research:

```bibtex
@software{guyanese_law_mcp_2026,
  author = {Ansvar Systems AB},
  title = {Guyanese Law MCP Server: AI-Powered Legal Research Tool},
  year = {2026},
  url = {https://github.com/Ansvar-Systems/Guyanese-law-mcp},
  note = {1,655 Guyanese laws with 15,379 provisions and 17 CCJ judgments (2020-2026)}
}
```

---

## License

Apache License 2.0. See [LICENSE](./LICENSE) for details.

### Data Licenses

- **Statutes & Legislation:** Guyanese Government (public domain)
- **CCJ Judgments:** Caribbean Court of Justice (public domain)
- **International Metadata:** CARICOM Secretariat, OAS (public domain)

---

## About Ansvar Systems

We build AI-accelerated compliance and legal research tools for the global market. This MCP server started as our internal reference tool -- turns out everyone working on Caribbean legal research has the same frustrations. With Guyana's rapidly developing petroleum sector, having fast access to the legislative framework matters more than ever.

So we're open-sourcing it. Navigating 1,655 Guyanese laws plus CCJ judgments shouldn't require hours of manual searching.

**[ansvar.eu](https://ansvar.eu)** -- Stockholm, Sweden

---

<p align="center">
  <sub>Built with care in Stockholm, Sweden</sub>
</p>
