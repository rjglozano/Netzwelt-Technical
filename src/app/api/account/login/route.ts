import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest , response: NextResponse) {
    try {
        const body = await request.json();

        const usersResponse = await fetch('https://netzwelt-devtest.azurewebsites.net/Account/SignIn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (usersResponse.ok) {
            return NextResponse.json({
                status: 200,
                body: JSON.stringify({ success: true }),
            });

        } else {
            return NextResponse.json({
                status: 500,
                error: "Invalid username and password"           
            });
        }

    } catch (err) {
        console.error(err);
        return NextResponse.json({
            status: 500,
            error: "Invalid username and password",
        });
    }
}

