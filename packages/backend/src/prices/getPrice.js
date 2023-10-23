const puppeteer = require("puppeteer");

async function getPrice(site) {

  return new Promise(async (resolve) => {

    const browser = await puppeteer.launch();

    const page = await browser.newPage();

    await page.goto(site.url, {
      waitUntil: "domcontentloaded"
    });

    const result = await page.evaluate(pageFunction, site);

    if (result) {
      console.log("(+) result: \n" + JSON.stringify(result, null, 2));
      await browser.close();
      resolve(result);
    }
  });
}

function pageFunction(site) {
  const lastUpdated = document.querySelector(site.lastUpdatedCssSelector).innerText;
  const goldPrice = document.querySelector(site.goldPriceCssSelector).innerText;

  return {
    siteName: site.name,
    lastUpdated: lastUpdated,
    goldPrice: goldPrice
  };
}

module.exports = { getPrice };