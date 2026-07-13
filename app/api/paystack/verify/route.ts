import { NextResponse } from "next/server"
import { CartItem } from "@/context/CartContext"
import { getTransporter } from "@/lib/mailer"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { reference, cart, formData, total, deliveryMethod, deliveryLocation } = body

    if (!reference) {
      return NextResponse.json(
        { success: false, message: "Missing payment reference" },
        { status: 400 }
      )
    }

    const verifyRes = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
        signal: AbortSignal.timeout(5000),
      }
    )

    const verifyData = await verifyRes.json()

    if (!verifyData.status || verifyData.data?.status !== "success") {
      return NextResponse.json({
        success: false,
        message: "Payment not verified",
      })
    }

    const paidAmount = verifyData.data.amount / 100
    if (paidAmount !== total) {
      return NextResponse.json({
        success: false,
        message: "Amount mismatch",
      })
    }

    const response = NextResponse.json({
      success: true,
      message: "Payment verified and order processed",
    })

    processEmails(cart, formData, total, deliveryMethod, deliveryLocation, reference).catch(console.error)

    return response

  } catch (error) {
    console.error("ORDER PROCESS ERROR:", error)
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    )
  }
}

async function processEmails(cart: CartItem[], formData: { firstName: any; lastName: any; phone: any; email: any; address: any; city: any; state: any }, total: { toLocaleString: () => any }, deliveryMethod: any, deliveryLocation: any, reference: any) {
  try {
    const transporter = getTransporter()

    // Format cart items
    const itemsHTML = cart.map((item: CartItem) => `
      <tr>
        <td>${item.name}</td>
        <td>${item.weight}</td>
        <td>${item.quantity}</td>
        <td>₦${(item.unitPrice * item.quantity).toLocaleString()}</td>
      </tr>
    `).join("")

    // Send business email
    await transporter.sendMail({
      from: `"Meatopia Orders" <${process.env.EMAIL_USER}>`,
      to: process.env.BUSINESS_EMAIL,
      subject: `🛒 New Order from ${formData.firstName}`,
      html: `
        <h2>New Customer Order</h2>

        <h3>Customer Info</h3>
        <p>
          Name: ${formData.firstName} ${formData.lastName}<br/>
          Phone: ${formData.phone}<br/>
          Email: ${formData.email}<br/>
          Address: ${formData.address}, ${formData.city}, ${formData.state}
        </p>

        <h3>Delivery</h3>
        <p>${deliveryMethod} - ${deliveryLocation}</p>

        <h3>Order Items</h3>
        <table border="1" cellpadding="8">
          <tr>
            <th>Product</th>
            <th>Weight</th>
            <th>Qty</th>
            <th>Total</th>
          </tr>
          ${itemsHTML}
        </table>

        <h3>Total Paid</h3>
        <strong>₦${total.toLocaleString()}</strong>

        <p>Reference: ${reference}</p>
      `,
    })

    // Send customer email
    await transporter.sendMail({
      from: `"Meatopia" <${process.env.EMAIL_USER}>`,
      to: formData.email,
      subject: "Your Order is Confirmed 🥩",
      html: `
        <h2>Thank you for your order!</h2>

        <p>Hi ${formData.firstName},</p>

        <p>Your payment was successful and we have received your order.</p>

        <h3>Order Summary</h3>
        <table border="1" cellpadding="8">
          <tr>
            <th>Product</th>
            <th>Weight</th>
            <th>Qty</th>
            <th>Total</th>
          </tr>
          ${itemsHTML}
        </table>

        <h3>Total Paid: ₦${total.toLocaleString()}</h3>

        <p>Delivery Method: ${deliveryMethod}</p>

        <p>We will contact you soon for delivery updates.</p>

        <p>— Meatopia Team 🥩</p>
      `,
    })
  } catch (error) {
    console.error("Email sending error:", error)
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    )
  }
}