function getCurrentWeek(): number {
    const currentDate = new Date();
    const firstDayOfYear = new Date(currentDate.getFullYear(), 0, 1);
    const pastDaysOfYear = (currentDate.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

function getHostname(url: string | URL): string {
    let hostname: string;
    if (typeof url === 'string') {
        hostname = new URL(url).hostname;
    } else {
        hostname = url.hostname;
    }
    return hostname;
}


export {getCurrentWeek, getHostname}