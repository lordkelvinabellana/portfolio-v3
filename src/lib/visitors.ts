/*
 * All-time unique visitors, read from PostHog on the server. Needs a personal
 * API key with only the "Query: Read" scope; the project token can't read data.
 * Returns null when the key is missing or PostHog doesn't answer, so the hero
 * just leaves the number out.
 */

const QUERY_URL = "https://us.posthog.com/api/projects/707241/query/";
// Local dev traffic doesn't count.
const HOGQL = "SELECT count(DISTINCT person_id) FROM events WHERE event = '$pageview' AND properties.$host NOT LIKE 'localhost%'";

export async function getVisitorCount(): Promise<number | null> {
  const key = process.env.POSTHOG_PERSONAL_API_KEY;
  if (!key) return null;

  try {
    const res = await fetch(QUERY_URL, {
      method: "POST",
      headers: { authorization: `Bearer ${key}`, "content-type": "application/json" },
      body: JSON.stringify({ query: { kind: "HogQLQuery", query: HOGQL } }),
      signal: AbortSignal.timeout(5_000),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { results?: unknown[][] };
    const count = data.results?.[0]?.[0];
    return typeof count === "number" ? count : null;
  } catch {
    return null;
  }
}
