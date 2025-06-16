export function getLast7DaysLabels() {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const result = [];
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    const dayName = days[d.getDay()];
    result.push(dayName);
  }
  return result;
}

export function formatDateToYMD(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // bulan mulai dari 0
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`;
}

