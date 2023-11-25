module.exports = function checkIfSiteUpdated(siteDateTime, siteDateTimeNow, goldPrice, goldPriceNow) {
  // console.log("\n");
  // console.log("(+) Inside 'checkIfSiteUpdated()'");

  // If the data are NOT equal, it means the website has been updated
  return !((siteDateTime === siteDateTimeNow) && (goldPrice === goldPriceNow));
}