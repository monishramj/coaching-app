import { supabase } from "../../supabase-setup.ts";

Deno.serve( async(req) => {
    const authHeader = req.headers.get("Authorization");

    if (authHeader !== `Bearer ${Deno.env.get("SUPABASE_PRIVILEGED")}`) {
        return new Response("Unauthorized", {status: 401});
    }

    try {
        /* A coaches model and its personality are required. Description and custom instructions
        are accepted but not required
        */
        const {model, personality, description = "", custom = ""}: {
            model: string;
            personality: string;
            description: string;
            custom: string;
        } = await req.json();

        if(!model || !personality) {
            return new Response(
                JSON.stringify({ error: "model, personality and or description were not recieved"}), {status: 400, headers: {"Content-Type": "application/json"} }
            );
        }

        // Create the row representing the coach.
        const { data, error } = await supabase
            .from('coaches')
            .insert({
                training_model: model,
                personality: personality,
                description: description,
                custom_instructions: custom
            });
        
        if (error) {
            throw new Error("Failed to insert coach into db in coach.ts");
        }

        // verify that things went correctly
        return new Response(
            JSON.stringify({
                success: true,
                coach: data
            }), {
                status: 201, headers: { "Content-Type": "application/json"}
            }
        );
        
    } catch (err) {
        return new Response(
            JSON.stringify({
                error: (err as Error).message
            }), {
                status: 500, headers: {"Content-Type": "application/json"}
            }
        );
    }
});