module.exports = function cleanData(scrapeDateTime, rawScrapeData, cleanerCb) {
  return cleanerCb(rawScrapeData, scrapeDateTime);
}