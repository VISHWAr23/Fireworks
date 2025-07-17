import jsPDF from "jspdf";

export default async function generateBill(products, phone, email) {
  // 1. Generate PDF as Blob
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();

  // Fonts and colors
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.text("Vishwa Fireworks", pageWidth / 2, 60, { align: "center" });
  doc.setFontSize(20);
  doc.text("Invoice", pageWidth / 2, 90, { align: "center" });

  // Customer info
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`Phone: ${phone}`, 55, 120);
  if (email) doc.text(`Email: ${email}`, 55, 140);

  // Table header background
  const tableTop = 170;
  doc.setFillColor(240, 240, 240);
  doc.rect(50, tableTop, 500, 25, "F");
  doc.setDrawColor(200, 200, 200);
  doc.rect(50, tableTop, 500, 25);

  // Table headers
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  doc.text("S.No", 55, tableTop + 17);
  doc.text("Product", 100, tableTop + 17);
  doc.text("Qty", 235, tableTop + 17);
  doc.text("MRP", 275, tableTop + 17);
  doc.text("Discount", 345, tableTop + 17);
  doc.text("Price", 425, tableTop + 17);
  doc.text("Total", 485, tableTop + 17);

  // Table rows
  let y = tableTop + 25;
  let grandTotal = 0;
  let sno = 1;
  products.forEach((p) => {
    const productName = p.productName || p.name || "";
    const qty = p.defaultQuantity ?? p.quantity ?? 0;
    const actualPrice = Number(p.actualPrice ?? 0);
    const discount = p.discount ?? 0;
    const discountPrice = Number(p.discountPrice ?? p.actualPrice ?? 0);
    const total = discountPrice * qty;
    grandTotal += total;

    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);
    doc.text(String(sno++), 55, y + 17);
    doc.text(String(productName), 100, y + 17);
    doc.text(String(qty), 235, y + 17);
    doc.text(actualPrice.toFixed(2) + " INR", 275, y + 17);
    doc.text(String(discount) + " INR", 345, y + 17);
    doc.text(discountPrice.toFixed(2), 425, y + 17);
    doc.text(total.toFixed(2) + " INR", 485, y + 17);

    // Row line
    doc.setDrawColor(220, 220, 220);
    doc.line(50, y + 25, 550, y + 25);

    y += 25;
  });

  // Grand total
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text(`Grand Total: ${grandTotal.toFixed(2)}  INR`, 380, y + 40, {
    align: "left",
  });

  doc.save("bill.pdf");

  // Prepare PDF blob for backend
  const pdfBlob = doc.output("blob");

  // Prepare FormData for backend
  const formData = new FormData();
  formData.append("bill", pdfBlob, "bill.pdf");
  formData.append("phone", phone);
  if (email) formData.append("email", email);

  // Send to backend for mailing
  const response = await fetch("https://firework-backend-d8br.onrender.com/api/mail/send-pdf", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to send bill to backend");
  }

  return await response.json();
}