// utils/sendEmail.js
import emailjs from "emailjs-com";

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
          "service_pmlvljq",     // from EmailJS dashboard
          "template_wapa9wl",    // email template ID
          templateParams,
          "486EpPszhhMyXQMjr"         // public key (EmailJS user ID)
        );
        resolve(result);
      } catch (error) {
        reject(error);
      }
    };

    reader.readAsDataURL(pdfBlob);
  });
};
