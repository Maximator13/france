import { expect, test, type Page } from '@playwright/test'
import { mkdirSync, writeFileSync } from 'node:fs'
import { eras } from '../src/data/eras.ts'
import { events } from '../src/data/events.ts'
import { scenes } from '../src/data/scenes.ts'

const FIRST_SCREEN_BUDGET = 5_000_000
const SETTLE_MS = 2_000

function watchErrors(page: Page): string[] {
  const errors: string[] = []
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text())
  })
  page.on('pageerror', (error) => errors.push(error.message))
  return errors
}

async function timelineReady(page: Page) {
  await expect(page.locator('.eras__button').first()).toBeVisible()
}

test('home loads without console errors and within the first screen budget', async ({ page }, testInfo) => {
  const errors = watchErrors(page)
  const transfers: Promise<{ url: string; bytes: number }>[] = []
  page.on('requestfinished', (request) => {
    transfers.push(request.sizes().then((sizes) => ({ url: new URL(request.url()).pathname, bytes: sizes.responseBodySize })))
  })
  const mapData = Promise.all([
    page.waitForResponse((response) => response.url().endsWith('/geo/relief-west.webp')),
    page.waitForResponse((response) => response.url().endsWith('/geo/territories.json')),
  ])
  await page.goto('./')
  await timelineReady(page)
  await expect(page.locator('.stage canvas')).toBeAttached()
  await mapData
  await page.waitForTimeout(SETTLE_MS)
  const files = await Promise.all(transfers)
  const total = files.reduce((sum, file) => sum + file.bytes, 0)
  mkdirSync('reports', { recursive: true })
  writeFileSync(`reports/first-screen-${testInfo.project.name}.json`, JSON.stringify({ total, files }, null, 2))
  expect(total).toBeLessThanOrEqual(FIRST_SCREEN_BUDGET)
  expect(errors).toEqual([])
})

test('every era can be reached with the keyboard', async ({ page }) => {
  const errors = watchErrors(page)
  await page.goto('./')
  await timelineReady(page)
  await page.keyboard.press('Home')
  await expect(page.locator('.era-caption__name')).toHaveText('Francs et Mérovingiens')
  await page.keyboard.press('End')
  await expect(page.locator('.era-caption__name')).toHaveText('Consulat et Premier Empire')
  await page.keyboard.press('PageUp')
  await expect(page.locator('.era-caption__name')).toHaveText('Révolution')
  expect(errors).toEqual([])
})

test('legal pages open from their hash route and close with Escape', async ({ page }) => {
  const errors = watchErrors(page)
  await page.goto('./#/mentions-legales')
  await expect(page.getByRole('heading', { name: 'Mentions légales' })).toBeVisible()
  await expect(page).toHaveTitle('Mentions légales | France')
  await page.keyboard.press('Escape')
  await expect(page.getByRole('heading', { name: 'Mentions légales' })).toBeHidden()
  await expect(page).toHaveURL(/\/france\/#\/$/)
  expect(errors).toEqual([])
})

test('unknown routes show the in-app not found panel and a 404 page exists for unknown paths', async ({ page }) => {
  await page.goto('./#/nulle-part')
  await expect(page.getByRole('heading', { name: 'Page introuvable' })).toBeVisible()
  await page.goto('./404.html')
  await expect(page.getByRole('heading', { name: 'Page introuvable' })).toBeVisible()
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex')
})

test('the debug overlay reports renderer statistics', async ({ page }) => {
  await page.goto('./?debug')
  await expect(page.locator('.debug-hud')).toContainText('Appels de dessin', { timeout: 30_000 })
})

test.describe('events', () => {
  test.skip(events.length === 0, 'no events yet')

  test('an event opens from the timeline, survives a reload and has a share page', async ({ page }) => {
    const errors = watchErrors(page)
    const event = events.find((candidate) => candidate.importance === 1) ?? events[0]!
    await page.goto(`./#/evenement/${event.id}`)
    await expect(page.getByRole('heading', { name: event.title, level: 2 })).toBeVisible()
    await expect(page.locator('.era-caption__name')).toHaveText(eras.find((era) => era.id === event.era)!.name)
    await page.reload()
    await expect(page.getByRole('heading', { name: event.title, level: 2 })).toBeVisible()
    await page.keyboard.press('Escape')
    await page.getByRole('button', { name: new RegExp(`^${event.title},`) }).first().click()
    await expect(page.getByRole('heading', { name: event.title, level: 2 })).toBeVisible()
    await page.goto(`./evenement/${event.id}/`)
    await expect(page.getByRole('heading', { name: event.title, level: 2 })).toBeVisible()
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', new RegExp(`/evenement/${event.id}/$`))
    expect(errors).toEqual([])
  })
})

test.describe('scenes', () => {
  for (const scene of scenes.filter((candidate) => candidate.status === 'ready')) {
    test(`the ${scene.id} scene loads its model`, async ({ page }) => {
      const errors = watchErrors(page)
      const model = page.waitForResponse((response) => response.url().endsWith(`/${scene.id}.glb`) && response.ok(), { timeout: 60_000 })
      await page.goto(`./#/scene/${scene.id}`)
      await expect(page.getByRole('heading', { name: scene.title, level: 2 })).toBeVisible()
      await model
      await page.waitForTimeout(SETTLE_MS)
      await expect(page.locator('.scene__failure')).toHaveCount(0)
      expect(errors).toEqual([])
    })
  }
})
