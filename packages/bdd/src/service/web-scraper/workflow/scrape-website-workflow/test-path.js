const siteName = "Live_Chennai";

const cleanerCb = require(`./${siteName}/data-cleaner.js`);

if (cleanerCb) console.log("(+) cleanerCb exists!");