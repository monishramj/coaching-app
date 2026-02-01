/*
  Recieves: 
  - Unique UUID from general-chat
  - Array of "ChatMessage" types from general-chat

  Does:
  - Converts ChatMessage array into a single string
  - Passes string to summary.ts and recieves an array of bullet points
  - Iterates through array and passes each bullet point to vector_embed.ts
  - Within each iteration, combines vector, the bullet point and uuid and creates a new table in db to be stored as long term memory
*/

import { summarizeMessages } from "./summary.ts";
import { generateVector } from "./vector_embed.ts";
import { ChatMessage } from "../types.ts";
import { supabase } from "../../supabase-setup.ts";

Deno.serve(async (req) => {
  const authHeader = req.headers.get("Authorization");

  if (authHeader !== `Bearer ${Deno.env.get("SUPABASE_PRIVILEGED")}`) {
    return new Response("Unauthorized", { status: 401});
  }

  try {
  // expecting a json file of type userID: text and an array messages of type ChatMessage:
  const { userId, messages }: { userId: string; messages: ChatMessage[] } = await req.json();

  // Ensure userID exists, messages is an array and it contains elements
  if (!userId || !Array.isArray(messages) || messages.length === 0) {
    return new Response(
      JSON.stringify({ error: "userId and a non-empty messages array are required" }), 
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

    /* Turns the Chat message array of conversation between user and model into a single
    string to pass to the AI to summarize
    */
    const conversationText = messages
    .map(m => `${m.role}: ${m.text}`)
    .join('\n');

    // We eplace all ` with _ to avoid prematurely escaping the sequence
    const safeConversationText = conversationText.replace(/`/g, "_");

    const myBulletPoints = await summarizeMessages(safeConversationText);


    //Declared outside because of its use in the "return new Response" for debugging
    let vector: number[] = [];
    for (let i = 0; i < myBulletPoints.length; i++) {
      const point = myBulletPoints[i];
      // All calls to funtions involving a long duration need 'await' to wait for it to finish.
      vector = await generateVector(point);

      const { error } = await supabase
        .from('user-memories')
        .insert({
          user_id: userId,
          Memory: point,
          embedding: vector
        });

      if (error) {
        throw new Error(`Failed to insert row: ${error.message}`);
      }
    }

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