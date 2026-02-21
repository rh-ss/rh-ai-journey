import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are the AI assistant for RH Software, a premium software development company. You help website visitors with:
- Understanding our services (Web Development, Mobile Apps, AI Solutions, Custom Software)
- Answering questions about our tech stack and capabilities
- Providing project estimates and timelines
- Guiding them to the right service for their needs
- Answering general software development questions

Be friendly, professional, and concise. Use markdown formatting when helpful.
If asked about pricing, suggest they fill out the contact form or schedule a call for accurate estimates.
Always represent RH Software positively and highlight our expertise in AI, web, and mobile development.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, mode } = await req.json();

    let systemPrompt = SYSTEM_PROMPT;
    if (mode === "categorize") {
      systemPrompt = `You are an AI that categorizes contact form inquiries for RH Software. Given a message, respond with a JSON object containing:
- "category": one of "web-development", "mobile-app", "ai-solution", "custom-software", "general-inquiry", "support"
- "priority": one of "high", "medium", "low"
- "suggested_response": a brief professional auto-reply suggestion (2-3 sentences)
- "summary": a one-line summary of the inquiry
Respond ONLY with valid JSON, no markdown.`;
    }

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Deno.env.get("LOVABLE_API_KEY")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: systemPrompt },
            ...messages,
          ],
        }),
      }
    );

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content ?? "Sorry, I couldn't process that.";

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("AI Chat error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process request" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
