import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import config from "../config";

const SQS_QUEUE = config.aws.sqs.queue_url;

let clientObj: any = {
  region: config.aws.region,
  credentials: {
    accessKeyId: config.aws.accessKeyId,
    secretAccessKey: config.aws.secretAccessKey,
  }
};
// if (config.RUN_ENV == "dev") {
//   clientObj.endpoint = config.aws.endpoint;
//   clientObj.s3ForcePathStyle = true;
// }
const sqsClient = new SQSClient(clientObj);

export const sqsAdd = async (payload: any = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const command = new SendMessageCommand({
        QueueUrl: SQS_QUEUE,
        MessageBody: JSON.stringify(payload),
      });
      const response = await sqsClient.send(command);
      resolve(response);
    } catch (error: any) {
      reject(error);
    }
  });
};