import { GoogleGenerativeAI } from "@google/generative-ai";
import { createClient } from "@supabase/supabase-js";
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const supaBaseUrl = "https://jqbejulwxkwkrbaernrv.supabase.co"
const supaBaseAPI = import.meta.env.VITE_SUPABASE_API_KEY

/** Ensure the OpenAI API key is available and correctly configured */
if (!GEMINI_API_KEY) {
    throw new Error("Google generative AI API key is missing or invalid.");
}


/** OpenAI config */

// Access your API key as an environment variable (see our Getting Started tutorial)
export const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);


const privateKey = supaBaseAPI
if (!privateKey) throw new Error(`Expected env var SUPABASE_API_KEY`);
const url = supaBaseUrl
if (!url) throw new Error(`Expected env var SUPABASE_URL`);
export const supabase = createClient(url, privateKey);