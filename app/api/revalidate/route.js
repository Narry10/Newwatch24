import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization"
    }
  });
}

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const body = await req.json();
    const { type, key } = body;

    let path = "";
    if (type === "posts") {
      path = "/api/posts/latest";
    } else if (type === "news" && key) {
      path = `/news/${key}`;
    } else {
      return NextResponse.json({ success: false, error: "Invalid type or key" }, { status: 400 });
    }

    await revalidatePath(path);

    return NextResponse.json({ success: true, path }, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, {
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
}
