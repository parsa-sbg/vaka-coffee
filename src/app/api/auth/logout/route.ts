import { cookies } from "next/headers";

export const GET = async () => {
    const cookieStore = await cookies();

    cookieStore.delete('token')
    return Response.json({ message: "User logged out successfully" });
};