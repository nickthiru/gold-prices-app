const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");
const { cleanData } = require("../website/live-chennai/clean-data");

async function scrapeWebsite(
  url,
  dateCssSelector,
  lastUpdatedTimeCssSelector,
  goldPriceCssSelector,
  // previousLastUpdatedTime,
  // previousGoldPrice
) {
  // console.log("(+) Inside scrapeData()")
  // console.log("(+) site: \n" + JSON.stringify(site));

  // let websiteIsUpdated = false;

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
      // previousLastUpdatedTime,
      // previousGoldPrice
    ) => {
      console.log("(+) Inside page.evaluate()");

      const goldPrice = document.querySelector(goldPriceCssSelector).innerText;

      if (!previousGoldPrice || (goldPrice !== previousGoldPrice)) {
        websiteIsUpdated = true;
        const scrapedDate = document.querySelector(dateCssSelector).innerText;
        const scrapedLastUpdatedTime = document.querySelector(lastUpdatedTimeCssSelector).innerText;

        const cleanedDateTime = cleanData(
          scrapedDate,
          scrapedLastUpdatedTime,
        );

        // Add timestamp to inform time of capture
        // const scrapeDateTime = new Date().toISOString();  // timezone?

        return {
          websiteIsUpdated: websiteIsUpdated, // true
          scrapeDateTime: scrapeDateTime,
          date: cleanedDateTime,
          lastUpdatedTime: lastUpdatedTime,
          goldPrice: goldPrice,
        };
      } else {
        return {
          websiteIsUpdated: websiteIsUpdated  // false
        };
      }
    },
      dateCssSelector,
      lastUpdatedTimeCssSelector,
      goldPriceCssSelector,
      // previousLastUpdatedTime,
      // previousGoldPrice
    );

    // console.log("(+) scrapeData() result:\n" + JSON.stringify(result, null, 2));

    // await browser.close();   // This is causing lambda to hang and timeout.

    return result;

  } catch (error) {
    console.log("(-) Error: \n" + error);
  };
}

module.exports = { scrapeWebsite };