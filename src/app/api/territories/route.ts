import { NextResponse } from "next/server";

export async function GET() {
    try {
        const usersResponse = await fetch('https://netzwelt-devtest.azurewebsites.net/Territories/All');
        const responseData = await usersResponse.json();
        
        return NextResponse.json(responseData, { status: 200 });
    } catch (err) {
        console.error(err);

        return NextResponse.json({
            status: 500,
            error: "Internal Server Error",
        });
    }
}

