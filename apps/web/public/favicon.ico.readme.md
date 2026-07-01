# favicon.ico generation

The project ships with `favicon.svg`. To generate `favicon.ico` (needed for
Windows taskbar pinning and older browser/app contexts):

```bash
# Option 1 - using ImageMagick (install: apt install imagemagick or brew install imagemagick)
convert -background none favicon.svg -resize 32x32 favicon.ico

# Option 2 - online: upload favicon.svg to https://favicon.io/favicon-converter/
#   Download the package, copy the .ico file to public/favicon.ico

# Option 3 - using sharp in a build script
# npx sharp-cli input=favicon.svg output=favicon.ico width=32 height=32
```

After generating, place `favicon.ico` in `apps/web/public/`.
