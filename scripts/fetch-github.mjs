// Fetches public GitHub data at build time into src/content/github.json.
// Falls back to the committed snapshot if the API is unreachable or rate-limited.
// Set GITHUB_TOKEN to raise the rate limit (optional).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const USER = "cyrus937";
const OUT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../src/content/github.json");
const headers = { Accept: "application/vnd.github+json", "User-Agent": "portfolio-build" };
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

const get = async (url) => {
  const res = await fetch(`https://api.github.com${url}`, { headers, signal: AbortSignal.timeout(10_000) });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
};

try {
  const [user, repos] = await Promise.all([get(`/users/${USER}`), get(`/users/${USER}/repos?per_page=100&sort=pushed`)]);
  const own = repos.filter((r) => !r.fork && !r.archived);

  const data = {
    fetchedAt: new Date().toISOString(),
    user: { publicRepos: user.public_repos, followers: user.followers, since: user.created_at.slice(0, 4) },
    stars: own.reduce((n, r) => n + r.stargazers_count, 0),
    repos: own.map((r) => ({
      name: r.name,
      description: r.description,
      language: r.language,
      stars: r.stargazers_count,
      pushedAt: r.pushed_at,
      url: r.html_url,
      homepage: r.homepage || null,
    })),
  };
  fs.writeFileSync(OUT, JSON.stringify(data, null, 2) + "\n");
  console.log(`github.json updated — ${data.repos.length} repos`);
} catch (err) {
  if (fs.existsSync(OUT)) console.warn(`GitHub fetch failed (${err.message}); using committed snapshot.`);
  else throw err;
}
