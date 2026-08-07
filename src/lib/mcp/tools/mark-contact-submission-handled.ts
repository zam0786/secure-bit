import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "mark_contact_submission_handled",
  title: "Mark contact submission handled",
  description:
    "Mark a contact form submission as handled (records the time the security team followed up). Requires the signed-in user to be a security-team admin.",
  inputSchema: {
    id: z.string().uuid().describe("The submission id."),
    handled: z
      .boolean()
      .optional()
      .describe("Set false to clear the handled marker again. Defaults to true."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  handler: async ({ id, handled }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase
      .from("contact_submissions")
      .update({ notified_at: handled === false ? null : new Date().toISOString() })
      .eq("id", id)
      .select("id, name, email, notified_at");
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    if (!data?.length) {
      return {
        content: [
          { type: "text", text: `Could not update submission ${id}. It may not exist, or you lack admin access.` },
        ],
        isError: true,
      };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(data[0], null, 2) }],
      structuredContent: { submission: data[0] },
    };
  },
});