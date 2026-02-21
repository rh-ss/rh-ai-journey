import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, subject, message, aiInsight } = await req.json();

    // Validate inputs
    if (!name || !email || !subject || !message) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const RECIPIENT_EMAIL = Deno.env.get("CONTACT_EMAIL") || "contact@rhsoftware.com";

    const aiSection = aiInsight
      ? `\n\n--- AI Analysis ---\nCategory: ${aiInsight.category}\nPriority: ${aiInsight.priority}\nSummary: ${aiInsight.summary}\nSuggested Response: ${aiInsight.suggested_response}`
      : "";

    const emailBody = `New Contact Form Submission\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || "Not provided"}\nSubject: ${subject}\n\nMessage:\n${message}${aiSection}`;

    if (RESEND_API_KEY) {
      // Send via Resend
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "RH Software <onboarding@resend.dev>",
          to: [RECIPIENT_EMAIL],
          subject: `[Contact Form] ${subject}`,
          text: emailBody,
          reply_to: email,
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error("Resend error:", errText);
        return new Response(JSON.stringify({ error: "Failed to send email" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // No email provider configured — log the submission
    console.log("=== CONTACT FORM SUBMISSION ===");
    console.log(emailBody);
    console.log("================================");

    return new Response(JSON.stringify({ success: true, note: "Email provider not configured. Message logged." }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Send contact email error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process submission" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
