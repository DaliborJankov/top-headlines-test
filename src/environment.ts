export const ROOT_URL = "https://newsapi.org";
export const API_KEY = `&apiKey=${process.env.API_KEY}`;

export type Language = "gb" | "us";
export const allowedLanguages: Language[] = ["gb", "us"];
