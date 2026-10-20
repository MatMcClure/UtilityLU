const BASE_URL = (process.env.REACT_APP_MEDIA_BASE_URL ?? "").replace(/\/$/, "");

export const mediaUrl = (path: string) => `${BASE_URL}/${path}`;