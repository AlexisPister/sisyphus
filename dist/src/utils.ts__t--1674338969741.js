function getCurrentWeek() {
  const currentDate = new Date();
  const firstDayOfYear = new Date(currentDate.getFullYear(), 0, 1);
  const pastDaysOfYear = (currentDate.getTime() - firstDayOfYear.getTime()) / 864e5;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}
function getHostname(url) {
  let hostname;
  if (typeof url === "string") {
    hostname = new URL(url).hostname;
  } else {
    hostname = url.hostname;
  }
  return hostname;
}
export { getCurrentWeek, getHostname };
