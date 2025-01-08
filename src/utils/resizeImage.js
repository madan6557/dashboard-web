export const resizeImage = (file) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const reader = new FileReader();

        reader.onload = (e) => {
            img.src = e.target.result;
        };

        img.onload = () => {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');

            const originalWidth = img.width;
            const originalHeight = img.height;
            const aspectRatio = 3 / 4;

            let newWidth, newHeight, offsetX, offsetY;

            if (originalWidth / originalHeight > aspectRatio) {
                // Width is greater, crop horizontally
                newHeight = originalHeight;
                newWidth = newHeight * aspectRatio;
                offsetX = (originalWidth - newWidth) / 2;
                offsetY = 0;
            } else {
                // Height is greater, crop vertically
                newWidth = originalWidth;
                newHeight = newWidth / aspectRatio;
                offsetX = 0;
                offsetY = (originalHeight - newHeight) / 2;
            }

            canvas.width = 600;
            canvas.height = 800;

            context.drawImage(
                img,
                offsetX,
                offsetY,
                newWidth,
                newHeight,
                0,
                0,
                600,
                800
            );

            canvas.toBlob((blob) => {
                resolve(blob);
            }, 'image/jpeg');
        };

        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};
