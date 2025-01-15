import { resizeImage } from "./resizeImage";

export async function base64ToBlobUrl(base64, mimeType = "image/jpeg") {
    try {
        // Decode base64 string to raw binary data
        const byteString = atob(base64);

        // Create an ArrayBuffer and a view (Uint8Array) for it
        const buffer = new ArrayBuffer(byteString.length);
        const uint8Array = new Uint8Array(buffer);

        // Copy each character code from the base64 decoded string to the Uint8Array
        for (let i = 0; i < byteString.length; i++) {
            uint8Array[i] = byteString.charCodeAt(i);
        }

        // Create a Blob from the Uint8Array
        const originalBlob = new Blob([uint8Array], { type: mimeType });

        // Convert Blob to a File for input to resizeImage
        const file = new File([originalBlob], "temp.jpg", { type: mimeType });

        // Resize the image using resizeImage function and wait for the result
        const resizedBlob = await resizeImage(file);

        // Create a URL from the resized Blob
        return URL.createObjectURL(resizedBlob);
    } catch (error) {
        console.error("An error occurred while converting base64 to Blob URL:", error);
        throw error; // Rethrow the error after logging it
    }
}
