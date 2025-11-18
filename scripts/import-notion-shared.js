#!/usr/bin/env node

import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env.local" });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.dirname(__dirname);

const BLOG_DIR = path.join(rootDir, "src/data/blog");
const notionToken = process.env.NOTION_API_KEY;
const pageId = process.argv[2];
const pageTitle = process.argv[3] || null;

if (!notionToken) {
  console.error("❌ Error: NOTION_API_KEY not found in .env.local");
  process.exit(1);
}

if (!pageId) {
  console.error("❌ Error: No page ID provided");
  console.error("Usage: npm run import:notion:shared <PAGE_ID> [TITLE]");
  console.error("\nExample: npm run import:notion:shared 2739ef32e33580a5b1b9f4e79d655653 'My Page Title'");
  process.exit(1);
}

// Initialize Notion client
const notion = new Client({ auth: notionToken });
const n2m = new NotionToMarkdown({ notionClient: notion });

/**
 * Convert Notion page to markdown
 */
async function convertPageToMarkdown(id) {
  try {
    const mdblocks = await n2m.pageToMarkdown(id);

    // Convert blocks array to markdown string properly
    let markdown = "";

    if (Array.isArray(mdblocks)) {
      markdown = mdblocks.map(block => block.parent || "").join("\n");
    } else if (typeof mdblocks === 'string') {
      markdown = mdblocks;
    } else if (mdblocks && typeof mdblocks === 'object') {
      // If it's an object with parent property
      markdown = mdblocks.parent || JSON.stringify(mdblocks, null, 2);
    }

    return markdown || "";
  } catch (error) {
    console.error(`Error converting page ${id}:`, error.message);
    console.error(error);
    return null;
  }
}

/**
 * Generate slug from title
 */
function generateSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/**
 * Create markdown file with front matter
 */
async function createBlogPost(title, content) {
  const slug = generateSlug(title);
  const now = new Date().toISOString();

  const frontMatterYaml = `---
title: ${title}
description: Imported from Notion
pubDatetime: ${now}
slug: ${slug}
featured: false
draft: true
tags: []
---

${content}
`;

  const filePath = path.join(BLOG_DIR, `${slug}.md`);

  if (fs.existsSync(filePath)) {
    console.error(`❌ File already exists: ${slug}.md`);
    console.error("   Delete it first if you want to overwrite");
    return false;
  }

  fs.writeFileSync(filePath, frontMatterYaml, "utf-8");
  console.log(`✅ Created: ${slug}.md`);
  return true;
}

/**
 * Main import function
 */
async function importPage() {
  console.log("🚀 Importing Notion page (with shared link)...\n");

  try {
    let title = pageTitle;

    // Try to get title from page if not provided
    if (!title) {
      console.log(`📥 Fetching page info: ${pageId}...`);
      try {
        const page = await notion.pages.retrieve({ page_id: pageId });

        for (const [key, prop] of Object.entries(page.properties)) {
          if (prop.type === "title" && prop.title && prop.title.length > 0) {
            title = prop.title[0].plain_text;
            break;
          }
        }
      } catch (e) {
        console.warn("⚠️  Could not fetch page info, using provided title or ID");
        if (!title) {
          title = pageId.substring(0, 12);
        }
      }
    }

    console.log(`✅ Page title: "${title}"\n`);

    // Convert to markdown
    console.log(`📝 Converting to markdown...`);
    const content = await convertPageToMarkdown(pageId);

    if (!content) {
      console.error("❌ Failed to convert page");
      process.exit(1);
    }

    console.log(`✅ Conversion successful (${content.length} characters)\n`);

    // Create blog post file
    console.log(`📄 Creating blog post file...`);
    const created = await createBlogPost(title, content);

    if (!created) {
      process.exit(1);
    }

    console.log("\n" + "=".repeat(50));
    console.log("✨ Import Complete!");
    console.log(`   Title: ${title}`);
    console.log(`   File: ${generateSlug(title)}.md`);
    console.log(`   Status: Draft (draft: true)`);
    console.log("=".repeat(50));
    console.log("\n💡 Next steps:");
    console.log("1. Review the imported post in VS Code");
    console.log("2. Check Front Matter CMS for preview");
    console.log("3. Edit metadata (title, tags, etc.)");
    console.log("4. Change draft: false when ready to publish");
  } catch (error) {
    console.error("❌ Error:", error.message);
    console.error("\nTroubleshooting:");
    console.error("1. Make sure the integration is shared with the page");
    console.error("2. Check that the page ID is correct");
    console.error("3. Try providing the title manually:");
    console.error(`   npm run import:notion:shared ${pageId} "Your Page Title"`);
    process.exit(1);
  }
}

importPage();
