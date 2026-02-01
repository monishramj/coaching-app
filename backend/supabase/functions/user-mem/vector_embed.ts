/*
  Vector embed function. Recieves one "bullet point" from summary.ts,
  makes a call to gemeni vector embedding model and returns a 3072 dimention
  vector.
  
  This is sent to create_row.ts
*/
import { GoogleGenAI } from "google-gen";

export async function generateVector(text: string) {
  const apiKey = Deno.env.get("GEMINI_API");
  if (!apiKey) {
    throw new Error("Missing GEMINI_API in vector_embed.ts");
  }

  const genAI = new GoogleGenAI({
    apiKey: apiKey
  });
  
  const response = await genAI.models.generateContent({
    model: "gemini-embedding-001",
    contents: `Instructuons on what gemini should do\n${text}`
    })

    return response;
}
