// OpenNext adapter config for Cloudflare Workers.
// The site is fully prerendered at build time (all content pages use
// generateStaticParams / static rendering). Prerendered pages MUST be served
// via the static-assets incremental cache: without it every cache lookup
// misses and the Worker re-renders on demand — and lib/articles.ts reads
// content/ from the filesystem, which does not exist at runtime on Workers,
// so listings render empty and article pages 404.
// This cache is read-only (ISR background revalidation is a no-op; content
// refreshes on each deploy). For true ISR later, switch to the R2 cache:
//   import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";
//   export default defineCloudflareConfig({ incrementalCache: r2IncrementalCache });
// (plus an R2 bucket binding named NEXT_INC_CACHE_R2_BUCKET in wrangler.jsonc)
import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
