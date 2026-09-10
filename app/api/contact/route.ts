import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
    hasContactErrors,
    validateContactForm,
    type ContactFormData,
} from "@/app/lib/contactValidation";

export const runtime = "nodejs";

const MAX_REQUEST_BYTES = 64 * 1024;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const requestCounts = new Map<string, { count: number; resetAt: number }>();

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

function getClientKey(req: NextRequest): string {
    const forwardedFor = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
    return forwardedFor || req.headers.get("x-real-ip")?.trim() || "unknown";
}

function isRateLimited(key: string): boolean {
    const now = Date.now();
    const current = requestCounts.get(key);

    if (!current || current.resetAt <= now) {
        requestCounts.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
        return false;
    }

    current.count += 1;
    return current.count > RATE_LIMIT_MAX_REQUESTS;
}

function escapeHtml(text: string): string {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

export async function POST(req: NextRequest) {
    const contentLength = Number(req.headers.get("content-length") || 0);
    if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BYTES) {
        return NextResponse.json(
            { error: "Form submission is too large." },
            { status: 413 }
        );
    }

    let rawBody: unknown;
    try {
        rawBody = await req.json();
    } catch {
        return NextResponse.json(
            { error: "Please submit a valid form." },
            { status: 400 }
        );
    }

    const validation = validateContactForm(rawBody);

    // The hidden field is a honeypot. Silently accept bot submissions without
    // sending mail so the endpoint does not reveal the spam check.
    if (validation.isHoneypot) {
        return NextResponse.json({ success: true }, { status: 200 });
    }

    if (hasContactErrors(validation.errors)) {
        return NextResponse.json(
            {
                error: "Please correct the highlighted fields.",
                errors: validation.errors,
            },
            { status: 400 }
        );
    }

    const body: ContactFormData = validation.data;
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

    if (isRateLimited(getClientKey(req))) {
        return NextResponse.json(
            { error: "Too many submissions. Please try again later." },
            { status: 429, headers: { "Retry-After": "600" } }
        );
    }

    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: config.gmailUser,
                pass: config.gmailPass,
            },
        });

        const safeName = escapeHtml(body.name);
        const safeEmail = escapeHtml(body.email);
        const safePhone = escapeHtml(body.phone || "—");
        const safeCompany = escapeHtml(body.company || "—");
        const safeHear = escapeHtml(body.hearAboutUs || "—");
        const safeDetails = escapeHtml(body.projectDetails || "No details provided.").replace(
            /\n/g,
            "<br />"
        );

        await transporter.sendMail({
            from: `"Contact Form" <${config.gmailUser}>`,
            to: config.receiver,
            replyTo: body.email,
            subject: `New enquiry from ${body.name}`,
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

        // The internal notification is the important delivery. A temporary
        // auto-reply failure should not make the visitor submit twice.
        try {
            await transporter.sendMail({
                from: `"${config.businessName}" <${config.gmailUser}>`,
                to: body.email,
                subject: "Thanks for reaching out!",
                text: `Thanks for reaching out, ${body.name}. We’ve received your enquiry and will get back to you within one business day. If you need to add anything, simply reply to this email.`,
                html: `
        <!doctype html>
        <html lang="en">
          <body style="margin:0;background:#f3f4f2;color:#1f1e1e;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f2;width:100%;">
              <tr>
                <td align="center" style="padding:32px 16px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid #e5e7e3;border-radius:16px;overflow:hidden;">
                    <tr>
                      <td style="padding:22px 28px;background:#1f1e1e;">
                        <table role="presentation" cellpadding="0" cellspacing="0">
                          <tr>
                            <td style="vertical-align:middle;">
                              <img src="https://www.creative3r.com/assets/images/logo.svg" width="42" height="36" alt="3R Creative" style="display:block;width:42px;height:auto;border:0;" />
                            </td>
                            <td style="padding-left:12px;vertical-align:middle;color:#ffffff;font-size:15px;font-weight:700;letter-spacing:.02em;">
                              3R Creative
                              <div style="padding-top:3px;color:#a7aaa6;font-size:11px;font-weight:400;letter-spacing:.08em;">REFLECT. REFINE. RESONATE.</div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:36px 32px 32px;">
                        <p style="margin:0 0 12px;color:#e76f51;font-size:11px;font-weight:700;letter-spacing:.16em;">MESSAGE RECEIVED</p>
                        <h1 style="margin:0;color:#1f1e1e;font-size:26px;line-height:1.25;font-weight:700;">Thanks for reaching out, ${safeName}.</h1>
                        <p style="margin:18px 0 0;color:#555b57;font-size:15px;line-height:1.7;">We’ve received your enquiry and our team will review it. You can expect a reply within one business day.</p>
                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;background:#f7f8f6;border:1px solid #e5e7e3;border-radius:10px;">
                          <tr>
                            <td style="padding:16px 18px;">
                              <p style="margin:0 0 5px;color:#858b86;font-size:10px;font-weight:700;letter-spacing:.13em;">WHAT HAPPENS NEXT</p>
                              <p style="margin:0;color:#343a36;font-size:14px;line-height:1.6;">We’ll review your details and get back to you shortly.</p>
                            </td>
                          </tr>
                        </table>
                        <p style="margin:24px 0 0;color:#555b57;font-size:14px;line-height:1.7;">Need to add anything? Simply reply to this email and we’ll include it in your enquiry.</p>
                        <p style="margin:26px 0 0;"><a href="https://www.creative3r.com" style="display:inline-block;padding:11px 18px;background:#e76f51;border-radius:999px;color:#1f1e1e;font-size:13px;font-weight:700;text-decoration:none;">Visit our website</a></p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:18px 32px;background:#fafbf9;border-top:1px solid #e5e7e3;">
                        <p style="margin:0;color:#343a36;font-size:12px;font-weight:700;">3R Creative</p>
                        <p style="margin:5px 0 0;color:#858b86;font-size:11px;line-height:1.6;">creative3r.com · info@creative3r.com</p>
                      </td>
                    </tr>
                  </table>
                  <p style="margin:16px 0 0;color:#9ba19c;font-size:10px;line-height:1.5;">This is an automated confirmation of your enquiry.</p>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
            });
        } catch (autoReplyError) {
            console.error("[contact/route] Auto-reply failed:", autoReplyError);
        }

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
