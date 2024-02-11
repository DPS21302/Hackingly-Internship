export function formatDate(dateString, { option = "long" } = {}) {
  const date = new Date(dateString);

  switch (option) {
    case "YYYYMMDD":
      // Format: YYYY-MM-DD
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    case "short":
      // Format: Month day, year (e.g., January 1, 2023)
      const Options = { year: "numeric", month: "short", day: "numeric" };
      return date.toLocaleDateString("en-US", Options);
    case "long":
    default:
      // Format: Month day, year (e.g., January 1, 2023)
      const options = { year: "numeric", month: "long", day: "numeric" };

      return date.toLocaleDateString("en-US", options);
  }
}

export const formatTime = (dateString) => {
  const time = new Date(dateString);
  const options = { hour: "numeric", minute: "numeric" };
  return time.toLocaleTimeString("en-IN",options);
};

