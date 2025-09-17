import { QUERY_KEYS } from "@/constants/query-keys";
import { rejectIssue } from "@/services/issue.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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