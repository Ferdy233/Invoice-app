function calculatePaymentDue(createdAt: string, paymentTerms: number) {
  const createdDate = new Date(createdAt);

  createdDate.setDate(createdDate.getDate() + paymentTerms);

  const year = createdDate.getFullYear();
  const month = String(createdDate.getMonth() + 1).padStart(2, "0");
  const day = String(createdDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default calculatePaymentDue;
