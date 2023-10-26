const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");

exports.handler = async function (event, context) {
  console.log("(+) event: \n" + JSON.stringify(event, null, 2));

  try {
    const browser = await puppeteer.launch({
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
      defaultViewport: chromium.defaultViewport,
      args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"]
    });

    const page = await browser.newPage();

    await page.goto("https://www.livechennai.com/gold_silverrate.asp", {
      waitUntil: "domcontentloaded"
    });

    const result = await page.evaluate(() => {
      const lastUpdated = document.querySelector("body > div.wrapper > div.veg-cointainer > table:nth-child(8) > tbody > tr > td > div.col-sm-8 > table > tbody > tr:nth-child(3) > td:nth-child(1) > font").innerText;
      const goldPrice = document.querySelector("body > div.wrapper > div.veg-cointainer > table:nth-child(8) > tbody > tr > td > div.col-sm-8 > table > tbody > tr:nth-child(3) > td:nth-child(4) > font").innerText;

      return { lastUpdated, goldPrice };
    });

    console.log("(+) result:\n" + JSON.stringify(result, null, 2));

    await browser.close();

    return {
      statusCode: 200,
      message: "price fetched"
    };

  } catch (error) {
    console.log("(-) error: \n" + error);
  }
};