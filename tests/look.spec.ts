import { test, type Page } from '@playwright/test'

test.skip(!!process.env.CI, 'captures are reviewed locally')

async function capture(page: Page, name: string, project: string, wait = 3500) {
  await page.waitForTimeout(wait)
  await page.screenshot({ path: `test-results/look-${name}-${project}.png` })
}

async function showEra(page: Page, era: string) {
  await page.getByRole('button', { name: new RegExp(`^${era},`) }).click()
}

test('capture the main screens', async ({ page }, testInfo) => {
  test.setTimeout(180_000)
  const project = testInfo.project.name
  await page.goto('./')
  await page.locator('.eras__button').first().waitFor()
  await capture(page, 'home', project, 6000)
  await showEra(page, 'Francs et Mérovingiens')
  await capture(page, 'merovingiens', project)
  await page.keyboard.press('PageDown')
  await capture(page, 'transition', project, 1300)
  await capture(page, 'carolingiens', project)
  for (const era of ['capetiens', 'valois', 'bourbons', 'revolution', 'empire']) {
    await page.keyboard.press('PageDown')
    await capture(page, era, project)
  }
  await page.goto('./#/evenement/bataille-de-bouvines')
  await capture(page, 'bouvines', project, 6000)
  await page.goto('./#/evenement/bataille-d-austerlitz')
  await capture(page, 'austerlitz', project, 6000)
})
