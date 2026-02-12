import nodemailer from "nodemailer"
import { NextResponse } from "next/server"
import { CartItem } from "@/context/CartContext"

export async function POST(req: Request) {
  try {
    const data = await req.json()

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    const itemsHTML = data.cart.map((item: CartItem) => `
      <tr>
        <td>${item.name}</td>
        <td>${item.weight}</td>
        <td>${item.quantity}</td>
        <td>₦${(item.price * item.quantity).toLocaleString()}</td>
      </tr>
    `).join("")

    const mailOptions = {
      from: `"Meatopia Orders" <${process.env.EMAIL_USER}>`,
      to: process.env.BUSINESS_EMAIL,
      subject: `🛒 New Order from ${data.formData.firstName}`,
      html: `
        <h2>New Customer Order</h2>

        <h3>Customer Info</h3>
        <p>
          Name: ${data.formData.firstName} ${data.formData.lastName}<br/>
          Phone: ${data.formData.phone}<br/>
          Email: ${data.formData.email}<br/>
          Address: ${data.formData.address}, ${data.formData.city}, ${data.formData.state}
        </p>

        <h3>Delivery</h3>
        <p>Method: ${data.deliveryMethod}</p>

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
        <strong>₦${data.total.toLocaleString()}</strong>
      `
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Email Error:", error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
