# AP Cybersecurity Case Files

A static, filing-cabinet-style site for AP Cybersecurity case studies. Inspired by [AP Biz Case Files](https://apbizcasefiles.netlify.app/).

## Live Site

- **Production**: https://cyber.ton-ton.fun/
- **GitHub Pages fallback**: https://stoic42.github.io/ap-cybersecurity-casefiles/
- **Local preview**: open `index.html` in any modern browser

## Custom Domain Setup

The site uses GitHub Pages with a custom domain. To activate it:

1. In your DNS provider for `ton-ton.fun`, add a **CNAME** record:
   - **Name**: `cyber`
   - **Value**: `Stoic42.github.io`
2. Wait for DNS propagation (usually a few minutes, up to 24 hours).
3. GitHub will automatically provision an HTTPS certificate once the CNAME resolves.

## Project Structure

```
ap-cybersecurity-casefiles/
├── index.html      # Site shell, styles, and layout
├── app.js          # Rendering and interactions
├── data.js         # Case-study content
├── icons.js        # SVG icon paths
├── CNAME           # Custom domain config for GitHub Pages
├── README.md       # This file
└── _headers        # Security headers (Cloudflare Pages ready)
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

## Deploy to Cloudflare Pages (optional)

If you later prefer Cloudflare Pages:

1. Push this folder to a GitHub repository.
2. In Cloudflare Dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Build settings:
   - Framework preset: **None**
   - Build command: *(leave empty)*
   - Build output directory: `/`
4. Save and deploy.

## Source Cases

Cases are drawn from Desal’s AP Cybersecurity Memory Wiki (`memory/synthesis/apsi-*`) and public incident reports. Each case includes AP unit/topic alignment, glossary terms, evidence, a quiz, and source URLs.

### Current case list (12)

- **Unit 1**: Change Healthcare
- **Unit 2**: MGM Resorts · HK Deepfake CFO (Arup) · Industroyer · SignalGate
- **Unit 3**: AWS US-EAST-1 outage · NotPetya · Mirai
- **Unit 4**: Log4Shell · MOVEit · Bandai Channel
- **Unit 5**: LastPass

## License

© Desal / Stoic42. Content for classroom use.
