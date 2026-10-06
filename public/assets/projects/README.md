# Project images

Place your project screenshots here. Suggested filenames:

- zamket.png  -  e-commerce website
- Nicecream.jpg - Nice Cream (Shoprite × Premium Foods) and Kreemy Kup (Premium Foods Manufacturing Limited)
- portfolio.png  -  portfolio website

Deploy keeps its existing illustrated terminal cover; no deploy image is required.

JPG, PNG, WebP, and SVG are supported. Images fit inside the original padded cover area without cropping, with the existing background, perspective hover, and case-study interaction.

In `src/data/content.ts`, edit each project's `name` and `image`:

```ts
name: 'My project name',
image: 'assets/projects/my-image.webp',
```

Use the path starting at `assets/`, without `public/` or a leading slash. Set `image: ''` to keep the illustrated cover. Missing images fall back to the illustration automatically.
