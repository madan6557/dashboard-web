export const dateFormat = (date, type = "yyyy-mm-dd") => {
    const pad = (n) => n.toString().padStart(2, "0");

    // Jika date bukan instance Date, coba parsing dulu
    if (!(date instanceof Date)) {
        const parsedDate = Date.parse(date);
        if (isNaN(parsedDate)) {
            throw new TypeError("Invalid date value");
        }
        date = new Date(parsedDate);
    }

    // Dapatkan zona waktu pengguna
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Konversi waktu ke zona waktu lokal pengguna
    const formatter = new Intl.DateTimeFormat("id-ID", {
        timeZone: userTimeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "short"
    });

    // Format hasil
    const formattedDate = formatter.formatToParts(new Date(date)).reduce((acc, part) => {
        if (part.type !== "literal") acc[part.type] = part.value;
        return acc;
    }, {});

    const year = formattedDate.year;
    const month = pad(formattedDate.month);
    const day = pad(formattedDate.day);
    const hours = pad(formattedDate.hour);
    const minutes = pad(formattedDate.minute);
    const seconds = pad(formattedDate.second);
    const timeZoneName = formattedDate.timeZoneName;

    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayName = dayNames[new Date(date).getDay()];

    switch (type) {
        case "dd-mm-yyyy":
            return `${day}-${month}-${year}`;
        case "yyyy-mm-dd":
            return `${year}-${month}-${day}`;
        case "dayname-dd-mm-yyyy":
            return `${dayName}-${day}-${month}-${year}`;
        case "dayname-dd-mm-yyyy hh-mm-ss":
            return `${dayName}-${day}-${month}-${year} ${hours}:${minutes}:${seconds} ${timeZoneName}`;
        case "dd-mm-yyyy hh-mm-ss":
            return `${day}-${month}-${year} ${hours}:${minutes}:${seconds} ${timeZoneName}`;
        case "yyyy-mm-dd hh-mm-ss":
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        case "hh:mm:ss":
            return `${hours}:${minutes}:${seconds} ${timeZoneName}`;
        case "mm-dd-yyyy":
            return `${month}-${day}-${year}`;
        case "dd/mm/yyyy":
            return `${day}/${month}/${year}`;
        default:
            return `${year}-${month}-${day}`;
    }
};
