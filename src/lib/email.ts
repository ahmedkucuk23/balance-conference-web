import { Resend } from 'resend'
import { orderConfirmationTemplate } from './email-templates'

// Lazy initialization to avoid build-time errors
let resendInstance: Resend | null = null

function getResend(): Resend {
  if (!resendInstance) {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      throw new Error('RESEND_API_KEY environment variable is not set')
    }
    resendInstance = new Resend(apiKey)
  }
  return resendInstance
}

export interface OrderEmailData {
  id: string
  orderNumber: string
  quantity: number
  subtotal: number
  discount: number
  tax: number
  totalPrice: number
  currency: string
  buyerName: string
  buyerEmail: string
  ticket: {
    name: string
    description?: string | null
  }
}

/**
 * Send payment success confirmation email
 */
export async function sendPaymentSuccess(order: OrderEmailData): Promise<void> {
  try {
    const emailHtml = orderConfirmationTemplate({
      orderNumber: order.orderNumber,
      buyerName: order.buyerName,
      ticketName: order.ticket.name,
      ticketDescription: order.ticket.description || undefined,
      quantity: order.quantity,
      subtotal: order.subtotal,
      discount: order.discount,
      tax: order.tax,
      totalPrice: order.totalPrice,
      currency: order.currency,
      eventDate: 'TBD 2026' // Update with actual conference date when available
    })

    const resend = getResend()
    const result = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'Balance Conference <noreply@balanceconference.ba>',
      to: order.buyerEmail,
      subject: `Potvrda narudžbe - Balance Conference 2026 - ${order.orderNumber}`,
      html: emailHtml
    })

    console.log('Confirmation email sent successfully:', {
      orderId: order.id,
      orderNumber: order.orderNumber,
      to: order.buyerEmail,
      emailId: result.data?.id
    })
  } catch (error) {
    console.error('Error sending confirmation email:', {
      orderId: order.id,
      orderNumber: order.orderNumber,
      error: error instanceof Error ? error.message : 'Unknown error'
    })

    // Don't throw - email failure shouldn't break the payment flow
    // The order is still successful even if email fails
  }
}
