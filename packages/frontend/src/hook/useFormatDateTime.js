export default function useFormatDateTime() {
  function format(dateTime) {
    const dateTimeCopy = dateTime.slice();

    const year = dateTimeCopy.slice(0, 4);
    const month = dateTimeCopy.slice(5, 7);
    const day = dateTimeCopy.slice(8, 10);

    const hour = dateTimeCopy.slice(11, 13);
    const minute = dateTimeCopy.slice(14, 16);
    // const second = dateTimeCopy.slice(17);

    let twelveHour = hour;
    let ampm = "AM";

    if (hour > 12) {
      twelveHour = hour - 12;
      ampm = "PM"
    }

    // return (`${day}/${month}/${year}, ${twelveHour}:${minute}:${second} ${ampm}`)
    return (`${day}/${month}/${year}, ${twelveHour}:${minute} ${ampm}`)

  }

  return { format };
}