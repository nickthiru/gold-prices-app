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