import type { ToolDefinition } from '@toolorbit/tool-types';

export const imageTools: ToolDefinition[] = [
  {
    slug: 'image-convert',
    name: 'Image Format Converter',
    category: 'image',
    kind: 'client-pure',
    icon: 'image',
    description: 'Convert images between JPG, PNG, WebP, and AVIF formats in your browser.',
    component: 'ImageConvert',
    seo: {
      title: 'Image Converter - Convert JPG PNG WebP AVIF Free Online',
      description: 'Convert images between JPG, PNG, WebP, and AVIF formats instantly in your browser. No upload, no server. Control output quality.',
      keywords: ['image converter', 'jpg to png', 'png to jpg', 'webp converter', 'convert image format online', 'avif converter', 'image format converter free'],
      faq: [
        { q: 'Does converting from JPG to PNG restore lost quality?', a: 'No. JPG compression is lossy and irreversible. Converting a JPG to PNG saves the current pixel values without further loss, but the detail that JPEG compression discarded cannot be recovered. The PNG will be lossless from that point forward, but it will not be higher quality than the source JPG.' },
        { q: 'What is the quality slider for?', a: 'The quality slider applies only to JPEG and WebP outputs, which support lossy encoding. PNG and AVIF with lossless mode ignore it. For JPEG, 85% quality is typically indistinguishable from 100% at significantly smaller file sizes.' },
        { q: 'Which format should I use for web images?', a: 'WebP offers the best balance of quality and file size for web use and is supported by all modern browsers. AVIF provides even better compression but has slightly less universal support. Use PNG for images with text overlays, logos, or hard edges; use JPEG or WebP for photographs.' },
        { q: 'Does my image get uploaded to a server?', a: 'No. Conversion uses the browser\'s Canvas API and the native image decoding built into every modern browser. Nothing leaves your device.' },
      ],
      content: `<p>Image format conversion is one of the most frequently needed image tasks. Different contexts demand different formats: web pages need small file sizes and broad browser support, professional printing needs lossless formats, mobile apps have specific format requirements, and social media platforms have their own restrictions. This tool converts between the four major web image formats - JPEG, PNG, WebP, and AVIF - entirely in your browser using the Canvas API.</p>

<h2>Understanding the four formats</h2>
<p>JPEG (Joint Photographic Experts Group) uses lossy compression designed for photographs. It discards detail in a way that is mostly invisible to the human eye - particularly in areas of gradual tone change like sky or skin. JPEG is universally supported and produces small file sizes for photographic content. PNG (Portable Network Graphics) uses lossless compression. Every pixel is stored exactly, making it ideal for screenshots, diagrams, text overlays, and any image where sharp edges matter. PNG also supports full alpha-channel transparency, which JPEG does not. WebP is a modern format developed by Google that offers both lossy and lossless modes at better compression ratios than JPEG and PNG respectively. It is supported in all modern browsers and is the recommended format for web images. AVIF (AV1 Image File Format) is the newest format, offering superior compression to WebP at comparable quality - often 30–50% smaller than equivalent WebP files. Browser support is now broad enough for production use on most web applications.</p>

<h2>How browser-side conversion works</h2>
<p>The conversion process draws the source image onto an HTML Canvas element, then calls <code>canvas.toBlob()</code> or <code>canvas.toDataURL()</code> with the target MIME type and quality parameter. The browser's native image encoder handles the compression. This approach is fast and requires no external library, but it is limited to formats the browser natively encodes. All modern browsers encode JPEG, PNG, and WebP; AVIF encoding support is available in Chrome and Firefox but not yet all browsers - the tool falls back to WebP if AVIF encoding is unavailable.</p>

<h2>Choosing the right output quality</h2>
<p>For JPEG output, 85% quality produces images visually indistinguishable from 100% quality for most photographs while being significantly smaller. Below 60%, compression artifacts (blocky areas, color banding near edges) become visible. For WebP lossy output, 80% quality is typically comparable to JPEG at 90% quality, making WebP the better choice for web optimization. PNG and lossless AVIF have no quality setting - every pixel is stored exactly.</p>

<h2>Transparency handling</h2>
<p>PNG supports full alpha-channel transparency. When converting a PNG with transparent areas to JPEG - which has no transparency support - the transparent areas are filled with a background color (typically white). When converting to WebP or AVIF, transparency is preserved. If you need a transparent image in a format that supports it and are starting from a JPEG, you will need to manually add transparency using an image editor - it cannot be recovered from the JPEG because the JPEG never stored it.</p>

<h2>Batch conversion</h2>
<p>This tool supports batch conversion - upload multiple images at once and they are all converted to the same target format and quality setting. The converted files download individually. For large-scale automated conversion (hundreds or thousands of images), command-line tools like <code>ImageMagick</code>, <code>cwebp</code>, or <code>ffmpeg</code> with shell scripting are more efficient. The browser-based tool is optimal for occasional conversion of a manageable number of files.</p>
<h2>AVIF - the newest format worth understanding</h2>
<p>AVIF (AV1 Image File Format) is derived from the AV1 video codec and produces significantly smaller files than WebP at comparable visual quality - typically 30–50% smaller than equivalent WebP files and 50–70% smaller than JPEG. Browser support is now broad: Chrome 85+ (2020), Firefox 93+ (2021), Safari 16+ (2022). The main remaining concern is encoding speed - AVIF encoding is CPU-intensive and slow, which matters for dynamic image processing pipelines but not for static pre-converted assets. For static website images converted in advance (as this tool does), AVIF is the optimal choice for maximum performance. Use a WebP fallback via the HTML <code>&lt;picture&gt;</code> element for users on older Safari versions.</p>
<h2>Choosing between lossy and lossless</h2>
<p>The choice between lossy (JPEG, lossy WebP, lossy AVIF) and lossless (PNG, lossless WebP, lossless AVIF) encoding depends on the image content and the acceptable quality floor. Photographs: always lossy - the human eye is not sensitive to the subtle errors lossy compression introduces in photographic content, and file sizes are dramatically smaller. Illustrations with flat colors, logos, text overlays: lossless - lossy compression produces visible artifacts (color banding, blurry edges) on high-contrast geometric content. Screenshots of user interfaces: generally PNG (lossless) for the same reason. If a screenshot includes photographs as part of the UI, the trade-off depends on whether the text in the screenshot needs to be sharp.</p>
`,
    },
    related: ['image-compress', 'image-resize', 'image-watermark', 'image-to-base64'],
  },

  {
    slug: 'image-compress',
    name: 'Image Compressor',
    category: 'image',
    kind: 'client-pure',
    icon: 'minimize',
    description: 'Reduce image file size without visible quality loss using smart compression.',
    component: 'ImageCompress',
    seo: {
      title: 'Image Compressor - Reduce Image Size Free Online, No Upload',
      description: 'Compress JPG and PNG images to reduce file size without visible quality loss. Runs in your browser - your images are never uploaded.',
      keywords: ['image compressor', 'compress image online', 'reduce image size', 'image optimizer', 'compress jpg', 'compress png free', 'image size reducer'],
      faq: [
        { q: 'How much can I reduce an image\'s file size?', a: 'A JPEG photo straight from a digital camera is often saved at 95–100% quality. Compressing to 80% quality typically reduces file size by 60–70% with no visible quality difference. PNG files with large areas of flat color compress 40–80% depending on content complexity.' },
        { q: 'Will compression degrade my image noticeably?', a: 'At 75–85% quality, JPEG compression is virtually invisible to the human eye for photographic content. Quality below 60% begins showing block artifacts. The preview in this tool lets you compare original and compressed before saving.' },
        { q: 'Does my image get sent to a server?', a: 'No. This tool uses the browser-image-compression library which runs entirely in your browser tab. Your image never leaves your device.' },
        { q: 'Should I use PNG or JPEG for web images?', a: 'JPEG for photographs and images with many colors - smaller files with acceptable quality. PNG for logos, screenshots, text overlays, or images requiring transparency - lossless and sharp on edges.' },
      ],
      content: `<p>Large image files are one of the biggest contributors to slow page load times and wasted storage. A photograph fresh from a smartphone camera can easily be 4–8MB; most web pages can serve the same image at visually identical quality in 200–400KB. This tool applies smart compression to reduce image file sizes dramatically while keeping the visual result indistinguishable from the original at normal viewing distances.</p>

<h2>How lossy JPEG compression works</h2>
<p>JPEG compression works in several stages. The image is first converted from RGB to a luminance-chrominance color space (YCbCr) because human vision is more sensitive to brightness variation than color variation - this allows more compression on the color channels. The image is then divided into 8×8 pixel blocks, and each block undergoes a discrete cosine transform (DCT) that converts spatial information into frequency information. The "quality" setting determines how aggressively higher-frequency detail is discarded. At 100% quality, almost all detail is retained. At 85%, the discarded detail is almost always imperceptible. At 60%, block-shaped artifacts begin appearing in areas of fine detail or sharp color boundaries.</p>

<h2>PNG compression</h2>
<p>PNG uses lossless compression - no pixel information is ever discarded. The compression is purely algorithmic: the image data is passed through a filter step (which predicts each pixel's value from its neighbors to make the data more compressible) and then through DEFLATE compression (the same algorithm used in gzip). Different PNG encoders make different trade-offs between compression ratio and encoding time. This tool applies maximum-effort lossless compression, which can reduce PNG file sizes by 10–40% compared to naively-encoded PNGs without changing a single pixel.</p>

<h2>Compression versus resizing</h2>
<p>Compression and resizing both reduce file size but through fundamentally different means. Compression reduces the amount of data needed to represent the same image dimensions. Resizing reduces the number of pixels. For web use, both are typically applied: a 4000×3000 pixel camera photo is first resized to a maximum web width (say, 1920px), then compressed. This tool handles compression; use the Image Resizer tool for resizing. Applied together, these two steps typically reduce a camera photo from 5MB to under 150KB.</p>

<h2>The preview comparison</h2>
<p>The tool shows a side-by-side before/after preview with file size for both the original and compressed version. This lets you identify the optimal quality setting for your specific image - the lowest quality that still looks acceptable to your eye. For important images, zoom into fine-detail areas (human faces, text, fine lines) where JPEG artifacts are most visible. These are the areas most likely to show quality loss before the overall image looks degraded.</p>

<h2>Bulk compression</h2>
<p>Upload multiple images to compress them all at the same quality setting in one batch. This is useful for preparing an entire directory of product images for an e-commerce site, optimizing a gallery before uploading to a website builder, or reducing the size of a batch of photos before emailing. The compressed files maintain their original filenames with a "compressed-" prefix and download individually.</p>
<h2>Progressive JPEG versus baseline JPEG</h2>
<p>Standard (baseline) JPEG loads from top to bottom - the browser progressively reveals the image as data streams in. Progressive JPEG encodes the image in multiple passes: the first pass delivers a low-quality version of the entire image, subsequent passes refine quality in areas across the whole image. Progressive JPEG is typically 2–10% smaller than baseline JPEG at the same quality setting and provides a better perceived loading experience for large images on slow connections. The browser-image-compression library used by this tool can output progressive JPEG - enable the progressive option when compressing large photographic images for web use.</p>
<h2>Optimizing PNG with pngquant</h2>
<p>PNG files with many colors (photographic content or complex illustrations) compress poorly compared to JPEG because PNG lossless compression cannot exploit the limited palette that makes simple PNG images small. pngquant is a lossy PNG compression tool that reduces a full-color PNG to a quantized palette of 256 or fewer colors using dithering - it produces files 60–80% smaller than the input while maintaining reasonable visual quality for many content types. The output is still a valid PNG file (so it still supports transparency) but uses palette-based encoding rather than full-color. This tool uses lossless compression only; for maximum PNG compression, run pngquant as a post-processing step.</p>
`,
    },
    related: ['image-convert', 'image-resize', 'image-watermark', 'pdf-compress'],
  },

  {
    slug: 'image-resize',
    name: 'Image Resizer & Cropper',
    category: 'image',
    kind: 'client-pure',
    icon: 'crop',
    description: 'Resize by dimensions or percentage, or crop to exact dimensions in your browser.',
    component: 'ImageResizeCrop',
    seo: {
      title: 'Image Resizer & Cropper - Resize Images Free Online',
      description: 'Resize images by pixel dimensions or percentage, or crop to exact sizes. Runs in your browser, no upload, instant results.',
      keywords: ['image resizer', 'resize image online', 'crop image free', 'image cropper', 'resize photo', 'change image size', 'resize jpg png online free'],
      faq: [
        { q: 'What is the difference between resize and crop?', a: 'Resize changes the overall dimensions of the image while keeping all the content visible - the image is scaled up or down. Crop cuts out a portion of the image at specific coordinates, removing the rest. Resizing to a different aspect ratio requires either stretching (which distorts) or adding padding.' },
        { q: 'What does "maintain aspect ratio" mean?', a: 'If you change only the width, the height is calculated automatically to keep the original proportions. This prevents the image from appearing stretched or squashed.' },
        { q: 'What algorithm is used for resizing?', a: 'The browser\'s Canvas API uses bilinear interpolation for scaling. This is a standard resampling algorithm that produces good results for most photographic content. For very large upscaling or pixel-art content, specialized algorithms (like Lanczos or nearest-neighbour) may produce better results.' },
        { q: 'Can I resize to common social media dimensions?', a: 'Yes. The tool includes presets for common sizes: Instagram square (1080×1080), Twitter header (1500×500), Facebook cover (820×312), LinkedIn profile (400×400), and YouTube thumbnail (1280×720).' },
      ],
      content: `<p>Images need to be resized for almost every use case outside of direct file archiving. Social media platforms have specific dimension requirements for profile photos, cover images, and post images. Web pages need images sized to their actual display dimensions to avoid wasted bandwidth. Email clients have width constraints. Print workflows need images at specific DPI and physical dimensions. This tool handles all resizing and cropping tasks entirely in your browser.</p>

<h2>Resize versus crop - choosing the right operation</h2>
<p>Resizing scales the entire image to new dimensions. Every pixel in the original contributes to the resized output. If the aspect ratio changes (for example, resizing a 16:9 image to 1:1), either the image is distorted (stretched horizontally or vertically), or you must add padding to fill the difference, or some content is cropped away. Cropping, on the other hand, removes the areas outside a specified rectangle without scaling. It changes dimensions by removing content. Most workflows use both: resize the image to approximately the right size, then crop to the exact required dimensions.</p>

<h2>How browser resizing works</h2>
<p>Resizing uses the HTML Canvas API. The image is drawn onto a canvas of the target size using <code>ctx.drawImage()</code>, which applies the browser's built-in scaling algorithm (bilinear interpolation by default in most browsers). The canvas content is then exported as a new image file. Bilinear interpolation produces smooth edges and good quality for typical photographic content. For images with hard geometric edges - icons, diagrams, pixel art - bicubic or Lanczos interpolation would produce sharper results, though these require a more complex implementation. For the downscaling use case (making images smaller), which is by far the most common, bilinear interpolation produces excellent results.</p>

<h2>Social media dimension presets</h2>
<p>Social platforms enforce specific image dimensions and will either reject off-spec images or crop them automatically (often at an inconvenient position). The presets in this tool cover the most commonly needed sizes: Instagram feed posts (1080×1080 square, or 1080×566 landscape), Twitter/X header (1500×500), Facebook cover photo (820×312), LinkedIn profile picture (400×400 for display, 800×800 for upload), and YouTube thumbnail (1280×720). Select a preset and the target dimensions are filled in automatically.</p>

<h2>Percentage-based resizing</h2>
<p>Sometimes you know you want an image at "half the original size" or "150% larger" without knowing or caring about the specific pixel dimensions. Percentage mode calculates the target dimensions from the source dimensions - useful for consistent downscaling of a batch of images that all need to end up at the same scale relative to their originals, even if they started at different sizes.</p>

<h2>Quality considerations</h2>
<p>When resizing to a smaller size (downscaling), the output quality is excellent - the algorithm is averaging information that was already there. When resizing to a larger size (upscaling), the algorithm must invent pixels that do not exist in the source - the result is always blurrier than the original because no algorithm can create real detail from less data. If you need a large version of a small image, upscaling is the only browser-side option, but the result will be softer than a native high-resolution source. For logos and vector graphics, request the original SVG or vector file and export at the required size rather than upscaling a raster version.</p>
<h2>Retina and high-DPI display considerations</h2>
<p>Modern displays - smartphones, MacBooks with Retina displays, Windows devices with high-DPI settings - have device pixel ratios of 2x, 3x, or even 4x. An image displayed at 400×400 CSS pixels on a 2x display actually needs 800×800 physical pixels to appear sharp. If you only serve a 400×400 image, it will appear blurry or soft on high-DPI screens. The correct approach is to provide multiple resolutions using the HTML <code>srcset</code> attribute: <code>&lt;img src="image-400.jpg" srcset="image-800.jpg 2x, image-1200.jpg 3x"&gt;</code>. This tool can generate the 2x and 3x variants by resizing to the appropriate dimensions - generate the base size at your intended CSS display size and the retina sizes at 2× and 3× multiples.</p>
<h2>Resizing for email templates</h2>
<p>HTML email has specific image requirements: images wider than 600px often overflow on mobile email clients; Outlook does not support WebP and requires JPEG or PNG; some email clients block image loading by default requiring alt text. The recommended practice for email images is to resize all images to a maximum of 600px width (matching standard email column width), use JPEG at 70–80% quality for photographs, and host images on a public server (Base64 images in email dramatically increase message size and are often blocked by spam filters). When resizing email images, use 2× your target pixel dimensions for good rendering on Retina displays in Apple Mail and iOS Mail, which are the most common email clients to support high-DPI rendering.</p>
`,
    },
    related: ['image-compress', 'image-convert', 'image-rotate', 'image-watermark'],
  },

  {
    slug: 'image-rotate',
    name: 'Image Rotator & Flipper',
    category: 'image',
    kind: 'client-pure',
    icon: 'flip-horizontal-2',
    description: 'Rotate images 90°/180°/270° or flip horizontally/vertically in your browser.',
    component: 'ImageRotateFlip',
    seo: {
      title: 'Image Rotator & Flipper - Rotate Flip Images Free Online',
      description: 'Rotate images 90, 180, or 270 degrees, or flip horizontally and vertically. Runs in your browser, no upload, instant download.',
      keywords: ['rotate image', 'flip image online', 'image rotator free', 'rotate photo 90 degrees', 'flip photo horizontal', 'rotate jpg online'],
      faq: [
        { q: 'Why does my photo appear rotated in some apps but correct in others?', a: 'Digital cameras record orientation as EXIF metadata rather than rotating the actual pixels. Apps that read EXIF data display the image correctly; apps that ignore it show the raw pixel orientation. This tool rotates the actual pixels so the output is correct in any application, regardless of EXIF support.' },
        { q: 'Does rotating an image degrade its quality?', a: 'Rotating by 90, 180, or 270 degrees is mathematically lossless for PNG and other lossless formats. JPEG rotation at these angles is also lossless when performed at the 8×8 block level, though browser Canvas-based rotation re-encodes the JPEG, which may apply slight quality changes. Use PNG output if lossless rotation is critical.' },
        { q: 'What is the difference between horizontal and vertical flip?', a: 'A horizontal flip mirrors the image left-to-right - text becomes mirrored. A vertical flip mirrors the image top-to-bottom - the image appears upside down but not mirrored left-to-right.' },
        { q: 'Can I apply both a rotation and a flip?', a: 'Yes. Apply operations sequentially - flip first, then rotate, or combine them in any order. The canvas state is updated after each operation.' },
      ],
      content: `<p>Image rotation and flipping are fundamental editing operations needed in dozens of everyday situations. Smartphone photos taken sideways need a 90-degree correction. Mirror-image screenshots from a front-facing camera need a horizontal flip. Overhead product photography that was set up upside-down needs a 180-degree rotation. This tool applies all standard orientation corrections in seconds, entirely in your browser.</p>

<h2>Camera EXIF orientation - why photos look wrong</h2>
<p>Modern cameras - especially smartphones - do not always rotate the pixel data when you turn the camera sideways. Instead, they record the camera's physical orientation as a number in the image's EXIF metadata (the tag is called Orientation, tag 0x0112). When a properly EXIF-aware application opens the image, it reads this tag and displays the image correctly. When you open the same image in an application that does not read EXIF orientation data - many older image editors, email clients, and web applications - it displays the raw pixel data, which is sideways. This tool solves the problem permanently by actually rotating the pixel data and stripping the conflicting EXIF orientation tag, so the image displays correctly everywhere regardless of EXIF support.</p>

<h2>Lossless rotation</h2>
<p>Rotating by exactly 90, 180, or 270 degrees is a mathematically perfect operation for pixel arrays. Every pixel moves to a deterministic new position with no information loss. For PNG, GIF, and other lossless formats, this is truly lossless end-to-end. For JPEG, the situation is slightly more complex: JPEG compression divides the image into 8×8 blocks, and lossless rotation can be performed at the block level (using a tool like jpegtran) without touching the compressed data. Browser-based rotation via Canvas re-encodes the JPEG, which applies a new JPEG compression pass and may introduce slight quality changes. If preserving JPEG quality exactly is critical, download the rotated image as PNG, or use jpegtran for truly lossless JPEG rotation.</p>

<h2>Flip operations</h2>
<p>A horizontal flip (also called mirroring) reverses the image left-to-right. Text in a horizontally flipped image reads as a mirror image - backwards. This operation is commonly used to correct selfie-mode smartphone photos where the front camera applies a mirror effect during preview but may or may not flip the saved image depending on the app. A vertical flip reverses the image top-to-bottom. This is equivalent to a 180-degree rotation followed by a horizontal flip. The Canvas API implements both flips by applying a negative scale transform before drawing the image.</p>

<h2>Combining operations</h2>
<p>Multiple operations can be applied in sequence. Rotating 90 degrees clockwise and then flipping horizontally produces the same result as rotating 90 degrees counter-clockwise. Rotating 180 degrees is equivalent to flipping both horizontally and vertically. The tool maintains a running canvas state, so each operation applies to the result of the previous one - you can apply any combination of rotations and flips before downloading the final result.</p>

<h2>Use in creative workflows</h2>
<p>Beyond correcting orientation errors, rotation and flipping are used creatively: creating mirror-image compositions, generating left-facing and right-facing versions of a directional logo, creating symmetrical patterns by flipping and compositing, and rotating maps or diagrams to align with a specific reference direction. These applications all benefit from the same technically simple operations.</p>
<h2>Rotating images for specific platforms</h2>
<p>Different platforms have specific orientation expectations that arise from their historical context. Instagram's original 1:1 square format means portrait photos need to be cropped to square - rotation alone is not enough. Twitter and LinkedIn display images in their natural orientation but crop to their preview aspect ratios in timelines; landscape photos work best. YouTube thumbnails must be 16:9 landscape; a portrait photo would be letter-boxed or cropped. When preparing images for social media, think about both orientation (portrait vs landscape) and aspect ratio simultaneously - a tool that handles both rotation and cropping is more efficient than doing them separately.</p>
<h2>Exporting correctly rotated images from design tools</h2>
<p>Vector design tools (Figma, Sketch, Illustrator) and image editors (Photoshop, GIMP) handle rotation differently from simple pixel rotation. In Photoshop, "Image Rotation" in the Image menu rotates the canvas - this is equivalent to what this tool does. The "Transform → Rotate" command in Photoshop's layer tools rotates the layer content without changing the canvas dimensions, which is different. When exporting a rotated element from Figma, select the element, adjust its rotation property to 0 in the inspector (which bakes the current rotation into the export coordinates), and then export. This ensures the exported image has the correct orientation without requiring post-export rotation.</p>
`,
    },
    related: ['image-compress', 'image-resize', 'image-convert', 'image-watermark'],
  },

  {
    slug: 'image-watermark',
    name: 'Image Watermark',
    category: 'image',
    kind: 'client-pure',
    icon: 'stamp',
    description: 'Add text or image watermarks to photos for protection and branding.',
    component: 'ImageWatermark',
    seo: {
      title: 'Image Watermark - Add Watermark to Photos Free Online',
      description: 'Add text watermarks to your photos for copyright protection and branding. Control position, opacity, and font size. Runs in your browser.',
      keywords: ['image watermark', 'add watermark to photo', 'watermark photos online free', 'photo watermark tool', 'copyright watermark image', 'brand photos online'],
      faq: [
        { q: 'Can the watermark be removed by someone else?', a: 'A rendered text watermark merged into the image pixels is difficult to remove cleanly, especially when placed over complex image areas. However, watermarks on plain or uniform backgrounds can be removed with content-aware fill tools. For maximum protection, place watermarks across important compositional areas.' },
        { q: 'Can I add my logo as a watermark?', a: 'Currently this tool supports text watermarks. Logo/image watermarking is planned for a future update. For image watermarking, use a tool like GIMP, Photoshop, or Canva.' },
        { q: 'Does my photo get uploaded?', a: 'No. Watermarking is performed using the HTML Canvas API entirely in your browser. Your photo never leaves your device.' },
        { q: 'What opacity should I use?', a: 'For visible copyright protection: 40–60% opacity. For subtle branding visible only on close inspection: 15–25% opacity. Fully opaque (100%) watermarks are typically used only when the goal is to make the image unusable without authorization.' },
      ],
      content: `<p>Watermarking photographs serves two distinct purposes: copyright protection and brand identification. A professional photographer adding their studio name to client proofs, a content creator protecting original artwork from unauthorized use, or a business adding its logo to product images for social media are all applying watermarks for legitimately different reasons - though the technical operation is identical. This tool adds customizable text watermarks to images entirely in your browser, with no upload required.</p>

<h2>How watermarks are applied</h2>
<p>The image is drawn onto an HTML Canvas element. The tool then configures the Canvas 2D context with the watermark text properties - font family, size, color, and globalAlpha for opacity - and calls <code>ctx.fillText()</code> at the specified position, potentially repeated in a tiled pattern across the entire image. The canvas is then exported back to an image file. The watermark pixels are merged with the image pixels in the canvas; there is no separate layer once the image is exported. This means the watermark cannot be removed simply by deleting a layer.</p>

<h2>Position and tiling options</h2>
<p>Position options include corners (top-left, top-right, bottom-left, bottom-right), center, and tiled across the entire image. For copyright protection where you want the image unusable without authorization, tiled watermarking is most effective - the watermark appears repeatedly at diagonal angles across the entire surface, leaving no large unwatermarked area for a content thief to present. For subtle branding on social media posts, a semi-transparent corner watermark is less intrusive while still identifying the creator.</p>

<h2>Choosing effective watermark settings</h2>
<p>The most removable watermarks are low-opacity text over plain or uniform background areas. If a thief can see exactly what pixels are behind the watermark, they can recreate them. Effective watermarks for protection are placed over busy, complex image areas where the underlying content is harder to infer, use sufficient opacity to be clearly visible (40% or more), and are positioned to cover the most compositionally important parts of the image - faces, key products, primary subjects.</p>

<h2>Watermarks for professional photographers</h2>
<p>Professional photographers often watermark client proofs - low-resolution versions shared for approval before purchase - to prevent clients from using the proofs directly instead of purchasing the full-resolution files. These watermarks typically include the photographer's name, website, and sometimes "PROOF" in large text. The watermark must be visible enough that the proof image is clearly unsuitable as a final product while still allowing the client to evaluate composition, color, and subject.</p>

<h2>Legal context</h2>
<p>A watermark is a visible indicator of copyright, not a technical protection mechanism. Copyright in the underlying image exists regardless of whether a watermark is present. However, visible watermarks serve an important practical role: they make infringement immediately obvious and act as a deterrent, they establish your claim to the content in any dispute, and they often convert potential infringers into legitimate customers who discover your website through the watermark.</p>
<h2>Batch watermarking for photographers</h2>
<p>Professional photographers who deliver client proofs regularly benefit from a consistent watermarking workflow. For batch watermarking beyond what a browser tool can efficiently handle, Lightroom Classic has a built-in watermark editor in the Export dialog that applies consistent text or logo watermarks to any number of images in a single export operation. For open-source alternatives, ImageMagick's composite command applies watermarks: <code>composite -gravity southeast -geometry +20+20 watermark.png input.jpg output.jpg</code>. For web galleries, consider server-side watermarking using Sharp (Node.js) or Pillow (Python) so the watermark is always applied automatically regardless of which original file is served.</p>
<h2>Choosing opacity by use case</h2>
<p>Different watermark contexts call for different opacity settings. Proof images that should prevent commercial use: 40–60% opacity, centered or tiled, clearly readable. Social media images where the watermark is a subtle brand identifier: 15–25% opacity, corner placement, small font. Confidential business documents shared as images: 30–40% opacity, diagonal across the full image. Screenshots and tutorial images where attribution is desired but the content must remain fully readable: 10–15% opacity in a corner with small font. Images intended for print where you want to indicate the rights holder: full opacity (100%) in a footer strip below the main image content, rather than overlaid on the image itself.</p>
`,
    },
    related: ['image-compress', 'image-convert', 'image-resize', 'pdf-watermark'],
  },

  {
    slug: 'image-to-base64',
    name: 'Image to Base64',
    category: 'image',
    kind: 'client-pure',
    icon: 'code',
    description: 'Convert any image to a Base64 data URI for embedding directly in HTML or CSS.',
    component: 'ImageToBase64',
    seo: {
      title: 'Image to Base64 - Convert Images to Data URI Free Online',
      description: 'Convert images to Base64 encoded data URIs for embedding in HTML, CSS, or JSON. Instant, runs in your browser - your image is never uploaded.',
      keywords: ['image to base64', 'base64 image encoder', 'convert image to base64 online', 'data uri generator', 'image data uri', 'embed image html base64'],
      faq: [
        { q: 'What is a Base64 data URI?', a: 'A data URI is a URL that contains the actual file data, encoded as Base64 text, rather than a URL pointing to an external file. Format: data:[mimeType];base64,[base64data]. An <img src="data:image/png;base64,..."> displays the image without making any HTTP request.' },
        { q: 'When should I use Base64 for images?', a: 'Embed images as Base64 when you want to eliminate an HTTP request for a small, frequently-used image like an icon or avatar. For large images, Base64 is counterproductive: it increases file size by 33%, blocks HTML parsing until fully decoded, and prevents the browser from caching the image separately.' },
        { q: 'Why does Base64 increase file size?', a: 'Base64 represents every 3 bytes of binary data as 4 ASCII characters - a 33% size increase. So a 100KB image becomes approximately 133KB as Base64. For large images, this overhead outweighs the HTTP request savings.' },
        { q: 'Can I use the data URI in CSS?', a: 'Yes. Background images, list-style-image, and border-image properties all accept data URIs. Example: background-image: url("data:image/svg+xml;base64,...")' },
      ],
      content: `<p>A Base64 data URI encodes a file's binary content as a text string that can be embedded directly in HTML, CSS, or JavaScript instead of referencing an external file. This eliminates the HTTP request that would otherwise be needed to fetch the file, which has real performance benefits for small, frequently-used assets and practical benefits for environments where external file serving is not available.</p>

<h2>How Base64 image encoding works</h2>
<p>This tool reads the image file into the browser using the FileReader API with <code>readAsDataURL()</code>, which returns the image as a complete data URI string: <code>data:[mimeType];base64,[encodedData]</code>. The entire process is synchronous and local - no server is involved. The resulting string can be pasted anywhere a URL is accepted: an HTML img src attribute, a CSS background-image URL, a JSON field, or an email template.</p>

<h2>The HTTP request trade-off</h2>
<p>Every external image reference in an HTML document requires a separate HTTP request to fetch. For a page with ten small icons, that is ten HTTP requests - ten network round trips, ten DNS lookups (if the icons are on different domains), and ten connections to negotiate. Embedding each icon as a Base64 data URI eliminates these requests entirely, which can noticeably improve First Contentful Paint on pages with many small assets. However, Base64 encoding increases the data size by 33%, and data URIs cannot be cached separately by the browser - every page load that includes the HTML also re-downloads the Base64 image data. For large images, the 33% size overhead far outweighs the saved HTTP request.</p>

<h2>Best use cases</h2>
<p>The ideal candidates for Base64 embedding are small images that appear on every page: favicons (if not using a native link tag), small UI icons used in email templates (where external images are blocked by many email clients by default), tiny decorative images below 5KB, and inline SVG that needs to be embedded as a data URI rather than used as an img src. Email clients in particular benefit from Base64 image embedding because many block external image loading by default for privacy reasons - embedding the image directly ensures it displays without the user needing to "load images."</p>

<h2>SVG as Base64 versus inline SVG</h2>
<p>For SVG images, you have a choice between encoding as Base64 and embedding directly as inline SVG markup. Inline SVG is slightly smaller (no 33% overhead), is directly styleable and scriptable with CSS and JavaScript, and participates in the document's accessibility tree. Base64-encoded SVG is more portable - it works as an img src, a CSS background-image URL, and in any context that accepts URLs. Use inline SVG when you need to manipulate or style it; use Base64 SVG when you need URL portability.</p>

<h2>Using the output</h2>
<p>The tool outputs the complete data URI string ready to paste. For use in HTML: <code>&lt;img src="data:image/jpeg;base64,/9j/4AAQ..."&gt;</code>. For use in CSS: <code>background-image: url("data:image/png;base64,iVBOR...")</code>. For use in JavaScript: assign the string to <code>image.src</code>. The tool also provides the raw Base64 string without the data URI prefix, in case you need to store it in a JSON field or database column where the MIME type is stored separately.</p>
<h2>Inline Base64 images in React and CSS-in-JS</h2>
<p>React applications that use CSS-in-JS styling (styled-components, Emotion, Stitches) can inline small images directly in component styles: <code>const Avatar = styled.div\`background-image: url('\${avatarBase64}');\`</code>. This is particularly useful for skeleton/placeholder images that display while the real image loads - a tiny blurred placeholder can be 200–400 bytes as Base64 and eliminates the layout shift (CLS) that would otherwise occur when a real image loads. Next.js's Image component uses exactly this technique for its <code>blurDataURL</code> prop, which accepts a Base64-encoded low-resolution placeholder. For SVG icons used consistently throughout an application, bundling them as Base64 strings eliminates HTTP requests for individual SVG files.</p>
<h2>Generating Base64 images from the command line</h2>
<p>For automated pipelines that need Base64 image encoding without a browser, the command line is faster. On macOS and Linux: <code>base64 -i input.png | tr -d '\n'</code> produces the raw Base64 string (without the data URI prefix). To include the complete data URI: <code>echo "data:image/png;base64,$(base64 -i input.png | tr -d '\n')"</code>. In Node.js: <code>fs.readFileSync('input.png').toString('base64')</code>. These are useful in build scripts that generate CSS or JavaScript files containing embedded images. The browser tool is most efficient for one-off conversions during development or design work.</p>
<h2>Performance implications of Base64 images</h2>
<p>Base64 encoding increases image data size by approximately 33%, but the performance impact extends beyond file size. Browsers must decode Base64 before rendering - this decoding step consumes CPU time synchronously before the image can be displayed. For a small icon (under 2KB original), this decoding cost is negligible. For a background image or hero banner (50KB+), inline Base64 can block the main thread and delay rendering. The recommended threshold for Base64 image embedding is approximately 2–4KB original file size - below this, the HTTP request overhead exceeds the decoding cost; above this, an external file reference with HTTP caching is more efficient. Modern bundlers like webpack and Vite have built-in limits (typically 4KB or 8KB) below which they automatically inline assets as Base64 data URIs. Rely on your bundler's built-in optimization rather than manually deciding which images to inline.</p>

<h2>SVG images as Base64 versus inline SVG</h2><p>For SVG graphics, you have a choice between Base64 encoding and direct inline SVG embedding. Inline SVG (pasting the SVG markup directly into the HTML) is smaller (no 33% Base64 overhead), is directly styleable with CSS using classes and variables, is scriptable with JavaScript, participates in the document accessibility tree with proper ARIA, and can be animated with CSS animations. Base64-encoded SVG embedded as a data URI works as an img src, background-image URL, or anywhere a URL is expected, but the SVG becomes opaque to CSS and JavaScript. For icons and UI graphics used in a single application, inline SVG is generally superior. For SVGs that need to be portable - used in CSS backgrounds, shared as a URL, or embedded in multiple different contexts - Base64 encoding provides the flexibility. When a design tool exports an SVG and you need to use it as a CSS background image, this tool is the fastest way to convert it to an embeddable data URI without a build step.</p>

<h2>Inline SVG versus Base64 SVG</h2>
<p>For SVG graphics, inline SVG embedding (pasting the SVG markup directly into the HTML document) offers significant advantages over Base64 encoding: it is smaller (no 33% overhead), is directly styleable with CSS using classes and custom properties, is scriptable with JavaScript, and participates in the document accessibility tree with proper ARIA semantics. Base64-encoded SVG works as an img src, CSS background-image URL, or anywhere a URL is accepted, but the SVG becomes opaque to CSS and JavaScript once encoded. For icons and UI graphics used within a single application, inline SVG is the superior choice. For SVGs that need to be truly portable across contexts - used in email clients, shared as URLs, embedded in multiple different environments including ones without access to the HTML source - Base64 encoding provides the necessary flexibility. When a designer exports an SVG from Figma and you need to use it immediately as a CSS background image without a build step, this converter handles that in one paste operation.
</p>`,
    },
    related: ['base64-codec', 'image-convert', 'image-compress', 'image-resize'],
  },
];
