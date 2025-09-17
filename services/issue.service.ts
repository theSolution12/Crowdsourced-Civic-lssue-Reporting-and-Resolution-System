import { API_URL } from "@/constants/api-url"
import { Issue } from "@/constants/types";

export const getIssues = async (): Promise<Issue[]> => {
    try{
        const url = API_URL.issues;
        const res = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        const json = await res.json();
        
        if (!res.ok) throw new Error(json.error || "Issue fetching failed");
        return json.data;
    } catch (error: any){
        console.error("Error at service level: ", error);
        throw error;
    }
}

export const postIssue = async (issue: Issue): Promise<Issue> => {
    try {
        const url = API_URL.issues;
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(issue),
        });

        const json = await res.json();

        if (!res.ok) throw new Error(json.error || "Issue upsert failed");
        return json.data;
    } catch (error: any) {
        console.error("Error at service level: ", error);
        throw error;
    }
};

export const rejectIssue = async (id: string): Promise<Issue> => {
    try {
        const url = API_URL.issues;
        const res = await fetch(url, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        });

        const json = await res.json();

        if (!res.ok) throw new Error(json.error || "Issue reject failed");
        return json.data;
    } catch (error: any) {
        console.error("Error at service level: ", error);
        throw error;
    }
};

export const verifyIssue = async (id: string, updatedBy?: string, comment?: string): Promise<Issue> => {
    try {
        const url = API_URL.verifyIssue;
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, updated_by: updatedBy, comment }),
        });

        const json = await res.json();

        if (!res.ok) throw new Error(json.error || "Issue verify failed");
        return json.data;
    } catch (error: any) {
        console.error("Error at service level: ", error);
        throw error;
    }
};