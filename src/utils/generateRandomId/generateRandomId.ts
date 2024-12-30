function generateRandomId() {
  // Generate two random uppercase letters
  const letters = String.fromCharCode(
    65 + Math.floor(Math.random() * 26), // First letter
    65 + Math.floor(Math.random() * 26), // Second letter
  );

  // Generate a random 4-digit number, padded with zeros if needed
  const numbers = String(Math.floor(Math.random() * 10000)).padStart(4, "0");

  // Combine letters and numbers
  return letters + numbers;
}

export default generateRandomId;
