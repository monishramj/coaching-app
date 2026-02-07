// edge function entry
// expects json file and coachID as input

import {supabase} from "../../supabase-setup.ts";
import { generateVector } from "./vector-embed-two.ts";
import { GoogleGenAI } from "google-gen"
import { CORE_SYSTEM_PROMPT } from "../../supabase-setup.ts";
import { getBuffer } from "./chat-history.ts";
import { updateBuffer } from "./chat-history.ts";
import { formatRecentHistory } from "./format-recent-history.ts";
import { createMsg } from "./format-recent-history.ts";

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
    // return error if unauthorized
    if (authError || !user) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
    }
    const userUUID = user.id

    // extract the user uuid from the JWT in the header
    const {chat : userChatMsg, coachID} = await req.json()

    // get the most recent memories stored in local buffer if any
    const recentHistory = getBuffer(userUUID, coachID)

    // vector embed the chat we just got
    const vector = generateVector(userChatMsg)

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
    
    const chat = genAI.chats.create({
        model: "gemini-2.5-pro",

        // Create a custom system config with system instructions
        config: {
            systemInstruction: [
                { text: `${CORE_SYSTEM_PROMPT}\n${coachResults}` }
            ],
        },

        // Initialize history with long-term memory and recent conversation
        history: [
            createMsg(
            "user",
            `Long-term memory context (do not repeat verbatim):\n${longTermMems}`
            ),
            createMsg("model", "Acknowledged."),

            // Recent history formatted via helper function
            ...formatRecentHistory(recentHistory),
        ],
    });

    const response = await chat.sendMessage({ message: userChatMsg});
    const agentChatMsg = response.text

    if(!agentChatMsg) {
        return new Response(JSON.stringify({ error: 'Response does not contain text in process-chat.txt' }), { status: 500 })
    }
    updateBuffer(userUUID, coachID, userChatMsg, agentChatMsg);
    // make sure to return the agent chat msg to frontend
    return new Response(
        JSON.stringify({ reply: agentChatMsg}),
        { status: 200, headers: { "Content-Type": "application/json" } }
    );
});