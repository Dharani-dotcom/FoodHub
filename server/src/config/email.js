import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendEmail = async ({ to, subject, html }) => {
  try {
    const mailOptions = {
      from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
      to,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${to}`);
    return true;
  } catch (error) {
    console.error(`❌ Email Error: ${error.message}`);
    return false;
  }
};

export const sendVerificationEmail = async (email, token, baseUrl) => {
  const verificationLink = `${baseUrl}/verify-email/${token}`;
  const html = `
    <h2>Welcome to FoodHub!</h2>
    <p>Please verify your email by clicking the link below:</p>
    <a href="${verificationLink}" style="background-color: #ff6b35; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
      Verify Email
    </a>
    <p>Or copy this link: ${verificationLink}</p>
    <p>This link expires in 24 hours.</p>
  `;

  return sendEmail({ to: email, subject: 'Verify your FoodHub email', html });
};

export const sendPasswordResetEmail = async (email, token, baseUrl) => {
  const resetLink = `${baseUrl}/reset-password/${token}`;
  const html = `
    <h2>Reset Your Password</h2>
    <p>Click the link below to reset your password:</p>
    <a href="${resetLink}" style="background-color: #ff6b35; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
      Reset Password
    </a>
    <p>Or copy this link: ${resetLink}</p>
    <p>This link expires in 1 hour.</p>
    <p>If you didn't request this, ignore this email.</p>
  `;

  return sendEmail({ to: email, subject: 'Reset Your FoodHub Password', html });
};

export const sendOrderConfirmationEmail = async (email, order) => {
  const html = `
    <h2>Order Confirmation</h2>
    <p>Thank you for your order!</p>
    <p><strong>Order ID:</strong> ${order._id}</p>
    <p><strong>Total Amount:</strong> ₹${order.totalAmount}</p>
    <p><strong>Delivery Address:</strong> ${order.deliveryAddress.address}</p>
    <p>Your order will be delivered soon. Track your order using Order ID.</p>
    <p>Thank you for choosing FoodHub!</p>
  `;

  return sendEmail({ to: email, subject: 'Order Confirmation - FoodHub', html });
};

export const sendOrderStatusEmail = async (email, order, status) => {
  const statusMessages = {
    accepted: 'Your order has been accepted by the restaurant.',
    preparing: 'Your order is being prepared.',
    packed: 'Your order has been packed and ready for delivery.',
    out_for_delivery: 'Your order is out for delivery.',
    delivered: 'Your order has been delivered. Thank you!',
    cancelled: 'Your order has been cancelled.'
  };

  const html = `
    <h2>Order Status Update</h2>
    <p>${statusMessages[status] || 'Your order status has been updated.'}</p>
    <p><strong>Order ID:</strong> ${order._id}</p>
    <p><strong>Current Status:</strong> ${status.toUpperCase()}</p>
    <p>Thank you for your order!</p>
  `;

  return sendEmail({ to: email, subject: `Order ${status.toUpperCase()} - FoodHub`, html });
};
