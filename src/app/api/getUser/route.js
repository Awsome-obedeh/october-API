import { NextResponse } from "next/server";

export async function GET(req) {
    return NextResponse.json({
        name:"obed",
        complexion:"dark",
        favClub:"chelsea"
        })
}   