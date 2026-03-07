import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export interface ContactFormData {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    hearAboutUs?: string;
    projectDetails?: string;
}

function validateContactForm(data: ContactFormData): string | null {
    if (!data.name || data.name.trim().length < 3) {
        return "Name must be at least 3 characters.";
    }
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        return "A valid email address is required.";
    }
    return null;
}

export async function POST(req: NextRequest) {
    try {
        const body: ContactFormData = await req.json();

        const validationError = validateContactForm(body);
        if (validationError) {
            return NextResponse.json({ error: validationError }, { status: 400 });
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASS,
            },
        });

        // ── Email to YOU (the business) ──────────────────────────────────────────
        await transporter.sendMail({
            from: `"Contact Form" <${process.env.GMAIL_USER}>`,
            to: process.env.CONTACT_RECEIVER_EMAIL,
            replyTo: body.email,
            subject: `New enquiry from ${body.name}`,
            html: `
        <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:32px;background:#1F1E1E;color:#fff;border-radius:12px;">
          <h2 style="color:#E76F51;margin-top:0;">New Contact Form Submission</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#aaa;width:150px;">Name</td>       <td style="padding:8px 0;">${body.name}</td></tr>
            <tr><td style="padding:8px 0;color:#aaa;">Email</td>      <td style="padding:8px 0;"><a href="mailto:${body.email}" style="color:#E76F51;">${body.email}</a></td></tr>
            <tr><td style="padding:8px 0;color:#aaa;">Phone</td>      <td style="padding:8px 0;">${body.phone || "—"}</td></tr>
            <tr><td style="padding:8px 0;color:#aaa;">Company</td>    <td style="padding:8px 0;">${body.company || "—"}</td></tr>
            <tr><td style="padding:8px 0;color:#aaa;">Found us via</td><td style="padding:8px 0;">${body.hearAboutUs || "—"}</td></tr>
          </table>
          <hr style="border-color:#333;margin:24px 0;" />
          <p style="color:#aaa;margin-bottom:8px;">Project Details</p>
          <p style="background:#2a2a2a;padding:16px;border-radius:8px;line-height:1.6;">${body.projectDetails?.replace(/\n/g, "<br />") || "No details provided."
                }</p>
        </div>
      `,
        });

        // ── Auto-reply to the SENDER ─────────────────────────────────────────────
        await transporter.sendMail({
            from: `"${process.env.BUSINESS_NAME ?? "Us"}" <${process.env.GMAIL_USER}>`,
            to: body.email,
            subject: "Thanks for reaching out! ☕",
            html: `
        <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:32px;background:#1F1E1E;color:#fff;border-radius:12px;">
          <h2 style="color:#E76F51;margin-top:0;">Thanks a ton, ${body.name}!</h2>
          <p style="color:#ddd;line-height:1.7;">
            We&apos;re thrilled to connect and can't wait to start working together.
            We'll review your message and get back to you within one business day.
          </p>
          <p style="color:#ddd;line-height:1.7;">In the meantime, feel free to reply to this email if you think of anything else.</p>
          <p style="color:#299D8F;font-weight:bold;margin-top:32px;">Talk soon ☕</p>
        </div>
      `,
        });

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (err) {
        console.error("[contact/route] Error:", err);
        return NextResponse.json(
            { error: "Failed to send message. Please try again later." },
            { status: 500 }
        );
    }
}