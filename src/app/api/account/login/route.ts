    import { NextRequest, NextResponse } from "next/server";

    const sessions = new Map();

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

                const userData = await usersResponse.json();
                const sessionId = Math.random().toString(36).substring(7);
                sessions.set(sessionId, { userData });
                console.log(sessionId)

                return NextResponse.json({
                    status: 200,
                    body: JSON.stringify({ success: true, sessionId }),
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

