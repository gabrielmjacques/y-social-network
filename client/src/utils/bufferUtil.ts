export const bufferToImageUrl = (buffer: Buffer) => {
    const img = `data:image/png;base64,${Buffer.from(buffer).toString("base64")}`;

    return img;
};