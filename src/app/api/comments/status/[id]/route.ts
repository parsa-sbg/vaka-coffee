import { CommentModel, connectToDataBase, productmodel } from "@/models";
import { authUserWithToken } from "@/utils/server/auth";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { z } from "zod";


export const PUT = async (
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) => {
    const token = (await cookies()).get('token')?.value;
    const user = await authUserWithToken(token);

    if (!user || user.role == 'USER') {
        return Response.json({ message: 'this route is protected' }, { status: 401 })
    }

    const reqBody = await req.json()
    console.log(reqBody);


    const validationSchema = z.string(z.enum(['ACCEPTED', 'PENDING', 'REJECTED']))

    const parsedData = validationSchema.safeParse(reqBody)
    if (!parsedData.success) {
        return Response.json({ message: 'invalid status', parsedData }, { status: 400 })
    }

    const commentId = (await params).id

    try {

        connectToDataBase()
        const updatedComment = await CommentModel.findOneAndUpdate({ _id: commentId }, {
            status: parsedData.data,
        }, { new: true })



        const allComments = await CommentModel.find().sort({ _id: -1 })

        // Update product average score
        if (updatedComment) {
            const result = await CommentModel.aggregate([
                { $match: { product: updatedComment.product._id, status: "ACCEPTED" } },
                { $group: { _id: "$product", averageScore: { $avg: "$score" } } }
            ]);

            const newAverageScore = result[0]?.averageScore || 0;

            await productmodel.findByIdAndUpdate(
                updatedComment.product._id,
                { averageScore: newAverageScore },
                { new: true }
            );
        }

        if (updatedComment) {

            (await updatedComment.populate('user')).populate('product')
            return Response.json({ message: 'comment status updated successfully', comment: updatedComment, allComments }, { status: 200 })
        } else {
            return Response.json({ message: 'internal server erroor' }, { status: 500 })
        }

    } catch {
        return Response.json({ message: 'internal server erroor' }, { status: 500 })
    }
}