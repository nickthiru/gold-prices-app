const { getPrice } = require("./getPrice.js");

const sites = [
  {
    name: "Thangamayil",
    url: "https://www.thangamayil.com/scheme/index/rateshistory/",
    lastUpdatedCssSelector: "#maincontent > div.columns > div > div.history-rate.card > div > div.card-header > div > h5",
    goldPriceCssSelector: "#maincontent > div.columns > div > div.history-rate.card > div > div:nth-child(3) > h2"
  },
  {
    name: "Bhima",
    url: "https://bhima.com/gold-rate/",
    lastUpdatedCssSelector: "body > div.vision-cont > div > div > div > section > label > span",
    goldPriceCssSelector: "body > div.vision-cont > div > div > div > section > article > div:nth-child(2) > article > div > table > tbody > tr:nth-child(2) > td.txtAlignRight > span > span > span > span > span > span > span > span > span > span > span > span > span > span > span > span"
  },
  {
    name: "Live Chennai",
    url: "https://www.livechennai.com/gold_silverrate.asp",
    lastUpdatedCssSelector: "body > div.wrapper > div.veg-cointainer > table:nth-child(8) > tbody > tr > td > div.col-sm-8 > table > tbody > tr:nth-child(3) > td:nth-child(1) > font",
    goldPriceCssSelector: "body > div.wrapper > div.veg-cointainer > table:nth-child(8) > tbody > tr > td > div.col-sm-8 > table > tbody > tr:nth-child(3) > td:nth-child(4) > font"
  }
]

async function getPrices() {
  const data = [];

  const promises = sites.map((site) => getPrice(site));

  Promise.all(promises)
    .then((results) => {
      results.forEach((result) => {
        data.push({
          site: result.siteName,
          lastUpdated: result.lastUpdated,
          goldPrice: result.goldPrice,
          goldKarat: "22",
          currency: "INR"
        });
      });
      console.log("(+) data:\n" + JSON.stringify(data, null, 2));
    })
    .catch((err) => {
      console.log(err);
    });

  return data;
}


module.exports = { getPrices };