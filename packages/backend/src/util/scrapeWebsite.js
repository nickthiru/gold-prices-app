const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");

async function scrapeWebsite(site) {
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

    await page.goto(site.url, {
      waitUntil: "domcontentloaded"
    });

    const result = await page.evaluate((site) => {
      console.log("(+) Inside page.evaluate()");

      const lastUpdated = document.querySelector(site.lastUpdatedCssSelector).innerText;
      const goldPrice = document.querySelector(site.goldPriceCssSelector).innerText;

      return {
        lastUpdated: lastUpdated,
        goldPrice: goldPrice
      };
    }, site);

    // console.log("(+) scrapeData() result:\n" + JSON.stringify(result, null, 2));

    // await browser.close();   // This is causing lambda to hang and timeout.

    return result;

  } catch (error) {
    console.log("(-) error: \n" + error);
  };
}

module.exports = { scrapeWebsite };