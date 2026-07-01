import type { ToolDefinition } from '@toolorbit/tool-types';

export const devTools: ToolDefinition[] = [
  {
    slug: 'json-formatter',
    name: 'JSON Formatter & Validator',
    category: 'developer',
    kind: 'client-pure',
    icon: 'braces',
    description: 'Instantly format, validate, and beautify JSON data in your browser.',
    component: 'JsonFormatter',
    seo: {
      title: 'JSON Formatter & Validator - Free, Instant, No Upload',
      description: 'Format, validate, and beautify JSON instantly in your browser. Highlights syntax errors with line numbers. Your data never leaves your device.',
      keywords: ['json formatter', 'json validator', 'json beautifier', 'json pretty print', 'format json online', 'json lint'],
      faq: [
        { q: 'Does my JSON data leave my browser?', a: 'No. All formatting and validation runs entirely in your browser using JavaScript. Nothing is sent to a server.' },
        { q: 'What counts as invalid JSON?', a: 'Common mistakes include trailing commas after the last item in an array or object, single-quoted strings instead of double-quoted, missing quotes around object keys, and unescaped special characters. The validator highlights the exact line and position of each error.' },
        { q: 'Is there a size limit?', a: 'There is no server-side size limit. For very large files (over 50MB), performance depends on your device - the browser allocates memory for the parsed object, which can be 3–5× the raw text size.' },
        { q: 'Can I minify JSON here too?', a: 'Yes - use the companion JSON Minifier tool to strip all whitespace and produce the most compact valid JSON.' },
      ],
      content: `<p>JSON (JavaScript Object Notation) is the universal language of data exchange on the web. Whether you are inspecting an API response, debugging a configuration file, or building a data pipeline, having a reliable formatter at hand saves time every single day. This tool formats and validates JSON instantly - no server round-trip, no file upload, no rate limit.</p>

<p>When you paste raw JSON into the formatter, the tool parses it using the browser's native <code>JSON.parse()</code> engine - the same parser your Node.js or browser application uses - then re-serializes it with two-space indentation using <code>JSON.stringify()</code>. The result is deterministic, standards-compliant, and perfectly indented every time.</p>

<h2>Why validate, not just format?</h2>
<p>Formatting and validation are separate operations. Formatting assumes the input is valid and makes it readable. Validation checks whether the input is well-formed JSON and tells you exactly where it breaks. This tool does both: if your input is valid, it formats it; if it is not, it reports the exact position of the first syntax error so you can fix it without guessing.</p>

<p>The most frequent JSON mistakes are easy to make and hard to spot in a wall of text: a trailing comma after the last item in an array or object (valid in JavaScript, invalid in JSON), single-quoted strings instead of double-quoted strings, numeric keys without quotes, and control characters like tabs or newlines embedded inside string values without escaping. The formatter surfaces all of these immediately.</p>

<h2>Common use cases</h2>
<p>Developers reach for a JSON formatter in dozens of situations: copying a minified API response from a network tab and trying to understand its structure, writing a <code>package.json</code> or <code>tsconfig.json</code> by hand, comparing two configuration files, cleaning up a data dump from a database tool, and preparing JSON examples for documentation or a blog post. Each of these benefits from properly indented, readable output rather than a single line of compressed text.</p>

<h2>Privacy matters</h2>
<p>API responses often contain tokens, user data, or business-sensitive information. Pasting that data into an online tool that processes it server-side means it travels over the network to someone else's computer. This formatter runs entirely in your browser: the text you paste never leaves your device, cannot be logged or stored by a server, and disappears the moment you close the tab.</p>

<h2>How it compares to your editor</h2>
<p>Most code editors can format JSON too, but reaching for a dedicated web tool is faster in several situations: you are in a browser tab reading documentation and want to format an inline example, your editor's JSON formatter requires a plugin that is not installed, or you are working on a machine where your usual editor is not available. This tool requires nothing beyond a browser tab.</p>

<h2>Tips for working with JSON</h2>
<p>If you are building an API or a configuration system, prefer JSON over YAML or TOML for data that will be machine-generated or consumed by multiple languages. JSON has unambiguous semantics - no tab-versus-space ambiguity, no implicit type coercion - and every major language has a native JSON parser. When writing JSON by hand, use a formatter to catch mistakes before they become runtime errors in your application.</p>
<h2>Tips for power users</h2>
<p>In VS Code, format JSON with <kbd>Shift+Alt+F</kbd> on Windows/Linux or <kbd>Shift+Option+F</kbd> on macOS - no extension needed. For quick ad-hoc formatting when you are already in a browser (reading API documentation, inspecting a network response, or working in a cloud dashboard), a browser-based formatter is faster because you never switch context. The browser formatter also accepts text that is not strictly JSON - JavaScript object literals with unquoted keys or trailing commas - and can be used as a quick validator to identify exactly which deviation from the standard is present before fixing it upstream.</p>
`,
    },
    related: ['json-minifier', 'base64-codec', 'jwt-decoder', 'url-codec'],
  },

  {
    slug: 'json-minifier',
    name: 'JSON Minifier',
    category: 'developer',
    kind: 'client-pure',
    icon: 'minimize-2',
    description: 'Strip all whitespace from JSON to produce the most compact valid output.',
    component: 'JsonMinifier',
    seo: {
      title: 'JSON Minifier - Compress JSON Online, Free & Instant',
      description: 'Remove all whitespace from JSON to reduce file size for production use. Runs entirely in your browser - nothing is uploaded.',
      keywords: ['json minifier', 'compress json', 'minify json online', 'json compressor', 'remove json whitespace', 'json uglify'],
      faq: [
        { q: 'Does minifying JSON change the data?', a: 'No. Whitespace (spaces, tabs, newlines) has no semantic meaning in JSON. The minified output is byte-for-byte equivalent to the formatted input when parsed.' },
        { q: 'How much smaller will my JSON get?', a: 'A formatted JSON file with two-space indentation is typically 20–40% larger than the minified equivalent. Files with deep nesting and long key names compress more.' },
        { q: 'Should I minify JSON before sending it in an API response?', a: 'In most cases, yes - combined with HTTP gzip or Brotli compression, smaller JSON reduces parse time and payload size. Many web frameworks do this automatically when you set the Content-Type header to application/json.' },
        { q: 'What is the difference between minifying and compressing JSON?', a: 'Minification removes human-readable whitespace. Compression (gzip/Brotli) applies a lossless algorithm to further reduce size. Both are typically applied together in production.' },
      ],
      content: `<p>Minifying JSON removes every character that is not required by the JSON specification - spaces, tabs, newlines, and carriage returns - while leaving the data completely intact. The result is a single-line string that is semantically identical to the formatted input and typically 20–40% smaller by byte count before compression.</p>

<p>This tool uses <code>JSON.stringify(inputObject)</code> without a space argument, which is the standard browser method for producing compact JSON. The input is first parsed with <code>JSON.parse()</code>, which validates it and catches any syntax errors before minification proceeds. Invalid JSON is reported before any output is produced.</p>

<h2>When does JSON minification matter?</h2>
<p>In production web applications, minified JSON is the standard format for API responses, configuration files served over HTTP, and data files embedded in JavaScript bundles. The benefits are most noticeable in two scenarios: high-traffic APIs where payload size multiplies across millions of requests per day, and mobile or low-bandwidth environments where every kilobyte of data transfer affects user experience.</p>

<p>For a typical REST API response, switching from formatted to minified JSON reduces payload size by around 30%, which directly improves API latency, reduces data transfer costs on cloud platforms that charge per GB, and decreases client-side parse time for very large responses.</p>

<h2>Minification versus HTTP compression</h2>
<p>Gzip and Brotli HTTP compression are highly effective on JSON because JSON text is repetitive - key names repeat across every object in an array, and common values appear many times. This repetition is exactly what compression algorithms exploit. A well-tuned HTTP server will compress JSON further regardless of whether it was minified, which means the practical difference between formatted and minified JSON over a compressed HTTP connection is smaller than the raw file size difference suggests.</p>

<p>That said, minification still reduces the uncompressed size, which matters for: JavaScript bundles where JSON is inlined as a string literal, local storage or cookie values, QR code payloads, and any environment where HTTP compression is not applied.</p>

<h2>JSON in build pipelines</h2>
<p>If you maintain a project with JSON configuration files that are bundled or served as assets, consider adding an automatic JSON minification step to your build pipeline. Tools like Rollup, Webpack, and esbuild all support JSON minification as a native feature or via a small plugin. This tool is useful for one-off minification or when you need to quickly inspect the compact form of a piece of data.</p>

<h2>Key names in minified JSON</h2>
<p>Unlike JavaScript object minifiers, JSON minifiers cannot shorten key names because JSON keys are part of the data contract between producer and consumer. If you control both sides of an API and need dramatically smaller payloads, consider a binary serialization format like MessagePack or Protocol Buffers, which achieve much higher compression ratios by encoding key names as integers.</p>
<h2>Build pipeline integration</h2>
<p>For automated pipelines, minify JSON at build time rather than manually. In Node.js: <code>JSON.stringify(JSON.parse(input))</code> with no third argument. Webpack and esbuild both minify JSON imports automatically when you enable their minification flag. For shell pipelines, <code>jq -c '.' input.json</code> produces compact output. The browser-based tool is best for one-off tasks - for anything you need to repeat more than a few times, script it.</p>
<h2>When JSON size actually matters</h2>
<p>Minification of JSON produces its most meaningful results in specific contexts. Inline JSON embedded as JavaScript variables inside an HTML page cannot be gzip-compressed independently - only the whole page can. Minifying the JSON before embedding reduces the uncompressed payload directly. JSON stored in Redis, Memcached, or other in-memory caches is stored uncompressed by default; minification directly reduces memory usage per cached entry. Cookie values that include JSON serialized state are constrained to 4KB total - minification can be the difference between a working cookie-based session and a cookie overflow error. localStorage and sessionStorage have a 5MB limit per origin; applications that cache large JSON datasets in browser storage benefit meaningfully from minification.</p>
<h2>Building a JSON minification step into CI/CD</h2>
<p>For configuration-heavy projects that ship large JSON files as static assets, add a minification step to your build pipeline rather than minifying manually before each release. In a Node.js build script: <code>const minified = JSON.stringify(JSON.parse(fs.readFileSync('config.json', 'utf8')))</code>. For multiple files: iterate with <code>glob</code> and write minified versions to a <code>dist/</code> directory. This ensures the production build always ships minified JSON regardless of how the source files were edited.</p>
`,
    },
    related: ['json-formatter', 'url-codec', 'base64-codec', 'hash-generator'],
  },

  {
    slug: 'base64-codec',
    name: 'Base64 Encoder & Decoder',
    category: 'developer',
    kind: 'client-pure',
    icon: 'code-2',
    description: 'Encode text or binary data to Base64, or decode Base64 back to plain text.',
    component: 'Base64Codec',
    seo: {
      title: 'Base64 Encoder & Decoder - Free Online Tool, No Upload',
      description: 'Encode any text to Base64 or decode Base64 strings back to plain text instantly in your browser. No server, no upload, completely private.',
      keywords: ['base64 encoder', 'base64 decoder', 'encode base64 online', 'decode base64', 'base64 converter', 'base64 encode text'],
      faq: [
        { q: 'What is Base64 used for?', a: 'Base64 encodes binary data as ASCII text so it can be safely embedded in contexts that only support text: HTML data URIs, JSON payloads, HTTP Basic Auth headers, email attachments (MIME), and JWT tokens all use Base64 encoding.' },
        { q: 'Does Base64 encrypt my data?', a: 'No. Base64 is an encoding scheme, not encryption. Anyone who has a Base64 string can trivially decode it. Do not use Base64 as a security measure.' },
        { q: 'Why does Base64 output end in = or ==?', a: 'Base64 encodes 3 bytes at a time into 4 characters. When the input length is not a multiple of 3, the output is padded with = characters to make the output length a multiple of 4.' },
        { q: 'What is URL-safe Base64?', a: 'Standard Base64 uses + and / characters which have special meaning in URLs. URL-safe Base64 replaces + with - and / with _, making the output safe for use in URLs without percent-encoding.' },
      ],
      content: `<p>Base64 is a binary-to-text encoding scheme that represents binary data using 64 printable ASCII characters (A–Z, a–z, 0–9, plus <code>+</code> and <code>/</code>). The name comes from the fact that each Base64 character represents exactly 6 bits, so 3 bytes of binary data (24 bits) become exactly 4 Base64 characters (24 bits ÷ 6 = 4).</p>

<p>This tool encodes UTF-8 text to Base64 and decodes Base64 strings back to text using the browser's native <code>btoa()</code> and <code>atob()</code> functions combined with the <code>TextEncoder</code> API for correct multi-byte character handling. The operations run entirely client-side - nothing is sent to a server.</p>

<h2>How Base64 works</h2>
<p>The encoding process takes every 3 bytes of input, treats them as a 24-bit number, and splits that number into four 6-bit groups. Each 6-bit group maps to one of 64 printable characters via a fixed lookup table. The result is always four characters for every three input bytes - a 33% size increase. When the input is not divisible by 3, one or two <code>=</code> padding characters are appended to make the output a multiple of 4 characters.</p>

<h2>Where Base64 is used in practice</h2>
<p>Base64 appears throughout web development in several contexts. Data URIs - those long <code>data:image/png;base64,...</code> strings in CSS or HTML - encode binary image data so it can be embedded directly in a document without a separate network request. HTTP Basic Authentication encodes the username and password as <code>base64(username:password)</code> before sending them in the Authorization header. JSON Web Tokens encode their header and payload as URL-safe Base64 strings separated by dots. Email attachments are Base64-encoded in MIME-formatted messages.</p>

<h2>Base64 vs URL encoding</h2>
<p>Base64 and URL percent-encoding both convert data to ASCII-safe text, but they serve different purposes and produce very different output. URL encoding is designed specifically for embedding special characters in URLs and query strings - it percent-encodes characters that have reserved meaning in URLs. Base64 is a general-purpose binary encoding that makes any data safe for contexts that only support text, but the output contains characters (<code>+</code> and <code>/</code>) that must themselves be percent-encoded if used in a URL. Use URL encoding for URL query parameters and Base64 for binary data in JSON, HTML attributes, and HTTP headers.</p>

<h2>URL-safe Base64</h2>
<p>The JWT and OAuth standards use a variant called URL-safe Base64 (also known as Base64url) that replaces <code>+</code> with <code>-</code> and <code>/</code> with <code>_</code>, and typically omits the <code>=</code> padding. This makes the output safe to embed directly in URLs without further encoding. If you are working with JWTs, use the JWT Decoder tool on this site which handles this variant automatically.</p>

<h2>Security note</h2>
<p>Base64 is an encoding scheme, not an encryption scheme. It provides no confidentiality - anyone who has a Base64 string can decode it instantly with any standard library. If you need to protect sensitive data, use proper encryption (AES-256) or a cryptographic hash (SHA-256). Do not embed secrets, passwords, or private keys in Base64 thinking they are safe because they are not readable at a glance.</p>
<h2>Base64 in different programming languages</h2>
<p>The encoding is identical across languages but the API differs. In Python: <code>import base64; base64.b64encode(b'hello').decode()</code>. In Node.js: <code>Buffer.from('hello').toString('base64')</code>. In Go: <code>base64.StdEncoding.EncodeToString([]byte("hello"))</code>. In PHP: <code>base64_encode('hello')</code>. All produce the same output: <code>aGVsbG8=</code>. When you need to verify that your application's Base64 output is correct, paste it here to decode and confirm the round-trip.</p>
<h2>Common Base64 mistakes and how to avoid them</h2>
<p>The most frequent Base64 bug in web development is handling multi-byte characters incorrectly. JavaScript's <code>btoa()</code> function only accepts byte strings - calling it on a string containing Unicode characters above U+00FF throws a <code>InvalidCharacterError</code>. The correct pattern for encoding UTF-8 text is: <code>btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) => String.fromCharCode(parseInt(p1, 16))))</code> - or more simply, use <code>TextEncoder</code> to get the UTF-8 bytes and encode them. This tool handles multi-byte characters correctly by using TextEncoder before encoding, which is why it produces correct results for Arabic, Bengali, Chinese, and emoji input where browser's native <code>btoa()</code> would fail.</p>
<h2>Base64 in email systems</h2>
<p>Email's MIME standard uses Base64 to encode binary attachments and non-ASCII text in email headers and body parts. When you attach a PDF to an email, your mail client Base64-encodes the PDF and includes it in the MIME multipart message body. The recipient's mail client decodes it on arrival. This is invisible to users but is why email file sizes are roughly 33% larger than the original attachments - the Base64 encoding overhead. MIME also uses a line-length limit of 76 characters for Base64 encoded content, inserting CRLF line breaks at that interval, which is slightly different from the continuous Base64 strings used in data URIs and JWT tokens.</p>
`,
    },
    related: ['url-codec', 'hash-generator', 'json-formatter', 'jwt-decoder'],
  },

  {
    slug: 'url-codec',
    name: 'URL Encoder & Decoder',
    category: 'developer',
    kind: 'client-pure',
    icon: 'link',
    description: 'Percent-encode special characters for safe URL usage, or decode them back.',
    component: 'UrlCodec',
    seo: {
      title: 'URL Encoder & Decoder - Percent-Encode URLs Free Online',
      description: 'Encode special characters in URLs using percent-encoding, or decode percent-encoded strings back to plain text. Runs entirely in your browser.',
      keywords: ['url encoder', 'url decoder', 'percent encoding', 'url encode online', 'decode url', 'urlencode', 'url escape'],
      faq: [
        { q: 'What characters need to be URL-encoded?', a: 'Any character that is not unreserved in the URI spec must be percent-encoded. Unreserved characters are A–Z, a–z, 0–9, hyphen, underscore, period, and tilde. Everything else - spaces, ?, =, &, #, /, slashes, and non-ASCII Unicode - must be encoded.' },
        { q: 'What is the difference between encodeURI and encodeURIComponent?', a: 'encodeURI encodes a full URL, leaving characters like /, ?, =, and & unencoded because they are structural parts of a URL. encodeURIComponent encodes a single query parameter value, encoding those structural characters too. Use encodeURIComponent for individual parameter values.' },
        { q: 'Why does a space become %20 or +?', a: 'RFC 3986 (URL spec) requires spaces to be encoded as %20. The HTML form encoding spec uses + for spaces in query strings. Both are valid in different contexts. Most modern APIs expect %20.' },
        { q: 'How do I encode a URL with Unicode characters?', a: 'Unicode characters are first encoded to UTF-8 bytes, then each byte is percent-encoded. For example, the Bengali character অ (U+0985) encodes to %E0%A6%85 because its UTF-8 representation is three bytes: E0, A6, 85.' },
      ],
      content: `<p>URLs can only contain a limited set of ASCII characters. Every other character - spaces, non-ASCII Unicode, reserved characters like <code>#</code> and <code>&</code>, and many punctuation marks - must be converted to a percent-encoded form before being used in a URL. This tool handles that conversion in both directions using JavaScript's native <code>encodeURIComponent()</code> and <code>decodeURIComponent()</code> functions.</p>

<h2>How percent-encoding works</h2>
<p>Percent-encoding replaces each unsafe byte with a percent sign followed by two hexadecimal digits representing the byte's value. A space (byte value 32, or 0x20 in hex) becomes <code>%20</code>. A forward slash (byte value 47, or 0x2F) becomes <code>%2F</code>. Unicode characters are first converted to their UTF-8 byte representation, then each byte is percent-encoded individually. The Bengali letter অ, for example, has the Unicode code point U+0985, which encodes to three UTF-8 bytes (E0 A6 85), producing <code>%E0%A6%85</code>.</p>

<h2>When to URL-encode</h2>
<p>You need URL encoding whenever you are building a URL programmatically and including data that may contain special characters. The most common case is a query string parameter value that comes from user input - a search query, a filter value, or a redirect target. If the user types <code>hello world</code> and you build <code>?q=hello world</code>, the URL is technically malformed and many HTTP clients will either reject it or mangle it. Encoding produces <code>?q=hello%20world</code>, which is valid and unambiguous.</p>

<h2>encodeURI vs encodeURIComponent</h2>
<p>JavaScript provides two encoding functions with different behaviors. <code>encodeURI()</code> is designed for encoding a complete URL - it leaves the structural characters (<code>:// ? = & # /</code>) unencoded because they are meaningful parts of the URL structure. <code>encodeURIComponent()</code> is designed for encoding a single value within a URL - it encodes those structural characters too. In practice, you almost always want <code>encodeURIComponent()</code> for encoding individual query parameter values, and that is what this tool uses.</p>

<h2>URL encoding in different languages</h2>
<p>Every major programming language has a built-in URL encoding function. In Python it is <code>urllib.parse.quote()</code>. In Java it is <code>URLEncoder.encode()</code>. In PHP it is <code>urlencode()</code> or <code>rawurlencode()</code> (which uses <code>%20</code> instead of <code>+</code> for spaces). They all produce the same percent-encoded output, though they differ in how they handle spaces and a few edge cases around which characters are treated as reserved.</p>

<h2>Decoding incoming URLs</h2>
<p>When your application receives a URL with percent-encoded values - for example, a webhook callback with a redirect parameter - you need to decode it before using the value. <code>decodeURIComponent()</code> reverses the encoding, converting <code>%20</code> back to a space and <code>%E0%A6%85</code> back to অ. Most web frameworks do this automatically for query parameters before they reach your handler, but it is useful to be able to do it manually when debugging raw request logs or building low-level HTTP clients.</p>
<h2>URL encoding in API development</h2>
<p>When constructing API request URLs programmatically, always encode query parameter values but not the structural characters (<code>?</code>, <code>=</code>, <code>&amp;</code>) that separate them. In JavaScript: <code>const url = \`https://api.example.com/search?q=\${encodeURIComponent(userInput)}\`</code>. A common bug is encoding the entire URL including those structural characters, which breaks the request structure. The <code>URL</code> constructor in modern browsers handles this correctly: <code>const u = new URL('/search', base); u.searchParams.set('q', userInput);</code> - <code>searchParams.set</code> encodes the value automatically and correctly.</p>
<h2>URL encoding versus HTML entity encoding</h2>
<p>URL encoding (percent encoding) and HTML entity encoding serve different purposes and must not be confused. URL encoding is for embedding characters in URL components. HTML entity encoding is for displaying characters in HTML content without being interpreted as markup - <code>&amp;</code> becomes <code>&amp;amp;</code>, <code>&lt;</code> becomes <code>&amp;lt;</code>. When building a URL that will appear in an HTML attribute, you need both: the URL is percent-encoded to make it a valid URL, then the URL itself is HTML-encoded when placed in an <code>href</code> attribute. In most frameworks and templating systems, HTML attribute encoding happens automatically; the part you need to do explicitly is URL-encode dynamic values that go into URL components.</p>
<h2>International domain names (IDN) and Punycode</h2>
<p>Domain names with non-ASCII characters (like <code>münchen.de</code> or <code>বাংলাদেশ.বাংলা</code>) use a different encoding called Punycode, not percent-encoding. <code>münchen.de</code> becomes <code>xn--mnchen-3ya.de</code> in DNS representation. Browsers display the human-readable form but send the Punycode form in HTTP requests. Percent-encoding applies to paths and query strings within a URL, not to the hostname portion. This distinction matters when you are building full URL parsers or validators.</p>
<h2>Query string construction best practices</h2>
<p>Building query strings by hand with string concatenation is a common source of bugs and security issues. If a value contains an ampersand (<code>&amp;</code>), equals sign (<code>=</code>), or other reserved characters, concatenation without encoding breaks the URL structure. The correct pattern in JavaScript is to use <code>URLSearchParams</code>: <code>const params = new URLSearchParams({ q: userInput, page: '2', sort: 'date' }); const url = '/search?' + params.toString();</code>. <code>URLSearchParams</code> encodes all values automatically and handles multi-value keys (same key multiple times) correctly, which manual concatenation rarely does. In Python, use <code>urllib.parse.urlencode(params)</code> or the <code>requests</code> library's <code>params</code> argument which encodes automatically. Both approaches produce correctly encoded URLs that handle any input value safely, including values with special characters, Unicode content, and empty strings.</p>

<h2>URLSearchParams - the correct approach</h2><p>Building query strings by manual string concatenation is error-prone when values contain reserved characters like ampersands or equal signs. The <code>URLSearchParams</code> API in modern JavaScript handles encoding automatically: <code>const params = new URLSearchParams({ q: userInput, page: "2" }); const url = "/search?" + params.toString();</code>. This correctly encodes any special characters in the values without affecting the structural separators. In Python use <code>urllib.parse.urlencode(params)</code> or the requests library params argument. In PHP use <code>http_build_query($params)</code>. All produce correctly percent-encoded query strings regardless of what characters appear in the values, including Unicode, spaces, slashes, and ampersands. For URL path segments containing user-generated content, use <code>encodeURIComponent()</code> directly - URLSearchParams is only for the query portion. A complete URL encoding strategy: encode each query parameter value independently with encodeURIComponent before combining them, or use URLSearchParams to handle the entire query string at once.</p>

<h2>URLSearchParams - the correct approach</h2>
<p>The <code>URLSearchParams</code> constructor in modern browsers handles query string encoding automatically without requiring manual percent-encoding of each value. Pass an object or array of key-value pairs and call <code>.toString()</code> to get a correctly encoded query string. Multi-value keys (same parameter name, multiple values) are handled correctly - something manual concatenation rarely gets right. In Python, <code>urllib.parse.urlencode(params)</code> provides the same functionality. In PHP, <code>http_build_query($params)</code>. These language-native approaches handle Unicode, reserved characters, empty strings, and special cases like null values consistently. For URL path segments containing user data, use <code>encodeURIComponent()</code> directly - URLSearchParams only encodes query string values, not path segments. A robust URL construction strategy: use the URL constructor with a base, set path segments explicitly, and use <code>searchParams.set()</code> for each query parameter. This approach guarantees correct encoding at every URL component boundary without manual escaping.
</p>`,
    },
    related: ['base64-codec', 'json-formatter', 'hash-generator', 'regex-tester'],
  },

  {
    slug: 'uuid-generator',
    name: 'UUID Generator',
    category: 'developer',
    kind: 'client-pure',
    icon: 'fingerprint',
    description: 'Generate cryptographically random UUID v4 identifiers instantly.',
    component: 'UuidGenerator',
    seo: {
      title: 'UUID Generator - Free Online UUID v4 Generator',
      description: 'Generate one or many cryptographically random UUID v4 identifiers instantly in your browser. Copy individually or in bulk. No server needed.',
      keywords: ['uuid generator', 'generate uuid', 'uuid v4', 'random uuid', 'unique identifier generator', 'guid generator', 'uuid online'],
      faq: [
        { q: 'What is a UUID?', a: 'A UUID (Universally Unique Identifier) is a 128-bit number formatted as 32 hexadecimal digits separated by hyphens in the pattern 8-4-4-4-12. UUID v4 is randomly generated, making the probability of two identical UUIDs astronomically low.' },
        { q: 'Is it safe to use a browser-generated UUID?', a: 'Yes. This tool uses the Web Crypto API (crypto.randomUUID()) which is cryptographically secure. It is the same API used by Node.js and Deno for secure random UUID generation.' },
        { q: 'What is the difference between UUID and GUID?', a: 'GUID (Globally Unique Identifier) is Microsoft\'s name for the same concept. They use the same format and are interchangeable in practice.' },
        { q: 'Can two UUIDs ever be the same?', a: 'Theoretically yes, but the probability is so low it is effectively impossible. UUID v4 has 122 bits of randomness. Generating a billion UUIDs per second for a billion years gives a collision probability of roughly 1 in 10^18.' },
      ],
      content: `<p>A UUID (Universally Unique Identifier) is a 128-bit identifier designed to be unique across space and time without requiring a central coordinating authority. UUID version 4 - the type generated by this tool - uses cryptographically random bits for virtually all of its 128 bits, making the probability of two identical UUIDs so low it is practically impossible even at planet-scale usage.</p>

<p>The standard UUID format is 32 hexadecimal characters grouped as <code>xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx</code>, where the <code>4</code> identifies the version and <code>y</code> is a value from 8, 9, a, or b identifying the variant. A typical UUID looks like <code>550e8400-e29b-41d4-a716-446655440000</code>.</p>

<h2>How this tool generates UUIDs</h2>
<p>This generator uses <code>crypto.randomUUID()</code>, which is built into modern browsers and is cryptographically secure - the same algorithm used by Node.js's <code>crypto.randomUUID()</code> and Python's <code>uuid.uuid4()</code>. The randomness comes from the operating system's entropy pool, which collects unpredictable data from hardware events (keystrokes, mouse movements, interrupt timings). This is the correct way to generate UUIDs; avoid Math.random()-based generators, which are not cryptographically secure.</p>

<h2>Common uses for UUIDs</h2>
<p>UUIDs are used as primary keys in databases when you need to generate IDs in multiple places without coordination. Unlike auto-incrementing integers, UUID primary keys can be generated on the client before the record is saved, which simplifies optimistic UI updates. They are used as idempotency keys for API requests, ensuring that retrying a request does not create duplicate records. They appear as session tokens, correlation IDs in distributed tracing, filenames for uploaded files, feature flag identifiers, and anywhere else a globally unique identifier is needed.</p>

<h2>UUID versus ULID versus NanoID</h2>
<p>UUID v4 is the most widely supported format, but it has two limitations: it does not sort chronologically (which makes it less ideal as a database primary key if you want index locality), and it is relatively long. ULID (Universally Unique Lexicographically Sortable Identifier) encodes a millisecond timestamp in the first 48 bits, making IDs sortable and clustered in database indexes. NanoID uses a URL-safe alphabet and generates shorter identifiers (21 characters by default) with comparable collision resistance. For most web applications, UUID v4 is the practical default and has the widest library support.</p>

<h2>GUIDs versus UUIDs</h2>
<p>GUID (Globally Unique Identifier) is Microsoft's term for the same concept. GUIDs and UUIDs use the same 8-4-4-4-12 format and are interchangeable in practice. Microsoft documentation uses GUID; web and open-source documentation generally uses UUID. Some Microsoft tools display GUIDs in uppercase and wrapped in curly braces (<code>{550E8400-E29B-41D4-A716-446655440000}</code>), but the value is identical to the lowercase UUID form without braces.</p>

<h2>Bulk generation</h2>
<p>This tool can generate up to 100 UUIDs at once, which is useful when seeding test databases, creating fixture data, or pre-generating identifiers for a batch operation. Each UUID is independently random - the tool calls <code>crypto.randomUUID()</code> once per identifier, with no dependency between them.</p>
<h2>UUIDs as database primary keys</h2>
<p>UUID v4 as a primary key has one significant trade-off: random UUIDs scatter inserts across the B-tree index, causing index fragmentation and reduced write performance at high insert rates. For write-heavy tables, consider UUID v7 (sequential UUID with embedded timestamp, supported in PostgreSQL 17+) or ULID, both of which are time-ordered and insert in sequential index order. UUID v4 remains the practical default for most web applications where insert rates are modest and the benefits of client-side ID generation (no coordination, immediate ID availability before database round-trip) outweigh the index fragmentation cost.</p>
<h2>UUID versions: when to use which</h2>
<p>UUID v4 (random) is the most widely used because it requires no external state and has no timestamp component that reveals when or where the ID was generated. UUID v1 embeds the current timestamp and the generating machine's MAC address - this was deprecated in most contexts because it leaks timing and network information. UUID v3 and v5 generate deterministic UUIDs from a namespace and a name using MD5 and SHA-1 respectively - useful when you need the same logical input to always produce the same UUID (for example, deriving a stable UUID from a URL). UUID v7, standardized in 2024, is a time-ordered UUID that is random within the same millisecond - it performs significantly better as a database primary key because sequential IDs cluster in B-tree indexes. PostgreSQL 17 added <code>gen_random_uuid()</code> for v4 and <code>uuid_generate_v7()</code> for v7 via the pgcrypto extension.</p>
<h2>UUID collision probability in real systems</h2>
<p>UUID v4 has 122 bits of randomness. The birthday paradox tells us that with 2.71 quintillion UUIDs generated (roughly 2^61.5), the probability of at least one collision reaches 50%. The entire internet generates far fewer UUIDs than this. At one billion UUIDs per second - well beyond any realistic system - it would take 86 years to reach a 50% collision probability. For all practical engineering purposes, UUID v4 collision is not a concern worth designing around.</p>
`,
    },
    related: ['password-generator', 'hash-generator', 'base64-codec', 'json-formatter'],
  },

  {
    slug: 'password-generator',
    name: 'Password Generator',
    category: 'developer',
    kind: 'client-pure',
    icon: 'key-round',
    description: 'Generate strong, random passwords with full control over length and character sets.',
    component: 'PasswordGenerator',
    seo: {
      title: 'Password Generator - Strong Random Passwords, Free Online',
      description: 'Generate cryptographically random passwords of any length. Choose uppercase, lowercase, numbers, and symbols. Runs in your browser - nothing is stored.',
      keywords: ['password generator', 'random password generator', 'strong password generator', 'secure password', 'generate password online', 'password creator'],
      faq: [
        { q: 'Are these passwords stored anywhere?', a: 'No. Passwords are generated using the browser\'s Web Crypto API and exist only in your browser\'s memory. They are not sent to any server, logged, or stored.' },
        { q: 'How long should a password be?', a: 'Security experts recommend at least 16 characters for important accounts. Longer passwords are always better - a 24-character random password is practically uncrackable with current hardware even without special characters.' },
        { q: 'Why use a password generator instead of making one up?', a: 'Humans are predictable. We gravitate toward words, names, dates, and patterns that are easy to remember but easy to guess. A cryptographically random password has no pattern for an attacker to exploit.' },
        { q: 'Should I use a password manager?', a: 'Yes. A strong random password is only useful if you can recall it - and you cannot reliably remember dozens of unique 20-character passwords. A password manager generates and stores passwords securely so you only need to remember one master password.' },
      ],
      content: `<p>Strong passwords are the first line of defence against unauthorized access to your accounts. A strong password is long, random, and unique - used for exactly one account and never reused. This generator creates passwords that meet all three criteria using cryptographically secure randomness from the browser's Web Crypto API.</p>

<h2>What makes a password strong?</h2>
<p>Password strength is measured by entropy - the amount of randomness, expressed in bits. A higher entropy means more possible passwords, which means longer to guess by brute force. A completely random 12-character password using all four character sets (uppercase, lowercase, digits, symbols) has about 79 bits of entropy. Modern cracking hardware can test billions of guesses per second, but 79 bits of entropy means 2^79 possible passwords - at a billion guesses per second, that would take longer than the age of the universe to exhaust. A 20-character equivalent has over 131 bits of entropy, which is effectively uncrackable.</p>

<h2>How this generator works</h2>
<p>This tool uses <code>crypto.getRandomValues()</code>, which fills a typed array with cryptographically random bytes sourced from the operating system's entropy pool. This is the same source used for TLS session keys and UUID generation - genuinely unpredictable by design. Each character is selected by mapping a random byte to a position in the allowed character set using rejection sampling, which avoids the modulo bias that would otherwise slightly favor characters at the beginning of the character set.</p>

<h2>Password length recommendations</h2>
<p>The minimum for any account you care about is 16 characters. For banking, email, and work accounts that could give an attacker access to other accounts via password reset, use 20 characters or more. If you are using a password manager to store the password, length has essentially no cost to you - generate 24 or 32 characters and you never need to think about it again.</p>

<h2>Character set options</h2>
<p>Uppercase and lowercase letters (52 characters), digits (10 characters), and symbols (~32 characters) give a combined set of about 94 characters. Each additional character type multiplies the number of possible passwords, but symbol requirements also cause problems on some websites with poor password validation. If a site rejects symbols, use a longer all-alphanumeric password to compensate for the smaller character set.</p>

<h2>Use a password manager</h2>
<p>A random password is only useful if you can use it. Remembering thirty unique 20-character passwords is impossible - which is why people end up reusing passwords, the single biggest cause of account compromises. A password manager (1Password, Bitwarden, Dashlane, or a browser's built-in manager) stores passwords securely so you only need to remember one master password. Many managers have built-in generators; this tool is useful when you need a password outside of your manager's environment.</p>
<h2>Password manager integration</h2>
<p>The most secure workflow is to generate passwords directly in your password manager, which stores them automatically in the same action. Use this browser tool when you need to generate a password outside your manager's environment: on someone else's device, in a setup wizard that runs before your manager is configured, or when your manager's generator has restrictions you need to override. After generating here, copy the password once into both the target site's password field and your manager - never type a random password from memory, and never use the same password for two different accounts regardless of how strong it is.</p>
<h2>Entropy and what it actually means</h2>
<p>Password entropy measures the unpredictability of a password in bits. A password with N bits of entropy is as hard to guess as a random N-bit number. A completely random password from a character set of size C with length L has entropy of L × log₂(C) bits. A random 16-character password from 94 printable ASCII characters has 16 × log₂(94) ≈ 104 bits of entropy. For context: a cracking rig testing one trillion guesses per second would exhaust a 64-bit entropy password space in about 5 hours, but a 104-bit entropy password would take longer than the age of the universe to exhaust. The practical takeaway: length matters more than character set complexity - a 20-character all-lowercase password (94 bits of entropy) is harder to brute-force than a 12-character mixed password (79 bits).</p>
<h2>What makes a passphrase different</h2>
<p>Passphrases - sequences of random words like "correct horse battery staple" - achieve high entropy through length rather than character complexity. A four-word passphrase from a 7,776-word wordlist (a standard Diceware list) has approximately 51 bits of entropy. A five-word passphrase reaches 64 bits. Passphrases are significantly easier for humans to remember and type correctly than character-based random passwords of equivalent entropy. For accounts you must type regularly without a password manager - a computer login, a phone unlock PIN - a five-to-six word passphrase is often the best option.</p>
`,
    },
    related: ['uuid-generator', 'hash-generator', 'base64-codec', 'url-codec'],
  },

  {
    slug: 'hash-generator',
    name: 'Hash Generator',
    category: 'developer',
    kind: 'client-pure',
    icon: 'hash',
    description: 'Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from any text.',
    component: 'HashGenerator',
    seo: {
      title: 'Hash Generator - MD5, SHA-256, SHA-512 Free Online Tool',
      description: 'Generate cryptographic hashes (MD5, SHA-1, SHA-256, SHA-512) from any text instantly in your browser. No server, no upload, completely private.',
      keywords: ['hash generator', 'md5 hash', 'sha256 generator', 'sha512 hash', 'checksum generator', 'crypto hash online', 'generate hash'],
      faq: [
        { q: 'What is a cryptographic hash?', a: 'A cryptographic hash function takes input of any length and produces a fixed-length output (the hash or digest) that has three properties: the same input always produces the same output, it is practically impossible to find two different inputs with the same output (collision resistance), and you cannot reverse the hash to find the original input (preimage resistance).' },
        { q: 'Should I use MD5 or SHA-256?', a: 'Use SHA-256 for security purposes. MD5 and SHA-1 are cryptographically broken - it is possible to construct collisions for both. Use MD5 only for non-security applications like checksums for detecting accidental file corruption, where you trust both parties.' },
        { q: 'Can I recover the original text from a hash?', a: 'Not by reversing the hash - that is mathematically infeasible. However, common passwords and short strings can be found by looking them up in a rainbow table (a precomputed database of hash→input pairs). Always use a salt when hashing passwords.' },
        { q: 'Why does "password" always hash to the same MD5?', a: 'Hash functions are deterministic - the same input always produces the same output. This is what makes hashes useful for verification. The "same input, same output" property is also why you must add a salt when hashing passwords, so that two users with the same password produce different hashes.' },
      ],
      content: `<p>A cryptographic hash function transforms input data of any size into a fixed-length string of characters. The output - called a hash, digest, or checksum - has several essential properties: it is fast to compute, completely deterministic (the same input always produces the same output), extremely sensitive to changes in the input (changing one bit changes approximately half the output bits), and practically impossible to reverse.</p>

<p>This tool computes MD5, SHA-1, SHA-256, and SHA-512 hashes using the browser's native Web Crypto API for SHA variants and a pure-JavaScript implementation for MD5. Nothing you type is sent to a server.</p>

<h2>SHA-256 - the current standard</h2>
<p>SHA-256 (Secure Hash Algorithm 256-bit) is part of the SHA-2 family published by NIST. It produces a 256-bit (32-byte) hash, displayed as 64 hexadecimal characters. SHA-256 is used in TLS certificate verification, code signing, the Bitcoin proof-of-work algorithm, Git's object addressing, and as the standard hash in most modern security protocols. When you need a hash for security purposes, use SHA-256 unless you have a specific reason to use SHA-512.</p>

<h2>Why MD5 is no longer secure</h2>
<p>MD5 was the dominant hash function from 1992 until the mid-2000s. In 2004, researchers demonstrated the first practical MD5 collision - two different inputs that produce the same MD5 hash. By 2008, researchers had used MD5 collisions to forge a valid SSL certificate. MD5 is cryptographically broken for any security-sensitive purpose. It is still useful for non-security checksums - verifying that a file was not corrupted during download - where an attacker is not involved and you only need to detect accidental changes.</p>

<h2>SHA-1 is also deprecated</h2>
<p>SHA-1 was the successor to MD5 and was widely used in SSL/TLS, Git, and code signing. Google's Project Zero team demonstrated a practical SHA-1 collision (the SHAttered attack) in 2017, and major browsers have since removed support for SHA-1 certificates. Git is in the process of migrating to SHA-256. Do not use SHA-1 for new security-sensitive applications.</p>

<h2>Hashing passwords</h2>
<p>A hash generator like this one should not be used to hash passwords for storage. Password hashing requires a specialized function designed to be slow and memory-intensive - bcrypt, scrypt, or Argon2 - to resist brute-force and GPU-accelerated attacks. General-purpose hashes like SHA-256 are deliberately fast, which makes them easy to brute-force when an attacker has the hash. Never store passwords as MD5 or SHA-256 hashes without a proper salting and key-stretching scheme.</p>

<h2>File verification</h2>
<p>One of the most practical uses of hashes is verifying file integrity. When you download software, the publisher often provides a SHA-256 checksum alongside the download. After downloading, you compute the SHA-256 hash of the file you received and compare it to the published checksum. If they match, the file was not corrupted in transit and has not been tampered with. This is not a substitute for code signing (which also verifies the publisher's identity) but it is a useful first check.</p>
<h2>Hash functions in practical web development</h2>
<p>The most frequent use of SHA-256 in web development is generating the hash of a file for integrity verification - this is exactly how npm's <code>package-lock.json</code> and browser Subresource Integrity (SRI) attributes work. For SRI: <code>&lt;script src="library.js" integrity="sha256-[base64-of-sha256]" crossorigin="anonymous"&gt;&lt;/script&gt;</code>. The browser verifies the script's SHA-256 before executing it, blocking supply chain attacks where a CDN serves a modified version. This tool generates the hex-encoded hash; convert to base64 with the Base64 encoder on this site to produce the SRI-format value.</p>
<h2>SHA-256 in Git and blockchain</h2>
<p>Git uses SHA-1 (and is migrating to SHA-256) to address every object in a repository - commits, trees, blobs (file contents), and tags are all identified by the SHA hash of their content. This creates a content-addressable storage system where the same file content always has the same address and any modification changes the address, making it impossible to silently alter history without changing all subsequent hashes. Bitcoin uses double-SHA-256 (SHA-256 applied twice) for its proof-of-work mining algorithm and for transaction and block hashing. The SHA-256 algorithm was designed by the NSA and published by NIST in 2001 as part of the SHA-2 family - it remains unbroken and is considered secure for all current applications.</p>
<h2>HMAC - keyed hashing</h2>
<p>A plain cryptographic hash is not sufficient for message authentication because it is deterministic and keyless - anyone can compute the same hash of any message. HMAC (Hash-based Message Authentication Code) adds a secret key to the hashing process, producing a hash that only someone with the key can compute or verify. HMAC-SHA256 is used in JWT token signing (when the HS256 algorithm is selected), webhook signature verification (GitHub, Stripe, and most APIs sign webhook payloads with HMAC-SHA256), and API request authentication. This tool generates plain hashes - use a cryptographic library for HMAC computation when authentication is required.</p>
`,
    },
    related: ['base64-codec', 'uuid-generator', 'jwt-decoder', 'password-generator'],
  },

  {
    slug: 'regex-tester',
    name: 'Regex Tester',
    category: 'developer',
    kind: 'client-pure',
    icon: 'regex',
    description: 'Test regular expressions against text with real-time match highlighting.',
    component: 'RegexTester',
    seo: {
      title: 'Regex Tester - Test Regular Expressions Online, Free',
      description: 'Test and debug regular expressions against text in real time. Highlights matches, shows groups, and explains what your pattern does. Runs in your browser.',
      keywords: ['regex tester', 'regular expression tester', 'test regex online', 'regex debugger', 'regex validator', 'regex match', 'javascript regex'],
      faq: [
        { q: 'What regex flavour does this tool use?', a: 'This tool uses JavaScript\'s native RegExp engine, which supports the PCRE-like syntax used in most modern languages. Key features include lookahead/lookbehind, named capture groups, Unicode property escapes, and the s (dotAll) flag.' },
        { q: 'What do the flags g, i, m, s mean?', a: 'g (global) finds all matches instead of stopping at the first. i (insensitive) makes the match case-insensitive. m (multiline) makes ^ and $ match the start/end of each line rather than the whole string. s (dotAll) makes the . metacharacter match newline characters.' },
        { q: 'How do I match a literal dot or parenthesis?', a: 'Escape them with a backslash: \\. matches a literal dot, \\( matches a literal opening parenthesis. Without the backslash, . matches any character and ( starts a capture group.' },
        { q: 'What is a capture group?', a: 'Parentheses in a regex create a capture group. The text matched by the expression inside the parentheses is captured separately. Named groups use the syntax (?<name>...) and can be referenced by name. Non-capturing groups use (?:...) and group without capturing.' },
      ],
      content: `<p>Regular expressions are a powerful pattern-matching language that let you search, validate, and transform text with precision. A well-crafted regex can replace dozens of lines of string-parsing code, but the syntax can be dense and difficult to debug without immediate visual feedback. This tester shows matches in real time as you type, highlighting every match in the test string and listing capture group values.</p>

<h2>Regular expression fundamentals</h2>
<p>A regex pattern consists of literal characters that match themselves (<code>hello</code> matches the string "hello") and special metacharacters with specific meanings. The dot <code>.</code> matches any single character. <code>*</code> means "zero or more of the preceding element," <code>+</code> means "one or more," and <code>?</code> means "zero or one." Square brackets <code>[abc]</code> match any one of the listed characters. <code>^</code> and <code>$</code> anchor the match to the start and end of a string (or line, with the m flag). Parentheses create capture groups, and <code>|</code> is an alternation operator matching either side.</p>

<h2>Flags and their meanings</h2>
<p>The <code>g</code> (global) flag makes the engine find all matches rather than stopping after the first. Without <code>g</code>, <code>String.match()</code> returns only the first match. The <code>i</code> (case-insensitive) flag makes the pattern match regardless of letter case. The <code>m</code> (multiline) flag redefines what <code>^</code> and <code>$</code> mean - instead of anchoring to the start and end of the entire string, they anchor to the start and end of each line. The <code>s</code> (dotAll) flag makes the dot metacharacter match newline characters, which it normally does not.</p>

<h2>Capture groups and named groups</h2>
<p>Parentheses capture the text matched by the enclosed expression. <code>(\\d{4})</code> in a date pattern captures the year as Group 1. Named groups - written as <code>(?&lt;year&gt;\\d{4})</code> - make the code that processes matches more readable because you reference the match by name (<code>match.groups.year</code>) rather than by index (<code>match[1]</code>). Use non-capturing groups <code>(?:...)</code> when you need grouping for alternation or quantifiers but do not need the captured value.</p>

<h2>Common regex pitfalls</h2>
<p>Catastrophic backtracking is the most dangerous regex bug. It occurs when the pattern has nested quantifiers that can match the same text in exponentially many ways - the engine tries all combinations before deciding there is no match, freezing your application for seconds or longer on adversarial input. Another common mistake is forgetting to escape metacharacters in dynamic patterns (when the pattern is constructed from user input, you must escape the input with a function like <code>escapeRegex()</code> before inserting it into the pattern). Greedy quantifiers (<code>.*</code>) consume as many characters as possible, which is often not what you want when matching between two delimiters - use lazy quantifiers (<code>.*?</code>) instead.</p>

<h2>Practical examples</h2>
<p>Email validation: <code>^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$</code> (simple structural check, not RFC 5321 compliant). ISO 8601 date: <code>^\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])$</code>. Extract URLs from text: <code>https?:\\/\\/[\\w\\-\\.]+\\.[a-z]{2,}(?:\\/[^\\s]*)?</code>. Match a hex color code: <code>#(?:[0-9A-Fa-f]{3}){1,2}</code>. These examples illustrate the pattern: anchor precisely, use character classes rather than dots, and test against edge cases.</p>
<h2>Performance and catastrophic backtracking</h2>
<p>Test your regex against adversarial inputs before deploying it in a production application. The input that most commonly triggers catastrophic backtracking is a string that almost matches but ultimately fails, forcing the engine to explore all possible parse trees. For a pattern like <code>(a+)+b</code>, the input <code>"aaaaaaaaaaaaaaaaac"</code> causes exponential backtracking. The fix is usually to make the pattern more specific or use possessive quantifiers / atomic groups where available. JavaScript's regex engine does not support possessive quantifiers, but you can often restructure the pattern to avoid nested quantifiers on the same character class.</p>
<h2>Named capture groups in modern JavaScript</h2>
<p>Named capture groups, introduced in ES2018, make regex match extraction far more readable: <code>/(?&lt;year&gt;\d{4})-(?&lt;month&gt;\d{2})-(?&lt;day&gt;\d{2})/</code>. After matching, <code>match.groups.year</code> is clearer than <code>match[1]</code>. Named groups also enable backreferences within the pattern itself: <code>/(?&lt;tag&gt;\w+)&gt;.*&lt;\/\k&lt;tag&gt;/</code> matches opening and closing HTML tags of the same name. Named groups are now supported in all modern browsers and Node.js versions, making the numeric index approach obsolete for new code.</p>
<h2>Unicode property escapes</h2>
<p>The <code>u</code> flag enables Unicode property escapes, which match characters based on their Unicode properties rather than specific character ranges. <code>/\p{Script=Bengali}/u</code> matches any Bengali character. <code>/\p{Letter}/u</code> matches any Unicode letter, equivalent to a language-agnostic <code>[a-zA-Z]</code>. <code>/\p{Number}/u</code> matches any Unicode numeral including Arabic-Indic digits (٠١٢٣٤٥٦٧٨٩). These are essential for text processing applications that handle multilingual content, where ASCII character class shortcuts (<code>\w</code>, <code>\d</code>) only match ASCII characters by default.</p>
`,
    },
    related: ['json-formatter', 'text-diff', 'url-codec', 'jwt-decoder'],
  },

  {
    slug: 'jwt-decoder',
    name: 'JWT Decoder',
    category: 'developer',
    kind: 'client-pure',
    icon: 'shield-check',
    description: 'Decode and inspect JWT tokens - header, payload, and signature - instantly.',
    component: 'JwtDecoder',
    seo: {
      title: 'JWT Decoder - Decode JSON Web Tokens Online, Free',
      description: 'Decode and inspect JWT tokens instantly in your browser. View the header, payload claims, and expiry. Your token is never sent to a server.',
      keywords: ['jwt decoder', 'decode jwt', 'jwt parser', 'json web token decoder', 'jwt inspector', 'jwt claims', 'jwt online'],
      faq: [
        { q: 'Is it safe to paste my JWT here?', a: 'This tool runs entirely in your browser - your JWT is never sent to a server. That said, avoid pasting production JWTs containing sensitive user data in any online tool if you can avoid it. Use a local tool or debug against a non-production token.' },
        { q: 'Can this tool verify a JWT signature?', a: 'This tool decodes the header and payload (which are base64url-encoded, not encrypted) but cannot verify the signature because verification requires the secret key or public key, which should never leave your server.' },
        { q: 'What is the exp claim?', a: 'exp is the expiration time claim - a Unix timestamp (seconds since 1970-01-01 UTC) after which the token must be rejected. This tool displays the exp timestamp as a human-readable date so you can see at a glance whether the token has expired.' },
        { q: 'What is the difference between HS256 and RS256?', a: 'HS256 (HMAC with SHA-256) uses a shared secret key for both signing and verification. RS256 (RSA with SHA-256) uses an asymmetric key pair - the private key signs the token, the public key verifies it. RS256 is better for distributed systems where multiple services verify tokens but only one service issues them.' },
      ],
      content: `<p>A JSON Web Token (JWT) is a compact, URL-safe format for representing claims between parties. JWTs are the dominant mechanism for API authentication in modern web applications - a user signs in, the server issues a JWT, and the client includes that token in every subsequent request. Being able to inspect a JWT's contents is an essential debugging skill.</p>

<h2>JWT structure</h2>
<p>Every JWT consists of three base64url-encoded parts separated by dots: <code>header.payload.signature</code>. The header is a JSON object identifying the token type (<code>"typ": "JWT"</code>) and the signing algorithm (<code>"alg": "HS256"</code>). The payload is a JSON object containing claims - statements about the subject (typically a user) and additional metadata. The signature is a cryptographic hash of the encoded header and payload, computed using a secret or private key, which allows the receiver to verify the token was not tampered with.</p>

<h2>Standard claims (the payload)</h2>
<p>The JWT specification defines several standard claims: <code>iss</code> (issuer) identifies who issued the token, <code>sub</code> (subject) identifies the principal the token represents (usually a user ID), <code>aud</code> (audience) identifies who the token is intended for, <code>exp</code> (expiration time) is the Unix timestamp after which the token must be rejected, <code>iat</code> (issued at) is when the token was issued, and <code>nbf</code> (not before) is the earliest time the token is valid. Applications add their own custom claims for authorization context - roles, permissions, tenant IDs, and so on.</p>

<h2>What this tool shows</h2>
<p>This decoder splits the JWT on the dots, base64url-decodes each segment, and pretty-prints the JSON. The header shows the algorithm and token type. The payload shows all claims with timestamps converted to human-readable dates. The signature is shown as-is - this tool does not attempt to verify it because verification requires the signing key, which should never leave the issuing server.</p>

<h2>HS256 versus RS256</h2>
<p>HS256 uses HMAC-SHA256 with a shared secret - both the issuer and the verifier need the same secret key. This is simple but means every service that verifies tokens must have the secret. RS256 uses RSA with a private key for signing and a public key for verification. In a microservices architecture, only the authentication service holds the private key, while every other service can verify tokens using the public key - which can be published freely. RS256 is generally preferred for new systems for this reason.</p>

<h2>Common debugging scenarios</h2>
<p>Most JWT debugging sessions fall into one of four categories: the token has expired (<code>exp</code> is in the past), the token audience does not match the expected value (<code>aud</code> mismatch), a custom claim the application expects is missing from the payload, or the wrong token is being sent (an access token used where a refresh token was expected, or a token from the wrong environment). Pasting the token here instantly reveals which issue it is without writing any code.</p>
<h2>Security considerations for JWTs</h2>
<p>The most dangerous JWT vulnerability is the "algorithm confusion" attack: the signature is valid, but the verifier was tricked into accepting a token signed with the wrong algorithm - most infamously, changing the algorithm from RS256 to HS256 and signing with the public key. Always validate the <code>alg</code> header against a hard-coded expected value on the server, never accept whatever algorithm the token claims. Never validate JWTs in frontend JavaScript - verification requires the secret key, which must never leave your server. The decoder on this page is appropriate for inspection and debugging; production JWT verification belongs in server code.</p>
<h2>Refresh tokens and access token lifecycle</h2>
<p>Most production systems use two types of JWTs: short-lived access tokens (typically 15 minutes to 1 hour) and long-lived refresh tokens (days to weeks). The access token authorizes API requests and has a short lifetime to limit the damage if stolen. The refresh token is used only to obtain new access tokens when the current one expires - it is exchanged with the authorization server and must be kept more secure than the access token. When decoding a JWT that appears to be a refresh token, you will typically see a longer <code>exp</code> value and minimal claims (just a subject and token ID), because the refresh token itself carries no authorization information.</p>
<h2>JWT versus sessions</h2>
<p>JWTs and server-side sessions are two approaches to maintaining authenticated state. JWTs are self-contained - the server can verify them without any database lookup, making them horizontally scalable with no shared session store. The trade-off is revocation: you cannot easily invalidate a JWT before its expiry without maintaining a blocklist, which reintroduces server-side state. Server-side sessions store the session in a database or cache and issue an opaque token; revocation is immediate by deleting the session record. For most web applications, server-side sessions are simpler and revocation-safe; JWTs are valuable for microservices where multiple independent services need to verify the same tokens without accessing a central session store.</p>
`,
    },
    related: ['base64-codec', 'hash-generator', 'json-formatter', 'regex-tester'],
  },

  {
    slug: 'lorem-ipsum-generator',
    name: 'Lorem Ipsum Generator',
    category: 'developer',
    kind: 'client-pure',
    icon: 'text',
    description: 'Generate placeholder text paragraphs for design mockups and prototypes.',
    component: 'LoremIpsumGenerator',
    seo: {
      title: 'Lorem Ipsum Generator - Placeholder Text Generator Free',
      description: 'Generate Lorem Ipsum placeholder text by words, sentences, or paragraphs. Instant, no limits, runs in your browser.',
      keywords: ['lorem ipsum generator', 'placeholder text generator', 'dummy text generator', 'lorem ipsum online', 'blind text generator', 'filler text'],
      faq: [
        { q: 'What is Lorem Ipsum?', a: 'Lorem Ipsum is dummy text derived from "de Finibus Bonorum et Malorum" by Cicero, written in 45 BC. It has been used since the 1500s when a printer scrambled a passage to make a type specimen book. The text is meaningless Latin that looks like readable text, making it ideal for layout previews.' },
        { q: 'Why use Lorem Ipsum instead of real text?', a: 'Readable placeholder text distracts reviewers - they read the content instead of evaluating the design. Lorem Ipsum looks like text at a glance but cannot be read, keeping focus on typography, spacing, and layout.' },
        { q: 'Does Lorem Ipsum have to start with "Lorem ipsum dolor sit amet"?', a: 'No. The traditional opening is conventional but not required. Many modern implementations generate varied openings. Starting with the traditional phrase is a signal to developers that the text is placeholder content.' },
        { q: 'Can I use Lorem Ipsum in production?', a: 'No - Lorem Ipsum is placeholder text for development and design mockups only. Shipping Lorem Ipsum in a production website indicates incomplete content and looks unprofessional.' },
      ],
      content: `<p>Lorem Ipsum has been the standard placeholder text in print and web design for over 500 years. When a designer needs to show a client what a page layout looks like before the real copy is ready, Lorem Ipsum fills that space with text that looks like natural language from a distance without actually saying anything - keeping the audience focused on the design rather than the words.</p>

<h2>The history of Lorem Ipsum</h2>
<p>The text is derived from "de Finibus Bonorum et Malorum" (On the Ends of Good and Evil), a philosophical work by the Roman statesman and orator Marcus Tullius Cicero, written in 45 BC. The standard Lorem Ipsum passage comes from sections 1.10.32 and 1.10.33 of that work. In the 1500s, an unknown printer scrambled a passage to create a type specimen book, creating the "Lorem ipsum" version that begins "Lorem ipsum dolor sit amet, consectetur adipiscing elit..." The passage spread throughout the printing industry and was adopted by desktop publishing software in the 1980s, cementing its status as the universal placeholder text.</p>

<h2>Why Lorem Ipsum works</h2>
<p>The psychological insight behind Lorem Ipsum is simple: people cannot read nonsense words that look like Latin, so they stop trying and evaluate the design instead. When placeholder text is in a real language - even one the reviewer speaks - they unconsciously read it and critique the writing rather than the layout. Lorem Ipsum short-circuits this by being readable in appearance but meaningless in content. It also has approximately the same character distribution as typical Western European text, so it produces realistic text blocks without awkward gaps or overflows.</p>

<h2>When to use real text instead</h2>
<p>Lorem Ipsum is appropriate for early-stage mockups where no real content exists yet. However, for final design reviews and user testing, replace Lorem Ipsum with real or realistic content. Real content often breaks layouts in ways Lorem Ipsum does not - long product names that wrap unexpectedly, translated strings that are twice as long, or headlines that require a second line. Final design sign-off should always happen with realistic content in place.</p>

<h2>Alternatives to Lorem Ipsum</h2>
<p>Several variants address specific needs. "Cupcake Ipsum" and "Bacon Ipsum" generate food-themed placeholder text that is less formal. "Corporate Ipsum" generates business jargon for corporate design mockups. "Hipster Ipsum" generates trendy placeholder text. For content that should feel realistic without revealing sensitive information - user names in a dashboard mockup, for example - structured fake data generators are more appropriate than Lorem Ipsum.</p>

<h2>Using Lorem Ipsum responsibly</h2>
<p>The cardinal rule of Lorem Ipsum is: remove it before shipping to production. Lorem Ipsum in a live website signals to visitors and search engines that the page has not been properly prepared. Search engines index Lorem Ipsum as content, but it provides no SEO value and may trigger thin-content penalties. Always audit your production codebase for Lorem Ipsum before major releases, especially if you work with templates that may have pre-populated placeholder text.</p>
<h2>Alternatives for specific content types</h2>
<p>Lorem Ipsum is appropriate for general layout testing but specific content types benefit from more realistic placeholders. For names: use a fake-data generator that produces culturally appropriate names for your target audience. For addresses: use realistic-format fake addresses rather than Lorem text. For numbers and prices: use realistic ranges rather than placeholder zeros. For dates: use future or past dates in the appropriate format for the UI you are designing. For images: use placeholder image services (placeholder.com, picsum.photos) that return images at specified dimensions. ToolOrbit's Fake Data Generator tool covers most of these use cases in one interface.</p>
<h2>Lorem Ipsum in design systems</h2>
<p>At the design system level, Lorem Ipsum plays an important role in component documentation: showing how a component handles text of different lengths, how line wrapping behaves, and what the component looks like with long versus short content. A button component documented only with a two-word label does not reveal how it handles a five-word label that wraps; Lorem Ipsum at various lengths surfaces these edge cases during the design phase rather than during implementation. Design system documentation conventionally uses Lorem Ipsum specifically so that the text is obviously placeholder - readers understand they should evaluate the layout, not the content.</p>
<h2>Generating contextual placeholder text</h2>
<p>For more realistic prototyping, consider alternatives tailored to your domain. Cupcake Ipsum and Bacon Ipsum generate food-themed text. Samuel L. Ipsum generates text in the actor's distinctive style. Fillerama generates placeholder text from pop-culture sources. For technical documentation mockups, using real - but non-sensitive - technical text from open-source documentation often produces more realistic results than Lorem Ipsum, because the character distribution of technical English (with frequent code snippets and URLs) differs from standard Lorem Ipsum. The choice matters when you need to evaluate how technical text flows in a specific layout context.</p>
`,
    },
    related: ['word-counter', 'case-converter', 'text-diff', 'json-formatter'],
  },
];
