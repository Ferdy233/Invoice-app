function formatDate(dateString: string): string {
  try {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Parse the date string
    const parts = dateString.split("-");
    if (parts.length !== 3) {
      throw new Error("Invalid date format. Expected format: YYYY-MM-DD");
    }

    const [year, month, day] = parts;

    // Validate year
    if (isNaN(Number(year)) || year.length !== 4) {
      throw new Error("Invalid year. Expected four-digit number.");
    }

    // Validate month
    const monthNum = parseInt(month, 10);
    if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
      throw new Error("Invalid month. Expected a number between 1 and 12.");
    }

    // Validate day
    const dayNum = parseInt(day, 10);
    if (isNaN(dayNum) || dayNum < 1 || dayNum > 31) {
      throw new Error("Invalid day. Expected a number between 1 and 31.");
    }

    // Format the date
    return `${day.padStart(2, "0")} ${months[monthNum - 1]} ${year}`;
  } catch (error) {
    console.error((error as Error).message);
    return ""; // Return an empty string if an error occurs
  }
}
export default formatDate;
