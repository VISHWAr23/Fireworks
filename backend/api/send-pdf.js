import nodemailer from "nodemailer";
import formidable from "formidable-serverless";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed");
    return;
  }

  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(500).send("Form parse error");
      return;
    }
    if (!files.file) {
      res.status(400).send("No file uploaded");
      return;
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"Vishwa Fireworks" <${process.env.SENDER_EMAIL}>`,
      to: fields.email,
      subject: "Confirming your order!",
      text: "Please find the attached PDF.",
      attachments: [
        {
          filename: files.file.name,
          path: files.file.path,
        },
      ],
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).send("Email sent successfully");
    } catch (err) {
      console.error(err);
      res.status(500).send("Failed to send email");
    }
  });
}