import { fetchQRCode } from "../handlers/qrGeneratorHandler";

export const getQRCode = async (data) => {
    const response = await fetchQRCode(data);
    return response;
};
