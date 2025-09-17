import { QUERY_KEYS } from "@/constants/query-keys";
import { verifyIssue } from "@/services/issue.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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