// Bhima website data cleaner

// Website date is displayed as: "[ UPDATED ON 01/11/2023 ]"
// Website gold price is displayed as: " 5,640"

function cleanDataCb(scrapeDateTime, props) {
  console.log("(+) Inside cleanData()");

  const { rawDate, rawGoldPrice } = props;
  console.log("(+) rawDate: " + rawDate);
  console.log("(+) rawGoldPrice: " + rawGoldPrice);

  const cleanedDate = cleanRawDate(rawDate);
  console.log("(+) cleanedDate: " + cleanedDate);

  const cleanedGoldPrice = cleanRawGoldPrice(rawGoldPrice);
  console.log("(+) cleanedGoldPrice: " + cleanedGoldPrice);

  return {
    dateTime: cleanedDate + scrapeDateTime.slice(10),  // Slice and add the scrape time only, which is missing from this website.
    goldPrice: cleanedGoldPrice
  };
}

function cleanRawDate(rawDate) {

  const slicedDate = rawDate.slice(13, 23)
  console.log("(+) slicedDate: " + slicedDate);

  const splitDate = slicedDate.split("/");
  console.log("(+) splitDate: " + splitDate);

  const year = splitDate[2];

  const month = splitDate[1];

  const day = splitDate[0];

  return year + "-" + month + "-" + day;
}

function cleanRawGoldPrice(rawGoldPrice) {

  const trimmedPrice = rawGoldPrice.trimStart();
  console.log("(+) trimmedPrice: " + trimmedPrice);

  const splitPrice = trimmedPrice.split(",");
  console.log("(+) splitPrice: " + splitPrice);

  const joinedPrice = splitPrice.join("");
  console.log("(+) joinedPrice: " + joinedPrice);

  return Number(joinedPrice);
}

module.exports = { cleanDataCb };