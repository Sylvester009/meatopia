import { NextResponse } from "next/server";
import { getTransporter } from "@/lib/mailer";

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json(
                { message: "Email is required" },
                { status: 400 }
            );
        }

        const transporter = getTransporter();

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: "New Cow Sharing Interest",
            html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>New Cow Sharing Interest 🐄</h2>

          <p>Someone wants to be notified about future Meatopia Cow Sharing.</p>

          <p>
            <strong>Email:</strong> ${email}
          </p>

          <p>
            Add this person to the Cow Sharing notification list.
          </p>
        </div>
      `,
        });

        return NextResponse.json({
            message: "Successfully registered",
        });
    } catch (error) {
        console.error("Cow sharing signup error:", error);

        return NextResponse.json(
            { message: "Unable to register right now" },
            { status: 500 }
        );
    }
}