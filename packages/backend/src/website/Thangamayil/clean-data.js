// Thangamayil website data cleaner

// Website date-time is displayed as: "Last updated on : 01/11/23 11:00 AM"
// Website gold price is displayed as: "₹5640"

function cleanData(rawDateTime, rawGoldPrice) {
  console.log("(+) Inside cleanData()");
  console.log("(+) rawDateTime: " + rawDateTime);
  console.log("(+) rawGoldPrice: " + rawGoldPrice);

  const cleanedDateTime = cleanRawDateTime(rawDateTime);
  console.log("(+) cleanedDateTime: " + cleanedDateTime);

  const cleanedGoldPrice = cleanRawGoldPrice(rawGoldPrice);
  console.log("(+) cleanedGoldPrice: " + cleanedGoldPrice);

  return {
    dateTime: cleanedDateTime,
    goldPrice: cleanedGoldPrice
  };
}

function cleanRawDateTime(rawDateTime) {

  const slicedDate = rawDateTime.slice(18, 26);
  // console.log("(+) slicedDate: " + "#" + slicedDate + "#");

  const slicedTime = rawDateTime.slice(27);
  // console.log("(+) slicedTime: " + "#" + slicedTime + "#");

  const cleanedDate = cleanDate(slicedDate);
  // console.log("cleanedDate: " + cleanedDate);

  const cleanedTime = cleanTime(slicedTime);
  // console.log("cleanedTime: " + cleanedTime);

  return cleanedDate + cleanedTime;
}

function cleanDate(slicedDate) {
  const splitDate = slicedDate.split("/");

  let year = "20" + splitDate[2];
  // console.log("(+) year: " + "#" + year + "#");

  let month = splitDate[1];
  // console.log("(+) month: " + "#" + month + "#");

  let day = splitDate[0];
  // console.log("(+) day: " + "#" + day + "#");

  return year + "-" + month + "-" + day;
}

function cleanTime(slicedTime) {
  // console.log("(+) slicedTime: " + slicedTime);

  var hours = "";

  const slicedHours = slicedTime.slice(0, 2);
  // console.log("(+) slicedHours: " + slicedHours);

  const slicedMinutes = slicedTime.slice(3, 5);
  // console.log("(+) slicedMinutes: " + slicedMinutes);

  const ampm = slicedTime.slice(-3).trimStart();
  // console.log("(+) ampm: " + ampm);

  (ampm === "PM") ? hours = String(Number(slicedHours) + 12) : hours = slicedHours;
  // console.log("(+) hours: " + hours);

  return "T" + hours + ":" + slicedMinutes + ":" + "00" + ".000Z";
}

function cleanRawGoldPrice(rawGoldPrice) {
  // console.log("(+) rawGoldPrice: " + rawGoldPrice);

  const cleanedGoldPrice = rawGoldPrice.slice(1);
  // console.log("(+) cleanedGoldPrice: " + cleanedGoldPrice);

  return Number(cleanedGoldPrice);
}

module.exports = { cleanData };