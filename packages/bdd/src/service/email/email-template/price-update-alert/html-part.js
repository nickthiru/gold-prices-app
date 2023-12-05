exports.htmlPart = `
  <mjml>
    <mj-body>
      <mj-section>
        <mj-column>
          <mj-table>
            <tr>
              <th>Website</th>
              <th>22K Price &#40;INR&#41;</th>
              <th>Last Updated &#40;IST&#41;</th>
            </tr>
            {{#each priceData}}
              <tr>
                <td>{{siteName}}</td>
                <td>{{goldPrice}}</td>
                <td>{{uiDateTime}}</td>
              </tr>
            {{/each}}
          </mj-table>
        </mj-column>
      </mj-section>
    </mj-body>
  </mjml>
`;