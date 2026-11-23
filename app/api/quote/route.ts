import { NextResponse } from "next/server";

const webhookUrl = process.env.ZAPIER_QUOTE_WEBHOOK;

export async function POST(request: Request) {
  if (!webhookUrl) {
    return NextResponse.json(
      { error: "Zapier webhook is not configured" },
      { status: 500 },
    );
  }

  const body = await request.text();

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Webhook request failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Webhook request failed" }, { status: 502 });
  }
}
