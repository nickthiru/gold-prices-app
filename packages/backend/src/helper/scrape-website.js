const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");

async function scrapeWebsite(
  url,
  dateCssSelector,
  lastUpdatedTimeCssSelector,
  goldPriceCssSelector
) {
  // console.log("(+) Inside scrapeData()")
  // console.log("(+) site: \n" + JSON.stringify(site));

  try {
    const browser = await puppeteer.launch({
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
      defaultViewport: chromium.defaultViewport,
      args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"]
    });

    const page = await browser.newPage();

    await page.goto(url, {
      waitUntil: "domcontentloaded"
    });

    const result = await page.evaluate((
      dateCssSelector,
      lastUpdatedTimeCssSelector,
      goldPriceCssSelector
    ) => {
      console.log("(+) Inside page.evaluate()");

      const date = document.querySelector(dateCssSelector).innerText;
      const lastUpdatedTime = document.querySelector(lastUpdatedTimeCssSelector).innerText;
      const goldPrice = document.querySelector(goldPriceCssSelector).innerText;

      return {
        date,
        lastUpdatedTime,
        goldPrice
      };

    }, dateCssSelector, lastUpdatedTimeCssSelector, goldPriceCssSelector);

    // console.log("(+) scrapeData() result:\n" + JSON.stringify(result, null, 2));

    // await browser.close();   // This is causing lambda to hang and timeout.

    return result;

  } catch (error) {
    console.log("(-) error: \n" + error);
  };
}

module.exports = { scrapeWebsite };
const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");

async function scrapeWebsite(
  url,
  dateCssSelector,
  lastUpdatedTimeCssSelector,
  goldPriceCssSelector,
) {
  console.log("(+) Inside scrapeWebsite()");

  try {
    const browser = await puppeteer.launch({
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
      defaultViewport: chromium.defaultViewport,
      args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"]
    });

    const page = await browser.newPage();

    await page.goto(url, {
      waitUntil: "domcontentloaded"
    });

    const result = await page.evaluate((
      dateCssSelector,
      lastUpdatedTimeCssSelector,
      goldPriceCssSelector,
    ) => {
      console.log("(+) Inside page.evaluate()");

      const rawDate = document.querySelector(dateCssSelector).innerText;
      const rawLastUpdatedTime = document.querySelector(lastUpdatedTimeCssSelector).innerText;
      const rawGoldPrice = document.querySelector(goldPriceCssSelector).innerText;

      // Add timestamp to inform time of capture
      const scrapeDateInUTC = new Date().toISOString();

      return {
        rawDate,
        rawLastUpdatedTime,
        rawGoldPrice,
        scrapeDateInUTC
      };
    },
      dateCssSelector,
      lastUpdatedTimeCssSelector,
      goldPriceCssSelector
    );

    console.log("(+) scrapeWebsite() result:\n" + JSON.stringify(result, null, 2));
    console.log("(+) typeof result:\n" + (typeof result));

    // await browser.close();   // This is causing lambda to hang and timeout.

    return result;
    // return JSON.stringify(result);

  } catch (error) {
    console.log("(-) Error: \n" + error);
  };
}

module.exports = { scrapeWebsite };