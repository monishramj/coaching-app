/*
  Vector embed function. Recieves one "bullet point" from summary.ts,
  makes a call to gemeni vector embedding model and returns a 768 dimention
  vector.
  
  This is sent to create_row.ts
*/

// takes a single bullet point as input, returns that bullet point vectorized
// to be used in create-row.ts in a for loop
async function generateVector(text: string) {
  const apiKey = Deno.env.get("GEMINI_API");
  if (!apiKey) {
    throw new Error("Missing GEMINI_API in vector_embed.ts");
  }

  
}
