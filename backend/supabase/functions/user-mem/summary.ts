/* This is the main summary function.
Recieves a string or a json file of 30 messages. Asks gemeni to summarize these into
bullet points and stores each bullet point in an array.
*/

import { GoogleGenAI } from "google-gen";

const apiKey = Deno.env.get("GEMINI_API");
if (!apiKey) {
  throw new Error("GEMINI_API is not set");
}

const genAI = new GoogleGenAI({
  apiKey: apiKey
});

export async function summarizeMessages(messages: string) {

    const response = await genAI.models.generateContent({
        model: "gemini-2.5-pro",
        //Update instructions later. Assume it returns its bullet points seperated by "\n"
        contents: `Summarize this conversation, focusing on key goals, 
            decisions, and context that would be useful for future 
            conversations:\n${messages}`
    });
    
    /* assuming that response always returns a text. Need to handle cases where gemini doesnt return text.
    For example if the model runs out of credits as gemini pro is expensive*/
    const toVectorize = response.text!.split("\n");
  return toVectorize;
  //Returns an array of bullet points to be vectorized in vector_embed.ts
}