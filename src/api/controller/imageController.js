import { fetchImage } from "../handlers/ImageHandler";

export const getPlantImage = async (filename) => {
    try {
        const fileBlob = await fetchImage(filename);
        if (fileBlob) {
            const fileURL = URL.createObjectURL(fileBlob);
            console.log(fileURL);
            return fileURL;
        }
        return null;
    } catch (error) {
        console.error("Error fetching image:", error);
        return null;
    }
};
