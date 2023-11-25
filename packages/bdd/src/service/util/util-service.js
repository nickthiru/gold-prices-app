const checkIfSiteUpdated = require("./method/check-If-site-updated");
const getLocalDateTime = require("./method/getLocalDateTime");
const removeUndefined = require("./method/removeUndefined");
const cleanData = require("./method/cleanData");

module.exports = UtilService = {
  checkIfSiteUpdated,
  getLocalDateTime,
  removeUndefined,
  cleanData,
}
