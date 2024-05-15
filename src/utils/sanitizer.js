

export const sanitize = (data) => {
    const { password, ...sanitizedData } = data;

    return sanitizedData;
}