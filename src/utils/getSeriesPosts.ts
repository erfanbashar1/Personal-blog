import type { CollectionEntry } from "astro:content";

/**
 * Get all posts in a series, sorted by seriesOrder
 * @param series - The series name
 * @param allPosts - All blog posts
 * @returns Posts in the series, sorted by seriesOrder
 */
export function getSeriesPosts(
  series: string | undefined,
  allPosts: CollectionEntry<"blog">[]
): CollectionEntry<"blog">[] {
  if (!series) return [];

  return allPosts
    .filter(
      (post) =>
        post.data.series === series &&
        !post.data.draft &&
        new Date(post.data.pubDatetime) <= new Date()
    )
    .sort(
      (a, b) =>
        (a.data.seriesOrder ?? Number.MAX_VALUE) -
        (b.data.seriesOrder ?? Number.MAX_VALUE)
    );
}

/**
 * Get the current post's position in the series
 * @param postId - The current post's ID
 * @param seriesPosts - Posts in the series
 * @returns { current: number, total: number } or undefined if not in series
 */
export function getSeriesPosition(
  postId: string,
  seriesPosts: CollectionEntry<"blog">[]
): { current: number; total: number } | undefined {
  const index = seriesPosts.findIndex((post) => post.id === postId);
  if (index === -1) return undefined;

  return {
    current: index + 1,
    total: seriesPosts.length,
  };
}
