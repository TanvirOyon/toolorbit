import type { ToolDefinition } from '@toolorbit/tool-types';

export const pdfTools: ToolDefinition[] = [
  {
    slug: 'pdf-merge',
    name: 'PDF Merger',
    category: 'pdf',
    kind: 'client-pure',
    icon: 'file-plus-2',
    description: 'Combine multiple PDF files into a single document in your browser.',
    component: 'PdfMerge',
    seo: {
      title: 'PDF Merger - Combine PDF Files Free Online, No Upload',
      description: 'Merge multiple PDF files into one document instantly in your browser. Drag to reorder pages before merging. Files never leave your device.',
      keywords: ['merge pdf', 'combine pdf', 'pdf merger online', 'join pdf files', 'pdf combiner free', 'merge pdf files'],
      faq: [
        { q: 'Do my PDF files get uploaded to a server?', a: 'No. This tool uses pdf-lib, a JavaScript library that runs entirely in your browser. Your files are read from local memory and the merged result is generated on your device. Nothing is transmitted over the network.' },
        { q: 'Is there a limit on how many PDFs I can merge?', a: 'There is no server-imposed limit. The practical limit is your browser\'s available memory. Most devices can handle dozens of PDFs at once without issue.' },
        { q: 'Will the merged PDF lose quality?', a: 'No. The merger copies the raw content streams from each source PDF without re-rendering or re-compressing anything. Images, fonts, vector graphics, and form fields are preserved exactly as they were in the originals.' },
        { q: 'Can I reorder pages before merging?', a: 'Yes. After uploading, drag and drop the PDF tiles to set the order. The final merged document will follow the order displayed on screen.' },
      ],
      content: `<p>Merging multiple PDF files is one of the most common document tasks in any office or academic setting. Whether you are combining a cover letter with a CV, assembling a report from independently authored sections, or consolidating months of scanned invoices into a single archive, a reliable PDF merger saves time every day. This tool does the job entirely inside your browser - no account required, no file size restrictions, no upload.</p>

<h2>How browser-side PDF merging works</h2>
<p>This tool uses <a href="https://pdf-lib.js.org">pdf-lib</a>, a mature JavaScript library that can create and modify PDF documents without a server. When you select your files, the browser reads each one into memory as an <code>ArrayBuffer</code>, passes it to pdf-lib for parsing, and then copies every page from every source document into a new PDF. The merged output is generated as a <code>Uint8Array</code> and converted to a downloadable <code>Blob</code> URL - the entire process happens in the same tab, with zero network activity.</p>

<h2>Preserving document fidelity</h2>
<p>A common concern about merging PDFs is quality loss. Browser-side merging with pdf-lib avoids this entirely because it operates on the raw PDF object tree rather than re-rendering pages to an image. Fonts are embedded as they were in the originals. Vector graphics stay vector. JPEG images remain JPEG-compressed at their original quality. Form fields, annotations, and bookmarks from the source documents are also preserved during the merge, though interactive form fields from multiple documents may conflict if they share field names - a known limitation of the PDF format itself.</p>

<h2>Page reordering</h2>
<p>The drag-and-drop reordering interface lets you set the final page order before committing to the merge. This is useful when the natural order of your files is not the order you want in the final document - for example, if you are assembling a presentation where the title slide is in a different file from the main content. Drag the file thumbnails into the correct sequence, then click Merge.</p>

<h2>Alternatives for large-volume merging</h2>
<p>For occasional merging of a few documents, this tool is the fastest option. If you regularly need to merge large batches - dozens of PDFs a day as part of a business workflow - consider a command-line tool like <code>pdfunite</code> (part of poppler-utils on Linux) or <code>pdftk</code>, which can be scripted into automation pipelines. For Windows users, PowerShell scripts using the iTextSharp library can batch-merge entire directories of PDFs. These server-side or local tools have no browser memory constraints and can handle arbitrarily large files.</p>

<h2>Common merging scenarios</h2>
<p>Academic submissions often require a single PDF containing a title page, abstract, body, references, and appendices - each potentially authored in a different tool and exported separately. Job applications typically need a combined document with CV, cover letter, and references. Legal and financial document packages frequently require assembling signed forms, supporting evidence, and cover memos into a single submission. In each case, the workflow is identical: export each section, upload all files here, reorder if needed, and download the merged result.</p>
<h2>Handling form fields across merged PDFs</h2>
<p>When merging PDFs that contain interactive form fields - text inputs, checkboxes, radio buttons - a conflict can arise if two source documents use the same field name. In the PDF specification, form fields are globally named within a document; two fields with the name "signature" in the merged document would share the same value, causing one to override the other. The browser-based pdf-lib merger flattens form fields by default for this reason, converting filled form values to static text. If you need to merge fillable forms while preserving their interactivity, use a server-side tool like pdftk with the <code>flatten</code> option or Adobe Acrobat Pro's form field management. For most merging use cases - combining text documents, presentations, and non-fillable scans - this limitation is irrelevant.</p>
<h2>Merging password-protected PDFs</h2>
<p>PDFs with user passwords (required to open) cannot be merged without first providing the password. The browser's File API reads the raw bytes of the file, but pdf-lib cannot parse an encrypted PDF without the decryption key. Use the PDF Unlocker tool on this site to remove the password protection first, then merge the unlocked copies. PDFs with owner passwords (restrictions on editing or copying but not on opening) may or may not be mergeable depending on which permissions are restricted - some PDF readers and libraries honor these restrictions, while others ignore them for local processing.</p>
`,
    },
    related: ['pdf-split', 'pdf-compress', 'pdf-rotate', 'images-to-pdf'],
  },

  {
    slug: 'pdf-split',
    name: 'PDF Splitter',
    category: 'pdf',
    kind: 'client-pure',
    icon: 'scissors',
    description: 'Split a PDF into individual pages or custom page ranges, in your browser.',
    component: 'PdfSplit',
    seo: {
      title: 'PDF Splitter - Split PDF into Pages Free Online, No Upload',
      description: 'Split a PDF into individual pages or extract specific page ranges instantly in your browser. No upload, no limits, completely private.',
      keywords: ['split pdf', 'pdf splitter', 'extract pdf pages', 'pdf page extractor', 'split pdf online free', 'divide pdf'],
      faq: [
        { q: 'Can I extract just a few pages instead of splitting every page?', a: 'Yes. Enter a page range like "3-7" or a comma-separated list like "1,3,5-8" to extract only the pages you need. Leave the range empty to split into individual single-page PDFs.' },
        { q: 'Is there a limit on PDF size?', a: 'No server limit. Processing is bounded only by your device\'s memory. A 100-page PDF is typically handled in under a second on any modern device.' },
        { q: 'Do the split files maintain the original PDF quality?', a: 'Yes. Pages are extracted from the PDF\'s internal object tree - content is not re-rendered. Images, fonts, and vector graphics are bit-for-bit identical to the source.' },
        { q: 'Can I split a password-protected PDF?', a: 'Only if you know the password. You can unlock a password-protected PDF using the PDF Unlocker tool on this site first, then split the unlocked version.' },
      ],
      content: `<p>Splitting a PDF is the counterpart to merging - where merging combines many documents into one, splitting pulls one document apart into its component sections. The need arises constantly: extracting a single chapter from a textbook, separating individual invoices from a batch export, pulling out specific pages to share with someone who only needs part of a larger document, or breaking up a scanned archive into per-topic files.</p>

<h2>Two splitting modes</h2>
<p>This tool supports two approaches. In <strong>split every page</strong> mode, each page of the source PDF becomes its own single-page output file - useful when you have a scanned stack of documents that were fed through a scanner together and need to be filed individually. In <strong>custom range</strong> mode, you specify which pages you want in the output using a range expression like <code>1-5</code>, <code>3,7,12</code>, or <code>4-8,11-15</code>. The output contains only those pages in the order they appear in the original document.</p>

<h2>How page extraction works</h2>
<p>The tool parses the PDF using pdf-lib in your browser, identifies the page objects corresponding to your specified range, and writes them into a new PDF document. The pages are not re-rendered - they are copied at the object level, which means no quality loss, no change to embedded fonts or images, and no loss of vector precision. Annotations, links, and bookmarks targeting the extracted pages are preserved; bookmarks targeting pages not included in the extract are omitted from the output.</p>

<h2>Page range syntax</h2>
<p>The range input accepts comma-separated entries, each of which can be a single page number (<code>5</code>), a closed range (<code>3-8</code>), or an open-ended range (<code>10-</code> meaning from page 10 to the end). Page numbers start at 1, matching the numbering most PDF viewers display. The output pages appear in the same order as they appear in the source - the range is a filter, not a reorder command. To reorder pages, use the PDF Reorder tool after extraction.</p>

<h2>Privacy and file size considerations</h2>
<p>Because splitting runs in your browser, there is no upload bandwidth cost for large files. A 500MB scanned document is processed locally; only the extracted pages need to be downloaded. The output files are typically proportionally smaller than the source - if you extract 10 pages from a 100-page PDF, the output will be approximately 10% of the original size, though shared resources like embedded fonts may make the proportional savings smaller for short documents.</p>

<h2>Use cases by profession</h2>
<p>Lawyers regularly need to extract specific exhibits from long discovery documents for filing. Academics extract individual papers from compiled conference proceedings PDFs. Finance professionals pull individual monthly statements from consolidated bank export files. Teachers extract selected problems from a test bank. Administrative staff split multi-page scanned application packets into per-applicant files for digital case management. In every case, the workflow is the same: upload the source, specify what you need, download the result.</p>
<h2>Splitting versus extracting</h2>
<p>Splitting and extracting are the same fundamental operation - both produce a new PDF containing a subset of pages from the original - but the terminology differs by use case. "Splitting" implies dividing the entire document into multiple parts, potentially generating several output files in one operation (page 1–3, 4–6, 7–10). "Extracting" implies selecting specific pages for a single output file. This tool supports both: you can extract a specific range into one file, or split the document into multiple ranges by running the operation multiple times with different range inputs and downloading each result separately.</p>
<h2>Preserving annotations and bookmarks</h2>
<p>PDF documents can contain multiple layers of structure beyond the visible page content: annotations (comments, highlights, sticky notes), bookmarks (a navigable outline tree), named destinations (jump targets for internal links), and article threads (reading-order chains through complex layouts). When extracting a page range, bookmarks that reference pages outside the extracted range are omitted from the output. Annotations tied to specific pages are preserved. Internal links that point outside the extracted range will produce broken links in the output - a known limitation of any page extraction tool, including desktop applications. For documents with heavy cross-referencing internal links, splitting at section boundaries rather than arbitrary page numbers produces cleaner results.</p>
`,
    },
    related: ['pdf-merge', 'pdf-rotate', 'pdf-compress', 'pdf-reorder'],
  },

  {
    slug: 'pdf-compress',
    name: 'PDF Optimizer',
    category: 'pdf',
    kind: 'client-pure',
    icon: 'archive',
    description: 'Optimize a PDF\'s internal structure to reduce file size where possible.',
    component: 'PdfCompress',
    seo: {
      title: 'PDF Optimizer - Reduce PDF File Size Online, Free',
      description: 'Optimize your PDF file structure to reduce size for sharing and storage. Runs in your browser - no upload, no server, completely private.',
      keywords: ['pdf optimizer', 'reduce pdf size', 'compress pdf online', 'pdf compressor free', 'optimize pdf', 'smaller pdf file'],
      faq: [
        { q: 'How does this differ from a full PDF compressor?', a: 'This tool rewrites the PDF\'s internal cross-reference table as a compressed object stream, which is particularly effective on PDFs generated by older software. It does not re-compress embedded images. PDFs from modern tools may see little or no reduction; PDFs from legacy software often shrink by 5–30%.' },
        { q: 'Why did my file get slightly larger?', a: 'Object stream rewriting adds a small amount of overhead. If the original PDF was already optimized (as most PDFs from modern software are), the output may be a few kilobytes larger. In this case, keep the original.' },
        { q: 'What if I need to compress image-heavy PDFs significantly?', a: 'Significant compression of photo-heavy PDFs requires re-encoding embedded JPEG images at a lower quality setting - a server-side operation beyond what a browser-only tool can do without quality loss. Tools like Adobe Acrobat\'s "Reduce File Size" or Ghostscript apply this type of compression.' },
        { q: 'Is there a file size limit?', a: 'No. Processing is entirely in your browser. Larger files take longer but there is no hard limit.' },
      ],
      content: `<p>PDF file size affects how quickly a document loads when emailed, how much storage it consumes in a document management system, and whether it meets upload size limits on submission portals. This tool optimizes a PDF's internal structure - specifically, it rewrites the cross-reference table as a compressed object stream - to reduce file size where the source document has not already been optimized.</p>

<h2>What "optimizing" a PDF actually means</h2>
<p>A PDF file is a collection of objects - pages, fonts, images, and metadata - connected by a cross-reference table that records where each object starts in the file. Early PDF generators wrote this table as a plain text table, which takes up space proportional to the number of objects. Modern PDF generators use compressed object streams (also called cross-reference streams), which apply zlib compression to the table itself. Converting a legacy plain-table PDF to use object streams is a lossless operation that reduces file size without touching any content.</p>

<p>This tool applies that optimization using pdf-lib's <code>useObjectStreams: true</code> save option entirely in your browser. No content is modified, re-rendered, or recompressed.</p>

<h2>When optimization helps most</h2>
<p>PDFs generated by older software - early versions of Microsoft Office, legacy print-to-PDF drivers, older versions of InDesign or Quark, and many government e-forms systems - often use uncompressed cross-reference tables. For these files, structure optimization can reduce file size by 5–30%. PDFs generated by modern software (current versions of Word, Google Docs, Adobe Acrobat, or any cloud PDF tool) typically already use compressed object streams and will see little or no size reduction from this operation.</p>

<h2>What this tool does not do</h2>
<p>This optimizer does not re-compress embedded images, subset or re-embed fonts, remove embedded thumbnails, or flatten form fields. These operations would provide greater size reductions for image-heavy PDFs but require more complex processing and involve trade-offs in quality or functionality. For significant compression of photo-heavy documents, server-side tools using Ghostscript's <code>/ebook</code> or <code>/screen</code> distiller settings can reduce file sizes by 60–80% by downsampling and re-encoding embedded JPEG images at lower quality levels.</p>

<h2>Privacy advantages of browser-side processing</h2>
<p>PDF files often contain sensitive content - signed contracts, medical reports, tax returns, financial statements. Uploading them to a server-side compression service means they transit the network and are processed by someone else's computer. This optimizer runs entirely in your browser tab: the file is never transmitted, never stored, and disappears from memory when you close the tab or load a new file. This is the appropriate choice for any document you would not want to email to a stranger.</p>

<h2>File size expectations by document type</h2>
<p>A text-only PDF from a modern word processor - perhaps 10–20 pages of formatted text - is typically already under 500KB and has limited room for further reduction. A scanned document where every page is a high-resolution JPEG image can be many megabytes per page; structural optimization will not help these files much, but a full image recompression pass could reduce them dramatically. A complex InDesign-exported document with embedded vector graphics, multiple fonts, and moderate-resolution images often has the most to gain from structural optimization, as legacy InDesign versions were particularly slow to adopt compressed object streams.</p>
<h2>Compression strategies by document type</h2>
<p>Different PDF types benefit from different optimization approaches. Text-only PDFs from word processors are already highly optimized in their image content (because there is none); structural optimization is the only available lever and its effect is modest. Scanned document PDFs where every page is a full-page JPEG or TIFF image can benefit enormously from image recompression - a single 300 DPI full-color page scanned at 95% JPEG quality can be 1–2MB; at 75% it drops to 200–400KB with no visible degradation at standard viewing distances. PDF/A archival format documents are specifically required to be self-contained and may have fonts fully embedded rather than subsetted, making structural optimization less effective but image recompression still valid. CAD and vector drawing PDFs are typically small because vector graphics compress well; optimization often has little effect on them.</p>
<h2>Reducing PDF size at creation time</h2>
<p>The most effective "compression" happens when the PDF is created, not afterwards. In Microsoft Word's PDF export dialog, choose "Minimum size (publishing online)" to use 150 DPI image downsampling and JPEG compression at creation time. In Adobe InDesign, the "Press Quality" preset embeds images at 300 DPI but the "Smallest File Size" preset downsamples to 100 DPI. In Photoshop's Save as PDF dialog, reduce the image quality slider and enable "Downsample images" to the display resolution needed. These creation-time choices produce PDFs that are already optimized - post-hoc compression on a well-made PDF yields diminishing returns.</p>
`,
    },
    related: ['pdf-merge', 'pdf-split', 'pdf-watermark', 'pdf-to-images'],
  },

  {
    slug: 'pdf-rotate',
    name: 'PDF Page Rotator',
    category: 'pdf',
    kind: 'client-pure',
    icon: 'rotate-cw',
    description: 'Rotate specific pages or all pages of a PDF by 90°, 180°, or 270°.',
    component: 'PdfRotate',
    seo: {
      title: 'PDF Page Rotator - Rotate PDF Pages Free Online',
      description: 'Rotate individual pages or all pages of a PDF by 90, 180, or 270 degrees. Runs in your browser, no upload, no limits.',
      keywords: ['rotate pdf', 'pdf rotator', 'rotate pdf pages online', 'fix upside down pdf', 'pdf page rotation free', 'turn pdf pages'],
      faq: [
        { q: 'Will rotation change the page content?', a: 'No. Rotation in a PDF is stored as a metadata attribute on the page object. The content streams are unchanged. This is equivalent to setting the page\'s Rotate entry in the PDF dictionary.' },
        { q: 'Can I rotate individual pages differently?', a: 'Yes. Select which pages to rotate and by how much before applying. Different pages can have different rotation values in the same document.' },
        { q: 'Why does a scanned PDF sometimes appear sideways?', a: 'Scanners that automatically detect page orientation can misidentify the correct orientation for pages with lots of white space, rotated diagrams, or certain script directions. The page image is stored correctly but the PDF rotation metadata is wrong. This tool corrects the metadata.' },
        { q: 'Can I rotate a password-protected PDF?', a: 'Only if the permissions allow modifications. Use the PDF Unlocker tool first if needed, then rotate the unlocked copy.' },
      ],
      content: `<p>A PDF page that displays sideways or upside down is one of the most common and frustrating document problems. It happens most often with scanned documents - a batch of pages fed into a scanner where some were placed face-up and others face-down - and with files exported from applications that do not handle page orientation metadata correctly. This tool corrects page rotation in seconds without touching the underlying content.</p>

<h2>How PDF rotation works</h2>
<p>In the PDF specification, page rotation is stored as a <code>Rotate</code> entry in the page dictionary - an integer that must be a multiple of 90 (0, 90, 180, or 270). A value of 90 means the page is displayed 90 degrees counterclockwise from its natural orientation. PDF viewers read this value and rotate the rendering accordingly. The actual content stream - the text, images, and vector graphics - is unchanged. This makes rotation a completely lossless operation: rotating a page by 90 degrees four times returns it to exactly its original state, bit for bit.</p>

<h2>Rotating selected pages versus all pages</h2>
<p>This tool lets you rotate all pages at once with one click, or specify individual page numbers or ranges to rotate. A common scenario is a scanned document where every other page is upside down because the paper was fed through a duplex scanner in the wrong orientation. Specifying "even pages, rotate 180°" corrects the entire document without touching the correctly-oriented pages.</p>

<h2>Rotation direction</h2>
<p>The rotation options are 90° clockwise, 180°, and 90° counter-clockwise (equivalently, 270° clockwise). PDFs store rotation as a counter-clockwise angle in the page dictionary, so the tool translates your selection to the appropriate value: 90° clockwise becomes a <code>Rotate</code> value of 270, 90° counter-clockwise becomes 90, and 180° becomes 180. If you are correcting pages that appear to be lying on their right side in the viewer, you want 90° clockwise rotation.</p>

<h2>Privacy and processing speed</h2>
<p>Rotation is among the fastest PDF operations because the content is not re-processed - only the page dictionary metadata is modified. A 200-page PDF with all pages needing rotation typically processes in well under a second on any modern device. Because processing is entirely in your browser, there is no network upload wait even for very large files, and your document content never leaves your device.</p>

<h2>Common scenarios</h2>
<p>Scanned documents with mixed orientation are the most common use case. Legal documents printed in landscape that were scanned in portrait orientation need a 90-degree correction. Architectural drawings and engineering diagrams in landscape orientation are sometimes exported to PDF with incorrect rotation metadata by CAD tools. Financial spreadsheets exported from Excel in landscape sometimes land in PDF viewers displaying in portrait. In each case, the fix is the same: identify the affected pages, select the correct rotation, download the corrected PDF.</p>
<h2>Batch rotation workflows</h2>
<p>When a large scanned document has systematic orientation errors - for example, every even page is upside down because a duplex scanner processed double-sided pages incorrectly - the most efficient correction is a script rather than a GUI tool. On Linux and macOS, <code>pdftk input.pdf cat 1 2south 3 4south output fixed.pdf</code> rotates pages 2 and 4 by 180 degrees (south) while keeping odd pages unchanged. The <code>south</code> keyword in pdftk means rotate 180 degrees; <code>east</code> is 90 degrees clockwise; <code>west</code> is 90 degrees counterclockwise. For Python scripts, the <code>pypdf</code> library provides <code>page.rotate(90)</code>. This browser tool is most efficient for single-file corrections; repeated batch corrections benefit from scripting.</p>
<h2>Rotation in PDF viewers versus PDF metadata</h2>
<p>Some PDF viewers - particularly older ones and certain mobile apps - display all pages in their raw pixel orientation regardless of the PDF's <code>Rotate</code> metadata. If a corrected PDF still appears sideways in a specific viewer after using this tool, the issue is the viewer, not the PDF. Verify by opening in a standards-compliant viewer (Firefox's built-in PDF viewer, Adobe Acrobat Reader, or macOS Preview). If those show the correct orientation, the original viewer is not reading the <code>Rotate</code> property - an issue with the viewing application, not a problem with the file.</p>
`,
    },
    related: ['pdf-merge', 'pdf-split', 'pdf-reorder', 'pdf-watermark'],
  },

  {
    slug: 'pdf-to-images',
    name: 'PDF to Images',
    category: 'pdf',
    kind: 'client-wasm-heavy',
    icon: 'image',
    description: 'Convert every page of a PDF to high-quality PNG or JPEG images in your browser.',
    component: 'PdfToImages',
    seo: {
      title: 'PDF to Images - Convert PDF Pages to PNG/JPG Free',
      description: 'Convert PDF pages to PNG or JPEG images at any DPI directly in your browser. No upload, no server - uses PDF.js to render locally.',
      keywords: ['pdf to image', 'pdf to png', 'pdf to jpg', 'convert pdf pages to images', 'pdf page screenshot', 'pdf to jpeg online free'],
      faq: [
        { q: 'What DPI should I choose?', a: '72 DPI produces screen-resolution images good enough for web preview. 150 DPI (the default) is balanced - clear on screen and suitable for standard print. 300 DPI is print quality, suitable for professional printing or archiving, but produces significantly larger image files.' },
        { q: 'Does my PDF get uploaded?', a: 'No. This tool uses PDF.js (Mozilla\'s open-source PDF renderer) compiled to run in your browser. The PDF is processed locally; only the rendered images exist on your device.' },
        { q: 'Why do some PDF pages render incorrectly?', a: 'Encrypted PDFs, PDFs using uncommon font encodings, or very old PDF versions may render incompletely in PDF.js. Server-side renderers like Ghostscript support a broader range of PDF features. If a page renders incorrectly, try converting with a desktop tool.' },
        { q: 'Which format should I use - PNG or JPEG?', a: 'PNG is lossless and best for PDFs with text, diagrams, or line art where sharpness matters. JPEG is lossy but produces significantly smaller files - better for PDFs whose pages are primarily photographs.' },
      ],
      content: `<p>Converting PDF pages to images is useful in a wide range of situations: sharing a document preview in a chat where PDFs are not supported, embedding a page in a presentation, extracting an infographic from a report, creating thumbnails for a document management system, or preparing pages for OCR processing. This tool renders each PDF page to a raster image using PDF.js, Mozilla's open-source PDF rendering engine, running entirely in your browser.</p>

<h2>How PDF.js renders pages</h2>
<p>PDF.js interprets the PDF page description language - a PostScript-derived syntax that describes text positioning, font rendering, vector paths, image placement, and color spaces - and draws the result onto an HTML Canvas element. This is the same rendering engine used in Firefox's built-in PDF viewer. From the canvas, the tool exports the rendered pixels as PNG or JPEG at the quality and resolution you specify. The process runs on your device's CPU (and GPU if the browser uses hardware-accelerated canvas) without any server involvement.</p>

<h2>Choosing the right DPI</h2>
<p>DPI (dots per inch) controls how many pixels are used to represent each inch of the PDF's physical dimensions. A standard A4 page at 72 DPI produces a 595×842 pixel image - good enough for a web thumbnail but blurry when zoomed. At 150 DPI, the same page becomes 1240×1754 pixels, crisp on any screen and adequate for standard printing. At 300 DPI, it becomes 2480×3508 pixels - suitable for professional print, archiving, or use in high-resolution presentations. Note that higher DPI means larger file sizes: a single A4 page at 300 DPI as PNG is typically 1–3MB depending on content complexity.</p>

<h2>PNG versus JPEG</h2>
<p>PNG uses lossless compression - every pixel is stored exactly. This is ideal for PDFs containing text, diagrams, charts, or any content where sharp edges matter, because JPEG compression introduces subtle blurring artifacts around high-contrast edges like text. JPEG applies lossy compression that is tuned for photographs, where the human eye is less sensitive to the kinds of distortion it introduces. For a PDF whose pages are primarily photographic content - a product catalog, a photo book, a travel brochure - JPEG produces significantly smaller files with acceptable quality. For business documents, legal filings, or technical drawings, use PNG.</p>

<h2>Limitations of browser-side rendering</h2>
<p>PDF.js is a mature and capable renderer, but it does not support every PDF feature. Type 3 fonts (custom glyph-based fonts used in older scientific papers), certain CID font encodings, and some interactive PDF features may render incorrectly or fall back to placeholder rendering. Encrypted PDFs without a user password cannot be rendered at all. PostScript-intensive PDFs with complex transparency groups and blend modes may render differently from a professional PostScript interpreter like Ghostscript. For archival or production work where every rendering detail matters, validate the output against a server-side renderer.</p>

<h2>Downstream uses for PDF-derived images</h2>
<p>The most common downstream use is feeding the images into an OCR system to extract text from scanned documents - most OCR tools (Google Cloud Vision, Azure Computer Vision, Tesseract) accept image input but not always raw PDF. Another common use is generating document thumbnails for a web application that needs to display a preview without a PDF viewer. Presentation tools that cannot embed PDFs directly accept image slides. Social media platforms accept images but rarely PDFs, making this conversion necessary for sharing document pages on LinkedIn, Twitter, or Instagram.</p>
<h2>Resolution versus file size trade-offs</h2>
<p>Doubling the DPI quadruples the pixel count and roughly quadruples the file size. A single A4 page at 150 DPI as PNG is typically 200–400KB; at 300 DPI it is 800KB–1.5MB. For web thumbnails, 72–96 DPI is sufficient - these produce images at roughly screen pixel dimensions. For printing the extracted images, 300 DPI is the minimum for print-quality output. For archival purposes where you may later need to zoom into document details, 400–600 DPI preserves fine print and signatures. The DPI slider in this tool lets you choose the appropriate resolution for your intended use case, balancing image quality against output file size.</p>
<h2>Color mode and JPEG versus PNG</h2>
<p>For PDFs that are entirely black text on white backgrounds - a common case for scanned text documents - converting to PNG at 150 DPI and then further converting to 1-bit grayscale (black and white only, no gray) produces the smallest possible file while preserving text readability. Tools like ImageMagick can do this post-processing: <code>convert page.png -threshold 50% -type bilevel page-bw.png</code>. The 1-bit grayscale format reduces file size by a further 80–95% compared to full-color PNG for text-only pages. For feeding into Tesseract OCR, grayscale PNG (not 1-bit, which can reduce OCR accuracy) at 300 DPI produces the best recognition results.</p>
`,
    },
    related: ['images-to-pdf', 'pdf-merge', 'pdf-split', 'image-compress'],
  },

  {
    slug: 'images-to-pdf',
    name: 'Images to PDF',
    category: 'pdf',
    kind: 'client-pure',
    icon: 'file-image',
    description: 'Convert JPG, PNG, or WebP images into a single PDF document in your browser.',
    component: 'ImagesToPdf',
    seo: {
      title: 'Images to PDF - Convert JPG PNG to PDF Free Online',
      description: 'Convert one or more JPG, PNG, or WebP images to a PDF document instantly in your browser. Drag to reorder. No upload, completely private.',
      keywords: ['images to pdf', 'jpg to pdf', 'png to pdf', 'convert images to pdf free', 'photos to pdf', 'image to pdf online'],
      faq: [
        { q: 'What image formats are supported?', a: 'JPEG and PNG are fully supported. WebP is supported in modern browsers that can decode it natively. SVG and GIF are not currently supported - convert them to PNG first.' },
        { q: 'Can I control the page size?', a: 'Yes. Options include A4, Letter, and "fit to image" where each page is sized to match the image dimensions exactly.' },
        { q: 'Is there any quality loss when embedding images in PDF?', a: 'JPEG images are embedded at their original quality without re-encoding. PNG images are embedded as PNG within the PDF object stream. No quality degradation occurs.' },
        { q: 'Can I add multiple images and reorder them?', a: 'Yes. Upload as many images as you need and drag to reorder before converting. Each image becomes one page in the output PDF.' },
      ],
      content: `<p>Converting images to PDF is one of the most frequent document tasks for anyone working with scanned pages, photos of documents, screenshots, or any visual content that needs to be submitted or archived in PDF format. Common situations include submitting a scanned identification document, creating a PDF portfolio from a set of design images, converting a series of screenshots into a PDF tutorial, and archiving photographs in a universally readable format.</p>

<h2>How image embedding works</h2>
<p>This tool reads each image file into the browser using the File API, decodes the image data, and embeds it into a PDF using pdf-lib. JPEG images are embedded as-is using the DCT compression that PDFs natively support, meaning the original JPEG quality is preserved without re-encoding. PNG images are embedded in their decoded pixel form, which means PNG files embedded in PDFs do not retain PNG's lossless compression advantage - the PDF may be larger than the source PNG if the image contains simple graphics that PNG compresses well. For document pages, this trade-off is generally acceptable.</p>

<h2>Page size options</h2>
<p>You can choose to fit each image on a standard paper size (A4 at 210×297mm, or US Letter at 8.5×11 inches) with the image scaled and centered to fit within the page margins, or use "fit to image" mode where each PDF page is sized exactly to the image dimensions. "Fit to image" is ideal for screenshots and designs where exact pixel representation matters; standard page sizes are better for documents that will be printed.</p>

<h2>Image order and multiple uploads</h2>
<p>If you are building a multi-page PDF from several images - for example, a scanned multi-page form where each page was scanned separately - upload all images and arrange them by dragging the thumbnails into the correct order before converting. The order you set in the interface matches the page order in the output PDF.</p>

<h2>Privacy for identity documents</h2>
<p>A common use case for this tool is converting photos of ID documents - passport, national identity card, driving licence - taken with a smartphone camera into a PDF for submission to a service provider. Because this tool runs entirely in your browser, the image data never touches a remote server. This is a meaningful privacy advantage over server-side conversion tools that may log, process, or store the images you submit.</p>

<h2>Quality tips for scanned documents</h2>
<p>When photographing documents with a smartphone for conversion, flat lighting and perpendicular positioning produce the best results. Shadows from an overhead lamp held at an angle are the most common quality issue. Most modern smartphone camera apps include a document scanning mode that applies perspective correction and contrast enhancement automatically. If your phone does not have this, free apps like Adobe Scan and Google PhotoScan provide it. Starting with a well-captured image makes the output PDF easier to read and more likely to pass OCR processing if text extraction is needed later.</p>
<h2>Scan-to-PDF workflow on a smartphone</h2>
<p>The most common use case for this tool is converting smartphone photos of documents into a PDF for submission. For the best results: photograph each page on a flat surface with even, diffuse lighting (avoid windows and direct overhead lights that create glare or shadows). Hold the phone directly above the page rather than at an angle - perspective distortion makes OCR harder and looks unprofessional. Use your phone's built-in document scanner mode if available (iOS Notes, Google PhotoScan, or Microsoft Lens) for automatic perspective correction and contrast enhancement. If no scanner mode is available, shoot in landscape orientation for portrait-format pages to maximize the page's pixel density in the final image.</p>
<h2>Image orientation in PDF output</h2>
<p>When converting images to PDF, the tool automatically detects the image's EXIF orientation metadata and applies the appropriate rotation before embedding, ensuring that images captured in portrait orientation on a phone render correctly in the output PDF. Without this correction, images would appear sideways or upside-down in the PDF even though they display correctly in a viewer that reads EXIF data. The embedded images in the output PDF do not carry EXIF metadata - the rotation is baked into the pixel data at the correct orientation, so the PDF displays correctly in all viewers regardless of EXIF support.</p>
`,
    },
    related: ['pdf-to-images', 'pdf-merge', 'image-convert', 'image-compress'],
  },

  {
    slug: 'pdf-watermark',
    name: 'PDF Watermark',
    category: 'pdf',
    kind: 'client-pure',
    icon: 'stamp',
    description: 'Add a text watermark to every page of a PDF - font, opacity, and rotation customizable.',
    component: 'PdfWatermark',
    seo: {
      title: 'PDF Watermark - Add Text Watermark to PDF Free Online',
      description: 'Add a custom text watermark to every page of a PDF. Control font size, color, opacity, and rotation. Runs in your browser, no upload needed.',
      keywords: ['pdf watermark', 'add watermark to pdf', 'pdf watermark online free', 'watermark pdf pages', 'stamp pdf text', 'confidential watermark pdf'],
      faq: [
        { q: 'Can I remove a watermark added by this tool?', a: 'A watermark added by this tool is drawn directly onto the page content as a transparent text element. It can be removed with PDF editing software that supports content stream editing (like Adobe Acrobat Pro), but not easily with basic PDF tools.' },
        { q: 'Will the watermark appear when printing?', a: 'Yes. The watermark is embedded in the page content and will appear in all views and prints of the PDF.' },
        { q: 'Can I add an image watermark?', a: 'This tool currently supports text watermarks only. Image watermarking (e.g., a company logo) is planned for a future update.' },
        { q: 'How do I make the watermark less visible?', a: 'Reduce the opacity slider to make the watermark more transparent. Typical "DRAFT" or "CONFIDENTIAL" watermarks use 20–30% opacity to be visible but not obstruct reading.' },
      ],
      content: `<p>Watermarks serve a range of purposes in document workflows: marking a document as a draft to prevent circulation of preliminary versions, adding a "CONFIDENTIAL" label to sensitive files before sharing, branding every page of a report with a company name, or marking review copies with a reviewer's name to trace document leaks. This tool adds a diagonal text watermark to every page of a PDF, with full control over the text, size, color, opacity, and rotation angle.</p>

<h2>How text watermarks are implemented in PDF</h2>
<p>A PDF watermark is a text element drawn in the page's content stream using a semi-transparent rendering mode. The tool uses pdf-lib to create a new content stream layer on each page, draws the watermark text at the specified position, rotation, opacity, and size using PDF's native text rendering operators, and merges this layer with the existing page content. The watermark is part of the page content - not a separate overlay layer - which means it is always visible in viewers, cannot be hidden by disabling a layer, and will be present in printed output.</p>

<h2>Choosing watermark settings</h2>
<p>The most effective text watermarks are diagonal (typically 45 degrees), in a light gray or blue, at 20–40% opacity. Fully opaque watermarks obstruct the underlying content and make the document difficult to read. Too-transparent watermarks are easy to overlook. A common professional setting is 25% opacity, mid-gray (#808080), 45 degrees, at a font size that spans roughly half the page width. The preview in this tool lets you adjust settings in real time before committing to the output.</p>

<h2>Common watermark text</h2>
<p>Legal and corporate environments use "CONFIDENTIAL," "DRAFT," "PRIVILEGED AND CONFIDENTIAL," "DO NOT COPY," and "FOR REVIEW ONLY" as standard watermark texts. Academic environments use "SUBMITTED" or "UNDER REVIEW" to mark papers during the review process. Publishers use reviewer names or issue numbers to trace circulation. Each context has its own conventions, but the watermarking mechanism is the same regardless of the text content.</p>

<h2>Limitations of text watermarks</h2>
<p>Text watermarks added by any tool - including professional products like Adobe Acrobat - can be removed by someone with access to the PDF's content streams using appropriate editing software. A text watermark is a deterrent and a legal notice, not a technical lock. If you need a document that cannot be edited or copied at all, PDF permissions (password-based access restrictions) provide a stronger (though still not absolute) technical barrier. Watermarks and permissions can be used together for layered protection.</p>

<h2>Batch watermarking</h2>
<p>If you need to add the same watermark to many PDFs - for example, an entire folder of client reports before distribution - this browser-based tool is best suited to individual files. For batch operations, command-line tools like <code>cpdf</code> or Python libraries like PyPDF2 with a short script can process hundreds of files automatically. The watermark settings used in this tool (opacity, rotation, font size in points) translate directly to the parameters these libraries accept.</p>
<h2>Positioning watermarks effectively</h2>
<p>Watermark position determines its effectiveness as both a deterrent and a protection mechanism. Center placement over the main content area is most visible but also most obstructive - suitable for "DO NOT COPY" watermarks intended to make the document unusable without authorization. Diagonal placement across the entire page (the default for most watermark tools) balances visibility and readability. Corner placement is the least obstructive - appropriate for subtle copyright notices on documents that are intended to be read and shared but not reprinted commercially. For multi-page documents, the same watermark position applies to all pages; if your document has pages with different layouts (some portrait, some landscape), verify that the watermark renders correctly on both orientations before distributing.</p>
<h2>Watermark alternatives for sensitive documents</h2>
<p>Visible text watermarks are the most common approach but not the only option. Digital watermarking embeds invisible markers in the pixel data of images within a PDF - specialized tools can detect these markers even after printing and rescanning, enabling source tracking without visible degradation of the document. Steganographic techniques embed identification information in whitespace patterns or font rendering details. PDF-level permissions (owner password restrictions on printing and copying) provide a technical layer independent of watermarks. For the highest-stakes documents, combine all three: visible watermark for immediate deterrence, digital watermark for traceback, and PDF permissions for barrier. For typical professional use, a visible text watermark is the most practical and sufficient choice.</p>
`,
    },
    related: ['pdf-merge', 'pdf-split', 'pdf-compress', 'pdf-rotate'],
  },

  {
    slug: 'pdf-reorder',
    name: 'PDF Page Reorder',
    category: 'pdf',
    kind: 'client-pure',
    icon: 'list-ordered',
    description: 'Drag and drop PDF pages into any order and export the rearranged document.',
    component: 'PdfReorder',
    seo: {
      title: 'PDF Page Reorder - Rearrange PDF Pages Free Online',
      description: 'Drag and drop pages to reorder them within a PDF document. Preview thumbnails, then download. Runs in your browser, no upload.',
      keywords: ['reorder pdf pages', 'rearrange pdf', 'pdf page reorder online', 'move pdf pages', 'reorganize pdf', 'pdf page manager'],
      faq: [
        { q: 'Can I also delete pages while reordering?', a: 'Yes. The page manager lets you remove individual pages by clicking the delete button on the thumbnail. Remaining pages are then reordered and exported.' },
        { q: 'How are thumbnails generated?', a: 'Page thumbnails are rendered using PDF.js in your browser at a low resolution for display purposes only. The actual page content written to the output PDF comes from the original source, not from the thumbnail rendering.' },
        { q: 'Is there a limit on the number of pages?', a: 'No server-side limit. The practical limit is your browser\'s memory. PDFs with hundreds of pages are handled well; multi-thousand-page PDFs may be slow to load the thumbnail grid on older devices.' },
        { q: 'Can I reorder pages across different PDFs?', a: 'Not directly - reordering works within a single PDF. To reorder pages across documents, use the PDF Merger tool to combine them first, then use this tool to reorder the combined document.' },
      ],
      content: `<p>The page order in a PDF is not always the order you need. Documents compiled from multiple sources, reports assembled section by section, or scanned stacks where pages were inadvertently mis-sequenced all benefit from a tool that lets you rearrange pages visually before producing the final output. This tool renders a drag-and-drop grid of page thumbnails so you can see exactly what you are working with, not just guessing from page numbers.</p>

<h2>Thumbnail generation and page editing</h2>
<p>When you upload a PDF, the tool uses PDF.js to render each page at a reduced resolution, displaying the thumbnails in a draggable grid. This gives you a visual overview of the document structure - useful for confirming which pages need to be moved, and for catching misscanned pages that need to be deleted. Dragging a thumbnail to a new position queues that reordering for the final export. Clicking the remove button on a thumbnail deletes that page from the output. None of these actions modify the original file; they only update the pending export configuration.</p>

<h2>The reorder export</h2>
<p>When you click Export, the tool uses pdf-lib to create a new PDF, copying pages from the source document in the order the thumbnails are arranged. As with all pdf-lib operations, the page content is copied at the object level - no re-rendering occurs, so image quality, font rendering, and vector precision are identical to the source. The new PDF is generated and downloaded directly to your device.</p>

<h2>Combining with the PDF Merger</h2>
<p>Reordering works within a single PDF. If you need to interleave pages from two different PDFs - for example, combining odd pages from one scan with even pages from another (a common situation when using a single-sided scanner to scan double-sided documents) - merge them first using the PDF Merger, then reorder the merged result. The Merger tool preserves all page content, so the merged-then-reordered document is identical in quality to working with the originals directly.</p>

<h2>Fixing incorrectly assembled documents</h2>
<p>Legal discovery packages, academic theses, grant applications, and technical reports are often assembled by concatenating separately authored sections. When one author misses a page or provides sections in a different order than expected, the final merged document needs page-level correction. This tool is designed for exactly that workflow: upload the assembled PDF, verify the page order visually through the thumbnail grid, drag any out-of-order pages to their correct position, and export the corrected document.</p>

<h2>Privacy considerations</h2>
<p>Reordering often involves sensitive documents - legal filings, medical records, financial reports. Because this tool processes everything in your browser using client-side JavaScript, your document content is never transmitted to a server, never stored, and never accessible to anyone other than you. The operation is equivalent to opening the PDF in a local desktop application: the content stays on your device throughout.</p>
<h2>Interleaving pages from two PDFs</h2>
<p>A common workflow for single-sided scanners is to scan the odd pages of a document in one pass, then flip the stack and scan the even pages in a second pass, producing two separate PDFs. The resulting PDFs need to be interleaved - page 1 from the first PDF, page 1 from the second PDF, page 2 from the first, page 2 from the second, and so on. This cannot be done directly with the reorder tool, which works within a single PDF. The workflow is: merge both PDFs (all odd pages first, then all even pages), then use the reorder tool to interleave. Alternatively, for command-line users: <code>pdftk A=odd.pdf B=even.pdf shuffle A B output interleaved.pdf</code> does the interleaving in one step.</p>
<h2>Legal and archival document organization</h2>
<p>Legal document packages submitted to courts, regulatory bodies, or counterparties often require a specific page order prescribed by procedural rules or convention: a cover sheet, then an index, then exhibits in numbered order, then signature pages, then appendices. Reordering capabilities are essential during document assembly because the original files may be generated or received in a different sequence. The visual thumbnail grid in this tool makes it possible to verify the final page order at a glance before downloading, reducing the risk of submitting a document with accidentally transposed pages - an error that can require formal correction procedures in legal contexts.</p>
`,
    },
    related: ['pdf-merge', 'pdf-split', 'pdf-rotate', 'pdf-watermark'],
  },
];
