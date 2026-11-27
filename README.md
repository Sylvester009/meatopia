# Meatopia

Meatopia is a responsive online storefront for a local butcher business. Customers can browse meat products, choose weight options, manage a persistent cart, and pay online. Storefront content and product data are powered by Supabase.

**Live site:** [meatopia.com.ng](https://www.meatopia.com.ng/)

## Features

### Storefront

- Browse products by category and search by name, description, or category.
- View product descriptions, images, prices, discounts, and weight options.
- Open product pages using readable, lowercase, hyphenated URLs.
- Add products and weight variants to a cart saved in browser local storage.
- Choose store pickup or home delivery from configured locations and fees.
- Pay in NGN using Paystack Inline.
- Submit an email through the cow-sharing interest form so the business can follow up about future sharing.
- Browse special events and promotions.

### Payments and email

- Payment verification runs on the server using the Paystack transaction reference and amount.
- Successful verification sends order notification and customer confirmation emails through Nodemailer and Gmail.
- Payment secret keys and email credentials are server-side environment variables.

### Admin

- Sign in with Supabase Auth.
- Create, edit, and delete products and events.
- Upload product and event images to Supabase Storage.
- Configure storefront SEO and accessibility settings in the control panel.
- SEO settings include metadata, canonical URL, Open Graph and Twitter cards, robots directives, sitemap URL, structured data, and Google Analytics ID.
- Accessibility settings control storefront options such as larger text, contrast, reduced motion, keyboard navigation, and skip navigation.

Admin authorization uses a trusted `app_metadata.role = "admin"` claim, with a legacy allowlist in the application. Do not assign roles through user-editable `user_metadata`.

> **Current dashboard note:** the admin dashboard's order summary uses sample data. Order and order-item API routes exist, but the checkout flow currently verifies payment and sends emails rather than saving orders through those routes.

## Technology

- **Application:** Next.js 15 App Router, React 19, TypeScript
- **Styling:** Tailwind CSS 4
- **Database and auth:** Supabase (PostgreSQL, Auth, and Storage)
- **Database migrations:** Prisma 7
- **Payments:** Paystack Inline and server-side transaction verification
- **Email:** Nodemailer with Gmail
- **Deployment:** Vercel

## Getting started

### Requirements

- Node.js 20.19 or newer
- npm
- A Supabase project

### Install

```bash
git clone https://github.com/Sylvester009/meatopia.git
cd meatopia
npm install
```

### Configure environment

Create a root-level `.env` file and configure the variables below. Use real values from your own Supabase, Paystack, and email accounts; the application cannot connect to external services with demo or placeholder values.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project API URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase publishable (or anon) key used by browser and server clients |
| `DATABASE_URL` | PostgreSQL connection URI used by Prisma database tooling |
| `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` | Paystack public key used by the checkout page |
| `PAYSTACK_SECRET_KEY` | Server-only key used to verify Paystack transactions |
| `EMAIL_USER` | Gmail account used to send notifications |
| `EMAIL_PASS` | Gmail app password for Nodemailer |
| `BUSINESS_EMAIL` | Email address that receives order notifications |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number in international format, digits only |
| `SUPABASE_SERVICE_KEY` | Optional server-only key for the service-client helper |

Example format:

```env
NEXT_PUBLIC_SUPABASE_URL="https://YOUR_PROJECT.supabase.co"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="YOUR_SUPABASE_PUBLISHABLE_KEY"
DATABASE_URL="postgresql://USER:URL_ENCODED_PASSWORD@HOST:PORT/DATABASE"

NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY="pk_test_YOUR_PUBLIC_KEY"
PAYSTACK_SECRET_KEY="sk_test_YOUR_SECRET_KEY"

EMAIL_USER="you@example.com"
EMAIL_PASS="YOUR_GMAIL_APP_PASSWORD"
BUSINESS_EMAIL="orders@example.com"
NEXT_PUBLIC_WHATSAPP_NUMBER="2348000000000"
```

Replace every example value. The `.env` file is ignored by Git and should never be committed. Do not expose `PAYSTACK_SECRET_KEY`, `EMAIL_PASS`, or `SUPABASE_SERVICE_KEY` in client-side code or variables prefixed with `NEXT_PUBLIC_`.

For `DATABASE_URL`, use the PostgreSQL URI from Supabase's **Connect** dialog. A session-mode pooler or a direct database connection is appropriate for migrations; transaction-mode poolers may not support all migration operations. URL-encode special characters in the database password.

### Configure Supabase

1. Create a Supabase project and set the project URL and publishable key in `.env`.
2. Ensure the database has the tables and columns expected by the app. The checked-in Prisma migrations create product-related tables, site-control settings, and product slugs. They do **not** currently provision every table/model used by the application: `Events`, `Orders`, and `OrderItem`, as well as some fields in the current Prisma schema, must already exist or be provisioned separately for those features.
3. Configure Supabase row-level security so intended public reads work and mutations are restricted to authorized admins.
4. Create the `product-images` and `event-images` Storage buckets and configure the policies needed to read images and allow authorized uploads.
5. Create an admin user in Supabase Auth and assign the trusted admin role in `app_metadata`.

The site-control migrations configure row-level security for the `site_control_settings` table. Public clients can read those settings; authenticated admins can change them.

### Apply Prisma migrations

Prisma 7 reads its schema and database connection from [`prisma.config.ts`](./prisma.config.ts). Generate the client and apply pending migrations from the repository root:

```bash
npx prisma generate
npx prisma migrate deploy
```

`migrate deploy` records applied migrations in Prisma's migration history. If SQL is applied manually through the Supabase SQL Editor, mark that migration as applied with `prisma migrate resolve` only after confirming the SQL completed successfully.

### Run the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Useful commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Create a production build |
| `npm start` | Run the production server after building |
| `npm run lint` | Run ESLint |
| `npx tsc --noEmit` | Run the TypeScript type check |
| `npx prisma generate` | Generate the Prisma client |
| `npx prisma migrate deploy` | Apply pending Prisma migrations |

## Project structure

```text
app/                 Storefront pages, admin pages, and API route handlers
components/          Storefront UI and admin forms
context/             Cart and search state
lib/                 Supabase clients, settings, email, and shared utilities
services/             Product data access and CRUD operations
prisma/               Prisma schema and SQL migrations
public/               Static assets
```

## API routes

The application includes route handlers for products and categories, event management, payment verification, cow-sharing signup, and orders/order items. Product and event reads used by the storefront also query Supabase directly with the publishable key. Product CRUD uses the Supabase client, event management uses API routes, and payment verification runs server-side.

## SEO and accessibility settings

The admin control panel stores site-wide SEO and accessibility preferences in the `site_control_settings` row with ID `global`. The root layout reads these settings to build page metadata and structured data, while `/robots.txt` and `/sitemap.xml` use the corresponding directives and product URLs.

## License

No license file is currently included in this repository. Contact the project owner before redistributing or reusing the code.
