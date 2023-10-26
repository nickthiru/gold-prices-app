const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");

exports.handler = async function (event, context) {
  console.log("(+) event: \n" + JSON.stringify(event, null, 2));

  const site = {
    name: "Live Chennai",
    url: "https://www.livechennai.com/gold_silverrate.asp",
    lastUpdatedCssSelector: "body > div.wrapper > div.veg-cointainer > table:nth-child(8) > tbody > tr > td > div.col-sm-8 > table > tbody > tr:nth-child(3) > td:nth-child(1) > font",
    goldPriceCssSelector: "body > div.wrapper > div.veg-cointainer > table:nth-child(8) > tbody > tr > td > div.col-sm-8 > table > tbody > tr:nth-child(3) > td:nth-child(4) > font"
  };

  const data = await scrapeData(site);
  // console.log("(+) data: \n" + JSON.stringify(data, null, 2));

  // const dataItem = await prepareDataItem(data);

  // await saveDataItem(dataItem);

  return {
    statusCode: 200,
    message: "Web scraper successfully completed"
  };
};


async function scrapeData(site) {
  console.log("(+) Inside scrapeData()")
  console.log("(+) site: \n" + JSON.stringify(site));

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