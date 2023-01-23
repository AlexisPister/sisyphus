function getCurrentWeek(): number {
    const currentDate = new Date();
    const firstDayOfYear = new Date(currentDate.getFullYear(), 0, 1);
    const pastDaysOfYear = (currentDate.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

function getHostname(url: string | URL): string | undefined {
  if (!url) {
    return undefined;
  }

  let hostname: string;
  if (typeof url === 'string') {
    if (!url.trim()) {
      return undefined;
    }

    try {
      const parsedUrl = new URL(url.startsWith('http') ? url : `http://${url}`);
      hostname = parsedUrl.hostname;
    } catch (error) {
      return undefined;
    }
  } else if (url instanceof URL) {
    hostname = url.hostname;
  } else {
    return undefined;
  }
  return hostname;
}


export {getCurrentWeek, getHostname}