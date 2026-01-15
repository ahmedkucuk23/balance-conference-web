export interface OrderConfirmationData {
  orderNumber: string
  buyerName: string
  ticketName: string
  ticketDescription?: string
  quantity: number
  subtotal: number
  discount: number
  tax: number
  totalPrice: number
  currency: string
  eventDate: string
}

export function orderConfirmationTemplate(data: OrderConfirmationData): string {
  return `
    <!DOCTYPE html>
    <html lang="bs">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Potvrda narudžbe - Balance Conference 2026</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
          background-color: #f5f5f5;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background: white;
        }
        .header {
          background: linear-gradient(135deg, #D83FFF 0%, #0099B5 50%, #FAB53D 100%);
          padding: 40px 30px;
          text-align: center;
          color: white;
        }
        .header h1 {
          margin: 0 0 10px 0;
          font-size: 28px;
          font-weight: bold;
        }
        .header p {
          margin: 0;
          font-size: 16px;
          opacity: 0.9;
        }
        .content {
          padding: 40px 30px;
        }
        .greeting {
          font-size: 16px;
          margin-bottom: 20px;
        }
        .message {
          font-size: 15px;
          line-height: 1.8;
          color: #555;
          margin-bottom: 30px;
        }
        .order-details {
          background: #f9f9f9;
          padding: 25px;
          border-radius: 8px;
          margin: 30px 0;
        }
        .order-details h2 {
          margin: 0 0 20px 0;
          font-size: 20px;
          color: #333;
        }
        .detail-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid #e0e0e0;
        }
        .detail-row:last-child {
          border-bottom: none;
        }
        .detail-label {
          font-weight: 500;
          color: #666;
        }
        .detail-value {
          color: #333;
          text-align: right;
        }
        .total-row {
          margin-top: 15px;
          padding-top: 15px;
          border-top: 2px solid #ddd;
        }
        .total-row .detail-value {
          font-size: 20px;
          font-weight: bold;
          color: #D83FFF;
        }
        .order-number {
          font-family: 'Courier New', monospace;
          font-weight: bold;
          background: #f0f0f0;
          padding: 2px 8px;
          border-radius: 4px;
        }
        .info-box {
          background: #e8f4f8;
          border-left: 4px solid #0099B5;
          padding: 15px 20px;
          margin: 25px 0;
          border-radius: 4px;
        }
        .info-box p {
          margin: 0;
          color: #0099B5;
          font-size: 14px;
        }
        .footer {
          text-align: center;
          padding: 30px;
          background: #f9f9f9;
          color: #666;
          font-size: 13px;
        }
        .footer p {
          margin: 5px 0;
        }
        .footer a {
          color: #0099B5;
          text-decoration: none;
        }
        @media only screen and (max-width: 600px) {
          .content {
            padding: 30px 20px;
          }
          .order-details {
            padding: 20px 15px;
          }
          .header h1 {
            font-size: 24px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <!-- Header -->
        <div class="header">
          <h1>Balance Conference 2026</h1>
          <p>Potvrda narudžbe</p>
        </div>

        <!-- Content -->
        <div class="content">
          <div class="greeting">
            <p>Poštovani/a <strong>${data.buyerName}</strong>,</p>
          </div>

          <div class="message">
            <p>Hvala vam što ste kupili ulaznicu za Balance Conference 2026! &#127881;</p>
            <p>Vaša narudžba je uspješno procesirana i potvrđena. Ispod možete pronaći sve detalje o vašoj kupovini.</p>
          </div>

          <!-- Order Details -->
          <div class="order-details">
            <h2>Detalji narudžbe</h2>

            <div class="detail-row">
              <span class="detail-label">Broj narudžbe:</span>
              <span class="detail-value order-number">${data.orderNumber}</span>
            </div>

            <div class="detail-row">
              <span class="detail-label">Ulaznica:</span>
              <span class="detail-value">${data.ticketName}</span>
            </div>

            <div class="detail-row">
              <span class="detail-label">Količina:</span>
              <span class="detail-value">${data.quantity}x</span>
            </div>

            <div class="detail-row">
              <span class="detail-label">Cijena ulaznice:</span>
              <span class="detail-value">${data.subtotal.toFixed(2)} ${data.currency}</span>
            </div>

            ${data.discount > 0 ? `
            <div class="detail-row">
              <span class="detail-label">Popust:</span>
              <span class="detail-value" style="color: #22c55e;">-${data.discount.toFixed(2)} ${data.currency}</span>
            </div>
            ` : ''}

            <div class="detail-row">
              <span class="detail-label">PDV (17%):</span>
              <span class="detail-value">${data.tax.toFixed(2)} ${data.currency}</span>
            </div>

            <div class="detail-row total-row">
              <span class="detail-label" style="font-size: 18px;">Ukupno plaćeno:</span>
              <span class="detail-value">${data.totalPrice.toFixed(2)} ${data.currency}</span>
            </div>
          </div>

          <!-- Event Info Box -->
          <div class="info-box">
            <p><strong>&#128197; Datum događaja:</strong> ${data.eventDate}</p>
          </div>

          <div class="message">
            <p>Vaše ulaznice će biti dostupne bliže datumu konferencije. Kontaktirat ćemo vas sa dodatnim informacijama o preuzimanju ulaznica i programu konferencije.</p>

            <p>Ako imate bilo kakvih pitanja ili vam je potrebna pomoć, slobodno nas kontaktirajte na <a href="mailto:balance@mita.ba" style="color: #0099B5;">balance@mita.ba</a>.</p>
          </div>

          <div class="message" style="margin-top: 40px;">
            <p style="font-size: 16px;"><strong>Vidimo se na konferenciji!</strong></p>
            <p style="color: #888;">Balance Conference Tim</p>
          </div>
        </div>

        <!-- Footer -->
        <div class="footer">
          <p><strong>Balance Conference 2026</strong></p>
          <p>&copy; 2026 Balance Conference. Sva prava zadržana.</p>
          <p>
            <a href="mailto:balance@mita.ba">balance@mita.ba</a> |
            <a href="http://www.balanceconference.ba">www.balanceconference.ba</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `
}
