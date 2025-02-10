export const dateFormat = (date, type = "yyyy-mm-dd") => {
    const pad = (n) => n.toString().padStart(2, "0");

    // Jika date bukan instance Date, coba parsing dulu
    if (!(date instanceof Date)) {
        if (typeof date === "string") {
            const parts = date.split(/[-T:.\sZ]/).map(Number);
            if (parts.length >= 3) {
                date = new Date(Date.UTC(
                    parts[0], // Year
                    parts[1] - 1, // Month (0-based)
                    parts[2], // Day
                    parts[3] || 0, // Hours
                    parts[4] || 0, // Minutes
                    parts[5] || 0 // Seconds
                ));
            } else {
                throw new TypeError("Invalid date format");
            }
        } else {
            throw new TypeError("Invalid date value");
        }
    }

    // Ambil nilai waktu langsung dari objek Date dalam UTC
    const year = date.getUTCFullYear();
    const month = pad(date.getUTCMonth() + 1);
    const day = pad(date.getUTCDate());
    const hours = pad(date.getUTCHours());
    const minutes = pad(date.getUTCMinutes());
    const seconds = pad(date.getUTCSeconds());

    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayName = dayNames[date.getUTCDay()];

    switch (type) {
        case "dd-mm-yyyy":
            return `${day}-${month}-${year}`;
        case "yyyy-mm-dd":
            return `${year}-${month}-${day}`;
        case "dayname-dd-mm-yyyy":
            return `${dayName}-${day}-${month}-${year}`;
        case "dayname-dd-mm-yyyy hh-mm-ss":
            return `${dayName}-${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
        case "dd-mm-yyyy hh-mm-ss":
            return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
        case "yyyy-mm-dd hh-mm-ss":
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        case "hh:mm:ss":
            return `${hours}:${minutes}:${seconds}`;
        case "mm-dd-yyyy":
            return `${month}-${day}-${year}`;
        case "dd/mm/yyyy":
            return `${day}/${month}/${year}`;
        default:
            return `${year}-${month}-${day}`;
    }
};
