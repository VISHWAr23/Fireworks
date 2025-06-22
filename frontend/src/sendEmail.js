// utils/sendEmail.js
import emailjs from "emailjs-com";
import dotenv from "dotenv";
dotenv.config();
export const sendEmailWithPDF = async (pdfBlob, userEmail, userMessage) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async () => {
      const base64PDF = reader.result.split(",")[1]; 

      const templateParams = {
        to_name: userEmail,
        message: userMessage,
        attachment: base64PDF, // Send base64 string
      };

      try {
        const result = await emailjs.send(
          process.env.SERVICE_ID,     // from EmailJS dashboard
          process.env.TEMPLATE_ID,    // email template ID
          templateParams,
          process.env.PUBLIC_KEY         // public key (EmailJS user ID)
        );
        resolve(result);
      } catch (error) {
        reject(error);
      }
    };

    reader.readAsDataURL(pdfBlob);
  });
};
