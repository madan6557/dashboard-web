export const renameFile = (file, plantId) => {
    const now = new Date();
    const formattedDate = [
        now.getDate().toString().padStart(2, '0'),
        (now.getMonth() + 1).toString().padStart(2, '0'),
        now.getFullYear(),
        now.getHours().toString().padStart(2, '0'),
        now.getMinutes().toString().padStart(2, '0'),
        now.getSeconds().toString().padStart(2, '0')
    ].join('_');

    const newFileName = `${plantId}_${formattedDate}.jpg`;
    return new File([file], newFileName, { type: file.type });
};