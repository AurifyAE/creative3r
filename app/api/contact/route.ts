import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

export interface ContactFormData {
    name: string;
    email: string;
    phone?: string;
    phoneCountry?: string;
    company?: string;
    hearAboutUs?: string;
    projectDetails?: string;
}

function getMailConfig() {
    const gmailUser = process.env.GMAIL_USER?.trim();
    const gmailPass = process.env.GMAIL_APP_PASS?.trim();
    const receiver = process.env.CONTACT_RECEIVER_EMAIL?.trim();

    if (!gmailUser || !gmailPass || !receiver) {
        return {
            ok: false as const,
            missing: [
                !gmailUser && "GMAIL_USER",
                !gmailPass && "GMAIL_APP_PASS",
                !receiver && "CONTACT_RECEIVER_EMAIL",
            ].filter(Boolean) as string[],
        };
    }

    return {
        ok: true as const,
        gmailUser,
        gmailPass,
        receiver,
        businessName: process.env.BUSINESS_NAME?.trim() || "3R Creative",
    };
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

function escapeHtml(text: string): string {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

export async function POST(req: NextRequest) {
    const config = getMailConfig();
    if (!config.ok) {
        console.error(
            "[contact/route] Missing environment variables:",
            config.missing.join(", ")
        );
        return NextResponse.json(
            {
                error:
                    "Email service is not configured. Please contact us directly at info@creative3r.com.",
            },
            { status: 503 }
        );
    }

    try {
        const body: ContactFormData = await req.json();

        const validationError = validateContactForm(body);
        if (validationError) {
            return NextResponse.json({ error: validationError }, { status: 400 });
        }

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: config.gmailUser,
                pass: config.gmailPass,
            },
        });

        const safeName = escapeHtml(body.name.trim());
        const safeEmail = escapeHtml(body.email.trim());
        const safePhone = escapeHtml(body.phone?.trim() || "—");
        const safeCompany = escapeHtml(body.company?.trim() || "—");
        const safeHear = escapeHtml(body.hearAboutUs?.trim() || "—");
        const safeDetails = escapeHtml(body.projectDetails?.trim() || "No details provided.").replace(
            /\n/g,
            "<br />"
        );

        await transporter.sendMail({
            from: `"Contact Form" <${config.gmailUser}>`,
            to: config.receiver,
            replyTo: body.email.trim(),
            subject: `New enquiry from ${body.name.trim()}`,
            html: `
        <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:32px;background:#1F1E1E;color:#fff;border-radius:12px;">
          <h2 style="color:#E76F51;margin-top:0;">New Contact Form Submission</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#aaa;width:150px;">Name</td>       <td style="padding:8px 0;">${safeName}</td></tr>
            <tr><td style="padding:8px 0;color:#aaa;">Email</td>      <td style="padding:8px 0;"><a href="mailto:${safeEmail}" style="color:#E76F51;">${safeEmail}</a></td></tr>
            <tr><td style="padding:8px 0;color:#aaa;">Phone</td>      <td style="padding:8px 0;">${safePhone}</td></tr>
            <tr><td style="padding:8px 0;color:#aaa;">Company</td>    <td style="padding:8px 0;">${safeCompany}</td></tr>
            <tr><td style="padding:8px 0;color:#aaa;">Found us via</td><td style="padding:8px 0;">${safeHear}</td></tr>
          </table>
          <hr style="border-color:#333;margin:24px 0;" />
          <p style="color:#aaa;margin-bottom:8px;">Project Details</p>
          <p style="background:#2a2a2a;padding:16px;border-radius:8px;line-height:1.6;">${safeDetails}</p>
        </div>
      `,
        });

        await transporter.sendMail({
            from: `"${config.businessName}" <${config.gmailUser}>`,
            to: body.email.trim(),
            subject: "Thanks for reaching out!",
            html: `
        <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:32px;background:#1F1E1E;color:#fff;border-radius:12px;">
          <h2 style="color:#E76F51;margin-top:0;">Thanks a ton, ${safeName}!</h2>
          <p style="color:#ddd;line-height:1.7;">
            We're thrilled to connect and can't wait to start working together.
            We'll review your message and get back to you within one business day.
          </p>
          <p style="color:#ddd;line-height:1.7;">In the meantime, feel free to reply to this email if you think of anything else.</p>
          <p style="color:#299D8F;font-weight:bold;margin-top:32px;">Talk soon</p>
        </div>
      `,
        });

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        console.error("[contact/route] Error:", message, err);

        const isAuthError =
            message.includes("Invalid login") ||
            message.includes("authentication") ||
            message.includes("535");

        return NextResponse.json(
            {
                error: isAuthError
                    ? "Email service authentication failed. Please contact us at info@creative3r.com."
                    : "Failed to send message. Please try again later or email info@creative3r.com.",
            },
            { status: 500 }
        );
    }
}
