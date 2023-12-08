const cleanerCb = require("./Bhima/data-cleaner.js");

module.exports = [
  {
    siteName: "Bhima",
    ianaTimeZone: "Asia/Kolkata",
    scrapeParams: {
      url: "https://bhima.com/gold-rate/",
      goldPriceCssSelector: "body > div.vision-cont > div > div > div > section > article > div:nth-child(2) > article > div > table > tbody > tr:nth-child(2) > td.txtAlignRight > span > span > span > span > span > span > span > span > span > span > span > span > span > span > span > span",
      dateCssSelector: "body > div.vision-cont > div > div > div > section > label > span"
    },
    cleanerCb,
  },
  // {
  //   siteName: "Live Chennai",
  //   ianaTimeZone: "Asia/Kolkata",
  //   scrapeParams: {
  //     url: "https://www.livechennai.com/gold_silverrate.asp",
  //     goldPriceCssSelector: "body > div.wrapper > div.veg-cointainer > table:nth-child(8) > tbody > tr > td > div.col-sm-8 > table > tbody > tr:nth-child(3) > td:nth-child(4) > font",
  //     dateCssSelector: "body > div.wrapper > div.veg-cointainer > table:nth-child(8) > tbody > tr > td > div.col-sm-8 > table > tbody > tr:nth-child(3) > td:nth-child(1) > font",
  //     timeCssSelector: ".mob-cont[align='right']"
  //   }
  // },
  // {
  //   siteName: "Thangamayil",
  //   ianaTimeZone: "Asia/Kolkata",
  //   scrapeParams: {
  //     url: "https://www.thangamayil.com/scheme/index/rateshistory/",
  //     goldPriceCssSelector: "#maincontent > div.columns > div > div.history-rate.card > div > div:nth-child(3) > h2",
  //     dateTimeCssSelector: "#maincontent > div.columns > div > div.history-rate.card > div > div.card-header > div > h5"
  //   }
  // },
];