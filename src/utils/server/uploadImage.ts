import { S3 } from "aws-sdk"


export const uploadImage = async (pic: File) => {
    const accessKeyId = process.env.LIARA_CLOUD_ACCESS_KEY
    const secretAccessKey = process.env.LIARA_CLOUD_SECRET_KEY
    const endpoint = process.env.LIARA_CLOUD_API_ENDPOINT

    const bucket = process.env.LIARA_CLOUD_BUCKET

    if (!bucket || !endpoint || !secretAccessKey || !accessKeyId) return Response.json({ message: 'the .env file error' }, { status: 500 })

    const s3 = new S3({
        accessKeyId,
        secretAccessKey,
        endpoint,
    });


    const params = {
        Bucket: bucket,
        Key: pic.name,
        Body: Buffer.from(await pic.arrayBuffer()),
    };

    const response = await s3.upload(params).promise();
    console.log('response ===>>>>>>>>', response);

    return s3.getSignedUrl('getObject', {
        Bucket: bucket,
        Key: pic.name,
        Expires: 315360000000,
    });

}