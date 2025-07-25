import jsPDF from "jspdf";

export default async function generateBill(products, phone, email) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginTop = 60;
  const lineHeight = 25;

  // Function to add header and table headers
  function addHeader(yOffset) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.text("Selvaganapathy Fireworks", pageWidth / 2, yOffset, { align: "center" });
    doc.setFontSize(20);
    doc.text("Invoice", pageWidth / 2, yOffset + 30, { align: "center" });

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Phone: ${phone}`, 55, yOffset + 60);
    if (email) doc.text(`Email: ${email}`, 55, yOffset + 80);

    const tableTop = yOffset + 110;

    // Table header background
    doc.setFillColor(240, 240, 240);
    doc.rect(50, tableTop, 500, 25, "F");
    doc.setDrawColor(200, 200, 200);
    doc.rect(50, tableTop, 500, 25);

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

    return tableTop + 25; // Return starting y for rows
  }

  let y = addHeader(marginTop);
  let grandTotal = 0;
  let sno = 1;

  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    const productName = p.productName || p.name || "";
    const qty = p.selectedQuantity || p.quantity || p.qty || p.defaultQuantity || 1;
    const actualPrice = Number(p.actualPrice ?? 0);
    const discount = p.discount ?? Math.round(((actualPrice - (p.discountedPrice || actualPrice)) / actualPrice) * 100) ?? 0;
    const discountPrice = p.discountedPrice !== undefined
      ? Number(p.discountedPrice)
      : Number((actualPrice * (1 - discount / 100)).toFixed(2));
    const total = discountPrice * qty;
    grandTotal += total;

    // Check if next line will overflow page
    if (y + lineHeight > pageHeight - 100) {
      doc.addPage();
      y = addHeader(marginTop);
    }

    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);
    doc.text(String(sno++), 55, y + 17);
    doc.text(String(productName), 100, y + 17);
    doc.text(String(qty), 235, y + 17);
    doc.text(actualPrice.toFixed(2) + " INR", 275, y + 17);
    doc.text(String(discount) + " %", 345, y + 17);
    doc.text(discountPrice.toFixed(2), 425, y + 17);
    doc.text(total.toFixed(2) + " INR", 485, y + 17);

    // Row line
    doc.setDrawColor(220, 220, 220);
    doc.line(50, y + 25, 550, y + 25);

    y += lineHeight;
  }

  // Check space for grand total
  if (y + 40 > pageHeight - 60) {
    doc.addPage();
    y = addHeader(marginTop); // Optional: you can skip re-adding header here if not needed
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text(`Grand Total: ${grandTotal.toFixed(2)} INR`, 380, y + 40, {
    align: "left",
  });

  doc.save(`bill_${phone}_${Date.now()}.pdf`);

  const pdfBlob = doc.output("blob");
  return pdfBlob;
}
