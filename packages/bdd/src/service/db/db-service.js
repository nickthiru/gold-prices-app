const deleteItem = require("./item-method/delete-item");
const saveItem = require("./item-method/save-item");
const latestPriceDateTime = require("./query-method/latest-price-date-time");
const latestPrices = require("./query-method/latest-prices");

// require("dotenv").config();

module.exports = DbService = {
  // Item operations
  saveItem,
  deleteItem,

  // Query operations
  latestPrices,
  latestPriceDateTime,
};
