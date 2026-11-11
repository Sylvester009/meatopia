import { NextResponse } from "next/server"
import { CartItem } from "@/context/CartContext"
import { getTransporter } from "@/lib/mailer"

type CheckoutFormData = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
};

type EmailOrder = {
  reference: string;
  cart: CartItem[];
  formData: CheckoutFormData;
  total: number;
  deliveryMethod: string;
  deliveryLocation: string;
};

export async function POST(req: Request) {
  try {
    const body: EmailOrder = await req.json()
    const { reference, cart, formData, total, deliveryMethod, deliveryLocation } = body

    if (!reference) {
      return NextResponse.json(
        { success: false, message: "Missing payment reference" },
        { status: 400 }
      )
    }

    const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY
    if (!paystackSecretKey) {
      return NextResponse.json(
        { success: false, message: "Payment verification is not configured" },
        { status: 500 }
      )
    }

    const verifyRes = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${paystackSecretKey}`,
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

    const emailDelivery = await processEmails(
      cart,
      formData,
      total,
      deliveryMethod,
      deliveryLocation,
      reference,
    );

    return NextResponse.json({
      success: true,
      message: "Payment verified and order processed",
      emailDelivery,
    });
  } catch (error) {
    console.error("ORDER PROCESS ERROR:", error)
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    )
  }
}

async function processEmails(
  cart: CartItem[],
  formData: CheckoutFormData,
  total: number,
  deliveryMethod: string,
  deliveryLocation: string,
  reference: string,
): Promise<{business: boolean; customer: boolean}> {
  const businessEmail = process.env.BUSINESS_EMAIL;
  const emailUser = process.env.EMAIL_USER;

  if (!businessEmail || !emailUser) {
    console.error(
      'Order email delivery is not configured: BUSINESS_EMAIL and EMAIL_USER are required',
    );
    return {business: false, customer: false};
  }

  const escapeHtml = (value: string) =>
    value.replace(/[&<>"']/g, character => {
      const entities: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      };
      return entities[character];
    });

  const itemsHTML = cart.map(item => `
      <tr>
        <td>${escapeHtml(item.name)}</td>
        <td>${escapeHtml(item.weight)}</td>
        <td>${item.quantity}</td>
        <td>₦${(item.unitPrice * item.quantity).toLocaleString()}</td>
      </tr>
    `).join("")

  const customerName = `${formData.firstName} ${formData.lastName}`;
  const escapedCustomerFields = {
    name: escapeHtml(customerName),
    phone: escapeHtml(formData.phone),
    email: escapeHtml(formData.email),
    address: escapeHtml(
      `${formData.address}, ${formData.city}, ${formData.state}`,
    ),
    deliveryMethod: escapeHtml(deliveryMethod),
    deliveryLocation: escapeHtml(deliveryLocation),
    reference: escapeHtml(reference),
  };
  let transporter: ReturnType<typeof getTransporter>;
  try {
    transporter = getTransporter();
  } catch (error) {
    console.error('Unable to configure order email delivery:', error);
    return {business: false, customer: false};
  }

  const results = await Promise.allSettled([
    transporter.sendMail({
      from: `"Meatopia Orders" <${emailUser}>`,
      to: businessEmail,
      subject: `🛒 New Order from ${customerName}`,
      html: `
        <h2>New Customer Order</h2>

        <h3>Customer Info</h3>
        <p>
          Name: ${escapedCustomerFields.name}<br/>
          Phone: ${escapedCustomerFields.phone}<br/>
          Email: ${escapedCustomerFields.email}<br/>
          Address: ${escapedCustomerFields.address}
        </p>

        <h3>Delivery</h3>
        <p>${escapedCustomerFields.deliveryMethod} - ${escapedCustomerFields.deliveryLocation}</p>

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

        <p>Reference: ${escapedCustomerFields.reference}</p>
      `,
    }),
    transporter.sendMail({
      from: `"Meatopia" <${emailUser}>`,
      to: formData.email,
      subject: "Your Order is Confirmed 🥩",
      html: `
        <h2>Thank you for your order!</h2>

        <p>Hi ${escapeHtml(formData.firstName)},</p>

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

        <p>Delivery Method: ${escapedCustomerFields.deliveryMethod} - ${escapedCustomerFields.deliveryLocation}</p>

        <p>We will contact you soon for delivery updates.</p>

        <p>— Meatopia Team 🥩</p>
      `,
    })
  ]);

  results.forEach((result, index) => {
    if (result.status === 'rejected') {
      console.error(
        index === 0
          ? 'Failed to send business order email:'
          : 'Failed to send customer confirmation email:',
        result.reason,
      );
    }
  });

  return {
    business: results[0].status === 'fulfilled',
    customer: results[1].status === 'fulfilled',
  };
}
