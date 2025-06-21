import jsPDF from "jspdf";

export default function generateBill(products, phone, email) {
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
      const total = p.discountPrice * p.defaultQuantity;
      grandTotal += total;

      doc.setFont("helvetica", "normal");
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(11);
      doc.text(String(sno++), 55, y + 17);
      doc.text(p.productName, 100, y + 17);
      doc.text(String(p.defaultQuantity), 235, y + 17);
      doc.text(p.actualPrice.toFixed(2) + ' INR', 275, y + 17);
      doc.text(p.discount + ' INR', 345, y + 17);
      doc.text(p.discountPrice.toFixed(2), 425, y + 17);
      doc.text(total.toFixed(2) + ' INR', 485, y + 17);

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
    return doc.output("blob");

  }
