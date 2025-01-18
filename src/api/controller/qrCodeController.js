import { fetchQRCode } from "../handlers/qrGeneratorHandler";

export const getQRCode = async (value) => {
    const response = await fetchQRCode(value);
    const fileURL = URL.createObjectURL(response);
    return fileURL;
};
