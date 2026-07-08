# solsbury-shared

Eén centraal CSS-bestand dat door meerdere Webflow-projecten wordt ingeladen via jsDelivr.
Wijzig je `style.css` en push je naar `main`, dan werkt de update automatisch door op alle sites.

## De URL (plakken in Webflow)

Site Settings → Custom Code → **Head Code**:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/superrebel/solsbury-shared@main/style.css">
```

Publiceer elk Webflow-project één keer nadat je de `<link>`-tag hebt toegevoegd.
Daarna zijn er geen Webflow-aanpassingen meer nodig bij CSS-updates.

## Hoe updates live komen

1. Pas `style.css` aan en push naar `main`.
2. De GitHub Action (`.github/workflows/purge-jsdelivr.yml`) purgt automatisch de
   jsDelivr-cache voor `style.css` (jsDelivr cachet branch-URLs anders tot ~7 dagen).
3. Binnen een minuut serveert jsDelivr de nieuwe versie op alle sites.

## Waarom jsDelivr en niet raw.githubusercontent.com

`raw.githubusercontent.com` serveert bestanden als `text/plain` met een `nosniff`-header,
waardoor browsers het weigeren als stylesheet te laden. jsDelivr serveert `style.css` met
`Content-Type: text/css` — precies wat de browser nodig heeft.

## Als een bezoeker een oude versie ziet

Dat is dan zijn eigen browsercache (niet jsDelivr). Los incidenteel op met een versie-query:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/superrebel/solsbury-shared@main/style.css?v=2">
```
