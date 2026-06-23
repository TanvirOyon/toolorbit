import type { ToolDefinition } from '@toolorbit/tool-registry';

export const textTools: ToolDefinition[] = [
  {
    slug: 'word-counter',
    name: 'Word Counter',
    category: 'text',
    kind: 'client-pure',
    icon: 'file-text',
    description: 'Count words, characters, sentences, and paragraphs in any text instantly.',
    component: 'WordCounter',
    seo: {
      title: 'Word Counter — Count Words, Characters, Sentences Online Free',
      description:
        'Count words, characters (with and without spaces), sentences, and paragraphs instantly as you type. Free online word counter with real-time stats.',
      keywords: ['word counter', 'character counter', 'word count tool', 'count words online', 'word counter free'],
      faq: [
        { q: 'Does it count hyphenated words as one or two words?', a: 'Hyphenated words like "well-known" are counted as one word, matching the convention used by most word processors.' },
        { q: 'How are sentences detected?', a: 'Sentences are detected by looking for terminal punctuation (period, exclamation mark, question mark) followed by a space or end of text. Very informal text without punctuation may be undercounted.' },
        { q: 'Is there a character limit?', a: 'No. The counter handles any amount of text you paste in, processing it entirely in your browser with no server request.' },
      ],
      content: `<p>Whether you are writing to a specific word limit for an essay, checking if a tweet fits within character limits, proofreading a cover letter, or counting words in a translated document, this tool gives you instant statistics as you type or paste text.</p><p>The counter tracks six metrics simultaneously: total words, total characters (including spaces), characters without spaces, sentences, paragraphs, and estimated reading time based on an average reading speed of 200 words per minute. All counts update in real time with each keystroke so you can watch the numbers change as you write.</p><p>Word counting uses a simple but effective tokenizer: consecutive non-whitespace characters form a word. Punctuation attached to a word (commas, periods, quotes) is part of that token, which matches the behavior of most word processors and is consistent with how most editors and publishers count words. Sentence counting looks for terminal punctuation marks followed by whitespace, and paragraph counting splits on blank lines.</p>`.trim(),
    },
    related: ['case-converter', 'whitespace-remover', 'duplicate-line-remover', 'text-diff'],
  },
  {
    slug: 'case-converter',
    name: 'Case Converter',
    category: 'text',
    kind: 'client-pure',
    icon: 'case-sensitive',
    description: 'Convert text to UPPER, lower, Title, camelCase, snake_case, and more.',
    component: 'CaseConverter',
    seo: {
      title: 'Case Converter — Convert Text Case Online Free',
      description:
        'Convert text to uppercase, lowercase, Title Case, camelCase, snake_case, kebab-case, and PascalCase instantly. Free online text case converter.',
      keywords: ['case converter', 'text case converter', 'camelcase converter', 'snake_case converter', 'uppercase lowercase online'],
      faq: [
        { q: 'What is the difference between camelCase and PascalCase?', a: 'camelCase starts with a lowercase letter (firstName), PascalCase starts with an uppercase letter (FirstName). Both capitalize the first letter of each subsequent word with no separators.' },
        { q: 'How does Title Case handle small words?', a: 'Articles (a, an, the), short prepositions (in, on, at), and conjunctions (and, but, or) are kept lowercase unless they start the sentence, following standard English title casing rules.' },
        { q: 'Can I convert code identifiers?', a: 'Yes. Paste a snake_case identifier and convert it to camelCase or PascalCase, useful when renaming variables or adapting code conventions between languages.' },
      ],
      content: `<p>Consistency in text casing is important across many contexts — code naming conventions, headline styles, database field names, and API responses all have different rules. Manually re-casing a block of text is tedious and error-prone. This converter handles all common cases in one click.</p><p>Seven conversion modes are available: UPPERCASE (every character capitalized), lowercase (every character lowercased), Title Case (first letter of each significant word capitalized), Sentence case (only the first letter of each sentence capitalized), camelCase (no separators, interior words capitalized), PascalCase (like camelCase but the first letter is also capitalized), snake_case (words joined with underscores and lowercased), and kebab-case (words joined with hyphens and lowercased).</p><p>Practical uses include converting a sentence to snake_case for use as a database column name, changing a JavaScript variable from camelCase to snake_case for a Python API, converting a list of product names to Title Case for a heading, or quickly capitalizing a sentence that was typed in lowercase.</p>`.trim(),
    },
    related: ['word-counter', 'whitespace-remover', 'string-reverse', 'duplicate-line-remover'],
  },
  {
    slug: 'duplicate-line-remover',
    name: 'Duplicate Line Remover',
    category: 'text',
    kind: 'client-pure',
    icon: 'list-x',
    description: 'Remove duplicate lines from any text, keeping the first or last occurrence.',
    component: 'DuplicateLineRemover',
    seo: {
      title: 'Duplicate Line Remover — Remove Duplicate Lines Online Free',
      description:
        'Paste text and remove all duplicate lines instantly. Choose case-sensitive or insensitive matching. Keep first or last occurrence. Free online tool.',
      keywords: ['duplicate line remover', 'remove duplicate lines', 'deduplicate text', 'unique lines extractor', 'remove duplicate text online'],
      faq: [
        { q: 'Does the order of lines change?', a: 'No. Lines appear in the same order as in the original text. Only exact duplicates are removed, and the first occurrence is kept by default.' },
        { q: 'Is matching case-sensitive?', a: 'By default, yes. "Hello" and "hello" are treated as different lines. Toggle the case-insensitive option to treat them as duplicates.' },
        { q: 'Can I also sort lines at the same time?', a: 'Not in this tool, but you can copy the output and sort it separately. A dedicated sort tool is planned for a future update.' },
      ],
      content: `<p>Duplicate lines appear in many real-world text processing tasks: a list of email addresses with entries added multiple times, a CSV export with repeated rows, a list of URLs generated by a crawler, or a log file with repeated identical entries. Removing duplicates manually is impractical for anything more than a few lines. This tool handles it instantly.</p><p>Paste or type your text, and duplicate lines are removed in real time as you type. The output preserves the first occurrence of each line by default, maintaining the original order of unique entries. An option to keep the last occurrence is also available, useful when newer entries should take precedence over older ones.</p><p>Case sensitivity is configurable. In case-sensitive mode (the default), "Apple" and "apple" are treated as different lines and both are kept. In case-insensitive mode, they are treated as duplicates and only the first is kept. This is useful for de-duplicating email lists or domain names where casing may vary but the content is equivalent.</p>`.trim(),
    },
    related: ['word-counter', 'whitespace-remover', 'string-reverse', 'text-diff'],
  },
  {
    slug: 'text-diff',
    name: 'Text Diff Checker',
    category: 'text',
    kind: 'client-pure',
    icon: 'diff',
    description: 'Compare two blocks of text and highlight added, removed, and unchanged lines.',
    component: 'TextDiff',
    seo: {
      title: 'Text Diff Checker — Compare Two Texts Online Free',
      description:
        'Compare two texts side by side and highlight exactly what changed. Line-by-line diff with added and removed lines colored for quick review. Free online tool.',
      keywords: ['text diff', 'compare text online', 'text comparison tool', 'diff checker free', 'find differences in text'],
      faq: [
        { q: 'Does this work on code?', a: 'Yes. The diff algorithm compares any text line by line, making it suitable for comparing code, configuration files, JSON, or any line-oriented content.' },
        { q: 'How is the diff computed?', a: 'The tool uses a Longest Common Subsequence algorithm, the same approach used by standard Unix diff and git. It finds the minimal set of additions and deletions that transforms one text into the other.' },
        { q: 'Can I compare very large texts?', a: 'Yes, but very large inputs (tens of thousands of lines) will be slower because the LCS algorithm is O(n*m) in the number of lines. For code diffs, a dedicated tool like git diff is faster on large files.' },
      ],
      content: `<p>Comparing two versions of a document, configuration file, or code snippet is a common task for developers, writers, and anyone reviewing changes to text content. This diff checker implements the Longest Common Subsequence algorithm to produce a minimal, accurate list of what changed between the two inputs.</p><p>The output highlights added lines in green, removed lines in red, and unchanged lines in their default color. This makes it immediately obvious what changed without having to read through identical content. The comparison is line-by-line, which is how most version control systems and diff tools present changes.</p><p>Common use cases include reviewing what changed between two versions of a contract, checking whether a document was edited correctly, comparing two API responses to find unexpected differences, reviewing a colleague's text changes before approving, or debugging why two configuration files produce different behavior.</p>`.trim(),
    },
    related: ['word-counter', 'duplicate-line-remover', 'whitespace-remover', 'json-formatter'],
  },
  {
    slug: 'string-reverse',
    name: 'String Reverse',
    category: 'text',
    kind: 'client-pure',
    icon: 'arrow-left-right',
    description: 'Reverse any string, reverse word order, or mirror each word individually.',
    component: 'StringReverse',
    seo: {
      title: 'String Reverse — Reverse Text Online Free',
      description:
        'Reverse any text character by character, reverse word order, or reverse each word individually. Instant, free, runs in your browser.',
      keywords: ['string reverse', 'reverse text online', 'reverse words', 'text reverser free', 'mirror text generator'],
      faq: [
        { q: 'What is the difference between reversing characters and reversing words?', a: '"Hello World" reversed character-by-character becomes "dlroW olleH". Reversed word-by-word becomes "World Hello". Reversing each word individually becomes "olleH dlroW".' },
        { q: 'Does it handle Unicode correctly?', a: 'Yes. The reverser uses the Unicode Segmentation algorithm to handle multi-byte characters, emoji, and characters with combining marks correctly so they are not broken apart.' },
        { q: 'What practical use does text reversal have?', a: 'It appears in interview questions, puzzle solving, encoding exercises, generating mirrored text for social media styling, and some cryptographic learning exercises.' },
      ],
      content: `<p>Reversing text is a surprisingly useful utility — it appears in coding interviews, word puzzles, string processing exercises, and some simple encoding schemes. This tool offers three reversal modes to handle the most common use cases.</p><p>Character reversal reverses every character in the entire string, so "Hello, World!" becomes "!dlroW ,olleH". This is what most people mean by "reversing a string" in programming contexts. Word order reversal keeps each word intact but reverses their sequence, turning "one two three" into "three two one". Per-word reversal reverses the characters within each word but keeps the words in their original positions, turning "Hello World" into "olleH dlroW".</p><p>Unicode handling is correct: emoji, accented characters, and characters made of multiple code points (like some East Asian characters with combining marks) are treated as single units so they are not split by the reversal.</p>`.trim(),
    },
    related: ['case-converter', 'word-counter', 'whitespace-remover', 'base64-codec'],
  },
  {
    slug: 'whitespace-remover',
    name: 'Whitespace Remover',
    category: 'text',
    kind: 'client-pure',
    icon: 'align-left',
    description: 'Strip extra spaces, tabs, and blank lines from text with configurable options.',
    component: 'WhitespaceRemover',
    seo: {
      title: 'Whitespace Remover — Remove Extra Spaces Online Free',
      description:
        'Remove extra spaces, leading/trailing whitespace, double spaces, blank lines, and tabs from text. Configurable options, instant preview. Free online tool.',
      keywords: ['whitespace remover', 'remove extra spaces', 'trim text online', 'clean whitespace', 'remove blank lines online'],
      faq: [
        { q: 'Does "normalize whitespace" collapse all spaces to one?', a: 'Yes. The normalize option replaces any run of whitespace (multiple spaces, tabs, mixed) between words with a single space, which is useful for cleaning up copy-pasted text from PDFs or web pages.' },
        { q: 'Can I remove only leading or only trailing spaces?', a: 'Yes. The options include trim leading spaces per line, trim trailing spaces per line, or both — in addition to removing blank lines and normalizing internal whitespace.' },
        { q: 'Is there an option to remove ALL whitespace?', a: 'Yes. The "remove all whitespace" option strips every space, tab, and newline, producing a continuous string. This is useful for comparing strings regardless of formatting or generating compact identifiers.' },
      ],
      content: `<p>Text copied from PDFs, web pages, old documents, or generated by code often contains extra spaces, inconsistent indentation, trailing spaces on each line, or double blank lines. Cleaning this up manually is tedious. This tool provides targeted whitespace operations that clean your text exactly as needed.</p><p>The configurable options include: trim leading spaces from the start of each line, trim trailing spaces from the end of each line, normalize internal whitespace (collapse multiple spaces/tabs into one), remove blank lines, remove all whitespace entirely, and convert tabs to spaces (or vice versa). You can combine these in any order to match your specific cleaning task.</p><p>Common uses include cleaning up code pasted from a PDF (which often adds irregular spacing), normalizing addresses or names from a CSV before database import, removing trailing spaces that break string comparisons in code, or stripping formatting from text before running it through another tool.</p>`.trim(),
    },
    related: ['word-counter', 'case-converter', 'duplicate-line-remover', 'string-reverse'],
  },
];
