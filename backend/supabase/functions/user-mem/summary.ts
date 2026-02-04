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
        contents: `Analyze the following 10-message exchange between an AI coach and a user. 
        Provide a concise summary using a maximum of 4 bullet points (fewer is preferred if the context allows). 
        Group each user query with its corresponding agent resolution to preserve the 'challenge-and-solution' logic. 
        Focus exclusively on information critical for future sessions: specific goals mentioned, progress made, 
        obstacles identified, and any agreed-upon next steps. Avoid fluff; prioritize actionable data that informs 
        how the coach should interact with the user moving forward. 
        
        Output Format Requirement: Your output must contain only the text of the points themselves. Do not use 
        symbols (like -, *, or •), numbers, or introductory text. Separate each point using only a newline (\n) 
        character.
        
        Here is the convesation:\n${messages}`
    });
    
    /* assuming that response always returns a text. Need to handle cases where gemini doesnt return text.
    For example if the model runs out of credits as gemini pro is expensive*/
    const toVectorize = response.text!.split("\n");
  return toVectorize;
  //Returns an array of bullet points to be vectorized in vector_embed.ts
}