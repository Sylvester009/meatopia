// app/api/verify-payment/route.ts

import { NextResponse } from "next/server"
import { CartItem } from "@/context/CartContext"
import { getTransporter } from "@/lib/mailer"

export async function POST(req: Request) {
  try {
    const transporter = getTransporter()

    const body = await req.json()
    const { reference, cart, formData, total, deliveryMethod } = body

    if (!reference) {
      return NextResponse.json(
        { success: false, message: "Missing payment reference" },
        { status: 400 }
      )
    }

    // VERIFY TRANSACTION WITH PAYSTACK
    const verifyRes = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    )

    const verifyData = await verifyRes.json()

    console.log("PAYSTACK VERIFY:", verifyData)
    console.log("REFERENCE:", reference)
    console.log("VERIFY DATA:", verifyData)

    // CHECK PAYSTACK RESPONSE
    if (!verifyData.status || verifyData.data?.status !== "success") {
      return NextResponse.json({
        success: false,
        message: "Payment not verified",
      })
    }

    // CHECK AMOUNT (PAYSTACK RETURNS KOBO)
    const paidAmount = verifyData.data.amount / 100

    if (paidAmount !== total) {
      console.log("Amount mismatch:", paidAmount, total)

      return NextResponse.json({
        success: false,
        message: "Amount mismatch",
      })
    }

    // FORMAT CART ITEMS
    const itemsHTML = cart
      .map(
        (item: CartItem) => `
      <tr>
        <td>${item.name}</td>
        <td>${item.weight}</td>
        <td>${item.quantity}</td>
        <td>₦${(item.unitPrice * item.quantity).toLocaleString()}</td>
      </tr>
    `
      )
      .join("")

    // BUSINESS EMAIL
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
        <p>${deliveryMethod}</p>

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

    // CUSTOMER EMAIL
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

    return NextResponse.json({
      success: true,
      message: "Payment verified and order processed",
    })
  } catch (error) {
    console.error("ORDER PROCESS ERROR:", error)

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    )
  }
}