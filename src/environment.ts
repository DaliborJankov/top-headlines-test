export const ROOT_URL = "https://newsapi.org";
export const API_KEY = `&apiKey=${process.env.REACT_APP_MY_API_KEY}`;

export type Language = "gb" | "us";
export const allowedLanguages: Language[] = ["gb", "us"];
