const { handler } = require("./workflow/send-email-alert-workflow.js");

const main = async () => {
  // const res = await handler({});
  // console.log("(+) res: \n" + JSON.stringify(res, null, 2));
  // console.log("(+) body: " + res.body);

  await handler({});

}

main();