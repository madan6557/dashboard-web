export const dateFormat = (date, type = 'yyyy-mm-dd', gmt = '+8') => {
    const pad = (n) => n.toString().padStart(2, '0');

    // Create a date object from the input
    const localDate = new Date(date);

    // Calculate GMT offset in minutes
    const gmtOffsetMinutes = parseInt(gmt) * 60;

    // Adjust the date object to the desired GMT
    const utcDate = new Date(localDate.getTime() + (localDate.getTimezoneOffset() * 60000)); // Convert to UTC
    utcDate.setMinutes(utcDate.getMinutes() + gmtOffsetMinutes); // Adjust by the GMT offset

    const year = utcDate.getUTCFullYear();
    const month = pad(utcDate.getUTCMonth() + 1); // Months are zero-based
    const day = pad(utcDate.getUTCDate());
    const hours = pad(utcDate.getUTCHours());
    const minutes = pad(utcDate.getUTCMinutes());
    const seconds = pad(utcDate.getUTCSeconds());

    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = dayNames[utcDate.getUTCDay()];

    switch (type) {
        case 'dd-mm-yyyy':
            return `${day}-${month}-${year}`;
        case 'yyyy-mm-dd':
            return `${year}-${month}-${day}`;
        case 'dayname-dd-mm-yyyy':
            return `${dayName}-${day}-${month}-${year}`;
        case 'dayname-dd-mm-yyyy hh-mm-ss':
            return `${dayName}-${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
        case 'dd-mm-yyyy hh-mm-ss':
            return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
        case 'yyyy-mm-dd hh-mm-ss':
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        case 'hh:mm:ss':
            return `${hours}:${minutes}:${seconds}`;
        case 'mm-dd-yyyy':
            return `${month}-${day}-${year}`;
        case 'dd/mm/yyyy':
            return `${day}/${month}/${year}`;
        default:
            return `${year}-${month}-${day}`; // Default to 'yyyy-mm-dd'
    }
};
