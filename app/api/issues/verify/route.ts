import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const { id, updated_by, comment } = body || {};
        if (!id) {
            return NextResponse.json({ error: "Missing issue id" }, { status: 400 });
        }

        const { data: updatedIssue, error: updateError } = await supabase
            .from('issues')
            .update({ status: 'Verified' })
            .eq('id', id)
            .select()
            .single();

        if (updateError) {
            return NextResponse.json({ error: updateError.message }, { status: 422 });
        }

        await supabase
            .from('issue_updates')
            .insert({
                issue_id: id,
                updated_by: updated_by || null,
                status: 'Verified',
                comment: comment || null,
                attachments: [],
            });

        return NextResponse.json({
            success: true,
            message: "Issue verified successfully",
            data: updatedIssue,
        });
    } catch (error: any) {
        console.error("API Error: ", error);
        return NextResponse.json(
            { error: error.message || "Unexpected server error." },
            { status: 500 },
        );
    }
}; 