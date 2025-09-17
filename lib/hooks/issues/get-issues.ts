import { QUERY_KEYS } from "@/constants/query-keys";
import { getIssues } from "@/services/issue.service";
import { useQuery } from "@tanstack/react-query";
import { Issue } from "@/constants/types";

export const useGetIssues = () => {
    return useQuery<Issue[]>({
        queryKey: [QUERY_KEYS.issues],
        queryFn: getIssues,
    })
}