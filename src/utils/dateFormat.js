export const dateFormat = (date, type = 'yyyy-mm-dd', gmt = '+8') => {
    // Parse GMT offset and convert it to minutes
    const gmtOffset = parseInt(gmt) * 60;

    const pad = (n) => n.toString().padStart(2, '0');

    const utcDate = new Date(date);
    // Adjust the time by the GMT offset in minutes
    utcDate.setMinutes(utcDate.getMinutes() + gmtOffset);

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

// Example usage
console.log(dateFormat(new Date(), 'dayname-dd-mm-yyyy hh-mm-ss', '+8')); // Example: "Monday-01-01-2025 18:30:45" for GMT+8
console.log(dateFormat(new Date(), 'dd-mm-yyyy', '+8')); // Example: "01-01-2025" for GMT+8
