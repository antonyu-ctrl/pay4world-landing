import { NextRequest, NextResponse } from "next/server";
import { getAdminPassword, setAdminPassword } from "@/lib/serverPassword";

export async function POST(req: NextRequest) {
  try {
    const { currentPassword, newPassword } = await req.json();

    const actual = await getAdminPassword();
    if (!actual || currentPassword !== actual) {
      return NextResponse.json(
        { error: "Current password is incorrect" },
        { status: 401 }
      );
    }

    if (!newPassword || newPassword.length < 8) {
      return NextResponse.json(
        { error: "New password must be at least 8 characters" },
        { status: 400 }
      );
    }

    await setAdminPassword(newPassword);

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to change password", details: String(err) },
      { status: 500 }
    );
  }
}
