const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");

async function scrapeWebsite(props) {
  console.log("(+) Inside scrapeWebsite()");
  console.log("(+) props: \n" + JSON.stringify(props, null, 2));

  const {
    url,
    goldPriceCssSelector,
    dateTimeCssSelector,
    dateCssSelector,
    timeCssSelector
  } = props;


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
      goldPriceCssSelector,
      dateTimeCssSelector,
      dateCssSelector,
      timeCssSelector
    ) => {
      console.log("(+) Inside page.evaluate()");

      let rawGoldPrice, rawDateTime, rawDate, rawTime;

      rawGoldPrice = document.querySelector(goldPriceCssSelector).innerText;

      if (dateTimeCssSelector) rawDateTime = document.querySelector(dateTimeCssSelector).innerText;

      if (dateCssSelector) rawDate = document.querySelector(dateCssSelector).innerText;

      if (timeCssSelector) rawTime = document.querySelector(timeCssSelector).innerText;

      return {
        rawGoldPrice: rawGoldPrice,
        rawDateTime: rawDateTime,
        rawDate: rawDate,
        rawTime: rawTime,
      };
    },
      goldPriceCssSelector,
      dateTimeCssSelector,
      dateCssSelector,
      timeCssSelector
    );

    console.log("(+) scrapeWebsite() result:\n" + JSON.stringify(result, null, 2));

    // await browser.close();   // This is causing lambda to hang and timeout.

    return result;

  } catch (error) {
    console.log("(-) Error: \n" + error);
  };
}

module.exports = { scrapeWebsite };