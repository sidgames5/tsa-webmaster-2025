'use server';

import * as smtplib from 'nodemailer'; 
import { createTransport } from 'nodemailer';

const smtpConfig = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_EMAIL || "sid2.srinivasan@gmail.com",
    pass: process.env.SMTP_PASSWORD || "jfew mhdc orwi cgds"
  }
};

interface OrderDetails {
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  items: Array<{
    name: string;
    price: string;
    count: number;
    description?: string;
  }>;
  total: string;
  orderNumber: string;
  estimatedDelivery: string;
}

export async function sendOrderConfirmation(order: OrderDetails) {
  const { customer, items, total, orderNumber, estimatedDelivery } = order;
  
  // Create HTML email content
  const htmlContent = `
    <html>
    <body style="font-family: Arial, sans-serif; line-height: 1.6;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
        <h1 style="color: #2e7d32; text-align: center;">Sprout & Spoon Order Confirmation</h1>
        <p>Thank you for your order, ${customer.name}!</p>
        
        <h2 style="color: #2e7d32; border-bottom: 1px solid #eee; padding-bottom: 5px;">Order #${orderNumber}</h2>
        <p><strong>Estimated Delivery:</strong> ${estimatedDelivery}</p>
        
        <h3 style="color: #2e7d32;">Order Summary</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background-color: #f5f5f5;">
              <th style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Item</th>
              <th style="padding: 8px; text-align: right; border-bottom: 1px solid #ddd;">Price</th>
              <th style="padding: 8px; text-align: right; border-bottom: 1px solid #ddd;">Qty</th>
              <th style="padding: 8px; text-align: right; border-bottom: 1px solid #ddd;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${items.map(item => `
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">
                  ${item.name}
                  ${item.description ? `<br><small style="color: #666;">${item.description}</small>` : ''}
                </td>
                <td style="padding: 8px; text-align: right; border-bottom: 1px solid #ddd;">${item.price}</td>
                <td style="padding: 8px; text-align: right; border-bottom: 1px solid #ddd;">${item.count}</td>
                <td style="padding: 8px; text-align: right; border-bottom: 1px solid #ddd;">$${(parseFloat(item.price.replace('$', '')) * item.count).toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" style="padding: 8px; text-align: right; font-weight: bold;">Total:</td>
              <td style="padding: 8px; text-align: right; font-weight: bold;">$${total}</td>
            </tr>
          </tfoot>
        </table>
        
        <h3 style="color: #2e7d32;">Shipping Information</h3>
        <p>${customer.name}<br>
        ${customer.address}<br>
        ${customer.phone}<br>
        ${customer.email}</p>
        
        <p style="text-align: center; margin-top: 20px; color: #666;">
          Thank you for shopping with us!<br>
          <a href="https://Sprout&Spoon.com" style="color: #2e7d32;">Sprout & Spoon</a>
        </p>
      </div>
    </body>
    </html>
  `;

  try {
    const transporter = createTransport(smtpConfig);
    
    const info = await transporter.sendMail({
      from: `"LeafLogic" <${smtpConfig.auth.user}>`,
      to: customer.email,
      subject: 'LeafLogic - Order Confirmation',
      html: htmlContent
    });

    console.log('Message sent: %s', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}