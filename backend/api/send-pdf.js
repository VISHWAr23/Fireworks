// backend/api/send-pdf.js
import express from "express";
import serverless from "serverless-http";
import multer from "multer";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const upload = multer();

app.use(cors({ origin: "*", methods: ["POST", "GET", "OPTIONS"] }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json("Vanakkam Da Mapla!");
});

app.post("/send-pdf", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).send("No file uploaded");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"Vishwa Fireworks" <${process.env.SENDER_EMAIL}>`,
      to: req.body.email,
      subject: "Confirming your order!",
      text: "Please find the attached PDF.",
      attachments: [
        {
          filename: req.file.originalname,
          content: req.file.buffer,
        },
      ],
    };

    await transporter.sendMail(mailOptions);
    res.status(200).send("Email sent successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to send email");
  }
});

export default serverless(app);
