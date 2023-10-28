// Live Chennai website data cleaner

function cleanData(rawDate, rawLastUpdatedTime, rawGoldPrice) {
  console.log("(+) Inside cleanData()");
  console.log("(+) rawDate: " + rawDate);
  console.log("(+) rawLastUpdatedTime: " + rawLastUpdatedTime);
  console.log("(+) rawGoldPrice: " + rawGoldPrice);


  const cleanedTime = cleanTime(rawLastUpdatedTime);
  console.log("(+) cleanedTime: " + cleanedTime);

  const cleanedDate = cleanDate(rawDate);
  console.log("(+) cleanedDate (module): " + cleanedDate);

  const cleanedGoldPrice = cleanGoldPrice(rawGoldPrice);
  console.log("(+) typeof cleanedGoldPrice: " + (typeof cleanedGoldPrice));

  return {
    dateTime: cleanedDate + cleanedTime,
    goldPrice: cleanedGoldPrice
  };
}

function cleanDate(date) {
  const splitDate = date.split("/");

  const year = splitDate[2];

  let month = splitDate[1].toLowerCase();

  switch (month) {
    case "january":
      month = "01";
      break;
    case "february":
      month = "02";
      break;
    case "march":
      month = "03";
      break;
    case "april":
      month = "04";
      break;
    case "may":
      month = "05";
      break;
    case "june":
      month = "06";
      break;
    case "july":
      month = "07";
      break;
    case "august":
      month = "08";
      break;
    case "september":
      month = "09";
      break;
    case "october":
      month = "10";
      break;
    case "november":
      month = "11";
      break;
    case "december":
      month = "12";
      break;
    default:
      console.log("No matching month");
      break;
  };

  const day = splitDate[0];

  return year + "-" + month + "-" + day;
}

function cleanTime(time) {
  const splitTime = time.split(":");
  // console.log("splitTime: " + splitTime);

  const ampm = splitTime[3].slice(-2)
  // console.log("ampm: " + ampm);

  let hours = splitTime[1];

  // console.log("hours (before): " + hours);

  // console.log("hours > 12? " + (Number(hours) > 11));

  if (ampm === "AM" && (Number(hours) > 11)) throw new Error("Time format is supposed to be in the 12-hour format");

  if (ampm === "PM") hours = Number(hours) + 12;

  if (ampm === "AM" && hours.length !== 2) hours = "0" + hours;

  // console.log("hours (after): " + hours);

  const minutes = splitTime[2];
  // console.log("minutes: " + minutes);

  const seconds = splitTime[3].slice(0, 2);
  // console.log("seconds: " + seconds);

  return "T" + hours + ":" + minutes + ":" + seconds + ".000Z";
  // console.log("(+) cleanedTime: " + cleanedTime);
}

function cleanGoldPrice(rawGoldPrice) {
  return Number(rawGoldPrice);
}

module.exports = { cleanData };