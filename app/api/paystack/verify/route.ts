import { NextResponse } from "next/server"
import { CartItem } from "@/context/CartContext"
import { transporter } from "@/lib/mailer"

export async function POST(req: Request) {
  try {
    const data = await req.json()

    const { reference, cart, formData, total, deliveryMethod } = data

    if (!reference) {
      return NextResponse.json({ success: false, message: "No payment reference" }, { status: 400 })
    }

    // 🔐 VERIFY PAYMENT WITH PAYSTACK
    const verify = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    )

    const verifyData = await verify.json()

    if (verifyData.data.status !== "success") {
      return NextResponse.json({ success: false, message: "Payment not verified" })
    }


    // FORMAT ITEMS
    const itemsHTML = cart.map((item: CartItem) => `
      <tr>
        <td>${item.name}</td>
        <td>${item.weight}</td>
        <td>${item.quantity}</td>
        <td>₦${(item.unitPrice * item.quantity).toLocaleString()}</td>
      </tr>
    `).join("")

    //  BUSINESS EMAIL
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
        <p>Method: ${deliveryMethod}</p>

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

        <p><strong>Reference:</strong> ${reference}</p>
      `
    })

    //  CUSTOMER CONFIRMATION EMAIL
    await transporter.sendMail({
      from: `"Meatopia" <${process.env.EMAIL_USER}>`,
      to: formData.email,
      subject: "Your Order is Confirmed 🥩",
      html: `
        <h2>Thank You For Your Order!</h2>

        <p>Hi ${formData.firstName},</p>

        <p>Your payment was successful and your order is being prepared.</p>

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

        <p>We’ll contact you shortly for delivery updates.</p>

        <p>— Meatopia Team 🥩</p>
      `
    })

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error("Order Error:", error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}