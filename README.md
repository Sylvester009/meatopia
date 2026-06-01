# 🥩 Meatopia E-Commerce Platform

A full-stack e-commerce web application built for a local butcher business, enabling customers to browse products, select weight variants, place orders, and complete secure online payments.

The platform provides a seamless shopping experience with persistent cart functionality, server-side payment verification, and automated order notifications. It is currently deployed and actively used by real customers.

## 🚀 Live Demo

🔗 **Live Site:** [Visit Meatopia](https://www.meatopia.com.ng/)

---

## 📈 Production Highlights

- Live and deployed on Vercel
- Real customers actively placing orders
- Integrated online payments via Paystack
- Automated business order notifications
- Mobile-first user experience

---

## 📸 Overview

Meatopia was developed to digitize the ordering process for a local meat vendor. Instead of relying on phone calls and messaging apps, customers can now browse available products, select preferred quantities and weight variants, and complete purchases online.

The application follows a mobile-first design approach to ensure a smooth experience across smartphones, tablets, and desktop devices.

---

## ✨ Features

### Customer Features

- Browse available meat products
- View product details and pricing
- Select weight variants (e.g. 1kg, 2kg)
- Adjust product quantities
- Add and remove items from cart
- Persistent shopping cart using LocalStorage
- Mobile-friendly responsive design
- Secure Paystack payment integration
- Streamlined checkout experience

### Business Features

- Automated order notification emails
- Server-side payment verification
- Transaction validation before order processing
- Reliable order management workflow

---

## 🛠 Tech Stack

### Frontend

- Next.js (App Router)
- TypeScript
- React
- Tailwind CSS

### Backend

- Next.js Route Handlers (API Routes)
- Nodemailer

### Payment Processing

- Paystack Inline Payment
- Server-side transaction verification

### Deployment

- Vercel

---

## 🏗 Application Flow

1. Customer browses available products.
2. Customer selects weight variants and quantities.
3. Products are added to a persistent shopping cart.
4. Customer proceeds to checkout.
5. Payment is initiated via Paystack.
6. Backend verifies the transaction with Paystack.
7. Successful payments trigger order processing.
8. Order details are automatically emailed to the business.
9. Customer receives confirmation of a successful order.

---

## 🔒 Payment Verification

To ensure transaction integrity, all payments are verified on the server before an order is processed.

This prevents:

- Client-side payment spoofing
- Fake transaction references
- Unauthorized order creation

---

## 📱 Responsive Design

The platform was built using a mobile-first approach with:

- Optimized navigation
- Touch-friendly interactions
- Responsive layouts
- Cross-device compatibility

---

## ⚙️ Local Development

### Clone the Repository

```bash
git clone https://github.com/Sylvester009/meatopia.git
cd meatopia
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env.local` file:

```env
PAYSTACK_SECRET_KEY=
PAYSTACK_PUBLIC_KEY=

EMAIL_USER=
EMAIL_PASS=
```

### Start Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 🎯 Key Learnings

Building Meatopia provided practical experience in:

- Full-stack application development
- Payment gateway integration
- Server-side transaction validation
- Email automation workflows
- State management and cart persistence
- Responsive UI development
- Production deployment with Vercel

---

## 👨‍💻 Author

### Samuel Sylvester

Frontend & Full-Stack Developer specializing in:

- JavaScript
- TypeScript
- React
- Next.js
- Tailwind CSS

---

## 📬 Feedback

If you have suggestions, feedback, or would like a deeper technical walkthrough of the architecture, feel free to open an issue or reach out.

⭐ If you found this project interesting, consider giving it a star.
