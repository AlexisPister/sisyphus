function getCurrentWeek() {
  const currentDate = new Date();
  const firstDayOfYear = new Date(currentDate.getFullYear(), 0, 1);
  const pastDaysOfYear = (currentDate.getTime() - firstDayOfYear.getTime()) / 864e5;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}
function getHostname(url) {
  if (!url) {
    return void 0;
  }
  let hostname;
  if (typeof url === "string") {
    if (!url.trim()) {
      return void 0;
    }
    try {
      const parsedUrl = new URL(url.startsWith("http") ? url : `http://${url}`);
      hostname = parsedUrl.hostname;
    } catch (error) {
      return void 0;
    }
  } else if (url instanceof URL) {
    hostname = url.hostname;
  } else {
    return void 0;
  }
  return hostname;
}
export { getCurrentWeek, getHostname };
