import type { SharedAnalysisData } from '../types';

/**
 * Encodes the analysis result data into a URL-safe Base64 string.
 * @param data The data to encode.
 * @returns A URL-safe Base64 string.
 */
export const encodeResultForUrl = (data: SharedAnalysisData): string => {
  try {
    const jsonString = JSON.stringify(data);
    // Use btoa for Base64 encoding
    const base64String = btoa(jsonString);
    // Make it URL-safe
    return encodeURIComponent(base64String);
  } catch (error) {
    console.error("Failed to encode data for URL:", error);
    return "";
  }
};

/**
 * Decodes a URL-safe Base64 string back into analysis result data.
 * @param encodedData The encoded string from the URL.
 * @returns The decoded analysis data.
 */
export const decodeResultFromUrl = (encodedData: string): SharedAnalysisData => {
  try {
    const base64String = decodeURIComponent(encodedData);
    // Use atob to decode Base64
    const jsonString = atob(base64String);
    return JSON.parse(jsonString) as SharedAnalysisData;
  } catch (error) {
    console.error("Failed to decode data from URL:", error);
    throw new Error("Invalid or corrupted share data.");
  }
};
