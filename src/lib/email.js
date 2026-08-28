import nodemailer from "nodemailer";

export function getTransporter() {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = parseInt(process.env.SMTP_PORT || "465", 10);
  const user = (process.env.SMTP_USER || "").trim();
  const pass = (process.env.SMTP_PASS || "").replace(/\s+/g, "").trim();

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });
}

// 1. Password Reset Email
export async function sendPasswordResetEmail(recipientEmail, resetUrl) {
  const transporter = getTransporter();

  const recipientName = recipientEmail.split("@")[0] || "Admin";
  const formattedName = recipientName.charAt(0).toUpperCase() + recipientName.slice(1);

  const htmlContent = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 40px 20px; color: #1e293b; }
        .container { max-width: 540px; margin: 0 auto; background: #ffffff; border-radius: 12px; padding: 40px; border: 1px solid #e2e8f0; }
        .logo-title { font-size: 22px; font-weight: 800; color: #0f172a; text-align: center; margin-bottom: 32px; letter-spacing: -0.5px; }
        .greeting { font-size: 16px; font-weight: 700; color: #0f172a; margin-bottom: 16px; }
        .text { font-size: 14px; line-height: 24px; color: #475569; margin-bottom: 24px; }
        .btn-container { text-align: center; margin: 30px 0; }
        .btn { display: inline-block; background-color: #0f172a; color: #ffffff !important; text-decoration: none; padding: 12px 28px; font-size: 14px; font-weight: 600; border-radius: 8px; }
        .notice { font-size: 13px; color: #64748b; line-height: 20px; margin-bottom: 12px; }
        .divider { border-top: 1px solid #f1f5f9; margin: 28px 0; }
        .subtext { font-size: 12px; color: #94a3b8; line-height: 18px; word-break: break-all; }
        .link { color: #0f172a; text-decoration: underline; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="logo-title">Digital Latte</div>
        <div class="greeting">Hello ${formattedName},</div>
        <div class="text">
          You are receiving this email because we received a password reset request for your admin account.
        </div>
        <div class="btn-container">
          <a href="${resetUrl}" target="_blank" class="btn">Reset Password</a>
        </div>
        <div class="notice">This password reset link will expire in 60 minutes.</div>
        <div class="notice">If you did not request a password reset, no further action is required.</div>
        <div class="notice" style="margin-top: 20px;">Regards,<br><strong>Digital Latte Team</strong></div>
        
        <div class="divider"></div>
        <div class="subtext">
          If you're having trouble clicking the "Reset Password" button, copy and paste the URL below into your web browser:
          <br><br>
          <a href="${resetUrl}" class="link">${resetUrl}</a>
        </div>
      </div>
    </body>
  </html>
  `;

  if (!transporter) {
    console.warn(`[Email] SMTP not configured. Reset URL: ${resetUrl}`);
    return { success: true, simulated: true };
  }

  const from = process.env.SMTP_FROM || `"Digital Latte" <${process.env.SMTP_USER}>`;

  return await transporter.sendMail({
    from,
    to: recipientEmail,
    subject: "Reset Your Admin Password — Digital Latte",
    html: htmlContent,
  });
}

// 2. Auto-Reply for Contact Us Inquiries
export async function sendContactAutoReply(name, recipientEmail) {
  const transporter = getTransporter();
  const userName = name || "There";

  const htmlContent = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 40px 15px; color: #334155; }
        .wrapper { max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 14px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
        .header { background: linear-gradient(135deg, #ff7b00 0%, #e65c00 100%); color: #ffffff; padding: 36px 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px; }
        .header p { margin: 8px 0 0 0; font-size: 14px; opacity: 0.95; font-weight: 400; }
        .body-content { padding: 36px 32px; font-size: 15px; line-height: 26px; color: #334155; }
        .body-content p { margin: 0 0 16px 0; }
        .signoff { margin-top: 28px; font-size: 14px; color: #64748b; }
        .signoff strong { color: #0f172a; }
        .footer { background: #f8fafc; padding: 20px 32px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="header">
          <h1>Message Received</h1>
          <p>Thank you for getting in touch with Digital Latte</p>
        </div>
        <div class="body-content">
          <p>Hi <strong>${userName}</strong>,</p>
          <p>Thank you for reaching out to us! We have received your inquiry.</p>
          <p>Our team will review your message and get in touch with you shortly to discuss your requirements.</p>
          <div class="signoff">
            Thank you,<br>
            <strong>Digital Latte</strong>
          </div>
        </div>
        <div class="footer">
          © ${new Date().getFullYear()} Digital Latte. All rights reserved.
        </div>
      </div>
    </body>
  </html>
  `;

  if (!transporter) {
    console.log(`[Auto-Reply Simulated] Contact confirmation sent to: ${recipientEmail}`);
    return { success: true, simulated: true };
  }

  const from = process.env.SMTP_FROM || `"Digital Latte" <${process.env.SMTP_USER}>`;

  return await transporter.sendMail({
    from,
    to: recipientEmail,
    subject: "Thank You for Contacting Digital Latte",
    html: htmlContent,
  });
}

// 3. Auto-Reply for Job & Career Applications (Matches Screenshot 2)
export async function sendCareerAutoReply(name, recipientEmail, jobTitle) {
  const transporter = getTransporter();
  const userName = name || "Applicant";
  const roleName = jobTitle || "the position";

  const htmlContent = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 40px 15px; color: #334155; }
        .wrapper { max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 14px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
        .header { background: linear-gradient(135deg, #094067 0%, #0077b6 100%); color: #ffffff; padding: 36px 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px; }
        .header p { margin: 8px 0 0 0; font-size: 14px; opacity: 0.95; font-weight: 400; }
        .body-content { padding: 36px 32px; font-size: 15px; line-height: 26px; color: #334155; }
        .body-content p { margin: 0 0 18px 0; }
        .signoff { margin-top: 28px; font-size: 14px; color: #64748b; }
        .signoff strong { color: #0f172a; }
        .footer { background: #f8fafc; padding: 20px 32px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="header">
          <h1>Application Received</h1>
          <p>Thank you for your interest in Digital Latte</p>
        </div>
        <div class="body-content">
          <p>Hi <strong>${userName}</strong>,</p>
          <p>We have received your application for the role of <strong>${roleName}</strong>.</p>
          <p>Our team will review your profile and get in touch if your experience matches the current requirement.</p>
          <div class="signoff">
            Thank you,<br>
            <strong>Digital Latte</strong>
          </div>
        </div>
        <div class="footer">
          © ${new Date().getFullYear()} Digital Latte. All rights reserved.
        </div>
      </div>
    </body>
  </html>
  `;

  if (!transporter) {
    console.log(`[Auto-Reply Simulated] Career confirmation sent to: ${recipientEmail} for role: ${roleName}`);
    return { success: true, simulated: true };
  }

  const from = process.env.SMTP_FROM || `"Digital Latte" <${process.env.SMTP_USER}>`;

  return await transporter.sendMail({
    from,
    to: recipientEmail,
    subject: `We received your application — Digital Latte`,
    html: htmlContent,
  });
}
