import { sendEmailWithPDF } from "./sendEmail";

/**
 * Sends a PDF invoice to the specified email with a fixed message.
 * @param {Blob} bill - The PDF blob.
 * @param {string} email - The recipient's email address.
 */
export async function sendInvoice(obj) {
    let bill = obj.bill;
    let email = obj.email;
    
  try {
    console.log("Sending invoice...");
    console.log(bill, email);
    await sendEmailWithPDF(bill, email, "Vanakkam Da Mapla!");
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Failed to send email:", error);
  }
}
