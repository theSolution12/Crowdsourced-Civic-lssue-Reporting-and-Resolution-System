import { QUERY_KEYS } from "@/constants/query-keys";
import { postIssue } from "@/services/issue.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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