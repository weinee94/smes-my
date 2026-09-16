export function confirmedLead(value: unknown): string {
  const result = value as {
    ok?: unknown;
    saved?: unknown;
    lead_id?: unknown;
  } | null;
  if (
    !result ||
    result.ok !== true ||
    result.saved !== true ||
    typeof result.lead_id !== "string" ||
    !/^SME-[a-f0-9-]{36}$/i.test(result.lead_id)
  ) {
    throw new Error("Submission not confirmed");
  }
  return result.lead_id;
}
