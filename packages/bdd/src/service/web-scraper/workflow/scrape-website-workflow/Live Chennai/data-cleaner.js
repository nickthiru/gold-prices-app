// Live Chennai website data cleaner

// Website date is displayed as: "28/October/2023"
// Website time is displayed as: "LAST UPDATE TIME:9:52:15 AM"
// Website gold price is displayed as: "5640.00"

module.exports = function cleanerCb(props) {
  console.log("\n(+) Inside cleanData()");

  const { rawDate, rawTime, rawGoldPrice } = props;
  console.log("(+) rawDate: " + rawDate);
  console.log("(+) rawTime: " + rawTime);
  console.log("(+) rawGoldPrice: " + rawGoldPrice);

  const cleanedTime = cleanRawTime(rawTime);
  console.log("(+) cleanedTime: " + cleanedTime);

  const cleanedDate = cleanRawDate(rawDate);
  console.log("(+) cleanedDate: " + cleanedDate);

  const cleanedGoldPrice = cleanRawGoldPrice(rawGoldPrice);
  console.log("(+) cleanedGoldPrice: " + cleanedGoldPrice);

  return {
    uiDateTime: cleanedDate + cleanedTime,
    siteDateTimeNow: cleanedDate + cleanedTime,
    goldPriceNow: cleanedGoldPrice
  };
}

function cleanRawDate(rawDate) {
  const splitDate = rawDate.split("/");

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

  return (year + "-" + month + "-" + day);
}

function cleanRawTime(time) {
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

  return ("T" + hours + ":" + minutes + ":" + seconds);
  // console.log("(+) cleanedTime: " + cleanedTime);
}

function cleanRawGoldPrice(rawGoldPrice) {
  return Number(rawGoldPrice);
}