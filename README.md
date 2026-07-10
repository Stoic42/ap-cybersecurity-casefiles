# AP Cybersecurity Case Files

A static, filing-cabinet-style site for AP Cybersecurity case studies. Inspired by [AP Biz Case Files](https://apbizcasefiles.netlify.app/).

## Live Site

- **Production**: TBD — deploy to Cloudflare Pages
- **Local preview**: open `index.html` in any modern browser

## Project Structure

```
ap-cybersecurity-casefiles/
├── index.html      # Site shell, styles, and layout
├── app.js          # Rendering and interactions
├── data.js         # Case-study content
├── icons.js        # SVG icon paths
├── README.md       # This file
└── _headers        # Cloudflare Pages headers
```

## Content Model

Each case in `data.js` follows this schema:

```js
{
  id: 'unique-slug',
  name: 'Short tab name',
  fullName: 'Full case title',
  tag: 'Unit X · Topic · Theme',
  color: '#hexcolor',
  unit: 2,
  topic: '2.1A–C',
  dilemma: 'Provocative one-liner',
  body: ['paragraph 1', 'paragraph 2', ...],
  quotes: [{ text: '...', who: '...' }],
  evidence: [
    { type: 'table', title, headers, rows },
    { type: 'stats', title, stats: [{ value, label }] },
    { type: 'text', title, text }
  ],
  glossary: [{ en, zh, def }],
  quiz: [{ q, choices, correct, explain }],
  teaching: { hook, localization, posterLayout, apAlignment },
  sources: ['url1', 'url2']
}
```

## Deploy to Cloudflare Pages

1. Push this folder to a GitHub repository.
2. In Cloudflare Dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Build settings:
   - Framework preset: **None**
   - Build command: *(leave empty)*
   - Build output directory: `/`
4. Save and deploy.

For a custom domain, add it under **Custom domains** and point a CNAME record to `<project>.pages.dev`.

## Source Cases

Cases are drawn from Desal’s AP Cybersecurity Memory Wiki (`memory/synthesis/apsi-*`) and public incident reports. Each case includes AP unit/topic alignment, glossary terms, evidence, a quiz, and source URLs.

## License

© Desal / Stoic42. Content for classroom use.
