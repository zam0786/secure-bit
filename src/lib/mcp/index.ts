import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listContactSubmissions from "./tools/list-contact-submissions";
import getContactSubmission from "./tools/get-contact-submission";
import markContactSubmissionHandled from "./tools/mark-contact-submission-handled";

const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "securely-yours",
  title: "Securely Yours",
  version: "0.1.0",
  instructions:
    "Tools for the SecureBit security website. Use `list_contact_submissions` to review inbound enquiries from the contact form, `get_contact_submission` for full details of one enquiry, and `mark_contact_submission_handled` once the security team has followed up. Submissions contain personal data, so only security-team admins can read them.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [listContactSubmissions, getContactSubmission, markContactSubmissionHandled],
});