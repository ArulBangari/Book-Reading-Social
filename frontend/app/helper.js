export function formatTime(date) {
  const hours = date.getHours();
  const hour12 = hours % 12 || 12;
  const ampm = hours >= 12 ? "PM" : "AM";
  const minutes = date.getMinutes();
  const paddedMinutes = minutes.toString().padStart(2, "0");
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();

  const formattedDate = `${month}/${day}/${year}`;
  const formattedTime = `${hour12}:${paddedMinutes} ${ampm}`;
  const formatted = `Created on ${formattedDate} at ${formattedTime}`;
  return formatted;
}
