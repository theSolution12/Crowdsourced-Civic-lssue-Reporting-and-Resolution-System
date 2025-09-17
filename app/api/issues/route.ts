import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";

export const GET = async () => {
    try{
        const {data, error} = await supabase
          .from('issues')
          .select('*');

        if (error){
            return NextResponse.json({ error: error.message }, {status: 422});
        }

        return NextResponse.json({
            success: true,
            message: "Fetched issues successfully",
            data
        });
    } catch (error: any){
        console.error("API Error: ", error);
        return NextResponse.json(
            {error: error.message || "Unexpected server error."},
            {status: 500},
        );
    }
}

export const POST = async (req: NextRequest) => {
    try {
        const issueData = await req.json();

        const { data, error } = await supabase
            .from('issues')
            .upsert(issueData)
            .select();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 422 });
        }

        return NextResponse.json({
            success: true,
            message: "Issue upserted successfully",
            data: data[0]
        }, { status: 201 });
    } catch (error: any) {
        console.error("API Error: ", error);
        return NextResponse.json(
            { error: error.message || "Unexpected server error." },
            { status: 500 },
        );
    }
};

export const PATCH = async (req: NextRequest) => {
    try {
        const { id } = await req.json();
        if (!id) {
            return NextResponse.json({ error: "Missing issue id" }, { status: 400 });
        }

        const { data, error } = await supabase
            .from('issues')
            .update({ status: 'Rejected' })
            .eq('id', id)
            .select()
            .single();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 422 });
        }

        return NextResponse.json({
            success: true,
            message: "Issue status set to Rejected",
            data
        });
    } catch (error: any) {
        console.error("API Error: ", error);
        return NextResponse.json(
            { error: error.message || "Unexpected server error." },
            { status: 500 },
        );
    }
};