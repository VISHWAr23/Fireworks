// server.mjs
import express from 'express';
import multer from 'multer';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file
const app = express();
const upload = multer();
const PORT = 3000;

app.use(cors({origin: "http://localhost:5173"}));

app.get('/api', (req, res) => {
  res.send('Welcome to the PDF Email Service');
});

// POST endpoint to receive PDF and email it
app.post('/api/send-pdf', upload.single('file'), async (req, res) => {
  console.log('Receiver email:', req.body.email);
  
  try {
    
    if (!req.file) {
      return res.status(400).send('No file uploaded');
    }

    // Set up transporter with Gmail (or your SMTP)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SENDER_EMAIL, 
        pass: process.env.MAIL_PASSWORD,    
      },
    });

    const mailOptions = {
      from: '"Vishwa Fireworks" harirajesh134@gmail.com',
      to: req.body.email, // Replace with target email
      subject: 'Confirming your order !',
      text: 'This is the confirmation of your order. Please find the attached PDF for details.',
      attachments: [
        {
          filename: req.file.originalname,
          content: req.file.buffer,
        },
      ],
    };
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).send('Failed to send email');
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
