import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

/**
 * Generates a professional invoice-style bill (MNC-like) using jsPDF + autotable.
 * - Neat table layout with borders, proper wrapping, and no overlaps.
 * - Company info, customer contact, and a clean total section.
 */
export default async function generateBill(products, phone, email) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });

  // COMPANY HEADER
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("Selvaganapathy Fireworks", 55, 50);
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("Main Road, Kananjampatti,", 55, 75); // Replace with your address
  doc.text("Sivakasi-Vembakkottai Road, Tamil Nadu", 55, 90);
  doc.text("Phone: +91 9944087728", 55, 105); // Placeholder for GSTIN/tax info

  // INVOICE INFO (on right) - Moved left and with better spacing
  doc.setFont("helvetica", "bold");
  doc.text("INVOICE", 400, 50); // Moved from 470 to 400
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  const today = new Date();
  doc.text(`Date: ${today.toLocaleDateString()}`, 400, 75); // Moved from 470 to 400
  doc.text(`Phone: ${phone}`, 400, 95); // Moved from 470 to 400

  // Email with better positioning and wrapping
  let currentY = 115;
  if (email) {
    // Check if email is too long, if so, wrap it
    const emailText = `Email: ${email}`;
    const textWidth = doc.getTextWidth(emailText);
    const maxWidth = 150; // Maximum width for email text

    if (textWidth > maxWidth) {
      // Split email if too long
      const emailParts = email.split("@");
      doc.text(`Email: ${emailParts[0]}@`, 400, currentY);
      doc.text(`${emailParts[1]}`, 400, currentY + 15);
      currentY += 30;
    } else {
      doc.text(emailText, 400, currentY);
      currentY += 20;
    }
  }

  // Table Content Preparation
  const tableBody = products.map((p, idx) => {
    const productName = p.productName || p.name || "";
    const qty =
      p.selectedQuantity || p.quantity || p.qty || p.defaultQuantity || 1;
    const actualPrice = Number(p.actualPrice ?? 0);
    const discount =
      p.discount ??
      Math.round(
        ((actualPrice - (p.discountedPrice || actualPrice)) / actualPrice) * 100
      ) ??
      0;
    const discountPrice =
      p.discountedPrice !== undefined
        ? Number(p.discountedPrice)
        : Number((actualPrice * (1 - discount / 100)).toFixed(2));
    const total = discountPrice * qty;
    return [
      idx + 1,
      productName,
      qty,
      `${actualPrice.toFixed(2)} INR`,
      `${discount} %`,
      `${discountPrice.toFixed(2)} INR`,
      `${total.toFixed(2)} INR`,
    ];
  });

  // Grand Total
  const grandTotal = tableBody.reduce(
    (acc, row) => acc + Number(row[6].replace(" INR", "")),
    0
  );

  // AUTOTABLE
  autoTable(doc, {
    startY: 140,
    head: [["S.No", "Product", "Qty", "MRP", "Discount", "Price", "Total"]],
    body: tableBody,
    styles: {
      font: "helvetica",
      fontSize: 11,
      valign: "top",
      halign: "center",
      cellPadding: { top: 3, right: 2, bottom: 3, left: 2 },
      cellWidth: "wrap", // auto adjust
      overflow: "linebreak",
      textColor: 33,
      lineColor: [200, 200, 200],
    },
    headStyles: {
      fillColor: [230, 230, 230],
      textColor: 0,
      fontStyle: "bold",
    },
    columnStyles: {
      0: { cellWidth: 45 }, // S.No
      1: { cellWidth: 160, halign: "left" }, // Product, width enough and left-aligned
      2: { cellWidth: 40 }, // Qty
      3: { cellWidth: 65 }, // MRP
      4: { cellWidth: 60 }, // Discount
      5: { cellWidth: 65 }, // Price
      6: { cellWidth: 80 }, // Total
    },
    didDrawCell: (data) => {
      // No-op; can add custom cell formatting if needed
    },
    margin: { left: 40, right: 40 },
    theme: "grid",
  });

  // GRAND TOTAL
  const finalY = doc.lastAutoTable.finalY || 140 + tableBody.length * 20;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text(`Grand Total: ${grandTotal.toFixed(2)} INR`, 400, finalY + 30);

  // FOOTER/THANK YOU NOTE
  doc.setFontSize(10);
  doc.setFont("helvetica", "italic");
  doc.text("Thank you for your business!", 55, finalY + 60);
  doc.text(
    "If you have questions about this invoice, contact us at selvaganapathytraders.official@gmail.com",
    55,
    finalY + 80
  );

  // Save & Return PDF Blob
  doc.save(`bill_${phone}_${Date.now()}.pdf`);
  return doc.output("blob");
}
