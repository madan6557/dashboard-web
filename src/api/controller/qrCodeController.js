import { fetchQRCode, generateQRCode } from "../handlers/qrGeneratorHandler";

export const requestQRCode = async (data) => {
    const response = await generateQRCode(data);
    return response;
};

export const getQRCode = async (data) => {
    const response = await fetchQRCode(data);
    return response;
};