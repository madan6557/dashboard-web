import { fetchCounter, fetchQRCode, generateQRCode } from "../handlers/qrGeneratorHandler";

export const getCounter = async (id_site) => {
    const response = await fetchCounter(id_site);
    return response;
};

export const requestQRCode = async (data) => {
    const response = await generateQRCode(data);
    return response;
};

export const getQRCode = async (data) => {
    const response = await fetchQRCode(data);
    return response;
};