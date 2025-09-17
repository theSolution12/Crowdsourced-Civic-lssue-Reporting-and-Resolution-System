### Issue APIs: Frontend Integration Guide

This guide covers all issue-related APIs and how to consume them in the frontend using our Hook → Service → API architecture.

## Endpoints

- GET `/api/issues`
  - Fetches a list of issues

- POST `/api/issues`
  - Creates or updates (upsert) an issue

- PATCH `/api/issues`
  - Partially updates an issue’s status to “Rejected” by `id`

- POST `/api/issues/verify`
  - Verifies an issue by `id`, updates status to “Verified”, and logs an `issue_updates` record

## Data Model

TypeScript type used across the app:

```ts
// constants/types.ts
export type Issue = {
  id: string;
  user_id: string;
  title: string | null;
  description: string | null;
  location_data: object | null;
  image_urls: string[] | null;
  voice_note_url: string | null;
  tags: string[] | null;
  category: string | null;
  status: string | null;
  priority: string | null;
  assigned_department_id: string | null;
  assigned_officer_id: string | null;
  upvotes: number;
  downvotes: number;
  created_at: string;
  updated_at: string;
  resolved_at: string | null;
};
```

## Services

- File: `services/issue.service.ts`

```ts
import { API_URL } from "@/constants/api-url";
import { Issue } from "@/constants/types";

// GET issues
export const getIssues = async (): Promise<Issue[]> => { /* ... */ }

// POST create/update issue (upsert)
export const postIssue = async (issue: Issue): Promise<Issue> => { /* ... */ }

// PATCH reject issue
export const rejectIssue = async (id: string): Promise<Issue> => { /* ... */ }

// POST verify issue
export const verifyIssue = async (id: string, updatedBy?: string, comment?: string): Promise<Issue> => { /* ... */ }
```

- API URL constants: `constants/api-url.ts`
```ts
export const API_URL = {
  issues: "/api/issues",
  verifyIssue: "/api/issues/verify",
}
```

- React Query keys: `constants/query-keys.ts`
```ts
export const QUERY_KEYS = { issues: "issues" }
```

## Hooks

- File: `lib/hooks/issues/get-issues.ts` (query)
```ts
import { useQuery } from "@tanstack/react-query";
import { getIssues } from "@/services/issue.service";
import { QUERY_KEYS } from "@/constants/query-keys";
import { Issue } from "@/constants/types";

export const useGetIssues = () =>
  useQuery<Issue[]>({
    queryKey: [QUERY_KEYS.issues],
    queryFn: getIssues,
  });
```

- File: `lib/hooks/issues/post-issue.ts` (mutation for create/update)
```ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postIssue } from "@/services/issue.service";
import { QUERY_KEYS } from "@/constants/query-keys";
import type { Issue } from "@/constants/types";

export const usePostIssue = () => {
  const queryClient = useQueryClient();
  return useMutation<Issue, Error, Partial<Issue>>({
    mutationFn: (payload) => postIssue(payload as Issue),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.issues] });
    },
  });
};
```

- File: `lib/hooks/issues/reject-issues.ts` (mutation for reject)
```ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { rejectIssue } from "@/services/issue.service";
import { QUERY_KEYS } from "@/constants/query-keys";
import type { Issue } from "@/constants/types";

export const useRejectIssue = () => {
  const queryClient = useQueryClient();
  return useMutation<Issue, Error, string>({
    mutationFn: (id) => rejectIssue(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.issues] });
    },
  });
};
```

- File: `lib/hooks/issues/verify-issues.ts` (mutation for verify)
```ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { verifyIssue } from "@/services/issue.service";
import { QUERY_KEYS } from "@/constants/query-keys";
import type { Issue } from "@/constants/types";

export const useVerifyIssue = () => {
  const queryClient = useQueryClient();
  return useMutation<Issue, Error, { id: string; updatedBy?: string; comment?: string }>({
    mutationFn: ({ id, updatedBy, comment }) => verifyIssue(id, updatedBy, comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.issues] });
    },
  });
};
```

## Example Usage in UI

- List issues:
```tsx
"use client"
import { useGetIssues } from "@/lib/hooks/issues/get-issues";

export function IssuesList() {
  const { data, isPending, error } = useGetIssues();
  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Failed to load issues</div>;
  return (
    <ul>
      {data?.map((i) => (
        <li key={i.id}>{i.title}</li>
      ))}
    </ul>
  );
}
```

- Create/update issue:
```tsx
"use client"
import { usePostIssue } from "@/lib/hooks/issues/post-issue";

export function CreateIssueButton() {
  const { mutate, isPending } = usePostIssue();
  const onClick = () => {
    mutate({
      title: "New pothole",
      description: "Near Sector 14",
      category: "Road Infrastructure",
      priority: "High",
      status: "New",
      location_data: { address: "MG Road" },
      image_urls: [],
      voice_note_url: null,
      tags: ["pothole"],
      assigned_department_id: null,
      assigned_officer_id: null,
      upvotes: 0,
      downvotes: 0,
    });
  };
  return <button onClick={onClick} disabled={isPending}>Create</button>;
}
```

- Reject issue:
```tsx
"use client"
import { useRejectIssue } from "@/lib/hooks/issues/reject-issues";

export function RejectIssueButton({ id }: { id: string }) {
  const { mutate, isPending } = useRejectIssue();
  return <button onClick={() => mutate(id)} disabled={isPending}>Reject</button>;
}
```

- Verify issue:
```tsx
"use client"
import { useVerifyIssue } from "@/lib/hooks/issues/verify-issues";

export function VerifyIssueButton({ id, userId }: { id: string; userId?: string }) {
  const { mutate, isPending } = useVerifyIssue();
  return (
    <button
      onClick={() => mutate({ id, updatedBy: userId, comment: "Verified by moderator" })}
      disabled={isPending}
    >
      Verify
    </button>
  );
}
```

## API Response Shapes

- Success:
```json
{
  "success": true,
  "message": "Text...",
  "data": { }
}
```

- Error:
```json
{ "error": "Error message" }
```

## Notes

- The server returns the upserted row (`data[0]`) on POST, a single updated row on PATCH/verify, and an array on GET.
- For create flows, prefer setting `user_id` on the server (based on auth) instead of trusting client input.
- After each mutation, hooks invalidate `issues` to keep lists fresh.
- If you need more statuses later, we can generalize PATCH to accept a `status` payload. 