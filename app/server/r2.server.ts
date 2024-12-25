import {
    S3Client,
    PutObjectCommand,
    GetObjectCommand,
} from "@aws-sdk/client-s3";

const ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const BUCKET = process.env.R2_BUCKET_NAME;

if (!ACCOUNT_ID) {
    throw new Error("Missing R2 Account Id");
}

if (!ACCESS_KEY_ID) {
    throw new Error("Missing R2 Access Key Id");
}

if (!SECRET_ACCESS_KEY) {
    throw new Error("Missing R2 Secret Access Key");
}

if (!BUCKET) {
    throw new Error("Missing R2 Bucket");
}

const r2 = new S3Client({
    region: "auto",
    endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: ACCESS_KEY_ID,
        secretAccessKey: SECRET_ACCESS_KEY,
    },
});

export async function uploadObject(file: File, fileName: string) {
    const command = new PutObjectCommand({
        Bucket: BUCKET,
        Key: fileName,
        Body: Buffer.from(await file.arrayBuffer()),
        ContentLength: file.size,
        ContentType: file.type,
    });

    return await r2.send(command);
}

export async function getObject(fileName: string) {
    const command = new GetObjectCommand({
        Bucket: BUCKET,
        Key: fileName,
    });

    return await r2.send(command);
}
