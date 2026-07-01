import type { ToolDefinition } from '@toolorbit/tool-types';

export const seoTools: ToolDefinition[] = [
  {
    slug: 'meta-tag-generator',
    name: 'Meta Tag Generator',
    category: 'seo',
    kind: 'client-pure',
    icon: 'code-2',
    description: 'Generate complete HTML meta tags for SEO, Open Graph, and Twitter cards.',
    component: 'MetaTagGenerator',
    seo: {
      title: 'Meta Tag Generator - Generate HTML Meta Tags Free',
      description: 'Generate complete, correct HTML meta tags for title, description, Open Graph, and Twitter Card. Copy-paste ready. Free, runs in your browser.',
      keywords: ['meta tag generator', 'seo meta tags', 'open graph generator', 'twitter card generator', 'html meta tags', 'meta description generator', 'og tags generator'],
      faq: [
        { q: 'What meta tags does Google actually use for rankings?', a: 'Google primarily uses the title tag and meta description for displaying snippets in search results, but they have limited direct effect on rankings. The page content, backlinks, and Core Web Vitals are far more influential. Correct meta tags improve click-through rate from search results, which indirectly affects rankings.' },
        { q: 'How long should a meta description be?', a: 'Google typically displays 150–160 characters of a meta description in search results, though it may display more or less depending on the query. Write descriptions that are complete and compelling within 155 characters. Longer descriptions are not penalized but will be truncated in most search result displays.' },
        { q: 'What is the og:image recommended size?', a: 'Facebook and most Open Graph consumers recommend 1200×630 pixels for og:image. This renders well across desktop and mobile Facebook, LinkedIn, and most messaging app link previews. The minimum is 200×200 pixels; images smaller than 600×315 render as small thumbnails rather than large previews.' },
        { q: 'Do I need both Open Graph and Twitter Card tags?', a: 'For maximum compatibility, yes. Twitter originally defined its own card format (twitter:card, twitter:title, etc.) that takes precedence over Open Graph tags when present. Other platforms (LinkedIn, Facebook, WhatsApp, Slack, Discord) use Open Graph. Most generators produce both sets.' },
      ],
      content: `<p>Meta tags are HTML elements in the <code>&lt;head&gt;</code> section of a web page that provide structured metadata about the page to search engines, social media platforms, and other web consumers. While their direct effect on search rankings is modest, correct meta tags are essential for how your pages appear in search results, when shared on social media, and when embedded as link previews in messaging apps.</p>

<h2>The essential meta tags</h2>
<p>The title tag (<code>&lt;title&gt;Page Title Here&lt;/title&gt;</code>) is the most important single HTML element for SEO. It appears as the blue clickable link in search results, in browser tabs, and as the default text when a page is bookmarked. Every page should have a unique, descriptive title of 50–60 characters that includes the primary keyword near the beginning. The meta description (<code>&lt;meta name="description" content="..."&gt;</code>) is the gray text snippet displayed below the title in search results. Google often rewrites meta descriptions, but a well-written one matches what searchers are looking for and improves click-through rates. The charset declaration (<code>&lt;meta charset="UTF-8"&gt;</code>) tells browsers how to encode the page's characters and should appear first in the head. The viewport tag (<code>&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;</code>) is required for correct mobile rendering and is a ranking signal for mobile-first indexing.</p>

<h2>Open Graph protocol</h2>
<p>The Open Graph protocol, originally developed by Facebook and now used by virtually every social platform, defines a set of meta properties that control how a URL appears when shared. The core four properties are og:title (the title to show in the preview, which can differ from the page title), og:description (the snippet text), og:image (the preview image URL), and og:url (the canonical URL of the page). Additional properties like og:type (website, article, product, etc.) and og:site_name provide additional context. When any of these are missing, social platforms fall back to their own heuristics, which frequently produce poorly-formatted previews.</p>

<h2>Twitter Card tags</h2>
<p>Twitter's link preview system uses its own set of meta tags. The twitter:card property specifies the card format: summary (small square image), summary_large_image (large rectangular image), app (for mobile apps), or player (for embedded video). The twitter:title, twitter:description, and twitter:image properties parallel their Open Graph equivalents. When Twitter Card tags are absent, Twitter falls back to Open Graph tags - but Twitter-specific formatting, particularly the card type, requires the twitter:card tag. This generator produces both sets for maximum platform compatibility.</p>

<h2>Canonical URL</h2>
<p>The canonical tag (<code>&lt;link rel="canonical" href="https://example.com/page"&gt;</code>) tells search engines which URL is the "official" version of a page when the same content is accessible at multiple URLs (with and without trailing slashes, with different query parameters, via HTTP and HTTPS, etc.). Duplicate content spread across multiple URLs dilutes SEO authority; the canonical tag consolidates it to the preferred URL. Every page should have a canonical tag pointing to itself as a best practice, even if you are not aware of any duplicates - defensive canonicalization prevents problems if duplicates are introduced later.</p>

<h2>Robots meta tag</h2>
<p>The robots meta tag controls search engine crawler behavior at the page level. <code>content="index, follow"</code> is the default - index this page, follow links from it. <code>content="noindex, follow"</code> excludes the page from search results while still allowing link crawling. <code>content="noindex, nofollow"</code> excludes the page and blocks link crawling. This is useful for thank-you pages, duplicate content, and internal tools that should not appear in search results. The page-level robots tag takes precedence over robots.txt for the page's own indexing status.</p>
<h2>Testing your meta tags after deployment</h2>
<p>After adding meta tags, verify them with the browser's view-source or developer tools (Elements tab → head section), then test social sharing appearance using Facebook's Sharing Debugger and Twitter's Card Validator before any public announcement. Google Search Console shows how your title and description appear in search results after indexing, which can take days to weeks for new pages. Use the URL Inspection tool in Search Console to force a re-crawl of recently updated pages.</p>
`,
    },
    related: ['og-tag-generator', 'robots-txt-generator', 'schema-generator', 'keyword-density-checker'],
  },

  {
    slug: 'og-tag-generator',
    name: 'Open Graph Tag Generator',
    category: 'seo',
    kind: 'client-pure',
    icon: 'share-2',
    description: 'Generate Open Graph and Twitter Card meta tags for perfect social media previews.',
    component: 'OgTagGenerator',
    seo: {
      title: 'Open Graph Tag Generator - OG Tags for Social Media Free',
      description: 'Generate Open Graph and Twitter Card meta tags for better social media link previews on Facebook, Twitter, LinkedIn, and WhatsApp. Free, instant.',
      keywords: ['open graph generator', 'og tag generator', 'twitter card generator', 'social media meta tags', 'facebook og tags', 'og image generator', 'link preview generator'],
      faq: [
        { q: 'Why does my link preview look bad on social media?', a: 'Missing or incorrect Open Graph tags cause social platforms to guess at what to show - they may pick a random image, truncate the title, or show no preview at all. Adding og:title, og:description, og:image, and og:url solves this for most platforms.' },
        { q: 'How do I test my Open Graph tags?', a: 'Facebook has the Sharing Debugger (developers.facebook.com/tools/debug). Twitter/X has the Card Validator. LinkedIn has the Post Inspector. Each shows exactly how your URL will appear when shared on that platform. Social platforms also cache previews - use these tools to force-refresh the cache after making changes.' },
        { q: 'What image size works for all platforms?', a: '1200×630 pixels is the recommended og:image size. It renders correctly on Facebook, LinkedIn, Twitter summary_large_image cards, WhatsApp, Discord, Slack, and most other platforms. Use JPEG or PNG; avoid GIF and WebP for maximum compatibility.' },
        { q: 'Should I use og:title or the page title tag?', a: 'You can use the same text for both, or optimize them independently. The page title is formatted for search results (short, keyword-first). The og:title is formatted for social sharing (may be slightly more descriptive or engaging since social context is different from a search result list). Both have roughly 60-character display limits.' },
      ],
      content: `<p>When a URL is shared on Facebook, Twitter/X, LinkedIn, WhatsApp, Discord, Slack, or any other platform with link previews, the platform reads the page's Open Graph and Twitter Card meta tags to construct the preview card. Without these tags, the platform falls back to its own content detection heuristics, which frequently pick the wrong image, truncate text awkwardly, or produce a blank preview. This generator creates the complete set of tags needed for consistent, professional-looking previews across every major platform.</p>

<h2>How link preview works</h2>
<p>When you paste a URL into a social media post, a chat, or a messaging app, the platform makes an HTTP request to that URL - acting as a browser - and reads the page's HTML. It specifically looks for Open Graph properties (og:title, og:description, og:image, og:url, and og:type) and Twitter Card properties (twitter:card, twitter:title, twitter:description, twitter:image). These values are extracted and used to construct the preview card that appears alongside your post. The page content visible to human visitors is largely irrelevant to link preview - only the meta tags in the HTML head matter.</p>

<h2>Open Graph versus Twitter Card</h2>
<p>Open Graph was originally developed by Facebook in 2010 and has since been adopted by virtually every platform. Twitter developed its own card format in parallel, with some different capabilities (particularly for app and video cards) and slightly different property names. Twitter currently falls back to Open Graph tags when Twitter Card tags are absent, so technically you only need Open Graph for Twitter support. However, twitter:card specifies the card type - summary or summary_large_image - which Open Graph does not have an equivalent for. For the large image preview format (preferred for most content pages), you need twitter:card set to summary_large_image explicitly. Best practice is to include both sets, which this generator does.</p>

<h2>Image requirements by platform</h2>
<p>Facebook requires og:image to be at least 200×200 pixels, recommends 1200×630 pixels for landscape previews, and has a minimum file size of 50KB for large preview rendering. Images must be accessible via HTTPS on a public URL - local or localhost images do not work for social preview. Twitter's summary_large_image card uses an aspect ratio of roughly 2:1 (optimal is 1200×600 or 800×400). LinkedIn uses a 1.91:1 aspect ratio (1200×627). The 1200×630 size at 1.905:1 ratio satisfies all three simultaneously, making it the safe universal choice.</p>

<h2>Preview caching</h2>
<p>Social platforms cache link previews for performance. Facebook's cache duration is typically 24 hours. Twitter's is roughly 7 days. LinkedIn's is also around 7 days. When you update your meta tags, the cached preview will not immediately update everywhere - you need to use the platform's debugging tools to manually invalidate the cache. Facebook's Sharing Debugger, Twitter's Card Validator, and LinkedIn's Post Inspector all provide a "refresh" or "re-fetch" function for this purpose. This is why you should add correct Open Graph tags before content goes live, not after - after-the-fact fixes require manual cache invalidation on every platform where the URL was shared.</p>

<h2>Article-specific Open Graph tags</h2>
<p>For blog posts, news articles, and editorial content, the og:type should be set to "article" rather than "website." The article type supports additional properties: article:published_time (ISO 8601 datetime), article:modified_time, article:author (URL of the author's profile), and article:section (category). These additional properties are used by some platforms for content discovery and by search engines for article rich results. This generator handles both the basic "website" type and the extended "article" type with all supporting properties.</p>
<h2>Automating OG tag generation</h2>
<p>For sites with many pages, generate OG tags programmatically from page metadata rather than hand-crafting them per page. In Astro, pass the canonical URL, title, and description to a shared head component that outputs the tags. For OG images, consider generating them automatically using Satori (a library that renders React components to SVG/PNG) or Cloudflare's OG Image generation Worker pattern - these produce consistent, branded OG images for every post without manual design work.</p>
`,
    },
    related: ['meta-tag-generator', 'schema-generator', 'robots-txt-generator', 'keyword-density-checker'],
  },

  {
    slug: 'robots-txt-generator',
    name: 'Robots.txt Generator',
    category: 'seo',
    kind: 'client-pure',
    icon: 'bot',
    description: 'Build a correct robots.txt file with user-agent rules and sitemap declaration.',
    component: 'RobotsTxtGenerator',
    seo: {
      title: 'Robots.txt Generator - Create robots.txt File Free Online',
      description: 'Build a correct robots.txt file with allow/disallow rules for specific crawlers. Block AI scrapers. Add sitemap URL. Free, instant, no upload.',
      keywords: ['robots.txt generator', 'create robots.txt', 'robots txt file generator', 'seo robots.txt', 'block crawlers robots.txt', 'ai crawler block robots.txt'],
      faq: [
        { q: 'What is a robots.txt file?', a: 'A robots.txt file is placed at the root of your website (yourdomain.com/robots.txt) and tells web crawlers which pages they are and are not allowed to crawl. It follows the Robots Exclusion Standard, a voluntary protocol that well-behaved crawlers respect. Malicious bots do not follow it.' },
        { q: 'Where exactly must I place the robots.txt file?', a: 'At the root of your domain, accessible at https://yourdomain.com/robots.txt. It must be at the root - not in a subdirectory. It must be served with Content-Type: text/plain. One robots.txt per domain; subdomains need their own.' },
        { q: 'Does robots.txt prevent indexing?', a: 'No. Disallow in robots.txt prevents crawling, but not necessarily indexing. Google can still index a disallowed URL if other pages link to it - it just cannot read the page content. To prevent indexing, use a noindex meta tag on the page itself.' },
        { q: 'How do I block AI training crawlers?', a: 'Add specific Disallow rules for AI training bots by their User-agent names: GPTBot (OpenAI), CCBot (Common Crawl), Google-Extended (Google AI training), ClaudeBot (Anthropic), Bytespider (TikTok). This generator includes presets for all common AI crawlers.' },
      ],
      content: `<p>The robots.txt file is a plain-text file placed at the root of your website that communicates crawling permissions to web robots - including search engine crawlers like Googlebot and Bingbot, AI training data collectors like GPTBot and CCBot, and link preview generators. It is the first file most crawlers request from your domain and acts as a crawl policy document that governs how automated traffic interacts with your site.</p>

<h2>robots.txt syntax</h2>
<p>A robots.txt file consists of one or more blocks, each starting with one or more User-agent lines followed by Disallow and Allow rules. The User-agent line specifies which crawler(s) the block applies to. An asterisk (*) matches all crawlers. Disallow lines list URL paths the specified crawler should not request. Allow lines create exceptions within a Disallow scope. A sitemap declaration at the end of the file (outside any User-agent block) tells all crawlers where to find your XML sitemap. Example structure: <code>User-agent: *</code> / <code>Disallow: /admin/</code> / <code>Allow: /admin/public/</code> / <code>Sitemap: https://example.com/sitemap.xml</code>.</p>

<h2>Common robots.txt patterns</h2>
<p>Allowing all crawlers to index all pages requires only the sitemap declaration with no Disallow rules - do not add <code>Disallow:</code> with an empty value, which some parsers interpret differently. Blocking a specific path from all crawlers: <code>User-agent: *</code> / <code>Disallow: /private/</code>. Blocking a specific crawler entirely: <code>User-agent: BadBot</code> / <code>Disallow: /</code>. Allowing only Googlebot and Bingbot and blocking everything else: a block for Googlebot and Bingbot with no Disallow rules, followed by <code>User-agent: *</code> / <code>Disallow: /</code>. The order of rules matters - the most specific matching rule wins.</p>

<h2>Blocking AI training crawlers</h2>
<p>Since 2022, several major AI companies have deployed crawlers that collect web content for training large language models. Unlike search crawlers, these do not drive organic traffic to your site in return - they harvest content for commercial AI products. The major AI training crawlers and their User-agent identifiers are: GPTBot (OpenAI, used for training GPT models), CCBot (Common Crawl, a dataset used by many AI companies), Google-Extended (Google's AI training crawler, separate from Googlebot), ClaudeBot (Anthropic), Bytespider (ByteDance/TikTok), and Applebot-Extended (Apple's AI training crawler). Adding Disallow: / for each of these blocks AI training data collection while keeping your site fully crawlable by search engines.</p>

<h2>robots.txt versus noindex</h2>
<p>Disallow in robots.txt and noindex in meta tags serve related but different purposes. Disallow prevents a crawler from visiting a page - but the page can still appear in search results if other sites link to it, because Google can index a URL without visiting it (inferring its existence from links). Noindex tells a crawler that has visited the page not to include it in search results. For confidential pages that must not appear in search, use both: robots.txt Disallow prevents crawling of the content, and noindex (which requires the crawler to have visited the page to read the tag - a catch-22 addressed by Google treating Disallow + meta noindex as a strong exclusion signal).</p>

<h2>Testing your robots.txt</h2>
<p>Google Search Console provides a robots.txt Tester under Settings → robots.txt. It shows how Googlebot interprets your current robots.txt and lets you test specific URLs against the rules. This is essential for verifying that important pages are not accidentally blocked. A common mistake is Disallow: / in an all-agents block that was meant only for a specific path - blocking all crawlers from the entire site. The tester catches this immediately.</p>
<h2>Robots.txt for JavaScript-heavy sites</h2>
<p>Single-page applications and sites with heavy client-side rendering face a specific crawling challenge: Googlebot renders JavaScript, but many other crawlers do not. Content loaded asynchronously after the initial HTML response may never be seen by crawlers that do not execute JavaScript. If you have content that matters for SEO, ensure it is present in the server-rendered HTML (initial response), not loaded exclusively via JavaScript after the page loads. This is independent of robots.txt - it affects what crawlers can actually index from pages they are permitted to crawl.</p>
`,
    },
    related: ['sitemap-generator', 'meta-tag-generator', 'schema-generator', 'keyword-density-checker'],
  },

  {
    slug: 'sitemap-generator',
    name: 'XML Sitemap Generator',
    category: 'seo',
    kind: 'client-pure',
    icon: 'map',
    description: 'Generate a valid XML sitemap from a list of URLs with priority and change frequency.',
    component: 'SitemapGenerator',
    seo: {
      title: 'XML Sitemap Generator - Create Sitemap.xml Free Online',
      description: 'Generate a valid XML sitemap from a list of URLs. Set priority, change frequency, and last modified date per URL. Download instantly.',
      keywords: ['xml sitemap generator', 'sitemap generator free', 'create sitemap.xml', 'sitemap creator online', 'google sitemap generator', 'website sitemap builder'],
      faq: [
        { q: 'What is an XML sitemap?', a: 'An XML sitemap is a structured file that lists the URLs of a website with optional metadata (last modified date, change frequency, priority) to help search engines discover and crawl your content more efficiently. It does not guarantee indexing but helps crawlers find pages that might otherwise be missed.' },
        { q: 'How often should I submit my sitemap?', a: 'Submit once to Google Search Console and Bing Webmaster Tools. After that, keep the sitemap URL stable and up-to-date. Search engines automatically re-fetch sitemaps periodically. For frequently updated sites, using a dynamic sitemap generated by your CMS is better than a static one.' },
        { q: 'What does the priority field mean?', a: 'Priority (0.0–1.0) is a hint to crawlers about the relative importance of pages within your site. It does not affect absolute ranking in search results - only relative crawl priority within your own domain. Homepage is typically 1.0, main section pages 0.8, individual posts/pages 0.5–0.6.' },
        { q: 'What is the maximum sitemap size?', a: 'Each sitemap file can contain up to 50,000 URLs and must be under 50MB uncompressed. For larger sites, split into multiple sitemap files and reference them from a sitemap index file (a sitemap of sitemaps).' },
      ],
      content: `<p>An XML sitemap is a structured document that tells search engines about the pages on your website - their URLs, when they were last updated, how often they change, and their relative importance. While search engines can discover pages through crawling links, a sitemap ensures that even pages with few inbound links are found and considered for indexing. This generator creates a standards-compliant XML sitemap from a list of URLs with full support for all sitemaps protocol attributes.</p>

<h2>The sitemaps protocol</h2>
<p>The sitemaps protocol (sitemaps.org) defines the XML schema for sitemap files. Every sitemap file begins with the XML declaration and a <code>&lt;urlset&gt;</code> root element with the sitemaps namespace. Each URL is enclosed in a <code>&lt;url&gt;</code> element containing four possible child elements: <code>&lt;loc&gt;</code> (the URL, required), <code>&lt;lastmod&gt;</code> (last modified date in ISO 8601 format, recommended), <code>&lt;changefreq&gt;</code> (a hint about how often the content changes: always, hourly, daily, weekly, monthly, yearly, or never), and <code>&lt;priority&gt;</code> (relative importance from 0.0 to 1.0, default 0.5). Google treats changefreq and priority as hints rather than directives - they influence crawl scheduling but do not guarantee any specific crawl frequency.</p>

<h2>What pages to include</h2>
<p>Include only canonical, publicly accessible pages with unique, valuable content. Do not include: pages blocked by robots.txt (crawlers should not request them), pages with a noindex meta tag (indexing them is contradicted by the tag), redirect URLs (include the destination instead), 404 pages, login-required pages, and duplicate content pages (include only the canonical version). For e-commerce sites, include all product pages, category pages, and the homepage but exclude checkout, cart, and account pages. For blogs, include all published posts, category archives, and the homepage.</p>

<h2>Sitemap index files</h2>
<p>When your site has more than 50,000 URLs or your sitemap file would exceed 50MB, split the content across multiple sitemap files and reference them from a sitemap index file. The index file follows the same XML structure but uses <code>&lt;sitemapindex&gt;</code> as the root element, with each child sitemap in a <code>&lt;sitemap&gt;</code> element containing a <code>&lt;loc&gt;</code> pointing to the sitemap file's URL. Submit only the index file URL to search engines - they will follow the references to each sub-sitemap automatically. Common splitting strategies are by content type (pages-sitemap.xml, posts-sitemap.xml, products-sitemap.xml) or alphabetically/chronologically for very large sites.</p>

<h2>Dynamic versus static sitemaps</h2>
<p>A static sitemap (like the one this generator creates) is a file you create and upload. It must be manually updated when pages are added, removed, or modified. A dynamic sitemap is generated by your web application or CMS on demand - WordPress plugins like Yoast and Rank Math generate dynamic sitemaps automatically. For static sites or simple web projects, a static sitemap is perfectly adequate as long as it is kept current. For frequently updated sites with hundreds or thousands of pages that change regularly, a dynamic sitemap is much easier to maintain.</p>

<h2>Submitting to search engines</h2>
<p>After uploading your sitemap to your server's root directory as sitemap.xml, submit it via two channels. First, declare it in robots.txt with a Sitemap: line at the bottom: <code>Sitemap: https://yourdomain.com/sitemap.xml</code>. This ensures any crawler that reads robots.txt will find the sitemap automatically. Second, submit the URL directly to Google Search Console (Sitemaps section) and Bing Webmaster Tools. Google Search Console's sitemap report shows how many submitted URLs Google has indexed versus discovered, which helps identify indexing issues. Monitor this report weekly during the initial indexing phase after launching a new site or major content addition.</p>
<h2>Image and video sitemaps</h2>
<p>Standard XML sitemaps list page URLs. For sites with significant image or video content, Google supports extended sitemap formats that provide richer metadata: image sitemaps include <code>&lt;image:loc&gt;</code>, <code>&lt;image:title&gt;</code>, and <code>&lt;image:caption&gt;</code> elements within each <code>&lt;url&gt;</code> block. Video sitemaps include duration, thumbnail URL, description, and publication date for each video. These extended formats are particularly valuable for e-commerce sites (product image indexing), recipe sites (video indexing), and news sites (article image indexing in Google News).</p>
`,
    },
    related: ['robots-txt-generator', 'meta-tag-generator', 'schema-generator', 'og-tag-generator'],
  },

  {
    slug: 'schema-generator',
    name: 'Schema / JSON-LD Generator',
    category: 'seo',
    kind: 'client-pure',
    icon: 'braces',
    description: 'Generate Schema.org JSON-LD markup for rich results in Google Search.',
    component: 'SchemaGenerator',
    seo: {
      title: 'Schema Generator - JSON-LD Structured Data Generator Free',
      description: 'Generate Schema.org JSON-LD structured data for articles, products, FAQs, breadcrumbs, and more. Copy-paste ready for Google rich results.',
      keywords: ['schema generator', 'json-ld generator', 'structured data generator', 'schema.org markup', 'rich results schema', 'faq schema generator', 'product schema generator'],
      faq: [
        { q: 'What is JSON-LD structured data?', a: 'JSON-LD (JavaScript Object Notation for Linked Data) is a method of encoding Schema.org structured data in a script tag in your HTML. Search engines read this data to understand your content\'s meaning and may use it to display enhanced search results (rich results) like star ratings, FAQs, breadcrumbs, and event dates.' },
        { q: 'Which Schema types produce rich results in Google?', a: 'Google supports rich results for: Article, BreadcrumbList, Event, FAQPage, HowTo, JobPosting, LocalBusiness, Movie, Product, Recipe, and SoftwareApplication. Other Schema types are recognized for understanding but do not typically produce visual enhancements in search results.' },
        { q: 'Is JSON-LD or Microdata better for Schema markup?', a: 'JSON-LD is strongly recommended by Google and is easier to implement because it is contained in a script tag and does not require modifying the visible HTML of the page. Microdata and RDFa inline markup in the page HTML are valid alternatives but harder to maintain.' },
        { q: 'How do I test if my Schema is valid?', a: 'Use Google\'s Rich Results Test (search.google.com/test/rich-results) to validate structured data and preview how rich results may appear. Schema.org\'s own validator (validator.schema.org) checks conformance with Schema.org specifications more comprehensively.' },
      ],
      content: `<p>Schema.org structured data is a vocabulary for marking up web content so that search engines understand not just the words on the page but their meaning and relationships. When a page sells a product, structured data tells Google it is a product - with a specific name, price, availability, and star rating - rather than just a page that mentions these things. Search engines use this understanding to display enhanced search results, called rich results, that stand out visually and provide more information directly in the search listing.</p>

<h2>JSON-LD: the recommended format</h2>
<p>Schema.org markup can be encoded in three formats: Microdata (HTML attributes embedded in the visible page markup), RDFa (similar to Microdata but using RDF vocabulary), and JSON-LD (a JavaScript Object Notation script in the page head or body). Google explicitly recommends JSON-LD wherever possible because it is cleanly separated from the visible HTML, making it easy to add, modify, and maintain without touching the page's presentation layer. JSON-LD is embedded in a <code>&lt;script type="application/ld+json"&gt;</code> tag and follows standard JSON syntax with Schema.org vocabulary.</p>

<h2>Schema types and their rich result potential</h2>
<p>Not all Schema types produce visible enhancements in search results. Google documents the specific types it uses for rich results. FAQPage markup can produce an accordion of questions and answers directly in the search result, significantly increasing click-through rates for informational content. Product markup enables star ratings, price, and availability information in product search results. Recipe markup displays cooking time, calories, and ratings. Article and NewsArticle markup can enable top stories carousels and article rich results. BreadcrumbList markup replaces the URL path with a human-readable breadcrumb trail in the search result. Event markup enables event-specific features including date, time, and location. LocalBusiness markup powers Google My Business-style information panels.</p>

<h2>Nesting and combining schema types</h2>
<p>Schema types can be nested. A Product can have an embedded Review (or AggregateRating, which summarizes multiple reviews), which provides the star rating display. A FAQPage contains multiple Question objects, each containing an Answer. A Recipe contains NutritionInformation, HowToStep objects, and references to ImageObject for step illustrations. An Article may reference an Organization (the publisher) and a Person (the author). This nesting allows a single JSON-LD block to communicate a rich, interconnected set of facts about the page's content.</p>

<h2>Common implementation mistakes</h2>
<p>Several common mistakes prevent structured data from working correctly. Marking up content that is not visible to users (hiding content with CSS display:none) violates Google's guidelines and can result in manual actions against the site. Using the wrong type for content - marking a press release as a Product, for instance - is recognized as manipulation. Missing required properties: each Schema type has required and recommended properties; omitting required ones renders the markup incomplete and may prevent rich results. Invalid JSON syntax invalidates the entire script block - use Google's Rich Results Test to catch syntax errors before deploying.</p>

<h2>Validating and monitoring structured data</h2>
<p>After implementing structured data, validate it with Google's Rich Results Test and monitor it in Google Search Console's Enhancements section. Search Console reports which pages have valid structured data, which have warnings, and which have errors. It also shows how many rich result impressions and clicks the enhanced listings receive, providing direct measurement of the SEO value of your structured data implementation. Errors should be fixed promptly - Google may suppress rich results from domains with persistent structured data errors.</p>
<h2>Monitoring with Google Search Console</h2>
<p>After implementing structured data, monitor it in Google Search Console's Enhancements section. The Enhancements reports show which pages have valid structured data, which have warnings, and which have errors - with specific details about which properties are missing or malformed. The reports also show impressions and clicks from rich results, letting you measure whether the structured data is actually driving additional traffic. Set up weekly checks for new errors, as changes to page templates can inadvertently break structured data across many pages simultaneously.</p>
`,
    },
    related: ['meta-tag-generator', 'og-tag-generator', 'robots-txt-generator', 'sitemap-generator'],
  },

  {
    slug: 'keyword-density-checker',
    name: 'Keyword Density Checker',
    category: 'seo',
    kind: 'client-pure',
    icon: 'search',
    description: 'Analyze keyword frequency and density in any text for on-page SEO optimization.',
    component: 'KeywordDensityChecker',
    seo: {
      title: 'Keyword Density Checker - Analyze Keyword Frequency Free',
      description: 'Check keyword density and frequency in your content. See top single and two-word phrases. Helps optimize on-page SEO without keyword stuffing.',
      keywords: ['keyword density checker', 'keyword frequency analyzer', 'keyword density tool free', 'on-page seo analyzer', 'check keyword density online', 'keyword counter'],
      faq: [
        { q: 'What is a good keyword density?', a: 'There is no universally agreed "optimal" density. A common guideline is 1–2% for the primary keyword (once every 50–100 words), but modern SEO focuses far more on topical relevance and natural language than exact density percentages. Forced density above 3–4% often reads unnaturally and may trigger spam signals.' },
        { q: 'Does keyword density directly affect Google rankings?', a: 'Not directly, in the way it did in early SEO. Google\'s algorithms focus on semantic relevance, natural language, and topical authority rather than keyword frequency. However, having your primary keyword appear naturally in important positions (title, early in the content, subheadings) is still correlated with ranking performance.' },
        { q: 'What are stop words and should I exclude them?', a: 'Stop words are common words with little semantic value: "the", "a", "is", "and", "in", etc. Keyword density analysis typically excludes them to show the density of meaningful terms. Toggle the stop word filter to see analysis with or without them.' },
        { q: 'What is TF-IDF and how is it different from density?', a: 'TF-IDF (Term Frequency-Inverse Document Frequency) measures how important a word is in a document relative to a corpus of documents. High frequency in this document but low frequency across the web means the term is distinctive and relevant. Keyword density is a simpler calculation - just frequency within the document - that ignores this comparative dimension.' },
      ],
      content: `<p>Keyword density analysis counts how frequently a keyword or phrase appears in a text relative to the total word count, expressed as a percentage. While "keyword density" as a ranking factor is far less significant than it was in early-2000s SEO, understanding how often key terms appear in your content remains useful for identifying under-coverage or over-stuffing, ensuring natural language variation, and confirming that the most important concepts are present in the text with appropriate frequency.</p>

<h2>How density is calculated</h2>
<p>Keyword density = (number of times the keyword appears ÷ total word count) × 100. For a 500-word article where the primary keyword appears 8 times, density = (8 ÷ 500) × 100 = 1.6%. This tool calculates density for every word and two-word phrase in the text (excluding common stop words), ranks them by frequency, and shows the percentage density for each. This gives a complete picture of which terms dominate the content, not just a check on a single keyword you specify in advance.</p>

<h2>Single keywords versus phrases</h2>
<p>The tool analyzes both single keywords (unigrams) and two-word phrases (bigrams). Single keyword analysis shows which individual words dominate the text. Bigram analysis is more semantically meaningful - the phrase "search engine" is more meaningful than "search" or "engine" individually. For SEO purposes, monitoring the density of your target keyword phrase (two or three words, as most valuable keywords are) is more actionable than single word density. The tool shows the top 20 unigrams and top 20 bigrams by frequency so you can see both dimensions.</p>

<h2>Stop word filtering</h2>
<p>Stop words are common function words - the, a, an, is, are, in, on, at, to, of, and so on - that carry little semantic meaning on their own. Most keyword density analysis excludes stop words to surface meaningful terms. This tool applies a stop word filter by default but lets you toggle it off to see the complete frequency distribution including all words. The stop word list includes approximately 200 common English stop words; for multilingual content, the analysis will correctly count word frequencies but the stop word filter is optimized for English.</p>

<h2>The evolution of keyword optimization</h2>
<p>In early search engine history (1990s–early 2000s), keyword density was directly engineered - pages were ranked partly based on how frequently they contained the target keyword, which led to obvious keyword stuffing. Google's Panda algorithm (2011) began penalizing thin, keyword-stuffed content. Google's Hummingbird update (2013) introduced semantic understanding, allowing Google to infer meaning from context rather than relying on exact keyword matches. RankBrain (2015) added machine learning to understand query intent. Today, Google's algorithms use BERT (2019) and other language models that understand the meaning of text at a paragraph and document level. This means natural, human-readable content that thoroughly covers a topic performs better than content that mechanically hits a density target.</p>

<h2>Practical use of density analysis</h2>
<p>Keyword density is most useful as a diagnostic tool, not a prescriptive target. If your analysis shows the primary topic keyword appearing only once in a 1,000-word article, the content may not clearly signal its topic to search engines - adding natural mentions in the introduction, a subheading, and the conclusion would be appropriate. If the keyword appears in every other sentence (10%+ density), the content likely reads unnaturally and risks spam signals. Between these extremes, focus on writing naturally about your topic rather than engineering a specific percentage. The density tool confirms you are roughly in range - the content quality and depth matter far more.</p>
<h2>Entity-based SEO beyond keyword density</h2>
<p>Google's understanding of content has evolved from keyword matching to entity recognition. An entity is a real-world concept - a person, place, organization, product, or concept - that Google can identify and connect to its Knowledge Graph. Mentioning entities relevant to your topic (specific tools, named techniques, recognized organizations) helps Google understand your content's context more precisely than keyword frequency alone. This is why a page about PDF compression that mentions "Ghostscript," "Adobe Acrobat," and "DEFLATE compression" signals topical expertise more clearly than one that just repeats "compress PDF" twelve times.</p>
`,
    },
    related: ['meta-tag-generator', 'og-tag-generator', 'schema-generator', 'word-counter'],
  },
];
