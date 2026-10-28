import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import type { HistoricalEvent } from '../src/data/schema.ts'
import { collectionSharePage, escapeHtml, sceneSharePage, sharePage, shortDescription, sitemap } from './postbuild.ts'

const template = readFileSync('index.html', 'utf8')

const austerlitz: HistoricalEvent = {
  id: 'bataille-d-austerlitz',
  title: "Bataille d'Austerlitz",
  start: 1805,
  month: 12,
  day: 2,
  precision: 'day',
  certainty: 'attested',
  era: 'empire',
  track: 'coalition-3',
  category: 'war',
  importance: 1,
  summary: `Napoléon défait l'armée "alliée" austro-russe.`,
  body: 'Texte.',
  sources: [{ kind: 'primary', author: 'Grande Armée', work: '30e bulletin', locus: '3 décembre 1805' }],
}

describe('share pages', () => {
  it('escapes html special characters', () => {
    expect(escapeHtml(`<a href="x">l'"&</a>`)).toBe('&#60;a href=&#34;x&#34;&#62;l&#39;&#34;&#38;&#60;/a&#62;')
  })

  it('give each event its own title, description, canonical url and social card', () => {
    const page = sharePage(template, austerlitz)
    expect(page).toContain('<title>Bataille d&#39;Austerlitz (2 décembre 1805) | France</title>')
    expect(page).toContain('<meta name="description" content="Napoléon défait l&#39;armée &#34;alliée&#34; austro-russe." />')
    expect(page).toContain('<link rel="canonical" href="https://maximator13.github.io/france/evenement/bataille-d-austerlitz/" />')
    expect(page).toContain('<meta property="og:url" content="https://maximator13.github.io/france/evenement/bataille-d-austerlitz/" />')
    expect(page).toContain('<meta property="og:type" content="article" />')
    expect(page).toContain('<meta name="twitter:title" content="Bataille d&#39;Austerlitz (2 décembre 1805) | France" />')
  })

  it('keeps the application and adds a static cartel for crawlers', () => {
    const page = sharePage(template, austerlitz)
    expect(page).toContain('<script type="module" src="/src/main.tsx"></script>')
    expect(page).toContain('<div id="root"><article><h1>Bataille d&#39;Austerlitz</h1>')
    expect(page).toContain('<li>Grande Armée, 30e bulletin, 3 décembre 1805</li>')
  })

  it('lists the home page and every event page in the sitemap', () => {
    const xml = sitemap([austerlitz], '2026-10-15')
    expect(xml).toContain('<loc>https://maximator13.github.io/france/</loc>')
    expect(xml).toContain('<loc>https://maximator13.github.io/france/evenement/bataille-d-austerlitz/</loc><lastmod>2026-10-15</lastmod>')
  })
})

describe('scene pages', () => {
  it('cuts long descriptions at a word boundary', () => {
    const text = 'mot '.repeat(60)
    const short = shortDescription(text)
    expect(short.length).toBeLessThanOrEqual(155)
    expect(short.endsWith('mot…')).toBe(true)
    expect(shortDescription('Court.')).toBe('Court.')
  })

  it('writes a share page and a sitemap entry for a scene', () => {
    const scene = { id: 'versailles', title: 'Versailles', status: 'ready' as const, year: 1685, summary: 'Un palais.', points: [] }
    const page = sceneSharePage(template, scene)
    expect(page).toContain('<title>Versailles (vers 1685), scène 3D | France</title>')
    expect(page).toContain('https://maximator13.github.io/france/scene/versailles/')
    expect(sitemap([], '2026-10-19', ['scene/versailles/'])).toContain('<loc>https://maximator13.github.io/france/scene/versailles/</loc>')
  })

  it('writes a share page for the card collection', () => {
    const page = collectionSharePage(template)
    expect(page).toContain('<title>Collection de cartes | France</title>')
    expect(page).toContain('https://maximator13.github.io/france/collection/')
    expect(page).toContain('href="/france/#/collection"')
  })
})
