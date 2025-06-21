// api/send-pdf.js
import express from 'express';
import multer from 'multer';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import serverless from 'serverless-http';

dotenv.config();

const app = express();
const upload = multer();
const router = express.Router();

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["POST", "GET", "OPTIONS"]
}));
app.use(bodyParser.json());

// Routes
app.get("/",async(req,res)=>{
     res.json("Vankkam Da Mapla! Server is running!");
})

router.post("/send-pdf", upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded');
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: '"Vishwa Fireworks" <harirajesh134@gmail.com>',
      to: req.body.email,
      subject: 'Confirming your order!',
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

app.use("/api", router);
const PORT = process.env.PORT || 5000;

// Export as serverless function
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
