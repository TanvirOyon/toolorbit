import type { ToolDefinition } from '@toolorbit/tool-registry';

export const imageTools: ToolDefinition[] = [
  {
    slug: 'image-convert',
    name: 'Image Format Convert',
    category: 'image',
    kind: 'client-pure',
    icon: 'refresh-cw',
    description: 'Convert images between PNG, JPG, WebP, and AVIF formats in your browser.',
    component: 'ImageConvert',
    seo: {
      title: 'Image Format Converter — Convert PNG, JPG, WebP Free Online',
      description:
        'Convert images between PNG, JPG, WebP, and AVIF instantly in your browser. No upload, no account, no quality loss on lossless conversions.',
      keywords: ['image converter', 'convert png to jpg', 'jpg to webp', 'png to webp', 'image format converter online free'],
      faq: [
        {
          q: 'Does converting from JPG to PNG improve quality?',
          a: 'No. Conversion cannot recover information lost during the original JPG compression. Converting JPG to PNG produces a lossless file, but the quality is still limited by the original JPG.',
        },
        {
          q: 'Why use WebP instead of JPG?',
          a: 'WebP typically achieves 25–34% smaller file sizes than JPG at equivalent visual quality, making it the preferred format for web use. Most modern browsers support it natively.',
        },
        {
          q: 'Is AVIF supported in all browsers?',
          a: 'AVIF support depends on your browser. Chrome, Firefox, and Edge support it. Safari added support in version 16. If your browser does not support encoding AVIF, the option will not appear in the output format list.',
        },
      ],
      content: `
        <p>Different image formats serve different purposes, and choosing the right one affects file size, quality, and compatibility. PNG is the go-to format for screenshots, illustrations, and any image where lossless quality matters. JPG is standard for photographs and any scenario where small file size is more important than pixel-perfect accuracy. WebP and AVIF are modern formats that deliver better compression than either PNG or JPG, making them the smart choice for web publishing.</p>
        <p>This converter uses the browser's native Canvas API to handle the conversion. Your image is drawn to an off-screen canvas and then exported in the target format. This approach supports all formats the browser itself can encode, which in modern Chromium-based browsers includes JPEG, PNG, WebP, and AVIF.</p>
        <p>For JPG and WebP output, a quality slider lets you control the trade-off between file size and visual sharpness. A quality of 85–90% is a good default for photographs; lower values produce smaller files at the cost of visible compression artifacts. PNG and AVIF (lossless mode) ignore the quality setting because they are lossless.</p>
        <p>No file is sent to any server. The conversion happens entirely within your browser tab, which is safe for any image regardless of its content.</p>
      `.trim(),
    },
    related: ['image-compress', 'image-resize', 'image-to-base64', 'images-to-pdf'],
  },
  {
    slug: 'image-compress',
    name: 'Image Compress',
    category: 'image',
    kind: 'client-pure',
    icon: 'minimize',
    description: 'Shrink JPEG and PNG files without visible quality loss, entirely in browser.',
    component: 'ImageCompress',
    seo: {
      title: 'Image Compressor — Compress Images Free Online Without Quality Loss',
      description:
        'Compress JPEG and PNG images without visible quality loss. Shows before/after file sizes. Runs locally in your browser — no file upload needed.',
      keywords: ['image compressor', 'compress image online', 'reduce image size', 'jpg compressor', 'png optimizer free'],
      faq: [
        {
          q: 'How much can image compression reduce file size?',
          a: 'Results depend heavily on the source image. Unoptimized JPEGs saved by cameras often compress 40–70% with no visible difference. PNGs with large flat-color areas can compress significantly; complex photos compress less.',
        },
        {
          q: 'What is the difference between lossy and lossless compression?',
          a: 'Lossy compression (used for JPEG) discards some pixel information to achieve smaller sizes. Lossless compression reorganizes the data without discarding anything. For most photographs, high-quality lossy compression produces files indistinguishable from the original.',
        },
        {
          q: 'Will the compressed image dimensions change?',
          a: 'No. Compression only affects file size, not the pixel dimensions. If you also want to resize, use the Image Resize tool after compressing.',
        },
      ],
      content: `
        <p>Large image files slow down web pages, fill up storage quotas, and make email attachments unwieldy. Compression reduces file size while preserving visual quality — but doing it well requires the right algorithm and quality setting for each image type. This tool applies industry-standard compression using browser-image-compression, a library tuned for high-quality output at dramatically smaller sizes.</p>
        <p>For JPEG images, the tool applies progressive encoding and optimized Huffman tables, which typically removes 30–60% of the file size for camera-exported photos that have not been compressed before. You can set a target maximum file size in kilobytes or a quality percentage, and the library iterates until it hits your target while staying as close to lossless as possible.</p>
        <p>For PNG images, the compressor applies more aggressive filtering and better deflate parameters than many image editors use by default. The result is a lossless file — every pixel is identical to the original — but stored more efficiently.</p>
        <p>The before and after file sizes are displayed side by side before you download, so you can see exactly how much was saved and decide whether to accept the result or try different settings. Everything runs in your browser; no file is transmitted anywhere.</p>
      `.trim(),
    },
    related: ['image-convert', 'image-resize', 'images-to-pdf', 'pdf-compress'],
  },
  {
    slug: 'image-resize',
    name: 'Image Resize & Crop',
    category: 'image',
    kind: 'client-pure',
    icon: 'crop',
    description: 'Resize or crop images to exact pixel dimensions in your browser.',
    component: 'ImageResizeCrop',
    seo: {
      title: 'Image Resize & Crop — Resize Images Online Free',
      description:
        'Resize images to exact pixel dimensions or crop to a specific area. Preview the result before downloading. Runs locally — no file upload required.',
      keywords: ['image resize', 'resize image online', 'crop image', 'image resizer free', 'resize photo online'],
      faq: [
        {
          q: 'Will resizing to a smaller size reduce quality?',
          a: 'Downscaling always involves some detail loss, but the browser uses bilinear or bicubic interpolation which produces smooth results for most images. Upscaling a small image to a much larger size will appear blurry because there is not enough original pixel data.',
        },
        {
          q: 'Can I maintain the aspect ratio?',
          a: 'Yes. The "Lock aspect ratio" option keeps width and height in proportion — change one and the other updates automatically.',
        },
        {
          q: 'What is the maximum image size this tool can handle?',
          a: 'There is no enforced limit, but very large images (over 20 megapixels) may be slow to process because the browser must allocate a canvas of that size in memory.',
        },
      ],
      content: `
        <p>Resizing images is a fundamental task for web publishing, social media, email, and print preparation. Different platforms have different dimension requirements — a Twitter card image is 1200×628 pixels, an Instagram square is 1080×1080, a YouTube thumbnail is 1280×720 — and preparing images to exactly those specifications saves time and avoids automatic cropping by the platform.</p>
        <p>This tool offers both resize and crop operations. Resizing scales the entire image to your target dimensions, optionally locking the aspect ratio so the image is not distorted. Cropping extracts a rectangular area from the original image at its original resolution, useful for trimming whitespace, removing an unwanted element at the edge of a photo, or creating a square version of a landscape image.</p>
        <p>The Canvas API handles the operation natively in your browser with no server round-trip. After setting your dimensions, a live preview updates so you can judge the result before downloading. The output format is configurable — you can save the result as PNG, JPEG, or WebP regardless of the input format.</p>
        <p>Common use cases include preparing a profile photo to meet a specific pixel dimension requirement, cropping a product photo for an e-commerce listing, preparing images for a web banner, or creating thumbnails from larger source images for a gallery.</p>
      `.trim(),
    },
    related: ['image-compress', 'image-convert', 'image-rotate', 'image-watermark'],
  },
  {
    slug: 'image-rotate',
    name: 'Image Rotate & Flip',
    category: 'image',
    kind: 'client-pure',
    icon: 'flip-horizontal',
    description: 'Rotate images 90/180/270° or flip horizontally and vertically in your browser.',
    component: 'ImageRotateFlip',
    seo: {
      title: 'Image Rotate & Flip — Rotate Images Online Free',
      description:
        'Rotate images 90, 180, or 270 degrees and flip them horizontally or vertically. Instant preview, no file upload required. Free and private.',
      keywords: ['rotate image online', 'flip image', 'image rotator', 'rotate photo free', 'mirror image online'],
      faq: [
        {
          q: 'Does rotation change the file format?',
          a: 'No. If you input a JPG, the output is also JPG. PNG stays PNG. However, note that rotating a JPEG re-encodes it, which can introduce a tiny amount of quality loss because JPEG is lossy.',
        },
        {
          q: 'What is the difference between rotate and flip?',
          a: 'Rotation turns the image by a fixed angle (90, 180, or 270 degrees clockwise). Horizontal flip mirrors left-to-right. Vertical flip mirrors top-to-bottom. You can combine multiple operations before downloading.',
        },
        {
          q: 'Can I fix the automatic rotation from my phone camera?',
          a: 'Yes. Camera phones store the orientation in EXIF metadata, and some viewers apply it while others show the raw rotation. This tool applies the visual transformation and strips the EXIF orientation tag so the result displays consistently everywhere.',
        },
      ],
      content: `
        <p>Photos taken on smartphones often appear rotated when viewed in certain apps or uploaded to websites that ignore EXIF orientation metadata. Scanned documents may come out sideways depending on how the paper was fed. Images downloaded from the web may be mirrored unexpectedly. These are simple fixes that should not require opening a full image editor.</p>
        <p>This tool applies rotation and flip operations using the browser's Canvas API. The image is drawn to a canvas with the appropriate transformation matrix applied, then exported as a new image file. The operation is non-destructive to the original file — the output is a separate download.</p>
        <p>Rotation is available in 90-degree increments clockwise. Flipping is available horizontally (left-to-right mirror) and vertically (top-to-bottom mirror). You can chain multiple operations — for example, rotate 90 degrees clockwise and then flip horizontally — before downloading.</p>
        <p>A common use case is correcting camera orientation: if a photo appears sideways, a single 90-degree rotation fixes it. For text appearing mirrored (for example, a screenshot of a mirror selfie where text is reversed), a horizontal flip corrects it. All of this runs in your browser in under a second for typical image sizes.</p>
      `.trim(),
    },
    related: ['image-resize', 'image-compress', 'image-watermark', 'pdf-rotate'],
  },
  {
    slug: 'image-watermark',
    name: 'Image Watermark',
    category: 'image',
    kind: 'client-pure',
    icon: 'type',
    description: 'Add a custom text watermark to images with control over position and opacity.',
    component: 'ImageWatermark',
    seo: {
      title: 'Image Watermark — Add Text Watermark to Images Free Online',
      description:
        'Add a custom text watermark to your images. Control font size, opacity, position, and rotation. Runs in your browser — no file upload required.',
      keywords: ['image watermark', 'add watermark to image', 'photo watermark online', 'text watermark free', 'watermark photos'],
      faq: [
        {
          q: 'Can I add a logo instead of text?',
          a: 'Currently this tool supports text watermarks only. Logo/image watermark support is planned for a future update.',
        },
        {
          q: 'What fonts are available?',
          a: 'The watermark uses the system fonts available in your browser. Sans-serif and serif options are included, and you can adjust size, weight, and opacity.',
        },
        {
          q: 'Will the watermark affect image quality?',
          a: 'The watermark is composited onto the image using the Canvas API and then re-exported. For JPEG outputs, this re-encoding may introduce a very slight quality reduction. PNG output is lossless.',
        },
      ],
      content: `
        <p>Protecting your photographs and images from unauthorized use, identifying your work when sharing on social media, or marking portfolio images with your name or website are all common reasons to add a watermark. Text watermarks are fast, customizable, and sufficient for most purposes without the complexity of image-based overlays.</p>
        <p>This tool overlays text on your image using the browser's Canvas API with full control over placement and appearance. The text can be positioned in any corner, centered, or placed diagonally across the entire image. Opacity controls how prominent the mark is — a low opacity makes it subtle while still being visible; full opacity makes it bold and obvious.</p>
        <p>Font size, color, and weight are all adjustable. A diagonal tiled watermark (like "SAMPLE" or your name repeated across the image) is effective for strong protection. A corner watermark is better for clean branding without obscuring the subject.</p>
        <p>Because the watermarking runs in your browser, it is suitable for private images you would not want to upload to a third-party service. Wedding photos, personal portraits, client work, or any image with sensitive content can all be watermarked safely without ever leaving your device.</p>
      `.trim(),
    },
    related: ['image-resize', 'image-rotate', 'image-compress', 'pdf-watermark'],
  },
  {
    slug: 'image-to-base64',
    name: 'Image to Base64',
    category: 'image',
    kind: 'client-pure',
    icon: 'code',
    description: 'Encode any image as a Base64 data URI for embedding directly in HTML or CSS.',
    component: 'ImageToBase64',
    seo: {
      title: 'Image to Base64 Encoder — Convert Images to Data URI Free Online',
      description:
        'Convert images to Base64 data URIs for embedding in HTML, CSS, or JSON. Instant, runs in your browser. Supports JPEG, PNG, WebP, SVG, and GIF.',
      keywords: ['image to base64', 'image encoder base64', 'data uri generator', 'convert image to base64 online', 'base64 image encoder free'],
      faq: [
        {
          q: 'When should I embed images as Base64 instead of using a URL?',
          a: 'Base64 embedding eliminates one HTTP request per image, which can speed up initial render for small images like icons or inline CSS backgrounds. It is not recommended for large images because Base64 encoding increases size by about 33% and prevents browser caching of the image separately from the page.',
        },
        {
          q: 'What is the format of the output?',
          a: 'The output is a data URI: a string starting with "data:image/png;base64," (or the appropriate MIME type) followed by the Base64-encoded image data. This string can be used directly as an img src, CSS background-image value, or in JSON.',
        },
        {
          q: 'Is there a size limit?',
          a: 'There is no hard limit imposed by this tool. However, very large images produce very long Base64 strings that may hit limits in HTML attributes or CSS values depending on the browser.',
        },
      ],
      content: `
        <p>Base64 encoding converts binary data — like an image file — into a string of ASCII characters that can be embedded directly in text-based formats like HTML, CSS, JavaScript, or JSON. This technique is commonly used to inline small images (icons, loading spinners, decorative elements) directly into a web page, eliminating the separate HTTP request that a URL reference would require.</p>
        <p>The output is a data URI: a self-contained string in the format "data:[MIME type];base64,[encoded data]". Paste this string as the src of an img tag and it renders the image without any network request. Use it as a CSS background-image value, inside a JSON response, or in an email template where external image hosting is unreliable.</p>
        <p>This tool reads your file using the browser's FileReader API and produces the data URI immediately. No network request is made — the conversion is purely a local operation on your device. The output string is displayed in a copyable text area and you can choose to copy either the full data URI or just the raw Base64 payload, depending on what your use case requires.</p>
        <p>Keep in mind that Base64 encoding increases data size by approximately 33%. For small images (under 5 KB), this trade-off is almost always worth the saved HTTP request. For large images, a URL reference is almost always the better choice for performance.</p>
      `.trim(),
    },
    related: ['image-convert', 'image-compress', 'base64-codec', 'image-resize'],
  },
];
