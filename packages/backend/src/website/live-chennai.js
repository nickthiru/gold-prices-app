const { scrapeWebsite } = require("../util/scrapeWebsite");

exports.handler = async function (event, context) {
  console.log("(+) event: \n" + JSON.stringify(event, null, 2));

  const site = {
    name: "Live Chennai",
    url: "https://www.livechennai.com/gold_silverrate.asp",
    lastUpdatedCssSelector: "body > div.wrapper > div.veg-cointainer > table:nth-child(8) > tbody > tr > td > div.col-sm-8 > table > tbody > tr:nth-child(3) > td:nth-child(1) > font",
    goldPriceCssSelector: "body > div.wrapper > div.veg-cointainer > table:nth-child(8) > tbody > tr > td > div.col-sm-8 > table > tbody > tr:nth-child(3) > td:nth-child(4) > font"
  };

  const data = await scrapeWebsite(site);

  console.log("(+) data: \n" + JSON.stringify(data, null, 2));

  // const dataItem = await prepareDataItem(data);

  // await saveDataItem(dataItem);

  return {
    statusCode: 200,
    message: "Web scraper successfully completed"
  };
};