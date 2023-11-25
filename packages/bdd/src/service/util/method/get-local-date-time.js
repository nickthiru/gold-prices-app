module.exports = async function getLocalDateTime(ianaTimeZone) {
  // console.log("\n");
  // console.log("(+) Inside 'getLocalTime()'");

  const data = await fetch(`https://timeapi.io/api/Time/current/zone/?timeZone=${ianaTimeZone}`)
    .then((response) => response.json())
    .then((data) => {
      // console.log("data: \n" + JSON.stringify(data, null, 2));
      return data;
    })
    .catch((err) => console.log(err));

  // console.log("data: \n" + JSON.stringify(data, null, 2));

  const dateTime = data.dateTime.slice(0, 19);
  // console.log("dateTime: " + JSON.stringify(dateTime, null, 2));

  return dateTime;
}