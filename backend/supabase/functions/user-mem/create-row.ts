/*
 Recieves the vector embedded array from vector_embed.ts
 and the array from summary.ts and combines them into a row stored in supabase
 with the userID
*/

/* there is a for loop in here that iterates through the array returned by summary.ts
for each bulet point i do smth like
uuic - previously stored
string- the bullet point im on
vector - returned from function

store these into db via a call
*/

import { summarizeMessages } from "./summary.ts";
import { generateVector } from "./vector_embed.ts";
import { ChatMessage } from "../types.ts";

Deno.serve(async (req) => {
  const authHeader = req.headers.get("Authorization");

  if (authHeader !== `Bearer ${Deno.env.get("SUPABASE_PRIVILEGED")}`) {
    return new Response("Unauthorized", { status: 401});
  }

  try {
    // expecting a json file of type userID: text:
    const { userId, text } = await req.json();
    
    // If either is missing, throw error
    if (!userId || !text) {
      return new Response(JSON.stringify({ error: "userId and text are required" }), { 
        status: 400 
      });
    }

    /* Turns the Chat message array of conversation between user and model into a single
    string to pass to the AI to summarize
    */
    const conversationText = messages
    .map(m => `${m.role}: ${m.parts[0].text}`)
    .join('\n');

    /* We eplace all ` with _ to avoid sql injections or accidental breaks when user
    input includes a ` and prematurely escapes the sequence */
    const safeConversationText = conversationText.replace(/`/g, "_");

    const myBulletPoints = summarizeMessages(safeConversationText);



    return new Response(
      JSON.stringify({ 
        success: true, 
        vector_sample: vector.slice(0, 3) 
        // return a small piece of the vector array for debugging purposes 
      }),
      { headers: { "Content-Type": "application/json" } }
    );

  } catch (err) {
    return new Response(JSON.stringify({
      error: (err as Error).message}),
      { status: 500 });
  }
});