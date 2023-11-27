const { Stack } = require("aws-cdk-lib");
const {
  ResponsiveEmailTemplate,
  TemplatePart
} = require("@cloudcomponents/cdk-responsive-email-template");

const { emailTemplate } = require("../../../bdd/src/service/email/email-template/price-change-alert-email-template-html-part.js");



class EmailTemplateStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    // const template = `
    //   <mjml>
    //     <mj-head>
    //       <mj-title>cloudcomponents - {{ title }}</mj-title>
    //     </mj-head>
    //     <mj-body>
    //       <mj-section>
    //         <mj-column>
    //           <mj-text>
    //             Hello {{ name }}!
    //           </mj-text>
    //         </mj-column>
    //       </mj-section>
    //     </mj-body>
    //   </mjml>
    // `;

    new ResponsiveEmailTemplate(this, "EmailTemplate", {
      templateName: "PriceChangeAlert",
      subjectPart: "Alert! Gold Prices Updated!",
      textPart: TemplatePart.fromInline("Gold prices have been updated! Check the website!"),
      htmlPart: TemplatePart.fromInline(`
        <mjml>
          <mj-head>
            <mj-title>cloudcomponents - {{ title }}</mj-title>
          </mj-head>
          <mj-body>
            <mj-section>
              <mj-column>
                <mj-text>
                  Hello {{ name }}!
                </mj-text>
              </mj-column>
            </mj-section>
          </mj-body>
        </mjml>
      `),
      parsingOptions: {
        beautify: true,
      },
    });
  }
}

module.exports = { EmailTemplateStack };