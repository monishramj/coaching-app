// edge function entry
// expects json file and coachID as input

import {supabase} from "../../supabase-setup.ts";
import { generateVector } from "./vector-embed-two.ts";
import { GoogleGenAI } from "google-gen"
import { CORE_SYSTEM_PROMPT } from "../../supabase-setup.ts";

//Initializing the gemini api for later call
const apiKey = Deno.env.get("GEMINI_API");
if (!apiKey) {
  throw new Error("GEMINI_API is not set");
}

const genAI = new GoogleGenAI({
  apiKey: apiKey
});

Deno.serve(async (req) => {
    
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    const userUUID = user?.id
    // return error if unauthorized
    if (authError || !user) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
    }

    // extract the user uuid from the JWT in the header
    const {chat : chatMsg, coachID} = await req.json()

    // vector embed the chat we just got
    const vector = generateVector(chatMsg)

    /* call the vector_search sql funcion from supabase and pass in
        the required parameters
    */
    const { data:longTermSearchResults, error: memSearchError } = await supabase
        .rpc('vector_search', {
            query_embedding: vector,
            match_user_uuid: userUUID,
            match_coach_uuid: coachID
        })
    
    if (memSearchError) {
        return new Response(JSON.stringify({ error: 'Memory search failed in process-chat.ts' }), { status: 500 })
    }

    // Read the array of returned memories and combined them into one big string for injection
    const longTermMems = longTermSearchResults?.map((result: { memory: string }) => result.memory)

    const { data:coachResults, error: coachError } = await supabase
        .rpc('coach_search', {
            match_coach_uuid: coachID
        })
    
    if (coachError) {
        return new Response(JSON.stringify({ error: 'Coach search failed in process-chat.ts' }), { status: 500 })
    }
    
    const response = await genAI.models.generateContent({
        model: "gemini-2.5-pro",
        //Update instructions later.
        contents: `Something something ${CORE_SYSTEM_PROMPT} something something ${coachResults}
        something something ${longTermMems} something something ${recentHistory} something`
    });
});