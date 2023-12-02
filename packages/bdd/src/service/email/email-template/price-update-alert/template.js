const { htmlPart } = require("./html-part")

module.exports = {
  templateName: "PriceUpdateAlert",
  subjectPart: "Alert! Gold Prices Updated!",
  textPart: "Gold prices have been updated! Check the website!",
  htmlPart: htmlPart,
  parsingOptions: {
    beautify: true,
  },
}

// module.exports = emailTemplate = {
//   Source: "goldpricestracker@gmail.com",
//   Destination: {
//     ToAddresses: [
//       "goldpricestracker@gmail.com"
//     ],
//   },
//   ReplyToAddresses: [],
//   Message: {
//     Body: {
//       Html: {
//         Charset: "UTF-8",
//         Data: "<p>This is the body of my email.</p>",
//       },
//       Text: {
//         Charset: "UTF-8",
//         Data: "This is the body of my email!"
//       },
//     },
//     Subject: {
//       Charset: "UTF-8",
//       Data: "Hello",
//     },
//   },
// };