import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Send Email
export const sendEmail = async ({ to, subject, html, text }) => {
  try {
    const mailOptions = {
      from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
      to,
      subject,
      html,
      text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent: ${info.response}`);
    return { success: true, info };
  } catch (error) {
    console.error(`❌ Email Error: ${error.message}`);
    return { success: false, error: error.message };
  }
};

// Send Verification Email
export const sendVerificationEmail = async (email, token) => {
  const verificationUrl = `${process.env.CLIENT_URL}/verify-email/${token}`;
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; }
          .container { max-width: 500px; margin: 0 auto; padding: 20px; }
          .header { background-color: #ff6b35; color: white; padding: 20px; text-align: center; border-radius: 5px; }
          .content { padding: 20px; background-color: #f9f9f9; margin: 20px 0; border-radius: 5px; }
          .button { background-color: #ff6b35; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; }
          .footer { text-align: center; font-size: 12px; color: #666; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🍔 Welcome to FoodHub</h1>
          </div>
          <div class="content">
            <p>Hi ${email.split('@')[0]},</p>
            <p>Thank you for signing up! Please verify your email to get started.</p>
            <center>
              <a href="${verificationUrl}" class="button">Verify Email</a>
            </center>
            <p>Or copy this link: <a href="${verificationUrl}">${verificationUrl}</a></p>
            <p>This link expires in 24 hours.</p>
          </div>
          <div class="footer">
            <p>&copy; 2024 FoodHub. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: email,
    subject: '🔐 Verify your FoodHub Email',
    html
  });
};

// Send Password Reset Email
export const sendPasswordResetEmail = async (email, token) => {
  const resetUrl = `${process.env.CLIENT_URL}/reset-password/${token}`;
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; }
          .container { max-width: 500px; margin: 0 auto; padding: 20px; }
          .header { background-color: #ff6b35; color: white; padding: 20px; text-align: center; border-radius: 5px; }
          .content { padding: 20px; background-color: #f9f9f9; margin: 20px 0; border-radius: 5px; }
          .button { background-color: #ff6b35; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; }
          .warning { color: #d32f2f; font-weight: bold; }
          .footer { text-align: center; font-size: 12px; color: #666; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔐 Password Reset Request</h1>
          </div>
          <div class="content">
            <p>Hi ${email.split('@')[0]},</p>
            <p>We received a request to reset your password. Click the link below to create a new password:</p>
            <center>
              <a href="${resetUrl}" class="button">Reset Password</a>
            </center>
            <p>Or copy this link: <a href="${resetUrl}">${resetUrl}</a></p>
            <p class="warning">⚠️ This link expires in 1 hour.</p>
            <p>If you didn't request this reset, please ignore this email. Your account is secure.</p>
          </div>
          <div class="footer">
            <p>&copy; 2024 FoodHub. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: email,
    subject: '🔐 Reset Your FoodHub Password',
    html
  });
};

// Send Order Confirmation Email
export const sendOrderConfirmationEmail = async (email, order) => {
  const itemsHtml = order.items.map(item => `
    <tr>
      <td>${item.name}</td>
      <td>x${item.quantity}</td>
      <td>₹${item.price}</td>
      <td>₹${item.quantity * item.price}</td>
    </tr>
  `).join('');

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #ff6b35; color: white; padding: 20px; text-align: center; border-radius: 5px; }
          .content { padding: 20px; background-color: #f9f9f9; margin: 20px 0; border-radius: 5px; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          table th, table td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
          table th { background-color: #ff6b35; color: white; }
          .summary { margin: 20px 0; padding: 20px; background-color: white; border-radius: 5px; }
          .summary-item { display: flex; justify-content: space-between; margin: 10px 0; }
          .total { font-size: 18px; font-weight: bold; border-top: 2px solid #ff6b35; padding-top: 10px; margin-top: 10px; }
          .footer { text-align: center; font-size: 12px; color: #666; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Order Confirmed!</h1>
          </div>
          <div class="content">
            <p>Hi ${email.split('@')[0]},</p>
            <p>Your order has been placed successfully. Below are the details:</p>
            <p><strong>Order ID:</strong> #${order._id}</p>
            <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
            <h3>Order Items</h3>
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>
            <div class="summary">
              <div class="summary-item">
                <span>Subtotal:</span>
                <span>₹${order.subtotal}</span>
              </div>
              <div class="summary-item">
                <span>Delivery Charge:</span>
                <span>₹${order.deliveryCharge}</span>
              </div>
              ${order.discount ? `<div class="summary-item">
                <span>Discount:</span>
                <span>-₹${order.discount}</span>
              </div>` : ''}
              <div class="summary-item">
                <span>Tax:</span>
                <span>₹${order.tax}</span>
              </div>
              <div class="summary-item total">
                <span>Total Amount:</span>
                <span>₹${order.totalAmount}</span>
              </div>
            </div>
            <h3>Delivery Address</h3>
            <p>${order.deliveryAddress.address}</p>
            <p>Your order will arrive in approximately 30-45 minutes.</p>
          </div>
          <div class="footer">
            <p>&copy; 2024 FoodHub. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: email,
    subject: `📦 Order Confirmed - Order ID #${order._id}`,
    html
  });
};

// Send Order Status Update Email
export const sendOrderStatusEmail = async (email, order, newStatus) => {
  const statusMessages = {
    pending: '⏳ Your order is pending confirmation',
    accepted: '✅ Your order has been accepted by the restaurant',
    preparing: '👨‍🍳 Your order is being prepared',
    packed: '📦 Your order has been packed and is ready',
    out_for_delivery: '🚴 Your order is out for delivery',
    delivered: '🎉 Your order has been delivered',
    cancelled: '❌ Your order has been cancelled'
  };

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; }
          .container { max-width: 500px; margin: 0 auto; padding: 20px; }
          .header { background-color: #ff6b35; color: white; padding: 20px; text-align: center; border-radius: 5px; }
          .content { padding: 20px; background-color: #f9f9f9; margin: 20px 0; border-radius: 5px; }
          .status { font-size: 24px; font-weight: bold; margin: 20px 0; }
          .footer { text-align: center; font-size: 12px; color: #666; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📍 Order Status Update</h1>
          </div>
          <div class="content">
            <p>Hi ${email.split('@')[0]},</p>
            <div class="status">${statusMessages[newStatus] || 'Your order status has been updated'}</div>
            <p><strong>Order ID:</strong> #${order._id}</p>
            <p><strong>Current Status:</strong> ${newStatus.toUpperCase().replace('_', ' ')}</p>
            <p>You can track your order in real-time using your Order ID on FoodHub.</p>
          </div>
          <div class="footer">
            <p>&copy; 2024 FoodHub. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: email,
    subject: `📍 Order ${newStatus.toUpperCase().replace('_', ' ')} - Order ID #${order._id}`,
    html
  });
};
