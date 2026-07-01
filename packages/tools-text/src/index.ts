import type { ToolDefinition } from '@toolorbit/tool-types';

export const textTools: ToolDefinition[] = [
  {
    slug: 'word-counter',
    name: 'Word Counter',
    category: 'text',
    kind: 'client-pure',
    icon: 'type',
    description: 'Count words, characters, sentences, paragraphs, and reading time in real time.',
    component: 'WordCounter',
    seo: {
      title: 'Word Counter - Count Words Characters Sentences Free',
      description: 'Count words, characters, sentences, paragraphs, and estimate reading time in real time. Free, no signup, works in your browser.',
      keywords: ['word counter', 'character counter', 'word count tool online', 'count words free', 'text word count', 'word counter online'],
      faq: [
        { q: 'How is a "word" defined?', a: 'A word is any sequence of non-whitespace characters separated by whitespace. Hyphenated words like "well-known" count as one word. Numbers, contractions, and abbreviations each count as one word.' },
        { q: 'How is reading time calculated?', a: 'Reading time is estimated at 200–250 words per minute, which is a commonly cited average adult reading speed for general text. Academic or technical text is read more slowly; simple prose more quickly.' },
        { q: 'Does the character count include or exclude spaces?', a: 'Both counts are shown: characters with spaces (total characters including spaces) and characters without spaces (only non-whitespace characters). Many platforms like Twitter count with spaces included.' },
        { q: 'Can I count words in a PDF or Word document?', a: 'Paste the text here after extracting it. For PDFs, use the browser\'s select-all and copy. For Word documents, the built-in word count (Ctrl+Shift+G) may be more convenient.' },
      ],
      content: `<p>Knowing your word count is a fundamental requirement for many writing tasks. Academic assignments have strict word limits that must be respected within a narrow range. SEO content guidelines specify minimum word counts for ranking competitiveness. Social media platforms enforce character limits that punish over-long posts. Professional writers set daily word targets as productivity metrics. This tool provides all the essential text statistics in real time as you type or paste.</p>

<h2>What the statistics mean</h2>
<p>Word count is the number of whitespace-delimited tokens in the text. A hyphenated compound like "state-of-the-art" counts as one word, not four. Character count exists in two forms: with spaces (including every whitespace character) and without spaces (only printable, non-whitespace characters). Social platforms like Twitter and LinkedIn count characters with spaces included, so this count is the relevant one for social media copywriting. Sentence count uses punctuation marks (period, exclamation, question mark) as sentence boundaries. Paragraph count uses double line breaks. These counts are approximations - complex texts with quoted dialogue, lists, and unconventional punctuation may produce counts that differ slightly from human counting.</p>

<h2>Reading time estimation</h2>
<p>Average adult reading speed for general prose is commonly measured at 200–250 words per minute. This tool estimates reading time at 225 WPM, which is a reasonable middle estimate. The estimate is meaningful as a planning tool - an 800-word blog post should take about 3.5 minutes to read, which is a useful benchmark for matching content length to expected audience attention spans. Technical content, academic writing, and text in a reader's non-native language are typically read at slower speeds (100–180 WPM); highly engaging narrative prose may be read faster.</p>

<h2>Academic word count requirements</h2>
<p>University assignments typically specify word counts within a band - "1500–2000 words" - with penalties for submissions significantly over or under the target. Most institutions specify whether the count includes or excludes the abstract, bibliography, footnotes, and figure captions. Always check your institution's specific guidelines. Note that your word processor's built-in count may differ slightly from online tools due to differences in how headers, footnotes, and text boxes are handled - for official submission purposes, use your institution's specified counting method.</p>

<h2>SEO and content marketing implications</h2>
<p>Search engine optimization research has consistently shown correlations between content length and ranking performance for informational queries, though the relationship is not a simple "longer is always better." Google's own guidance emphasizes that content should be "as long as necessary to cover the topic" - typically 600–2000 words for well-covered topics, sometimes more for comprehensive reference content. The word count target matters less than whether the content genuinely addresses what the searcher needs. This tool helps you verify that your content hits a minimum threshold while keeping you aware when content may be unnecessarily padded.</p>

<h2>Character limits by platform</h2>
<p>Twitter/X allows 280 characters per post. A thread can link multiple posts. Instagram captions allow 2,200 characters. Facebook posts can be up to 63,206 characters, though feed display truncates at ~400. LinkedIn updates show up to 1,300 characters before a "see more" truncation. YouTube descriptions allow 5,000 characters. Meta descriptions for SEO should stay under 160 characters to avoid truncation in search results. Title tags should stay under 60 characters for the same reason. Knowing these limits helps you write efficiently within them rather than cutting after the fact.</p>
<h2>Word count across languages</h2>
<p>The word count metric is well-defined for Latin-script languages (English, Spanish, French, German, etc.) where words are separated by spaces. For languages without clear word boundaries - Chinese, Japanese, Korean, Thai - a space-based word count produces meaningless results. Chinese and Japanese content is typically measured in characters rather than words. Thai uses spaces between phrases rather than individual words. This tool uses whitespace splitting, making it accurate for all languages that use space-delimited words and approximate or meaningless for ideographic writing systems. For accurate word counting in CJK languages, a specialized tokenizer is required.</p>
<h2>Academic word count for multilingual students</h2>
<p>Students writing in English as a second language for academic submission face an additional challenge: their word count may vary depending on which tool they use, because some processors count hyphenated compounds differently or handle contractions differently. Most UK university marking guidelines specify "words" as tokens separated by spaces, which is what this tool implements. If your institution uses Microsoft Word for official submission, verify your count using Word's built-in counter (Tools → Word Count on Mac, Review tab on Windows) because submission portals sometimes cross-reference the Word document's metadata count against the declared word count in the submission form.</p>
`,
    },
    related: ['case-converter', 'text-diff', 'lorem-ipsum-generator', 'duplicate-line-remover'],
  },

  {
    slug: 'case-converter',
    name: 'Case Converter',
    category: 'text',
    kind: 'client-pure',
    icon: 'case-sensitive',
    description: 'Convert text between UPPERCASE, lowercase, Title Case, camelCase, and snake_case.',
    component: 'CaseConverter',
    seo: {
      title: 'Case Converter - Convert Text Case Free Online Tool',
      description: 'Convert text between uppercase, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, and kebab-case instantly.',
      keywords: ['case converter', 'text case converter', 'uppercase to lowercase', 'camelcase converter', 'snake case converter', 'title case converter online'],
      faq: [
        { q: 'What is camelCase?', a: 'camelCase writes compound words with no spaces, each word (except the first) starting with a capital letter: myVariableName. It is the conventional naming style for variables in JavaScript, Java, and Swift.' },
        { q: 'What is the difference between camelCase and PascalCase?', a: 'Both are compound words without spaces. camelCase starts with a lowercase letter (myName). PascalCase (also called UpperCamelCase) starts with an uppercase letter (MyName). PascalCase is used for class names in most object-oriented languages.' },
        { q: 'What is Title Case?', a: 'Title Case capitalizes the first letter of every "major" word, leaving articles (a, an, the), conjunctions (and, but, or), and short prepositions lowercase unless they start the title. This tool applies the Chicago Manual of Style title case rules.' },
        { q: 'What is kebab-case?', a: 'kebab-case writes all words in lowercase separated by hyphens: my-component-name. It is the conventional naming style for HTML attributes, CSS custom properties, and URL slugs.' },
      ],
      content: `<p>Text case conversion is needed constantly in software development and content creation. Variable naming conventions differ by language: JavaScript uses camelCase, Python uses snake_case, CSS uses kebab-case, and most OOP languages use PascalCase for class names. Content writing requires converting between Sentence case and Title Case depending on context. Copying data between systems often requires normalizing the case of identifiers. This tool handles all standard case conversions with one click.</p>

<h2>The eight case formats</h2>
<p>UPPERCASE converts every letter to its uppercase equivalent - used for constants in many programming languages (<code>MAX_RETRIES</code>, <code>API_BASE_URL</code>), for emphasis in informal text, and in certain legal and formal document contexts. lowercase converts every letter to lowercase - used for email addresses, URLs, and domain names. Title Case capitalizes the first letter of major words, following typographic conventions for article and book titles, headings, and proper names. Sentence case capitalizes only the first letter of the first word and proper nouns, which is the standard for body text and most UI labels. camelCase joins words without spaces, lowercasing the first word and capitalizing subsequent words - the standard for variable and function names in JavaScript, TypeScript, Java, Kotlin, and Swift. PascalCase (UpperCamelCase) does the same but also capitalizes the first word - standard for class names, React component names, and type names in TypeScript. snake_case joins words with underscores in lowercase - standard for Python variable and function names, database column names, and file names in many conventions. kebab-case joins words with hyphens in lowercase - standard for CSS class names, HTML attributes, URL path segments, and npm package names.</p>

<h2>Converting between programming conventions</h2>
<p>The most common development use case is converting between naming conventions when moving code between codebases with different style guides, or when transforming data from one API format to another. A REST API returning JSON with <code>snake_case</code> property names needs to be converted to <code>camelCase</code> for use in a JavaScript client. Database column names in <code>snake_case</code> need to become <code>camelCase</code> properties in a TypeScript interface. CSS class names in <code>kebab-case</code> need to become JavaScript object keys, which require <code>camelCase</code>. This tool's programmatic conversion modes handle all of these accurately.</p>

<h2>Title case conventions</h2>
<p>Title case is more complex than it appears because English grammar distinguishes between "major" words (nouns, verbs, adjectives, adverbs) that should be capitalized and "minor" words (articles, conjunctions, short prepositions) that should not - unless they begin the title. Different style guides disagree on exactly which words are "minor": the Chicago Manual of Style, Associated Press style, APA style, and MLA style each have slightly different rules. This tool applies the Chicago Manual rules, which are the most commonly followed in book and article publishing.</p>

<h2>Sentence case for UI text</h2>
<p>Most modern design systems - including those from Google (Material Design) and Apple (Human Interface Guidelines) - recommend sentence case rather than title case for UI labels, button text, and menu items. Sentence case is more readable at small sizes and feels more conversational. This is why Gmail says "Compose" not "Compose New Email," why Slack says "New message" not "New Message," and why contemporary SaaS products use sentence case throughout. Converting a UI copy draft from title case to sentence case is one of the most common uses of this tool in content and design work.</p>
<h2>Automated case conversion in code</h2>
<p>Most string utility libraries provide case conversion functions. In JavaScript/TypeScript, the <code>change-case</code> npm package covers all standard conventions: <code>camelCase()</code>, <code>pascalCase()</code>, <code>snakeCase()</code>, <code>kebabCase()</code>, <code>constantCase()</code>. Python's standard library handles simple conversions (<code>str.upper()</code>, <code>str.lower()</code>, <code>str.title()</code>), and the <code>inflection</code> package adds underscore/camelCase conversion. In Go, there is no standard title-case function because English title case rules are considered locale-specific; third-party libraries like <code>gocase</code> provide full conversion support. For database migration scenarios where you need to convert all column names from snake_case to camelCase in a schema file, a short script using these libraries is more reliable than manual conversion for more than a dozen fields.</p>
<h2>Localization and non-ASCII case conversion</h2>
<p>Uppercase and lowercase conversion is not always simple for non-ASCII characters. German <code>ß</code> uppercases to <code>SS</code> (two characters, not one). Turkish has a dotted lowercase <code>i</code> that uppercases to <code>İ</code> (with dot) and a dotless uppercase <code>I</code> that lowercases to <code>ı</code> (without dot) - the opposite of English convention. Greek has final sigma <code>ς</code> at end of words that becomes <code>Σ</code> when uppercased. JavaScript's <code>toUpperCase()</code> handles most of these correctly for most locales; <code>toLocaleUpperCase('tr')</code> handles the Turkish case specifically. This tool uses standard JavaScript case methods, which are correct for English and most Latin-script content.</p>
`,
    },
    related: ['word-counter', 'text-diff', 'string-reverse', 'whitespace-remover'],
  },

  {
    slug: 'duplicate-line-remover',
    name: 'Duplicate Line Remover',
    category: 'text',
    kind: 'client-pure',
    icon: 'list-minus',
    description: 'Remove duplicate lines from any text, with options to sort and trim whitespace.',
    component: 'DuplicateLineRemover',
    seo: {
      title: 'Duplicate Line Remover - Remove Duplicate Lines Free',
      description: 'Remove duplicate lines from text lists instantly. Sort alphabetically, ignore case, trim whitespace. Free, runs in your browser.',
      keywords: ['remove duplicate lines', 'duplicate line remover', 'deduplicate text', 'unique lines extractor', 'remove duplicates from list', 'text deduplicator online'],
      faq: [
        { q: 'Is the comparison case-sensitive?', a: 'By default yes - "Apple" and "apple" are treated as different lines. Enable the "ignore case" option to treat them as duplicates and keep only one.' },
        { q: 'Does it preserve the original order?', a: 'By default, the first occurrence of each line is kept and subsequent duplicates are removed, preserving the original line order. Enable "sort output" to alphabetically sort the unique lines after deduplication.' },
        { q: 'Can I use this on email lists or CSV data?', a: 'Yes. Each line is treated as one entry. For CSV data, deduplication works on entire lines - not just individual columns. If you need to deduplicate on a specific CSV column, a spreadsheet tool is more appropriate.' },
        { q: 'Are empty lines treated as duplicates?', a: 'Empty lines are treated as a line containing an empty string. If there are multiple empty lines, they will be deduplicated to a single empty line unless you enable the "remove empty lines" option to remove all of them.' },
      ],
      content: `<p>Duplicate lines appear in many real-world text processing tasks: combining keyword lists from multiple sources, merging email lists, consolidating log entries, processing CSV exports with repeated values, cleaning up copied code, and combining data from multiple spreadsheet exports. Manually finding and removing duplicates is tedious and error-prone for anything beyond a few dozen lines. This tool handles thousands of lines in milliseconds entirely in your browser.</p>

<h2>Common deduplication scenarios</h2>
<p>SEO keyword research typically involves pulling keywords from multiple tools (Google Keyword Planner, Ahrefs, SEMrush, Google Search Console) and combining them into a master list. Each tool exports keywords independently, so the combined list will have significant overlap. Pasting the combined list here removes every duplicate keyword, leaving only the unique entries. Email list management often requires merging subscribers from multiple forms, imports, and manually-added entries - deduplication is a prerequisite for any responsible email campaign, preventing the same contact from receiving multiple copies. Log file analysis sometimes requires finding the unique set of IP addresses, user agents, or error messages from files with repeated entries. Code cleanup sometimes requires removing duplicate import statements, duplicate CSS rules, or duplicate list entries in configuration files.</p>

<h2>Processing options</h2>
<p>Case sensitivity controls whether "Email" and "email" are treated as the same line or different lines. Most list deduplication tasks - keywords, domain names, email addresses - are best handled case-insensitively, since "EXAMPLE.COM" and "example.com" are clearly the same entry. Programming tasks - where variable names and string literals are case-sensitive - should use case-sensitive mode. Whitespace trimming removes leading and trailing spaces from each line before comparison, which prevents "  apple" and "apple" from being treated as different entries when the difference is only invisible whitespace. Sort output reorders the unique lines alphabetically, which is often desired for the final cleaned list regardless of the original order.</p>

<h2>How deduplication works</h2>
<p>The tool splits the input on newlines, optionally trims whitespace from each line, and builds a Set (a data structure that stores only unique values) in JavaScript. Since JavaScript Sets maintain insertion order, the original order of first occurrences is preserved by default. The Set is then converted back to an array, optionally sorted, and joined back into a string with newline separators. This is the same logic as the Unix command-line pipeline <code>sort | uniq</code>, but with the "sort" step optional rather than mandatory (Unix's <code>uniq</code> only removes adjacent duplicates, requiring a prior <code>sort</code>).</p>

<h2>Performance on large inputs</h2>
<p>Browser-side deduplication using JavaScript's native Set is extremely fast. A 50,000-line list is typically processed in under 100 milliseconds on any modern device. Memory usage is proportional to the total size of unique lines - a 50,000-line list of short keywords (under 50 characters each) typically uses under 5MB of browser memory, well within safe limits. For truly massive datasets (millions of lines), a command-line tool or database query would be more appropriate.</p>
<h2>Deduplication versus normalization</h2>
<p>Deduplication removes exact (or case-insensitive) duplicate lines. Normalization is a related but broader operation that also makes equivalent representations identical before deduplication. For example, "  hello  " and "hello" are not duplicates after whitespace trimming, but could be normalized to the same value. Email addresses "User@Example.com" and "user@example.com" are the same address (email local parts are case-insensitive) but appear different without normalization. Domain names are case-insensitive so "Example.COM" and "example.com" should deduplicate to one. This tool handles whitespace trimming and case-insensitive matching; domain-specific normalization (lowercasing email addresses, normalizing URL formats) is best handled in a script or spreadsheet formula before using the deduplication tool.</p>
<h2>Deduplication for data quality in marketing</h2>
<p>Email marketing list deduplication is a legal and deliverability requirement, not just good practice. Most email service providers (Mailchimp, Klaviyo, ActiveCampaign) deduplicate contacts by email address automatically at import. However, exporting a list, editing it externally, and re-importing can reintroduce duplicates. Before any email campaign, run the contact list through deduplication and check for near-duplicates (same name, slightly different email format) that automated deduplication misses. In GDPR and CAN-SPAM contexts, sending duplicate emails to the same person can be considered a violation of unsubscribe requests if one version of the address was unsubscribed and the duplicate was not.</p>
`,
    },
    related: ['word-counter', 'text-diff', 'case-converter', 'whitespace-remover'],
  },

  {
    slug: 'text-diff',
    name: 'Text Diff Checker',
    category: 'text',
    kind: 'client-pure',
    icon: 'git-compare',
    description: 'Compare two texts side by side and highlight every addition, deletion, and change.',
    component: 'TextDiff',
    seo: {
      title: 'Text Diff Checker - Compare Two Texts Online Free',
      description: 'Compare two texts and see differences highlighted - additions in green, deletions in red. Side-by-side and inline views. Runs in your browser.',
      keywords: ['text diff', 'text compare', 'diff checker online', 'compare two texts', 'find text differences', 'text comparison tool free'],
      faq: [
        { q: 'What algorithm does this use for diffing?', a: 'This tool uses the Myers diff algorithm, the same algorithm used by Git, GNU diff, and most source control systems. It finds the shortest edit script (the minimum set of insertions and deletions) needed to transform one text into another.' },
        { q: 'Can I compare code files?', a: 'Yes. The diff works on any text content - code, prose, CSV data, JSON, config files. For code, whitespace sensitivity matters: "ignore whitespace" mode treats indentation differences as non-significant, as git diff --ignore-space-change does.' },
        { q: 'Does it diff character by character or line by line?', a: 'By default, line by line - matching Git\'s standard behavior. Enable word-level diffing for prose documents where you want to see exactly which words were changed within a modified line.' },
        { q: 'Can I use this to find changes between two versions of a document?', a: 'Yes. Copy the old version into the left panel and the new version into the right panel. Every change is highlighted: additions (text in the new but not the old) in green, deletions (text in the old but not the new) in red.' },
      ],
      content: `<p>Comparing two versions of text to find what changed is a fundamental task in writing, software development, data validation, and legal review. The diff tool - originally developed for source control systems - surfaces every addition, deletion, and modification between two text inputs in a clearly readable format. This browser-based implementation uses the Myers diff algorithm (the same algorithm powering Git's diff output) and runs entirely client-side.</p>

<h2>How the Myers diff algorithm works</h2>
<p>Diffing two texts is fundamentally a problem of finding the Longest Common Subsequence (LCS) - the largest set of lines that appear in both texts in the same order. Once the LCS is found, lines in the first text that are not in the LCS are deletions, and lines in the second text that are not in the LCS are insertions. The Myers algorithm solves this efficiently in O(ND) time, where N is the total number of lines and D is the number of differences, making it fast even for large documents with few changes.</p>

<h2>Line-level versus word-level diffing</h2>
<p>Line-level diffing marks an entire line as changed if any part of it differs. This is the standard mode for code review, where you want to see which lines a change touched. Word-level diffing marks only the specific words within a changed line that are different, which is more useful for prose editing - when a sentence was lightly revised, you want to see exactly which words changed, not that the whole sentence was replaced. This tool supports both modes; the appropriate choice depends on whether you are reviewing code or written content.</p>

<h2>Use cases by profession</h2>
<p>Software developers use text diff to review changes before committing, understand what changed between two configuration versions, or compare the output of two different algorithms. Technical writers use it to compare document revisions, verify that edits were applied correctly, and produce a change log for document versions. Legal professionals use it to compare contract versions, identifying the specific clause changes between draft iterations - a critical task where missing a change can have significant consequences. Data engineers use it to compare export snapshots and confirm which records changed between runs. Educators use it to compare student submissions across assignments for originality checking.</p>

<h2>Whitespace handling</h2>
<p>Whitespace differences - extra spaces, different indentation, trailing spaces - can clutter a diff when you are only interested in meaningful content changes. The "ignore whitespace" option normalizes whitespace before diffing, treating lines that differ only in their spacing as identical. This is equivalent to <code>git diff --ignore-space-change</code> and is particularly useful when comparing code that was reformatted (by a linter, a different editor, or a code formatter) without any logical changes to the content.</p>

<h2>Exporting the diff</h2>
<p>The tool displays the diff in a colored side-by-side view. For documentation purposes, a unified diff format (the same format used by Git's patch files) can be copied from the output panel. Unified diff format is universally understood by version control tools and code review platforms, making it suitable for sharing with collaborators who need to apply the changes to their own copies of the text.</p>
<h2>Using diff output in code review</h2>
<p>The unified diff format output of this tool (the <code>@@ -line,count +line,count @@</code> format) is directly usable as a patch file. Save the diff output as <code>changes.patch</code> and apply it with <code>patch -p0 < changes.patch</code> on Linux/macOS. This workflow is useful when you need to propose changes to a text file without direct repository access - the recipient can review the diff and apply it if they approve, without needing to manually identify what changed between two versions. Code review systems (GitHub, GitLab, Gerrit) all display diffs in this format; understanding how to read unified diff notation is a fundamental skill for any developer participating in code review.</p>
<h2>Diff for configuration management</h2>
<p>System administrators and DevOps engineers use diff extensively for configuration management: comparing a production server's config file against the intended configuration in version control, identifying what changed between two versions of a deployed configuration, and auditing changes after an incident. For infrastructure-as-code (Terraform, Ansible, Kubernetes manifests), <code>terraform plan</code> and <code>kubectl diff</code> are built-in diff tools that show what will change before applying. When those tools are not available - for example, comparing two exported configuration snapshots - this tool provides the same diff capability without any software installation.</p>
`,
    },
    related: ['word-counter', 'duplicate-line-remover', 'regex-tester', 'json-formatter'],
  },

  {
    slug: 'string-reverse',
    name: 'String Reverser',
    category: 'text',
    kind: 'client-pure',
    icon: 'arrow-left-right',
    description: 'Reverse a string character by character or word by word.',
    component: 'StringReverse',
    seo: {
      title: 'String Reverser - Reverse Text Online Free',
      description: 'Reverse text character by character or word by word instantly. Useful for programming exercises, palindrome detection, and text manipulation.',
      keywords: ['reverse string', 'reverse text online', 'string reverser free', 'flip text backwards', 'reverse words online', 'backwards text generator'],
      faq: [
        { q: 'What is the difference between character reversal and word reversal?', a: 'Character reversal reverses the entire string letter by letter: "Hello World" becomes "dlroW olleH". Word reversal reverses the order of words while keeping each word\'s letters in order: "Hello World" becomes "World Hello".' },
        { q: 'Does this handle Unicode and emoji correctly?', a: 'Yes. The tool uses the spread operator ([...str]) to split the string into Unicode code points rather than UTF-16 code units, which handles multi-byte characters and emoji correctly. "😀🎉" reverses to "🎉😀" without corrupting the emoji.' },
        { q: 'Why would I need to reverse a string?', a: 'Common uses: checking if a string is a palindrome (it reads the same forwards and backwards), algorithm practice (reversing strings is a classic coding interview problem), generating backwards watermarks, and creating decorative backwards text effects.' },
        { q: 'Can I reverse lines in a multi-line text?', a: 'Yes. Line-reverse mode reverses the order of lines while keeping each line\'s content intact - the last line becomes the first, and so on.' },
      ],
      content: `<p>String reversal is one of the most fundamental text manipulation operations in programming, appearing in algorithm challenges, palindrome detection, data transformation, and creative text effects. This tool provides three modes: character-by-character reversal, word-order reversal, and line-order reversal, covering the full range of common reversal use cases.</p>

<h2>Character reversal</h2>
<p>Character reversal takes each character in the input from last to first, producing a string where every character's position is mirrored around the center. "Hello" becomes "olleH." "racecar" remains "racecar" (a palindrome). Character reversal is the most common type and the default mode. The implementation uses <code>[...str].reverse().join('')</code> in JavaScript, which correctly handles Unicode characters including emoji. The spread operator splits the string into an array of Unicode code points (not UTF-16 code units), which means characters represented by surrogate pairs in UTF-16 - emoji, rare Chinese and Japanese characters, and most symbols outside the Basic Multilingual Plane - are treated as single characters and reversed correctly.</p>

<h2>Word-order reversal</h2>
<p>Word-order reversal keeps each word's internal characters in their original order but reverses the sequence of words. "The quick brown fox" becomes "fox brown quick The." This is useful for analyzing sentence structure, creating word-order variants for linguistic study, or implementing the "reverse words in a sentence" algorithm problem that frequently appears in programming interviews. The tool splits on whitespace, reverses the resulting array, and rejoins with single spaces - normalizing any extra whitespace in the process.</p>

<h2>Palindrome detection</h2>
<p>A palindrome is a string that reads the same forwards and backwards. "racecar," "level," "madam," "A man, a plan, a canal: Panama" (ignoring spaces, punctuation, and case) are all palindromes. This tool highlights whether the reversed output matches the original input, making palindrome checking a one-paste operation. For linguistic palindromes (the "A man, a plan" type), you need to normalize the input by removing non-letter characters and lowercasing before comparing - the tool's "normalize" option does this automatically.</p>

<h2>Creative and decorative uses</h2>
<p>Backwards text generators have a history of use in music (the Beatles included backwards guitar on "I'm Only Sleeping"), in visual art and typography, in cryptic writing styles, and in puzzles. While backwards English text is not a cipher (it is trivially reversed), it is visually distinctive and has been used as a stylistic choice in brand names, usernames, and creative writing. The "ǝpoɔıun" flipped text effect (using upside-down Unicode characters) is a related but different operation from simple character reversal.</p>

<h2>Line reversal</h2>
<p>Line reversal reorders the lines of a multi-line input from last to first. This is useful for reversing chronological data - converting a log file or changelog from newest-first to oldest-first, or vice versa. The Unix equivalent is the <code>tac</code> command (the reverse of <code>cat</code>). This mode splits on newlines, reverses the array, and rejoins - preserving each line's content while inverting the document's line order.</p>
<h2>Palindrome detection algorithms</h2>
<p>Detecting whether a string is a palindrome is a classic programming interview problem with multiple solution approaches. The naive approach - reverse the string and compare to the original - has O(n) time and O(n) space complexity. The two-pointer approach - comparing characters from both ends moving inward - has O(n) time and O(1) space. For "relaxed" palindrome checking that ignores spaces, punctuation, and case (as in "A man, a plan, a canal: Panama"), preprocessing the string to remove non-alphanumeric characters and lowercase everything before applying either approach is required. This tool's reversal output makes the naive approach immediately visible - paste your string, check if the reversed output matches the original.</p>
<h2>Reversing strings in interview contexts</h2>
<p>String reversal is one of the most common warm-up questions in technical interviews precisely because it has multiple correct implementations with different trade-offs. In Python: <code>s[::-1]</code> (slice notation), <code>''.join(reversed(s))</code>, or an iterative loop. In JavaScript: <code>[...s].reverse().join('')</code> (the spread operator is important for correct Unicode handling). In Java: <code>new StringBuilder(s).reverse().toString()</code>. Interviewers often follow up with constraints: "do it in-place" (requires a char array in languages with mutable strings), "handle Unicode correctly" (requires code point iteration rather than char index iteration), or "reverse only the words but not the characters within each word" (requires splitting and reversing the word array). Understanding these variants is as important as knowing the basic implementation.</p>
`,
    },
    related: ['case-converter', 'word-counter', 'text-diff', 'whitespace-remover'],
  },

  {
    slug: 'whitespace-remover',
    name: 'Whitespace Remover',
    category: 'text',
    kind: 'client-pure',
    icon: 'remove-formatting',
    description: 'Strip extra spaces, tabs, leading/trailing whitespace, and blank lines from text.',
    component: 'WhitespaceRemover',
    seo: {
      title: 'Whitespace Remover - Clean Up Text Spaces & Tabs Free',
      description: 'Remove extra spaces, trim line whitespace, collapse blank lines, strip tabs. Clean messy text instantly. Runs in your browser.',
      keywords: ['whitespace remover', 'remove extra spaces', 'trim whitespace online', 'strip spaces text', 'clean text whitespace', 'remove blank lines online'],
      faq: [
        { q: 'What types of whitespace does this remove?', a: 'The tool handles spaces, tabs, non-breaking spaces (\\u00A0, common in copied HTML), zero-width spaces, and carriage returns. Each type can be handled separately.' },
        { q: 'What is a non-breaking space?', a: 'A non-breaking space (\\u00A0) looks identical to a regular space but prevents line breaks and does not collapse in HTML. It frequently appears when text is copied from web pages or word processors. Many tools that look for spaces using \\s in regex miss non-breaking spaces.' },
        { q: 'What does "trim lines" do?', a: 'Trim lines removes leading (before the first non-space character) and trailing (after the last non-space character) whitespace from every line. This is equivalent to calling .trim() on each line independently.' },
        { q: 'Can this clean up text pasted from a PDF or Word document?', a: 'Yes. PDF and Word copy-paste often introduces non-breaking spaces, extra spaces, soft hyphens, and other invisible characters. This tool removes all common invisible whitespace types.' },
      ],
      content: `<p>Text pasted from web pages, PDFs, Word documents, and spreadsheets almost always contains unwanted whitespace: extra spaces between words, non-breaking spaces that look like regular spaces but are invisible to many search-and-replace tools, leading and trailing spaces on every line, tabs mixed with spaces, and blank lines where there should be none. Cleaning this whitespace manually is error-prone and slow. This tool handles every common whitespace normalization task in one pass.</p>

<h2>Types of whitespace characters</h2>
<p>Not all spaces are the same character. The regular space (U+0020) is what you type with the spacebar. The non-breaking space (U+00A0, also written &amp;nbsp; in HTML) prevents the browser from wrapping at that position. Non-breaking spaces are extremely common in text copied from web pages, because HTML often uses them for layout purposes. They look identical to regular spaces on screen but are treated differently by search engines, text parsers, and most programming language string functions. The tab character (U+0009) is another common intruder - spreadsheet exports often use tabs as column separators, and some code editors insert tabs instead of spaces. The zero-width space (U+200B) is completely invisible but present in some copy-pasted text from rich-text editors. This tool identifies and handles all of these.</p>

<h2>Trim versus collapse</h2>
<p>Trimming removes whitespace from the beginning and end of a line or the entire string. Collapsing replaces any run of multiple spaces (or whitespace characters) with a single space. These are different operations with different use cases. If you have text where words are separated by multiple spaces - often produced by fixed-width PDF export or OCR - you want collapsing (reducing "hello    world" to "hello world") but not necessarily trimming. If you have text where lines have trailing spaces from a spreadsheet export, you want trimming but may not need internal collapse.</p>

<h2>Handling blank lines</h2>
<p>Blank lines - lines containing only whitespace - can accumulate from multiple sources: copy-paste from HTML that has visual spacing implemented with empty paragraphs, section breaks in documents, list separators, and so on. The tool's "remove blank lines" option removes entirely empty lines. The "collapse multiple blank lines" option reduces runs of multiple consecutive blank lines to a single blank line (preserving paragraph breaks while eliminating excessive spacing). Choose based on whether blank lines in your specific text are meaningful paragraph separators or unwanted artifacts.</p>

<h2>Data cleaning for programming</h2>
<p>When processing user-supplied text in a web application, whitespace normalization is often the first step: trim leading and trailing whitespace, collapse internal runs of spaces to a single space, and normalize newlines to <code>\n</code> (since Windows line endings use <code>\r\n</code> and old Mac line endings used <code>\r</code>). This tool applies all of these transformations, making it useful for preparing test data that represents what a web form might submit, or for normalizing data exported from systems with inconsistent whitespace handling.</p>

<h2>Spreadsheet and CSV data</h2>
<p>CSV files exported from spreadsheets often have trailing spaces in cell values - a result of fixed-width data storage in some database systems. When these CSVs are imported into another system, the extra spaces cause string comparison failures ("John " does not equal "John"), duplicate key errors, and display issues. Running the exported CSV through the "trim lines" option cleans all of these consistently.</p>
<h2>Invisible characters that are not whitespace</h2>
<p>Beyond standard whitespace, text pasted from the web can contain other invisible characters that cause unexpected behavior: the zero-width non-joiner (U+200C), zero-width joiner (U+200D), and word joiner (U+2060) are used in typography to control line breaking. The soft hyphen (U+00AD) is visible only when a line break occurs at that position. The byte order mark (U+FEFF) sometimes appears at the start of text files exported from Windows tools. The right-to-left override (U+202E) and left-to-right override (U+202D) can cause text to display in unexpected directions. This tool removes standard whitespace types (spaces, tabs, non-breaking spaces, carriage returns); for removing arbitrary Unicode control characters, use a regex replacement: <code>str.replace(/[​-‍﻿‬-‮]/g, '')</code>.</p>
<h2>Whitespace in CSV and data processing</h2>
<p>CSV files from different sources frequently have inconsistent whitespace handling that causes data quality problems at import. Some exporters quote every field ("John Smith") while others export unquoted (John Smith). Some add a space after the comma delimiter (name, email, phone) while others do not. Trailing spaces in field values cause comparison mismatches - "John" does not equal "John " in SQL WHERE clauses or spreadsheet VLOOKUP functions. Before importing CSV data into a database or analytics tool, run the file through a whitespace normalization step: trim each field, normalize internal spaces, and standardize line endings. This tool handles the text-level normalization; for CSV-specific field trimming, a spreadsheet TRIM() function or a pandas <code>df.apply(str.strip)</code> operation is more appropriate.</p>
`,
    },
    related: ['word-counter', 'duplicate-line-remover', 'case-converter', 'text-diff'],
  },
];
