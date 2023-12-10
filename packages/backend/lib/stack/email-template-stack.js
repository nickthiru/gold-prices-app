const { Stack } = require("aws-cdk-lib");
const {
  ResponsiveEmailTemplate,
  TemplatePart
} = require("@cloudcomponents/cdk-responsive-email-template");


const priceUpdateAlert_Template = require("../../../bdd/src/service/email/email-template/price-update-alert/template.js");


class EmailTemplateStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);
    console.log("(+) Inside 'EmailTemplateStack'");
    console.log("(+) priceUpdateAlert_Template: \n" + JSON.stringify(priceUpdateAlert_Template, null, 2));


    new ResponsiveEmailTemplate(this, "PriceUpdateAlert_ResponsiveEmailTemplate", {
      templateName: priceUpdateAlert_Template.templateName,
      subjectPart: priceUpdateAlert_Template.subjectPart,
      textPart: TemplatePart.fromInline(priceUpdateAlert_Template.textPart),
      htmlPart: TemplatePart.fromInline(priceUpdateAlert_Template.htmlPart),
      parsingOptions: priceUpdateAlert_Template.parsingOptions,
    });

    this.priceUpdateAlertTemplateName = priceUpdateAlert_Template.templateName;
  }
}

module.exports = { EmailTemplateStack };