import { test, expect } from "@playwright/test"

test("CBT homepage should load", async ({ page }) => {

  await page.goto("http://127.0.0.1:3000", {
    waitUntil: "domcontentloaded",
    timeout: 60000
  })

  await expect(page).toHaveURL(/localhost|127.0.0.1/)

})
