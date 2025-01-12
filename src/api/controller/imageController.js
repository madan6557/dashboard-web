import { addImage, fetchImage } from "../handlers/ImageHandler";
import handleError from "../helper/errorHandler";

export const getPlantImage = async (filename) => {
    try {
        const fileBlob = await fetchImage(filename);
        if (fileBlob) {
            const fileURL = URL.createObjectURL(fileBlob);
            return fileURL;
        }
        return null;
    } catch (error) {
        handleError(error);
        return null;
    }
};

export const uploadImage = async (file) => {
    try {
        const formData = new FormData();
        formData.append('images', file); // Menambahkan file ke FormData

        formData.forEach((value, key) => {
            console.log(`${key}:`, value);
        });

        const response = await addImage(formData);

        return response;
    } catch (error) {
        handleError(error);
    }
};