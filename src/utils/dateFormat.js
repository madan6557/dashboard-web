export const dateFormat = (date, type = 'yyyy-mm-dd') => {
    const pad = (n) => n.toString().padStart(2, '0');

    // Pastikan date adalah instance dari Date
    if (!(date instanceof Date)) {
        date = new Date(date);
    }

    // Periksa validitas date setelah konversi
    if (isNaN(date)) {
        throw new TypeError('Invalid date value');
    }

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1); // Months are zero-based
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = dayNames[date.getDay()];

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
