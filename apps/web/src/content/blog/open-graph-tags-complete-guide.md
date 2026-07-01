---
title: "Open Graph Tags: The Complete Guide for 2026"
description: "Everything you need to know about og:title, og:image, og:description, and Twitter Card tags. Includes the right image sizes for every major platform."
publishDate: "2026-06-15"
author: "Tanvirul Gani Oyon"
category: "seo"
tags: ["open-graph", "seo", "social-media", "meta-tags"]
featured: true
---

When someone shares your URL on social media, the platform fetches that URL and reads specific meta tags to build the link preview card. Get these tags right and your share looks professional with a compelling image and description. Get them wrong (or miss them entirely) and the platform guesses - usually badly.

This guide covers every Open Graph and Twitter Card tag you actually need, the correct image dimensions for each platform, and how to test your implementation.

## The four tags that matter for every page

These four Open Graph properties produce a functional link preview on Facebook, LinkedIn, WhatsApp, Discord, and Slack:

```html
<meta property="og:title" content="Your Page Title">
<meta property="og:description" content="A compelling description of this page.">
<meta property="og:image" content="https://example.com/og-image.jpg">
<meta property="og:url" content="https://example.com/this-page">
```

And these two Twitter Card tags ensure correct rendering on Twitter/X:

```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="https://example.com/og-image.jpg">
```

If you have those six tags, your link will preview correctly on every major platform. Everything else is refinement.

## Image dimensions by platform

**Universal recommendation: 1200×630 pixels** (1.905:1 aspect ratio). This renders correctly as a large preview image on:

- Facebook (minimum: 600×315, optimal: 1200×630)
- LinkedIn (optimal: 1200×627, close enough to 1200×630)
- Twitter/X summary_large_image (2:1 ratio, 1200×600 ideal - 1200×630 is close enough)
- WhatsApp (1200×630 works correctly)
- Discord (renders the image at a max width of 400px, any aspect ratio)
- Slack (shows images up to 360×270px in previews)

For Twitter summary (small card): 800×800 or any 1:1 square image.

**Image format:** JPEG or PNG. Avoid WebP - LinkedIn and some older WhatsApp versions do not support it for OG images. Avoid GIF - most platforms render only the first frame.

**File size:** Keep OG images under 1MB. The platform's scraper fetches your OG image directly, and slow-loading images can cause the preview to fall back to a placeholder.

## The og:type property

```html
<meta property="og:type" content="website">
```

Use `website` for your homepage and most pages. Use `article` for blog posts and news content - the article type unlocks additional properties:

```html
<meta property="og:type" content="article">
<meta property="article:published_time" content="2026-06-15T00:00:00Z">
<meta property="article:author" content="https://example.com/about">
<meta property="article:section" content="Guides">
```

Facebook and some platforms use these to display publication dates and author bylines in preview cards.

## Twitter Card types

The `twitter:card` value controls how the preview looks:

- `summary` - small 1:1 image (avatar-sized) on the left with title and description
- `summary_large_image` - full-width image above title and description (recommended for most pages)
- `app` - for mobile app download links
- `player` - for embedded video or audio

For content pages, always use `summary_large_image`. The small `summary` card is less engaging and has lower click-through rates.

## Common mistakes and how to fix them

**No OG image at all.** The platform shows a plain link with your title and a small favicon. Add an OG image - even a simple branded background with your logo is dramatically better.

**Image not accessible from the scraper's IP.** If your OG image is behind authentication, on localhost, or blocked by a WAF rule that denies user-agent strings from scrapers, the preview will fail. Test by fetching the image URL in a private window or with `curl`.

**Mismatch between og:url and the actual page URL.** Some implementations set og:url to the homepage instead of the current page URL. This causes social platforms to attribute all shares from any page to the homepage, losing the page-specific analytics.

**Stale cached previews.** Social platforms aggressively cache link previews (Facebook: ~24 hours, LinkedIn: ~7 days, Twitter: ~7 days). After updating your OG tags, the old preview will continue showing until the cache expires. Use each platform's debugging tool to force a cache refresh:

- Facebook: [Sharing Debugger](https://developers.facebook.com/tools/debug)
- LinkedIn: [Post Inspector](https://www.linkedin.com/post-inspector)
- Twitter/X: [Card Validator](https://cards-dev.twitter.com/validator)

## Generate your OG tags

ToolOrbit's [Open Graph Tag Generator](/tools/og-tag-generator) produces the complete set of meta tags for any page in under a minute - fill in your URL, title, description, and image URL, and copy-paste the output into your HTML head section.

## Putting it all together

A complete, correct meta section for a blog post:

```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Open Graph Tags: The Complete Guide for 2026</title>
<meta name="description" content="Everything you need to know about og:title, og:image, og:description, and Twitter Card tags. Includes the right image sizes for every major platform.">
<link rel="canonical" href="https://example.com/blog/open-graph-guide">

<!-- Open Graph -->
<meta property="og:type" content="article">
<meta property="og:url" content="https://example.com/blog/open-graph-guide">
<meta property="og:title" content="Open Graph Tags: The Complete Guide for 2026">
<meta property="og:description" content="Everything you need to know about og:title, og:image, og:description, and Twitter Card tags.">
<meta property="og:image" content="https://example.com/images/og-open-graph-guide.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:site_name" content="Your Site Name">
<meta property="article:published_time" content="2026-06-15T00:00:00Z">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Open Graph Tags: The Complete Guide for 2026">
<meta name="twitter:description" content="Everything you need to know about og:title, og:image, og:description, and Twitter Card tags.">
<meta name="twitter:image" content="https://example.com/images/og-open-graph-guide.jpg">
```

Once you have this pattern for one page, templating it across your entire site is straightforward.
