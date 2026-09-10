# solsbury-shared

Centrale statische bestanden (CSS/JS) die door meerdere projecten worden ingeladen via
GitHub Pages. Wijzig een bestand en push naar `main`, dan werkt de update automatisch door.

## De URL's (plakken in Webflow)

Site Settings → Custom Code → **Head Code**:

```html
<link rel="stylesheet" href="https://superrebel.github.io/solsbury-shared/style.css">
```

Alles in de `company/` map wordt ook gepubliceerd, onder hetzelfde pad:

```html
<link rel="stylesheet" href="https://superrebel.github.io/solsbury-shared/company/style.css">
<script src="https://superrebel.github.io/solsbury-shared/company/script.js"></script>
```

Publiceer elk Webflow-project één keer nadat je de tag hebt toegevoegd.
Daarna zijn er geen Webflow-aanpassingen meer nodig bij updates.

## Hoe updates live komen

1. Pas `style.css` of een bestand in `company/` aan en push naar `main`.
2. De GitHub Action (`.github/workflows/deploy-pages.yml`) deployt de bestanden naar
   GitHub Pages. GitHub purgt daarbij zijn CDN (Fastly), dus de nieuwe versie staat
   binnen ~1-2 min wereldwijd live.
3. De Action **verifieert** daarna dat elke gepubliceerde URL byte-voor-byte gelijk is
   aan de gepushte file, en faalt als dat niet lukt.

> Wat je daarna in de browser ziet kan nog je eigen browsercache zijn:
> hard refresh (`Cmd/Ctrl + Shift + R`) of test in een incognitovenster.

## Waarom GitHub Pages en niet jsDelivr of raw.githubusercontent.com

- `raw.githubusercontent.com` serveert `text/plain` + `nosniff`, dus browsers weigeren
  het als stylesheet.
- jsDelivr's branch-URL (`@main`) cachet de branch→commit-koppeling ~12 uur server-side;
  die cache is niet betrouwbaar te purgen, dus updates zijn níet direct.
- GitHub Pages serveert `text/css`, heeft een stabiele URL, en purgt zijn CDN bij elke
  deploy — dus updates propageren wél snel.

## Als een bezoeker een oude versie ziet

Dat is dan zijn eigen browsercache (niet het CDN). Los incidenteel op met een versie-query:

```html
<link rel="stylesheet" href="https://superrebel.github.io/solsbury-shared/style.css?v=2">
```
