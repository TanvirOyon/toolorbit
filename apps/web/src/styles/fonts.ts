/**
 * Self-hosted font faces via @fontsource — no third-party requests at
 * runtime, since these woff2 files are bundled into the build output and
 * served from the same origin as everything else. Only the weights
 * actually used in the design system are imported, to keep payload small.
 */

/* DM Sans — display font, headings */
import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/500.css';
import '@fontsource/dm-sans/700.css';

/* Inter — body font */
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';

/* JetBrains Mono — code / tool input-output areas */
import '@fontsource/jetbrains-mono/400.css';
