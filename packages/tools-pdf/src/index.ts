import type { ToolDefinition } from '@toolorbit/tool-registry';

export const pdfTools: ToolDefinition[] = [
  {
    slug: 'pdf-merge',
    name: 'PDF Merge',
    category: 'pdf',
    kind: 'client-pure',
    icon: 'combine',
    description: 'Combine multiple PDF files into one document in your browser.',
    component: 'PdfMerge',
    seo: {
      title: 'PDF Merge — Combine PDF Files Free Online',
      description:
        'Merge multiple PDF files into one in seconds. Works entirely in your browser — your files never leave your device. No account required.',
      keywords: ['pdf merge', 'combine pdf', 'join pdf files', 'merge pdf online', 'pdf combiner free'],
      faq: [
        {
          q: 'Are my PDF files uploaded to a server?',
          a: 'No. This tool uses pdf-lib, a JavaScript library that runs entirely inside your browser. Your files are processed in memory on your device and are never uploaded anywhere.',
        },
        {
          q: 'Is there a limit on how many PDFs I can merge?',
          a: 'There is no hard limit enforced by the tool, but very large numbers of files or files with many high-resolution images may be slow because your browser must hold all of them in memory simultaneously.',
        },
        {
          q: 'Will the merged PDF preserve bookmarks and form fields?',
          a: 'Bookmarks (outlines) and interactive form fields from the source PDFs are not currently preserved in the merged output. Page content, fonts, and embedded images are all carried over correctly.',
        },
      ],
      content: `
        <p>Merging PDFs is one of the most common document tasks — combining a cover letter with a resume, stitching together scanned pages of a contract, or assembling a multi-chapter report from separate files. Most online PDF mergers require you to upload your documents to a remote server, which raises obvious privacy concerns when those files contain personal information, financial data, or confidential business content.</p>
        <p>This tool takes a different approach: it runs entirely inside your browser using the pdf-lib JavaScript library. When you select your files, they are read into your browser's memory and processed locally. The merged result is generated on your own device and downloaded directly — no network request is made to any external server at any point in the process.</p>
        <p>The merger preserves the visual content of each page faithfully: all text, images, vector graphics, embedded fonts, and page dimensions are carried through from the source documents. You control the order of the final PDF by the order you add your files, and you can drag files to rearrange them before merging.</p>
        <p>Common use cases include assembling a job application portfolio, combining separately scanned pages of a multi-page form, merging monthly bank statements into a single annual file, attaching appendices to a report, or preparing a package of supporting documents for a visa or loan application. Whatever the reason, the entire operation completes in seconds for typical document sizes, because no file needs to travel across the internet.</p>
      `.trim(),
    },
    related: ['pdf-split', 'pdf-compress', 'pdf-rotate', 'pdf-reorder'],
  },
  {
    slug: 'pdf-split',
    name: 'PDF Split',
    category: 'pdf',
    kind: 'client-pure',
    icon: 'scissors',
    description: 'Extract individual pages or page ranges from a PDF into new files.',
    component: 'PdfSplit',
    seo: {
      title: 'PDF Split — Extract Pages From PDF Free Online',
      description:
        'Split a PDF by page range or extract individual pages. Runs entirely in your browser with no upload required. Fast, private, and free.',
      keywords: ['pdf split', 'split pdf', 'extract pdf pages', 'pdf page extractor', 'split pdf online free'],
      faq: [
        {
          q: 'Can I extract non-consecutive pages?',
          a: 'Yes. Enter a comma-separated list of page numbers or ranges such as "1, 3, 5-8" and the tool will extract exactly those pages into a single output PDF.',
        },
        {
          q: 'What happens to a password-protected PDF?',
          a: 'If the PDF is encrypted, pdf-lib cannot read it and you will see an error. Remove the password using your PDF reader first, then use this tool.',
        },
        {
          q: 'Does splitting a PDF reduce its quality?',
          a: 'No. The tool copies pages byte-for-byte from the source document. Fonts, images, and vector content are all preserved at their original quality.',
        },
      ],
      content: `
        <p>A PDF that bundles together many different sections — contracts, invoices, research papers, scanned documents — often needs to be broken apart so that individual pages can be shared or stored separately. PDF Split lets you carve out exactly the pages you need without touching the rest, and without sending your document to any third-party server.</p>
        <p>You can specify pages in any combination: single page numbers like "1, 3, 7", continuous ranges like "4-9", or mixed patterns like "1, 3-5, 8". The tool parses your input and copies only those pages into a new PDF that downloads automatically.</p>
        <p>Because processing happens in your browser with pdf-lib, splitting a 100-page document is typically a sub-second operation for normal documents. The original file is not modified. If you need to extract different sets of pages, you can run the tool multiple times on the same source file without re-uploading anything.</p>
        <p>Practical uses include extracting a single invoice from a multi-invoice statement, pulling the signature page from a contract, separating a specific chapter from a compiled report, or isolating one certificate from a bundled set of credentials. The page range syntax accepts any combination so you are not limited to simple front-to-back slices.</p>
      `.trim(),
    },
    related: ['pdf-merge', 'pdf-rotate', 'pdf-reorder', 'pdf-to-images'],
  },
  {
    slug: 'pdf-compress',
    name: 'PDF Compress',
    category: 'pdf',
    kind: 'client-pure',
    icon: 'package',
    description: 'Reduce PDF file size by cleaning unused objects and optimizing structure.',
    component: 'PdfCompress',
    seo: {
      title: 'PDF Compress — Reduce PDF File Size Free Online',
      description:
        'Compress and optimize PDF files in your browser. Removes unused objects and optimizes cross-reference streams to reduce file size without re-uploading.',
      keywords: ['pdf compress', 'reduce pdf size', 'pdf optimizer', 'shrink pdf', 'compress pdf online free'],
      faq: [
        {
          q: 'How much will this reduce my PDF size?',
          a: 'Results vary significantly by file. PDFs that already contain optimized content may see little reduction. Files with many unused objects or unoptimized cross-references often shrink noticeably. The before and after sizes are shown so you can judge the result.',
        },
        {
          q: 'Does compression reduce image quality?',
          a: 'No. This tool removes structural overhead and unused data rather than re-encoding embedded images. Image pixels are untouched, so quality is not affected.',
        },
        {
          q: 'Why is my compressed file the same size or larger?',
          a: 'If the source PDF is already well-optimized, re-packing it can slightly increase size because of the overhead of the new encoding. This is normal and the original file is unchanged.',
        },
      ],
      content: `
        <p>PDFs can accumulate structural overhead over time — deleted content that was never purged, duplicate font definitions, uncompressed cross-reference tables, and objects left over from earlier revisions. This bloat does not affect the visual appearance of the document but increases file size, slowing email delivery and taking more storage space.</p>
        <p>This compressor uses pdf-lib to re-save your document with object streams enabled. Object streams pack multiple PDF objects into a single compressed stream, which reduces the cross-reference table overhead that makes many PDFs larger than they need to be. Unused objects from previous revisions are also discarded during the re-save.</p>
        <p>The tool shows the original and resulting file size side by side so you can see exactly how much was saved before you download. For already-optimized PDFs the gain may be minimal; for PDFs generated by older tools or with many incremental updates, the savings can be significant.</p>
        <p>As with all tools on this site, compression runs entirely in your browser. No part of your document is sent to an external server, which matters when the file contains sensitive information like medical records, legal contracts, or financial statements.</p>
      `.trim(),
    },
    related: ['pdf-merge', 'pdf-split', 'pdf-watermark', 'pdf-rotate'],
  },
  {
    slug: 'pdf-rotate',
    name: 'PDF Rotate',
    category: 'pdf',
    kind: 'client-pure',
    icon: 'rotate-cw',
    description: 'Rotate all pages or specific pages in a PDF by 90, 180, or 270 degrees.',
    component: 'PdfRotate',
    seo: {
      title: 'PDF Rotate — Rotate PDF Pages Free Online',
      description:
        'Rotate PDF pages 90, 180, or 270 degrees. Rotate all pages or choose specific ones. Processes locally in your browser — no file upload required.',
      keywords: ['pdf rotate', 'rotate pdf pages', 'rotate pdf online', 'flip pdf pages', 'pdf page rotator'],
      faq: [
        {
          q: 'Can I rotate only some pages and leave others unchanged?',
          a: 'Yes. Leave "All pages" selected to rotate every page, or enter specific page numbers to rotate only those.',
        },
        {
          q: 'Does rotating a PDF change any other content?',
          a: 'No. Rotation only changes the page orientation metadata. All text, images, and other content remain untouched.',
        },
        {
          q: 'Can I undo a rotation?',
          a: 'Yes — rotate the same page by the complementary amount. A 90-degree clockwise rotation is undone by a 270-degree clockwise (or 90-degree counter-clockwise) rotation. Your original file is never modified.',
        },
      ],
      content: `
        <p>A scanned document placed upside-down in the feeder, a PDF generated in landscape mode when you need portrait, a photo attached as a page sideways — page orientation errors are common, and fixing them should not require specialist software. PDF Rotate corrects page orientation in seconds without touching any server.</p>
        <p>You can rotate all pages in one operation, which is useful for an entire scanned document shot in the wrong orientation. Or you can target specific pages by entering page numbers, which is useful when a multi-page document has just one or two pages that need correcting.</p>
        <p>Rotation in PDF is a lossless metadata operation — the actual content is not moved or re-rendered, only the rotation angle stored in each page's dictionary is updated. This means the operation is extremely fast even for large documents, and quality is completely preserved.</p>
        <p>Common scenarios include correcting a landscape scan of a portrait document, fixing photo pages that a mobile scanner captured sideways, rotating a single wide table page within an otherwise portrait report, or simply flipping a document you received upside-down. All of this happens client-side so sensitive documents stay on your device.</p>
      `.trim(),
    },
    related: ['pdf-merge', 'pdf-split', 'pdf-reorder', 'pdf-compress'],
  },
  {
    slug: 'pdf-to-images',
    name: 'PDF to Images',
    category: 'pdf',
    kind: 'client-wasm-heavy',
    icon: 'image',
    description: 'Convert each PDF page into a high-quality PNG or JPG image in your browser.',
    component: 'PdfToImages',
    seo: {
      title: 'PDF to Images — Convert PDF Pages to PNG/JPG Free Online',
      description:
        'Convert every page of a PDF into PNG or JPG images directly in your browser. No server, no account, no size limit. Download individually or as a ZIP.',
      keywords: ['pdf to image', 'pdf to png', 'pdf to jpg', 'convert pdf pages to images', 'pdf image extractor'],
      faq: [
        {
          q: 'What resolution are the output images?',
          a: 'Images are rendered at 150 DPI by default, which is suitable for screen viewing and most print uses. Higher DPI options are available in the settings.',
        },
        {
          q: 'Why does this tool take longer to start than the others?',
          a: 'PDF to Images uses PDF.js, Mozilla\'s PDF rendering engine, which is a larger library than pdf-lib. It is loaded only on this page and only when you upload a file, but the initial load takes a few seconds on first use.',
        },
        {
          q: 'Can I convert just one page instead of the whole document?',
          a: 'Yes. After the preview loads, you can select which pages to convert using the checkboxes before clicking download.',
        },
      ],
      content: `
        <p>Converting a PDF to images is useful in many situations: embedding a page in a presentation, sharing a single page as an image on social media, creating a thumbnail of a document cover, or working with software that accepts images but not PDFs. This tool renders every page of your PDF to a high-quality raster image using PDF.js, the same rendering engine Mozilla uses inside Firefox.</p>
        <p>After uploading your PDF, the tool renders each page as a preview. You can then choose to download individual pages or all of them. PNG produces lossless output ideal for documents with text and sharp graphics. JPG offers smaller file sizes at the cost of slight compression artifacts, which makes it better for documents that consist mainly of photographs.</p>
        <p>The entire rendering pipeline runs in your browser. No page of your document is ever sent to a server. This matters when the PDF contains financial statements, personal identification, or confidential business materials.</p>
        <p>PDF.js is loaded lazily — it is only downloaded the first time you upload a file, and it is cached by your browser for subsequent uses. This keeps the initial page load fast while still providing a full-featured PDF renderer for complex documents with gradients, embedded fonts, and complex vector artwork.</p>
      `.trim(),
    },
    related: ['images-to-pdf', 'pdf-split', 'image-convert', 'image-compress'],
  },
  {
    slug: 'images-to-pdf',
    name: 'Images to PDF',
    category: 'pdf',
    kind: 'client-pure',
    icon: 'file-image',
    description: 'Convert JPG, PNG, or WebP images into a single PDF, one image per page.',
    component: 'ImagesToPdf',
    seo: {
      title: 'Images to PDF — Convert Images to PDF Free Online',
      description:
        'Convert JPG, PNG, and WebP images to PDF in your browser. One image per page. Drag to reorder, then download the finished PDF. No upload required.',
      keywords: ['images to pdf', 'jpg to pdf', 'png to pdf', 'convert image to pdf', 'photos to pdf free'],
      faq: [
        {
          q: 'What image formats are supported?',
          a: 'JPEG, PNG, and WebP are fully supported. WebP images are converted to PNG automatically before embedding since PDF does not natively support the WebP format.',
        },
        {
          q: 'Will the PDF page size match my image size?',
          a: 'Yes. Each page is sized to exactly fit the image at the target DPI, so nothing is cropped or stretched.',
        },
        {
          q: 'Is there an image size limit?',
          a: 'There is no hard limit, but very large images (over 30 MB each) may be slow to process because your browser must hold all of them in memory at once.',
        },
      ],
      content: `
        <p>Turning a collection of photos or scanned images into a single PDF is a common need — assembling a portfolio, combining scanned receipts for an expense report, creating a photo album, or packaging screenshots into a deliverable. This tool builds that PDF directly in your browser so your images never touch an external server.</p>
        <p>JPEG images are embedded directly into the PDF without re-encoding, preserving their original quality and keeping file sizes small. PNG images are embedded losslessly. WebP images, which the PDF format does not natively support, are converted to PNG first using the browser's canvas API before embedding.</p>
        <p>You can drag files to change their order before generating the PDF — each image becomes one page, so the order you set is the order pages appear. Page dimensions automatically match the image dimensions, so portrait and landscape photos can coexist in the same document with each page correctly oriented.</p>
        <p>Practical uses include digitizing a stack of receipts for accounting purposes, assembling a proof-of-delivery photo report, compiling screenshots of test results, packaging design mockups into a single shareable file, or creating a photo book to print. The result downloads as a standard PDF that opens in any PDF reader.</p>
      `.trim(),
    },
    related: ['pdf-to-images', 'pdf-merge', 'image-compress', 'image-convert'],
  },
  {
    slug: 'pdf-watermark',
    name: 'PDF Watermark',
    category: 'pdf',
    kind: 'client-pure',
    icon: 'stamp',
    description: 'Add a text watermark to every page of a PDF — diagonal, header, or footer.',
    component: 'PdfWatermark',
    seo: {
      title: 'PDF Watermark — Add Watermark to PDF Free Online',
      description:
        'Add a custom text watermark to your PDF pages. Choose position, opacity, font size, and rotation. Runs locally in your browser, no server required.',
      keywords: ['pdf watermark', 'add watermark to pdf', 'pdf text watermark', 'watermark pdf online', 'pdf stamp tool'],
      faq: [
        {
          q: 'Can I watermark only specific pages?',
          a: 'Currently the tool applies the watermark to all pages. Per-page selection will be added in a future update.',
        },
        {
          q: 'Will the watermark cover the existing content?',
          a: 'The watermark is rendered at a configurable opacity (default 20%) so the original text and images remain readable beneath it. You can increase opacity for a more prominent mark or decrease it to be more subtle.',
        },
        {
          q: 'Can I remove a watermark added by this tool?',
          a: 'Because the watermark is drawn as vector graphics directly onto each page, removing it cleanly requires PDF editing software that can identify and delete those specific graphics objects.',
        },
      ],
      content: `
        <p>Watermarks serve several legitimate purposes: marking a document as a draft, identifying confidential material, asserting ownership of shared content, marking a proof copy sent to a client, or branding a document with your company name. Adding a watermark should not require desktop software or a subscription — this tool does it entirely in your browser using pdf-lib.</p>
        <p>You can customize the watermark text, choose its position (diagonal across the page, at the top, or at the bottom), set the font size, and adjust the opacity. A diagonal placement is most common for "CONFIDENTIAL" or "DRAFT" marks because it overlaps all content and is hard to miss. Header and footer placements are less intrusive and better for branding.</p>
        <p>The watermark is drawn using Helvetica, the standard built-in PDF font, which means no external fonts need to be embedded and the resulting file stays compact. Opacity is controlled by adjusting the transparency of the graphics state, so the mark is translucent rather than a solid block covering the content beneath.</p>
        <p>Your document is processed entirely in your browser. No page content, no file, and no watermark text is sent to any server. This is particularly important when watermarking confidential legal documents, financial reports, or client deliverables that contain sensitive information.</p>
      `.trim(),
    },
    related: ['pdf-merge', 'pdf-compress', 'pdf-rotate', 'pdf-split'],
  },
  {
    slug: 'pdf-reorder',
    name: 'PDF Reorder Pages',
    category: 'pdf',
    kind: 'client-pure',
    icon: 'list-ordered',
    description: 'Drag and drop to rearrange pages in a PDF, then download the reordered file.',
    component: 'PdfReorder',
    seo: {
      title: 'PDF Reorder Pages — Rearrange PDF Pages Free Online',
      description:
        'Reorder PDF pages by dragging and dropping. Move pages to any position and download the rearranged PDF instantly. No upload — runs in your browser.',
      keywords: ['pdf reorder pages', 'rearrange pdf pages', 'move pdf pages', 'pdf page organizer', 'reorder pdf online'],
      faq: [
        {
          q: 'Can I also delete pages while reordering?',
          a: 'Yes. Each page card has a delete button so you can remove unwanted pages at the same time as reordering the rest.',
        },
        {
          q: 'Is the original PDF modified?',
          a: 'No. The tool reads your file into memory but never writes back to it. The download produces a new file — the original is untouched on your drive.',
        },
        {
          q: 'How many pages can I reorder?',
          a: 'There is no enforced page limit. Very long documents (hundreds of pages) will display a longer list but all operations remain fast because no rendering is needed.',
        },
      ],
      content: `
        <p>A document assembled from multiple sources, a presentation with slides out of order, a scanned report where the pages were fed in the wrong sequence — reordering pages fixes these problems in seconds. PDF Reorder lets you drag individual pages up and down in the list, then generates a new PDF with the pages in the order you specify.</p>
        <p>The page list shows the page number from the source document alongside its position in the new order. You can also remove any page from the output by clicking the delete icon on its card — this gives you a combined reorder-and-filter operation in one step without needing the separate PDF Split tool.</p>
        <p>Under the hood, the tool uses pdf-lib to read the page tree from your document, presents the pages as a reorderable list, then writes a new PDF containing the same pages in your chosen sequence. All fonts, embedded images, annotations, and other page content are copied exactly as they exist in the source — nothing is re-encoded or re-rendered.</p>
        <p>This is a common final step when assembling documents from scanned pages or merging content from different sources: after merging or splitting, you may need to shuffle a few pages into the right order. Having this operation run locally means there is no round-trip to a server, and your file size is not a constraint beyond your browser's available memory.</p>
      `.trim(),
    },
    related: ['pdf-merge', 'pdf-split', 'pdf-rotate', 'pdf-compress'],
  },
];
