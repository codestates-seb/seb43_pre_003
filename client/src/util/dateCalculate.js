const dateCalculate = (date) => {
  const now = new Date();
  const createdAt = new Date(date);
  const hoursDiff = Math.abs(now.getHours() - createdAt.getHours());
  const daysDiff = Math.abs(now.getDate() - createdAt.getDate());
  const yearsDiff = Math.abs(now.getFullYear() - createdAt.getFullYear());

  if (yearsDiff > 1) {
    return `${yearsDiff} ${yearsDiff === 1 ? "year" : "years"} ago`;
  } else if (daysDiff > 1) {
    return `${daysDiff} ${daysDiff === 1 ? "day" : "days"} ago`;
  } else {
    return `${hoursDiff} ${hoursDiff === 1 ? "hour" : "hours"} ago`;
  }
};
export default dateCalculate;
