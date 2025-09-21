import fs from "fs/promises";
import path from "path";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export async function getAllSlugs() {
	const entries = await fs.readdir(POSTS_DIR, { withFileTypes: true });
	return entries
		.filter((e) => e.isFile() && e.name.endsWith(".html"))
		.map((e) => e.name.replace(/\.html$/i, ""));
}

export async function getHtmlBySlug(slug) {
	const file = path.join(POSTS_DIR, `${slug}.html`);
	const raw = await fs.readFile(file, "utf8");
	const metaMatch = raw.match(/<!--\s*meta:\s*({[\s\S]*?})\s*-->/i);
	let meta = {};
	if (metaMatch) {
		try {
			meta = JSON.parse(metaMatch[1]);
		} catch {}
	}
	return { html: raw, meta };
}
