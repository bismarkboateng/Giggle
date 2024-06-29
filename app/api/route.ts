import { getUserId } from "@/actions/user.actions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const userId = await getUserId();
        console.log(`Logging user id in route: ${userId}`);
        return NextResponse.json({ userId }, { status: 200 });
    } catch (error) {
        console.error("Error fetching userId:", error);
        return NextResponse.json({ error: "Failed to fetch user ID" }, { status: 500 });
    }
}
