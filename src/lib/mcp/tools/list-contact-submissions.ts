import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "list_contact_submissions",
  title: "List contact submissions",
  description:
    "List contact form submissions from the SecureBit website, newest first. Requires the signed-in user to be a security-team admin.",
  inputSchema: {
    limit: z.number().int().min(1).max(50).optional().describe("How many submissions to return (default 10)."),
    only_unhandled: z
      .boolean()
      .optional()
      .describe("When true, return only submissions that have not been marked as handled."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ limit, only_unhandled }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    let query = supabase
      .from("contact_submissions")
      .select("id, name, email, company, message, notified_at, created_at")
      .order("created_at", { ascending: false })
      .limit(limit ?? 10);
    if (only_unhandled) query = query.is("notified_at", null);

    const { data, error } = await query;
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    if (!data?.length) {
      return {
        content: [
          {
            type: "text",
            text: "No contact submissions are visible. If you expect results, your account may not have the security-team admin role.",
          },
        ],
        structuredContent: { submissions: [] },
      };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      structuredContent: { submissions: data },
    };
  },
});