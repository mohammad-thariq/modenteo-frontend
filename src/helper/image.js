const encodeImageUrl = (url) => {
    return encodeURIComponent(url);
};

export const getNextJsOptimizedUrl = (url, width, quality) => {
    const encodedUrl = encodeImageUrl(url);
    return `https://dev-modenteo-admin.vercel.app/_next/image?url=${encodedUrl}&w=${width}&q=${quality}`;
};
