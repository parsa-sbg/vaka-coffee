import { CommentModel, connectToDataBase } from "@/models";
import { authUserWithToken } from "@/utils/server/auth";
import { commentSchema } from "@/validation/comment";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
    const token = (await cookies()).get('token')?.value;
    const user = await authUserWithToken(token);

    if (!user) {
        redirect('/login')
    }

    const reqBody = await req.json();


    const parsedData = commentSchema.safeParse(reqBody);

    if (!parsedData.success) {
        return Response.json(parsedData, { status: 400 });
    }

    try {
        connectToDataBase()

        const newComment = await CommentModel.create({
            product: parsedData.data.productId,
            user: user._id,
            score: parsedData.data.score,
            comment: parsedData.data.comment
        })

        if (!newComment) {
            return Response.json({ message: 'unknown error' }, { status: 400 })
        }

        return Response.json({ message: 'comment created successfully', comment: newComment }, { status: 201 })



    } catch (err) {
        console.log('create comment error ===>>>', err);
        return Response.json({ message: 'internal server erroor' }, { status: 500 })
    }
}