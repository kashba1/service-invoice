import config from "../config";
import { S3Client } from "@aws-sdk/client-s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import fs from "fs";

const s3Client = new S3Client({
  region: config.aws.region,
  credentials: {
    accessKeyId: config.aws.accessKeyId,
    secretAccessKey: config.aws.secretAccessKey,
  }
});

export const logoFile = (file: any, vendorCode: string): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      fs.readFile(file.path, async (err, data) => {
        const params = {
          Bucket: config.aws.s3.bucket,
          Key: `${vendorCode}/${config.RUN_ENV}/logo/${file.filename}`,
          Body: data,
          ContentType: 'image/jpeg'
        };
        let command = new PutObjectCommand(params);
        const url = ((await getSignedUrl(s3Client, command, { expiresIn: 3600 })).split("?"))[0];
        const response = await s3Client.send(command);
        if (response['$metadata'].httpStatusCode == 200) {
          fs.unlinkSync(file.path);
          resolve(url);
        } else {
          throw new Error("S3 upload failed");
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};
