import puppeteer from "puppeteer";
import { setTimeout } from "timers/promises";

describe("Puppeteer tests", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 50,
      timeout: 60000,
    });
    page = await browser.newPage();
    await page.goto("https://google.com");
  });

  it("contains the correct title", async () => {
    const title = await page.title();
    expect(title).toBe("Google");
  });

  // test("Search Node.js", async () => {
  //   await setTimeout(3000);
  //   await page.type("#APjFqb", "Node.js");
  //   await setTimeout(1500);
  //   await page.click(".gNO89b");
  //   await page.waitForNavigation();
  //   await setTimeout(5000);
  // });

  afterAll(async () => {
    await browser.close();
  });
});
