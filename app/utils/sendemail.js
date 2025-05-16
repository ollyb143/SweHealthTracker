import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', 
  port: 587, 
  secure: false, 
  auth: {
    user: 'trackerhealth8@gmail.com', 
    pass: 'will send it to you', 
  },
});

export const sendEmail = async ({ to, subject, text, html }) => {
    console.log('[sendEmail] Preparing to send email to:', to);
    try {
        const info = await transporter.sendMail({
        from: '"Health Tracker" <trackerhealth8@gmail.com>', 
        to,
        subject,
        text,
        html, 
        });
        console.log('Email sent:', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Email sending failed');
    }
};
